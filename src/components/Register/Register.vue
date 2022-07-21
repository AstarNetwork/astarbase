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
          different projects in the Astar Network to offer something extra for you.<br /><br />
          The AstarPass registration is completely free (excluding a small gas fee). The first step
          you need to connect with your two wallets, the native and EVM wallet. For example your
          Polkadot.js wallet and Metamask. The second step is to sign and register. Please check the
          rpc endpoint for Astar is https://evm.astar.network in metamask <br /><br /><br />
          <span class="blue">
            (*) Astar Native address is sometimes referred as Polkadot address.
          </span>
          <br />
          <span class="blue">(**) Astar EVM address is also known as MetaMask Address.</span
          ><br /><br />
          <span class="red">
            Note: AstarPass can only be created once every Native address. If you wish to have a
            different EVM address to be registered you would need an unregistered Native
            address.</span
          >
        </div>
      </div>
    </div>
    <div class="container">
      <div class="stakerStatus">
        <div v-if="stakerStatus > 0 || isRegistered">
          <img src="/icons/AstarPass-logo.png" />
        </div>
        <div v-else>
          <img src="/icons/AstarPass-logo-gray.png" />
        </div>
        <div class="tw-mt-4">
          <div v-if="!!registeredEvm">Your status : Registered</div>
          <div v-else>
            <div v-if="stakerStatus > 0">Your status : Staker</div>
            <div v-else>
              <div v-if="isRegistered">Your status : Registered</div>
              <div v-else>Your status : Not Registered</div>
            </div>
          </div>
        </div>
        <div v-if="isRegistered || !!registeredEvm">
          <div v-if="substrateAccount" class="tw-mt-4">
            <span>{{ $t('common.native') }}</span>
            <span class="tw-ml-4">{{ getShortenAddress(substrateAccount) }}</span>
          </div>
          <div v-if="registeredEvm" class="tw-mt-2">
            <span>{{ $t('common.evm') }}</span>
            <span class="tw-ml-4">{{ getShortenAddress(registeredEvm) }}</span>
          </div>
          <div v-else>
            <div v-if="ethereumAccount" class="tw-mt-2">
              <span>{{ $t('common.evm') }}</span>
              <span class="tw-ml-4">{{ getShortenAddress(ethereumAccount) }}</span>
            </div>
          </div>
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
import { getShortenAddress } from 'src/modules/address';
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
    const registeredEvm = computed(() => store.getters['general/registeredEvm']);
    const ethereumAccount = computed(() => store.getters['general/ethereumAccount']);
    const substrateAccount = computed(() => store.getters['general/substrateAccount']);
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
      substrateAccount,
      stakerStatus,
      isRegistered,
      getShortenAddress,
      registeredEvm,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './styles/register.scss';
</style>
