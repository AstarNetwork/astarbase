<template>
  <div>
    <div class="header">
      <span class="tw-text-3xl tw-font-bold">
        {{ $t('common.astarBase') }}
      </span>
    </div>
    <div class="main-wrapper">
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    isDark
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
  },
});
</script>

<style lang="scss" scoped>
.main-wrapper {
  padding: 0px 24px;
  @media (min-width: 756px) {
    padding: 0px 100px;
  }
}

.header {
  position: absolute;
  top: 56px;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
