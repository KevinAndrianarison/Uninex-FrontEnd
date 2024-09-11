<template>
  <div class="firstsetup">
    <div class="content">
      <div class="titre"><p>Configuration de votre plateforme.</p></div>
      <div class="form">
        <p class="infos">Informations sur votre établissement :</p>

        <div class="class formInput border-b border-gray-900/10 pb-12">
          <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900"
                >Nom de l'établissement</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  v-model="etablissement.nom_etab"
                  class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">Abréaviation</label>
              <div class="mt-2">
                <input
                  type="text"
                  v-model="etablissement.abr_etab"
                  class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">Slogan</label>
              <div class="mt-2">
                <input
                  type="text"
                  v-model="etablissement.slogan_etab"
                  class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">Description</label>

              <div class="mt-2">
                <textarea
                  type="text"
                  v-model="etablissement.descri_etab"
                  class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                ></textarea>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900"
                >Date de création</label
              >
              <div class="mt-2">
                <input
                  type="date"
                  v-model="etablissement.dateCreation_etab"
                  class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">Pays</label>
              <div class="mt-2">
                <input
                  type="text"
                  v-model="etablissement.pays_etab"
                  class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">Ville</label>
              <div class="mt-2">
                <input
                  type="text"
                  v-model="etablissement.ville_etab"
                  class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">Code postal</label>
              <div class="mt-2">
                <input
                  type="number"
                  v-model="etablissement.codePostal_etab"
                  class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900"
                >Adresse e-mail</label
              >
              <div class="mt-2">
                <input
                  @input="regex.RegexEmailDir(etablissement.email_etab)"
                  type="email"
                  v-model="etablissement.email_etab"
                  class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                />
              </div>
              <p class="err" v-if="show.showMessageErrorEmailDir">Adresse email invalide</p>
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900"
                >Mot de passe application Gmail</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  v-model="etablissement.mdpAppGmail_etab"
                  class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">Votre logo</label>
              <div class="mt-2">
                <div class="relative flex items-center">
                  <input
                    @change="onFileLogoChange"
                    class="absolute inset-0 opacity-0 cursor-pointer"
                    type="file"
                    accept="image/jpeg, image/png"

                  />
                  <div
                    class="file-label bg-green-100 text-green-800 py-2 px-4 rounded-md border border-green-300"
                  >
                    📂 Choisissez une image
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p class="infos">Créer une année universitaire :</p>

        <div class="class formInput border-b border-gray-900/10 pb-12">
          <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900"
                >Année de début</label
              >
              <div class="mt-2">
                <input
                  type="number"
                  maxlength="4"
                  @input="limitInputAUdebutLength"
                  v-model="au.annee_debut"
                  class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">Année de fin</label>
              <div class="mt-2">
                <input
                  type="number"
                  maxlength="4"
                  @input="limitInputAUfinLength"
                  v-model="au.annee_fin"
                  class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <p class="infos">Compte du directeur :</p>

        <div class="class formInput pb-10">
          <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="name" class="block text-sm font-medium leading-6 text-gray-900"
                >Nom complet</label
              >
              <div class="mt-2">
                <input
                  v-model="directeur.nomComplet_dir"
                  type="text"
                  class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                />
              </div>
            </div>

            <div class="sm:col-span-3 mr-4 ctgr">
              <label class="block text-sm font-medium leading-6 text-gray-900"
                >Titre académique</label
              >
              <div class="w-60">
                <Listbox v-model="directeur.grade_dir">
                  <div class="relative mt-2">
                    <ListboxButton
                      class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                    >
                      <span class="block truncate">{{ directeur.grade_dir }}</span>
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
            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900"
                >Adresse e-mail</label
              >
              <div class="mt-2">
                <input
                  @input="regex.RegexEmail(user.email)"
                  type="email"
                  v-model="user.email"
                  class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                />
              </div>
              <p class="err" v-if="show.showMessageErrorEmail">Adresse email invalide</p>
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">Télephone</label>
              <div class="mt-2">
                <input
                  type="number"
                  v-model="directeur.telephone_dir"
                  class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">Votre photo</label>
              <div class="mt-2">
                <div class="relative flex items-center">
                  <input
                    @change="onPhotoFileChange"
                    class="absolute inset-0 opacity-0 cursor-pointer"
                    type="file"
                    accept="image/jpeg, image/png"

                  />
                  <div
                    class="file-label bg-green-100 text-green-800 py-2 px-4 rounded-md border border-green-300"
                  >
                    📂 Choisissez une photo
                  </div>
                </div>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900"
                >Créer un mot de passe</label
              >
              <div class="mt-2 relative">
                <input
                  @input="regex.RegexPassword(user.password)"
                  :type="show.showCreatePassword ? 'text' : 'password'"
                  @copy="handleCopy"
                  v-model="user.password"
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

            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900"
                >Confirmer votre mot de passe</label
              >
              <div class="mt-2 relative">
                <input
                  @input="user.verifierPasword()"
                  :type="show.showVerifyPassword ? 'text' : 'password'"
                  v-model="user.passwordVerifier"
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
          </div>
        </div>
        <p class="msg border-t border-gray-900/10">
          *Veuillez remplir tous les champs pour pouvoir continuer !
        </p>
      </div>

      <div class="btn">
        <Button class="retour BTN" @click="testAnimation()">Retour</Button>
        <Button
          class="continuer BTNdiv"
          :disabled="
            !etablissement.nom_etab ||
            !etablissement.email_etab ||
            !au.annee_debut ||
            !au.annee_fin ||
            !directeur.nomComplet_dir ||
            !directeur.grade_dir ||
            !user.photo ||
            !user.password ||
            !user.passwordVerifier ||
            !etablissement.logo_etab ||
            show.showMessageErrorEmail ||
            show.showMessageErrorEmailDir ||
            show.showMessageErrorMdp ||
            show.showMessageErrorConfirmMdp
          "
          @click="etablissement.createfirstConfig()"
          >Continuer <ArrowRightIcon class="h-5 w-5 ml-2"
        /></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { EyeIcon, EyeSlashIcon, ArrowRightIcon } from '@heroicons/vue/24/solid'
import { useShow } from '@/stores/Show'
import { useAu } from '@/stores/Au'
import { useUser } from '@/stores/User'
import { useDirecteur } from '@/stores/Directeur'
import { useRegex } from '@/stores/Regex'
import { useEtablissement } from '@/stores/Etablissement'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
const show = useShow()
const directeur = useDirecteur()
const user = useUser()
const au = useAu()
const regex = useRegex()
const etablissement = useEtablissement()

const grades = ['Ingénieur', 'Docteur', 'Professeur']

function onFileLogoChange(event) {
  etablissement.logo_etab = event.target.files[0]
}

function onPhotoFileChange(event) {
  user.photo = event.target.files[0]
}

function handleCopy(event) {
  event.preventDefault()
  event.clipboardData.setData('text/plain', '')
}

function limitInputAUdebutLength(event) {
  const value = event.target.value
  if (value.length > 4) {
    event.target.value = value.slice(0, 4)
    au.annee_debut = event.target.value
  }
}

function limitInputAUfinLength(event) {
  const value = event.target.value
  if (value.length > 4) {
    event.target.value = value.slice(0, 4)
    au.annee_fin = event.target.value
  }
}

onBeforeMount(() => {
  directeur.grade_dir = grades[0]
})

function testAnimation() {
  show.showHome = true
  show.showFirstConfig = false
}
</script>

<style scoped src="../styles/FirstSetup.css"></style>
