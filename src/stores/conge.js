import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUrl } from '@/stores/url'
import axios from 'axios'

export const useConge = defineStore('Conge', () => {
  const URL = useUrl().url
  const listConge = ref([])
  const oneConge = ref(null)
  const idUserStore = ref(null)


  function getAllCongepermission() {
    listConge.value = []
    const userString = localStorage.getItem('user')
    const user = JSON.parse(userString)
    axios
      .get(`${URL}/api/congepermissions/user/${user.user.id}`)
      .then((response) => {
        listConge.value = response.data
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function getAllCongepermissionById(id) {
    listConge.value = []
    axios
      .get(`${URL}/api/congepermissions/user/${id}`)
      .then((response) => {
        listConge.value = response.data
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return {
    listConge,
    oneConge,
    idUserStore,
    getAllCongepermission,
    getAllCongepermissionById
  }
})
