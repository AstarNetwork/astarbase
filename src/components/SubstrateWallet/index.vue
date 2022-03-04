<template>
  <div>
    <div>Substrate Wallet</div>
    <!-- <div v-if="isConnected">Address: {{ account }}</div> -->
  </div>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { computed, defineComponent } from 'vue';
import { Contract } from 'web3-eth-contract';

export default defineComponent({
  setup() {
    return {};
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
