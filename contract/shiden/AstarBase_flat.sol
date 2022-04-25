// SPDX-License-Identifier: MIT

// File: contracts/SR25519Dummy.sol
pragma solidity >=0.7.0;

/**
 * @title Dummy implementation for SR25519
 */
contract SR25519 {
    /**
     * @dev Dummy implementation. This code is implemented in the precomiled contract
     * @return A boolean confirming whether the public key is signer for the message.
     */
    function verify(
        bytes32 public_key,
        bytes calldata signature,
        bytes calldata message
    ) external pure returns (bool){
        if( public_key == 0 || signature[0] == 0 || message[0] == 0) return false;

        return true;
    }
}

// File: contracts/DappsStakingDummy.sol
pragma solidity >=0.7.0;

/**
 * @title Dummy implementation for DappsStaking precompiled contract
 */
contract DappsStaking {

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
        if (staker[0] != 0) {
            return 1;
        }
        else{
            return 0;
        }
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
}

// File: @openzeppelin/contracts/utils/Context.sol


// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity ^0.8.0;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

// File: @openzeppelin/contracts/access/Ownable.sol


// OpenZeppelin Contracts v4.4.1 (access/Ownable.sol)

pragma solidity ^0.8.0;


/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

// File: @openzeppelin/contracts/utils/Counters.sol


// OpenZeppelin Contracts v4.4.1 (utils/Counters.sol)

pragma solidity ^0.8.0;

/**
 * @title Counters
 * @author Matt Condon (@shrugs)
 * @dev Provides counters that can only be incremented, decremented or reset. This can be used e.g. to track the number
 * of elements in a mapping, issuing ERC721 ids, or counting request ids.
 *
 * Include with `using Counters for Counters.Counter;`
 */
library Counters {
    struct Counter {
        // This variable should never be directly accessed by users of the library: interactions must be restricted to
        // the library's function. As of Solidity v0.5.2, this cannot be enforced, though there is a proposal to add
        // this feature: see https://github.com/ethereum/solidity/issues/4637
        uint256 _value; // default: 0
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counter storage counter) internal {
        unchecked {
            counter._value += 1;
        }
    }

    function decrement(Counter storage counter) internal {
        uint256 value = counter._value;
        require(value > 0, "Counter: decrement overflow");
        unchecked {
            counter._value = value - 1;
        }
    }

    function reset(Counter storage counter) internal {
        counter._value = 0;
    }
}

// File: contracts/AstarBase.sol


pragma solidity ^0.8.7;





/// @author The Astar Network Team
/// @title Astarbase. Mapping of Stakers ss58 <> H160
contract AstarBase is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public registeredCnt;
    bytes PREFIX= hex"3c42797465733e";
    bytes POSTFIX= hex"3c2f42797465733e";
    bool public paused;
    mapping(address => bytes32) public addressMap;
    mapping(bytes32 => address) public ss58Map;
    DappsStaking public constant DAPPS_STAKING = DappsStaking(0x0000000000000000000000000000000000005001);
    SR25519 public constant SR25519Contract = SR25519(0x0000000000000000000000000000000000005002);
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
}
