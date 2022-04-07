<template>
  <div class="columns">
    <div class="container">
      <SubstrateWallet />
      <EthereumWallet />
    </div>
    <div class="logo">
      <div v-if="ethereumAccount">
        <img
          v-if="isRegistered && stakerStatus > 0"
          width="100"
          src="/icons/shiden-pass-staker.png"
        />
        <img v-else-if="isRegistered" width="100" src="/icons/shiden-pass-registered.png" />
        <img v-else width="100" src="/icons/shiden-pass-gray.png" />
      </div>
      <img v-else width="100" src="/icons/shiden-pass-gray.png" />
    </div>
    <div class="info">
      <div>
        {{ $t('register.info') }} <br /><br />
        {{ $t('register.info2') }} <br /><br />
        {{ $t('register.info3') }} <br />
        {{ $t('register.info4') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { computed, defineComponent } from 'vue';
import EthereumWallet from './EthereumWallet.vue';
import SubstrateWallet from './SubstrateWallet.vue';

export default defineComponent({
  components: {
    EthereumWallet,
    SubstrateWallet,
  },
  setup() {
    const store = useStore();
    const ethereumAccount = computed(() => store.getters['general/ethereumAccount']);
    const stakerStatus = computed(() => store.getters['general/stakerStatus']);
    const isRegistered = computed(() => store.getters['general/isRegistered']);

    return {
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
