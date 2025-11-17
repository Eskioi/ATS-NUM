import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import eventBus from '../../eventBus'
import useSpinner from '../spinner/spinner'
import { useSnackbar } from '../snackbar/snackbar'

export function useLogin() {
  const email = ref('')
  const password = ref('')
  const errorMessage = ref('')
  const emailError = ref('')
  const router = useRouter()
  const { show, hide } = useSpinner()
  const { show: showSnackbar } = useSnackbar()

  const validateEmail = (value: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    emailError.value = emailPattern.test(value) ? '' : 'Please enter a valid email address.'
  }

  const handleLogin = async () => {
    errorMessage.value = ''
    emailError.value = ''
    validateEmail(email.value)

    if (!email.value || !password.value || emailError.value) {
      showSnackbar('Please fill all fields correctly.', 'error')
      return
    }

    show()
    try {
      const response = await axios.post('/user/login', { email: email.value, password: password.value }, { withCredentials: true })
      const token = response.data.jwtToken
      const id = response.data.id

      if (response.status === 200 && token) {
        localStorage.setItem('jwtToken', token)
        localStorage.setItem('selfId', id)
        eventBus.emit('login-success')
        showSnackbar('Login successful!', 'success')
        await router.push({ name: 'Home' })
      } else {
        showSnackbar('Login requires verification.', 'error')
        await router.push({ name: 'Verify' })
      }
    } catch (error) {
      errorMessage.value = 'Login failed. Please try again.'
      showSnackbar(errorMessage.value, 'error')
    } finally {
      hide()
    }
  }

  return { email, password, errorMessage, emailError, handleLogin, validateEmail }
}
