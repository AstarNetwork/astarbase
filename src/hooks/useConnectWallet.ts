import {
  getInjectedExtensions,
  SubstrateWallets,
  SupportWallet,
  WalletModalOption,
} from 'src/modules/wallet';
import { castMobileSource } from 'src/modules/wallet/utils';
import { useStore } from 'src/store';
import { computed, ref, watchEffect } from 'vue';
import { useAccount } from './useAccount';

export const useConnectWallet = () => {
  const modalConnectWallet = ref<boolean>(false);
  const modalAccountSelect = ref<boolean>(false);
  const selectedWallet = ref<string>('');
  const modalName = ref<string>('');

  const store = useStore();
  const isConnectedNetwork = computed(() => store.getters['general/networkStatus'] === 'connected');
  const { substrateAddress, substrateAccountName, disconnectAccount } = useAccount();

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
    const lookupWallet = castMobileSource(modalName.value);
    alert('lookupWallet');
    alert(lookupWallet);
    if (SubstrateWallets.find((it) => it === lookupWallet)) {
      const injected = await getInjectedExtensions();
      const isInstalledExtension = injected.find((it) => lookupWallet === it.name);
      alert('isInstalledExtension');
      alert(isInstalledExtension);

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
    substrateAddress,
    substrateAccountName,
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
