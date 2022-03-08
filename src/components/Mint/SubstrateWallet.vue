<template>
  <div>
    <div class="container-substrate-wallet">
      <div>
        <div v-if="!currentAccount">
          <button class="btn" @click="openSelectModal">Connect Wallet</button>
        </div>
        <div v-else>
          <button class="btn" @click="disconnectAccount">Connected Wallet</button>
        </div>
      </div>

      <div v-if="currentAccount">
        <div class="tw-text-lg">Address: {{ getShortenAddress(currentAccount) }}</div>
        <div v-if="stakedDapps">Staked dApp</div>
        <li v-for="dapp in stakedDapps" :key="dapp">
          {{ dapp }}
        </li>
      </div>
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
</template>

<script lang="ts">
import { useConnectWallet, useStakingDapps } from 'src/hooks';
import { defineComponent, watch } from 'vue';
import ModalConnectWallet from './modals/ModalConnectWallet.vue';
import ModalInstallWallet from './modals/ModalInstallWallet.vue';
import ModalAccount from './modals/ModalAccount.vue';
import { getShortenAddress } from 'src/modules/address';

export default defineComponent({
  components: {
    ModalConnectWallet,
    ModalInstallWallet,
    ModalAccount,
  },
  setup() {
    const { stakedDapps } = useStakingDapps();
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
      disconnectAccount,
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
      stakedDapps,
      setCloseModal,
      setWalletModal,
      openSelectModal,
      disconnectAccount,
      getShortenAddress,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './styles/substrate-wallet.scss';
</style>
