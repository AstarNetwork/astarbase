<template>
  <div class="container-ethereum-wallet">
    <div>
      <label>{{ $t('register.evmConnectLabel') }}</label>
      <div>
        <button v-if="!isConnected" class="btn" @click="connect">
          {{ $t('register.connectMetaMask') }}
        </button>
        <button v-else class="btn" @click="disconnect">
          {{ $t('register.connectedMetaMask') }}
        </button>
      </div>
    </div>

    <div v-if="isConnected">
      <div class="tw-text-lg info-green">
        {{ $t('common.address', { value: getShortenAddress(account) }) }}
      </div>
    </div>
    <!-- Todo: fix `:disabled` -->
    <div v-if="!registered">
      <label>{{ $t('register.registerLabel') }}</label>
      <div>
        <button :disabled="!isConnected" class="btn" @click="register">
          {{ $t('register.register') }}
        </button>
      </div>
    </div>
    <div>{{ errorMessage }}</div>
    <div v-if="registered">
      <label>{{ $t('register.registerLabel') }}</label>
      <div>
        <button class="btn" @click="mintNft">
          {{ $t('register.mintNft') }}
        </button>
      </div>
    </div>
    <div v-if="registered" class="info-green">{{ $t('register.registered') }}</div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { computed, defineComponent } from 'vue';
import { getShortenAddress } from 'src/modules/address';
import { useRegister } from 'src/hooks';

export default defineComponent({
  setup() {
    const store = useStore();
    const errorMessage = computed(() => store.getters['general/errorMessage']);
    const isConnected = computed(() => store.getters['general/isMetamaskConnected']);
    const account = computed(() => store.getters['general/ethereumAccount']);
    const registered = computed(() => store.getters['general/registered']);
    const { register } = useRegister();

    const connect = () => {
      store.dispatch('general/connect');
    };

    const disconnect = () => {
      store.dispatch('general/disconnect');
    };

    const mintNft = () => {
      console.log('go to mint site');
      window.open('https://astarmint-28bcc.web.app/');
    };

    return {
      registered,
      errorMessage,
      isConnected,
      account,
      connect,
      disconnect,
      register,
      getShortenAddress,
      mintNft,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './styles/ethereum-wallet.scss';
</style>
