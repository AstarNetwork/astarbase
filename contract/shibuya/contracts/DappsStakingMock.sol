// SPDX-License-Identifier: BSD-3-Clause

pragma solidity 0.8.7;

/**
 * @title Dummy implementation for DappsStaking precompiled contract
 */
contract DappsStakingMock {

    // Storage getters

    /// @notice Dummy implementation. This code is implemented in precompiled contract
    /// @return era, The current era
    function read_current_era() external pure returns (uint256){
        return 0;
    }

    /// @notice Dummy implementation. This code is implemented in precompiled contract
    /// @return period, The unbonding period in eras
    function read_unbonding_period() external pure returns (uint256){
        return 0;
    }

    /// @notice Dummy implementation. This code is implemented in precompiled contract
    /// @return reward, Total network reward for the given era
    function read_era_reward(uint32 era) external pure returns (uint128){
        return era;
    }

    /// @notice Dummy implementation. This code is implemented in precompiled contract
    /// @return staked, Total staked amount for the given era
    function read_era_staked(uint32 era) external pure returns (uint128){
        return era;
    }

    /// @notice Dummy implementation. This code is implemented in precompiled contract
    /// @param staker in form of 20 or 32 hex bytes
    /// @return amount, Staked amount by the staker
    function read_staked_amount(bytes calldata staker) external pure returns (uint128){
        address bob = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
        address stakerAddress = bytesToAddress(staker);
        if (stakerAddress == bob) {
            return 50;
        }
        else{
            return 0;
        }
    }

    function bytesToAddress(bytes memory source) public pure returns(address addr) {
        assembly {
            addr := mload(add(source, 0x14))
        }
    }

    /// @notice Read Staked amount on a given contract for the staker
    /// @param contract_id contract evm address
    /// @param staker in form of 20 or 32 hex bytes
    /// @return amount, Staked amount by the staker
    function read_staked_amount_on_contract(address contract_id, bytes calldata staker) external pure returns (uint128){
        if (staker[0] != 0) {
            if (contract_id != address(0)){
                return 1;
            }
        }
        else{
            return 0;
        }
        return 0;
    }

    /// @notice Dummy implementation. This code is implemented in precompiled contract
    /// @return total, The most recent total staked amount on contract
    function read_contract_stake(address contract_id) external pure returns (uint128){
        if (contract_id != address(0)) {
            return 1;
        }
        else{
            return 0;
        }
    }

    // Extrinsic calls

    /// @notice Dummy implementation. This code is implemented in precompiled contract
    function register(address) external pure{
        return;
    }

    /// @notice Dummy implementation. This code is implemented in precompiled contract
    function bond_and_stake(address, uint128) external pure{
        return;
    }

    /// @notice Dummy implementation. This code is implemented in precompiled contract
    function unbond_and_unstake(address, uint128) external pure{
        return;
    }

    /// @notice Dummy implementation. This code is implemented in precompiled contract
    function withdraw_unbonded() external pure{
        return;
    }

    /// @notice Dummy implementation. This code is implemented in precompiled contract
    function claim_staker(address) external pure{
        return;
    }

    /// @notice Dummy implementation. This code is implemented in precompiled contract
    function claim_dapp(address, uint128) external pure{
        return;
    }

    enum RewardDestination {FreeBalance, StakeBalance}
    /// @notice Set reward destination for staker rewards
    function set_reward_destination(RewardDestination) external pure{
        return;
    }
}
