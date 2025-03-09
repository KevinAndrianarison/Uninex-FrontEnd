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
import { useEnseignant } from '@/stores/Enseignant'
import { useTheme } from '@/stores/Theme'

const idEns = ref('')
const theme = useTheme()
const URL = useUrl().url
const messages = useMessages()
const enseignant = useEnseignant()

function handleCtgSelection(valeur) {
  let formData = {
    categorie_ens: valeur
  }
  putEns(formData, idEns.value)
}

function handleGradeSelection(valeur) {
  let formData = {
    grade_ens: valeur
  }
  putEns(formData, idEns.value)
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

defineProps({
  enseignants: {
    type: Array,
    default: () => []
  },
  putNomEns: Function,
  putNumberEns: Function,
  putEmailEns: Function,
  putDateEns: Function,
  disableUser: Function,
  ableUser: Function,
  showdelete: Function
})
</script>

<template>
  <div
    :key="index"
    v-for="(ens, index) in enseignants"
    class="border mt-4 flex h-24 bg-white rounded-lg items-center px-2"
    :class="theme.theme === 'light' ? '' : '!bg-gray-500 border-none'"
  >
    <div class="w-[90%] flex gap-4 items-center">
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
          <p
            :class="theme.theme === 'light' ? '' : '!text-gray-500'"
            class="bg-gray-200 text-xs text-center font-bold p-1 px-1.5 rounded-md"
          >
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
            @click="
              () => {
                idEns = ens.id
              }
            "
            ><font-awesome-icon class="cursor-pointer" :icon="['fas', 'circle-info']" /> Voir
          </Button>
        </SheetTrigger>
        <SheetContent :class="theme.theme === 'light' ? '' : '!bg-gray-300'">
          <SheetTitle>Informations sur l'utilisateur</SheetTitle>
          <div class="flex items-center gap-4 mt-4">
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
              class="w-12 h-12 rounded-3xl"
            ></div>
            <div>
              <div class="flex justify-between gap-2 flex-wrap items-center">
                <p>{{ ens.nomComplet_ens }}</p>
                <p
                  v-if="ens.user.validiter_compte === 'true'"
                  class="text-xs bg-green-500 text-white py-0.5 px-1.5 rounded-sm flex items-center"
                >
                  <font-awesome-icon
                    class="cursor-pointer mr-1 text-blue-500 h-2"
                    :icon="['fas', 'circle']"
                  />Compte actif
                </p>
                <p
                  v-if="ens.user.validiter_compte !== 'true'"
                  class="text-xs bg-red-500 text-white py-0.5 px-1.5 rounded-sm flex items-center"
                >
                  <font-awesome-icon
                    class="cursor-pointer mr-1 text-white h-2"
                    :icon="['fas', 'circle']"
                  />Compte désactivé
                </p>
              </div>
              <div class="text-xs flex">
                <p :class="theme.theme === 'light' ? '' : '!text-gray-500'">Enseignant &nbsp;</p>
                <p v-if="ens.chefParcours_status === '1'" class="text-green-600">
                  - Chef de parcours &nbsp;
                </p>
                <p v-if="ens.chefMention_status === '1'" class="text-blue-600">
                  - Chef de mention &nbsp;
                </p>
                <p>({{ ens.categorie_ens }})</p>
              </div>
            </div>
          </div>
          <p class="mt-2">
            <font-awesome-icon
              class="cursor-pointer mr-2 text-yellow-500"
              :icon="['fas', 'star']"
            />{{ ens.grade_ens }}
          </p>
          <div class="mt-2 flex flex-col gap-2">
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
              (Statut/grade)
            </h1>
            <div class="flex flex-col gap-2 mt-2">
              <Select @update:modelValue="handleCtgSelection">
                <SelectTrigger
                  :class="theme.theme === 'light' ? '' : '!bg-gray-100 '"
                  class="w-full select-trigger"
                >
                  <SelectValue class="focus:outline-none" placeholder="Nouveau statut" />
                </SelectTrigger>
                <SelectContent :class="theme.theme === 'light' ? '' : '!bg-gray-100 '">
                  <SelectGroup>
                    <SelectItem value="Permanent"> Permanent</SelectItem>
                    <SelectItem value="Vacataire"> Vacataire </SelectItem>
                    <SelectItem value="Stagiaire"> Stagiaire</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select @update:modelValue="handleGradeSelection">
                <SelectTrigger
                  :class="theme.theme === 'light' ? '' : '!bg-gray-100 '"
                  class="w-full select-trigger"
                >
                  <SelectValue class="focus:outline-none" placeholder="Grade" />
                </SelectTrigger>
                <SelectContent :class="theme.theme === 'light' ? '' : '!bg-gray-100 '">
                  <SelectGroup>
                    <SelectItem value="Assistant"> Assistant</SelectItem>
                    <SelectItem value="Docteur"> Docteur </SelectItem>
                    <SelectItem value="Professeur"> Professeur </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <button
            v-if="ens.user.validiter_compte === 'true'"
            class="bg-red-500 mt-4 w-full py-2 rounded text-white flex justify-center items-center"
            @click="() => disableUser(ens.user.id)"
          >
            <font-awesome-icon class="cursor-pointer mr-2" :icon="['fas', 'ban']" />Désactiver ce
            compte
          </button>
          <button
            @click="() => ableUser(ens.user.id)"
            v-if="ens.user.validiter_compte !== 'true'"
            class="bg-white border border-yellow-500 mt-4 w-full py-2 rounded text-yellow-500 flex justify-center items-center"
          >
            <font-awesome-icon class="cursor-pointer mr-2" :icon="['fas', 'unlock']" />Re-activer le
            compte
          </button>
        </SheetContent>
      </Sheet>

      <button @click="() => showdelete(ens.user.id)" class="bg-red-500 text-white py-2 rounded-sm">
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
