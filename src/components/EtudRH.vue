<script setup>
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useUrl } from '@/stores/url'

const URL = useUrl().url

defineProps({
  etudiants: {
    type: Array,
    default: () => []
  },
  putNomEtud: Function,
  putNumberEtud: Function,
  putEmailEns: Function,
  disableUser: Function,
  ableUser: Function,
  showdeleteEtud: Function
})
</script>

<template>
  <div
    :key="index"
    v-for="(etud, index) in etudiants"
    class="border mt-4 flex h-24 bg-white rounded-lg items-center px-2"
  >
    <div class="w-[90%] flex gap-4 items-center">
      <div
        :style="{
          'background-image': 'url(' + `${URL}/storage/users/${etud.user.photo_name} ` + ')',
          'background-size': 'cover',
          'background-position': 'center'
        }"
        class="w-12 h-12 rounded-3xl"
      ></div>
      <div class="flex flex-col gap-2">
        <p class="font-bold">{{ etud.nomComplet_etud }}</p>
        <div class="flex gap-2">
          <p class="bg-gray-200 text-xs text-gray-600 font-bold text-center p-1 px-1.5 rounded-md">
            Etudiant
          </p>
          <p
            class="bg-green-200 text-xs text-green-600 font-bold text-center p-1 px-1.5 rounded-md"
          >
            {{ etud.semestre[0].parcour.abr_parcours }}
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
            ><font-awesome-icon class="cursor-pointer" :icon="['fas', 'circle-info']" /> Voir
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Informations sur l'utilisateur</SheetTitle>
          <div class="flex items-center gap-4 mt-4">
            <div
              :style="{
                'background-image': 'url(' + `${URL}/storage/users/${etud.user.photo_name} ` + ')',
                'background-size': 'cover',
                'background-position': 'center'
              }"
              class="w-12 h-12 rounded-3xl"
            ></div>
            <div>
              <div class="flex gap-2 flex-wrap justify-between items-center">
                <p>{{ etud.nomComplet_etud }}</p>
                <p
                  v-if="etud.user.validiter_compte === 'true'"
                  class="text-xs bg-green-500 text-white py-0.5 px-1.5 rounded-sm flex items-center"
                >
                  <font-awesome-icon
                    class="cursor-pointer mr-1 text-blue-500 h-2"
                    :icon="['fas', 'circle']"
                  />Compte actif
                </p>
                <p
                  v-if="etud.user.validiter_compte !== 'true'"
                  class="text-xs bg-red-500 text-white py-0.5 px-1.5 rounded-sm flex items-center"
                >
                  <font-awesome-icon
                    class="cursor-pointer mr-1 text-white h-2"
                    :icon="['fas', 'circle']"
                  />Compte désactivé
                </p>
              </div>
              <div class="text-xs flex">
                <p v-if="etud.status_etud === 1" class="text-green-600">Passant &nbsp;</p>
                <p v-if="etud.status_etud === 0" class="text-blue-600">Redoublant &nbsp;</p>
                <p>({{ etud.semestre[0].parcour.abr_parcours }})</p>
              </div>
            </div>
          </div>
          <div class="mt-4 flex flex-col gap-2">
            <div class="bg-gray-100 rounded-lg flex p-2 gap-2">
              <p class="w-8 flex items-center justify-center">
                <font-awesome-icon class="cursor-pointer mr-2" :icon="['fas', 'user-pen']" />
              </p>
              <div>
                <p class="text-gray-600">Nom complet</p>
                <input
                  type="text"
                  v-model="etud.nomComplet_etud"
                  @blur="
                    (e) => {
                      putNomEtud(e.target.value, etud.id)
                    }
                  "
                  @keydown.enter="
                    (e) => {
                      putNomEtud(e.target.value, etud.id)
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
                  v-model="etud.telephone_etud"
                  @blur="
                    (e) => {
                      putNumberEtud(e.target.value, etud.id)
                    }
                  "
                  @keydown.enter="
                    (e) => {
                      putNumberEtud(e.target.value, etud.id)
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
                  v-model="etud.user.email"
                  @blur="
                    (e) => {
                      putEmailEns(e.target.value, etud.user.id)
                    }
                  "
                  @keydown.enter="
                    (e) => {
                      putEmailEns(e.target.value, etud.id)
                    }
                  "
                  class="w-60 bg-gray-100 focus:outline-none py-1 text-sm"
                />
              </div>
            </div>
          </div>
          <div class="bg-blue-100 mt-4 p-2 pb-4 rounded">
            <h1 class="font-bold flex items-center">
              <font-awesome-icon class="cursor-pointer mr-2" :icon="['fas', 'circle-info']" />
              Plus d'informations
            </h1>
            <div class="flex flex-col gap-2 mt-2 text-xs">
              <p><b>Adresse :</b> {{ etud.adresse_etud ? etud.adresse_etud : '...' }}</p>
              <p>
                <b>Date de naissance :</b>
                {{ etud.date_naissance_etud ? etud.date_naissance_etud : '...' }}
              </p>
              <p>
                <b>Lieu de naissance :</b>
                {{ etud.lieux_naissance_etud ? etud.lieux_naissance_etud : '...' }}
              </p>
              <p>
                <b>Numéros de matricule :</b> {{ etud.matricule_etud ? etud.matricule_etud : '...' }}
              </p>
              <p>
                <b>Nationalité :</b> {{ etud.nationalite_etud ? etud.nationalite_etud : '...' }}
              </p>
              <div class="flex items-center gap-2">
                <p class="font-bold">Inscription :</p>
                <p v-if="etud.validiter_inscri === 'true'" class="text-green-500">Déjas inscrit</p>
                <p v-if="etud.validiter_inscri !== 'true'" class="text-red-500">
                  Pas encore inscrit
                </p>
              </div>
            </div>
          </div>
          <button
            v-if="etud.user.validiter_compte === 'true'"
            class="bg-red-500 mt-4 w-full py-2 rounded text-white flex justify-center items-center"
            @click="() => disableUser(etud.user.id)"
          >
            <font-awesome-icon class="cursor-pointer mr-2" :icon="['fas', 'ban']" />Désactiver ce
            compte
          </button>
          <button
            @click="() => ableUser(etud.user.id)"
            v-if="etud.user.validiter_compte !== 'true'"
            class="bg-white border border-yellow-500 mt-4 w-full py-2 rounded text-yellow-500 flex justify-center items-center"
          >
            <font-awesome-icon class="cursor-pointer mr-2" :icon="['fas', 'unlock']" />Activer ou
            re-activer le compte
          </button>
        </SheetContent>
      </Sheet>

      <button
        @click="() => showdeleteEtud(etud.user.id)"
        class="bg-red-500 text-white py-2 rounded-sm"
      >
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
