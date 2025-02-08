import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useInfossetup = defineStore('Infossetup', () => {
  const grade = ref('')
  const nom = ref('')
  const telephone = ref(null)
  

  return {
    grade,
    nom,
    telephone
  }
})
