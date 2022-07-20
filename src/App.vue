<template>
  <div>
    <main-layout>
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <keep-alive>
            <Suspense>
              <template #default>
                <Component :is="Component"></Component>
              </template>
              <template #fallback>
                <modal-loading />
              </template>
            </Suspense>
          </keep-alive>
        </template>
      </router-view>
    </main-layout>
    <modal-loading v-if="isLoading" />
    <transition name="fade">
      <alert-box
        v-show="showAlert.showAlertMsg"
        :msg="showAlert.alertMsg"
        :alert-type="showAlert.alertType"
      />
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import MainLayout from './layouts/MainLayout.vue';
import Spinner from 'src/components/common/Spinner.vue';
import ModalLoading from 'src/components/common/ModalLoading.vue';
import AlertBox from 'src/components/common/AlertBox.vue';
import { useStore } from 'src/store';

export default defineComponent({
  name: 'App',
  components: {
    MainLayout,
    Spinner,
    ModalLoading,
    AlertBox,
  },
  setup() {
    const store = useStore();
    const isLoading = computed(() => store.getters['general/isLoading']);
    const showAlert = computed(() => store.getters['general/showAlert']);

    return {
      isLoading,
      showAlert,
    };
  },
});
</script>

<style>
:root {
  color-scheme: light only !important;
}

::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-track {
  background: #cbd5e0;
}

::-webkit-scrollbar-thumb {
  background: #718096;
}

::-webkit-scrollbar-thumb:hover {
  background: #2d3748;
}

.bg-black-alt {
  background: #191919;
}
.text-black-alt {
  color: #191919;
}
.border-black-alt {
  border-color: #191919;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
