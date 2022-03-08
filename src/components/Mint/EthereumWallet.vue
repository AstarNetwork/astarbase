<template>
  <div class="container-ethereum-wallet">
    <div>
      <button v-if="!isConnected" class="btn" @click="connect()">
        {{ $t('mint.connectMetaMask') }}
      </button>
      <button v-else class="btn" @click="disconnect()">{{ $t('mint.connectedMetaMask') }}</button>
    </div>

    <div v-if="isConnected">
      <div class="tw-text-lg">
        {{ $t('common.address', { value: getShortenAddress(account) }) }}
      </div>
    </div>
    <button :disabled="!isConnected" class="btn" @click="mint()">{{ $t('mint.mint') }}</button>
    <div>{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { computed, defineComponent } from 'vue';
import { Contract } from 'web3-eth-contract';
import { getShortenAddress } from 'src/modules/address';

export default defineComponent({
  setup() {
    const store = useStore();
    const errorMessage = computed(() => store.getters['general/errorMessage']);
    const isConnected = computed(() => store.getters['general/isMetamaskConnected']);
    const mintContract = computed(() => store.getters['general/mintContract']);
    const mintContractAddress = computed(() => store.getters['general/mintContractAddress']);
    const account = computed(() => store.getters['general/ethereumAccount']);

    const connect = () => {
      store.dispatch('general/connect');
    };

    const disconnect = () => {
      store.dispatch('general/disconnect');
    };

    const mint = () => {
      const contract = mintContract.value as Contract;
      contract?.methods
        .mint('1')
        .send({
          to: mintContractAddress.value,
          from: account.value,
        })
        .once('error', (err: Error) => {
          console.log(err);
          store.dispatch('general/setError', err.message);
        })
        .then((receipt: any) => {
          console.log(receipt);
          //TODO check if data reload is required
        });
    };

    return {
      errorMessage,
      isConnected,
      connect,
      disconnect,
      mint,
      account,
      getShortenAddress,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './styles/ethereum-wallet.scss';
</style>
