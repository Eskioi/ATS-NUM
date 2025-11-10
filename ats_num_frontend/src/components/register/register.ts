import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import eventBus from '@/eventBus'

export function useRegister() {
  const username = ref('')
  const email = ref('')
  const password = ref('')
  const errorMessage = ref('')
  const router = useRouter()

  const handleRegister = async () => {
    errorMessage.value = ''

    const registerData = {
      username: username.value,
      email: email.value,
      password: password.value,
    }

    try {
      const response = await axios.post('/user/register', registerData, { withCredentials: true })
      const id = response.data.id

      if (response.status === 200 && id) {
        console.log('Registration successful:', response.data)
        localStorage.setItem('selfId', id)
        eventBus.emit('login-success')
        await router.push({ name: 'Verify' })
      }
    } catch (error: any) {
      console.error('Registration error:', error)
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage.value = error.response.data.message
      } else {
        errorMessage.value = "Erreur lors de l'inscription. Veuillez réessayer."
      }
    }
  }

  return { username, email, password, errorMessage, handleRegister }
}
