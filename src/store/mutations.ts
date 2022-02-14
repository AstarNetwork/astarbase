import { SubstrateAccount } from '../wallet';
import { MutationTree } from 'vuex';
import { Contract } from 'web3-eth-contract';
import { ConnectionType, StateInterface } from './index';

export type ConnectPayload = {
  account: string;
  mintContract: Contract;
  mintContractAddress: string;
};

export interface Mutations<S = StateInterface> {
  connectRequest(state: S): void;
  connectFailed(state: S, errorMessage: string): void;
  connectSuccess(state: S, payload: ConnectPayload): void;
  changeAccount(state: S, account: string): void;
  setError(state: S, errorMessage: string): void;
  setSubstrateAccounts(state: S, type: SubstrateAccount[]): void;
  setCurrentNetworkStatus(state: S, networkStatus: ConnectionType): void;
  setCurrentNetworkIdx(state: S, networkIdx: number): void;
}

const mutation: MutationTree<StateInterface> & Mutations = {
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
    (state.mintContractAddress = payload.mintContractAddress),
      (state.isLoading = false);
    state.errorMessage = '';
  },
  changeAccount(state, account) {
    state.account = account;
  },
  setError(state, errorMessage) {
    state.errorMessage = errorMessage;
  },
  setSubstrateAccounts(state, accounts) {
    state.substrateAccounts = accounts;
  },
  setCurrentNetworkStatus(state, networkStatus) {
    state.currentNetworkStatus = networkStatus;
  },
  setCurrentNetworkIdx(state, networkIdx) {
    state.currentNetworkIdx = networkIdx;
  },
};

export default mutation;
