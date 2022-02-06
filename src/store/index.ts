import { Store, createStore, useStore as vuexUseStore } from 'vuex';
import { InjectionKey } from 'vue';
import { Contract } from 'web3-eth-contract';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';

// declare store state
export interface StateInterface {
  errorMessage: string,
  isLoading: boolean,
  account: string,
  mintContract: Contract | undefined,
  mintContractAddress: string
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<StateInterface>;
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<Store<StateInterface>> = Symbol();

export const store = createStore<StateInterface>({
  state: {
    errorMessage: '',
    isLoading: false,
    account: '',
    mintContract: undefined,
    mintContractAddress: '',
  },
  mutations,
  getters,
  actions
});

export function useStore() {
  return vuexUseStore(storeKey);
}