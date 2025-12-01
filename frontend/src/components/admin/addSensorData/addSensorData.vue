<script lang="ts" setup>
import Spinner from "../../spinner/spinner.vue"
import { useAddSensorData } from "./addSensorData.ts"

const {
  machines,
  selectedMachineId,
  sensors,
  selectedSensorId,
  sensorValue,
  dateTime,
  addSensorData
} = useAddSensorData()
</script>

<template>
  <Spinner />

  <div class="w-full max-w-md p-6 space-y-6 bg-gray-800 rounded-lg">
    <h2 class="text-2xl font-bold text-center text-white">Add Sensor Data</h2>

    <form @submit.prevent="addSensorData" class="space-y-4">
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

      <!-- Sensor selector -->
      <div>
        <label class="block text-sm font-medium text-white">Select Sensor</label>
        <select
          v-model="selectedSensorId"
          class="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md bg-gray-700 text-white
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option v-for="sensor in sensors" :key="sensor.id" :value="sensor.id">
            {{ sensor.nom }} ({{ sensor.unit }})
          </option>
        </select>
      </div>

      <!-- Value input -->
      <div>
        <label class="block text-sm font-medium text-white">Value</label>
        <input
          v-model.number="sensorValue"
          type="number"
          placeholder="Enter sensor value"
          required
          class="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md bg-gray-700 text-white
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- DateTime input -->
      <div>
        <label class="block text-sm font-medium text-white">Date & Time</label>
        <input
          v-model="dateTime"
          type="datetime-local"
          required
          class="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md bg-gray-700 text-white
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="w-full px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700
               focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Sensor Data
      </button>
    </form>
  </div>
</template>
