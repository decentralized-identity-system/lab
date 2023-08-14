// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.4;

import "@semaphore-protocol/contracts/interfaces/ISemaphore.sol";
import { Wallet } from "./Wallet.sol";
contract Recovery {
    /*//////////////////////////////////////////////////////////////////////////
                                   PUBLIC STORAGE
    //////////////////////////////////////////////////////////////////////////*/
    Wallet public wallet;

    ISemaphore public semaphore;
    uint256 public groupId;

    /*//////////////////////////////////////////////////////////////////////////
                                    ERROR EVENTS
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
                                    PUBLIC FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/
    function joinGroup(uint256 identityCommitment) external {
        semaphore.addMember(groupId, identityCommitment);
    }


    function isWallet(address target) external view returns (bool) {
        return _isWallet(target);
    }

    function recoverWallet(
        uint256 merkleTreeRoot,
        uint256 feedback,
        uint256 nullifierHash,
        uint256[8] calldata proof,
        Wallet wallet,
        address oldOwner, 
        address newOwner
    ) external {
        semaphore.verifyProof(groupId, merkleTreeRoot, feedback, nullifierHash, groupId, proof);
        wallet.recover(oldOwner, newOwner);
    }

    /*//////////////////////////////////////////////////////////////////////////
                                    INTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/

    function _isWallet(address target) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(target) }
        return size > 0;
    }

   
}
