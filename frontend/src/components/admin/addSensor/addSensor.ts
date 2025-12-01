import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useSnackbar } from '../../snackbar/snackbar'
import useSpinner from '../../spinner/spinner'
import axios from "axios"

export function useAddSensor() {
  const router = useRouter()
  const { show: showSnackbar } = useSnackbar()
  const { show, hide } = useSpinner()

  const machines = ref<{ id: string; machine: string }[]>([])
  const selectedMachineId = ref<string>("")
  const sensorName = ref("")
  const sensorUnit = ref("")

  // Fetch all machines for the selector
  const fetchMachines = async () => {
    show()
    try {
      const response = await axios.get("/machine/getAllMachines", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
        }
      })
      machines.value = response.data
      if (machines.value.length > 0 && machines.value[0] != null) {
        selectedMachineId.value = machines.value[0].id
        } else {
            selectedMachineId.value = ""
        }
    } catch (error: any) {
      showSnackbar(error.response?.data?.message || "Failed to fetch machines", "error")
    } finally {
      hide()
    }
  }

  onMounted(fetchMachines)

  const addSensor = async () => {
    if (!selectedMachineId.value || !sensorName.value || !sensorUnit.value) {
      showSnackbar("Please fill in all fields", "error")
      return
    }

    show()
    try {
      await axios.post(
        "/capteur/addCapteur",
        {
          machineId: selectedMachineId.value,
          nom: sensorName.value,
          unit: sensorUnit.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      )

      showSnackbar("Sensor added successfully", "success")
      setTimeout(() => router.push({ name: "Admin" }), 1000)
    } catch (error: any) {
      showSnackbar(error.response?.data?.message || "Failed to add sensor", "error")
    } finally {
      hide()
    }
  }

  return {
    machines,
    selectedMachineId,
    sensorName,
    sensorUnit,
    addSensor,
  }
}
