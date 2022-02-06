import { GetterTree } from 'vuex';
import { Contract } from 'web3-eth-contract';
import { StateInterface } from './index'

export interface Getters<S = StateInterface> {
  isMetamaskConnected(state: S): boolean;
  errorMessage(state: S): string;
  mintContract(state: S): Contract | undefined;
  mintContractAddress(state: S): string;
  account(state: S): string;
}

const getters: GetterTree<StateInterface, StateInterface> & Getters = {
  isMetamaskConnected: (state) => !!state.account,
  errorMessage: (state) => state.errorMessage,
  mintContract: (state) => state.mintContract,
  mintContractAddress: (state) => state.mintContractAddress,
  account: (state) => state.account,
}

export default getters;
