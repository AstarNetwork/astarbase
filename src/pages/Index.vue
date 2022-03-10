<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style>
.dark\:tw-bg-blue-500 {
  background-color: rgba(27, 109, 193, 0.1) !important;
}
.checked\:tw-border-blue-500:checked {
  border-color: rgba(27, 109, 193, 1) !important;
}
</style>
