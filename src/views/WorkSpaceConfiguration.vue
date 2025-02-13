<template>
  <div :class="theme.theme === 'light' ? 'ens' : 'ens !bg-gray-600 !text-white'">
    <h1 class="titre">
      <WrenchScrewdriverIcon class="h-7 w-7 mr-5" /> Configurations et modifications
    </h1>
    <div
      :class="
        theme.theme === 'light' ? 'configContent' : ' configContent !bg-gray-600 !text-gray-200'
      "
    >
      <div class="CONTENT">
        <h1 class="create pl-5 mt-2" v-if="show.showNavBarAdmin">
          Modifier les informations de votre établissement :
        </h1>
        <div v-if="show.showNavBarAdmin" class="class formInputs border-gray-900/10 pb-5 pl-5">
          <div class="sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6">Nom de l'établissement</label>
            <div class="mt-2">
              <input
                type="text"
                v-model="etablissement.etablissement.nom_etab"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>
          <div class="sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6">Abréviation</label>
            <div class="mt-2">
              <input
                type="text"
                v-model="etablissement.etablissement.abr_etab"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>
          <div class="sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6">Slogant</label>
            <div class="mt-2">
              <input
                type="text"
                v-model="etablissement.etablissement.slogan_etab"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>
          <div class="sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6">Description</label>
            <div class="mt-2">
              <textarea
                type="text"
                v-model="etablissement.etablissement.descri_etab"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 h-8 min-h-8 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              ></textarea>
            </div>
          </div>
          <div class="w-52 sm:col-span-3 mt-2 mr-4 file">
            <label class="block text-sm font-medium leading-6">Date de création</label>
            <div class="mt-2">
              <input
                type="date"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                v-model="etablissement.etablissement.dateCreation_etab"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>

          <div class="sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6">Pays</label>
            <div class="mt-2">
              <input
                type="text"
                v-model="etablissement.etablissement.pays_etab"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>
          <div class="sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6">Ville</label>
            <div class="mt-2">
              <input
                type="text"
                v-model="etablissement.etablissement.ville_etab"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>
          <div class="sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6">Code postal</label>
            <div class="mt-2">
              <input
                type="number"
                v-model="etablissement.etablissement.codePostal_etab"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>
          <div class="sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6">Adresse e-mail</label>
            <div class="mt-2">
              <input
                type="email"
                @input="regex.RegexEmailDir(etablissement.etablissement.email_etab)"
                v-model="etablissement.etablissement.email_etab"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
            <p class="err" v-if="show.showMessageErrorEmailDir">Adresse email invalide</p>
          </div>

          <div class="w-52 sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6"
              >Mot de passe application Gmail</label
            >
            <div class="mt-2">
              <input
                type="email"
                v-model="etablissement.etablissement.mdpAppGmail_etab"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>

          <div class="sm:col-span-3 mr-4 mt-2">
            <label class="block text-sm font-medium leading-6">Votre logo</label>
            <div 
          :style="{
          'background-image':
            'url(' +
            `${URL}/storage/etablissement/${etablissement.etablissement.nomlogo_etab} ` +
            ')'
        }" 
        class="image w-20 h-20 p-5"></div>
            <div class="mt-2">
              <div class="relative flex items-center">
                <input
                  @change="onFileLogoChange"
                  class="absolute inset-0 opacity-0 cursor-pointer"
                  type="file"
                  accept="image/jpeg, image/png"
                />
                <div
                  :class="theme.theme === 'light' ? '' : 'bg-green-300'"
                  class="file-label bg-green-100 text-green-800 py-2 px-4 rounded-md border border-green-300"
                >
                  📂 Choisissez une image
                </div>
              </div>
              <div v-if="etablissement.logo_etabName" class="flex text-xs absolute">
                <p class="text-blue-500 mr-2">{{ etablissement.logo_etabName }}</p>
                <font-awesome-icon
                  class="text-red-500 cursor-pointer w-5 h-4"
                  :icon="['fas', 'xmark']"
                  @click="
                    () => {
                      etablissement.logo_etabName = ''
                      etablissement.logo_etab = null
                    }
                  "
                />
              </div>
            </div>
          </div>
          <div class="sm:col-span-3 mt-2 flex items-end">
            <Button
              :disabled="show.showMessageErrorEmailDir || !etablissement.etablissement.email_etab"
              class="btns "
              @click="etablissement.modifierEtabissement()"
            >
              Enregistrer les modifications</Button
            >
          </div>
        </div>

        <h1 class="create pl-5 mt-2">Modifier vos informations personnelles :</h1>
        <div class="class flex gap-5 formInputs border-gray-900/10 p-5 pl-5">
        <div
        :style="{
            'background-image': `url(${URL}/storage/users/${infosheader.photo || 'téléchargement-removebg-preview.png'})`
          }"
          class='image ring ring-blue-400 h-[200px] w-[200px] rounded-full'>
        </div>
        <div class='flex flex-wrap w-[70%] gap-4' >
          <div class="sm:col-span-3">
            <label class="block text-sm font-medium leading-6 ">Nom complet</label>
            <div class="mt-2">
              <input
                type="text"
                v-model="infossetup.nom"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>
          <div class="sm:col-span-3">
            <label class="block text-sm font-medium leading-6">Adresse email</label>
            <div class="mt-2">
              <input
                type="email"
                @input="regex.RegexEmail(user.email)"
                v-model="user.email"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
              <p class="err" v-if="show.showMessageErrorEmail">Adresse email invalide</p>
            </div>
          </div>
          <div class="sm:col-span-3">
            <label class="block text-sm font-medium leading-6"
              >Numéro téléphone</label
            >
            <div class="mt-2">
              <input
                type="number"
                v-model="infossetup.telephone"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>
          <div v-if="show.showNavBarDir" class="sm:col-span-3">
            <label class="block text-sm font-medium leading-6"
              >Titre académique</label
            >
            <div class="w-60">
              <Listbox v-model="infossetup.grade">
                <div class="relative mt-2">
                  <ListboxButton
                  :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                    class="text-black  relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                  >
                    <span class="block truncate">{{ infossetup.grade }}</span>
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
                    :class="theme.theme === 'light' ? '' : '!bg-gray-500'"

                      class="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
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
                            active ? 'bg-amber-100 text-amber-900' : '',
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
          <div class="sm:col-span-3 file">
            <label class="block text-sm font-medium leading-6 ">Photo</label>
            <div class="mt-1">
              <div class="relative flex items-center">
                <input
                  @change="onPhotoFileChange"
                  class="absolute inset-0 opacity-0 cursor-pointer"
                  type="file"
                  accept="image/jpeg, image/png"
                />
                <div
                :class="theme.theme === 'light' ? '' : 'bg-green-300'"
                  class="file-label bg-green-100 text-green-800 py-2 px-1 rounded-md border border-green-300"
                >
                  📂 Choisissez une photo
                </div>
              </div>
            </div>
            <div v-if="user.photoName" class="flex text-xs">
              <p class="text-blue-500 mr-2">{{ user.photoName }}</p>
              <font-awesome-icon
                class="text-red-500 cursor-pointer w-5 h-4"
                :icon="['fas', 'xmark']"
                @click="
                  () => {
                    user.photoName = ''
                    user.photo = null
                  }
                "
              />
            </div>
          </div>
          <div class="sm:col-span-3 mt-2 ">
            <label class="block text-sm font-medium leading-6 text-gray-900">&nbsp;</label>
            <Button @click="modifier()" class="btns mb-1"> Enregistrer les modifications</Button>
          </div>
        </div>
        
        </div>

        <h1 class="create pl-5 mt-2">Changer de mot de passe :</h1>
        <div class="class formInput border-gray-900/10 pb-5 pl-5">
          <div class="sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6 "
              >Ancien mot de passe</label
            >
            <div class="mt-2">
              <input
                type="text"
                v-model="user.oldpassword"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
            </div>
          </div>

          <div class="w-52 sm:col-span-3 mr-4 mt-2">
            <label class="block text-sm font-medium leading-6 "
              >Créer un mot de passe</label
            >
            <div class="mt-2 relative">
              <input
                @input="regex.RegexPassword(user.password)"
                :type="show.showCreatePassword ? 'text' : 'password'"
                @copy="handleCopy"
                v-model="user.password"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-10 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
              <button
                type="button"
                @click="show.toggleCreatePasswordVisibility()"
                class="absolute inset-y-0 right-3 pl-3 flex items-center text-gray-600"
              >
                <EyeIcon v-if="!show.showCreatePassword" class="h-5 w-5" />
                <EyeSlashIcon v-else class="h-5 w-5" />
              </button>
            </div>
            <p class="err" v-if="show.showMessageErrorMdp">
              Majuscule, Chiffre, Caractère spécial [@$!%*?&] et plus de 8 caractères
            </p>
          </div>

          <div class="w-52 sm:col-span-3 mt-2 mr-4">
            <label class="block text-sm font-medium leading-6 "
              >Confirmer votre mot de passe</label
            >
            <div class="mt-2 relative">
              <input
                @input="user.verifierPasword()"
                :type="show.showVerifyPassword ? 'text' : 'password'"
                v-model="user.passwordVerifier"
                :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                class="pl-3 pr-10 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
              />
              <button
                type="button"
                @click="show.toggleVerifyPasswordVisibility()"
                class="absolute inset-y-0 right-3 pl-3 flex items-center text-gray-600"
              >
                <EyeIcon v-if="!show.showVerifyPassword" class="h-5 w-5" />
                <EyeSlashIcon v-else class="h-5 w-5" />
              </button>
            </div>
            <p class="err" v-if="show.showMessageErrorConfirmMdp">Vérifier votre mot de passe</p>
          </div>

          <div class="divbtn sm:col-span-3 mt-2">
            <Button
              @click="user.setMdp()"
              :disabled="
                !user.password ||
                !user.oldpassword ||
                !user.passwordVerifier ||
                show.showMessageErrorMdp ||
                show.showMessageErrorConfirmMdp
              "
              class="btns mb-1"
            >
              Modifier</Button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { WrenchScrewdriverIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import { useEtablissement } from '@/stores/Etablissement'
import { useUser } from '@/stores/User'
import { useRegex } from '@/stores/Regex'
import { useShow } from '@/stores/Show'
import { useDirecteur } from '@/stores/Directeur'
import { useAgentscolarite } from '@/stores/Agentscolarite'
import { useEtudiant } from '@/stores/Etudiant'
import { useEnseignant } from '@/stores/Enseignant'
import { useInfossetup } from '@/stores/Infossetup'
import { useInfosheader } from '@/stores/Infosheader'
import { onBeforeMount } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useTheme } from '@/stores/Theme'
import { useUrl } from '@/stores/url'
import { useAdmin } from '@/stores/Admin'




const admin = useAdmin()
const user = useUser()
const regex = useRegex()
const show = useShow()
const etablissement = useEtablissement()
const enseignant = useEnseignant()
const etudiant = useEtudiant()
const infossetup = useInfossetup()
const directeur = useDirecteur()
const agentscolarite = useAgentscolarite()
const infosheader = useInfosheader()
const theme = useTheme()
const URL = useUrl().url


const grades = ['Ingénieur', 'Docteur', 'Professeur']

function onFileLogoChange(event) {
  etablissement.logo_etab = event.target.files[0]
  etablissement.logo_etabName = event.target.files[0].name
}

onBeforeMount(() => {
  const userString = localStorage.getItem('user')
  const users = JSON.parse(userString)
  user.email = users.user.email
  user.user_id = users.user.id

  if (users.user.status_user === 'Directeur') {
    infossetup.nom = users.nomComplet_dir
    infossetup.telephone = users.telephone_dir
    directeur.id_dir = users.id
    if (users.grade_dir) {
      infossetup.grade = users.grade_dir
    }
    if (!users.grade_dir) {
      infossetup.grade = grades[0]
    }
  }
  if (users.user.status_user === 'AS') {
    infossetup.nom = users.nomComplet_scol
    infossetup.telephone = users.telephone_scol
    agentscolarite.id_scol = users.id
  }
  if (users.user.status_user === 'ADMIN') {
    infossetup.nom = users.nomComplet_admin
    infossetup.telephone = users.telephone_admin
    admin.id_admin = users.id
  }
  if (users.user.status_user === 'SECPAL') {
    infossetup.nom = users.nomComplet_scol
    infossetup.telephone = users.telephone_scol
    agentscolarite.id_scol = users.id
  }
  if (users.user.status_user === 'Etudiant') {
    infossetup.nom = users.nomComplet_etud
    infossetup.telephone = users.telephone_etud
    etudiant.id_etud = users.id
  }
  if (users.user.status_user === 'ENS') {
    infossetup.nom = users.nomComplet_ens
    infossetup.telephone = users.telephone_ens
    enseignant.id_ens = users.id
  }

})

function modifier() {  
  const userString = localStorage.getItem('user')
  const users = JSON.parse(userString)
  if (infossetup.nom || infossetup.telephone || infossetup.grade) {
    if (users.user.status_user === 'Directeur') {
      directeur.setDirecteur()
    }
    if (users.user.status_user === 'ADMIN') {
      admin.setAdmin()
    }
    if (users.user.status_user === 'AS') {
      agentscolarite.setAS()
    }
    if (users.user.status_user === 'SECPAL') {
      agentscolarite.setAS()
    }
    if (users.user.status_user === 'Etudiant') {
      etudiant.setEtudiant()
    }
    if (users.user.status_user === 'ENS') {
      enseignant.setEnseignant()
    }
  }
  if (user.email && !show.showMessageErrorEmail) {
    user.setUsers()
  }
}

function handleCopy(event) {
  event.preventDefault()
  event.clipboardData.setData('text/plain', '')
}

function onPhotoFileChange(event) {
  user.photo = event.target.files[0]
  user.photoName = event.target.files[0].name
}
</script>

<style scoped src="../styles/Configuration.css">

</style>
