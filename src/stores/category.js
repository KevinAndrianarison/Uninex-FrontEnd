import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUrl } from '@/stores/url'
import axios from 'axios'

export const useCategory = defineStore('Category', () => {
  const URL = useUrl().url
  const listCategorie = ref([])

  function getAllCategorie() {
    axios
      .get(`${URL}/api/categoris`)
      .then((response) => {
        listCategorie.value = response.data
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return {
    listCategorie,
    getAllCategorie
  }
})
