import { providerEndpoints } from '../../config';
import { connectApi } from '../../config/api/polkadot/connectApi';
import { computed, watchEffect } from 'vue';
import { useStore } from '../../store';

export const useConnectApi = () => {
  const store = useStore();
  const networkIdx = computed(() => store.getters['general/networkIdx']);

  watchEffect(async () => {
    const endpoint = providerEndpoints[networkIdx.value].endpoint;
    console.log('useConnctApi');
    const api = await connectApi(endpoint, networkIdx.value, store);
    console.log('api', api);
  });
};
