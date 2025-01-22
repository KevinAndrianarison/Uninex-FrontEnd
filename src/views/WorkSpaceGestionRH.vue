<script setup>
import TotalUserChef from '@/components/TotalUserChef.vue'
import TotalUserChefParc from '@/components/TotalUserChefParc.vue'
import TotalUserAS from '@/components/TotalUserAS.vue'
import TotalUserEtud from '@/components/TotalUserEtud.vue'
import TotalUserEns from '@/components/TotalUserEns.vue'
import Tooltip from '../components/Tooltip.vue'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { UserGroupIcon } from '@heroicons/vue/24/outline'
import { Camera } from 'lucide-vue-next'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ref } from 'vue'

const isSheetOpen = ref(false)
</script>

<template>
  <Sheet v-model="isSheetOpen">
    <SheetTrigger as-child>
      <Button variant="outline"> Open </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when you're done.
        </SheetDescription>
      </SheetHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">Name</div>
        <div class="grid grid-cols-4 items-center gap-4">Username</div>
      </div>
      <SheetFooter>
        <SheetClose as-child>
          <Button type="submit"> Save changes </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>

  <!-- <Camera color="red" :size="32" /> -->
  <div class="max-h-[85vh] overflow-y-auto">
    <h1 class="titre font-bold">
      <UserGroupIcon class="h-7 w-7 mr-5" />
      Gestion RH
    </h1>
    <div class="head flex flex-wrap gap-4 justify-center">
      <TotalUserChef nombre="11" />
      <TotalUserChefParc nombre="12" />
      <TotalUserEns nombre="14" />
      <TotalUserAS nombre="13" />
      <TotalUserEtud nombre="15" />
    </div>
    <div class="mt-4 focus:outline-none flex items-center justify-center gap-4">
      <Select>
        <SelectTrigger class="w-[250px] select-trigger">
          <SelectValue class="font-bold focus:outline-none" placeholder="Selectionner le rôle" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="apple"> Chef de mention </SelectItem>
            <SelectItem value="banana"> Chef de parcours </SelectItem>
            <SelectItem value="blueberry"> Enseignant</SelectItem>
            <SelectItem value="grapes"> Agent de la scolarité </SelectItem>
            <SelectItem value="pineapple"> Etudiant </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div class="flex h-10 border">
        <p class="w-10 bg-blue-500 flex items-center justify-center">
          <font-awesome-icon
            @click="removeFile"
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
          @click="removeFile"
          class="cursor-pointer w-6 h-8 bg-gray-200 rounded-sm px-2"
          :icon="['fas', 'arrow-down-a-z']"
      /></Tooltip>
    </div>
    <div class="border mt-4 flex h-20 bg-white rounded-lg items-center px-2">
      <div class="w-[90%] flex gap-4">
        <div class="w-12 h-12 bg-gray-200 rounded-3xl"></div>
        <div>
          <p class="font-bold">ANDRIANARISON Steeve</p>
          <p>Etudiant</p>
        </div>
      </div>
      <div class="w-[10%] flex flex-col text-xs gap-1">
        <button
          @click="isSheetOpen = true"
          class="bg-yellow-500 text-black font-bold py-1.5 rounded-sm"
        >
          <font-awesome-icon class="cursor-pointer mr-2" :icon="['fas', 'circle-info']" />Voir
        </button>
        <button class="bg-red-500 text-white py-1.5 rounded-sm">
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
