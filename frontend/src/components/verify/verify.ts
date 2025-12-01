import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import eventBus from '../../eventBus'

export function useVerify() {
  const verificationCode = ref('')
  const errorMessage = ref('')
  const successMessage = ref('')
  const isLoading = ref(false)
  const isResending = ref(false)

  const router = useRouter()

  /** ✅ Handle verification submission */
  const handleVerify = async () => {
    errorMessage.value = ''
    successMessage.value = ''
    isLoading.value = true

    const selfId = localStorage.getItem('selfId')
    if (!selfId) {
      errorMessage.value = 'Utilisateur non trouvé. Veuillez vous reconnecter.'
      isLoading.value = false
      return
    }

    const payload = {
      id: Number(selfId),
      code: verificationCode.value,
    }

    try {
      const response = await axios.post('/user/verify', payload, { withCredentials: true })
      
      if (response.status === 200 && response.data.token) {
        successMessage.value = 'Vérification réussie ! Redirection en cours...';
        localStorage.setItem('jwtToken', response.data.token);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('username', response.data.username);
        eventBus.emit('login-success');
        eventBus.emit('fetch-machine-data');
        setTimeout(() => router.push({ name: 'Home' }), 1000);
      } else {
        errorMessage.value = 'Code de vérification invalide.'
      }
    } catch (error: any) {
      console.error('Verification error:', error)
      errorMessage.value =
        error.response?.data?.message || 'Erreur lors de la vérification.'
    } finally {
      isLoading.value = false
    }
  }

  /** 🔁 Resend verification code */
  const handleResend = async () => {
    errorMessage.value = ''
    successMessage.value = ''
    isResending.value = true

    const selfId = localStorage.getItem('selfId')
    if (!selfId) {
      errorMessage.value = 'Utilisateur non trouvé. Veuillez vous reconnecter.'
      isResending.value = false
      return
    }

    try {
      const response = await axios.post('/user/resend', { id: Number(selfId) }, { withCredentials: true })
      if (response.status === 200) {
        successMessage.value =
          'Un nouveau code de vérification a été envoyé à votre e-mail.'
      } else {
        errorMessage.value = 'Impossible de renvoyer le code. Veuillez réessayer.'
      }
    } catch (error: any) {
      console.error('Resend error:', error)
      errorMessage.value =
        error.response?.data?.message || 'Erreur lors de l’envoi du code.'
    } finally {
      isResending.value = false
    }
  }

  return {
    verificationCode,
    errorMessage,
    successMessage,
    isLoading,
    isResending,
    handleVerify,
    handleResend,
  }
}
