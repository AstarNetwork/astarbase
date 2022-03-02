import { GetterTree } from 'vuex';
import { Contract } from 'web3-eth-contract';
import { StateInterface } from '..';
import { SubstrateAccount, GeneralStateInterface as State } from './index';

export interface GeneralGetters {
  isMetamaskConnected(state: State): boolean;
  errorMessage(state: State): string;
  mintContract(state: State): Contract | undefined;
  mintContractAddress(state: State): string;
  account(state: State): string;
  substrateAccounts(state: State): SubstrateAccount[];
  networkStatus(state: State): string;
  networkIdx(state: State): number;
}

const getters: GetterTree<State, StateInterface> & GeneralGetters = {
  isMetamaskConnected: (state) => !!state.account,
  errorMessage: (state) => state.errorMessage,
  mintContract: (state) => state.mintContract,
  mintContractAddress: (state) => state.mintContractAddress,
  account: (state) => state.account,
  substrateAccounts: (state) => state.substrateAccounts,
  networkStatus: (state) => state.currentNetworkStatus,
  networkIdx: (state) => state.currentNetworkIdx,
};

export default getters;
