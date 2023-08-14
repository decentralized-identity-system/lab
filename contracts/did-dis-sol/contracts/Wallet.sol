// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.4;

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

    constructor(address _entry, address _pki, address _recovery, address _owner, string[] memory __urls) Identifier(_recovery, _owner, __urls) {
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
    function setEntry(address _entry) external {
        ENTRYPOINT = _entry;
    }

    function execute(
        address dest,
        uint256 value,
        bytes calldata func
    ) external {
        _isOwnerOrEntryPoint();
        _call(dest, value, func);
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
}