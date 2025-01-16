<template>
  <div
    :class="
      theme.theme === 'light'
        ? 'dashboard-container'
        : 'dashboard-container  !bg-gray-600'
    "
  >
    <Header />
    <NavBar />
    <main class="main-content">
      <section>
        <RouterView />
      </section>
    </main>
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import Header from '../components/Header.vue'
import { RouterView } from 'vue-router'
import { useTheme } from '@/stores/Theme'

const theme = useTheme()
</script>

<style scoped src="../styles/Dashboard.css"></style>
