import { useRouter } from "vue-router"

export function useAdmin() {
  const router = useRouter()

  const goToAddMachine = () => {
    router.push({ name: "AddMachine" })
  }

  const goToAddSensor = () => {
    router.push({ name: "AddSensor" })
  }

  const goToAddSensorData = () => {
    router.push({ name: "AddSensorData" })
  }

  return {
    goToAddMachine,
    goToAddSensor,
    goToAddSensorData,
  }
}
