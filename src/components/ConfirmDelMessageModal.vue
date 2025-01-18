<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-gray-900 backdrop-blur-sm bg-opacity-50"
  >
    <div
      :class="
        theme.theme === 'light'
          ? 'w-80 bg-white p-6 rounded-lg  text-center'
          : 'w-80 !bg-gray-600 p-6 rounded-lg !text-white  text-center'
      "
    >
      <h3 class="text-lg mb-10">{{ message }}</h3>
      <div class="flex justify-evenly">
        <button @click="confirm" class="bg-red-500 text-sm text-white px-4 py-2 rounded">
          Confirmer
        </button>
        <button @click="cancel" class="bg-yellow-500 text-sm text-white px-4 py-2 rounded">
          Annuler
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from '@/stores/Theme'

const theme = useTheme()

const props = defineProps({ show: Boolean, message: String })

const emit = defineEmits(['confirm', 'cancel'])

function confirm() {
  emit('confirm')
}

function cancel() {
  emit('cancel')
}
</script>
