import { MutationTree } from 'vuex';
import { Contract } from 'web3-eth-contract';
import { ConnectionType, GeneralStateInterface as State, SubstrateAccount } from './index';
import { Dark } from 'quasar';
import type { Extensions } from 'src/hooks/useMetaExtensions';
import type { ChainInfo } from 'src/hooks/useChainInfo';

export type ConnectPayload = {
  ethereumAccount: string;
  registerContract: Contract;
  astarBaseContractAddress: string;
  stakerStatus: number;
  isRegistered: boolean;
  registeredEvm: string;
};

export interface GeneralMutations<S = State> {
  connectRequest(state: S): void;
  connectFailed(state: S, errorMessage: string): void;
  connectSuccess(state: S, payload: ConnectPayload): void;
  changeEthereumAccount(state: S, account: string): void;
  changeStakerStatus(state: S, status: number): void;
  changeIsRegistered(state: S, registered: boolean): void;
  setError(state: S, errorMessage: string): void;
  setRegistered(state: S, registered: boolean): void;
  setRegisteredEvm(state: S, registeredEvm: string): void;
  setCurrentNetworkStatus(state: S, networkStatus: ConnectionType): void;
  setSubstrateAccounts(state: S, type: SubstrateAccount[]): void;
  setCurrentNetworkIdx(state: S, networkIdx: number): void;
  setCurrentAddress(state: S, address: string): void;
  setLoading(state: S, isLoading: boolean): void;
  setShowAlertMsg(state: S, showAlert: boolean): void;
  setAlertMsg(state: S, msg: string): void;
  setAlertType(state: S, type: string): void;
  setChainInfo(state: S, type: ChainInfo): void;
  setMetaExtensions(state: S, type: Extensions): void;
  setExtensionCount(state: S, type: number): void;
}

const mutation: MutationTree<State> & GeneralMutations = {
  connectRequest(state) {
    state.isLoading = true;
    state.errorMessage = '';
  },
  connectFailed(state, errorMessage) {
    state.isLoading = false;
    state.errorMessage = errorMessage;
  },
  connectSuccess(state, payload) {
    state.ethereumAccount = payload.ethereumAccount;
    state.registerContract = payload.registerContract;
    state.stakerStatus = payload.stakerStatus;
    state.isRegistered = payload.isRegistered;
    state.registeredEvm = payload.registeredEvm;
    (state.astarBaseContractAddress = payload.astarBaseContractAddress), (state.isLoading = false);
    state.errorMessage = '';
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  setChainInfo(state, chainInfo) {
    state.chainInfo = chainInfo;
  },
  setMetaExtensions(state, extensions) {
    state.metaExtensions = extensions;
  },
  setExtensionCount(state, count) {
    state.extensionCount = count;
  },
  setShowAlertMsg(state, msg) {
    state.alertBox.showAlertMsg = msg;
  },
  setAlertMsg(state, msg) {
    state.alertBox.alertMsg = msg;
  },
  setAlertType(state, type) {
    state.alertBox.alertType = type;
  },
  changeEthereumAccount(state, account) {
    state.ethereumAccount = account;
  },
  changeStakerStatus(state, status) {
    state.stakerStatus = status;
  },
  changeIsRegistered(state, registered) {
    state.isRegistered = registered;
  },
  setError(state, errorMessage) {
    state.errorMessage = errorMessage;
  },
  setRegistered(state, registered) {
    state.registered = registered;
  },
  setRegisteredEvm(state, registeredEvm) {
    state.registeredEvm = registeredEvm;
  },
  setCurrentNetworkStatus(state, networkStatus) {
    state.currentNetworkStatus = networkStatus;
  },
  setSubstrateAccounts(state, accounts) {
    state.substrateAccounts = accounts;
  },
  setCurrentNetworkIdx(state, networkIdx) {
    state.currentNetworkIdx = networkIdx;
  },
  setCurrentAddress(state, address) {
    state.substrateAccount = address;
  },
  setTheme(state, theme) {
    if (theme == 'DARK') {
      Dark.set(true);
      document.documentElement.classList.add('dark');
    } else {
      Dark.set(false);
      document.documentElement.classList.remove('dark');
    }
    state.currentTheme = theme;
  },
};

export default mutation;
