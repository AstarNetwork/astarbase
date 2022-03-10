import { store } from 'quasar/wrappers';
import { InjectionKey } from 'vue';
import general, { GeneralStateInterface } from './general';
import { createStore, Store as VuexStore, useStore as vuexUseStore } from 'vuex';

export interface StateInterface {
  general: GeneralStateInterface;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>;
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key');

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      general,
    },
  });

  return Store;
});

export function useStore() {
  return vuexUseStore(storeKey);
}
