<template>
  <div>
    <div class="tw-mb-2">Ethereum Wallet</div>
    <div v-if="isConnected">Address: {{ account }}</div>
    <div>
      <button v-if="!isConnected" @click="connect()">Connect</button>
      <button v-if="isConnected" @click="disconnect()">Disconnect</button>
      <button v-if="isConnected" @click="mint()">Mint</button>
      <div>{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { computed, defineComponent } from 'vue';
import { Contract } from 'web3-eth-contract';

export default defineComponent({
  setup() {
    const store = useStore();
    const errorMessage = computed(() => store.getters['general/errorMessage']);
    const isConnected = computed(() => store.getters['general/isMetamaskConnected']);
    const mintContract = computed(() => store.getters['general/mintContract']);
    const mintContractAddress = computed(() => store.getters['general/mintContractAddress']);
    const account = computed(() => store.getters['general/account']);

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
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
