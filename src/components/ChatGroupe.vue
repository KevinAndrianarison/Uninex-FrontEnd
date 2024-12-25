<template>
  <div class="px-4 h-full">
    <div class="border h-full bg-white rounded-xl">
      <div class="h-[8%] border-b flex items-center justify-between px-4">
        <font-awesome-icon :icon="['fas', 'chevron-left']" class="cursor-pointer mr-4" />
        <p class="font-bold text-sm">
          <font-awesome-icon :icon="['fas', 'users']" class="text-gray-500 mr-2" />Groupe étudiant
        </p>
        <Tooltip content="Options">
          <font-awesome-icon
            class="iconadd text-blue-500 cursor-pointer h-6 w-4"
            :icon="['fas', 'bars-staggered']"
          />
        </Tooltip>
      </div>
      <div class="boder h-[78%] max-h-[78%] bg-gray-100 chat-container">
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
              </p>
            </div>
          </div>
          <div
            v-if="Number(message.user_id) === localUserId"
            class="w-[full] mt-2 flex justify-end items-end cursor-pointer"
          >
            <div class="w-[45%] mr-2">
              <p class="borderRadiusReverse bg-blue-500 text-white border p-3">
                {{ message.content }}
              </p>
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
      </div>
      <div class="h-[12%] flex justify-between items-center py-10 px-3 bg-gray-100">
        <textarea
          class="min-h-[50%] border focus:border-2 border-yellow-500 rounded-xl p-2 w-[90%] focus:outline-none"
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
          />
        </div>
        <Tooltip content="Envoyer">
          <font-awesome-icon
            class="iconadd text-blue-500 cursor-pointer hover:bg-gray-200 rounded-3xl p-2 px-3 h-6 w-5"
            :icon="['fas', 'paper-plane']"
          />
        </Tooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Tooltip from '../components/Tooltip.vue'
import { useUrl } from '@/stores/url'
import { useGroupe } from '../stores/groupe'

const localUserId = ref(JSON.parse(localStorage.getItem('user')).user.id)
const URL = useUrl().url
const groupe = useGroupe()
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
