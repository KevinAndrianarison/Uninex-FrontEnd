<template>
  <div class="flex justify-center">
    <div class="w-[75%] py-2 px-5">
      <div class="flex items-center justify-end gap-2">
        <p class="font-bold">Année universitaire :</p>
        <Listbox v-model="au.oneAU">
          <div class="relative w-40">
            <ListboxButton
              :class="theme.theme === 'light' ? '' : '!bg-gray-300 '"
              class="text-black relative w-full border border-blue-300 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            >
              <span class="block truncate">{{ au.oneAU }}</span>
              <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>

            <transition
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                :class="theme.theme === 'light' ? '' : '!bg-gray-500'"
                class="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
              >
                <ListboxOption
                  v-slot="{ active, selected }"
                  :key="index"
                  v-for="(AU, index) in au.listeAU"
                  :value="AU.annee_debut + '-' + AU.annee_fin"
                  as="div"
                  @click="changeAU(AU.id, AU.montant_releve, AU.montant_certificatScol)"
                >
                  <li
                    class="leftLi"
                    :class="[
                      au.oneAU === AU.annee_debut + '-' + AU.annee_fin
                        ? 'bg-amber-100 text-amber-900'
                        : '',
                      'relative cursor-default  text-center select-none py-2 '
                    ]"
                  >
                    <span
                      class="spanAU"
                      :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']"
                      >{{ AU.annee_debut }} - {{ AU.annee_fin }}
                    </span>
                    <span
                      v-if="selected"
                      class="absolute inset-y-0 left-0 flex items-left pl-3 text-amber-600"
                    >
                    </span>
                    <span
                      v-if="au.oneAU === AU.annee_debut + '-' + AU.annee_fin"
                      class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                    >
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
      <div class="text-xs flex items-center gap-4 mt-5">
        <button
          @click="switchToFraisScol"
          :class="
            isScolarite
              ? 'bg-blue-500 px-5 py-2 border text-white rounded border-blue-500'
              : 'bg-white px-5 py-2 border text-blue-500 rounded border-blue-500'
          "
        >
          Frais de scolarité
        </button>
        <button
          @click="switchToReleve"
          :class="
            isReleveNote
              ? 'bg-blue-500 px-5 py-2 border text-white rounded border-blue-500'
              : 'bg-white px-5 py-2 border text-blue-500 rounded border-blue-500'
          "
        >
          Relevé de notes
        </button>
        <button
          @click="switchToCertificat"
          :class="
            isCertificatScol
              ? 'bg-blue-500 px-5 py-2 border text-white rounded border-blue-500'
              : 'bg-white px-5 py-2 border text-blue-500 rounded border-blue-500'
          "
        >
          Certificat de scolarité
        </button>
      </div>
      <div v-if="isScolarite">
        <h1 class="mt-5 text-xl">
          Modifier les frais de scolarité
          <p class="text-xs">({{ au.oneAU }})</p>
        </h1>
        <div v-if="niveau.ListNiveau.length !== 0" class="mt-5 list-none flex w-[75%] text-sm">
          <li class="w-[30%] border-t border-l px-3 py-2 font-bold bg-gray-200">Niveau</li>
          <li class="w-[30%] border-l border-t px-3 py-2 font-bold bg-gray-200">Abréviation</li>
          <li class="w-[30%] border-l border-r border-t text-center py-2 font-bold bg-gray-200">
            Montant (Ar)
          </li>
          <li class="text-center w-[10%]"></li>
        </div>
        <div class="max-h-[50vh] overflow-y-auto">
          <div
            :key="index"
            v-for="(niv, index) in niveau.ListNiveau"
            class="list-none flex w-[75%] text-sm"
          >
            <li class="w-[30%] border-t border-l border-b px-3 py-2">{{ niv.nom_niveau }}</li>
            <li class="w-[30%] border-l border-t px-3 py-2 border-b">{{ niv.abr_niveau }}</li>
            <input
              type="number"
              v-model="niv.montant_droit"
              :class="theme.theme === 'light' ? '' : '!bg-gray-600'"
              class="w-[30%] border-l border-r border-t text-center py-2 border-b focus:outline-none cursor-pointer"
              @blur="handleInputChange(niv.montant_droit, niv.id)"
            />
            <li
              @click="deleteNiveau(niv.nom_niveau, niv.id)"
              class="flex items-center justify-center w-[10%] border-t border-b border-r"
            >
              <font-awesome-icon
                class="text-gray-500 cursor-pointer text-red-500"
                :icon="['fas', 'trash-can']"
              />
            </li>
          </div>
        </div>
        <div
          v-if="niveau.ListNiveau.length === 0"
          class="flex items-center justify-center flex-col w-[75%] mt-5"
        >
          <div
            class="h-20 w-36 bg-[url('../assets/pngtree-empty-box-icon-for-your-project-png-image_1533458-removebg-preview.png')] bg-cover bg-center"
          ></div>
          <p class="text-xs font-bold mt-2">Aucun niveau n'a encore été créé</p>
        </div>
      </div>
      <div v-if="isCertificatScol">
        <CertificatDeScolarite />
      </div>
      <div v-if="isReleveNote">
        <ReleveNote />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { useNiveau } from '@/stores/Niveau'
import { useAu } from '@/stores/Au'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useTheme } from '@/stores/Theme'
import { useShow } from '@/stores/Show'
import axios from 'axios'
import { useUrl } from '@/stores/url'
import { useMessages } from '@/stores/messages'
import { ref } from 'vue'
import CertificatDeScolarite from './droits/CertificatDeScolarite.vue'
import ReleveNote from './droits/ReleveNote.vue'

const niveau = useNiveau()
const au = useAu()
const theme = useTheme()
const show = useShow()
const URL = useUrl().url
const messages = useMessages()
const isScolarite = ref(true)
const isCertificatScol = ref(false)
const isReleveNote = ref(false)

function changeAU(id, releve, certificat) {
  au.montant_releve = releve
  au.montant_certificatScol = certificat
  au.idDroit = id
}

function deleteNiveau(nom, id) {
  niveau.niveau.nom_niveau = nom
  niveau.niveau.id_niveau = id
  show.showDeleteNiveau = true
}

function switchToFraisScol() {
  isReleveNote.value = false
  isCertificatScol.value = false
  isScolarite.value = true
}

function switchToCertificat() {
  isScolarite.value = false
  isReleveNote.value = false
  isCertificatScol.value = true
}

function switchToReleve() {
  isCertificatScol.value = false
  isScolarite.value = false
  isReleveNote.value = true
}

function handleInputChange(montant, id) {
  let formData = {
    montant_droit: montant
  }
  axios
    .put(`${URL}/api/niveau/${id}`, formData)
    .then((response) => {
      messages.messageSucces = 'Montant modifié !'
      setTimeout(() => {
        messages.messageSucces = ''
      }, 3000)
    })
    .catch((err) => {
      console.error(err)
      messages.messageError = "Un erreur s'est produit !"
      setTimeout(() => {
        messages.messageError = ''
      }, 3000)
    })
}
</script>

<style scoped></style>
