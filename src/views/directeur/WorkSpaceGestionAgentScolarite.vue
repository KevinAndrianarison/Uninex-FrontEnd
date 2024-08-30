<template>
  <div class="scol">
    <h1 class="titre">
      <font-awesome-icon class="h-7 w-7 mr-5" :icon="['fas', 'person-chalkboard']" /> Agents de la
      scolarité
    </h1>
    <div class="createScol">
      <h1 class="create pl-5 mt-2">Ajouter un nouveau Agent de la scolarité :</h1>
      <div class="class formInput border-gray-900/10 pb-5 pl-5">
        <div class="sm:col-span-3 mr-4 mt-2">
          <label class="block text-sm font-medium leading-6 text-gray-900">Nom complet</label>
          <div class="mt-2">
            <input
              type="text"
              v-model="agentscolarite.nomComplet_scol"
              class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
            />
          </div>
        </div>
        <div class="sm:col-span-3 mt-2 mr-4">
          <label class="block text-sm font-medium leading-6 text-gray-900">Adresse email</label>
          <div class="mt-2">
            <input
              type="email"
              @input="regex.RegexEmail(user.email)"
              v-model="user.email"
              class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
            />
            <p class="err" v-if="show.showMessageErrorEmail">Adresse email invalide</p>
          </div>
        </div>
        <div class="sm:col-span-3 mt-2 mr-4">
          <label class="block text-sm font-medium leading-6 text-gray-900">Numéro téléphone</label>
          <div class="mt-2">
            <input
              type="number"
              v-model="agentscolarite.telephone_scol"
              class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
            />
          </div>
        </div>

        <div class="sm:col-span-3 mt-2 ctgr mr-4">
          <label class="block text-sm font-medium leading-6 text-gray-900">Catégorie</label>
          <div class="w-60">
            <Listbox v-model="agentscolarite.categorie_scol">
              <div class="relative mt-2">
                <ListboxButton
                  class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span class="block truncate">{{ agentscolarite.categorie_scol }}</span>
                  <span
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                  >
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </ListboxButton>

                <transition
                  leave-active-class="transition duration-100 ease-in"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <ListboxOptions
                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      v-slot="{ active, selected }"
                      v-for="categorie in categories"
                      :key="categorie"
                      :value="categorie"
                      as="template"
                    >
                      <li
                        :class="[
                          active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-10 pr-4'
                        ]"
                      >
                        <span
                          :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']"
                          >{{ categorie }}</span
                        >
                        <span
                          v-if="selected"
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
        </div>

        <div class="sm:col-span-3 mt-2 mr-4">
          <label class="block text-sm font-medium leading-6 text-gray-900"
            >Date de recrutement</label
          >
          <div class="mt-2">
            <input
              type="date"
              v-model="agentscolarite.date_recrutement_scol"
              class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
            />
          </div>
        </div>
        <div class="sm:col-span-3 mt-2 mr-4">
          <label class="block text-sm font-medium leading-6 text-gray-900">Photo</label>
          <div class="mt-1">
            <div class="relative flex items-center">
              <input
                @change="onPhotoFileChange"
                class="absolute inset-0 opacity-0 cursor-pointer"
                type="file"
              />
              <div
                class="file-label bg-green-100 text-green-800 py-2 px-1 rounded-md border border-green-300"
              >
                📂 Choisissez une photo
              </div>
            </div>
          </div>
        </div>
        <div class="divbtn sm:col-span-3 mt-2">
          <Button
            :disabled="
              !user.photo ||
              !user.email ||
              !agentscolarite.nomComplet_scol ||
              !agentscolarite.categorie_scol ||
              show.showMessageErrorEmail
            "
            @click="showMdp()"
            class="btn mb-1"
          >
            Valider</Button
          >
        </div>
      </div>
    </div>
    <div class="listScol">
      <input
        placeholder="🔎 Recherche par nom"
        @input="agentscolarite.search(agentscolarite.searchalue)"
        v-model="agentscolarite.searchalue"
        type="search"
        class="pl-3 pr-3 ml-5 mt-3 block rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
      />
      <div class="listScolValue">
        <div class="head">
          <li class="widthnom">Nom complet</li>
          <li class="widthemail">Adresse email</li>
          <li class="width">Numéro téléphone</li>
          <li class="width">Catégorie</li>
          <li class="h-5 w-5"></li>
        </div>
        <div class="body" :key="index" v-for="(as, index) in agentscolarite.ListeAS">
          <li class="widthvaluenom">{{ as.nomComplet_scol }}</li>
          <li class="widthvalueemail">{{ as.user.email }}</li>
          <li class="widthvalue">{{ as.telephone_scol }}</li>
          <li class="widthvalue">{{ as.categorie_scol }}</li>
          <TrashIcon @click="showdelete(as.user_id)" class="delete h-5 w-5" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TrashIcon } from '@heroicons/vue/24/outline'
import { useAgentscolarite } from '@/stores/Agentscolarite'
import { useUser } from '@/stores/User'
import { useRegex } from '@/stores/Regex'
import { useShow } from '@/stores/Show'
import { usePassword } from '@/stores/Password'
import { onBeforeMount } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const user = useUser()
const regex = useRegex()
const show = useShow()
const agentscolarite = useAgentscolarite()
const password = usePassword()

const categories = ['Permanent', 'Vacataire']

function showMdp() {
  password.generatePassword()
  show.showMdpAS = true
}

function showdelete(id) {
  show.showDeleteusers = true
  user.user_id = id
  user.user_status = 'AS'
}

onBeforeMount(() => {
  agentscolarite.categorie_scol = categories[0]
  agentscolarite.getAllAS()
})

function onPhotoFileChange(event) {
  user.photo = event.target.files[0]
}
</script>

<style scoped src="../../styles/GestionAgentScol.css"></style>
