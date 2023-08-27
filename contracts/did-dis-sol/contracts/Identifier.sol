// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.4;

import "hardhat/console.sol";
import { OwnerManager } from "./OwnerManager.sol";
import { Shared } from "./Shared.sol";

contract Identifier is OwnerManager, Shared {
    /*//////////////////////////////////////////////////////////////////////////
                                   PUBLIC STORAGE
    //////////////////////////////////////////////////////////////////////////*/
    
    string[] private _urls;

    /*//////////////////////////////////////////////////////////////////////////
                                    ERRORS
    //////////////////////////////////////////////////////////////////////////*/
    
    error OffchainLookup(address sender, string[] urls, bytes callData, bytes4 callbackFunction, bytes extraData);

    /*//////////////////////////////////////////////////////////////////////////
                                    CONSTRUCTOR
    //////////////////////////////////////////////////////////////////////////*/
    
    constructor(address _recovery, address _owner, string[] memory __urls) OwnerManager(_recovery, _owner) {
        for (uint256 i = 0; i < __urls.length; i++) {
            _urls.push(__urls[i]);
        }
    }

    /*//////////////////////////////////////////////////////////////////////////
                                OVERRIDE FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/

    function getEntrypoint() public view virtual override returns (address) {
        return address(0x0);
    }

    /*//////////////////////////////////////////////////////////////////////////
                                PUBLIC FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/

    function urls() external view returns (string[] memory) {
        return _urls;
    }

    function setUrls(string[] memory __urls) external {
        // Clear existing URLs
        while (_urls.length > 0) {
            _urls.pop();
        }
        
        // Add new URLs
        for (uint256 i = 0; i < __urls.length; i++) {

            _urls.push(__urls[i]);
        }
    }

    function did() external view {
        bytes memory callData = abi.encodePacked(address(this));
        revert OffchainLookup(
            address(this),
            _urls,
            callData,
            this.document.selector,
            abi.encodePacked(getEntrypoint(), address(this))
        );
    }

    function document(bytes calldata response, bytes calldata) external view virtual returns (string memory DID) {
        bytes memory msgSignature = bytes(response[0:65]);
        bytes memory didHex = bytes(response[65:]);
        bytes32 msgHash2 = keccak256(abi.encodePacked(string(didHex)));
        address signer = _recoverSigner(msgHash2, msgSignature);
        require(owner[signer], "INVALID SIGNATURE");
        return string(didHex);
    }

    /*//////////////////////////////////////////////////////////////////////////
                                    INTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/

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

   
}
