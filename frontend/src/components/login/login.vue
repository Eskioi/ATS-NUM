<script lang="ts" setup>
import { useLogin } from './login.ts'
import Spinner from '../spinner/spinner.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { email, password, errorMessage, emailError, handleLogin, validateEmail } = useLogin()

const goToRegister = () => {
  router.push({ name: 'Register' })
}
</script>

<template>
  <Spinner />
    <div class="w-full max-w-md p-6 space-y-6 bg-gray-800 rounded-lg">
      <h2 class="text-2xl font-bold text-center text-white">Login</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-white">Email</label>
          <input
            id="email"
            v-model="email"
            @input="validateEmail(email)"
            type="text"
            placeholder="Enter email"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p v-if="emailError" class="text-red-400 text-sm mt-1">{{ emailError }}</p>
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-white">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter password"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Backend error -->
        <div v-if="errorMessage" class="text-red-400 text-sm">{{ errorMessage }}</div>

        <!-- Submit button -->
        <button
          type="submit"
          class="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </button>
      </form>

      <!-- Register link -->
      <div class="text-center text-sm text-white">
        No account?
        <button
          @click="goToRegister"
          class="text-blue-300 hover:text-blue-500 font-medium transition-colors"
        >
          Register here
        </button>
      </div>
    </div>
</template>

