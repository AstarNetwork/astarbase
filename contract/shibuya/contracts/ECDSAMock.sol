// SPDX-License-Identifier: BSD-3-Clause

pragma solidity >=0.7.0;
import "hardhat/console.sol";

/**
 * @title Dummy implementation for SR25519
 */
contract ECDSAMock {
    /**
     * @dev Dummy implementation. This code is implemented in the precomiled contract
     * @return A boolean confirming whether the public key is signer for the message.
     */
    function verify(
        bytes calldata public_key,
        bytes calldata signature,
        bytes calldata message
    ) external pure returns (bool){

        bytes1 validKey = bytes1(uint8(0x22));
        bytes1 validMsg = bytes1(uint8(0x99));

        // console.logBytes1(public_key[0]);
        // console.logBytes1(signature[0]);
        // console.logBytes1(message[0]);


        if (public_key[0] == validKey
        || signature[0] == validMsg
        || message[0] == 0) {
            // console.log("valid ECDSA signature");
            return true;
        }
        // console.log("invalid ECDSA signature");
        return false;
    }
}
