<template>
  <div class="container">
    <SubstrateWallet />
    <EthereumWallet />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EthereumWallet from './EthereumWallet.vue';
import SubstrateWallet from './SubstrateWallet.vue';

export default defineComponent({
  components: {
    EthereumWallet,
    SubstrateWallet,
  },
});
</script>

<style lang="scss" scoped>
@import './styles/mint.scss';
</style>
