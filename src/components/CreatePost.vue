<script setup>
import { useShow } from '@/stores/Show'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const show = useShow()

function closeCreatePost() {
  show.showCreatePost = false
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showCreatePost">
      <div class="formModal">
        <div class="divbtn">
          <button type="button" class="Annullers" @click="closeCreatePost()">
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>
        <p class="infos">Créér une annonce :</p>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
