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
  name: 'MainLayout'
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
