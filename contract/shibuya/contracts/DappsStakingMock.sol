// SPDX-License-Identifier: BSD-3-Clause
import "hardhat/console.sol";
import {Memory} from "./Memory.sol";


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
    function read_staked_amount(bytes calldata staker) external view returns (uint128){
        // make hardhat bob account to be staker
        bytes memory bobSS58 = bytes(hex"1111111111111111111111111111111111111111111111111111111111111111");
        if (equals(staker, bobSS58)) {
            // console.log("staker confirmed:");
            // console.logBytes(staker);
            return 50;
        }
        else{
            return 0;
        }
    }

    /// @notice Read Staked amount on a given contract for the staker
    /// @param contract_id contract evm address
    /// @param staker in form of 20 or 32 hex bytes
    /// @return amount, Staked amount by the staker
    function read_staked_amount_on_contract(address contract_id, bytes calldata staker) external view returns (uint128){
        // make hardhat bob account to be staker
        bytes memory bobSS58 = bytes(hex"1111111111111111111111111111111111111111111111111111111111111111");
        address stakedContract = 0xaAaAaAaaAaAaAaaAaAAAAAAAAaaaAaAaAaaAaaAa;
        // console.log("contract %s", contract_id);
        // console.logBytes(staker);
        if (equals(staker, bobSS58)
            && contract_id == stakedContract
        ) {
            if (contract_id != address(0)){
                // console.log("staker confirmed:");
                // console.logBytes(staker);
                return 50;
            }
        }
        else{
            // console.log("staker not confirmed 1");
            return 0;
        }
        console.log("staker not confirmed 2");
        return 0;
    }

    // Checks if two `bytes memory` variables are equal. This is done using hashing,
    // which is much more gas efficient then comparing each byte individually.
    // Equality means that:
    //  - 'self.length == other.length'
    //  - For 'n' in '[0, self.length)', 'self[n] == other[n]'
    function equals(bytes memory self, bytes memory other) internal pure returns (bool equal) {
        if (self.length != other.length) {
            return false;
        }
        uint addr;
        uint addr2;
        assembly {
            addr := add(self, /*BYTES_HEADER_SIZE*/32)
            addr2 := add(other, /*BYTES_HEADER_SIZE*/32)
        }
        equal = Memory.equals(addr, addr2, self.length);
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
