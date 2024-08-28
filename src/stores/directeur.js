import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDirecteur = defineStore('Directeur', () => {
  const nomComplet_dir = ref('')
  const grade_dir = ref('')
  const telephone_dir = ref(null)

  return {
    nomComplet_dir,
    grade_dir,
    telephone_dir
  }
})
