<script setup>
import TotalUserChef from '@/components/TotalUserChef.vue'
import TotalUserChefParc from '@/components/TotalUserChefParc.vue'
import TotalUserAS from '@/components/TotalUserAS.vue'
import TotalUserEtud from '@/components/TotalUserEtud.vue'
import TotalUserEns from '@/components/TotalUserEns.vue'
import EnsRH from '@/components/EnsRH.vue'
import { UserGroupIcon } from '@heroicons/vue/24/outline'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { onBeforeMount } from 'vue'
import { useEnseignant } from '@/stores/Enseignant'
import { useAgentscolarite } from '@/stores/Agentscolarite'
import { useUrl } from '@/stores/url'
import axios from 'axios'
import { useMessages } from '@/stores/messages'
import { ref } from 'vue'
import { useShow } from '@/stores/Show'
import { useUser } from '@/stores/User'

const enseignant = useEnseignant()
const agentscolarite = useAgentscolarite()
const messages = useMessages()
const URL = useUrl().url
const show = useShow()
const user = useUser()

onBeforeMount(() => {
  enseignant.getAllENS()
  agentscolarite.getAllAS()
})

function putNomEns(valeur, id) {
  let formData = {
    nomComplet_ens: valeur
  }
  putEns(formData, id)
}

function showdelete(id) {
  show.showDeleteusers = true
  user.user_id = id
  user.user_status = 'ENS'
}

function putEmailEns(valeur, id) {
  let formData = new FormData()
  formData.append('email', valeur)
  formData.append('_method', 'PUT')
  putUser(formData, id)
}

function putDateEns(valeur, id) {
  let formData = {
    date_recrutement_ens: valeur
  }
  putEns(formData, id)
}

function putNumberEns(valeur, id) {
  let formData = {
    telephone_ens: valeur
  }
  putEns(formData, id)
}

function disableUser(id) {
  let formData = new FormData()
  formData.append('validiter_compte', 'false')
  formData.append('_method', 'PUT')
  putUser(formData, id)
}

function ableUser(id) {
  let formData = new FormData()
  formData.append('validiter_compte', 'true')
  formData.append('_method', 'PUT')
  putUser(formData, id)
}

function putUser(formData, id) {
  axios
    .post(`${URL}/api/user/setuser/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      enseignant.getAllENS()
    })
    .catch((err) => {
      console.error(err)
      messages.messageError = 'Modification échoué !'
      setTimeout(() => {
        messages.messageError = ''
      }, 3000)
    })
}

function putEns(formData, id) {
  axios
    .put(`${URL}/api/enseignant/${id}`, formData)
    .then((response) => {
      enseignant.getAllENS()
    })
    .catch((err) => {
      console.error(err)
      messages.messageError = 'Modification échoué !'
      setTimeout(() => {
        messages.messageError = ''
      }, 3000)
    })
}
</script>

<template>
  <div class="max-h-[85vh] overflow-y-auto">
    <h1 class="titre font-bold">
      <UserGroupIcon class="h-7 w-7 mr-5" />
      Gestion RH
    </h1>
    <div class="head flex flex-wrap gap-4 justify-center">
      <TotalUserChef :nombre="enseignant.ListeChefMention.length" />
      <TotalUserChefParc :nombre="enseignant.ListeChefParcours.length" />
      <TotalUserEns :nombre="enseignant.ListeENS.length" />
      <TotalUserAS :nombre="agentscolarite.ListeAS.length" />
      <TotalUserEtud nombre="15" />
    </div>
    <div class="mt-4 focus:outline-none flex items-center justify-center gap-4">
      <Select>
        <SelectTrigger class="w-[250px] select-trigger">
          <SelectValue class="font-bold focus:outline-none" placeholder="Selectionner le rôle" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="blueberry"> Enseignant</SelectItem>
            <SelectItem value="grapes"> Agent de la scolarité </SelectItem>
            <SelectItem value="pineapple"> Etudiant </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div class="flex h-10 border">
        <p class="w-10 bg-blue-500 flex items-center justify-center">
          <font-awesome-icon
            class="text-white cursor-pointer w-5 h-4"
            :icon="['fas', 'magnifying-glass']"
          />
        </p>
        <input
          class="focus:outline-none px-2 w-[300px] animation focus:border focus:border-blue-500"
          placeholder="Rechercher ici"
          @input="enseignant.search(enseignant.searchalue)"
          v-model="enseignant.searchalue"
          type="text"
        />
      </div>
    </div>
    <EnsRH
      :enseignants="enseignant.ListeENS"
      :putNomEns="putNomEns"
      :putNumberEns="putNumberEns"
      :putEmailEns="putEmailEns"
      :putDateEns="putDateEns"
      :disableUser="disableUser"
      :ableUser="ableUser"
      :showdelete="showdelete"
    />
  </div>
</template>

<style scoped>
.titre {
  font-size: 26px;
  font-family: 'Montserrat', 'sans-serif';
  display: flex;
  align-items: center;
}

.select-trigger:focus {
  outline: none;
  box-shadow: none;
}
</style>
