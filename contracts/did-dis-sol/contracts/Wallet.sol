// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.19;

contract Wallet {
    
    error OffchainLookup(address sender, string[] urls, bytes callData, bytes4 callbackFunction, bytes extraData);

    mapping(address => bool) public owner;

    /*//////////////////////////////////////////////////////////////////////////
                                   PUBLIC STORAGE
    //////////////////////////////////////////////////////////////////////////*/
    string[] private _urls;

    address internal ENTRYPOINT;
    address internal PKI;
    
    /*//////////////////////////////////////////////////////////////////////////
                                    CONSTRUCTOR
    //////////////////////////////////////////////////////////////////////////*/

    constructor(address _entry, address _pki, address _owner, string[] memory __urls) {
        ENTRYPOINT = _entry;
        PKI = _pki;
        owner[_owner] = true;
        for (uint256 i = 0; i < _urls.length; i++) {
            _urls.push(__urls[i]);
        }
    }

    /*//////////////////////////////////////////////////////////////////////////
                           EXTERNAL CONSTANT FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/
    function urls() external view returns (string[] memory) {
        return _urls;
    }

    function isOwner(address target) external view returns (bool) {
        return owner[target];
    }

    function execute(
        address dest,
        uint256 value,
        bytes calldata func
    ) external {
        _isOwnerOrEntryPoint();
        _call(dest, value, func);
    }
    
    function did() external view {
        bytes memory callData = abi.encodePacked(address(this));
        revert OffchainLookup(
            address(this),
            _urls,
            callData,
            this.document.selector,
            abi.encodePacked(PKI, address(this))
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

    function setEntry(address _entry) external {
        ENTRYPOINT = _entry;
    }

    function setUrls(string[] memory __urls) external {
        // Clear existing URLs
        for (uint256 i = 0; i < _urls.length; i++) {
            delete _urls[i];
        }

        // Add new URLs
        for (uint256 i = 0; i < __urls.length; i++) {
            _urls.push(__urls[i]);
        }
    }

    /*//////////////////////////////////////////////////////////////////////////
                           INTERNAL CONSTANT FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/

    function _call(address target, uint256 value, bytes memory data) internal {
        assembly {
            let success := call(
                gas(),
                target,
                value,
                add(data, 0x20),
                mload(data),
                0,
                0
            )
            if iszero(success) {
                mstore(0x00, 0x3204506f) // `CallFailed()`.
                revert(0x1c, 0x04)
            }
        }
    }

    function _stringToAddress(string memory _str) internal pure returns (address) {
        bytes memory strBytes = bytes(_str);
        require(strBytes.length == 42, "Invalid address length");

        uint256 result = 0;
        for (uint256 i = 0; i < 40; i++) {
            uint256 charValue = uint256(uint8(strBytes[i + 2])); // Skip '0x' prefix
            if (charValue >= 48 && charValue <= 57) {
                charValue -= 48;
            } else if (charValue >= 65 && charValue <= 70) {
                charValue -= 55;
            } else if (charValue >= 97 && charValue <= 102) {
                charValue -= 87;
            } else {
                revert("Invalid character in address");
            }
            result = result * 16 + charValue;
        }
        return address(uint160(result));
    }

    function _isOwnerOrEntryPoint() internal view {
        assembly {
            let owner_ := sload(not(0x8b78c6d8))
            if iszero(or(eq(caller(), owner_), eq(caller(), ENTRYPOINT.slot))) {
                mstore(0x00, 0x82b42900) // `Unauthorized()`.
                revert(0x1c, 0x04)
            }
        }
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