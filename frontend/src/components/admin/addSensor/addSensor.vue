<script lang="ts" setup>
import Spinner from "../../spinner/spinner.vue"
import { useAddSensor } from "./addSensor.ts"

const { machines, selectedMachineId, sensorName, sensorUnit, addSensor } = useAddSensor()
</script>

<template>
  <Spinner />

  <div class="w-full max-w-md p-6 space-y-6 bg-gray-800 rounded-lg">
    <h2 class="text-2xl font-bold text-center text-white">Add Sensor</h2>

    <form @submit.prevent="addSensor" class="space-y-4">
      <!-- Machine selector -->
      <div>
        <label class="block text-sm font-medium text-white">Select Machine</label>
        <select
          v-model="selectedMachineId"
          class="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md bg-gray-700 text-white
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option v-for="machine in machines" :key="machine.id" :value="machine.id">
            {{ machine.machine }}
          </option>
        </select>
      </div>

      <!-- Sensor Name -->
      <div>
        <label class="block text-sm font-medium text-white">Sensor Name</label>
        <input
          v-model="sensorName"
          type="text"
          placeholder="Enter sensor name"
          required
          class="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md bg-gray-700 text-white
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Sensor Unit -->
      <div>
        <label class="block text-sm font-medium text-white">Unit</label>
        <input
          v-model="sensorUnit"
          type="text"
          placeholder="Enter unit (e.g., °C, V, %)"
          required
          class="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md bg-gray-700 text-white
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700
               focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Sensor
      </button>
    </form>
  </div>
</template>
