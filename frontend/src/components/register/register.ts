import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import eventBus from '../../eventBus'
import useSpinner from '../spinner/spinner'
import { useSnackbar } from '../snackbar/snackbar'

export function useRegister() {
  const username = ref('')
  const email = ref('')
  const password = ref('')
  const errorMessage = ref('')
  const emailError = ref('')
  const router = useRouter()

  const { show: showSpinner, hide: hideSpinner } = useSpinner() // spinner functions
  const { show: showSnackbar } = useSnackbar() // snackbar functions

  // Email validation
  const validateEmail = (value: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    emailError.value = emailPattern.test(value) ? '' : 'Please enter a valid email address.'
  }

  // Handle registration
  const handleRegister = async () => {
    errorMessage.value = ''
    emailError.value = ''
    validateEmail(email.value)

    if (!username.value || !email.value || !password.value || emailError.value) {
      showSnackbar('Please fill all fields correctly.', 'error')
      return
    }

    showSpinner()

    const registerData = {
      username: username.value,
      email: email.value,
      password: password.value,
    }

    try {
      const response = await axios.post('/user/register', registerData, { withCredentials: true })
      const id = response.data.id

      if (response.status === 200 && id) {
        localStorage.setItem('selfId', id)
        eventBus.emit('login-success')
        showSnackbar('Registration successful!', 'success')
        await router.push({ name: 'Verify' })
      }
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Registration failed. Please try again."
      errorMessage.value = msg
      showSnackbar(msg, 'error')
    } finally {
      hideSpinner()
    }
  }

  return { username, email, password, errorMessage, emailError, handleRegister, validateEmail }
}
