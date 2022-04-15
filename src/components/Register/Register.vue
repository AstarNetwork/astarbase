<template>
  <div class="columns">
    <div class="first">
      <div class="header">
        <img class="logo-head" src="/icons/AstarPass-logo.png" />
      </div>
      <div class="info">
        <div>
          AstarPass is the mapping between your Astar <span class="blue">Native Address*</span> and
          your <span class="blue">Astar EVM address**</span>. Holding the AstarPass will allow
          different projects in the Astar Network to offer something extra for you. To showcase the
          usage you will be able to claim a free AstarNaut NFT if you are an active staker on Astar
          dApp staking.<br /><br />
          The AstarPass registration is completely free (excluding a small gas fee). The first step
          you need to connect with your two wallets, the native and EVM wallet. For example your
          Polkadot.js wallet and Metamask. The second step is to sign and register. Please check the
          rpc endpoint for Astar is https://evm.astar.network in metamask. <br /><br /><br />
          <span class="blue">
            (*) Astar Native address is sometimes referred as Polkadot address.
          </span>
          <br />
          <span class="blue">(**) Astar EVM address is also known as MetaMask Address.</span>
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
        <div v-if="stakerStatus > 0 || isRegistered">
          <img src="/icons/AstarPass-logo.png" />
        </div>
        <div v-else>
          <img src="/icons/AstarPass-logo-gray.png" />
        </div>
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
