// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.8.0;
// ============ Internal Imports ============
import {AbstractRoutingIsm} from "./AbstractRoutingIsm.sol";
import {IInterchainSecurityModule} from "../../../interfaces/IInterchainSecurityModule.sol";
import {Message} from "../../libs/Message.sol";
import {InterchainAccountMessage} from "../../libs/middleware/InterchainAccountMessage.sol";

/**
 * @title InterchainAccountIsm
 */
contract InterchainAccountIsm is AbstractRoutingIsm {
    // ============ Public Functions ============

    function route(bytes calldata _message)
        public
        view
        virtual
        override
        returns (IInterchainSecurityModule)
    {
        return
            IInterchainSecurityModule(
                InterchainAccountMessage.ism(Message.body(_message))
            );
    }
}