import { ref } from 'vue'
import axios from 'axios'
import { Chart } from 'chart.js'
import type { ChartData, ChartOptions } from 'chart.js'
import 'chart.js/auto'
import 'chartjs-adapter-date-fns'

export interface Machine {
  id: string
  machine: string
}

export interface Capteur {
  id: string
  machineId: string
  nom: string
  unit: string
  typeData: string | null
}

export interface CapteurValue {
  id: string
  capteurId: string
  capteurValue: number
  dateTime: string
}

export interface CapteurValuesBySensor {
  sensorId: string
  values: CapteurValue[]
}

export function useHome() {
  const machines = ref<Machine[]>([])
  const sensors = ref<Capteur[]>([])
  const selectedMachineId = ref<string | null>(null)
  const selectedSensorIds = ref<string[]>([])
  const capteurValues = ref<CapteurValuesBySensor[]>([])
  const chartRef = ref<HTMLCanvasElement | null>(null)
  let chartInstance: Chart<'line', { x: Date; y: number }[], unknown> | null = null

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
  })

  /** Fetch all machines */
  const fetchMachines = async () => {
    try {
      const response = await axios.get<Machine[]>('/machine/getAllMachines', getAuthHeaders())
      machines.value = response.data
    } catch (err) {
      console.error('Failed to fetch machines', err)
    }
  }

  /** Fetch sensors for a given machine ID (wrap ID in object) */
  const fetchSensors = async (machineId: string) => {
    try {
      const response = await axios.post<Capteur[]>(
        '/capteur/getAllCapteursByMachineId',
        { id: machineId },
        getAuthHeaders()
      )
      sensors.value = response.data
    } catch (err) {
      console.error('Failed to fetch sensors', err)
    }
  }

  /** Fetch values for all selected sensors */
  const fetchCapteurValues = async () => {
    if (!selectedSensorIds.value.length) return
    capteurValues.value = []

    for (const sensorId of selectedSensorIds.value) {
      try {
        const response = await axios.post<CapteurValue[]>(
          '/capteurValue/getAllCapteurValuesByCapteurId',
          { id: sensorId },
          getAuthHeaders()
        )
        capteurValues.value.push({ sensorId, values: response.data })
      } catch (err) {
        console.error(`Failed to fetch values for sensor ${sensorId}`, err)
      }
    }
  }

  /** Destroy previous chart if exists */
  const destroyChart = () => {
    if (chartInstance) {
      chartInstance.destroy()
      chartInstance = null
    }
  }

  /** Generate random color for chart lines */
  const getRandomColor = (): string => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)]
    return color
  }

  /** Draw the chart with current sensor values */
  const drawChart = () => {
    if (!chartRef.value) return
    destroyChart()

    const datasets = capteurValues.value.map(sensorData => ({
      label: sensors.value.find(s => s.id === sensorData.sensorId)?.nom || 'Sensor',
      data: sensorData.values.map(v => ({ x: new Date(v.dateTime), y: v.capteurValue })),
      borderColor: getRandomColor(),
      backgroundColor: 'transparent'
    }))

    const data: ChartData<'line', { x: Date; y: number }[]> = { datasets }

    const options: ChartOptions<'line'> = {
      responsive: true,
      plugins: { legend: { position: 'top' } },
      scales: {
        x: {
          type: 'time',
          time: { unit: 'hour', tooltipFormat: 'HH:mm:ss' },
          title: { display: true, text: 'Time' }
        },
        y: { beginAtZero: true, title: { display: true, text: 'Value' } }
      }
    }

    chartInstance = new Chart(chartRef.value, {
      type: 'line',
      data,
      options
    })
  }

  return {
    machines,
    sensors,
    selectedMachineId,
    selectedSensorIds,
    capteurValues,
    chartRef,
    fetchMachines,
    fetchSensors,
    fetchCapteurValues,
    drawChart
  }
}
