<script setup>
import { useShow } from '@/stores/Show'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'
import { useNiveau } from '@/stores/Niveau'
import { useAu } from '@/stores/Au'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { TrashIcon } from '@heroicons/vue/24/outline'

const show = useShow()
const au = useAu()
const niveau = useNiveau()

function deleteNiveau(nom, id) {
  niveau.niveau.nom_niveau = nom
  niveau.niveau.id_niveau = id
  show.showDeleteNiveau = true
}

function closeCreateNiveau() {
  show.showCreateNiveau = false
  niveau.nom_niveau = ''
  niveau.abr_niveau = ''
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showCreateNiveau">
      <div class="formModals">
        <div class="divbtn">
          <button type="button" class="Annullers" @click="closeCreateNiveau()">
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>
        <p class="infos">Nouveau niveau pour {{ au.oneAU }} :</p>
        <div class="class formInput mt-4">
          <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">Nom du niveau</label>
              <div class="mt-2">
                <input
                  type="text"
                  v-model="niveau.nom_niveau"
                  class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label class="block text-sm font-medium leading-6 text-gray-900">Abréviation</label>
              <div class="mt-2">
                <input
                  type="text"
                  v-model="niveau.abr_niveau"
                  class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="valide">
          <button
            type="submit"
            :disabled="!niveau.nom_niveau || !niveau.abr_niveau"
            @click="niveau.createNiveau()"
            class="Modifie btn btn-primary mt-4"
          >
            Valider
          </button>
        </div>
        <div class="w-full mt-3" v-if="niveau.ListNiveau.length !== 0">
          <Disclosure v-slot="{ open }">
            <DisclosureButton
              class="flex w-full justify-between rounded-lg bg-yellow-100 px-4 py-2 text-left text-lm font-black text-black hover:bg-yellow-200 focus:outline-none focus-visible:ring focus-visible:ring-yellow-500/75"
            >
              <span>Voir la liste des niveaux ?</span>
              <ChevronUpIcon
                :class="open ? 'rotate-180 transform' : ''"
                class="h-5 w-5 text-yellow-500"
              />
            </DisclosureButton>
            <DisclosurePanel class="DisclosurePanel mt-2 text-sm text-gray-500">
              <div class="listNiv" :key="index" v-for="(niv, index) in niveau.ListNiveau">
                {{ niv.nom_niveau }}
                <TrashIcon
                  @click="deleteNiveau(niv.nom_niveau, niv.id)"
                  class="deletes h-6 w-5 ml-3 pb-1"
                />
              </div>
            </DisclosurePanel>
          </Disclosure>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
