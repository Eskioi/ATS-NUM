// Updated verify page using snackbar
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import eventBus from '../../eventBus'
import { useSnackbar } from '../snackbar/snackbar'

export function useVerify() {
  const verificationCode = ref('')
  const isLoading = ref(false)
  const isResending = ref(false)

  const router = useRouter()
  const { show } = useSnackbar()

  const handleVerify = async () => {
    isLoading.value = true

    const selfId = localStorage.getItem('selfId')
    if (!selfId) {
      show('User not found. Veuillez réessayer.', 'error')
      isLoading.value = false
      return
    }

    const payload = {
      id: selfId,
      code: verificationCode.value,
    }

    try {
      const response = await axios.post('/user/verify', payload, { withCredentials: true })

      if (response.status === 200 && response.data.token) {
        show('Verification successful !', 'success')
        localStorage.setItem('jwtToken', response.data.token)
        localStorage.setItem('role', response.data.role)
        localStorage.setItem('username', response.data.username)
        eventBus.emit('login-success')
        setTimeout(() => router.push({ name: 'Home' }), 1000)
      } else {
        show('Verification failed. Vérifiez votre code.', 'error')
      }
    } catch (error: any) {
      console.error('Verification error:', error)
      show(error.response?.data?.message || 'Error during verification.', 'error')
    } finally {
      isLoading.value = false
    }
  }

  const handleResend = async () => {
    isResending.value = true

    const selfId = localStorage.getItem('selfId')
    if (!selfId) {
      show('User not found. Veuillez réessayer.', 'error')
      isResending.value = false
      return
    }

    try {
      const response = await axios.post('/user/resend', { id: Number(selfId) }, { withCredentials: true })
      if (response.status === 200) {
        show('A new verification code has been sent à votre e-mail.', 'success')
      } else {
        show('Error during r\'envoi du code.', 'error')
      }
    } catch (error: any) {
      console.error('Resend error:', error)
      show(error.response?.data?.message || 'Error during r\'envoi du code.', 'error')
    } finally {
      isResending.value = false
    }
  }

  return {
    verificationCode,
    isLoading,
    isResending,
    handleVerify,
    handleResend,
  }
}
