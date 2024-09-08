import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useUrl } from '@/stores/url'
import { useShow } from '@/stores/Show'

export const useDirecteur = defineStore('Directeur', () => {
  const nomComplet_dir = ref('')
  const grade_dir = ref('')
  const telephone_dir = ref(null)
  const URL = useUrl().url
  const show = useShow()

  function getFirst() {
    axios
      .get(`${URL}/api/directeurs/getFirst`)
      .then((response) => {
        nomComplet_dir.value = response.data.nomComplet_dir
        grade_dir.value = response.data.grade_dir
        show.showListeEtudiantPdf = true
        setTimeout(() => {
          show.showListeEtudiantPdf = false
        }, 3000)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return {
    getFirst,
    nomComplet_dir,
    grade_dir,
    telephone_dir
  }
})
