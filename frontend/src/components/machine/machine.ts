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
    "#ffffffff",
    "#ff6acbff",
    "#34aeffff",
    "#b5b5b5ff",
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

    // Track colors already assigned
    const usedColors = new Set(Object.values(sensorColors.value));

    const datasets = capteurValues.value.map((sensorData) => {
      // Assign a color if not already assigned
      if (!sensorColors.value[sensorData.sensorId]) {
        const availableColor = colorPalette.find((c) => !usedColors.has(c)) || "#000000";
        sensorColors.value[sensorData.sensorId] = availableColor;
        usedColors.add(availableColor);
      }

      // Find the sensor details
      const sensor = sensors.value.find((s) => s.id === sensorData.sensorId);
      const label = sensor ? `${sensor.nom} in ${sensor.unit}` : "Sensor";

      return {
        label,
        data: sensorData.values.map((v) => ({
          x: new Date(v.dateTime),
          y: v.capteurValue,
        })),
        borderColor: sensorColors.value[sensorData.sensorId],
        backgroundColor: "transparent",
        pointRadius: 1,
        borderWidth: 3,
        tension: 0.4, // smooth lines
      };
    });

    const data: ChartData<"line", { x: Date; y: number }[]> = { datasets };

    const options: ChartOptions<"line"> = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: "white", // legend text
          },
        },
        tooltip: {
          titleColor: "white",
          bodyColor: "white",
          footerColor: "white",
        },
      },
      scales: {
        x: {
          type: "time",
          time: { unit: "hour", tooltipFormat: "HH:mm:ss" },
          title: { display: true, text: "Time", color: "white" },
          ticks: { color: "white" },
          grid: { color: "rgba(255, 255, 255, 0.12)" },
        },
        y: {
          beginAtZero: true,
          title: { display: true, text: "Value", color: "white" },
          ticks: { color: "white" },
          grid: { color: "rgba(255,255,255,0.12)" },
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