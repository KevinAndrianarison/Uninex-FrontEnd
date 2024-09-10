import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useInfosheader = defineStore('Infosheader', () => {
  const status = ref('')
  const nom = ref('')
  const photo = ref('')

  return {
    status,
    nom,
    photo
  }
})
