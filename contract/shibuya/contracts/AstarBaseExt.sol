// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./DappsStakingDummy.sol";
import "./SR25519Dummy.sol";

/// @author The Astar Network Team
/// @title Astarbase. Mapping of Stakers ss58 <> H160
contract AstarBaseExt is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public registeredCnt;
    bytes PREFIX= hex"3c42797465733e";
    bytes POSTFIX= hex"3c2f42797465733e";
    bool public paused;
    mapping(address => bytes32) public addressMap;
    mapping(bytes32 => address) public ss58Map;
    DappsStaking public DAPPS_STAKING = DappsStaking(0x0000000000000000000000000000000000005001);
    SR25519 public SR25519Contract = SR25519(0x0000000000000000000000000000000000005002);
    string MSG_PREFIX = "Sign this to register to AstarBase for:";
    uint256 public unregisterFee = 1 ether;
    address public beneficiary = 0x91986602d9c0d8A4f5BFB5F39a7Aa2cD73Db73B7; // Faucet on all Astar networks

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
        require(ss58Map[ss58PublicKey] == address(0), "Already used ss58 Public Key");
        require(addressMap[msg.sender] == 0, "Already registered evm address");

        bytes memory messageBytes = bytes(MSG_PREFIX);
        bytes memory addressInBytes = abi.encodePacked(msg.sender);
        bytes memory fullMessage = bytes.concat(PREFIX, messageBytes, ss58PublicKey, addressInBytes, POSTFIX);
        bool address_verified = SR25519Contract.verify(ss58PublicKey, signedMsg, fullMessage);
        require(address_verified, "Signed message not confirmed");

        addressMap[msg.sender] = ss58PublicKey;
        ss58Map[ss58PublicKey] = msg.sender;
        registeredCnt.increment();
    }

    /// @notice unRegister senders' address
    function unRegister() public payable {
        require(!paused, "The contract is paused");
        require(msg.value == unregisterFee, "Not enough funds to unregister");

        unRegisterExecute(msg.sender);
    }

    /// @notice unRegister any address by contract owner
    /// @param evmAddress, EVM address used for registration
    function sudoUnRegister(address evmAddress) public onlyOwner {
        unRegisterExecute(evmAddress);
    }

    /// @notice execute unRegister function
    /// @param evmAddress, EVM address used for registration
    function unRegisterExecute(address evmAddress) private {
        require(addressMap[evmAddress] != 0, "Unregistring unknown entry");

        bytes32 ss58PublicKey = bytes32(addressMap[evmAddress]);
        addressMap[evmAddress] = 0;
        ss58Map[ss58PublicKey] = address(0);
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

    /// @notice set new value for the unregisterFee
    /// @param _newCost new fee cost
    function setUnregisterFee(uint256 _newCost) public onlyOwner {
        unregisterFee = _newCost;
    }

    /// @notice set new beneficiary
    /// @param _newBeneficiary new beneficiary address
    function setBeneficiary(address _newBeneficiary) public onlyOwner {
        beneficiary = _newBeneficiary;
    }

    /// @notice withdraw contract's funds
    function withdraw() public payable {
        (bool success, ) = payable(beneficiary).call{value: address(this).balance}("");
        require(success);
    }

    /// @notice setting precompile addresses for unit test purposes
    /// @param dapps Dapps-staking precompile address
    /// @param sr25529 SR25529 precompile address
    function setPrecompileAddresses(address dapps, address sr25529) public onlyOwner {
        DAPPS_STAKING = DappsStaking(dapps);
        SR25519Contract = SR25519(sr25529);
    }
}