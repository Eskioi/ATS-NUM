import { ref } from "vue"
import { useRouter } from "vue-router"
import { useSnackbar } from '../../snackbar/snackbar'
import useSpinner from '../../spinner/spinner'
import axios from "axios"

export function useAddMachine() {
  const router = useRouter()
  const machine = ref("")
  const { show: showSnackbar } = useSnackbar()
  const { show, hide } = useSpinner()

  const addMachine = async () => {
    show()
    try {
      await axios.post(
        "/machine/addMachine",
        { machine: machine.value },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      )

      showSnackbar("Machine added successfully", "success")
      setTimeout(() => router.push({ name: "Admin" }), 1000)
    } catch (error: any) {
      if (error.response) {
        showSnackbar(error.response.data?.message || "Failed to add machine", "error")
      } else {
        showSnackbar(error.message || "Something went wrong", "error")
      }
    } finally {
      hide()
    }
  }

  return {
    machine,
    addMachine,
  }
}
