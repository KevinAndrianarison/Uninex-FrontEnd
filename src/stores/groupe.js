import { defineStore } from 'pinia'
import { ref, onMounted, computed } from 'vue'
import { useUrl } from '@/stores/url'
import axios from 'axios'
import { useShow } from './show'
import Pusher from 'pusher-js'

export const useGroupe = defineStore('Groupe', () => {
  const groupes = ref([])
  const isSuspense = ref(false)
  const showChatGroup = ref(false)
  const messages = ref([])
  const groupeId = ref(null)
  const idAdmin = ref(null)
  const groupeName = ref('')
  const groupeNameToPUT = ref('')
  const membres = ref([])
  const membresForAdmin = ref([])
  let currentChannel = null
  let currentPusher = null

  const URL = useUrl().url
  const show = useShow()

  function getgroupes(id) {
    isSuspense.value = true
    axios
      .get(`${URL}/api/users/${id}/groups`)
      .then((response) => {
        groupes.value = response.data
        isSuspense.value = false
      })
      .catch((err) => {
        console.error(err)
        isSuspense.value = false
      })
  }

  function getmessages(id) {
    if (window.currentChannel) {
      window.currentPusher.unsubscribe(window.currentChannel)
    }
    axios
      .get(`${URL}/api/groups/${id}/messages`)
      .then((response) => {
        messages.value = response.data.reverse()
        updateTime()
        show.showUserList = false
        showChatGroup.value = true
        currentPusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
          cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
          useTLS: true
        })
        currentChannel = currentPusher.subscribe(String(id))
        window.currentPusher = currentPusher
        window.currentChannel = id
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function updateTime() {
    messages.value.forEach((message) => {
      message.timeAgo = timeAgo(new Date(message.created_at))
    })
  }

  onMounted(() => {
    setInterval(updateTime, 30000)
    updateTime()
  })

  function timeAgo(date) {
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)
    const diffInMonths = Math.floor(diffInDays / 30)
    const diffInYears = Math.floor(diffInDays / 365)

    if (diffInSeconds < 60) {
      return `${diffInSeconds} s${diffInSeconds > 1 ? '' : ''}`
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} min${diffInMinutes > 1 ? '' : ''}`
    } else if (diffInHours < 24) {
      return `${diffInHours} h${diffInHours > 1 ? '' : ''}`
    } else if (diffInDays < 30) {
      return `${diffInDays} j${diffInDays > 1 ? '' : ''}`
    } else if (diffInMonths < 12) {
      return `${diffInMonths} mois`
    } else {
      return `${diffInYears} an${diffInYears > 1 ? '' : ''}`
    }
  }

  function getmembres() {
    show.showSpinner = true
    axios
      .get(`${URL}/api/groups/${groupeId.value}/users`)
      .then((response) => {
        membres.value = response.data.members
        show.showSetGroupMember = true
        show.showSpinner = false
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  function getmembresForAdmin() {
    show.showSpinner = true
    axios
      .get(`${URL}/api/groups/${groupeId.value}/users`)
      .then((response) => {
        membresForAdmin.value = response.data.members
        show.showSpinner = false
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  return {
    showChatGroup,
    groupes,
    isSuspense,
    messages,
    groupeId,
    groupeName,
    membres,
    membresForAdmin,
    groupeNameToPUT,
    idAdmin,
    getmembresForAdmin,
    getgroupes,
    getmessages,
    getmembres
  }
})
