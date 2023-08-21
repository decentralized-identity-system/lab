// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.4;

import "@semaphore-protocol/contracts/interfaces/ISemaphore.sol";
import { PKI } from "./PKI.sol";
import { Wallet } from "./Wallet.sol";

contract Recovery {
    /*//////////////////////////////////////////////////////////////////////////
                                   PUBLIC STORAGE
    //////////////////////////////////////////////////////////////////////////*/
    ISemaphore public semaphore;
    uint256 public groupId;

    /*//////////////////////////////////////////////////////////////////////////
                                      EVENTS
    //////////////////////////////////////////////////////////////////////////*/
    event GroupCreated(uint256 groupId);
    event GuardianAdded(uint256 groupId, uint256 identityCommitment);

    /*//////////////////////////////////////////////////////////////////////////
                                      ERROR
    //////////////////////////////////////////////////////////////////////////*/


    /*//////////////////////////////////////////////////////////////////////////
                                    CONSTRUCTOR
    //////////////////////////////////////////////////////////////////////////*/
    constructor(address _semaphore, uint256 _groupId) {
        // Set Semaphore
        semaphore = ISemaphore(_semaphore);
        groupId = _groupId;

        // Create new Semaphore group
        semaphore.createGroup(groupId, 20, address(this));
    }


    /*//////////////////////////////////////////////////////////////////////////
                                    READ FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/
    
    function isWallet(address target) external view returns (bool) {
        return _isWallet(target);
    }

    /*//////////////////////////////////////////////////////////////////////////
                                    WRITE FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/
    
    function createGuardianGroup() external {
        require(_isWallet(wallet), "Recovery: Wallet is not materialized");
        semaphore.createGroup(_addressToUint(msg.sender), 20, address(this));
    }

    function addGuardian(uint256 identityCommitment) external {
        require(_isWallet(wallet), "Recovery: Wallet is not materialized");
        semaphore.addMember(_addressToUint(msg.sender), identityCommitment);
    }
    
    // ------------------------------------------------------------------------
    // Counterfactual Guardian Initialization
    // ------------------------------------------------------------------------
    // The counterfactual methods allow a user to create a guardian group and add guardians
    // without having to deploy a wallet contract. This is useful for users who want to
    // create a guardian group for a wallet that HAS NOT been materialized yet.
    // ------------------------------------------------------------------------

    function createGuardianGroupFromCounterfactualWallet(
        address pki,
        uint256 salt,
        bytes calldata ownerSignture
    ) external {
        PKI resolver = PKI(pki);
        bytes32 commitmentHash = keccak256(abi.encodePacked(pki, salt));
        address signer = _recoverSigner(commitmentHash, ownerSignture);
        address wallet = resolver.computeAddress(address(this), signer, salt);
        uint256 computedGroupId = _addressToUint(wallet);
        semaphore.createGroup(computedGroupId, 20, address(this));
        emit GroupCreated(computedGroupId);
    }
    
    function addGuardianFromCounterfactualWallet(
        address pki,
        uint256 salt,
        uint256 identityCommitment, 
        bytes calldata ownerSignture
    ) external {
        PKI resolver = PKI(pki);
        bytes32 commitmentHash = keccak256(abi.encodePacked(identityCommitment));
        address signer = _recoverSigner(commitmentHash, ownerSignture);

        // Compute the address of the counterfactual wallet.
        address wallet = resolver.computeAddress(address(this), signer, salt);

        // We only allow adding guardians from counterfactual wallets.
        // If the wallet is not counterfactual, then the owner can add guardians via the `addGuardian` method.
        require(!_isWallet(wallet), "Recovery: Wallet is not counterfactual");

        // Add the Guardian to the Semaphore group
        uint256 computedGroupId = _addressToUint(wallet);
        semaphore.addMember(computedGroupId, identityCommitment);
        emit GuardianAdded(computedGroupId, identityCommitment);
    }

    function recoverWallet(
        uint256 merkleTreeRoot,
        uint256 signal,
        uint256 nullifierHash,
        uint256[8] calldata proof,
        Wallet wallet,
        address oldOwner, 
        address newOwner
    ) external {
        semaphore.verifyProof(groupId, merkleTreeRoot, signal, nullifierHash, groupId, proof);
        wallet.recover(oldOwner, newOwner);
    }

    /*//////////////////////////////////////////////////////////////////////////
                                    INTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/
    function _addressToUint(address _addr) internal pure returns (uint256) {
        return uint256(uint160(_addr));
    }

    function _isWallet(address target) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(target) }
        return size > 0;
    }

    function _recoverSigner(bytes32 msgHash, bytes memory msgSignature) internal pure returns (address) {
        bytes32 r;
        bytes32 s;
        uint8 v;

        bytes32 prefixedHash = keccak256(
          abi.encodePacked("\x19Ethereum Signed Message:\n32", msgHash)
        );

        //Check the signature length
        if (msgSignature.length != 65) {
            return (address(0));
        }

        // Divide the signature in r, s and v variables
        assembly {
            r := mload(add(msgSignature, 32))
            s := mload(add(msgSignature, 64))
            v := byte(0, mload(add(msgSignature, 96)))
        }

        // Version of signature should be 27 or 28, but 0 and 1 are also possible versions
        if (v < 27) {
            v += 27;
        }

        // If the version is correct return the signer address
        if (v != 27 && v != 28) {
            return (address(0));
        } else {
            return ecrecover(prefixedHash, v, r, s);
        }
    }

    /*//////////////////////////////////////////////////////////////////////////
                                DEPRECATED FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/
    function joinGroup(uint256 identityCommitment) external {
        semaphore.addMember(groupId, identityCommitment);
    }
   
}
