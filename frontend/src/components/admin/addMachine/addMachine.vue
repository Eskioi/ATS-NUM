<script lang="ts" setup>
import Spinner from "../../spinner/spinner.vue"
import { useAddMachine } from "./addMachine.ts"

const { machine, addMachine } = useAddMachine()
</script>

<template>
  <!-- Show spinner when loading -->
  <Spinner />

  <!-- Show form when not loading -->
  <div class="w-full max-w-md p-6 space-y-6 bg-gray-800 rounded-lg">
    <h2 class="text-2xl font-bold text-center text-white">Add Machine</h2>

    <form @submit.prevent="addMachine" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-white">Machine Name</label>
        <input
          v-model="machine"
          type="text"
          placeholder="Enter machine name"
          required
          class="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md bg-gray-700 text-white
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        class="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 
               focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Machine
      </button>
    </form>
  </div>
</template>
