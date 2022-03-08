import { GetterTree } from 'vuex';
import { Contract } from 'web3-eth-contract';
import { StateInterface } from '..';
import { SubstrateAccount, GeneralStateInterface as State, Theme, AlertBox } from './index';
import type { Extensions } from 'src/hooks/useMetaExtensions';
import type { ChainInfo } from 'src/hooks/useChainInfo';

export interface GeneralGetters {
  isLoading(state: State): boolean;
  showAlert(state: State): AlertBox;
  isMetamaskConnected(state: State): boolean;
  errorMessage(state: State): string;
  mintContract(state: State): Contract | undefined;
  mintContractAddress(state: State): string;
  ethereumAccount(state: State): string;
  substrateAccount(state: State): string;
  substrateAccounts(state: State): SubstrateAccount[];
  networkStatus(state: State): string;
  networkIdx(state: State): number;
  theme(state: State): Theme;
  chainInfo(state: State): ChainInfo;
  metaExtensions(state: State): Extensions;
  extensionCount(state: State): number;
}

const getters: GetterTree<State, StateInterface> & GeneralGetters = {
  isLoading: (state) => state.isLoading,
  showAlert: (state) => state.alertBox,
  chainInfo: (state) => state.chainInfo,
  metaExtensions: (state) => state.metaExtensions,
  extensionCount: (state) => state.extensionCount,
  isMetamaskConnected: (state) => !!state.ethereumAccount,
  errorMessage: (state) => state.errorMessage,
  mintContract: (state) => state.mintContract,
  mintContractAddress: (state) => state.mintContractAddress,
  ethereumAccount: (state) => state.ethereumAccount,
  substrateAccount: (state) => state.substrateAccount,
  substrateAccounts: (state) => state.substrateAccounts,
  networkStatus: (state) => state.currentNetworkStatus,
  networkIdx: (state) => state.currentNetworkIdx,
  theme: (state) => state.currentTheme,
};

export default getters;
