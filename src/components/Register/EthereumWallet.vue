<template>
  <div class="container-ethereum-wallet">
    <div>
      <div class="tw-mb-6">
        <label>{{ $t('register.evmConnectLabel') }}</label>
      </div>
      <div>
        <button
          v-if="!isConnected"
          :disabled="!!registeredEvm || !substrateAddress"
          class="btn"
          @click="connect"
        >
          {{ $t('register.connectMetaMask') }}
        </button>
        <button v-else class="btn" @click="disconnect">
          {{ $t('register.connectedMetaMask', { value: getShortenAddress(account) }) }}
        </button>
      </div>
    </div>
    <!-- Todo: fix `:disabled` -->
    <div v-if="!isRegistered">
      <div class="tw-mb-6">
        <label>{{ $t('register.registerLabel') }}</label>
      </div>
      <div>
        <button :disabled="!isConnected" class="btn" @click="register">
          {{ $t('register.register') }}
        </button>
      </div>
    </div>
    <div class="error">{{ errorMessage }}</div>
    <div v-if="isRegistered">
      <div class="tw-mb-6">
        <label>{{ $t('register.registerLabel') }}</label>
      </div>
      <div>
        <button class="btn green">
          {{ $t('register.mintNft') }}
        </button>
      </div>
    </div>
    <div v-if="isRegistered" class="info-green">
      {{ $t('register.registered') }}
      <a class="link" href="https://portal.astar.network/#/dapp-staking/discover">dapps-staking</a>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { computed, defineComponent } from 'vue';
import { getShortenAddress } from 'src/modules/address';
import { useAccount, useRegister } from 'src/hooks';

export default defineComponent({
  setup() {
    const store = useStore();
    const errorMessage = computed(() => store.getters['general/errorMessage']);
    const isConnected = computed(() => store.getters['general/isMetamaskConnected']);
    const account = computed(() => store.getters['general/ethereumAccount']);
    const isRegistered = computed(() => store.getters['general/isRegistered']);
    const registeredEvm = computed(() => store.getters['general/registeredEvm']);
    const { register } = useRegister();
    const { substrateAddress } = useAccount();

    const connect = () => {
      store.dispatch('general/connect');
    };

    const disconnect = () => {
      store.dispatch('general/disconnect');
    };

    const mintNft = () => {
      console.log('go to mint site');
      window.open('https://astarnaut.astar.network/');
    };

    return {
      isRegistered,
      errorMessage,
      isConnected,
      account,
      connect,
      disconnect,
      register,
      getShortenAddress,
      mintNft,
      registeredEvm,
      substrateAddress,
    };
  },
});
</script>

<style lang="scss" scoped>
@import './styles/ethereum-wallet.scss';
</style>
