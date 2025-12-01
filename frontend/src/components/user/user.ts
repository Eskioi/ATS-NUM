import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useSnackbar } from '../snackbar/snackbar'
import useSpinner from '../spinner/spinner'
import axios from "axios"

export function useUser(userId: string) {
  const router = useRouter()
  const { show: showSnackbar } = useSnackbar()
  const { show, hide } = useSpinner()

  // User object
  const user = ref<{
    username: string
    email: string
    password: string
    role: string
  } | null>(null)

  // Toggle for password visibility
  const showPassword = ref(false)

  // Fetch user data from backend
  const fetchUser = async () => {
    show()
    try {
      const token = localStorage.getItem("jwtToken")
      if (!token) {
        showSnackbar("You are not logged in", "error")
        return
      }

      const response = await axios.post(
        "/user/getUser",
        { id: userId }, // IdDTO
        { headers: { Authorization: `Bearer ${token}` } }
      )

      user.value = response.data
    } catch (error: any) {
      showSnackbar(error.response?.data?.message || "Failed to fetch user data", "error")
    } finally {
      hide()
    }
  }

  // Fetch on component mount
  onMounted(fetchUser)

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
  }

  // Navigate to change password page
  const goToChangePassword = () => {
    router.push({ name: "ChangePassword", params: { id: userId } })
  }

  return {
    user,
    showPassword,
    togglePasswordVisibility,
    goToChangePassword
  }
}
