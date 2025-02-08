<script setup>
import { useShow } from '@/stores/Show'
import { useAu } from '@/stores/Au'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/stores/Theme'

const show = useShow()
const au = useAu()
const theme = useTheme()

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

function closeCreateAU() {
  show.showCreateAU = false
  au.annee_debut = null
  au.annee_fin = null
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showCreateAU">
      <div :class="theme.theme === 'light' ? 'formModal' : 'formModal !bg-gray-600 !text-white'">
        <div class="divbtn">
          <button type="button" class="Annullers" @click="closeCreateAU()">
            <XMarkIcon :class="theme.theme === 'light' ? '' : '!text-red-500'" class="h-6 w-6" />
          </button>
        </div>
        <p class="infos">Nouvelle année universitaire :</p>
        <div class="class formInput mt-4">
          <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6">Année de début</label>
              <div class="mt-2">
                <input
                  type="number"
                  maxlength="4"
                  @input="limitInputAUdebutLength"
                  v-model="au.annee_debut"
                  :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                  class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6">Année de fin</label>
              <div class="mt-2">
                <input
                  type="number"
                  maxlength="4"
                  @input="limitInputAUfinLength"
                  v-model="au.annee_fin"
                  :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
                  class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="valide">
          <button
            type="submit"
            :disabled="!au.annee_debut || !au.annee_fin"
            @click="au.createAU()"
            class="Modifie btn btn-primary mt-4"
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
