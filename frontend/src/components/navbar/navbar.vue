<script lang="ts" setup>
import { HomeIcon, Menu, User } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { watch, ref } from 'vue'
import useNavbar from "./navbar";
import { isAdmin } from '../../auth/auth';

const route = useRoute();
const { state, toggleMenu, closeMenu, handleAuthAction, register, machines, goToAdmin } = useNavbar();
const username = ref(localStorage.getItem("username") || "");

// Track selected machine (UUID string)
const selectedMachineId = ref<string | null>(
  route.params.id?.toString() ?? null
)

// Close drawer & update highlight on route change
watch(route, () => {
  if (state.isMenuOpen) closeMenu()
  selectedMachineId.value = route.params.id?.toString() ?? null
})
</script>

<template>
  <nav class="bg-gray-800 shadow-md fixed w-full top-0 left-0 z-50">
    <!-- Top bar -->
    <div class="flex justify-between items-center px-6 h-16 relative">
      
      <!-- Home button -->
      <router-link
        to="/home"
        class="flex items-center text-gray-400 hover:bg-gray-800 rounded p-2 absolute left-6 
               top-1/2 transform -translate-y-1/2 z-50 transition-colors"
        @click="closeMenu"
      >
        <HomeIcon class="w-6 h-6" />
      </router-link>

      <!-- CENTER: Username + Profile Icon -->
      <div v-if="state.isLoggedIn" class="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-gray-300">
        <span class="font-medium">{{ username }}</span>

        <!-- Clickable User Icon -->
        <router-link
          to="/user"
          class="hover:text-white transition"
          @click="closeMenu"
        >
          <User class="w-6 h-6" />
        </router-link>
      </div>

      <!-- Burger button -->
      <button
        class="text-gray-400 p-2 rounded hover:bg-gray-800 transition-colors absolute right-6 
               top-1/2 transform -translate-y-1/2 z-50"
        @click="toggleMenu"
      >
        <Menu class="w-6 h-6" />
      </button>
    </div>

    <!-- Right-side sliding drawer -->
    <transition name="slide">
      <div
        v-if="state.isMenuOpen"
        class="fixed top-0 right-0 h-full w-64 bg-gray-800 shadow-xl z-40 flex flex-col 
               justify-between py-6 px-4 border-l border-gray-700"
      >
        <!-- Navigation Links -->
        <div class="mt-16 flex-1">
          <ul v-if="state.isLoggedIn" class="flex flex-col space-y-2 text-gray-300">

            <router-link
              v-for="m in machines"
              :key="m.id"
              :to="'/machine/' + m.id"
              class="block px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              :class="{
                'text-white': selectedMachineId === m.id,
                'text-gray-300': selectedMachineId !== m.id
              }"
              @click="() => { selectedMachineId = m.id; closeMenu() }"
            >
              {{ m.machine }}
            </router-link>

          </ul>
        </div>

        <!-- Auth buttons at bottom -->
        <div class="border-t border-gray-700 pt-4 flex flex-col items-center gap-2 w-full">

          <!-- ADMIN BUTTON -->
          <button
            v-if="isAdmin()"
            :class="[
              'w-full rounded px-4 py-2 font-medium mb-4 transition hover:bg-gray-700',
              route.path === '/admin' ? 'text-white' : 'text-gray-300'
            ]"
            @click="goToAdmin"
          >
            Admin
          </button>

          <!-- Logged-in state -->
          <button
            v-if="state.isLoggedIn"
            class="w-full bg-red-600 hover:bg-red-700 text-white rounded px-4 py-2 
                   font-medium transition"
            @click="handleAuthAction"
          >
            Logout
          </button>

          <!-- Logged-out state -->
          <div v-else class="flex w-full gap-2">
            <button
              v-if="route.name !== 'Login'"
              class="flex-1 bg-green-500 hover:bg-green-400 text-white rounded px-4 py-2 
                     font-medium transition"
              @click="handleAuthAction"
            >
              Login
            </button>

            <button
              v-if="route.name !== 'Register'"
              class="flex-1 bg-green-600 hover:bg-green-500 text-white rounded px-4 py-2 
                     font-medium transition"
              @click="register"
            >
              Register
            </button>

          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
/* Slide-in animation */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
