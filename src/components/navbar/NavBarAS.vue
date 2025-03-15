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
        <div :class="theme.theme === 'light' ? 'px-1 py-1' : 'px-1 py-1  !bg-gray-500'">
          <MenuItem v-slot="{ active }">
            <RouterLink to="/agentScolarite/GestionInscription">
              <button
                class="btndrop"
                :class="[active ? 'bg-[#FDCB6E]' : '', 'w-[99%] rounded-sm px-2 py-2 text-sm']"
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
            <RouterLink to="/ListeEtudiant">
              <button
                class="btndrop"
                :class="[active ? 'bg-[#FDCB6E]' : '', 'w-[99%] rounded-sm px-2 py-2 text-sm']"
              >
                <DuplicateIcon
                  :active="active"
                  class="mr-2 h-5 w-5 text-violet-400"
                  aria-hidden="true"
                />
                <font-awesome-icon :icon="['fas', 'list-ul']" class="h-4 w-5 mr-2" />

                Listes des étudiants
              </button>
            </RouterLink>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <RouterLink to="/agentScolarite/GestionNotes">
              <button
                class="btndrop"
                :class="[active ? 'bg-[#FDCB6E]' : '', 'w-[99%] rounded-sm px-2 py-2 text-sm']"
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
  <li @click="showCreateSalle"><HomeModernIcon class="h-5 w-5 mr-2" /> Salles</li>
  <RouterLink to="/agentScolarite/GestionEDP">
    <li><CalendarDaysIcon class="h-5 w-5 mr-2" /> Emplois du temps</li>
  </RouterLink>
  <RouterLink  to="/agentScolarite/GestionFinanciere">
    <li v-if="show.showNavBarSECPAL">
      <PresentationChartLineIcon class="h-5 w-5 mr-2" /> Gestion financière
    </li>
  </RouterLink>
  <RouterLink to="/agentScolarite/Commande">
    <li><InboxArrowDownIcon class="h-5 w-5 mr-2" /> Commandes</li>
  </RouterLink>
  <RouterLink to="/agentScolarite/EtatsFinanciers">
    <li><PresentationChartLineIcon class="h-5 w-5 mr-2" /> États financiers</li>
  </RouterLink>
  <RouterLink to="/DemandeConge">
    <li><ClipboardDocumentCheckIcon class="h-5 w-5 mr-2" />Demande de congé</li>
  </RouterLink>
</template>
<script setup>
import {
  HomeModernIcon,
  BriefcaseIcon,
  PresentationChartLineIcon,
  CalendarDaysIcon,
  InboxArrowDownIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/vue/24/outline'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useShow } from '@/stores/Show'
import { useSalle } from '@/stores/salle'
import { useTheme } from '@/stores/Theme'

const show = useShow()
const salles = useSalle()
const theme = useTheme()

function showCreateSalle() {
  show.showCreateSalle = true
  salles.getallSalle()
}
</script>

<style src="../../styles/Dashboard.css" scoped></style>
