import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import eventBus from '../../eventBus'
import useSpinner from '../spinner/spinner'
import { useSnackbar } from '../snackbar/snackbar'

export function useLogin() {
  const email = ref('')
  const password = ref('')
  const emailError = ref('')
  const router = useRouter()
  const { show: showSpinner, hide: hideSpinner } = useSpinner()
  const { show: showSnackbar } = useSnackbar()

  const validateEmail = (value: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    emailError.value = emailPattern.test(value)
      ? ''
      : 'Please enter a valid email address.'
  }

  const handleLogin = async () => {
    emailError.value = ''
    validateEmail(email.value)

    // Input validation
    if (!email.value || !password.value || emailError.value) {
      showSnackbar('Please fill all fields correctly.', 'error')
      return
    }

    showSpinner()

    try {
      const response = await axios.post(
        '/user/login',
        { email: email.value, password: password.value },
        { withCredentials: true }
      )

      const token = response.data.jwtToken
      const role = response.data.role
      const selfId = response.data.id
      const username = response.data.username

      if (response.status === 200 && token) {
        localStorage.setItem('jwtToken', token)
        localStorage.setItem('selfId', selfId)
        localStorage.setItem('role', role)
        localStorage.setItem('username', username)

        eventBus.emit('login-success')
        showSnackbar('Login successful!', 'success')

        await router.push({ name: 'Home' })
      } else {
        showSnackbar('Your account requires verification.', 'error')
        localStorage.setItem('selfId', response.data.id)
        await router.push({ name: 'Verify' })
      }
    } catch (error: any) {
      showSnackbar('Login failed. Please try again.', 'error')
    } finally {
      hideSpinner()
    }
  }

  return {
    email,
    password,
    emailError,
    handleLogin,
    validateEmail,
  }
}
