<template>
  <div>
    <button v-if="!isConnected" @click="connect()">Connect</button>
    <button v-if="isConnected" @click="mint()">Mint</button>
    <div>{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { Contract } from 'web3-eth-contract'; 
import { useStore } from '../store';

export default defineComponent({
  setup() {
    const store = useStore();
    const errorMessage = computed(() => store.getters['errorMessage']);
    const isConnected = computed(() => store.getters['isMetamaskConnected']);
    const mintContract = computed(() => store.getters['mintContract']);
    const mintContractAddress = computed(() => store.getters['mintContractAddress']);
    const account = computed(() => store.getters['account']);

    const connect = () => {
      store.dispatch('connect');
    }

    const mint = () => {
      const contract = (mintContract.value) as Contract;
      contract?.methods
        .mint('1')
        .send({
          to: mintContractAddress.value,
          from: account.value,
        })
        .once("error", (err: Error) => {
          console.log(err);
          store.dispatch('setError', err.message);
        })
        .then((receipt: any) => {
          console.log(receipt);
          //TODO check if data reload is required
        });
    }

    return {
      errorMessage,
      isConnected,
      connect,
      mint
    }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
