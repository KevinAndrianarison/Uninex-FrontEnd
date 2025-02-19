import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUrl } from '@/stores/url'

export const useAcceuil = defineStore('Acceuil', () => {
  const listMention = ref([])
  const nomMention = ref('')
  const descrMention = ref('')
  const logoMention = ref(null)
  const logoMentionName = ref('')
  const photoAcceuil = ref({})

  const URL = useUrl().url

  function getAllMention() {
    axios
      .get(`${URL}/api/acceuilmention`)
      .then((response) => {
        listMention.value = response.data
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function postAcceuilPhoto() {
    let formData = {
      photoNameOne: null,
      photoNameTwo: null,
      photoNameThree: null
    }
    axios
      .post(`${URL}/api/acceuil`, formData)
      .then((response) => {
        getPhotoAcceuil()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function getPhotoAcceuil() {
    axios
      .get(`${URL}/api/acceuil`)
      .then((response) => {
        if (response.data.length !== 0) {
          photoAcceuil.value = response.data[0]
        }
        if (response.data.length === 0) {
          postAcceuilPhoto()
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return {
    listMention,
    nomMention,
    descrMention,
    logoMention,
    logoMentionName,
    photoAcceuil,
    getAllMention,
    getPhotoAcceuil
  }
})
