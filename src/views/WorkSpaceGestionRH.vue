<script setup>
import TotalUserChef from '@/components/TotalUserChef.vue'
import TotalUserChefParc from '@/components/TotalUserChefParc.vue'
import TotalUserAS from '@/components/TotalUserAS.vue'
import TotalUserEtud from '@/components/TotalUserEtud.vue'
import TotalUserEns from '@/components/TotalUserEns.vue'
import Tooltip from '../components/Tooltip.vue'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { UserGroupIcon } from '@heroicons/vue/24/outline'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { onBeforeMount } from 'vue'
import { useEnseignant } from '@/stores/Enseignant'
import { useAgentscolarite } from '@/stores/Agentscolarite'
import { useUrl } from '@/stores/url'

const enseignant = useEnseignant()
const agentscolarite = useAgentscolarite()
const URL = useUrl().url

onBeforeMount(() => {
  enseignant.getAllENS()
  agentscolarite.getAllAS()
})
</script>

<template>
  <Sheet> </Sheet>
  <div class="max-h-[85vh] overflow-y-auto">
    <h1 class="titre font-bold">
      <UserGroupIcon class="h-7 w-7 mr-5" />
      Gestion RH
    </h1>
    <div class="head flex flex-wrap gap-4 justify-center">
      <TotalUserChef nombre="11" />
      <TotalUserChefParc nombre="12" />
      <TotalUserEns :nombre="enseignant.ListeENS.length" />
      <TotalUserAS :nombre="agentscolarite.ListeAS.length" />
      <TotalUserEtud nombre="15" />
    </div>
    <div class="mt-4 focus:outline-none flex items-center justify-center gap-4">
      <Select>
        <SelectTrigger class="w-[250px] select-trigger">
          <SelectValue class="font-bold focus:outline-none" placeholder="Selectionner le rôle" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="blueberry"> Enseignant</SelectItem>
            <SelectItem value="grapes"> Agent de la scolarité </SelectItem>
            <SelectItem value="pineapple"> Etudiant </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div class="flex h-10 border">
        <p class="w-10 bg-blue-500 flex items-center justify-center">
          <font-awesome-icon
            class="text-white cursor-pointer w-5 h-4"
            :icon="['fas', 'magnifying-glass']"
          />
        </p>
        <input
          class="focus:outline-none px-2 w-[300px] animation focus:border focus:border-blue-500"
          placeholder="Rechercher ici"
          type="text"
        />
      </div>
      <Tooltip content="Filtrer">
        <font-awesome-icon
          class="cursor-pointer w-6 h-8 bg-gray-200 rounded-sm px-2"
          :icon="['fas', 'arrow-down-a-z']"
      /></Tooltip>
    </div>
    <div
      :key="index"
      v-for="(ens, index) in enseignant.ListeENS"
      class="border mt-4 flex h-24 bg-white rounded-lg items-center px-2"
    >
      <div class="w-[90%] flex gap-4 items-center">
        <div
          :style="{
            'background-image': 'url(' + `${URL}/storage/users/${ens.user.photo_name} ` + ')',
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
            <p class="bg-gray-200 text-xs text-center font-bold p-1 px-1.5 rounded-md">
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
              ><font-awesome-icon class="cursor-pointer mr-2" :icon="['fas', 'circle-info']" /> Voir
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle>Informations sur l'utilisateur</SheetTitle>
            <div class="flex items-center gap-4 mt-4">
              <div
                :style="{
                  'background-image': 'url(' + `${URL}/storage/users/${ens.user.photo_name} ` + ')',
                  'background-size': 'cover',
                  'background-position': 'center'
                }"
                class="w-12 h-12 rounded-3xl"
              ></div>
              <div>
                <p>{{ ens.nomComplet_ens }}</p>
                <div class="text-xs flex">
                  <p>Etudiant &nbsp;</p>
                  <p v-if="ens.chefParcours_status === '1'" class="text-green-600">
                    - Chef de parcours &nbsp;
                  </p>
                  <p v-if="ens.chefMention_status === '1'" class="text-blue-600">
                    - Chef de mention &nbsp;
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-4 flex flex-col">
              <div class="bg-gray-100 rounded-lg flex p-2 gap-2">
                <p class="w-8 flex items-center justify-center">
                  <font-awesome-icon class="cursor-pointer mr-2" :icon="['fas', 'user-pen']" />
                </p>
                <div>
                  <p class="text-gray-600">Nom complet</p>
                  <input
                    type="text"
                    v-model="ens.nomComplet_ens"
                    class="w-60 bg-gray-100 focus:outline-none py-1 text-sm"
                  />
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <button class="bg-red-500 text-white py-2 rounded-sm">
          <font-awesome-icon class="cursor-pointer mr-2" :icon="['fas', 'trash-can']" />Supprimer
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.titre {
  font-size: 26px;
  font-family: 'Montserrat', 'sans-serif';
  display: flex;
  align-items: center;
}

.select-trigger:focus {
  outline: none;
  box-shadow: none;
}
</style>
