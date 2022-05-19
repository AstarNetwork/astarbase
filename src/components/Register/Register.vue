<template>
  <div class="columns">
    <div class="first">
      <div class="header">
        <div class="tw-text-4xl tw-font-bold tw-text-indigo-500">
          <img width="50" src="/icons/shiden.webp" class="tw-inline-block" /> Shiden Pass
        </div>
      </div>
      <div class="info">
        <div>
          ShidenPass is the mapping between your Shiden
          <span class="blue">Native Address*</span> and your
          <span class="blue">Shiden EVM address**</span>. Holding the ShidenPass will allow
          different projects in the Shiden Network to offer something extra for you.<br /><br />
          The ShidenPass registration is completely free (excluding a small gas fee). The first step
          you need to connect with your two wallets, the native and EVM wallet. For example your
          Polkadot.js wallet and Metamask. The second step is to sign and register. Please check the
          rpc endpoint for Shiden is https://evm.shiden.astar.network in metamask.
          <br /><br /><br />
          <span class="blue">
            (*) Shiden Native address is sometimes referred as Polkadot address.
          </span>
          <br />
          <span class="blue">(**) Shiden EVM address is also known as MetaMask Address.</span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="stakerStatus">
        <div v-if="stakerStatus > 0">Your status: Staker</div>
        <div v-else>
          <div v-if="isRegistered">Your status: Pass Holder</div>
          <div v-else>Your status: Not Registered</div>
        </div>
        <!-- <div v-if="stakerStatus > 0 || isRegistered">
          <div class="tw-text-3xl">Shiden Pass</div>
        </div>
        <div v-else>
          <div class="tw-text-3xl tw-gray-100">Shiden Pass</div>
        </div> -->
      </div>
      <SubstrateWallet />
      <EthereumWallet />
    </div>
    <ModalMintNft v-if="modalName === WalletModalOption.MintNFT" :set-close-modal="setCloseModal" />
  </div>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { useConnectWallet } from 'src/hooks';
import { computed, defineComponent, watch } from 'vue';
import EthereumWallet from './EthereumWallet.vue';
import SubstrateWallet from './SubstrateWallet.vue';
import ModalMintNft from './modals/ModalMintNft.vue';

export default defineComponent({
  components: {
    EthereumWallet,
    SubstrateWallet,
    ModalMintNft,
  },
  setup() {
    const store = useStore();
    const ethereumAccount = computed(() => store.getters['general/ethereumAccount']);
    const stakerStatus = computed(() => store.getters['general/stakerStatus']);
    const isRegistered = computed(() => store.getters['general/isRegistered']);

    const { modalName, selectedWallet, WalletModalOption, setCloseModal, openMintNFT } =
      useConnectWallet();

    watch(
      [isRegistered],
      () => {
        if (isRegistered.value) {
          setTimeout(() => {
            openMintNFT();
          }, 10);
        }
      },
      { immediate: false }
    );

    return {
      WalletModalOption,
      modalName,
      selectedWallet,
      setCloseModal,
      openMintNFT,
      ethereumAccount,
      stakerStatus,
      isRegistered,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './styles/register.scss';
</style>
