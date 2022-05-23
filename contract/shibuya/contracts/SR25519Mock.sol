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

        // console.logBytes1(public_key[31]);
        // console.logBytes1(signature[31]);

        if( public_key[31] == validKey
            && signature[31] == validMsg
            && message[31] == 0
        )
             return true;

        return false;
    }
}