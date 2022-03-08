<template>
  <div class="container">
    <SubstrateWallet />
    <EthereumWallet />
  </div>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { computed, defineComponent, watchEffect } from 'vue';
import EthereumWallet from './EthereumWallet.vue';
import SubstrateWallet from './SubstrateWallet.vue';

export default defineComponent({
  components: {
    EthereumWallet,
    SubstrateWallet,
  },
  setup(props, { emit }) {
    const store = useStore();
    const substrateAccounts = computed(() => store.getters['general/substrateAccounts']);

    watchEffect(() => {
      console.log('substrateAccounts', substrateAccounts.value);
    });
  },
});
</script>

<style lang="scss" scoped>
@import './styles/mint.scss';
</style>
