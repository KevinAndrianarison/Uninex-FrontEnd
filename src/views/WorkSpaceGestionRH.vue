<script setup>
import TotalUserChef from '@/components/TotalUserChef.vue'
import TotalUserChefParc from '@/components/TotalUserChefParc.vue'
import TotalUserAS from '@/components/TotalUserAS.vue'
import TotalUserEtud from '@/components/TotalUserEtud.vue'
import TotalUserEns from '@/components/TotalUserEns.vue'
import Tooltip from '../components/Tooltip.vue'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
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

const enseignant = useEnseignant()
const agentscolarite = useAgentscolarite()
const messages = useMessages()
const URL = useUrl().url

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
  <Sheet> </Sheet>
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
          type="text"
        />
      </div>
      <Tooltip content="Filtrer">
        <font-awesome-icon
          class="cursor-pointer w-6 h-8 bg-gray-200 rounded-sm px-2"
          :icon="['fas', 'arrow-down-a-z']"
      /></Tooltip>
    </div>
    <div
      :key="index"
      v-for="(ens, index) in enseignant.ListeENS"
      class="border mt-4 flex h-24 bg-white rounded-lg items-center px-2"
    >
      <div class="w-[90%] flex gap-4 items-center">
        <div
          :style="{
            'background-image': 'url(' + `${URL}/storage/users/${ens.user.photo_name} ` + ')',
            'background-size': 'cover',
            'background-position': 'center'
          }"
          class="w-12 h-12 rounded-3xl"
        ></div>
        <div class="flex flex-col gap-2">
          <p class="font-bold">{{ ens.nomComplet_ens }}</p>
          <div class="flex gap-2">
            <p
              v-if="ens.chefMention_status === '1'"
              class="bg-blue-200 text-xs text-blue-600 font-bold text-center p-1 px-1.5 rounded-md"
            >
              Chef de mention
            </p>
            <p
              v-if="ens.chefParcours_status === '1'"
              class="bg-green-200 text-xs text-green-600 font-bold text-center p-1 px-1.5 rounded-md"
            >
              Chef de parcours
            </p>
            <p class="bg-gray-200 text-xs text-center font-bold p-1 px-1.5 rounded-md">
              Enseignant
            </p>
          </div>
        </div>
      </div>
      <div class="w-[10%] flex flex-col text-xs gap-1">
        <Sheet>
          <SheetTrigger as-child>
            <Button
              class="hover:bg-yellow-500 border-none bg-yellow-500 text-black font-bold rounded-sm"
              variant="outline"
              ><font-awesome-icon class="cursor-pointer mr-2" :icon="['fas', 'circle-info']" /> Voir
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle>Informations sur l'utilisateur</SheetTitle>
            <div class="flex items-center gap-4 mt-4">
              <div
                :style="{
                  'background-image': 'url(' + `${URL}/storage/users/${ens.user.photo_name} ` + ')',
                  'background-size': 'cover',
                  'background-position': 'center'
                }"
                class="w-12 h-12 rounded-3xl"
              ></div>
              <div>
                <p>{{ ens.nomComplet_ens }}</p>
                <div class="text-xs flex">
                  <p>Enseignant &nbsp;</p>
                  <p v-if="ens.chefParcours_status === '1'" class="text-green-600">
                    - Chef de parcours &nbsp;
                  </p>
                  <p v-if="ens.chefMention_status === '1'" class="text-blue-600">
                    - Chef de mention &nbsp;
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-4 flex flex-col gap-2">
              <div class="bg-gray-100 rounded-lg flex p-2 gap-2">
                <p class="w-8 flex items-center justify-center">
                  <font-awesome-icon class="cursor-pointer mr-2" :icon="['fas', 'user-pen']" />
                </p>
                <div>
                  <p class="text-gray-600">Nom complet</p>
                  <input
                    type="text"
                    v-model="ens.nomComplet_ens"
                    @blur="
                      (e) => {
                        putNomEns(e.target.value, ens.id)
                      }
                    "
                    @keydown.enter="
                      (e) => {
                        putNomEns(e.target.value, ens.id)
                      }
                    "
                    class="w-60 bg-gray-100 focus:outline-none py-1 text-sm"
                  />
                </div>
              </div>
              <div class="bg-gray-100 rounded-lg flex p-2 gap-2">
                <p class="w-8 flex items-center justify-center">
                  <font-awesome-icon class="cursor-pointer mr-2" :icon="['fas', 'phone']" />
                </p>
                <div>
                  <p class="text-gray-600">Télephone</p>
                  <input
                    type="number"
                    v-model="ens.telephone_ens"
                    @blur="
                      (e) => {
                        putNumberEns(e.target.value, ens.id)
                      }
                    "
                    @keydown.enter="
                      (e) => {
                        putNumberEns(e.target.value, ens.id)
                      }
                    "
                    class="w-60 bg-gray-100 focus:outline-none py-1 text-sm"
                  />
                </div>
              </div>
              <div class="bg-gray-100 rounded-lg flex p-2 gap-2">
                <p class="w-8 flex items-center justify-center">
                  <font-awesome-icon class="cursor-pointer mr-2" :icon="['fas', 'at']" />
                </p>
                <div>
                  <p class="text-gray-600">E-mail</p>
                  <input
                    type="text"
                    v-model="ens.user.email"
                    @blur="
                      (e) => {
                        putEmailEns(e.target.value, ens.user.id)
                      }
                    "
                    @keydown.enter="
                      (e) => {
                        putEmailEns(e.target.value, ens.id)
                      }
                    "
                    class="w-60 bg-gray-100 focus:outline-none py-1 text-sm"
                  />
                </div>
              </div>
              <div class="bg-gray-100 rounded-lg flex p-2 gap-2">
                <p class="w-8 flex items-center justify-center">
                  <font-awesome-icon class="cursor-pointer mr-2" :icon="['fas', 'calendar-day']" />
                </p>
                <div>
                  <p class="text-gray-600">Date de recrutement</p>
                  <input
                    type="date"
                    v-model="ens.date_recrutement_ens"
                    @input="
                      (e) => {
                        putDateEns(e.target.value, ens.id)
                      }
                    "
                    class="w-60 bg-gray-100 focus:outline-none py-1 text-sm"
                  />
                </div>
              </div>
            </div>
            <div class="bg-blue-100 mt-4 p-2 pb-4 rounded">
              <h1 class="font-bold flex items-center">
                <font-awesome-icon class="cursor-pointer mr-2" :icon="['fas', 'gear']" />Modifier
                (catégorie/grade)
              </h1>
              <div class="flex flex-col gap-2 mt-2">
                <Select>
                  <SelectTrigger class="w-full select-trigger">
                    <SelectValue class="focus:outline-none" placeholder="Nouvelle catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="blueberry"> Permanent</SelectItem>
                      <SelectItem value="grapes"> Vacataire </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger class="w-full select-trigger">
                    <SelectValue class="focus:outline-none" placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="blueberry"> Ingénieur</SelectItem>
                      <SelectItem value="grapes"> Docteur </SelectItem>
                      <SelectItem value="pineapple"> Professeur </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <button class="bg-yellow-500 py-2 rounded font-bold">Sauvegarder</button>
              </div>
            </div>
            <button
              v-if="ens.user.validiter_compte === 'true'"
              class="bg-red-500 mt-4 w-full py-2 rounded text-white flex justify-center items-center"
            >
              <font-awesome-icon class="cursor-pointer mr-2" :icon="['fas', 'ban']" />Désactiver ce
              compte
            </button>
            <button
              v-if="ens.user.validiter_compte !== 'true'"
              class="bg-white border border-yellow-500 mt-4 w-full py-2 rounded text-yellow-500 flex justify-center items-center"
            >
              <font-awesome-icon class="cursor-pointer mr-2" :icon="['fas', 'unlock']" />Re-activer
              le compte
            </button>
          </SheetContent>
        </Sheet>

        <button class="bg-red-500 text-white py-2 rounded-sm">
          <font-awesome-icon class="cursor-pointer mr-2" :icon="['fas', 'trash-can']" />Supprimer
        </button>
      </div>
    </div>
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
