<script lang="ts" setup>
import Spinner from "../spinner/spinner.vue"
import { useUser } from "./user.ts"

// Get the current user ID from localStorage
const selfID = localStorage.getItem("selfId") || ""
const { user, goToChangePassword } = useUser(selfID)
</script>

<template>
  <Spinner />

  <div v-if="user" class="w-full max-w-md p-6 space-y-6 bg-gray-800 rounded-lg mx-auto mt-8 shadow-lg">
    <h2 class="text-2xl font-bold text-center text-white">User Info</h2>
    
    <!-- Username -->
    <div class="bg-gray-700 p-3 rounded-md">
      <p class="text-sm text-gray-400">Username</p>
      <p class="text-white font-medium">{{ user.username }}</p>
    </div>

    <!-- Email -->
    <div class="bg-gray-700 p-3 rounded-md">
      <p class="text-sm text-gray-400">Email</p>
      <p class="text-white font-medium">{{ user.email }}</p>
    </div>

    <!-- Role -->
    <div class="bg-gray-700 p-3 rounded-md">
      <p class="text-sm text-gray-400">Role</p>
      <p class="text-white font-medium">{{ user.role }}</p>
    </div>

    <!-- Change Password Button -->
    <div class="mt-4">
      <button
        @click="goToChangePassword"
        class="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Change Password
      </button>
    </div>
  </div>
</template>
