// SPDX-License-Identifier: BSD-3-Clause
import "hardhat/console.sol";

pragma solidity 0.8.7;

/**
 * @title Dummy implementation for SR25519
 */
contract SR25519Mock {
    /**
     * @dev Dummy implementation. This code is implemented in the precomiled contract
     * @return A boolean confirming whether the public key is signer for the message.
     */
    function verify(
        bytes32 public_key,
        bytes calldata signature,
        bytes calldata message
    ) external pure returns (bool){


        bytes1 validKey = bytes1(uint8(0x11));
        bytes1 validMsg = bytes1(uint8(0x99));

        // console.logBytes1(public_key[0]);
        // console.logBytes1(signature[0]);
        // console.logBytes1(message[0]);

        if( public_key[0] == validKey
            && signature[0] == validMsg
        ){
            // console.log("valid sr25519 signature");
            return true;
        }

        // console.log("invalid sr25519 signature");
        return false;
    }
}