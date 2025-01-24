<script setup>
import TotalUserChef from '@/components/TotalUserChef.vue'
import TotalUserChefParc from '@/components/TotalUserChefParc.vue'
import TotalUserAS from '@/components/TotalUserAS.vue'
import TotalUserEtud from '@/components/TotalUserEtud.vue'
import TotalUserEns from '@/components/TotalUserEns.vue'
import EnsRH from '@/components/EnsRH.vue'
import AsRH from '@/components/AsRH.vue'
import EtudRH from '@/components/EtudRH.vue'
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
import { useEtudiant } from '@/stores/Etudiant'

const enseignant = useEnseignant()
const agentscolarite = useAgentscolarite()
const messages = useMessages()
const URL = useUrl().url
const show = useShow()
const user = useUser()
const etudiant = useEtudiant()

const roleSelected = ref('Enseignant')

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

function putNomAS(valeur, id) {
  let formData = {
    nomComplet_scol: valeur
  }
  putAS(formData, id)
}

function putNomEtud(valeur, id) {
  let formData = {
    nomComplet_etud: valeur
  }
  putEtud(formData, id)
}

function handleRoleSelection(valeur) {
  roleSelected.value = valeur
}

function showdelete(id) {
  show.showDeleteusers = true
  user.user_id = id
  user.user_status = 'ENS'
}

function showdeleteAS(id) {
  show.showDeleteusers = true
  user.user_id = id
  user.user_status = 'AS'
}

function showdeleteEtud(id) {
  show.showDeleteusers = true
  user.user_id = id
  user.user_status = 'Etudiant'
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

function putDateAS(valeur, id) {
  let formData = {
    date_recrutement_scol: valeur
  }
  putAS(formData, id)
}

function putNumberEns(valeur, id) {
  let formData = {
    telephone_ens: valeur
  }
  putEns(formData, id)
}

function putNumberAS(valeur, id) {
  let formData = {
    telephone_scol: valeur
  }
  putAS(formData, id)
}

function putNumberEtud(valeur, id) {
  let formData = {
    telephone_etud: valeur
  }
  putEtud(formData, id)
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
      if (roleSelected.value === 'Enseignant') {
        enseignant.getAllENS()
      }
      if (roleSelected.value === 'AS') {
        agentscolarite.getAllAS()
      }
      if (roleSelected.value === 'Etudiant') {
        etudiant.getEtudiantByIdAu()
      }
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

function putEtud(formData, id) {
  axios
    .put(`${URL}/api/etudiant/${id}`, formData)
    .then((response) => {
      etudiant.getEtudiantByIdAu()
    })
    .catch((err) => {
      console.error(err)
      messages.messageError = 'Modification échoué !'
      setTimeout(() => {
        messages.messageError = ''
      }, 3000)
    })
}

function putAS(formData, id) {
  axios
    .put(`${URL}/api/agentscolarite/${id}`, formData)
    .then((response) => {
      agentscolarite.getAllAS()
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
      <TotalUserEtud :nombre="etudiant.ListeEtudiantRH.length" />
    </div>
    <div class="mt-4 focus:outline-none flex items-center justify-center gap-4">
      <Select @update:modelValue="handleRoleSelection">
        <SelectTrigger class="w-[250px] select-trigger">
          <SelectValue class="font-bold focus:outline-none" placeholder="Selectionner le rôle" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Enseignant"> Enseignant</SelectItem>
            <SelectItem value="AS"> Agent de la scolarité </SelectItem>
            <SelectItem value="Etudiant"> Etudiant </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div v-if="roleSelected === 'Enseignant'" class="flex h-10 border">
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
      <div v-if="roleSelected === 'AS'" class="flex h-10 border">
        <p class="w-10 bg-blue-500 flex items-center justify-center">
          <font-awesome-icon
            class="text-white cursor-pointer w-5 h-4"
            :icon="['fas', 'magnifying-glass']"
          />
        </p>
        <input
          class="focus:outline-none px-2 w-[300px] animation focus:border focus:border-blue-500"
          placeholder="Rechercher ici"
          @input="agentscolarite.search(agentscolarite.searchalue)"
          v-model="agentscolarite.searchalue"
          type="text"
        />
      </div>
      <div v-if="roleSelected === 'Etudiant'" class="flex h-10 border">
        <p class="w-10 bg-blue-500 flex items-center justify-center">
          <font-awesome-icon
            class="text-white cursor-pointer w-5 h-4"
            :icon="['fas', 'magnifying-glass']"
          />
        </p>
        <input
          class="focus:outline-none px-2 w-[300px] animation focus:border focus:border-blue-500"
          placeholder="Rechercher ici"
          @input="etudiant.searchRH(etudiant.searchalueRH)"
          v-model="etudiant.searchalueRH"
          type="text"
        />
      </div>
    </div>
    <EnsRH
      v-if="roleSelected === 'Enseignant'"
      :enseignants="enseignant.ListeENS"
      :putNomEns="putNomEns"
      :putNumberEns="putNumberEns"
      :putEmailEns="putEmailEns"
      :putDateEns="putDateEns"
      :disableUser="disableUser"
      :ableUser="ableUser"
      :showdelete="showdelete"
    />
    <AsRH
      v-if="roleSelected === 'AS'"
      :agentscolarites="agentscolarite.ListeAS"
      :putNomAS="putNomAS"
      :putNumberAS="putNumberAS"
      :putEmailEns="putEmailEns"
      :putDateAS="putDateAS"
      :disableUser="disableUser"
      :ableUser="ableUser"
      :showdeleteAS="showdeleteAS"
    />
    <EtudRH
      v-if="roleSelected === 'Etudiant'"
      :etudiants="etudiant.ListeEtudiantRH"
      :putNomEtud="putNomEtud"
      :putNumberEtud="putNumberEtud"
      :putEmailEns="putEmailEns"
      :disableUser="disableUser"
      :ableUser="ableUser"
      :showdeleteEtud="showdeleteEtud"
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
