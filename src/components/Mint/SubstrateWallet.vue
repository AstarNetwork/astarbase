<template>
  <div>
    <div class="tw-font-xl">Substrate Wallet</div>
    <div v-if="isConnectedNetwork">
      <div v-if="!currentAccount" class="container">
        <div class="connect-wallet" @click="openSelectModal">{{ $t('wallet.connectWallet') }}</div>
      </div>
      <div v-else>
        <!-- <BalancePlasm /> -->
        <div>connected wallet</div>
      </div>

      <modal-connect-wallet
        v-if="modalName === WalletModalOption.SelectWallet"
        :set-wallet-modal="setWalletModal"
        :set-close-modal="setCloseModal"
      />

      <ModalAccount
        v-if="modalAccountSelect"
        v-model:isOpen="modalAccountSelect"
        :selected-wallet="selectedWallet"
      />

      <ModalInstallWallet
        v-if="modalName === WalletModalOption.NoExtension"
        :set-close-modal="setCloseModal"
        :selected-wallet="selectedWallet"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useConnectWallet } from 'src/hooks';
import { defineComponent, watch } from 'vue';
import ModalConnectWallet from './modals/ModalConnectWallet.vue';
import ModalInstallWallet from './modals/ModalInstallWallet.vue';
import ModalAccount from './modals/ModalAccount.vue';

export default defineComponent({
  components: {
    ModalConnectWallet,
    ModalInstallWallet,
    ModalAccount,
  },
  setup() {
    const {
      WalletModalOption,
      modalConnectWallet,
      currentAccount,
      modalName,
      selectedWallet,
      modalAccountSelect,
      isConnectedNetwork,
      setCloseModal,
      setWalletModal,
      openSelectModal,
    } = useConnectWallet();

    watch(
      [currentAccount],
      () => {
        if (currentAccount.value === '') {
          setTimeout(() => {
            openSelectModal();
          }, 200);
        }
      },
      { immediate: false }
    );

    return {
      WalletModalOption,
      isConnectedNetwork,
      modalConnectWallet,
      currentAccount,
      modalName,
      selectedWallet,
      modalAccountSelect,
      setCloseModal,
      setWalletModal,
      openSelectModal,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './styles/connect-wallet.scss';
</style>
