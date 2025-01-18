<template>
  <div class="px-4 h-full">
    <div @click="hideDropdown" 
    :class="theme.theme === 'light' ? '' : '!bg-gray-200'" 
    class="border h-full bg-gray-100 rounded-xl"
    >
      <div 
      :class="theme.theme === 'light' ? '' : '!bg-gray-300'" 
      class="h-[8%] border-b bg-white rounded-t-xl flex items-center justify-between px-4"
      >
        <font-awesome-icon
          :icon="['fas', 'chevron-left']"
          @click="goBack"
          class="cursor-pointer mr-4"
        />
        <p class="font-bold text-sm">
          <font-awesome-icon :icon="['fas', 'users']" class="text-gray-500 mr-2" />{{
            groupe.groupeName
          }}
        </p>
        <div>
          <Tooltip content="Options">
            <font-awesome-icon
              class="iconadd text-blue-500 cursor-pointer h-6 w-4"
              :icon="['fas', 'bars-staggered']"
              @click.stop="toggleDropdown"
          /></Tooltip>
          <div
            v-if="showDropdown"
            :class="theme.theme === 'light' ? '' : '!bg-gray-300'" 
            class="text-xs border absolute bg-white border shadow-lg mt-2 w-48 right-5"
          >
            <ul>
              <li
                v-if="groupe.idAdmin === localUserId"
                @click="setMembers"
                class="px-4 border py-2 cursor-pointer"
              >
                <font-awesome-icon
                  class="iconadd text-yellow-500 cursor-pointer mr-2"
                  :icon="['fas', 'user-gear']"
                />
                Gérer les membres
              </li>
              <li
                v-if="groupe.idAdmin === localUserId"
                @click="setGroup"
                class="px-4 border py-2 cursor-pointer"
              >
                <font-awesome-icon class="iconadd cursor-pointer mr-2" :icon="['fas', 'gear']" />
                Modifier le groupe
              </li>
              <li
                v-if="groupe.idAdmin === localUserId"
                @click="deleteGroupe"
                class="px-4 border py-2 cursor-pointer"
              >
                <font-awesome-icon
                  class="iconadd text-red-500 cursor-pointer mr-2"
                  :icon="['fas', 'trash']"
                />
                Supprimer le groupe
              </li>
              <li @click="QuitterGroupe()" class="px-4 border py-2 cursor-pointer">
                <font-awesome-icon
                  class="iconadd cursor-pointer mr-2"
                  :icon="['fas', 'right-from-bracket']"
                />
                Quitter le groupe
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div 
      :class="theme.theme === 'light' ? '' : '!bg-gray-200'" 
      class="boder h-[78%] max-h-[78%] bg-gray-100 chat-container px-4">
        <div :key="index" v-for="(message, index) in groupe.messages">
          <div v-if="Number(message.user_id) !== localUserId" class="w-[50%] mt-2 flex items-end">
            <div
              :style="{
                'background-image': `url(${URL}/storage/users/${
                  message.user.photo_name ||
                  'depositphotos_35717211-stock-illustration-vector-user-icon-removebg-preview.png'
                })`,
                'background-size': 'cover',
                'background-position': 'center'
              }"
              class="rounded-3xl logo w-[50px] h-[50px] mr-2"
            ></div>
            <div class="w-[80%]">
              <p class="borderRadius bg-white border p-3">
                {{ message.content }}
                <p 
                v-if="isImageFile(message.fichierName)"
                :style="{
                      'background-image': `url(${URL}/storage/messageGroup/${message.fichierName})`,
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
            v-if="Number(message.user_id) === localUserId"
            @click.stop="setIdMessage(message.id)"
            class="w-[full] mt-2 flex justify-end items-end cursor-pointer"
          >
            <div class="w-[45%] mr-2">
              <p class="borderRadiusReverse bg-blue-500 text-white border p-3">
                {{ message.content }}
                <p 
                v-if="isImageFile(message.fichierName)"
                :style="{
                      'background-image': `url(${URL}/storage/messageGroup/${message.fichierName})`,
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
              <p class="text-xs text-gray-500">{{ message.timeAgo }}</p>
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
                  message.user.photo_name ||
                  'depositphotos_35717211-stock-illustration-vector-user-icon-removebg-preview.png'
                })`,
                'background-size': 'cover',
                'background-position': 'center'
              }"
              class="rounded-3xl logo w-[50px] h-[50px]"
            ></div>
          </div>
        </div>
        <p v-if="groupe.messages.length === 0" class="text-gray-500 text-center py-1 h-full">
          Nouvelle discussion, commencer à envoyer des messages ✨!
        </p>
      </div>
      <div 
      :class="theme.theme === 'light' ? '' : '!bg-gray-200'" 
      class="h-[12%] flex justify-between items-center py-10 px-3 rounded-b-xl bg-gray-100">
        <textarea
          class="min-h-[50%] border focus:border-2 border-yellow-500 rounded-xl p-2 w-[90%] focus:outline-none"
          placeholder="Écrire ici..."
          v-model="messageSend"
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
            class="iconadd text-blue-500 cursor-pointer hover:bg-gray-200 rounded-3xl p-2 px-3 h-6 w-5"
            :disabled="!messageSend"
            :icon="['fas', 'paper-plane']"
            @click="sendMessage()"
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
import { ref } from 'vue'
import Tooltip from '../components/Tooltip.vue'
import { useUrl } from '@/stores/url'
import { useGroupe } from '../stores/groupe'
import { useShow } from '../stores/show'
import { useUser } from '@/stores/User'
import axios from 'axios'
import Pusher from 'pusher-js'
import { useTheme } from '@/stores/Theme'




const localUserId = ref(JSON.parse(localStorage.getItem('user')).user.id)
const file = ref(null)
const showDropdown = ref(false)
const fileName = ref('')
const messageSend = ref('')
const idMessage = ref(null)


const URL = useUrl().url
const groupe = useGroupe()
const show = useShow()
const user = useUser()
const theme = useTheme()
const pusher = new Pusher(
  import.meta.env.VITE_PUSHER_APP_KEY,
 { cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER, useTLS: true }
)
let channel = pusher.subscribe(String(groupe.groupeId))
channel.bind('message-sent', (data) => { 
  groupe.messages.unshift(mergeUserIntoMessage(data).message)
})
channel.bind('message-deleted', (data) => {
  const index = groupe.messages.findIndex((message) => message.id === Number(data.messageId));
  if (index !== -1) {
    groupe.messages.splice(index, 1);
  }
});



function mergeUserIntoMessage(data) {
    if (data.message && data.user) {
        data.message.user = data.user;
        delete data.user;
    }
    return data;
}

function sendMessage() {
  const userString = localStorage.getItem('user')
  const user = JSON.parse(userString)
  let formData = new FormData()
  formData.append('user_id', Number(user.user.id) || '')
  formData.append('content', messageSend.value || '')
  formData.append('fichier', file.value || '')

  messageSend.value = ''
  file.value = null
  fileName.value = ''
  axios
    .post(`${URL}/api/groups/${groupe.groupeId}/messages`, formData)
    .then((response) => {
    })
    .catch((error) => {
      console.error(error)
    })
}

function isImageFile(fileName) {
  if (fileName) {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff', 'svg']
    const extension = fileName.split('.').pop().toLowerCase()
    return imageExtensions.includes(extension)
  }
}

function deleteMessage(id){
  axios
    .delete(`${URL}/api/groups/${groupe.groupeId}/messages/${id}`)
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
function telecharger(nom) {
  const url = `${URL}/api/messageGroup/${nom}`
  const link = document.createElement('a')
  link.href = url
  link.download = nom
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function goBack() {
  const userString = localStorage.getItem('user')
  const user = JSON.parse(userString)
  groupe.getgroupes(user.user.id)
  groupe.showChatGroup = false
  show.showUserList = true
}

function setMembers() {
  user.getAlluser()
  groupe.getmembres()
}

function setGroup() {
  groupe.getmembresForAdmin()
  show.showSetGroup = true
}

function QuitterGroupe() {
  show.showQuitGroup = true
}

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

function hideDropdown() {
  showDropdown.value = false
}

function onFileChange(event) {
  file.value = event.target.files[0]
  fileName.value = event.target.files[0].name
}

function removeFile() {
  file.value = null
  fileName.value = ''
}

function deleteGroupe() {
  show.showDeleteGroup = true
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
