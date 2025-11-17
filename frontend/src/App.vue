<script setup lang="ts">
import Navbar from './components/navbar/navbar.vue';
import Snackbar from './components/snackbar/snackbar.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-500 pt-16">
    <!-- Navbar at top -->
    <Navbar/>

    <!-- Main content container, fully centered -->
    <main class="flex justify-center items-center w-full px-4 py-6 min-h-[calc(100vh-4rem)]">
      <!-- Inner wrapper to constrain width and center content -->
      <router-view />
    </main>

    <!-- Snackbar -->
    <Snackbar/>
  </div>
</template>

