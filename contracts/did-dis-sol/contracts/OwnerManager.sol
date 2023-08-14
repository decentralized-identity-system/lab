// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.4;

contract OwnerManager {

    /*//////////////////////////////////////////////////////////////////////////
                                   PUBLIC STORAGE
    //////////////////////////////////////////////////////////////////////////*/
    address public recovery;
    uint256 internal ownerCount;
    mapping(address => bool) public owner;


    /*//////////////////////////////////////////////////////////////////////////
                                    EVENTS
    //////////////////////////////////////////////////////////////////////////*/
    
    event AddedOwner(address indexed owner);
    event RemovedOwner(address indexed owner);

    /*//////////////////////////////////////////////////////////////////////////
                                     CONSTRUCTOR
    //////////////////////////////////////////////////////////////////////////*/

    constructor(address _recovery, address _owner) {
        recovery = _recovery;
        _addOwner(_owner);
    }

    /*//////////////////////////////////////////////////////////////////////////
                                    READ FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/

    function isOwner(address target) external view returns (bool) {
        return _isOwner(target);
    }

    /*//////////////////////////////////////////////////////////////////////////
                                    WRITE FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/

    function recover (
        address currentOwner,
        address newOwner
    ) external {
        require(msg.sender == recovery, "OwnerManager: sender is not recovery agent");
        _removeOwner(currentOwner);
        _addOwner(newOwner);
    }

    function addOwner(address target) external {
        _isOwnerOrEntryPoint();
        _addOwner(target);
    }

    function removeOwner(address target) external {
        _isOwnerOrEntryPoint();
        _removeOwner(target);
    }

    /*//////////////////////////////////////////////////////////////////////////
                                    INTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/

    function _isOwner(address target) internal view returns (bool) {
        return owner[target];
    }

    function _addOwner(address target) internal {
        require(!_isOwner(target), "OwnerManager: target is already an owner");
        owner[target] = true;
        ownerCount++;
        emit AddedOwner(target);
    }

    function _removeOwner(address target) internal {
        require(_isOwner(target), "OwnerManager: target is not an owner");
        owner[target] = false;
        ownerCount--;
        emit RemovedOwner(target);
    }

    function _isOwnerOrEntryPoint() internal view {
        require(_isOwner(msg.sender) || msg.sender == address(this), "OwnerManager: sender is not an owner or entry point");
    }


}