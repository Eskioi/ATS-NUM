<script lang="ts" setup>
import { useAdmin } from "./admin.ts"
import Spinner from "../../spinner/spinner.vue"

const { goToAddMachine, goToAddSensor, goToAddSensorData } = useAdmin()
</script>

<template>
  <Spinner />

  <div class="w-full max-w-md p-6 space-y-6 bg-gray-800 rounded-lg">
    <h2 class="text-2xl font-bold text-center text-white">Admin Panel</h2>

    <p class="text-center text-gray-300">
      Choose an action below.
    </p>

    <div class="space-y-4">
      <!-- Add Machines -->
      <button
        @click="goToAddMachine"
        class="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Add Machines
      </button>

      <!-- Add Sensors -->
      <button
        @click="goToAddSensor"
        class="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
      >
        Add Sensors to Machine
      </button>

      <!-- Add Sensor Data -->
      <button
        @click="goToAddSensorData"
        class="w-full px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
      >
        Add Sensor Data
      </button>
    </div>
  </div>
</template>
