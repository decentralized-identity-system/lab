// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;

// import "hardhat/console.sol";
import {Wallet} from "./Wallet.sol";
import {IWalletFactory} from "./interfaces/IWalletFactory.sol";
import {Create2} from "./utils/Create2.sol";

contract PKI is IWalletFactory {
    /*//////////////////////////////////////////////////////////////////////////
                                   PUBLIC STORAGE
    //////////////////////////////////////////////////////////////////////////*/
    string[] public urls;
    address internal ENTRYPOINT;

    /*//////////////////////////////////////////////////////////////////////////
                                    ERROR EVENTS
    //////////////////////////////////////////////////////////////////////////*/
    error InvalidOperation();
    error OffchainLookup(address sender, string[] urls, bytes callData, bytes4 callbackFunction, bytes extraData);

    /*//////////////////////////////////////////////////////////////////////////
                                    CONSTRUCTOR
    //////////////////////////////////////////////////////////////////////////*/
    constructor(address _entry, string[] memory _urls) {
        ENTRYPOINT = _entry;
        for (uint256 i = 0; i < _urls.length; i++) {
            urls.push(_urls[i]);
        }
    }

    /*//////////////////////////////////////////////////////////////////////////
                                    READ FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/

    function isWallet(address target) external view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(target) }
        return size > 0;
    }

    function computeAddress(address walletOwner, uint256 salt)
        public
        view
        override
        returns (address)
    {
        return Create2.computeAddress(
            bytes32(salt),
            keccak256(abi.encodePacked(type(Wallet).creationCode, abi.encode(ENTRYPOINT, address(this), walletOwner, urls)))
        );
    }

    function walletExists(address target) external view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(target) }
        return size > 0;
    }

    function did(string calldata id) external view {
        address pki = _stringToAddress(id[11:53]);
        address wallet = _stringToAddress(id[54:96]);
        bytes memory callData = abi.encodePacked(wallet);
        require(pki == address(this), "PKI: The DID document is not managed by this resolver");
        if(!_isWallet(wallet)) {
            revert OffchainLookup(
                address(this),
                urls,
                callData,
                this.document.selector,
                abi.encodePacked(pki, wallet)
            );
        } else {
            Wallet _wallet = Wallet(payable(wallet));
            string[] memory __urls = _wallet.urls();
            revert OffchainLookup(
                address(this),
                __urls,
                callData,
                this.resolve.selector,
                abi.encodePacked(pki, wallet)
            );
        }
    }
    
    function document(bytes calldata response, bytes calldata extraData) external view virtual returns (string memory DID) {
        // Stateful Response from the `did` method
        bytes memory pki = extraData[0:20];
        bytes memory wallet = extraData[20:40];

        // Reponse from Offchain Data Storage
        bytes memory saltBytes = response[0:32];
        bytes memory didSiganture = response[97:162];
        bytes memory walletSignature = response[32:97];
        bytes memory didHex = response[162:];

        // Hash the DID and the counterfactual Smart Wallet
        bytes32 didMsg = keccak256(abi.encodePacked(string(didHex)));
        address didSigner = _recoverSigner(didMsg, didSiganture);
        
        // Hash the entry point, the DID signer (counterfactual smart wallet owner) and the salt.
        bytes32 walletMsg = keccak256(abi.encodePacked(pki, didSigner, saltBytes));

        // Recover the signer of the counterfactual Smart Wallet
        address walletSigner = _recoverSigner(walletMsg, walletSignature);

        // Check that the same signer signed both the DID and the counterfactual Smart Wallet
        address walletComputed = computeAddress(didSigner, _bytesToUint256(saltBytes));
        require(walletComputed == _bytesToAddress(wallet), "INVALID WALLET ADDRESS");

        // Check that the signer of the Smart Wallet is the same as the signer of the DID
        require(walletSigner == didSigner, "INVALID SIGNATURE");
        return string(didHex);
    }

    function resolve(bytes calldata response, bytes calldata extraData) external view virtual returns (string memory DID) {
        // Stateful Response from the `did` method
        bytes memory pki = extraData[0:20];
        bytes memory wallet = extraData[20:40];

        // Reponse from Offchain Data Storage
        bytes memory msgSignature = bytes(response[0:65]);
        bytes memory didHex = bytes(response[65:]);
        bytes32 msgHash2 = keccak256(abi.encodePacked(string(didHex)));
        address signer = _recoverSigner(msgHash2, msgSignature);

        Wallet _wallet = Wallet(payable(_bytesToAddress(wallet)));
        require(_wallet.isOwner(signer), "INVALID SIGNATURE");
        return string(didHex);
    }

    /*//////////////////////////////////////////////////////////////////////////
                                    WRITE FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/
    function deployWallet(address walletOwner, uint256 salt)
        external
        override
        returns (Wallet)
    {
        address walletAddress = computeAddress(walletOwner, salt);

        // Determine if a wallet is already deployed at this address, if so return that
        uint256 codeSize = walletAddress.code.length;
        if (codeSize > 0) {
            return Wallet(payable(walletAddress));
        } else {
            // Deploy the wallet
            // string[] memory __urls = new string[](1);
            // __urls[0] = urls[0];
            Wallet wallet = new Wallet{salt: bytes32(salt)}(ENTRYPOINT, address(this), walletOwner, urls);
            return wallet;
        }
    }

    /*//////////////////////////////////////////////////////////////////////////
                                    INTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/

    function _isWallet(address target) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(target) }
        return size > 0;
    }

    function _bytesToUint256(bytes memory data) internal pure returns (uint256 result) {
        require(data.length >= 32, "Invalid data length");
        assembly {
            result := mload(add(data, 0x20))
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

    function _bytesToAddress(bytes memory data) internal pure returns (address) {
        require(data.length == 20, "Invalid data length"); // Ensure the data length is 20 bytes (address size)
        
        address addr;
        assembly {
            addr := mload(add(data, 20)) // Load 20 bytes (address size) starting from the data offset
        }
        
        return addr;
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
