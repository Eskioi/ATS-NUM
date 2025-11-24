import { ref } from "vue";
import axios from "axios";
import { Chart } from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import "chart.js/auto";
import "chartjs-adapter-date-fns";

export interface MachineResponse {
  id: string;
  machine: string;
}

export interface Capteur {
  id: string;
  machineId: string;
  nom: string;
  unit: string;
  typeData: string | null;
}

export interface CapteurValue {
  id: string;
  capteurId: string;
  capteurValue: number;
  dateTime: string;
}

export interface CapteurValuesBySensor {
  sensorId: string;
  values: CapteurValue[];
}

export function useMachineDetail() {
  const machineName = ref<string>("Loading...");
  const sensors = ref<Capteur[]>([]);
  const selectedSensorIds = ref<string[]>([]);
  const capteurValues = ref<CapteurValuesBySensor[]>([]);
  const chartRef = ref<HTMLCanvasElement | null>(null);

  let chartInstance:
    | Chart<"line", { x: Date; y: number }[], unknown>
    | null = null;

  //---------------------------------------
  // Color palette for sensors
  //---------------------------------------
  const colorPalette = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#C9CBCF",
    "#8B0000",
  ];

  const sensorColors = ref<Record<string, string>>({});

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

  //---------------------------------------
  // Fetch machine name
  //---------------------------------------
  const fetchMachineName = async (machineId: string) => {
    try {
      const response = await axios.post<MachineResponse>(
        "/machine/getMachine",
        { id: machineId },
        getAuthHeaders()
      );

      machineName.value = response.data.machine;
    } catch (err) {
      console.error("Failed to fetch machine name", err);
      machineName.value = "Unknown Machine";
    }
  };

  //---------------------------------------
  // Fetch sensors for a machine
  //---------------------------------------
  const fetchSensors = async (machineId: string) => {
    try {
      const response = await axios.post<Capteur[]>(
        "/capteur/getAllCapteursByMachineId",
        { id: machineId },
        getAuthHeaders()
      );
      sensors.value = response.data;
    } catch (err) {
      console.error("Failed to fetch sensors", err);
    }
  };

  //---------------------------------------
  // Fetch values for selected sensors
  //---------------------------------------
  const fetchCapteurValues = async () => {
    capteurValues.value = [];

    for (const sensorId of selectedSensorIds.value) {
      try {
        const response = await axios.post<CapteurValue[]>(
          "/capteurValue/getAllCapteurValuesByCapteurId",
          { id: sensorId },
          getAuthHeaders()
        );

        capteurValues.value.push({ sensorId, values: response.data });
      } catch (err) {
        console.error("Failed to fetch capteur values for " + sensorId, err);
      }
    }
  };

  //---------------------------------------
  // Chart handling
  //---------------------------------------
  const destroyChart = () => {
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
  };

  const drawChart = () => {
    if (!chartRef.value) return;

    destroyChart();

    const datasets = capteurValues.value.map((sensorData, index) => {
      // Assign a persistent color to each sensor if not already assigned
      if (!sensorColors.value[sensorData.sensorId]) {
        sensorColors.value[sensorData.sensorId] =
          colorPalette[index % colorPalette.length] || "#000000";
      }

      return {
        label:
          sensors.value.find((s) => s.id === sensorData.sensorId)?.nom ||
          "Sensor",
        data: sensorData.values.map((v) => ({
          x: new Date(v.dateTime),
          y: v.capteurValue,
        })),
        borderColor: sensorColors.value[sensorData.sensorId],
        backgroundColor: "transparent",
      };
    });

    const data: ChartData<"line", { x: Date; y: number }[]> = { datasets };

    const options: ChartOptions<"line"> = {
      responsive: true,
      plugins: { legend: { position: "top" } },
      scales: {
        x: {
          type: "time",
          time: { unit: "hour", tooltipFormat: "HH:mm:ss" },
          title: { display: true, text: "Time" },
        },
        y: {
          beginAtZero: true,
          title: { display: true, text: "Value" },
        },
      },
    };

    chartInstance = new Chart(chartRef.value, {
      type: "line",
      data,
      options,
    });
  };

  return {
    machineName,
    sensors,
    selectedSensorIds,
    capteurValues,
    chartRef,

    fetchMachineName,
    fetchSensors,
    fetchCapteurValues,
    drawChart,
  };
}