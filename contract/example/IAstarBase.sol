// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0;

interface IAstarBase {
    /// @notice Check if given address was registered in Astarbase
    /// @param evmAddress, EVM address used for registration
    function isRegistered(address evmAddress) external view returns (bool);

    /// @notice Check if given address was registered and return staked amount
    /// @param evmAddress, EVM address used for registration
    /// @return amount, staked amount on the SS58 address (mapped with evmAddress)
    function checkStakerStatus(address evmAddress)
        external
        view
        returns (uint128);

    /// @notice Check if given address was registered and return staked amount
    /// @param evmAddress, EVM address used for registration
    /// @param contract_id, address of the contract in dapps-staking
    /// @return amount, staked amount on the SS58 address (mapped with evmAddress)
    function checkStakerStatusOnContract(address evmAddress, address contract_id)
        external
        view
        returns (uint128);
}
