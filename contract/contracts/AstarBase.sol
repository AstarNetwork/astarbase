// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./DappsStaking.sol";
import "./SR25519.sol";

/// @author The Astar Network Team
/// @title Astarbase. Mapping of Stakers ss58 <> H160
contract AstarBase is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public registeredCnt;
    bytes PREFIX= hex"3c42797465733e";
    bytes POSTFIX= hex"3c2f42797465733e";
    bool public paused;
    mapping(address => bytes32) public addressMap;
    DappsStaking public constant DAPPS_STAKING = DappsStaking(0x0000000000000000000000000000000000005001);
    SR25519 public constant SR25519Contract = SR25519(0x0000000000000000000000000000000000005002);
    string MSG_PREFIX = "Sign this to register to AstarBase for:";

    constructor() {
        paused = false;
    }

    /// @notice Register senders' address with corresponding SS58 address and store to mapping
    /// @param ss58PublicKey, SS58 address used for signing
    /// @param signedMsg, The message that was signed should be constructed as:
    ///                   MSG_PREFIX + ss58PublicKey + msg.sender
    function register(bytes32 ss58PublicKey, bytes calldata signedMsg) external {
        require(!paused, "The contract is paused");
        require(ss58PublicKey != 0, "Can't register ss58PublicKey with 0");

        bytes memory messageBytes = bytes(MSG_PREFIX);
        bytes memory addressInBytes = abi.encodePacked(msg.sender);
        bytes memory fullMessage = bytes.concat(PREFIX, messageBytes, ss58PublicKey, addressInBytes, POSTFIX);
        bool address_verified = SR25519Contract.verify(ss58PublicKey, signedMsg, fullMessage);
        require(address_verified, "Signed message not confirmed");

        addressMap[msg.sender] = ss58PublicKey;

        registeredCnt.increment();
    }

    /// @notice unRegister senders' address
    function unRegister() public {
        require(!paused, "The contract is paused");
        require(addressMap[msg.sender] != 0, "Unregistring unknown entry");

        addressMap[msg.sender] = 0;
        registeredCnt.decrement();
    }

    /// @notice unRegister any address by contract owner
    /// @param evmAddress, EVM address used for registration
    function sudoUnRegister(address evmAddress) public onlyOwner {
        require(addressMap[evmAddress] != 0, "Unregistring unknown entry");

        addressMap[evmAddress] = 0;
        registeredCnt.decrement();
    }

    /// @notice Check if given address was registered
    /// @param evmAddress, EVM address used for registration
    function isRegistered(address evmAddress) public view returns (bool) {
        bytes32 ss58PublicKey = addressMap[evmAddress];

        return ss58PublicKey != 0;
    }

    /// @notice Check if given address was registered and return staked amount
    /// @param evmAddress, EVM address used for registration
    /// @return staked amount on the SS58 address
    function checkStakerStatus(address evmAddress) public view returns (uint128) {
        bytes32 ss58PublicKey = addressMap[evmAddress];
        bytes memory pubKeyBytes = bytes(abi.encodePacked(ss58PublicKey));
        uint128 stakedAmount = DAPPS_STAKING.read_staked_amount(pubKeyBytes);

        return stakedAmount;
    }

    /// @notice Pause register and unregister functions
    /// @param _state, true or false
    function pause(bool _state) public onlyOwner {
        paused = _state;
    }
}
