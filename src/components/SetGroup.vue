<script setup>
import { useShow } from '@/stores/Show'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useGroupe } from '../stores/groupe'
import { ref } from 'vue'
import { useUrl } from '@/stores/url'
import axios from 'axios'
import { useTheme } from '@/stores/Theme'
import "emoji-picker-element"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import NProgress from 'nprogress';


const show = useShow()
const groupe = useGroupe()
const URL = useUrl().url
const theme = useTheme()


const showEmojiPicker = ref(false) 
let nomAdmin = ref('')
let nomGRPInput = ref('')


function closeSetgroup() {
  show.showSetGroup = false
  showEmojiPicker.value = false
}

function handleSelection(valeur){
  nomAdmin.value = valeur
  putAdmin(valeur)
}

function handleInputChange() {
  showEmojiPicker.value = false
}

function addEmoji(event) {
  const input = nomGRPInput.value;
  const emoji = event.detail.unicode;
  const start = input.selectionStart;
  const end = input.selectionEnd;
  groupe.groupeNameToPUT = groupe.groupeNameToPUT.substring(0, start) + emoji + groupe.groupeNameToPUT.substring(end);
  setTimeout(() => {
    input.selectionStart = input.selectionEnd = start + emoji.length;
    input.focus();
  }, 0);

}

function putAdmin(id) {
  let formData = {
    user_id: id
  }
  putGroupe(formData)
}

function toggleEmojiPicker() {
  showEmojiPicker.value = !showEmojiPicker.value
}


function putNomAdmin() {
  let formData = {
    name: groupe.groupeNameToPUT
  }
  putGroupe(formData)
}

function putGroupe(formData) {
NProgress.start(); 
  axios
    .put(`${URL}/api/putgroups/${groupe.groupeId}`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      groupe.groupeName = response.data.name
      groupe.groupeNameToPUT = response.data.name
      groupe.idAdmin = response.data.user_id
       NProgress.done()
    })
    .catch((error) => {
      console.error(error)
      NProgress.done()
    })
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showSetGroup">
      <div :class="theme.theme === 'light' ? 'formModal' : 'formModal !bg-gray-600 !text-white'">
        <div class="divbtn">
          <button type="button" class="Annullers" @click="closeSetgroup()">
            <XMarkIcon 
            :class="theme.theme === 'light' ? '' : '!text-red-500'"
            class="h-6 w-6" />
          </button>
        </div>
        <h1 class="font-bold">
          Modifier votre groupe
        </h1>
        <div class="relative" >
        <input
          type="text"
          placeholder="Nom du groupe"
          v-model="groupe.groupeNameToPUT"
          ref="nomGRPInput"
          @blur="putNomAdmin"
          @input="handleInputChange"
          :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
          class="text-black focus:outline-none border w-full mt-2 px-4 py-2 text-sm rounded focus:border-2 transition border-blue-500"
        />
        <Tooltip content="Emoji">
          <font-awesome-icon
            @click="toggleEmojiPicker"
            :class="theme.theme === 'light' ? 'text-gray-400 cursor-pointer' : 'text-gray-400 cursor-pointer'"
            :icon="['fas', 'smile']"
            class="absolute right-3 bottom-1 transform -translate-y-1/2"
          /></Tooltip>
          <div v-if="showEmojiPicker" class="emoji-picker-modal absolute top-full left-0 mt-2">
            <emoji-picker :class="theme.theme === 'light' ? 'light' : 'dark'" @emoji-click="addEmoji"></emoji-picker>
          </div>
        </div>
        <div class="flex flex-col">
          <label class="text-sm mt-4">
            <font-awesome-icon
            :class="theme.theme === 'light' ? '' : '!text-white'"
              class="text-gray-500 cursor-pointer mr-2"
              :icon="['fas', 'rotate']"
            />
            Changer l'administrateur du groupe :
          </label>
        <Select @update:modelValue="handleSelection">
        <SelectTrigger
          :class="theme.theme === 'light' ? '' : '!bg-gray-300 '"
          class="w-full mt-2 py-0 select-trigger"
          >
        <SelectValue class="focus:outline-none" placeholder="Séléctionnez ici" />
        </SelectTrigger>
        <SelectContent :class="theme.theme === 'light' ? '' : '!bg-gray-300'">
            <SelectGroup>
                    <SelectItem               
                    v-for="(membre, index) in groupe.membresForAdmin"
                    :key="membre.id"
                    :value="membre.id">{{ membre.email }}</SelectItem>
            </SelectGroup>
        </SelectContent>
        </Select>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css">

</style>
