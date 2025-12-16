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
  selectedTimespan,
  timespanOptions,
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
  <div class="flex justify-center items-center min-h-screen pt-16">
    <div class="w-full h-[calc(100vh-5rem)] p-6 space-y-6 bg-gray-800 rounded-lg shadow-lg overflow-auto">
      
      <h1 class="text-2xl font-bold text-center text-white mb-4">
        {{ machineName }}
      </h1>

      <!-- Controls in a single row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        <!-- Timespan Selector -->
        <div>
          <label class="block mb-1 text-white font-medium">Time Period</label>
          <select
            v-model="selectedTimespan"
            class="w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all cursor-pointer"
          >
            <option
              v-for="option in timespanOptions"
              :key="option.value"
              :value="option.value"
              class="bg-gray-700 text-white"
            >
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Sensor Selector -->
        <div>
          <label class="block mb-1 text-white font-medium">Select Sensors</label>
          <div class="flex flex-wrap gap-x-4 gap-y-2 p-2 bg-gray-700 rounded-md border border-gray-400 max-h-[100px] overflow-y-auto">
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
      </div>

      <!-- CHART -->
      <div class="bg-gray-700 p-4 rounded-md border border-gray-400 shadow-inner" style="height: calc(100vh - 20rem);">
        <canvas ref="chartRef" class="w-full h-full"></canvas>
      </div>

    </div>
  </div>
</template>
