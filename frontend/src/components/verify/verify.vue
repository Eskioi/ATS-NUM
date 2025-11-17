<script lang="ts" setup>
import { useVerify } from './verify'

const {
  verificationCode,
  errorMessage,
  successMessage,
  isLoading,
  isResending,
  handleVerify,
  handleResend,
} = useVerify()
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-900">
    <div class="w-full max-w-md p-6 space-y-6 bg-gray-800 rounded-lg mx-auto">
      <h2 class="text-2xl font-bold text-center text-white">Vérification de compte</h2>

      <p class="text-center text-gray-300 text-sm">
        Entrez le code à 6 chiffres envoyé à votre e-mail.
      </p>

      <form @submit.prevent="handleVerify" class="space-y-4">
        <div>
          <label for="verificationCode" class="block text-sm font-medium text-white">
            Code de vérification
          </label>
          <input
            id="verificationCode"
            v-model="verificationCode"
            type="text"
            maxlength="6"
            placeholder="123456"
            class="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md bg-gray-700 text-white text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div v-if="errorMessage" class="text-red-400 text-sm text-center">{{ errorMessage }}</div>
        <div v-if="successMessage" class="text-green-500 text-sm text-center">{{ successMessage }}</div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {{ isLoading ? 'Vérification...' : 'Vérifier' }}
        </button>
      </form>

      <div class="text-center">
        <button
          @click="handleResend"
          :disabled="isResending"
          class="text-blue-300 hover:text-blue-500 disabled:opacity-50"
        >
          {{ isResending ? 'Envoi en cours...' : 'Renvoyer le code' }}
        </button>
      </div>
    </div>
  </div>
</template>