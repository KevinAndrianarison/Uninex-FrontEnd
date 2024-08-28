<template>
  <div class="dashboard-container">
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
</script>

<style scoped src="../styles/Dashboard.css"></style>
