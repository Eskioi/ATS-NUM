<script lang="ts" setup>
import { watch, nextTick } from 'vue'
import { useHome } from './home.ts'

const {
  machines,
  sensors,
  selectedMachineId,
  selectedSensorIds,
  chartRef,
  fetchMachines,
  fetchSensors,
  fetchCapteurValues,
  drawChart
} = useHome()

// Fetch machines on component mount
fetchMachines()

// Watch selected machine and load its sensors
watch(selectedMachineId, (newId) => {
  if (newId) fetchSensors(newId)
  selectedSensorIds.value = [] // reset selected sensors when machine changes
})

// Watch selected sensors and fetch values
watch(selectedSensorIds, async () => {
  await fetchCapteurValues()
  await nextTick()
  drawChart()
}, { deep: true })
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-full h-full p-6 space-y-6 bg-gray-800 rounded-lg shadow-lg overflow-auto">
      <h1 class="text-2xl font-bold text-center text-white mb-4">Home</h1>

      <!-- Machine & Sensor selectors -->
      <div class="flex flex-col md:flex-row gap-6">
        <!-- Machine selector -->
        <div class="flex-1">
          <label class="block mb-1 text-white font-medium">Select Machine</label>
          <select
            v-model="selectedMachineId"
            class="w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Select Machine --</option>
            <option v-for="machine in machines" :key="machine.id" :value="machine.id">
              {{ machine.machine }}
            </option>
          </select>
        </div>

        <!-- Sensor selector (horizontal) -->
        <div class="flex-1">
          <label class="block mb-1 text-white font-medium">Select Sensors</label>
          <div class="flex gap-x-4 gap-y-2 p-2 bg-gray-700 rounded-md border border-gray-400">
            <div v-for="sensor in sensors" :key="sensor.id" class="flex items-center">
              <input
                type="checkbox"
                :value="sensor.id"
                v-model="selectedSensorIds"
                class="mr-2 accent-blue-500"
              />
              <span class="text-white">{{ sensor.nom }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Chart -->
      <div class="bg-gray-700 p-4 rounded-md border border-gray-400 shadow-inner">
        <canvas ref="chartRef" class="w-full h-full"></canvas>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scrollbar styling */
.flex-col::-webkit-scrollbar {
  width: 6px;
}
.flex-col::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}
</style>
