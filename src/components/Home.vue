<template>
  <mint />
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { computed, defineComponent, watchEffect } from 'vue';
import Mint from './Mint/Mint.vue';

export default defineComponent({
  components: {
    Mint
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
