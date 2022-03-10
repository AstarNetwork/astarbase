import { ApiPromise } from '@polkadot/api';
import { useMeta } from 'quasar';
import { boot } from 'quasar/wrappers';
import { connectApi } from 'src/config/api/polkadot/connectApi';
import { ASTAR_CHAIN, getProviderIndex, providerEndpoints } from 'src/config/chainEndpoints';
import { opengraphMeta } from 'src/config/opengraph';
import { createWeb3Instance, TNetworkId } from 'src/config/web3';
import { useChainInfo, useMetaExtensions } from 'src/hooks';
import { computed, ref, watchPostEffect } from 'vue';
import Web3 from 'web3';

const $api = ref<ApiPromise>();
const $web3 = ref<Web3>();

export default boot(async ({ store }) => {
  // Todo: Add the network select component on UI
  // const { NETWORK_IDX } = LOCAL_STORAGE;
  // const networkIdxStore = localStorage.getItem(NETWORK_IDX);
  // if (networkIdxStore) {
  //   store.commit('general/setCurrentNetworkIdx', parseInt(networkIdxStore));
  // }

  const networkIdx = computed(() => store.getters['general/networkIdx']);
  const endpoint = providerEndpoints[networkIdx.value].endpoint;

  const favicon = providerEndpoints[parseInt(networkIdx.value)].favicon;
  useMeta({
    title: 'Mint',
    titleTemplate: (title) => `${title} | Astar Base`,
    htmlAttr: { lang: 'en' },
    link: {
      material: {
        rel: 'icon',
        href: favicon,
      },
    },
    meta: opengraphMeta,
  });

  const { api, extensions } = await connectApi(endpoint, store);
  $api.value = api;

  const { chainInfo } = useChainInfo(api);
  const { metaExtensions, extensionCount } = useMetaExtensions(api, extensions)!;
  watchPostEffect(async () => {
    store.commit('general/setChainInfo', chainInfo.value);
    store.commit('general/setMetaExtensions', metaExtensions.value);
    store.commit('general/setExtensionCount', extensionCount.value);

    if (chainInfo.value?.chain) {
      const currentChain = chainInfo.value?.chain as ASTAR_CHAIN;
      const currentNetworkIdx = getProviderIndex(currentChain);
      const web3 = await createWeb3Instance(currentNetworkIdx as TNetworkId);
      if (!web3) {
        console.error(`cannot create the web3 instance with network id ${currentNetworkIdx}`);
      }
      $web3.value = web3;
    }
  });
});

export { $api, $web3 };
