<script lang="ts" setup>
import { watch, nextTick, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useMachineDetail } from "./machine.ts";

const route = useRoute();

const {
  machineName,
  sensors,
  selectedSensorIds,
  chartRef,
  fetchMachineName,
  fetchSensors,
  fetchCapteurValues,
  drawChart
} = useMachineDetail();

// Load machine info & sensors on mount
onMounted(() => {
  const machineId = route.params.id as string;
  if (machineId) {
    fetchMachineName(machineId);
    fetchSensors(machineId);
  }
});

// Reload if user changes machine in URL
watch(
  () => route.params.id,
  (machineId) => {
    if (!machineId) return;

    selectedSensorIds.value = [];
    fetchMachineName(machineId as string);
    fetchSensors(machineId as string);
  }
);

// Refresh chart when sensors change
watch(
  selectedSensorIds,
  async () => {
    await fetchCapteurValues();
    await nextTick();
    drawChart();
  },
  { deep: true }
);
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-full h-full p-6 space-y-6 bg-gray-800 rounded-lg shadow-lg overflow-auto">
      
      <h1 class="text-2xl font-bold text-center text-white mb-4">
        {{ machineName }}
      </h1>

      <!-- SENSOR SELECTOR -->
      <div>
        <label class="block mb-1 text-white font-medium">Select Sensors</label>
        <div class="flex gap-x-4 gap-y-2 p-2 bg-gray-700 rounded-md border border-gray-400">
          <div
            v-for="sensor in sensors"
            :key="sensor.id"
            class="flex items-center"
          >
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

      <!-- CHART -->
      <div class="bg-gray-700 p-4 rounded-md border border-gray-400 shadow-inner">
        <canvas ref="chartRef" class="w-full h-full"></canvas>
      </div>

    </div>
  </div>
</template>
