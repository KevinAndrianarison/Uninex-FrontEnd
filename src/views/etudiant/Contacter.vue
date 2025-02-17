<template>
  <div class="flex justify-center">
    <div class="w-[75%] py-2 px-5">
      <h1 class="flex items-center text-2xl font-bold">
        <EnvelopeIcon class="h-6 w-6 mr-2" /> Contacter
      </h1>
      <p class="mt-5 text-sm">Choisissez un utilisateur :</p>
      <div class="flex justify-between mt-2">
        <div class="flex flex-col gap-2 text-xs">
          <button
            @click="switchToAdmin"
            :class="
              isAdmin
                ? 'bg-blue-500 text-white border border-blue-500 w-40 py-2 rounded'
                : 'bg-white text-blue-500 border border-blue-500 w-40 py-2 rounded'
            "
          >
            <font-awesome-icon class="mr-2" :icon="['fas', 'user-cog']" />
            Administration
          </button>
          <button
            @click="switchToScol"
            :class="
              isScolarite
                ? 'bg-blue-500 text-white border border-blue-500 w-40 py-2 rounded'
                : 'bg-white text-blue-500 border border-blue-500 w-40 py-2 rounded'
            "
          >
            <font-awesome-icon class="mr-2" :icon="['fas', 'graduation-cap']" />
            Scolarité
          </button>
          <button
            @click="switchToEns"
            :class="
              isEnseignant
                ? 'bg-blue-500 text-white border border-blue-500 w-40 py-2 rounded'
                : 'bg-white text-blue-500 border border-blue-500 w-40 py-2 rounded'
            "
          >
            <font-awesome-icon class="mr-2" :icon="['fas', 'users-rectangle']" />
            Enseignant
          </button>
        </div>
        <div class="w-full flex items-center flex-col text-xs">
          <div v-if="isAdmin" class="flex gap-2">
            <p
              class="flex items-center cursor-pointer hover:bg-gray-100 px-2 border bg-white w-40 py-2 rounded"
              :class="{ 'bg-gray-200': selectedItem === directeur.nomComplet_dir }"
              @click="selectItem(directeur.nomComplet_dir, directeur.mailTo)"
            >
              <span class="!flex gap-2">
                <input
                  type="radio"
                  class="cursor-pointer"
                  :checked="selectedItem === directeur.nomComplet_dir"
                />
                {{ directeur.nomComplet_dir }}
              </span>
            </p>
            <p
              class="flex items-center cursor-pointer hover:bg-gray-100 px-2 border bg-white w-40 py-2 rounded"
              :class="{ 'bg-gray-200': selectedItem === admin.nomComplet_admin }"
              @click="selectItem(admin.nomComplet_admin, admin.mailTo)"
            >
              <span class="!flex gap-2">
                <input
                  type="radio"
                  class="cursor-pointer"
                  :checked="selectedItem === admin.nomComplet_admin"
                />
                {{ admin.nomComplet_admin }}
              </span>
            </p>
          </div>
          <div v-if="isScolarite" class="flex gap-2">
            <div class="relative" ref="menuRefScolarite">
              <button
                @click="toggleMenu('showCategorieMenuScolarite')"
                class="w-40 flex justify-center py-2 rounded flex gap-2 items-center text-gray-600 !bg-gray-200"
              >
                <font-awesome-icon class="mr-2" :icon="['fas', 'sort']" />
                Scolarité
              </button>

              <div
                v-if="showCategorieMenuScolarite"
                class="absolute left-0 top-full mt-1 bg-white border max-h-40 overflow-y-auto shadow-lg rounded w-48 p-2 z-10"
              >
                <p
                  v-for="agent in agentscolarite.ListeAS"
                  :key="agent"
                  class="flex items-center cursor-pointer hover:bg-gray-100 p-1 px-2 rounded"
                  :class="{ 'bg-gray-200': selectedItem === agent.nomComplet_scol }"
                  @click="selectItem(agent.nomComplet_scol, agent.user.email)"
                >
                  <span class="!flex gap-2">
                    <input
                      type="radio"
                      :value="agent.nomComplet_scol"
                      class="cursor-pointer"
                      :checked="selectedItem === agent.nomComplet_scol"
                    />{{ agent.nomComplet_scol }}</span
                  >
                </p>
              </div>
            </div>
            <div class="relative" ref="menuRefChefMention">
              <button
                @click="toggleMenu('showCategorieMenuChefMention')"
                class="w-40 flex justify-center py-2 rounded flex gap-2 items-center text-gray-600 !bg-gray-200"
              >
                <font-awesome-icon class="mr-2" :icon="['fas', 'sort']" />
                Chef de mention
              </button>

              <div
                v-if="showCategorieMenuChefMention"
                class="absolute left-0 top-full mt-1 bg-white border max-h-40 overflow-y-auto shadow-lg rounded w-48 p-2 z-10"
              >
                <p
                  v-for="ens in enseignant.ListeENS.filter((ens) => ens.chefMention_status === '1')"
                  :key="ens"
                  class="flex items-center cursor-pointer hover:bg-gray-100 p-1 px-2 rounded"
                  :class="{ 'bg-gray-200': selectedItem === ens.nomComplet_ens }"
                  @click="selectItem(ens.nomComplet_ens, ens.user.email)"
                >
                  <span class="!flex gap-2">
                    <input
                      type="radio"
                      :value="ens.nomComplet_ens"
                      class="cursor-pointer"
                      :checked="selectedItem === ens.nomComplet_ens"
                    />{{ ens.nomComplet_ens }}</span
                  >
                </p>
              </div>
            </div>
            <div class="relative" ref="menuRefChefParcours">
              <button
                @click="toggleMenu('showCategorieMenuChefParcours')"
                class="w-40 flex justify-center py-2 rounded flex gap-2 items-center text-gray-600 !bg-gray-200"
              >
                <font-awesome-icon class="mr-2" :icon="['fas', 'sort']" />
                Chef de parcours
              </button>

              <div
                v-if="showCategorieMenuChefParcours"
                class="absolute left-0 top-full mt-1 bg-white border max-h-40 overflow-y-auto shadow-lg rounded w-48 p-2 z-10"
              >
                <p
                  v-for="ens in enseignant.ListeENS.filter(
                    (ens) => ens.chefParcours_status === '1'
                  )"
                  :key="ens"
                  class="flex items-center cursor-pointer hover:bg-gray-100 p-1 px-2 rounded"
                  :class="{ 'bg-gray-200': selectedItem === ens.nomComplet_ens }"
                  @click="selectItem(ens.nomComplet_ens, ens.user.email)"
                >
                  <span class="!flex gap-2">
                    <input
                      type="radio"
                      :value="ens.nomComplet_ens"
                      class="cursor-pointer"
                      :checked="selectedItem === ens.nomComplet_ens"
                    />{{ ens.nomComplet_ens }}</span
                  >
                </p>
              </div>
            </div>
          </div>
          <div v-if="isEnseignant">
            <div class="relative" ref="menuRefEnseignant">
              <button
                @click="toggleMenu('showCategorieMenuEnseignant')"
                class="w-40 flex justify-center py-2 rounded flex gap-2 items-center text-gray-600 !bg-gray-200"
              >
                <font-awesome-icon class="mr-2" :icon="['fas', 'sort']" />
                Enseignant
              </button>

              <div
                v-if="showCategorieMenuEnseignant"
                class="absolute left-0 top-full mt-1 bg-white border max-h-40 overflow-y-auto shadow-lg rounded w-48 p-2 z-10"
              >
                <p
                  v-for="ens in enseignant.ListeENS"
                  :key="ens"
                  class="flex items-center cursor-pointer hover:bg-gray-100 p-1 px-2 rounded"
                  :class="{ 'bg-gray-200': selectedItem === ens.nomComplet_ens }"
                  @click="selectItem(ens.nomComplet_ens, ens.user.email)"
                >
                  <span class="!flex gap-2">
                    <input
                      type="radio"
                      :value="ens.nomComplet_ens"
                      class="cursor-pointer"
                      :checked="selectedItem === ens.nomComplet_ens"
                    />{{ ens.nomComplet_ens }}</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 v-if="mailTo" class="mt-10 flex gap-2 items-end">
        À :
        <p
          class="bg-green-200 font-bold text-xs flex text-green-500 items-center py-1 px-2 rounded"
        >
          {{ mailTo }}
        </p>
      </h1>
      <div v-if="mailTo" class="mt-5 flex items-end gap-4">
        <textarea
          placeholder="Ecrire ici"
          v-model="message"
          class="h-40 w-80 focus:outline-none ring-1 px-4 py-3 text-sm focus:ring rounded-lg"
        ></textarea>
        <button
          :disabled="!message"
          @click="sendEmail"
          class="bg-green-400 px-4 py-1 rounded text-white flex items-center border-2 border-green-400 gap-2 cursor-pointer"
        >
          Envoyer <PaperAirplaneIcon class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { EnvelopeIcon, PaperAirplaneIcon } from '@heroicons/vue/24/outline'
import { useEnseignant } from '@/stores/Enseignant'
import { useDirecteur } from '@/stores/Directeur'
import { useAdmin } from '@/stores/Admin'
import { useAgentscolarite } from '@/stores/Agentscolarite'
import { onBeforeMount, ref, onUnmounted } from 'vue'

const enseignant = useEnseignant()
const agentscolarite = useAgentscolarite()
const directeur = useDirecteur()
const admin = useAdmin()

const showCategorieMenuScolarite = ref(false)
const showCategorieMenuChefMention = ref(false)
const showCategorieMenuChefParcours = ref(false)
const showCategorieMenuEnseignant = ref(false)

const menuRefScolarite = ref(null)
const menuRefChefMention = ref(null)
const menuRefChefParcours = ref(null)
const menuRefEnseignant = ref(null)

const isEnseignant = ref(true)
const isScolarite = ref(false)
const isAdmin = ref(false)

const selectedItem = ref(null)
const mailTo = ref('')
const message = ref('')

function switchToAdmin() {
  isScolarite.value = false
  isEnseignant.value = false
  isAdmin.value = true
}

function switchToScol() {
  isEnseignant.value = false
  isAdmin.value = false
  isScolarite.value = true
}

function switchToEns() {
  isAdmin.value = false
  isScolarite.value = false
  isEnseignant.value = true
}

function selectItem(item, email) {
  selectedItem.value = item
  mailTo.value = email
}

function toggleMenu(menu) {
  switch (menu) {
    case 'showCategorieMenuScolarite':
      showCategorieMenuScolarite.value = !showCategorieMenuScolarite.value
      break
    case 'showCategorieMenuChefMention':
      showCategorieMenuChefMention.value = !showCategorieMenuChefMention.value
      break
    case 'showCategorieMenuChefParcours':
      showCategorieMenuChefParcours.value = !showCategorieMenuChefParcours.value
      break
    case 'showCategorieMenuEnseignant':
      showCategorieMenuEnseignant.value = !showCategorieMenuEnseignant.value
      break
  }
}

const sendEmail = () => {
  const subject = encodeURIComponent('Sujet de votre email')
  const body = encodeURIComponent(message.value)
  const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${mailTo.value}&su=${subject}&body=${body}`
  window.open(mailtoLink, '_blank')
  message.value = ''
}

onBeforeMount(async () => {
  document.addEventListener('click', handleClickOutside)
  await Promise.all([
    enseignant.getAllENS(),
    agentscolarite.getAllAS(),
    directeur.getFirst(),
    admin.getFirst()
  ])
})

const handleClickOutside = (event) => {
  if (menuRefScolarite.value && !menuRefScolarite.value.contains(event.target)) {
    showCategorieMenuScolarite.value = false
  }
  if (menuRefChefMention.value && !menuRefChefMention.value.contains(event.target)) {
    showCategorieMenuChefMention.value = false
  }
  if (menuRefChefParcours.value && !menuRefChefParcours.value.contains(event.target)) {
    showCategorieMenuChefParcours.value = false
  }
  if (menuRefEnseignant.value && !menuRefEnseignant.value.contains(event.target)) {
    showCategorieMenuEnseignant.value = false
  }
}

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped></style>
