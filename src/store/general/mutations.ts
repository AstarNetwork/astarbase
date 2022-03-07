import { MutationTree } from 'vuex';
import { Contract } from 'web3-eth-contract';
import { ConnectionType, GeneralStateInterface as State, SubstrateAccount } from './index';
import { Dark } from 'quasar';

export type ConnectPayload = {
  account: string;
  mintContract: Contract;
  mintContractAddress: string;
};

export interface GeneralMutations<S = State> {
  connectRequest(state: S): void;
  connectFailed(state: S, errorMessage: string): void;
  connectSuccess(state: S, payload: ConnectPayload): void;
  changeAccount(state: S, account: string): void;
  setError(state: S, errorMessage: string): void;
  setCurrentNetworkStatus(state: S, networkStatus: ConnectionType): void;
  setSubstrateAccounts(state: S, type: SubstrateAccount[]): void;
  setCurrentNetworkIdx(state: S, networkIdx: number): void;
  setCurrentAddress(state: S, address: string): void;
  setLoading(state: S, isLoading: boolean): void;
  setShowAlertMsg(state: S, showAlert: boolean): void;
  setAlertMsg(state: S, msg: string): void;
  setAlertType(state: S, type: string): void;
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
    state.account = payload.account;
    state.mintContract = payload.mintContract;
    (state.mintContractAddress = payload.mintContractAddress), (state.isLoading = false);
    state.errorMessage = '';
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading;
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
  changeAccount(state, account) {
    state.account = account;
  },
  setError(state, errorMessage) {
    state.errorMessage = errorMessage;
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
    state.currentAddress = address;
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
