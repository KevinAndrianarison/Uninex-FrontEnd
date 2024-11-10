import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUrl } from '@/stores/url'
import axios from 'axios'

export const useCom = defineStore('Com', () => {
  const listComs = ref([])
  const URL = useUrl().url

  function getAllComsByAnnonce(id) {
    axios
      .get(`${URL}/api/coms/annonce/${id}`)
      .then((response) => {
        listComs.value = response.data.reverse()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return {
    listComs,
    getAllComsByAnnonce
  }
})
