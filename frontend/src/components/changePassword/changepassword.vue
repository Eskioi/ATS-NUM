<script lang="ts" setup>
import Spinner from "../spinner/spinner.vue"
import { useChangePassword } from "./changePassword.ts"

const { previousPassword, newPassword, confirmPassword, changePassword } = useChangePassword()
</script>

<template>
  <Spinner />

  <div class="w-full max-w-md p-6 space-y-6 bg-gray-800 rounded-lg mx-auto mt-8">
    <h2 class="text-2xl font-bold text-center text-white">Change Password</h2>

    <form @submit.prevent="changePassword" class="space-y-4">
      <!-- Previous password -->
      <div>
        <label class="block text-sm font-medium text-white">Previous Password</label>
        <input
          type="password"
          v-model="previousPassword"
          placeholder="Enter previous password"
          class="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- New password -->
      <div>
        <label class="block text-sm font-medium text-white">New Password</label>
        <input
          type="password"
          v-model="newPassword"
          placeholder="Enter new password"
          class="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Confirm new password -->
      <div>
        <label class="block text-sm font-medium text-white">Confirm New Password</label>
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Confirm new password"
          class="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Submit button -->
      <button
        type="submit"
        class="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Change Password
      </button>
    </form>
  </div>
</template>
