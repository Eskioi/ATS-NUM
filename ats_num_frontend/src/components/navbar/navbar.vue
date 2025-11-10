<script lang="ts" setup>
import useNavbar from "@/components/navbar/navbar.ts";

const { state, toggleMenu, closeMenu, handleAuthAction, register } = useNavbar();
</script>

<template>
  <nav class="bg-white shadow fixed w-full top-0 left-0 z-50">
    <div class="flex justify-between items-center p-2 md:p-4">
      <!-- Menu Button (Mobile) -->
      <button
        class="text-gray-800 text-2xl md:hidden"
        @click="toggleMenu"
      >
        ☰
      </button>

      <!-- Navigation Links -->
      <ul
        :class="[
          'flex flex-col md:flex-row gap-2 md:gap-4 absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow md:shadow-none transition-all',
          state.isMenuOpen ? 'flex' : 'hidden md:flex'
        ]"
      >
        <li><router-link class="block px-4 py-2 md:p-0 hover:text-blue-600" to="/" @click="closeMenu">Home</router-link></li>
        <li><router-link class="block px-4 py-2 md:p-0 hover:text-blue-600" to="/browseRequests" @click="closeMenu">Browse Requests</router-link></li>
        <li><router-link class="block px-4 py-2 md:p-0 hover:text-blue-600" to="/myRequests" @click="closeMenu">My Requests</router-link></li>
        <li><router-link class="block px-4 py-2 md:p-0 hover:text-blue-600" to="/rewards" @click="closeMenu">Rewards</router-link></li>
        <li><router-link class="block px-4 py-2 md:p-0 hover:text-blue-600" to="/faq" @click="closeMenu">FAQ</router-link></li>
        <li><router-link class="block px-4 py-2 md:p-0 hover:text-blue-600" to="/guide" @click="closeMenu">Guide</router-link></li>
      </ul>

      <!-- Login/Logout Button -->
      <button class="bg-blue-600 text-white rounded px-4 py-2 font-medium hover:bg-blue-700"
        @click="handleAuthAction">
        {{ state.isLoggedIn ? 'Logout' : 'Login' }}
      </button>
      <button v-if="!state.isLoggedIn" @click="register()"
        class="bg-blue-600 text-white rounded px-4 py-2 font-medium hover:bg-blue-700">
        Register
      </button>
    </div>
  </nav>
</template>
