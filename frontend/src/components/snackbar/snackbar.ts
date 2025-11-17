import { ref } from 'vue'

export type SnackbarType = 'success' | 'error'

// Singleton state
const message = ref('')
const type = ref<SnackbarType>('success')
const isVisible = ref(false)
let timeoutId: number | null = null

export function useSnackbar() {
  const show = (msg: string, msgType: SnackbarType = 'success', duration = 3000) => {
    message.value = msg
    type.value = msgType
    isVisible.value = true

    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      isVisible.value = false
    }, duration)
  }

  const hide = () => {
    isVisible.value = false
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  return { message, type, isVisible, show, hide }
}

// Export the singleton state for direct use in components
export const snackbarState = { message, type, isVisible }
