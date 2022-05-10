// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./IAstarBase.sol";

contract BestProject is ERC20 {
    IAstarBase public ASTARBASE = IAstarBase(0xF183f51D3E8dfb2513c15B046F848D4a68bd3F5D); //Shibuya deployment
    address MY_STAKING_PROJECT = 0xDE0f34d2845511c20bAb0d7ce02B03c8065ff0c5; // Uniswap on Shibuya
    uint256 ALLOWED_CLAIM = 10 * 10 ** decimals();

    constructor() ERC20("BestProject", "ABT") {}

    function claim() public {
        require(isPassHolder(msg.sender), "Claim allowed only for stakers registered in AstarPass");

        _mint(msg.sender, ALLOWED_CLAIM);

    }

    /// @notice this function verifies staker status on a contract by using caller's account
    /// @param user caller's account
    /// @return passHolderStatus boolean
    function isPassHolder(address user) private view returns (bool) {
        // The returned value from checkStakerStatus() call is the staked amount,
        // but we don't use it in this smart contract,
        // we only check if staked amount is > 0
        uint128 staker = ASTARBASE.checkStakerStatusOnContract(user, MY_STAKING_PROJECT);

        return staker > 0;
    }
}