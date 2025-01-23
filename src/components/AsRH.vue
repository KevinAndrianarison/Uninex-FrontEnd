<script setup>
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useUrl } from '@/stores/url'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import axios from 'axios'
import { useMessages } from '@/stores/messages'
import { ref } from 'vue'
import { useAgentscolarite } from '@/stores/Agentscolarite'

const idAS = ref('')

const URL = useUrl().url
const messages = useMessages()
const agentscolarite = useAgentscolarite()

function handleCtgSelection(valeur) {
  let formData = {
    categorie_scol: valeur
  }
  putAS(formData, idAS.value)
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

defineProps({
  agentscolarites: {
    type: Array,
    default: () => []
  },
  putNomAS: Function,
  putNumberAS: Function,
  putEmailEns: Function,
  putDateAS: Function,
  disableUser: Function,
  ableUser: Function,
  showdeleteAS: Function
})
</script>

<template>
  <div
    :key="index"
    v-for="(agent, index) in agentscolarites"
    class="border mt-4 flex h-24 bg-white rounded-lg items-center px-2"
  >
    <div class="w-[90%] flex gap-4 items-center">
      <div
        :style="{
          'background-image': 'url(' + `${URL}/storage/users/${agent.user.photo_name} ` + ')',
          'background-size': 'cover',
          'background-position': 'center'
        }"
        class="w-12 h-12 rounded-3xl"
      ></div>
      <div class="flex flex-col gap-2">
        <p class="font-bold">{{ agent.nomComplet_scol }}</p>
        <div class="flex gap-2">
          <p
            v-if="agent.user.status_user === 'SECPAL'"
            class="bg-blue-200 text-xs text-blue-600 font-bold text-center p-1 px-1.5 rounded-md"
          >
            Sécretaire principale
          </p>
          <p
            v-if="agent.user.status_user === 'AS'"
            class="bg-green-200 text-xs text-green-600 font-bold text-center p-1 px-1.5 rounded-md"
          >
            Agent de la scolarité
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
            @click="
              () => {
                idAS = agent.id
              }
            "
            ><font-awesome-icon class="cursor-pointer" :icon="['fas', 'circle-info']" /> Voir
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Informations sur l'utilisateur</SheetTitle>
          <div class="flex items-center gap-4 mt-4">
            <div
              :style="{
                'background-image': 'url(' + `${URL}/storage/users/${agent.user.photo_name} ` + ')',
                'background-size': 'cover',
                'background-position': 'center'
              }"
              class="w-12 h-12 rounded-3xl"
            ></div>
            <div>
              <div class="flex gap-2 flex-wrap justify-between items-center">
                <p>{{ agent.nomComplet_scol }}</p>
                <p
                  v-if="agent.user.validiter_compte === 'true'"
                  class="text-xs bg-green-500 text-white py-0.5 px-1.5 rounded-sm flex items-center"
                >
                  <font-awesome-icon
                    class="cursor-pointer mr-1 text-blue-500 h-2"
                    :icon="['fas', 'circle']"
                  />Compte actif
                </p>
                <p
                  v-if="agent.user.validiter_compte !== 'true'"
                  class="text-xs bg-red-500 text-white py-0.5 px-1.5 rounded-sm flex items-center"
                >
                  <font-awesome-icon
                    class="cursor-pointer mr-1 text-white h-2"
                    :icon="['fas', 'circle']"
                  />Compte désactivé
                </p>
              </div>
              <div class="text-xs flex">
                <p v-if="agent.user.status_user === 'SECPAL'" class="text-green-600">
                   Sécretaire principale &nbsp;
                </p>
                <p v-if="agent.user.status_user === 'AS'" class="text-blue-600">
                   Agent de la scolarité &nbsp;
                </p>
                <p>({{ agent.categorie_scol }})</p>
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
                  v-model="agent.nomComplet_scol"
                  @blur="
                    (e) => {
                      putNomAS(e.target.value, agent.id)
                    }
                  "
                  @keydown.enter="
                    (e) => {
                      putNomAS(e.target.value, agent.id)
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
                  v-model="agent.telephone_scol"
                  @blur="
                    (e) => {
                      putNumberAS(e.target.value, agent.id)
                    }
                  "
                  @keydown.enter="
                    (e) => {
                      putNumberAS(e.target.value, agent.id)
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
                  v-model="agent.user.email"
                  @blur="
                    (e) => {
                      putEmailEns(e.target.value, agent.user.id)
                    }
                  "
                  @keydown.enter="
                    (e) => {
                      putEmailEns(e.target.value, agent.id)
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
                  v-model="agent.date_recrutement_scol"
                  @input="
                    (e) => {
                      putDateAS(e.target.value, agent.id)
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
              (catégorie)
            </h1>
            <div class="flex flex-col gap-2 mt-2">
              <Select @update:modelValue="handleCtgSelection">
                <SelectTrigger class="w-full select-trigger">
                  <SelectValue class="focus:outline-none" placeholder="Nouvelle catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Permanent"> Permanent</SelectItem>
                    <SelectItem value="Vacataire"> Vacataire </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <button
            v-if="agent.user.validiter_compte === 'true'"
            class="bg-red-500 mt-4 w-full py-2 rounded text-white flex justify-center items-center"
            @click="() => disableUser(agent.user.id)"
          >
            <font-awesome-icon class="cursor-pointer mr-2" :icon="['fas', 'ban']" />Désactiver ce
            compte
          </button>
          <button
            @click="() => ableUser(agent.user.id)"
            v-if="agent.user.validiter_compte !== 'true'"
            class="bg-white border border-yellow-500 mt-4 w-full py-2 rounded text-yellow-500 flex justify-center items-center"
          >
            <font-awesome-icon class="cursor-pointer mr-2" :icon="['fas', 'unlock']" />Re-activer le
            compte
          </button>
        </SheetContent>
      </Sheet>

      <button
        @click="() => showdeleteAS(agent.user.id)"
        class="bg-red-500 text-white py-2 rounded-sm"
      >
        <font-awesome-icon class="cursor-pointer mr-2" :icon="['fas', 'trash-can']" />Supprimer
      </button>
    </div>
  </div>
</template>

<style scoped>
.select-trigger:focus {
  outline: none;
  box-shadow: none;
}
</style>
