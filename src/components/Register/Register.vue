<template>
  <div class="columns">
    <div class="container">
      <SubstrateWallet />
      <EthereumWallet />
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
@import './styles/register.scss';
</style>
