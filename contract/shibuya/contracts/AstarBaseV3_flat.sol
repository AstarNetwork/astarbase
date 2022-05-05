// SPDX-License-Identifier: MIT
// Sources flattened with hardhat v2.9.3 https://hardhat.org


// File @openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol@v4.6.0
// OpenZeppelin Contracts (last updated v4.5.0) (utils/Address.sol)

pragma solidity 0.8.7;

/**
 * @dev Collection of functions related to the address type
 */
library AddressUpgradeable {
    /**
     * @dev Returns true if `account` is a contract.
     *
     * [IMPORTANT]
     * ====
     * It is unsafe to assume that an address for which this function returns
     * false is an externally-owned account (EOA) and not a contract.
     *
     * Among others, `isContract` will return false for the following
     * types of addresses:
     *
     *  - an externally-owned account
     *  - a contract in construction
     *  - an address where a contract will be created
     *  - an address where a contract lived, but was destroyed
     * ====
     *
     * [IMPORTANT]
     * ====
     * You shouldn't rely on `isContract` to protect against flash loan attacks!
     *
     * Preventing calls from contracts is highly discouraged. It breaks composability, breaks support for smart wallets
     * like Gnosis Safe, and does not provide security since it can be circumvented by calling from a contract
     * constructor.
     * ====
     */
    function isContract(address account) internal view returns (bool) {
        // This method relies on extcodesize/address.code.length, which returns 0
        // for contracts in construction, since the code is only stored at the end
        // of the constructor execution.

        return account.code.length > 0;
    }

    /**
     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
     * `recipient`, forwarding all available gas and reverting on errors.
     *
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
     * of certain opcodes, possibly making contracts go over the 2300 gas limit
     * imposed by `transfer`, making them unable to receive funds via
     * `transfer`. {sendValue} removes this limitation.
     *
     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].
     *
     * IMPORTANT: because control is transferred to `recipient`, care must be
     * taken to not create reentrancy vulnerabilities. Consider using
     * {ReentrancyGuard} or the
     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        require(address(this).balance >= amount, "Address: insufficient balance");

        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Address: unable to send value, recipient may have reverted");
    }

    /**
     * @dev Performs a Solidity function call using a low level `call`. A
     * plain `call` is an unsafe replacement for a function call: use this
     * function instead.
     *
     * If `target` reverts with a revert reason, it is bubbled up by this
     * function (like regular Solidity function calls).
     *
     * Returns the raw returned data. To convert to the expected return value,
     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].
     *
     * Requirements:
     *
     * - `target` must be a contract.
     * - calling `target` with `data` must not revert.
     *
     * _Available since v3.1._
     */
    function functionCall(address target, bytes memory data) internal returns (bytes memory) {
        return functionCall(target, data, "Address: low-level call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with
     * `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        return functionCallWithValue(target, data, 0, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but also transferring `value` wei to `target`.
     *
     * Requirements:
     *
     * - the calling contract must have an ETH balance of at least `value`.
     * - the called Solidity function must be `payable`.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value
    ) internal returns (bytes memory) {
        return functionCallWithValue(target, data, value, "Address: low-level call with value failed");
    }

    /**
     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but
     * with `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value,
        string memory errorMessage
    ) internal returns (bytes memory) {
        require(address(this).balance >= value, "Address: insufficient balance for call");
        require(isContract(target), "Address: call to non-contract");

        (bool success, bytes memory returndata) = target.call{value: value}(data);
        return verifyCallResult(success, returndata, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(address target, bytes memory data) internal view returns (bytes memory) {
        return functionStaticCall(target, data, "Address: low-level static call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal view returns (bytes memory) {
        require(isContract(target), "Address: static call to non-contract");

        (bool success, bytes memory returndata) = target.staticcall(data);
        return verifyCallResult(success, returndata, errorMessage);
    }

    /**
     * @dev Tool to verifies that a low level call was successful, and revert if it wasn't, either by bubbling the
     * revert reason using the provided one.
     *
     * _Available since v4.3._
     */
    function verifyCallResult(
        bool success,
        bytes memory returndata,
        string memory errorMessage
    ) internal pure returns (bytes memory) {
        if (success) {
            return returndata;
        } else {
            // Look for revert reason and bubble it up if present
            if (returndata.length > 0) {
                // The easiest way to bubble the revert reason is using memory via assembly

                assembly {
                    let returndata_size := mload(returndata)
                    revert(add(32, returndata), returndata_size)
                }
            } else {
                revert(errorMessage);
            }
        }
    }
}


// File @openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol@v4.6.0

// OpenZeppelin Contracts (last updated v4.6.0) (proxy/utils/Initializable.sol)

pragma solidity 0.8.7;

/**
 * @dev This is a base contract to aid in writing upgradeable contracts, or any kind of contract that will be deployed
 * behind a proxy. Since proxied contracts do not make use of a constructor, it's common to move constructor logic to an
 * external initializer function, usually called `initialize`. It then becomes necessary to protect this initializer
 * function so it can only be called once. The {initializer} modifier provided by this contract will have this effect.
 *
 * The initialization functions use a version number. Once a version number is used, it is consumed and cannot be
 * reused. This mechanism prevents re-execution of each "step" but allows the creation of new initialization steps in
 * case an upgrade adds a module that needs to be initialized.
 *
 * For example:
 *
 * [.hljs-theme-light.nopadding]
 * ```
 * contract MyToken is ERC20Upgradeable {
 *     function initialize() initializer public {
 *         __ERC20_init("MyToken", "MTK");
 *     }
 * }
 * contract MyTokenV2 is MyToken, ERC20PermitUpgradeable {
 *     function initializeV2() reinitializer(2) public {
 *         __ERC20Permit_init("MyToken");
 *     }
 * }
 * ```
 *
 * TIP: To avoid leaving the proxy in an uninitialized state, the initializer function should be called as early as
 * possible by providing the encoded function call as the `_data` argument to {ERC1967Proxy-constructor}.
 *
 * CAUTION: When used with inheritance, manual care must be taken to not invoke a parent initializer twice, or to ensure
 * that all initializers are idempotent. This is not verified automatically as constructors are by Solidity.
 *
 * [CAUTION]
 * ====
 * Avoid leaving a contract uninitialized.
 *
 * An uninitialized contract can be taken over by an attacker. This applies to both a proxy and its implementation
 * contract, which may impact the proxy. To prevent the implementation contract from being used, you should invoke
 * the {_disableInitializers} function in the constructor to automatically lock it when it is deployed:
 *
 * [.hljs-theme-light.nopadding]
 * ```
 * /// @custom:oz-upgrades-unsafe-allow constructor
 * constructor() {
 *     _disableInitializers();
 * }
 * ```
 * ====
 */
abstract contract Initializable {
    /**
     * @dev Indicates that the contract has been initialized.
     * @custom:oz-retyped-from bool
     */
    uint8 private _initialized;

    /**
     * @dev Indicates that the contract is in the process of being initialized.
     */
    bool private _initializing;

    /**
     * @dev Triggered when the contract has been initialized or reinitialized.
     */
    event Initialized(uint8 version);

    /**
     * @dev A modifier that defines a protected initializer function that can be invoked at most once. In its scope,
     * `onlyInitializing` functions can be used to initialize parent contracts. Equivalent to `reinitializer(1)`.
     */
    modifier initializer() {
        bool isTopLevelCall = _setInitializedVersion(1);
        if (isTopLevelCall) {
            _initializing = true;
        }
        _;
        if (isTopLevelCall) {
            _initializing = false;
            emit Initialized(1);
        }
    }

    /**
     * @dev A modifier that defines a protected reinitializer function that can be invoked at most once, and only if the
     * contract hasn't been initialized to a greater version before. In its scope, `onlyInitializing` functions can be
     * used to initialize parent contracts.
     *
     * `initializer` is equivalent to `reinitializer(1)`, so a reinitializer may be used after the original
     * initialization step. This is essential to configure modules that are added through upgrades and that require
     * initialization.
     *
     * Note that versions can jump in increments greater than 1; this implies that if multiple reinitializers coexist in
     * a contract, executing them in the right order is up to the developer or operator.
     */
    modifier reinitializer(uint8 version) {
        bool isTopLevelCall = _setInitializedVersion(version);
        if (isTopLevelCall) {
            _initializing = true;
        }
        _;
        if (isTopLevelCall) {
            _initializing = false;
            emit Initialized(version);
        }
    }

    /**
     * @dev Modifier to protect an initialization function so that it can only be invoked by functions with the
     * {initializer} and {reinitializer} modifiers, directly or indirectly.
     */
    modifier onlyInitializing() {
        require(_initializing, "Initializable: contract is not initializing");
        _;
    }

    /**
     * @dev Locks the contract, preventing any future reinitialization. This cannot be part of an initializer call.
     * Calling this in the constructor of a contract will prevent that contract from being initialized or reinitialized
     * to any version. It is recommended to use this to lock implementation contracts that are designed to be called
     * through proxies.
     */
    function _disableInitializers() internal virtual {
        _setInitializedVersion(type(uint8).max);
    }

    function _setInitializedVersion(uint8 version) private returns (bool) {
        // If the contract is initializing we ignore whether _initialized is set in order to support multiple
        // inheritance patterns, but we only do this in the context of a constructor, and for the lowest level
        // of initializers, because in other contexts the contract may have been reentered.
        if (_initializing) {
            require(
                version == 1 && !AddressUpgradeable.isContract(address(this)),
                "Initializable: contract is already initialized"
            );
            return false;
        } else {
            require(_initialized < version, "Initializable: contract is already initialized");
            _initialized = version;
            return true;
        }
    }
}


// File @openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol@v4.6.0

// OpenZeppelin Contracts v4.4.1 (utils/Counters.sol)

pragma solidity 0.8.7;

/**
 * @title Counters
 * @author Matt Condon (@shrugs)
 * @dev Provides counters that can only be incremented, decremented or reset. This can be used e.g. to track the number
 * of elements in a mapping, issuing ERC721 ids, or counting request ids.
 *
 * Include with `using Counters for Counters.Counter;`
 */
library CountersUpgradeable {
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


// File @openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol@v4.6.0

// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity 0.8.7;

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
abstract contract ContextUpgradeable is Initializable {
    function __Context_init() internal onlyInitializing {
    }

    function __Context_init_unchained() internal onlyInitializing {
    }
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }

    /**
     * @dev This empty reserved space is put in place to allow future versions to add new
     * variables without shifting down storage in the inheritance chain.
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[50] private __gap;
}


// File @openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol@v4.6.0

// OpenZeppelin Contracts v4.4.1 (access/Ownable.sol)

pragma solidity 0.8.7;


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
abstract contract OwnableUpgradeable is Initializable, ContextUpgradeable {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    function __Ownable_init() internal onlyInitializing {
        __Ownable_init_unchained();
    }

    function __Ownable_init_unchained() internal onlyInitializing {
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

    /**
     * @dev This empty reserved space is put in place to allow future versions to add new
     * variables without shifting down storage in the inheritance chain.
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[49] private __gap;
}


// File contracts/DappsStakingDummy.sol

pragma solidity 0.8.7;

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


// File contracts/SR25519Dummy.sol

pragma solidity 0.8.7;

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


// File contracts/ECDSADummy.sol


pragma solidity 0.8.7;

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


// File contracts/AstarBaseV3.sol

pragma solidity 0.8.7;


/// @author The Astar Network Team
/// @title Astarbase. A voluntary mapping of accounts ss58 <> H160
contract AstarBaseV3
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
        version = 3;
        emit ContractVersion(3);
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

        addressMap[msg.sender] = ss58PublicKey;
        ss58Map[ss58PublicKey] = msg.sender;
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
    function isRegistered(address evmAddress) public view returns (bool) {
        bytes memory ss58PublicKey = addressMap[evmAddress];

        return ss58PublicKey.length != 0;
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


// File contracts/AstarBaseV3_flat.sol
