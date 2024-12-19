<template>
  <div class="flex justify-between body min-h-[85vh] max-h-[85vh]">
    <div v-if="showUserList" class="bg-white border border w-[30%] rounded-2xl p-4">
      <div class="flex items-center justify-between px-2">
        <h1 class="text-xl text-center font-bold">Discussions</h1>
        <Tooltip content="Créer un groupe">
          <font-awesome-icon
            class="iconadd text-yellow-500 cursor-pointer h-8 w-6"
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

      <div v-if="isSuspense">
        <div role="status" class="max-w-sm animate-pulse flex mt-4">
        <h3 class="h-10 bg-gray-300 rounded-3xl w-10 mb-4 mr-2"></h3>
        <div>
        <p class="h-3 bg-gray-300 rounded-lg w-20 w-60  mb-2.5"></p>
        <p class="h-3 bg-gray-300 rounded-lg w-20 w-40  mb-2.5"></p>
        </div>
      </div>
      <div role="status" class="max-w-sm animate-pulse flex mt-2">
        <h3 class="h-10 bg-gray-300 rounded-3xl w-10 mb-4 mr-2"></h3>
        <div>
        <p class="h-3 bg-gray-300 rounded-lg w-20 w-60  mb-2.5"></p>
        <p class="h-3 bg-gray-300 rounded-lg w-20 w-40  mb-2.5"></p>
        </div>
      </div>
      </div>

  <div v-if="!isSuspense" v-for="user in users" :key="user.id" @click="selectUser(user)">
  <div v-if="Users.user.id !== user.id" class="cursor-pointer mt-2 w-full flex hover:bg-gray-100 hover:rounded-3xl">
    <div :style="{ 'background-image': `url(${URL}/storage/users/${user.photo_name || 'depositphotos_35717211-stock-illustration-vector-user-icon-removebg-preview.png'})`, 'background-size': 'cover', 'background-position': 'center' }" class="logo w-[48px] h-[50px] rounded-3xl"></div>
    <div class="px-3 w-[80%] flex flex-col justify-center">
      <div class="flex justify-between items-center">
        <p>{{ user.email }}</p>
        <p class="text-gray-500 text-xs">{{ user.lastMessage ? user.lastMessage.timeAgo : '' }}</p>
      </div>
      <div 
        :class="{
          'text-gray-900 text-xs truncate': true, 
          'font-bold text-gray-900': user.lastMessage && user.lastMessage.receiver_id === localUserId,
          'italic': user.lastMessage && !user.lastMessage.message && user.lastMessage.fichierName && user.lastMessage.sender_id === localUserId,
          'italic font-bold text-gray-900': user.lastMessage && !user.lastMessage.message && user.lastMessage.fichierName && user.lastMessage.receiver_id === localUserId,
          'font-bold': !user.lastMessage || (!user.lastMessage.message && !user.lastMessage.fichierName)
        }"
        style="max-height: 1.5rem; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"
      >
        {{ user.lastMessage && user.lastMessage.message 
          ? (user.lastMessage.sender_id === localUserId 
              ? 'Vous : ' + user.lastMessage.message 
              : user.lastMessage.message)
          : (user.lastMessage && user.lastMessage.fichierName 
              ? (user.lastMessage.sender_id === localUserId 
                  ? '📎 Vous avez envoyé un fichier' 
                  : '📎 Vous avez reçu un fichier')
              : '✨ Démarrer la discussion') 
        }}
      </div>
    </div>
  </div>
</div>

    </div>
    <div v-if="!showUserList" class="bg-gray-100 border rounded-2xl w-[100%]">
      <div
        class="rounded-t-2xl bg-white border-b flex items-center pl-5 justify-between px-5 h-[8%]"
      >
    <div class="flex items-center">
    <font-awesome-icon @click="goBack" :icon="['fas', 'chevron-left']" class="cursor-pointer mr-4" /> 
        <div
          :style="{
            'background-image': `url(${URL}/storage/users/${
              selectedUser.photo_name ||
              'depositphotos_35717211-stock-illustration-vector-user-icon-removebg-preview.png'
            })`,
            'background-size': 'cover',
            'background-position': 'center'
          }"
          class="rounded-3xl logo w-[35px] h-[35px] mr-2 "
        >
      </div>
      </div>
        <p class="font-bold text-sm">{{ selectedUser.email }}</p>
        <div class="relative"> 
          <Tooltip content="Options"> 
          <font-awesome-icon class="iconadd text-blue-500 cursor-pointer h-6 w-4" :icon="['fas', 'bars-staggered']" @click="toggleDropdown" />
         </Tooltip>
          <div v-if="showDropdown" class="absolute right-0  mt-2 w-60 bg-white text-xs  rounded shadow-lg"> 
            <ul>
            <li  class="px-4 py-2 hover:bg-gray-100 font-bold cursor-pointer border-t border-l border-r"><font-awesome-icon  :icon="['fas', 'ban']" class="text-yellow-500 mr-2"  />Ne pas recevoir des messages</li>
            <li class="px-4 py-2 hover:bg-gray-100 font-bold cursor-pointer border-t border-l border-r border-b"><font-awesome-icon  :icon="['fas', 'trash']" class="text-red-500 mr-2"  />
              Supprimer la discussion</li> 
            </ul>
          </div> 
        </div>
      </div>
      <div class="h-[78%] max-h-[78%] overflow-y-auto bg-gray-100 px-5 chat-container">
        <div :key="index" v-for="(message, index) in messages">
          <div v-if="Number(message.sender_id) !== localUserId" class="w-[50%] mt-2 flex items-end">
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
                <p 
                v-if="isImageFile(message.fichierName)"
                :style="{
                      'background-image': `url(${URL}/storage/message/${message.fichierName})`,
                      'background-size': 'cover',
                      'background-position': 'center'
                        }" 
                class=" h-[20vh] my-2  bg-white"></p>
                <Tooltip content="Télecharger">
                <div v-if="message.fichierName" class="flex text-white items-center bg-green-500 text-xs rounded py-1 px-2 border" >
                {{ message.fichierName }}
                <font-awesome-icon
                 class="cursor-pointer text-yellow-500 ml-2"
                :icon="['fas', 'arrow-down']"
                @click.stop="telecharger(message.fichierName)"/>
                </div> </Tooltip>
              </p>
              <p class="text-xs text-gray-500">{{ message.timeAgo }}</p>
            </div>
          </div>
          <div
            v-if="Number(message.sender_id) === localUserId"
            class="w-[full] mt-2 flex justify-end items-end cursor-pointer"
            @click.stop="setIdMessage(message.id)"
          >
            <div class="w-[45%] mr-2">
              <p class="borderRadiusReverse bg-blue-500 text-white border p-3">
                {{ message.message }}
                <p 
                v-if="isImageFile(message.fichierName)"
                :style="{
                      'background-image': `url(${URL}/storage/message/${message.fichierName})`,
                      'background-size': 'cover',
                      'background-position': 'center'
                        }" 
                class=" h-[20vh] my-2  bg-white"></p>
                <Tooltip content="Télecharger">
                <div v-if="message.fichierName" class="flex  text-xs items-center bg-white text-gray-900 rounded py-1 px-2 border" >
                {{ message.fichierName }}
                <font-awesome-icon
                 class="cursor-pointer text-yellow-500 ml-2"
                :icon="['fas', 'arrow-down']"
                @click.stop="telecharger(message.fichierName)"/>
                </div>
                </Tooltip>
              </p>
              <p v-if="idMessage !== message.id" class="text-right text-xs text-gray-500">
                {{ message.timeAgo }}
              </p>
              <div v-if="idMessage === message.id" class="flex justify-end text-xs">
                <button
                  @click="deleteMessage(message.id)"
                  class="bg-red-500 px-3 py-1.5 text-white rounded"
                >
                  <font-awesome-icon
                    class="mr-2 text-white cursor-pointer"
                    :icon="['fas', 'trash']"
                  />Supprimer
                </button>
              </div>
            </div>
            <div
              :style="{
                'background-image': `url(${URL}/storage/users/${
                  Users.user.photo_name ||
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
      <div class="h-[12%] flex justify-between items-center py-10 px-3">
        <textarea
          v-model="newMessage"
          class="min-h-[60%] border focus:border-2 border-yellow-500 rounded-xl p-2 w-[90%] focus:outline-none"
          placeholder="Écrire ici..."
        ></textarea>
        <div class="relative inline-block">
          <Tooltip content="Joindre un fichier">
            <font-awesome-icon
              class="iconadd text-blue-500 hover:bg-gray-200 p-2 px-3 rounded-3xl cursor-pointer h-8 w-6"
              :icon="['fas', 'images']"
            />
          </Tooltip>
          <input
            type="file"
            accept="*"
            class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            @change="onFileChange"
          />
        </div>
        <Tooltip content="Envoyer">
          <font-awesome-icon
            :disabled="!newMessage || !file"
            class="iconadd text-blue-500 cursor-pointer hover:bg-gray-200 rounded-3xl p-2 px-3 h-6 w-5"
            :icon="['fas', 'paper-plane']"
            @click="sendMessage"
          />
        </Tooltip>
      </div>
      <div v-if="fileName" class="relative w-[90%] px-10 bottom-8 flex justify-end">
        <p class="border z-5 text-xs bg-blue-300 py-2 px-4 font-bold rounded-lg flex items-center">
          {{ fileName }}
          <font-awesome-icon
            @click="removeFile"
            class="ml-2 text-red-500 cursor-pointer"
            :icon="['fas', 'xmark']"
          />
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Tooltip from '../components/Tooltip.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Pusher from 'pusher-js'
import { useUrl } from '@/stores/url'

const showUserList = ref(true);
const URL = useUrl().url
const users = ref([])
const messages = ref([])
const file = ref(null)
const fileName = ref('')
const selectedUser = ref(null)
const idMessage = ref(null)
const newMessage = ref('')
const localUserId = ref(JSON.parse(localStorage.getItem('user')).user.id)
const userString = localStorage.getItem('user')
const Users = JSON.parse(userString)
let currentChannel = null
let currentPusher = null
const showDropdown = ref(false);
const isSuspense = ref(false)


function toggleDropdown() {
   showDropdown.value = !showDropdown.value; 
}

function fetchUsers() {
  isSuspense.value = true
  axios
    .get(`${URL}/api/users`)
    .then((response) => {
      const usersWithLastMessage = [];
      response.data.forEach((user) => {
        fetchLastMessage(user.id, function (lastMessage) {
          usersWithLastMessage.push({ ...user, lastMessage });
          if (usersWithLastMessage.length === response.data.length) {
            usersWithLastMessage.sort((a, b) => {
              const dateA = a.lastMessage ? new Date(a.lastMessage.created_at) : new Date(0);
              const dateB = b.lastMessage ? new Date(b.lastMessage.created_at) : new Date(0);
              return dateB - dateA;
            });
            users.value = usersWithLastMessage;  
            isSuspense.value = false          
            subscribeToPusher();
          }
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

function fetchLastMessage(userId, callback) {
  axios
    .get(`${URL}/api/last-message/${localUserId.value}/${userId}`)
    .then((response) => {
      const lastMessage = response.data || {};
      if (lastMessage.created_at) {
        lastMessage.timeAgo = timeAgo(new Date(lastMessage.created_at));
      }
      callback(lastMessage);
    })
    .catch((error) => {
      console.error(error);
      callback({});
    });
}


function subscribeToPusher() {
  const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER
  });

  users.value.forEach((user) => {
    const channelName = generateChannelName(localUserId.value, user.id);
    const channel = pusher.subscribe(channelName);

    channel.bind('message-sent', (data) => {
      if (user.id === data.sender_id || user.id === data.receiver_id) {
        user.lastMessage = data;
        users.value = [...users.value];
        users.value.sort((a, b) => {
          const dateA = a.lastMessage ? new Date(a.lastMessage.created_at) : new Date(0);
          const dateB = b.lastMessage ? new Date(b.lastMessage.created_at) : new Date(0);
          return dateB - dateA;
        });
      }
    });
  });
}


function telecharger(nom) {
  const url = `${URL}/api/messages/${nom}`
  const link = document.createElement('a')
  link.href = url
  link.download = nom
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function deleteMessage(id) {
  axios
    .delete(`${URL}/api/messages/${id}`)
    .then((response) => {
      idMessage.value = null
    })
    .catch((error) => {
      console.error(error)
    })
}

function setIdMessage(id) {
  if (idMessage.value === id) {
    idMessage.value = null
  } else {
    idMessage.value = id
  }
}

function updateTime() {
  messages.value.forEach((message) => {
    message.timeAgo = timeAgo(new Date(message.created_at))
  })
}

onMounted(() => {
  setInterval(updateTime, 30000)
  updateTime()
  fetchUsers()
})


function goBack() {
  selectedUser.value = null;
  showUserList.value = true;
  fetchUsers();
}


function selectUser(user) {
  if (window.currentChannel) {
    window.currentPusher.unsubscribe(window.currentChannel)
  }

  selectedUser.value = user
  axios
    .get(`${URL}/api/messages/${localUserId.value}/${user.id}`)
    .then((response) => {
      messages.value = response.data.reverse()
      updateTime()
      showUserList.value = false;
    })
    .catch((error) => {
      console.error(error)
    })

  const channelName = generateChannelName(localUserId.value, user.id)
  currentPusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER
  })

  currentChannel = currentPusher.subscribe(channelName)
  currentChannel.bind('message-sent', (data) => {
    messages.value.unshift(data)
  })
  currentChannel.bind('message-deleted', (data) => {
    messages.value = messages.value.filter((message) => message.id !== Number(data.message_id))
    
  })
  window.currentPusher = currentPusher
  window.currentChannel = channelName
}



function sendMessage() {
  let formData = new FormData();
  formData.append('sender_id', localUserId.value || '');
  formData.append('receiver_id', selectedUser.value.id || '');
  formData.append('fichier', file.value || '');
  formData.append('message', newMessage.value || '');
  newMessage.value = '';
  file.value = null;
  fileName.value = '';

  axios
    .post(`${URL}/api/send-message`, formData)
    .then((response) => {
      newMessage.value = '';
      file.value = null;
      fileName.value = '';
    })
    .catch((error) => {
      console.error( error);
    });
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

function isImageFile(fileName) {
  if(fileName){
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff', 'svg']
  const extension = fileName.split('.').pop().toLowerCase()
  return imageExtensions.includes(extension)
  }

}

function generateChannelName(userId1, userId2) {
  const userIds = [userId1, userId2].sort()
  return `Chat-${userIds.join('-')}`
}

function onFileChange(event) {
  file.value = event.target.files[0]
  fileName.value = event.target.files[0].name
}

function removeFile() {
  file.value = null
  fileName.value = ''
}
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
