<script setup>
import { ref, computed } from 'vue'
import { faTrash, faHourglassHalf } from '@fortawesome/free-solid-svg-icons'
import { UserGroupIcon } from '@heroicons/vue/24/outline'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useEnseignant } from '@/stores/Enseignant'
import { useAgentscolarite } from '@/stores/Agentscolarite'
import { onBeforeMount } from 'vue'
import { useUrl } from '@/stores/url'
import { useShow } from '@/stores/Show'
import { useUser } from '@/stores/User'
import { useTheme } from '@/stores/Theme'
import Tooltip from '../../components/Tooltip.vue'
import { useConge } from '@/stores/conge'

const enseignant = useEnseignant()
const agentscolarite = useAgentscolarite()
const URL = useUrl().url
const show = useShow()
const user = useUser()
const theme = useTheme()
const conge = useConge()

onBeforeMount(() => {
  enseignant.getAllENS()
  agentscolarite.getAllAS()
})

const searchQueryAS = ref('')
const searchQueryENS = ref('')

const filteredAgents = computed(() => {
  return agentscolarite.ListeAS.filter(
    (agent) =>
      agent.nomComplet_scol.toLowerCase().includes(searchQueryAS.value.toLowerCase()) ||
      agent.user.email.toLowerCase().includes(searchQueryAS.value.toLowerCase())
  )
})

const filteredEnseignants = computed(() => {
  return enseignant.ListeENS.filter(
    (ens) =>
      ens.nomComplet_ens.toLowerCase().includes(searchQueryENS.value.toLowerCase()) ||
      ens.user.email.toLowerCase().includes(searchQueryENS.value.toLowerCase())
  )
})

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
</script>

<template>
  <h1
    :class="theme.theme === 'light' ? '' : 'text-white'"
    class="titre font-bold max-w-5xl flex items-center gap-2 text-xl mx-auto px-6 py-4"
  >
    <UserGroupIcon class="h-7 w-7" />
    Gestion RH
  </h1>
  <div :class="theme.theme === 'light' ? '' : 'text-white'" class="overflow-y-auto h-[80vh] py-2">
    <div class="px-6 max-w-5xl mx-auto text-xs">
      <div class="flex flex-row-reverse justify-between">
        <div class="flex mb-4">
          <input
            v-model="searchQueryAS"
            type="text"
            placeholder="Rechercher..."
            :class="theme.theme === 'light' ? '' : ' bg-gray-300'"
            class="p-2 w-60 focus:outline-none text-black rounded-l"
          />
          <p
            :class="theme.theme === 'light' ? '' : ' !bg-gray-300'"
            class="px-4 flex items-center rounded-r bg-white justify-center"
          >
            <font-awesome-icon
              class="cursor-pointer text-blue-500"
              :icon="['fas', 'magnifying-glass']"
            />
          </p>
        </div>
        <div>
          <p class="text-lg">Personnel administratif et technique <b>(PAT)</b> :</p>
          <p class="mb-2 font-bold text-green-500 bg-green-200 w-28 py-1 text-center rounded">
            {{ filteredAgents.length }} personnel(s)
          </p>
        </div>
      </div>
      <div
        v-if="filteredAgents.length !== 0"
        :class="theme.theme === 'light' ? '' : 'border-0'"
        class="rounded"
      >
        <div class="flex bg-blue-200/20 p-3 border-gray-300">
          <span class="w-8"></span>
          <span class="w-1/4 font-bold px-2"> Nom</span>
          <span class="w-1/4 flex items-center font-bold"> Email</span>
          <span class="w-1/4 font-bold">Type</span>
          <span class="w-1/4 text-right"></span>
        </div>
        <div
          v-for="agent in filteredAgents"
          :key="agent.id"
          :class="theme.theme === 'light' ? 'bg-white' : ''"
          class="flex items-center p-2 transition cursor-pointer"
        >
          <div
            :style="{
              'background-image':
                'url(' +
                `${URL}/storage/users/${
                  agent.user.photo_name || 'téléchargement-removebg-preview.png'
                } ` +
                ')',
              'background-size': 'cover',
              'background-position': 'center'
            }"
            class="w-8 h-8 rounded-3xl"
          ></div>
          <span class="w-1/4 px-2">{{ agent.nomComplet_scol }}</span>
          <span class="w-1/4 text-xs text-blue-500">{{ agent.user.email }}</span>
          <span class="w-1/4"> Sécretaire principale </span>
          <span class="w-1/4 flex justify-end gap-2">
            <button
              @click="
                () => {
                  show.showModaleEtatCong = true
                  conge.nomUser = agent.nomComplet_scol
                  conge.getAllCongepermissionById(agent.user.id)
                }
              "
              class="text-gay-500"
            >
              <Tooltip content="Etat de congé ">
                <FontAwesomeIcon
                  :icon="faHourglassHalf"
                  class="bg-gray-200 p-2 px-2.5 rounded-full"
                />
              </Tooltip>
            </button>

            <button @click="() => showdeleteAS(agent.user.id)" class="text-red-500">
              <Tooltip content="Supprimer ">
                <FontAwesomeIcon :icon="faTrash" class="bg-red-200 p-2 rounded-full"
              /></Tooltip>
            </button>
          </span>
        </div>
      </div>
      <p v-if="filteredAgents.length === 0" class="text-center mt-4">Aucun personnel trouvé !</p>
    </div>
    <div class="p-6 max-w-5xl mx-auto text-xs">
      <div class="flex flex-row-reverse justify-between">
        <div class="flex mb-4">
          <input
            v-model="searchQueryENS"
            type="text"
            placeholder="Rechercher..."
            :class="theme.theme === 'light' ? '' : ' bg-gray-300'"
            class="p-2 w-60 focus:outline-none rounded-l"
          />
          <p
            :class="theme.theme === 'light' ? '' : ' !bg-gray-300'"
            class="px-4 flex items-center rounded-r bg-white justify-center"
          >
            <font-awesome-icon
              class="cursor-pointer text-blue-500"
              :icon="['fas', 'magnifying-glass']"
            />
          </p>
        </div>
        <div>
          <p class="text-lg">Personnel enseignant <b>(PE)</b> :</p>
          <p class="mb-2 font-bold text-green-500 bg-green-200 w-28 py-1 text-center rounded">
            {{ filteredEnseignants.length }} personnel(s)
          </p>
        </div>
      </div>
      <div
        v-if="filteredEnseignants.length !== 0"
        :class="theme.theme === 'light' ? '' : ' border-0'"
        class="rounded"
      >
        <div class="flex bg-blue-200/20 p-3 border-gray-300">
          <span class="w-8"></span>
          <span class="w-1/4 flex items-center font-bold px-2"> Nom</span>
          <span class="w-1/4 flex items-center font-bold"> Email</span>
          <span class="w-1/4 font-bold">Type</span>
          <span class="w-1/4 text-right"></span>
        </div>
        <div
          v-for="ens in filteredEnseignants"
          :key="ens.id"
          :class="theme.theme === 'light' ? 'bg-white' : ''"
          class="flex items-center p-2 transition cursor-pointer transition"
        >
          <div
            :style="{
              'background-image':
                'url(' +
                `${URL}/storage/users/${
                  ens.user.photo_name || 'téléchargement-removebg-preview.png'
                } ` +
                ')',
              'background-size': 'cover',
              'background-position': 'center'
            }"
            class="w-8 h-8 rounded-3xl"
          ></div>
          <span class="w-1/4 px-2">{{ ens.nomComplet_ens }}</span>
          <span class="w-1/4 text-xs text-blue-500">{{ ens.user.email }}</span>
          <div class="w-1/4">
            <span v-if="ens.chefMention_status === '1'"> Chef de mention </span>
            <span v-if="ens.chefParcours_status === '1'"> Chef de parcours </span>
            <span v-if="ens.chefParcours_status !== '1' && ens.chefMention_status !== '1'">
              Enseignant
            </span>
          </div>
          <span class="w-1/4 flex justify-end gap-2">
            <button
              @click="
                () => {
                  show.showModaleEtatCong = true
                  conge.nomUser = ens.nomComplet_ens
                  conge.getAllCongepermissionById(ens.user.id)
                }
              "
              class="text-gay-500"
            >
              <Tooltip content="Etat de congé ">
                <FontAwesomeIcon
                  :icon="faHourglassHalf"
                  class="bg-gray-200 p-2 px-2.5 rounded-full"
                />
              </Tooltip>
            </button>
            <button @click="() => showdelete(ens.user.id)" class="text-red-500">
              <Tooltip content="Supprimer ">
                <FontAwesomeIcon :icon="faTrash" class="bg-red-200 p-2 rounded-full" />
              </Tooltip>
            </button>
          </span>
        </div>
      </div>
      <p v-if="filteredEnseignants.length === 0" class="text-center mt-4">
        Aucun personnel trouvé !
      </p>
    </div>
  </div>
</template>

<style></style>
