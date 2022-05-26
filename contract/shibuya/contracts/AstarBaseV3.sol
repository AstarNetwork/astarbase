// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;
import "hardhat/console.sol";


import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./DappsStakingDummy.sol";
import "./SR25519Dummy.sol";
import "./ECDSADummy.sol";
import "./AstarBaseExt.sol";

/// @author The Astar Network Team
/// @title Astarbase. A voluntary mapping of accounts ss58 <> H160
contract AstarBaseV4
 is Initializable, OwnableUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter public registeredCnt;
    uint256 public version;
    bytes PREFIX;
    bytes POSTFIX;
    string MSG_PREFIX;
    address public beneficiary;
    uint256 public unregisterFee;
    bool public paused;
    mapping(address => bytes) public addressMap;
    mapping(bytes => address) public ss58Map;
    DappsStaking public DAPPS_STAKING;
    SR25519 public SR25519Contract;
    ECDSA public ECDSAContract;

    // Emitted when the getVersion() is called
    event ContractVersion(uint256 newValue);
    event AstarBaseRegistered(address newEntry);

    // New global variables need to be added at the end, due to upgradable contract
    address public externalAstarbaseAddress;

    function initialize() public initializer {
        __Ownable_init();
        registeredCnt.reset();
        version = 0;
        PREFIX = hex"3c42797465733e";
        POSTFIX = hex"3c2f42797465733e";
        paused = false;
        MSG_PREFIX = "Sign this to register to AstarBase for:";
        unregisterFee = 1 ether;
        beneficiary = 0x91986602d9c0d8A4f5BFB5F39a7Aa2cD73Db73B7; // Faucet on all Astar networks
        DAPPS_STAKING = DappsStaking(0x0000000000000000000000000000000000005001);
        SR25519Contract = SR25519(0x0000000000000000000000000000000000005002);
        ECDSAContract = ECDSA(0x0000000000000000000000000000000000005003);
    }

    /// @notice Check upgradable contract version.
    /// @notice Change this version value for each new contract upgrade
    function getVersion() public {
        version = 4;
        emit ContractVersion(4);
    }

    /// @notice Register senders' address with corresponding SS58 address and store to mapping
    /// @notice The accounts authenticity is verified through signature
    /// @param ss58PublicKey, SS58 address used for signing
    /// @param signedMsg, The message that was signed should be constructed as:
    ///                   MSG_PREFIX + ss58PublicKey + msg.sender
    function register(bytes calldata ss58PublicKey, bytes calldata signedMsg) external {
        require(!paused, "The contract is paused");
        require(ss58PublicKey.length != 0, "Can't register ss58PublicKey with 0");
        require(ss58Map[ss58PublicKey] == address(0), "Already used ss58 Public Key");
        require(addressMap[msg.sender].length == 0, "Already registered evm address");

        bytes memory messageBytes = bytes(MSG_PREFIX);
        bytes memory addressInBytes = abi.encodePacked(msg.sender);
        bytes memory fullMessage = bytes.concat(PREFIX, messageBytes, ss58PublicKey, addressInBytes, POSTFIX);
        bytes32 pubKey = bytesToBytes32(ss58PublicKey, 0);
        bool address_verified = SR25519Contract.verify(pubKey, signedMsg, fullMessage);

        // ECDSA verify
        if (!address_verified) {
            address_verified = ECDSAContract.verify(ss58PublicKey, signedMsg, fullMessage);
        }

        require(address_verified, "Signed message not confirmed");

        registerExecute(msg.sender, ss58PublicKey);
    }

    /// @notice Execute register function
    /// @param evmAddress, EVM address used for registration
    /// @param ss58PublicKey, SS58 address used for signing
    function registerExecute(address evmAddress, bytes memory ss58PublicKey) private {
        addressMap[evmAddress] = ss58PublicKey;
        ss58Map[ss58PublicKey] = evmAddress;
        registeredCnt.increment();
        emit AstarBaseRegistered(msg.sender);
    }

    /// @notice helper function to cast bytes to bytes32
    /// @param inputByte bytes to be casted
    /// @param offset The the start byte to be copied
    function bytesToBytes32(bytes calldata inputByte, uint offset) private pure returns (bytes32) {
        bytes32 out;

        for (uint i = 0; i < 32; i++) {
            out |= bytes32(inputByte[offset + i] & 0xFF) >> (i * 8);
        }
        return out;
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
        require(addressMap[evmAddress].length != 0, "Unregistring unknown entry");

        bytes memory ss58PublicKey = bytes(addressMap[evmAddress]);
        addressMap[evmAddress] = "";
        ss58Map[ss58PublicKey] = address(0);
        registeredCnt.decrement();
    }

    /// @notice Check if given address was registered
    /// @param evmAddress, EVM address used for registration
    function isRegistered(address evmAddress) public returns (bool) {
        require(evmAddress != address(0), "Bad input address");
        bytes memory ss58PublicKey = addressMap[evmAddress];
        console.log("isRegistered enter in V4");

        // check external Astarbase - applicable only for Shiden Network
        if (ss58PublicKey.length == 0) {
            console.log(externalAstarbaseAddress);
            if (externalAstarbaseAddress != address(0)){
                console.log("call externalAstarBaseCheck");
                ss58PublicKey = externalAstarBaseCheck(evmAddress);
            }
        }
        console.log(ss58PublicKey.length != 0);

        return ss58PublicKey.length != 0;
    }

    /// @notice sets external Astarbase contract address - applicable for Shiden only
    /// @param _externalAstarbaseAddress, EVM address of external Astarbase contract
    function setExternalAstarbaseAddress(address _externalAstarbaseAddress) external onlyOwner {
        externalAstarbaseAddress = _externalAstarbaseAddress;
        console.log("externalAstarBase is set");
    }

    /// @notice sets external Astarbase contract address - applicable for Shiden only
    ///         The external (old) Astarbase used bytes32 for private key
    /// @param evmAddress, EVM address of external Astarbase contract
    function externalAstarBaseCheck(address evmAddress) public returns (bytes memory){
        require(externalAstarbaseAddress != address(0), "Unknown external Astarbase address");
        console.log("externalAstarBaseCheck");

        AstarBaseExt externalAstarBase = AstarBaseExt(externalAstarbaseAddress);
        bytes32 ss58PublicKey32 = externalAstarBase.addressMap(evmAddress);
        bytes memory ss58PublicKey = abi.encodePacked(ss58PublicKey32);
        if (ss58PublicKey32 != 0){
            console.log("external ss58PublicKey32 found");
            console.logBytes32(ss58PublicKey32);
            // register to avoid check in external astarbase next time
            registerExecute(evmAddress, ss58PublicKey);
        }
        return ss58PublicKey;
    }


    /// @notice Check if given address was registered and return staked amount on contract
    /// @param evmAddress, EVM address used for registration
    /// @param stakingContract, contract address
    /// @return staked amount for the SS58 address
    function checkStakerStatusOnContract(address evmAddress, address stakingContract) public view returns (uint128) {
        bytes memory ss58PublicKey = addressMap[evmAddress];

        if (ss58PublicKey.length == 0) {
            return 0;
        }

        uint128 stakedAmount = DAPPS_STAKING.read_staked_amount_on_contract(stakingContract, ss58PublicKey);

        return stakedAmount;
    }

    /// @notice Check if given address was registered and return staked amount
    /// @param evmAddress, EVM address used for registration
    /// @return staked amount on the SS58 address
    function checkStakerStatus(address evmAddress) public view returns (uint128) {
        bytes memory ss58PublicKey = addressMap[evmAddress];

        if (ss58PublicKey.length == 0) {
            return 0;
        }

        uint128 stakedAmount = DAPPS_STAKING.read_staked_amount(ss58PublicKey);

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
    function setPrecompileAddresses(address dapps, address sr25529, address ecdsa) public onlyOwner {
        DAPPS_STAKING = DappsStaking(dapps);
        SR25519Contract = SR25519(sr25529);
        ECDSAContract = ECDSA(ecdsa);
    }
}
