<template>
  <div>
    <!-- todo -->
    <div>header</div>
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
    // const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    // isDark
    //   ? document.documentElement.classList.add('dark')
    //   : document.documentElement.classList.remove('dark');
  },
});
</script>

<style lang="scss" scoped>
.main-wrapper {
  padding: 0px 4px;
  @media (min-width: 756px) {
    padding: 0px 24px;
  }
}
</style>
