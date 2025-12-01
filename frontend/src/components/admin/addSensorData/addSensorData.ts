import { ref, onMounted, watch } from "vue"
import { useRouter } from "vue-router"
import { useSnackbar } from '../../snackbar/snackbar'
import useSpinner from '../../spinner/spinner'
import axios from "axios"

export function useAddSensorData() {
  const router = useRouter()
  const { show: showSnackbar } = useSnackbar()
  const { show, hide } = useSpinner()

  const machines = ref<{ id: string; machine: string }[]>([])
  const selectedMachineId = ref<string>("")
  const sensors = ref<{ id: string; nom: string; unit: string }[]>([])
  const selectedSensorId = ref<string>("")
  const sensorValue = ref<number | null>(null)
  const dateTime = ref<string>("") // ISO datetime string

  // Fetch machines on mount
  const fetchMachines = async () => {
    show()
    try {
      const response = await axios.get("/machine/getAllMachines", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` }
      })
      machines.value = response.data
      selectedMachineId.value = machines.value[0]?.id || ""
    } catch (error: any) {
      showSnackbar(error.response?.data?.message || "Failed to fetch machines", "error")
    } finally {
      hide()
    }
  }

  onMounted(fetchMachines)

  // Fetch sensors when selectedMachineId changes
  const fetchSensors = async (machineId: string) => {
    if (!machineId) {
      sensors.value = []
      selectedSensorId.value = ""
      return
    }
    show()
    try {
      const response = await axios.post("/capteur/getAllCapteursByMachineId", { id: machineId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` }
      })
      sensors.value = response.data
      selectedSensorId.value = sensors.value[0]?.id || ""
    } catch (error: any) {
      showSnackbar(error.response?.data?.message || "Failed to fetch sensors", "error")
    } finally {
      hide()
    }
  }

  watch(selectedMachineId, (newId) => {
    fetchSensors(newId)
  })

  // Submit sensor value
  const addSensorData = async () => {
    if (!selectedSensorId.value || sensorValue.value === null || !dateTime.value) {
      showSnackbar("Please fill in all fields", "error")
      return
    }

    show()
    try {
      await axios.post("/capteurValue/addCapteurValue",
        {
          capteurId: selectedSensorId.value,
          value: sensorValue.value,
          dateTime: dateTime.value
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
          }
        }
      )
      showSnackbar("Sensor value added successfully", "success")
      setTimeout(() => router.push({ name: "Admin" }), 1000)
    } catch (error: any) {
      showSnackbar(error.response?.data?.message || "Failed to add sensor value", "error")
    } finally {
      hide()
    }
  }

  return {
    machines,
    selectedMachineId,
    sensors,
    selectedSensorId,
    sensorValue,
    dateTime,
    addSensorData
  }
}
