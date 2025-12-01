import { ref } from "vue"
import { useRouter } from "vue-router"
import { useSnackbar } from "../snackbar/snackbar"
import useSpinner from "../spinner/spinner"
import axios from "axios"

export function useChangePassword() {
  const router = useRouter()
  const { show: showSnackbar } = useSnackbar()
  const { show, hide } = useSpinner()

  const previousPassword = ref("")
  const newPassword = ref("")
  const confirmPassword = ref("")

  const changePassword = async () => {
    if (!previousPassword.value || !newPassword.value || !confirmPassword.value) {
      showSnackbar("Please fill in all fields", "error")
      return
    }

    if (newPassword.value !== confirmPassword.value) {
      showSnackbar("New passwords do not match", "error")
      return
    }

    show()
    try {
      const token = localStorage.getItem("jwtToken")
      await axios.put(
        "/user/modifyPassword",
        {
          id : localStorage.getItem("selfId"),
          previousPassword: previousPassword.value,
          newPassword: newPassword.value
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      showSnackbar("Password changed successfully", "success")
      router.push({ name: "User" }) // redirect back to user page
    } catch (error: any) {
      showSnackbar(error.response?.data?.message || "Failed to change password", "error")
    } finally {
      hide()
    }
  }

  return {
    previousPassword,
    newPassword,
    confirmPassword,
    changePassword
  }
}
