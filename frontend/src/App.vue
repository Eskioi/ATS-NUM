<script setup lang="ts">
import Navbar from './components/navbar/navbar.vue';
import Snackbar from './components/snackbar/snackbar.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-500 flex flex-col">
    <!-- Navbar at top -->
    <Navbar/>

    <!-- Main content container, fully centered -->
    <main class="flex flex-1 justify-center items-center">
      <!-- Inner wrapper to constrain width and center content -->
      <router-view />
    </main>

    <!-- Snackbar -->
    <Snackbar/>
  </div>
</template>

