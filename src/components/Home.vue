<template>
  <div>
    <mint />
    <substrate-wallet />
  </div>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { computed, defineComponent, watchEffect } from 'vue';
import Mint from './Mint/index.vue';
import SubstrateWallet from './SubstrateWallet/index.vue';

export default defineComponent({
  components: {
    Mint,
    SubstrateWallet
  },
  setup(props, { emit }) {
    const store = useStore();
    const substrateAccounts = computed(
      () => store.getters['general/substrateAccounts']
    );

    watchEffect(() => {
      console.log('substrateAccounts', substrateAccounts.value);
    });
  }
});
</script>
