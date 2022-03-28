<template>
  <div>
    <div class="header">
      <h1 class="tw-text-6xl">
        {{ $t('common.shidenPass') }}
      </h1>
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
  padding: 50px 100px;
}
</style>
