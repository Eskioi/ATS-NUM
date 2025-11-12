import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import eventBus from '../../eventBus'
import useSpinner from '../spinner/spinner.ts'

export function useLogin() {
  const email = ref('')
  const password = ref('')
  const errorMessage = ref('')
  const router = useRouter()

  const { show, hide } = useSpinner()

  const handleLogin = async () => {
    errorMessage.value = ''
    show() // show spinner before API call

    const loginData = {
      email: email.value,
      password: password.value,
    }

    try {
      const response = await axios.post('/user/login', loginData, { withCredentials: true });
      const token = response.data.jwtToken;
      const id = response.data.id;

      if (response.status === 200 && token) {
        console.log('Login successful:', response.data)
        localStorage.setItem('authKey', token)
        localStorage.setItem('selfId', id)
        eventBus.emit('login-success')
        await router.push({ name: 'Home' })
      } else {
        router.push({ name: 'Verify' })
      }
    } catch (error) {
      console.error('Login error:', error)
      errorMessage.value = 'Erreur lors de la connexion. Veuillez réessayer.'
    } finally {
      hide() // hide spinner after API call completes (success or error)
    }
  }

  return { email, password, errorMessage, handleLogin }
}
