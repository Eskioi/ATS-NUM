<script lang="ts" setup>
import { computed } from 'vue'
import { snackbarState, useSnackbar } from './snackbar'

const { hide } = useSnackbar()
const { message, type, isVisible } = snackbarState

const bgColor = computed(() =>
  type.value === 'success' ? 'bg-green-500' : 'bg-red-500'
)
</script>


<template>
  <transition name="slide-fade">
    <div
      v-if="isVisible"
      :class="['fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg text-white', bgColor]"
    >
      <div class="flex items-center justify-between gap-4">
        <span>{{ message }}</span>
        <button @click="hide" class="text-white font-bold">✕</button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/* Slide from bottom animation */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(20px) translateX(-50%);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(20px) translateX(-50%);
}
</style>
