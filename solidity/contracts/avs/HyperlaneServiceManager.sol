// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.8.0;

/**
 * @title Interface for a `ServiceManager`-type contract.
 * @author Layr Labs, Inc.
 * @notice Terms of Service: https://docs.eigenlayer.xyz/overview/terms-of-service
 */
interface IServiceManager {
    // ServiceManager proxies to the slasher
    // function slasher() external view returns (ISlasher);

    /// @notice function that causes the ServiceManager to freeze the operator on EigenLayer, through a call to the Slasher contract
    /// @dev this function should contain slashing logic to make sure operators are not needlessly being slashed
    /// THIS IS ONLY A TEMPORARY PLACE HOLDER UNTIL SLASHING IS FULLY IMPLEMENTED
    function freezeOperator(address operator) external;

    /// @notice required since the registry contract will call this function to permission its upgrades to be done by the same owner as the service manager
    function owner() external view returns (address);
}

contract HyperlaneServiceManager is IServiceManager {}
