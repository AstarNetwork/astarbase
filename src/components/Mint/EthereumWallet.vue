<template>
  <div class="container-ethereum-wallet">
    <div>
      <button v-if="!isConnected" class="btn" @click="connect">
        {{ $t('mint.connectMetaMask') }}
      </button>
      <button v-else class="btn" @click="disconnect">{{ $t('mint.connectedMetaMask') }}</button>
    </div>

    <div v-if="isConnected">
      <div class="tw-text-lg">
        {{ $t('common.address', { value: getShortenAddress(account) }) }}
      </div>
    </div>
    <!-- Todo: fix `:disabled` -->
    <button :disabled="!isConnected" class="btn" @click="mint">{{ $t('mint.mint') }}</button>
    <div>{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { computed, defineComponent } from 'vue';
import { getShortenAddress } from 'src/modules/address';
import { useMint } from 'src/hooks';

export default defineComponent({
  setup() {
    const store = useStore();
    const errorMessage = computed(() => store.getters['general/errorMessage']);
    const isConnected = computed(() => store.getters['general/isMetamaskConnected']);
    const account = computed(() => store.getters['general/ethereumAccount']);
    const { mint } = useMint();

    const connect = () => {
      store.dispatch('general/connect');
    };

    const disconnect = () => {
      store.dispatch('general/disconnect');
    };

    return {
      errorMessage,
      isConnected,
      account,
      connect,
      disconnect,
      mint,
      getShortenAddress,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './styles/ethereum-wallet.scss';
</style>
