import { ref, watch } from "vue";
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

export interface TimespanOption {
  label: string;
  value: string;
  hours: number;
}

export function useMachineDetail() {
  const machineName = ref<string>("Loading...");
  const sensors = ref<Capteur[]>([]);
  const selectedSensorIds = ref<string[]>([]);
  const capteurValues = ref<CapteurValuesBySensor[]>([]);
  const chartRef = ref<HTMLCanvasElement | null>(null);
  
  // Timespan selection
  const selectedTimespan = ref<string>("24h");
  const timespanOptions: TimespanOption[] = [
    { label: "Last 6 Hours", value: "6h", hours: 6 },
    { label: "Last 12 Hours", value: "12h", hours: 12 },
    { label: "Last 24 Hours", value: "24h", hours: 24 },
    { label: "Last 3 Days", value: "3d", hours: 72 },
    { label: "Last Week", value: "1w", hours: 168 },
    { label: "All Time", value: "all", hours: -1 },
  ];

  let chartInstance:
    | Chart<"line", { x: Date; y: number }[], unknown>
    | null = null;

  //---------------------------------------
  // Color palette (cycled)
  //---------------------------------------
  const colorPalette = [
    "#ffffff",  // Blanc
    "#ff6acb",  // Rose
    "#34aeff",  // Bleu
    "#b5b5b5",  // Gris
  ];

  const sensorColors = ref<Record<string, string>>({});

  const getAuthHeaders = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      throw new Error("No authentication token found");
    }
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  };

  //---------------------------------------
  // Get timespan cutoff date
  //---------------------------------------
  const getTimespanCutoff = (): Date | null => {
    const option = timespanOptions.find(opt => opt.value === selectedTimespan.value);
    if (!option || option.hours === -1) {
      return null; // All time
    }
    const cutoff = new Date();
    cutoff.setHours(cutoff.getHours() - option.hours);
    return cutoff;
  };

  //---------------------------------------
  // Filter values by timespan
  //---------------------------------------
  const filterValuesByTimespan = (values: CapteurValue[]): CapteurValue[] => {
    const cutoff = getTimespanCutoff();
    if (!cutoff) {
      return values; // All time
    }
    return values.filter(v => new Date(v.dateTime) >= cutoff);
  };

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
  // Fetch sensors
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
  // Fetch sensor values
  //---------------------------------------
  const fetchCapteurValues = async () => {
    if (selectedSensorIds.value.length === 0) {
      capteurValues.value = [];
      return;
    }

    try {
      const promises = selectedSensorIds.value.map(async (sensorId) => {
        const response = await axios.post<CapteurValue[]>(
          "/capteurValue/getAllCapteurValuesByCapteurId",
          { id: sensorId },
          getAuthHeaders()
        );
        return { sensorId, values: response.data };
      });

      capteurValues.value = await Promise.all(promises);
    } catch (err) {
      console.error("Failed to fetch capteur values", err);
      capteurValues.value = [];
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

    // Si pas de données, ne pas créer le graphique
    if (capteurValues.value.length === 0) {
      return;
    }

    const datasets = capteurValues.value.map((sensorData, index) => {
      // Assign color (cycled)
      if (!sensorColors.value[sensorData.sensorId]) {
        sensorColors.value[sensorData.sensorId] =
          colorPalette[index % colorPalette.length];
      }

      const sensor = sensors.value.find(
        (s) => s.id === sensorData.sensorId
      );
      const label = sensor
        ? `${sensor.nom} (${sensor.unit})`
        : "Sensor";

      // Filter values by selected timespan
      const filteredValues = filterValuesByTimespan(sensorData.values);

      return {
        label,
        data: filteredValues.map((v) => ({
          x: new Date(v.dateTime),
          y: v.capteurValue,
        })),
        borderColor: sensorColors.value[sensorData.sensorId],
        backgroundColor: "transparent",
        pointRadius: 2,
        borderWidth: 2,
        tension: 0.4,
      };
    });

    const data: ChartData<"line", { x: Date; y: number }[]> = {
      datasets,
    };

    // Determine time unit based on selected timespan
    const getTimeUnit = (): "minute" | "hour" | "day" => {
      const option = timespanOptions.find(opt => opt.value === selectedTimespan.value);
      if (!option || option.hours === -1) return "day";
      if (option.hours <= 6) return "minute";
      if (option.hours <= 72) return "hour";
      return "day";
    };

    const options: ChartOptions<"line"> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: { color: "white" },
        },
        tooltip: {
          mode: "index",
          intersect: false,
          titleColor: "white",
          bodyColor: "white",
          footerColor: "white",
        },
      },
      scales: {
        x: {
          type: "time",
          time: {
            unit: getTimeUnit(),
            tooltipFormat: "dd/MM/yyyy HH:mm:ss",
            displayFormats: {
              minute: "HH:mm",
              hour: "HH:mm",
              day: "dd/MM",
            },
          },
          title: {
            display: true,
            text: "Time",
            color: "white",
          },
          ticks: { color: "white" },
          grid: { color: "rgba(255,255,255,0.12)" },
        },
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: "Value",
            color: "white",
          },
          ticks: { color: "white" },
          grid: { color: "rgba(255,255,255,0.12)" },
        },
      },
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false,
      },
    };

    chartInstance = new Chart(chartRef.value, {
      type: "line",
      data,
      options,
    });
  };

  //---------------------------------------
  // Watch for changes
  //---------------------------------------
  watch(selectedSensorIds, async () => {
    await fetchCapteurValues();
    drawChart();
  });

  // Watch for timespan changes
  watch(selectedTimespan, () => {
    drawChart();
  });

  return {
    machineName,
    sensors,
    selectedSensorIds,
    capteurValues,
    chartRef,
    selectedTimespan,
    timespanOptions,
    fetchMachineName,
    fetchSensors,
    fetchCapteurValues,
    drawChart,
    destroyChart,
  };
}