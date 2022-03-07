import { LOCAL_STORAGE } from 'src/config/localStorage';
import { useStore } from 'src/store';
import { SubstrateAccount } from 'src/store/general';
import { computed, ref, watch } from 'vue';

export const useAccount = () => {
  const store = useStore();

  const substrateAccounts = computed(() => store.getters['general/substrateAccounts']);
  const currentAddress = computed(() => store.getters['general/selectedAddress']);
  const { SELECTED_ADDRESS } = LOCAL_STORAGE;

  const disconnectAccount = () => {
    store.commit('general/setCurrentAddress', null);
    localStorage.removeItem(SELECTED_ADDRESS);
  };

  const currentAccount = ref<string>('');
  const currentAccountName = ref<string>('');

  watch(
    [currentAddress],
    () => {
      if (!substrateAccounts.value || currentAddress.value === null) return;
      const account = substrateAccounts.value.find(
        (it: SubstrateAccount) => it.address === currentAddress.value
      );
      if (!account) return;

      currentAccount.value = account.address;
      currentAccountName.value = account.name;
      localStorage.setItem(SELECTED_ADDRESS, String(currentAddress.value));
      return;
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
