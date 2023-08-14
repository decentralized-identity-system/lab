// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.19;

import { Identifier } from "./Identifier.sol";

contract Wallet is Identifier {
    /*//////////////////////////////////////////////////////////////////////////
                                   PUBLIC STORAGE
    //////////////////////////////////////////////////////////////////////////*/
    address internal PKI;
    address internal ENTRYPOINT;
    
    /*//////////////////////////////////////////////////////////////////////////
                                    CONSTRUCTOR
    //////////////////////////////////////////////////////////////////////////*/

    constructor(address _entry, address _pki, address _owner, string[] memory __urls) Identifier(_owner, __urls) {
        ENTRYPOINT = _entry;
        PKI = _pki;
    }

    /*//////////////////////////////////////////////////////////////////////////
                                OVERRIDE FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/
    function getEntrypoint() public view override returns (address) {
        return ENTRYPOINT;
    }

    /*//////////////////////////////////////////////////////////////////////////
                                PUBLIC FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/
    function execute(
        address dest,
        uint256 value,
        bytes calldata func
    ) external {
        _isOwnerOrEntryPoint();
        _call(dest, value, func);
    }
    

    function setEntry(address _entry) external {
        ENTRYPOINT = _entry;
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

}