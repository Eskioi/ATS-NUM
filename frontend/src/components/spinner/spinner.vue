<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
    <div class="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useSpinner from './spinner.ts';

export default defineComponent({
  name: 'Spinner',
  setup() {
    const { visible } = useSpinner();
    return { visible };
  }
});
</script>
