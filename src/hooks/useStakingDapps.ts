import { $api } from 'src/boot/api';
import { watchEffect, ref } from 'vue';
import { getStakingArray } from 'src/modules/dappsStaking';
import { useAccount } from './useAccount';
import { useStore } from 'src/store';

export const useStakingDapps = () => {
  const { substrateAddress } = useAccount();
  const store = useStore();
  const stakedDapps = ref<string[]>([]);

  watchEffect(async () => {
    const api = $api.value;
    if (!substrateAddress.value || !api) return;
    try {
      store.commit('general/setLoading', true);
      stakedDapps.value = await getStakingArray({ api, address: substrateAddress.value });
    } catch (error: any) {
      console.error(error.messages);
    } finally {
      store.commit('general/setLoading', false);
    }
  });

  return { stakedDapps };
};
