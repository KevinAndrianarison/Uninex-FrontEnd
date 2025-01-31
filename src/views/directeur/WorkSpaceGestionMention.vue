<template>
  <div :class="theme.theme === 'light' ? 'mention' : 'mention !bg-gray-600 !text-white'">
    <h1 class="titre">
      <font-awesome-icon class="h-7 w-7 mr-5" :icon="['fas', 'clipboard-check']" />
      Mentions
    </h1>
    <div :class="theme.theme === 'light' ? 'createMention' : '!bg-gray-600 !text-gray-200'">
      <h1 class="create pl-5 mt-2">Ajouter une nouvelle Mention :</h1>
      <div class="class formInput border-gray-900/10 pb-5 pl-5">
        <div class="sm:col-span-3 mt-2 mr-4">
          <label class="block text-sm font-medium leading-6 ">Nom de la mention</label>
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
          <label class="block text-sm font-medium leading-6 ">Abréviation</label>
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
            <label class="text-sm font-bold leading-6 ">{{ niv.nom_niveau }}</label>
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
          <DisclosurePanel
            v-if="activeDisclosure === niv.id"
            class="DisclosurePanel mt-2 text-sm "
          >
            <div class="listNiv truncate" :key="index" v-for="(mnt, index) in mention.ListMention">
              {{ mnt.nom_mention }} / {{ mnt.abr_mention }}
              <TrashIcon
                class="deletes h-6 w-5 ml-3 pb-1"
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
import { useShow } from '@/stores/Show'
import { ref, onMounted } from 'vue'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import Tooltip from '../../components/Tooltip.vue'
import { useTheme } from '@/stores/Theme'

const niveau = useNiveau()
const mention = useMention()
const show = useShow()
const theme = useTheme()

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
