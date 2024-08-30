<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="compte w-[170px] text-sm">
        <BriefcaseIcon class="h-5 w-5 mr-2" />
        Etudiants
        <ChevronDownIcon
          class="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
          aria-hidden="true"
        />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="z-20 absolute ml-[80px] w-[200px] divide-gray-100 rounded-sm bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
      >
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <RouterLink to="/agentScolarite/GestionInscription">
              <button
                class="btndrop"
                :class="[
                  active ? 'bg-[#FDCB6E]' : 'text-gray-900',
                  'w-[99%] rounded-sm px-2 py-2 text-sm'
                ]"
              >
                <EditIcon
                  :active="active"
                  class="mr-2 h-5 w-5 text-violet-400"
                  aria-hidden="true"
                />
                <font-awesome-icon class="h-4 w-5 mr-2" :icon="['fas', 'paperclip']" />
                Inscriptions
              </button>
            </RouterLink>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <RouterLink to="/agentScolarite/GestionReinscription">
              <button
                class="btndrop"
                :class="[
                  active ? 'bg-[#FDCB6E]' : 'text-gray-900',
                  'w-[99%] rounded-sm px-2 py-2 text-sm'
                ]"
              >
                <DuplicateIcon
                  :active="active"
                  class="mr-2 h-5 w-5 text-violet-400"
                  aria-hidden="true"
                />
                <font-awesome-icon :icon="['fas', 'rotate-right']" class="h-4 w-5 mr-2" />

                Réinscriptions
              </button>
            </RouterLink>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <RouterLink to="/agentScolarite/GestionNotes">
              <button
                class="btndrop"
                :class="[
                  active ? 'bg-[#FDCB6E]' : 'text-gray-900',
                  'w-[99%] rounded-sm px-2 py-2 text-sm'
                ]"
              >
                <DuplicateIcon
                  :active="active"
                  class="mr-2 h-5 w-5 text-violet-400"
                  aria-hidden="true"
                />
                <font-awesome-icon :icon="['fas', 'folder-open']" class="h-4 w-5 mr-2" />

                Notes
              </button>
            </RouterLink>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { UserCircleIcon, BriefcaseIcon } from '@heroicons/vue/24/outline'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

</script>

<style src="../../styles/Dashboard.css" scoped></style>
