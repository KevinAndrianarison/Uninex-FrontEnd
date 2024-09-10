<template>
  <div class="ens">
    <h1 class="titre"><WrenchScrewdriverIcon class="h-7 w-7 mr-5" /> Configurations et modifications</h1>
    <div class="configContent">
      <div class="CONTENT">
        <h1 class="create pl-5 mt-2" v-if="show.showNavBarDir">Modifier les informations de votre établissement :</h1>
        <div v-if="show.showNavBarDir" class="class formInput border-gray-900/10 pb-5 pl-5">
          <div class="sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6 text-gray-900"
              >Nom de l'établissement</label
            >
            <div class="mt-2">
              <input
                type="text"
                v-model="etablissement.etablissement.nom_etab"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>
          <div class="sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6 text-gray-900">Abréviation</label>
            <div class="mt-2">
              <input
                type="text"
                v-model="etablissement.etablissement.abr_etab"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>
          <div class="sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6 text-gray-900">Slogant</label>
            <div class="mt-2">
              <input
                type="text"
                v-model="etablissement.etablissement.slogan_etab"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>
          <div class="sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6 text-gray-900">Description</label>
            <div class="mt-2">
              <textarea
                type="text"
                v-model="etablissement.etablissement.descri_etab"
                class="pl-3 pr-3 h-8 min-h-8 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              ></textarea>
            </div>
          </div>
          <div class="sm:col-span-3 mt-2 mr-4 file">
            <label class="block text-sm font-medium leading-6 text-gray-900"
              >Date de création</label
            >
            <div class="mt-2">
              <input
                type="date"
                v-model="etablissement.etablissement.dateCreation_etab"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>

          <div class="sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6 text-gray-900">Pays</label>
            <div class="mt-2">
              <input
                type="text"
                v-model="etablissement.etablissement.pays_etab"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>
          <div class="sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6 text-gray-900">Ville</label>
            <div class="mt-2">
              <input
                type="text"
                v-model="etablissement.etablissement.ville_etab"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>
          <div class="sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6 text-gray-900">Code postal</label>
            <div class="mt-2">
              <input
                type="number"
                v-model="etablissement.etablissement.codePostal_etab"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>
          <div class="sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6 text-gray-900">Adresse e-mail</label>
            <div class="mt-2">
              <input
                type="email"
                @input="regex.RegexEmailDir(etablissement.etablissement.email_etab)"
                v-model="etablissement.etablissement.email_etab"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
            <p class="err" v-if="show.showMessageErrorEmailDir">Adresse email invalide</p>
          </div>

          <div class="sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6 text-gray-900"
              >Mot de passe application Gmail</label
            >
            <div class="mt-2">
              <input
                type="email"
                v-model="etablissement.etablissement.mdpAppGmail_etab"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
            <p class="err" v-if="show.showMessageErrorEmailDir">Adresse email invalide</p>
          </div>

          <div class="sm:col-span-3 mr-4 mt-2">
            <label class="block text-sm font-medium leading-6 text-gray-900">Votre logo</label>
            <div class="mt-2">
              <div class="relative flex items-center">
                <input
                  @change="onFileLogoChange"
                  class="absolute inset-0 opacity-0 cursor-pointer"
                  type="file"
                />
                <div
                  class="file-label bg-green-100 text-green-800 py-2 px-4 rounded-md border border-green-300"
                >
                  📂 Choisissez une image
                </div>
              </div>
            </div>
          </div>

          <div class="sm:col-span-3 mt-4 valider">
            <Button class="btns" @click="etablissement.modifierEtabissement()"> Enregistrer</Button>
          </div>
        </div>

        <h1 class="create pl-5 mt-2">Modifier vos informations personnelles :</h1>
        <div class="class formInput border-gray-900/10 pb-5 pl-5">
          <div class="sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6 text-gray-900">Nom complet</label>
            <div class="mt-2">
              <input
                type="text"
                v-model="enseignant.nomComplet_ens"
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
            <label class="block text-sm font-medium leading-6 text-gray-900"
              >Numéro téléphone</label
            >
            <div class="mt-2">
              <input
                type="number"
                v-model="enseignant.telephone_ens"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>
          <div class="sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6 text-gray-900"
              >Titre académique</label
            >
            <div class="w-60">
              <Listbox v-model="enseignant.grade_ens">
                <div class="relative mt-2">
                  <ListboxButton
                    class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                  >
                    <span class="block truncate">{{ enseignant.grade_ens }}</span>
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
                        v-for="grade in grades"
                        :key="grade"
                        :value="grade"
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
                            >{{ grade }}</span
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
          <div class="sm:col-span-3 mt-2 mr-4 file">
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

          <div class="sm:col-span-3 mt-2 mr-4 ctgr">
            <label class="block text-sm font-medium leading-6 text-gray-900">Catégorie</label>
            <div class="w-60">
              <Listbox v-model="enseignant.categorie_ens">
                <div class="relative mt-2">
                  <ListboxButton
                    class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                  >
                    <span class="block truncate">{{ enseignant.categorie_ens }}</span>
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
          <div class="sm:col-span-3 mt-2 date">
            <label class="block text-sm font-medium leading-6 text-gray-900"
              >Date de recrutement</label
            >
            <div class="mt-2">
              <input
                type="date"
                v-model="enseignant.date_recrutement_ens"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>

          <div class="divbtn sm:col-span-3 mt-3 ml-4">
            <Button
              :disabled="
                !user.photo ||
                !user.email ||
                !enseignant.nomComplet_ens ||
                !enseignant.categorie_ens ||
                show.showMessageErrorEmail
              "
              @click="showMdp()"
              class="btns mb-1"
            >
              Valider</Button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { WrenchScrewdriverIcon } from '@heroicons/vue/24/outline'
import { useEnseignant } from '@/stores/Enseignant'
import { useEtablissement } from '@/stores/Etablissement'
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
const enseignant = useEnseignant()
const password = usePassword()
const etablissement = useEtablissement()

const grades = ['Ingénieur', 'Docteur', 'Professeur']

const categories = ['Permanent', 'Vacataire']

function showMdp() {
  password.generatePassword()
  show.showMdpENS = true
}

function onFileLogoChange(event) {
  etablissement.logo_etab = event.target.files[0]
}

onBeforeMount(() => {
  enseignant.grade_ens = grades[0]
  enseignant.categorie_ens = categories[0]
  enseignant.getAllENS()
})

function onPhotoFileChange(event) {
  user.photo = event.target.files[0]
}
</script>

<style scoped src="../styles/GestionEnseignant.css"></style>
