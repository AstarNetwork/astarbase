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

export type AlertBox = {
  showAlertMsg: boolean;
  alertMsg: string;
  alertType: string;
};

export type ConnectionType = 'connected' | 'connecting' | 'offline';
export type Theme = 'LIGHT' | 'DARK';

export interface GeneralStateInterface {
  errorMessage: string;
  alertBox: AlertBox;
  isLoading: boolean;
  account: string;
  mintContract: Contract | undefined;
  mintContractAddress: string;
  currentNetworkStatus: ConnectionType;
  substrateAccounts: SubstrateAccount[];
  currentNetworkIdx: number;
  currentAddress: string;
  currentTheme: Theme;
}

const generalModule: Module<GeneralStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state: {
    errorMessage: '',
    isLoading: false,
    alertBox: {
      showAlertMsg: false,
      alertMsg: '',
      alertType: 'success',
    },
    account: '',
    mintContract: undefined,
    mintContractAddress: '',
    currentNetworkStatus: 'connecting',
    substrateAccounts: [],
    currentNetworkIdx: endpointKey.SHIDEN,
    currentAddress: '',
    currentTheme:
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'DARK'
        : 'LIGHT',
  },
};

export default generalModule;
