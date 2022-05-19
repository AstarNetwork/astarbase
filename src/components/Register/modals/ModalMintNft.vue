<template>
  <div class="tw-fixed tw-z-10 tw-inset-0 tw-overflow-y-auto" @click="setCloseModal">
    <div class="tw-flex tw-items-center tw-justify-center tw-min-h-screen">
      <!-- Background overlay -->
      <div class="tw-fixed tw-inset-0 tw-transition-opacity" aria-hidden="true">
        <div class="tw-absolute tw-inset-0 tw-bg-gray-900 dark:tw-bg-black tw-opacity-75"></div>
      </div>

      <div
        class="tw-inline-block tw-bg-white dark:tw-bg-darkGray-900 tw-rounded-lg tw-px-4 sm:tw-px-8 tw-py-10 tw-shadow-xl tw-transform tw-transition-all tw-mx-2 tw-my-2 tw-align-middle tw-max-w-lg tw-w-full"
        @click.stop
      >
        <div>
          <div class="tw-mb-8">
            <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-mb-4">
              <div class="tw-mr-3 tw-mb-2 tw-text-gray-700">
                {{ $t('register.successfullyRegistered') }}
              </div>
              <div class="tw-mr-3 tw-mb-2">
                <h1 class="tw-text-4xl tw-font-extrabold">Shiden Pass</h1>
              </div>
            </div>
            <!-- <div class="tw-text-md tw-text-black-800 tw-text-center">
              {{ $t('register.mintNftCTA') }}
            </div> -->
          </div>
        </div>
        <!-- <div class="tw-mt-6 tw-flex tw-justify-center">
          <a href="https://astarnaut.astar.network" target="_blank" rel="noopener noreferrer">
            <button type="button" class="btn">
              {{ $t('register.goToMint') }}
            </button>
          </a>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    setCloseModal: {
      type: Function,
      required: true,
    },
  },
});
</script>

<style scoped>
.installButton {
  @apply tw-inline-flex tw-items-center tw-px-4 tw-py-3 tw-border tw-border-transparent tw-text-sm tw-font-medium tw-rounded-full tw-shadow-sm tw-text-white tw-bg-blue-500  tw-mx-1;
}
.installButton:hover {
  @apply tw-bg-blue-700 dark:tw-bg-blue-400;
}

.learnButton {
  @apply tw-inline-flex tw-items-center tw-px-4 tw-py-3 tw-border tw-border-gray-300 dark:tw-border-darkGray-500 tw-text-sm tw-font-medium tw-rounded-full tw-text-gray-500 dark:tw-text-darkGray-400 tw-bg-white dark:tw-bg-darkGray-900 tw-mx-3;
}
.learnButton:hover {
  @apply tw-bg-gray-100 dark:tw-bg-darkGray-700;
}
</style>
