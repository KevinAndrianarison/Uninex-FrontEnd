<template>
  <div :class="theme.theme === 'light' ? 'mention' : 'mention !bg-gray-600 !text-white'">
    <div class="flex items-center mb-2 justify-between">
      <h1 class="titre font-bold">
        <font-awesome-icon class="h-7 w-7 mr-5" :icon="['fas', 'clipboard-check']" />
        Mentions
      </h1>
      <div class="flex items-center gap-2">
        <p class="font-bold">Année universitaire :</p>
        <Listbox v-model="au.oneAU">
          <div class="relative w-40">
            <ListboxButton
              :class="theme.theme === 'light' ? '' : '!bg-gray-300 '"
              class="text-black relative w-full border border-blue-300 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            >
              <span class="block truncate">{{ au.oneAU }}</span>
              <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
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
                class="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
              >
                <ListboxOption
                  v-slot="{ active, selected }"
                  :key="index"
                  v-for="(AU, index) in au.listeAU"
                  :value="AU.annee_debut + '-' + AU.annee_fin"
                  as="template"
                >
                  <li
                    class="leftLi"
                    :class="[
                      au.oneAU === AU.annee_debut + '-' + AU.annee_fin
                        ? 'bg-amber-100 text-amber-900'
                        : '',
                      'relative cursor-default  text-center select-none py-2 '
                    ]"
                  >
                    <span
                      class="spanAU"
                      :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']"
                      >{{ AU.annee_debut }} - {{ AU.annee_fin }}
                    </span>
                    <span
                      v-if="selected"
                      class="absolute inset-y-0 left-0 flex items-left pl-3 text-amber-600"
                    >
                    </span>
                    <span
                      v-if="au.oneAU === AU.annee_debut + '-' + AU.annee_fin"
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

    <div :class="theme.theme === 'light' ? 'createMention' : '!bg-gray-600 !text-gray-200'">
      <h1 class="create pl-5 mt-2">Ajouter une nouvelle Mention :</h1>
      <div class="class formInput border-gray-900/10 pb-5 pl-5">
        <div class="sm:col-span-3 mt-2 mr-4">
          <label class="block text-sm font-medium leading-6">Nom de la mention</label>
          <div class="mt-2">
            <input
              type="text"
              v-model="mention.nom_mention"
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
              v-model="mention.abr_mention"
              :class="theme.theme === 'light' ? '' : '!bg-gray-300'"
              class="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
            />
          </div>
        </div>

        <div class="check mr-4" :key="index" v-for="(niv, index) in niveau.ListNiveau">
          <div>
            <label class="text-sm font-bold leading-6">{{ niv.nom_niveau }}</label>
            <input
              :value="{ id: niv.id, abr: niv.abr_niveau }"
              v-model="niveau.NiveauChecked"
              class="ml-1"
              type="checkbox"
            />
          </div>
        </div>

        <div class="divbtn text-black sm:col-span-3 mt-3">
          <Button
            @click="mention.postMentionByNiveau()"
            :disabled="!mention.nom_mention || !mention.abr_mention || !niveau.NiveauChecked.length"
            class="btn font-bold"
          >
            Valider</Button
          >
        </div>
      </div>
    </div>
    <div class="listMention">
      <div class="w-52 mr-4 mt-3" :key="index" v-for="(niv, index) in niveau.ListNiveau">
        <Disclosure v-slot="{ open }">
          <DisclosureButton
            @click="() => handleDisclosureClick(niv.id, open)"
            class="flex w-full justify-between rounded-lg bg-yellow-100 px-4 py-2 text-left text-lm font-black text-black hover:bg-yellow-200 focus:outline-none focus-visible:ring focus-visible:ring-yellow-500/75"
          >
            <span class="span"
              >Mentions
              <p class="ml-2">{{ niv.abr_niveau }}</p></span
            >
            <Tooltip content="Voir les mentions ">
              <font-awesome-icon class="h-5 w-5 text-yellow-500" :icon="['fas', 'angles-right']" />
            </Tooltip>
          </DisclosureButton>
          <DisclosurePanel v-if="activeDisclosure === niv.id" class="DisclosurePanel mt-2 text-sm">
            <div
              class="flex listNiv py-1 gap-2 items-center justify-center"
              :key="index"
              v-for="(mnt, index) in mention.ListMention"
            >
              <p class="truncate">{{ mnt.nom_mention }} / {{ mnt.abr_mention }}</p>
              <TrashIcon
                class="h-5 w-4 text-red-500"
                @click="deleteMention(mnt.abr_mention, mnt.id)"
              />
            </div>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNiveau } from '@/stores/Niveau'
import { useMention } from '@/stores/Mention'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useShow } from '@/stores/Show'
import { ref, onMounted } from 'vue'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import Tooltip from '../../components/Tooltip.vue'
import { useTheme } from '@/stores/Theme'
import { useAu } from '@/stores/Au'

const niveau = useNiveau()
const mention = useMention()
const show = useShow()
const theme = useTheme()
const au = useAu()

const activeDisclosure = ref(null)
const tooltipTarget = ref(null)

onMounted(() => {
  mention.nom_mention = ''
  if (tooltipTarget.value) {
    tippy(tooltipTarget.value, {
      content: 'Je suis un tooltip !',
      theme: 'light'
    })
  }
})

function deleteMention(mention_abr, id) {
  mention.mention.abr_mention = mention_abr
  mention.mention.id_mention = id
  show.showDeleteMention = true
}

function handleDisclosureClick(id, open) {
  if (!open) {
    activeDisclosure.value = id
    getById(id)
  } else {
    activeDisclosure.value = null
  }
}

function getById(id) {
  mention.ListMention = []
  niveau.niveau.id_niveau = id
  mention.getByAuId()
}
</script>

<style scoped src="../../styles/GestionMention.css"></style>
