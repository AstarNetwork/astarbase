// SPDX-License-Identifier: BSD-3-Clause

pragma solidity >=0.7.0;

/**
 * @title Dummy implementation for SR25519
 */
contract ECDSA {
    /**
     * @dev Dummy implementation. This code is implemented in the precomiled contract
     * @return A boolean confirming whether the public key is signer for the message.
     */
    function verify(
        bytes calldata public_key,
        bytes calldata signature,
        bytes calldata message
    ) external pure returns (bool){
        if (public_key[0] == 0 || signature[0] == 0 || message[0] == 0) return false;

        return true;
    }
}
