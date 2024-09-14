<script setup>
import { useMessages } from '@/stores/messages'
const messages = useMessages()
</script>

<template>
  <div class="alert">
    <Transition name="slide-fade">
      <div v-if="messages.messageSucces" class="alert-content success">
        <font-awesome-icon :icon="['fas', 'check-circle']" class="alert-icon" />
        <p>{{ messages.messageSucces }}</p>
      </div>
    </Transition>
    <Transition name="slide-fade">
      <div v-if="messages.messageError" class="alert-content danger">
        <font-awesome-icon :icon="['fas', 'exclamation-triangle']" class="alert-icon" />
        <p>{{ messages.messageError }}</p>
      </div>
    </Transition>
  </div>
</template>

<style scoped src="../styles/Alert.css"></style>
