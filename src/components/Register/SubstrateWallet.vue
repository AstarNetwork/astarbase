<template>
  <div>
    <div class="container-substrate-wallet">
      <div>
        <div class="tw-mb-6">
          <label>{{ $t('register.polkadotConnectLabel') }}</label>
        </div>
        <div v-if="!substrateAddress">
          <button :disabled="!isConnectedNetwork" class="btn" @click="openSelectModal">
            {{ $t('register.connectWallet') }}
          </button>
        </div>
        <div v-else>
          <button class="btn" @click="disconnectAccount">
            {{ $t('register.connectedWallet') }}
          </button>
        </div>
      </div>

      <div v-if="substrateAddress">
        <div class="tw-text-lg info-green">
          {{ $t('common.address', { value: getShortenAddress(substrateAddress) }) }}
        </div>
        <div v-if="stakedDapps.length > 0">
          <span class="tw-text-lg">
            {{ $t('register.stakedDapps') }}
          </span>
        </div>
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
      substrateAddress,
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
      [substrateAddress],
      () => {
        if (substrateAddress.value === '') {
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
      substrateAddress,
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
