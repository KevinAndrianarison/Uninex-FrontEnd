<template>
  <div class="home">
    <div class="left">
      <div class="logo"></div>
      <div class="text">
        <h1>UniNex</h1>
        <p class="bienvenue">
          Bienvenue sur UniNex, votre solution complète pour la gestion efficace et intégrée de
          votre établissement universitaire.
        </p>
        <p class="fonctionnalite">
          ✅ Inscriptions en Ligne, Gestion Pédagogique, Planification des Cours, Gestion des
          Examens et des Notes, Gestion Financière, Gestion des Ressources Humaines et Communication
          Interne.
        </p>
      </div>
      <div class="btn">
        <button @click="testAnimation()">Commencer 🚀</button>
      </div>
    </div>
    <div class="right">
      <div class="image"></div>
    </div>
  </div>
</template>

<script setup>
import { useShow } from '@/stores/Show'
const show = useShow()

function testAnimation() {
  show.showFirstConfig = true
  show.showHome = false
}
</script>

<style scoped src="../styles/Home.css"></style>
