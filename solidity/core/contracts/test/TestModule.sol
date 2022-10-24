// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.8.0;

import {IInterchainSecurityModule} from "../../interfaces/IInterchainSecurityModule.sol";

contract TestModule is IInterchainSecurityModule {
    bool public accept;

    function setAccept(bool _val) external {
        accept = _val;
    }

    function verify(bytes calldata, bytes calldata)
        external
        view
        returns (bool)
    {
        return accept;
    }
}
