import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUrl } from '@/stores/url'
import axios from 'axios'

export const useCategory = defineStore('Category', () => {
  const URL = useUrl().url
  const listCategorie = ref([])
  const listCategorieConge = ref([])


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

  function getAllCategorieConge() {
    axios
      .get(`${URL}/api/categorieconge`)
      .then((response) => {
        listCategorieConge.value = response.data
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return {
    listCategorie,
    listCategorieConge,
    getAllCategorie,
    getAllCategorieConge
  }
})
