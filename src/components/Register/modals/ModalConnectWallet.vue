<template>
  <Modal title="Select a Wallet" class="animate__animated animate__fadeIn" @click="setCloseModal">
    <template #content>
      <div class="tw-max-w-md">
        <div class="tw-text-lg tw-text-center tw-text-blue-900 dark:tw-text-darkGray-100">
          {{ $t('register.wallet.select') }}
        </div>
        <div
          class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-flex-wrap tw-gap-x-2 tw-justify-center tw-items-center"
        >
          <WalletOption
            v-for="(wallet, index) in supportWallets"
            :key="index"
            :wallet="wallet"
            :set-wallet-modal="setWalletModal"
          />
        </div>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import WalletOption from '../modals/wallet/WalletOption.vue';
import Modal from 'src/components/common/Modal.vue';
import { supportWallets } from 'src/modules/wallet';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    Modal,
    WalletOption,
  },
  props: {
    setCloseModal: {
      type: Function,
      required: true,
    },
    setWalletModal: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    return { supportWallets };
  },
});
</script>
