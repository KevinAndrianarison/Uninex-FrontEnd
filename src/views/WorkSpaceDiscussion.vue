

<template>
  <div class="flex justify-between body min-h-[85vh] max-h-[85vh]">
    <div class="bg-white border border-2 w-[30%] rounded-2xl p-4">
      <div class="flex items-center justify-between px-2">
        <h1 class="text-xl text-center font-bold">Discussions</h1>
        <Tooltip content="Créer un groupe">
          <font-awesome-icon
            class="iconadd text-gray-800 cursor-pointer h-8 w-6"
            :icon="['fas', 'square-plus']"
            @click="createGroup()"
          />
        </Tooltip>
      </div>
      <input
        type="text"
        placeholder="Recherche"
        class="bg-gray-100 w-full mt-2 py-1 px-5 rounded-3xl focus:outline-none"
      />
      <div
        class="flex justify-between px-1.5 bg-gray-800 w-[90%] m-auto mt-2 py-1 rounded-3xl cursor-pointer"
      >
        <div class="text-white bg-gray-500 w-[45%] py-0.5 rounded-3xl text-center">Toutes</div>
        <div class="text-white w-[45%] text-center">Groupes</div>
      </div>
      <div
        class="mt-2 max-h-[80%] overflow-y-auto"
        v-for="user in users"
        :key="user.id"
        @click="selectUser(user)"
      >
        <div class="cursor-pointer mt-2 w-full flex hover:bg-gray-100 hover:rounded-3xl">
          <div
            :style="{
              'background-image': `url(${URL}/storage/users/${
                user.photo_name ||
                'depositphotos_35717211-stock-illustration-vector-user-icon-removebg-preview.png'
              })`,
              'background-size': 'cover',
              'background-position': 'center'
            }"
            class="logo w-[48px] h-[50px] rounded-3xl"
          ></div>
          <div class="px-3 w-[80%] flex flex-col justify-center">
            <div class="flex justify-between items-center">
              <p>{{ user.email }}</p>
              <p class="text-gray-500 text-xs">15h35</p>
            </div>
            <div class="text-gray-500 text-xs">Contenu du message</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedUser" class="bg-gray-100 border-2 rounded-2xl w-[65%]">
      <div
        class="rounded-t-2xl bg-white border-b flex items-center pl-5 justify-between px-5 h-[8%]"
      >
        <div
          :style="{
            'background-image': `url(${URL}/storage/users/${
              selectedUser.photo_name ||
              'depositphotos_35717211-stock-illustration-vector-user-icon-removebg-preview.png'
            })`,
            'background-size': 'cover',
            'background-position': 'center'
          }"
          class="rounded-3xl logo w-[35px] h-[35px] mr-2"
        ></div>
        <p class="font-bold text-sm">{{ selectedUser.email }}</p>
        <Tooltip content="Options">
          <font-awesome-icon
            class="iconadd text-gray-800 cursor-pointer h-6 w-4"
            :icon="['fas', 'bars-staggered']"
          />
        </Tooltip>
      </div>
      <div class="h-[80%] max-h-[80%] overflow-y-auto bg-gray-100 px-5 chat-container">
        <div :key="index" v-for="(message, index) in messages">
          <div v-if="message.sender_id !== localUserId" class="w-[50%] mt-2 flex items-end">
            <div
              :style="{
                'background-image': `url(${URL}/storage/users/${
                  selectedUser.photo_name ||
                  'depositphotos_35717211-stock-illustration-vector-user-icon-removebg-preview.png'
                })`,
                'background-size': 'cover',
                'background-position': 'center'
              }"
              class="rounded-3xl logo w-[50px] h-[50px] mr-2"
            ></div>
            <div class="w-[80%]">
              <p class="borderRadius bg-white border p-3">
                {{ message.message }}
              </p>
              <p class="text-xs text-gray-500">{{ message.timeAgo }}</p>
            </div>
          </div>
          <div
            v-if="message.sender_id === localUserId"
            class="w-[full] mt-2 flex justify-end items-end"
          >
            <div class="w-[45%] mr-2">
              <p class="borderRadiusReverse bg-white border p-3">
                {{ message.message }}
              </p>
              <p class="text-right text-xs text-gray-500">
                {{ message.timeAgo }}
              </p>
            </div>
            <div
              :style="{
                'background-image': `url(${URL}/storage/users/${
                  Users.photo_name ||
                  'depositphotos_35717211-stock-illustration-vector-user-icon-removebg-preview.png'
                })`,
                'background-size': 'cover',
                'background-position': 'center'
              }"
              class="rounded-3xl logo w-[50px] h-[50px]"
            ></div>
          </div>
        </div>
        <div v-if="messages.length === 0" class="h-full">
          <p class="text-gray-500 text-center py-1">
            Nouvelle discussion, commencer à envoyer des messages ✨!
          </p>
        </div>
      </div>
      <div class="h-[12%] flex justify-between items-center px-5">
        <input
          v-model="newMessage"
          class="h-[60%] border-2 rounded-3xl px-5 w-[90%] focus:outline-none"
          placeholder="Écrire ici..."
        />
        <Tooltip content="Joindre un fichier">
          <font-awesome-icon
            class="iconadd text-gray-500 cursor-pointer h-8 w-6"
            :icon="['fas', 'paperclip']"
          />
        </Tooltip>
        <Tooltip content="Envoyer">
          <font-awesome-icon
            class="iconadd text-gray-500 cursor-pointer h-6 w-5"
            :icon="['fas', 'paper-plane']"
            @click="sendMessage"
          />
        </Tooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
import Tooltip from '../components/Tooltip.vue'
import { ref, onBeforeMount, onMounted } from 'vue'
import axios from 'axios'
import Pusher from 'pusher-js'
import { useUrl } from '@/stores/url'

const URL = useUrl().url
const users = ref([])
const messages = ref([])
const notifications = ref({})
const selectedUser = ref(null)
const newMessage = ref('')
const localUserId = ref(JSON.parse(localStorage.getItem('user')).user.id)
const userString = localStorage.getItem('user')
const Users = JSON.parse(userString)

function fetchUsers() {
  axios
    .get(`${URL}/api/users`)
    .then((response) => {
      users.value = response.data
    })
    .catch((error) => {
      console.error(error)
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

function selectUser(user) {
  selectedUser.value = user
  notifications.value[user.id] = 0
  axios
    .get(`${URL}/api/messages/${localUserId.value}/${user.id}`)
    .then((response) => {
      messages.value = response.data.reverse()
      updateTime()
    })
    .catch((error) => {
      console.error(error)
    })
}

function getAllMessages(id) {
  axios
    .get(`${URL}/api/messages/${localUserId.value}/${id}`)
    .then((response) => {
      messages.value = response.data.reverse()
      updateTime()
    })
    .catch((error) => {
      console.error(error)
    })
}

function sendMessage() {
  const formData = {
    sender_id: localUserId.value,
    receiver_id: selectedUser.value.id,
    message: newMessage.value
  }

  axios
    .post(`${URL}/api/send-message`, formData)
    .then((response) => {
      newMessage.value = ''
      getAllMessages(response.data.receiver_id)
    })
    .catch((error) => {
      console.error(error)
    })
}

function timeAgo(date) {
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  const diffInMonths = Math.floor(diffInDays / 30)
  const diffInYears = Math.floor(diffInDays / 365)

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconde${diffInSeconds > 1 ? 's' : ''}`
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`
  } else if (diffInHours < 24) {
    return `${diffInHours} heure${diffInHours > 1 ? 's' : ''}`
  } else if (diffInDays < 30) {
    return `${diffInDays} jour${diffInDays > 1 ? 's' : ''}`
  } else if (diffInMonths < 12) {
    return `${diffInMonths} mois`
  } else {
    return `${diffInYears} an${diffInYears > 1 ? 's' : ''}`
  }
}

onBeforeMount(() => {
  fetchUsers()
  const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    encrypted: true
  })

  const channel = pusher.subscribe(`chat.${localUserId.value}`)
  
  channel.bind('MessageSent', (data) => {
    if (selectedUser.value && data.sender_id === selectedUser.value.id) {
      messages.value.push(data)
    } else {
      notifications.value[data.sender_id] = (notifications.value[data.sender_id] || 0) + 1
    }
  })
})
</script>

<style scoped>
.notification-badge {
  background-color: red;
  color: white;
  padding: 2px 6px;
  border-radius: 50%;
  font-size: 0.8rem;
  margin-left: 5px;
}

.borderRadius {
  border-radius: 20px 20px 20px 0;
}

.borderRadiusReverse {
  border-radius: 20px 20px 0px 20px;
}

.from-me {
  text-align: right;
  font-weight: bold;
  color: blue;
}

.chat-container {
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
  height: 100%;
}
</style>
