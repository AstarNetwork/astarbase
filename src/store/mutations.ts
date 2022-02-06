import { MutationTree } from 'vuex';
import { Contract } from 'web3-eth-contract';
import { StateInterface } from './index'

export type ConnectPayload = {
  account: string,
  mintContract: Contract,
  mintContractAddress: string,
};

export interface Mutations<S = StateInterface> {
  connectRequest(state: S): void;
  connectFailed(state: S, errorMessage: string): void;
  connectSuccess(state: S, payload: ConnectPayload): void;
  changeAccount(state: S, account: string): void;
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
    state.mintContractAddress = payload.mintContractAddress,
    state.isLoading = false;
    state.errorMessage = '';
  },
  changeAccount(state, account) {
    state.account = account;
  }
}

export default mutation;
