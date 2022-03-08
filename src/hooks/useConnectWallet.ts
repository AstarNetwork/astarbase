import { LOCAL_STORAGE } from 'src/config/localStorage';
import { useStore } from 'src/store';
import {
  getInjectedExtensions,
  SubstrateWallets,
  SupportWallet,
  WalletModalOption,
} from 'src/modules/wallet';
import { ref, watchEffect, computed } from 'vue';
import { useAccount } from './useAccount';

export const useConnectWallet = () => {
  const modalConnectWallet = ref<boolean>(false);
  const modalAccountSelect = ref<boolean>(false);
  const selectedWallet = ref<string>('');
  const modalName = ref<string>('');

  const store = useStore();
  const isConnectedNetwork = computed(() => store.getters['general/networkStatus'] === 'connected');
  const { currentAccount, currentAccountName, disconnectAccount } = useAccount();

  const { SELECTED_ADDRESS } = LOCAL_STORAGE;

  const setCloseModal = () => {
    modalName.value = '';
  };

  const openSelectModal = () => {
    modalName.value = WalletModalOption.SelectWallet;
  };

  const setWalletModal = (wallet: SupportWallet): void => {
    selectedWallet.value = wallet;
    modalName.value = wallet;
  };

  watchEffect(async () => {
    const lookupWallet = modalName.value;
    if (SubstrateWallets.find((it) => it === lookupWallet)) {
      const injected = await getInjectedExtensions();
      const isInstalledExtension = injected.find((it) => lookupWallet === it.name);

      if (!isInstalledExtension) {
        modalName.value = WalletModalOption.NoExtension;
        modalAccountSelect.value = false;
        return;
      }
      modalName.value = WalletModalOption.SelectSubstrateAccount;
      modalAccountSelect.value = true;
      return;
    }
  });

  return {
    WalletModalOption,
    modalConnectWallet,
    currentAccount,
    currentAccountName,
    modalName,
    selectedWallet,
    modalAccountSelect,
    isConnectedNetwork,
    openSelectModal,
    setCloseModal,
    setWalletModal,
    disconnectAccount,
  };
};
