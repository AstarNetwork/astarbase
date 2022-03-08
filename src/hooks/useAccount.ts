import { useStore } from 'src/store';
import { SubstrateAccount } from 'src/store/general';
import { computed, ref, watch } from 'vue';

export const useAccount = () => {
  const currentAccount = ref<string>('');
  const currentAccountName = ref<string>('');

  const store = useStore();
  const substrateAccounts = computed(() => store.getters['general/substrateAccounts']);
  const currentAddress = computed(() => store.getters['general/selectedAddress']);

  const disconnectAccount = () => {
    store.commit('general/setCurrentAddress', null);
    currentAccount.value = '';
    currentAccountName.value = '';
  };

  watch(
    [currentAddress],
    () => {
      if (!substrateAccounts.value) return;
      const account = substrateAccounts.value.find(
        (it: SubstrateAccount) => it.address === currentAddress.value
      );
      if (account) {
        currentAccount.value = account.address;
        currentAccountName.value = account.name;
      }
    },
    { immediate: true }
  );

  return {
    substrateAccounts,
    currentAccount,
    currentAccountName,
    disconnectAccount,
  };
};
