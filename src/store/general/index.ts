import { endpointKey } from 'src/config/chainEndpoints';
import { Module } from 'vuex';
import { Contract } from 'web3-eth-contract';
import { StateInterface } from '../index';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type SubstrateAccount = {
  address: string;
  name: string;
  source: string;
};

export type ConnectionType = 'connected' | 'connecting' | 'offline';

// // declare store state
export interface GeneralStateInterface {
  errorMessage: string;
  isLoading: boolean;
  account: string;
  mintContract: Contract | undefined;
  mintContractAddress: string;
  currentNetworkStatus: ConnectionType;
  substrateAccounts: SubstrateAccount[];
  currentNetworkIdx: number;
}

const generalModule: Module<GeneralStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: {
    errorMessage: '',
    isLoading: false,
    account: '',
    mintContract: undefined,
    mintContractAddress: '',
    currentNetworkStatus: 'connecting',
    substrateAccounts: [],
    currentNetworkIdx: endpointKey.SHIDEN,
  },
};

export default generalModule;
