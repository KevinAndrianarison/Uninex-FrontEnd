<template>
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton class="compte w-[170px] text-sm">
          <UserCircleIcon class="h-5 w-5 mr-2" />
          Comptes
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
              <RouterLink to="/directeur/GestionAgentScolarite">
                <button
                  class="btndrop"
                  :class="[active ? 'bg-[#FDCB6E]' : '', 'w-[99%] rounded-sm px-2 py-2 text-sm']"
                >
                  <EditIcon
                    :active="active"
                    class="mr-2 h-5 w-5 text-violet-400"
                    aria-hidden="true"
                  />
                  <font-awesome-icon class="h-5 w-5 mr-2" :icon="['fas', 'person-chalkboard']" />
                  Scolarité
                </button>
              </RouterLink>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <RouterLink to="/directeur/GestionEnseignant">
                <button
                  class="btndrop"
                  :class="[active ? 'bg-[#FDCB6E]' : '', 'w-[99%] rounded-sm px-2 py-2 text-sm']"
                >
                  <DuplicateIcon
                    :active="active"
                    class="mr-2 h-5 w-5 text-violet-400"
                    aria-hidden="true"
                  />
                  <font-awesome-icon :icon="['fas', 'user-tie']" class="h-4 w-5 mr-2" />
  
                  Enseignants
                </button>
              </RouterLink>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <RouterLink to="/Utilisateurs">
                <button
                  class="btndrop"
                  :class="[active ? 'bg-[#FDCB6E]' : '', 'w-[99%] rounded-sm px-2 py-2 text-sm']"
                >
                  <DuplicateIcon
                    :active="active"
                    class="mr-2 h-5 w-5 text-violet-400"
                    aria-hidden="true"
                  />
                  <font-awesome-icon :icon="['fas', 'users']" class="h-4 w-5 mr-2" />
  
                  Utilisateurs
                </button>
              </RouterLink>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
    <Menu as="div" class="inline-block text-left">
      <div>
        <MenuButton class="compte w-[170px] text-sm">
          <AcademicCapIcon class="h-5 w-5 mr-2" />
          Pédagogie
          <ChevronDownIcon
            class="ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
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
          class="z-10 absolute ml-[80px] w-[200px] divide-gray-100 rounded-sm bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          <div :class="theme.theme === 'light' ? 'px-1 py-1' : 'px-1 py-1  !bg-gray-500'">
            <MenuItem v-slot="{ active }">
              <button
                class="btndrop"
                @click="showCreateNiveau()"
                :class="[active ? 'bg-[#FDCB6E]' : '', 'w-[99%] rounded-sm px-2 py-2 text-sm']"
              >
                <EditIcon :active="active" class="mr-2 h-5 w-5 text-violet-400" aria-hidden="true" />
                <font-awesome-icon class="h-4 w-5 mr-2" :icon="['fas', 'folder-tree']" /> Niveau
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <RouterLink to="/directeur/GestionMention">
                <button
                  class="btndrop"
                  :class="[
                    active ? 'bg-[#FDCB6E]' : '',
                    'w-[99%] rounded-sm px-2 py-2 text-sm'
                  ]"
                >
                  <DuplicateIcon
                    :active="active"
                    class="mr-2 h-5 w-5 text-violet-400"
                    aria-hidden="true"
                  />
                  <font-awesome-icon class="h-4 w-5 mr-2" :icon="['fas', 'clipboard-check']" />
                  Mentions
                </button>
              </RouterLink>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <RouterLink to="/directeur/GestionParcours">
                <button
                  class="btndrop"
                  :class="[
                    active ? 'bg-[#FDCB6E]' : '',
                    'w-[99%] rounded-sm px-2 py-2 text-sm'
                  ]"
                >
                  <DuplicateIcon
                    :active="active"
                    class="mr-2 h-5 w-5 text-violet-400"
                    aria-hidden="true"
                  />
                  <font-awesome-icon class="h-4 w-5 mr-2" :icon="['fas', 'clipboard-check']" />
                  Parcours
                </button>
              </RouterLink>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                class="btndrop"
                @click="createSemestre()"
                :class="[
                  active ? 'bg-[#FDCB6E]' : '',
                  'w-[99%] rounded-sm px-2 py-2 text-sm'
                ]"
              >
                <DuplicateIcon
                  :active="active"
                  class="mr-2 h-5 w-5 text-violet-400"
                  aria-hidden="true"
                />
                <font-awesome-icon class="h-4 w-5 mr-2" :icon="['fas', 'chart-pie']" />
                Semestres
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
    <RouterLink to="/directeur/GestionRole">
      <li>
        <CheckBadgeIcon class="h-5 w-5 mr-2" />
        Rôles
      </li>
    </RouterLink>
  </template>
  
  <script setup>
  import { CheckBadgeIcon, AcademicCapIcon, UserCircleIcon, UserGroupIcon } from '@heroicons/vue/24/outline'
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
  import { useNiveau } from '@/stores/Niveau'
  import { useShow } from '@/stores/Show'
  import { useTheme } from '@/stores/Theme'
  
  const show = useShow()
  const theme = useTheme()
  const niveau = useNiveau()
  
  function showCreateNiveau() {
    show.showCreateNiveau = true
    niveau.getByAuId()
  }
  
  function createSemestre() {
    show.showCreateSemestre = true
  }
  </script>
  
  <style scoped src="../../styles/Dashboard.css"></style>
  