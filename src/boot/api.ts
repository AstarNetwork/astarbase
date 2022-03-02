import { ApiPromise } from '@polkadot/api';
import { boot } from 'quasar/wrappers';
import { connectApi } from 'src/config/api/polkadot/connectApi';
import { providerEndpoints } from 'src/config/chainEndpoints';
import { computed, ref } from 'vue';
import Web3 from 'web3';

const $api = ref<ApiPromise>();
const $web3 = ref<Web3>();

export default boot(async ({ store }) => {
  // const { NETWORK_IDX, CUSTOM_ENDPOINT } = LOCAL_STORAGE;

  // const networkIdxStore = localStorage.getItem(NETWORK_IDX);
  // const customEndpoint = localStorage.getItem(CUSTOM_ENDPOINT);
  // if (networkIdxStore) {
  //   store.commit('general/setCurrentNetworkIdx', parseInt(networkIdxStore));
  // }
  // if (customEndpoint) {
  //   store.commit('general/setCurrentCustomEndpoint', customEndpoint);
  // }

  const networkIdx = computed(() => store.getters['general/networkIdx']);
  // const networkIdx = 0;
  const endpoint = providerEndpoints[networkIdx.value].endpoint;
  // set metadata header
  // const favicon = providerEndpoints[parseInt(networkIdx)].favicon;
  // useMeta({
  //   title: '',
  //   titleTemplate: (title) =>
  //     `${title} | Astar Portal - Astar & Shiden Network`,
  //   htmlAttr: { lang: 'en' },
  //   link: {
  //     material: {
  //       rel: 'icon',
  //       href: favicon,
  //     },
  //   },
  //   meta: opengraphMeta,
  // });

  const { api, extensions } = await connectApi(
    endpoint,
    networkIdx.value,
    store
  );
  $api.value = api;
  // console.log(first);

  // update chaininfo
  // const { chainInfo } = useChainInfo(api);
  // const { metaExtensions, extensionCount } = useMetaExtensions(
  //   api,
  //   extensions
  // )!;
  // watchPostEffect(async () => {
  // store.commit('general/setChainInfo', chainInfo.value);
  // store.commit('general/setMetaExtensions', metaExtensions.value);
  // store.commit('general/setExtensionCount', extensionCount.value);

  //   if (chainInfo.value?.chain) {
  //     const currentChain = chainInfo.value?.chain as ASTAR_CHAIN;
  //     const currentNetworkIdx = getProviderIndex(currentChain);
  //     const web3 = await createWeb3Instance(currentNetworkIdx as TNetworkId);
  //     if (!web3) {
  //       console.error(
  //         `cannot create the web3 instance with network id ${currentNetworkIdx}`
  //       );
  //     }
  //     $web3.value = web3;
  //   }
  // });
});

export { $api, $web3 };
