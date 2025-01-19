<script setup>
import { useShow } from '@/stores/Show'
import { useNiveau } from '@/stores/Niveau'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useEtudiant } from '@/stores/Etudiant'
import { useUrl } from '@/stores/url'
import { useTheme } from '@/stores/Theme'
const URL = useUrl().url

const show = useShow()
const niveau = useNiveau()
const etudiant = useEtudiant()
const theme = useTheme()

function closeCreateNiveau() {
  show.showEtudiantInfos = false
  niveau.nom_niveau = ''
  niveau.abr_niveau = ''
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showEtudiantInfos">
      <div
        :class="
          theme.theme === 'light'
            ? 'formModalsInfosEtud'
            : 'formModalsInfosEtud !bg-gray-600 !text-white'
        "
      >
        <div class="divbtn">
          <button type="button" class="Annullers" @click="closeCreateNiveau()">
            <XMarkIcon :class="theme.theme === 'light' ? '' : 'text-red-500'" class="h-6 w-6" />
          </button>
        </div>
        <p class="infos">Informations sur l'inscription de {{ etudiant.nomComplet_etud }} :</p>
        <div class="class formInput mt-2">
          <div class="mr-5 grid grid-cols-1 gap-x-6 gap-y-8">
            <div class="info sm:col-span-3 mt-5">
              <label class="valueinfos block text-sm font-medium leading-6 text-gray-900"
                >Nom complet :</label
              >
              <p>&nbsp; {{ etudiant.nomComplet_etud ? etudiant.nomComplet_etud : 'Vide' }} ,</p>
            </div>
          </div>
          <div class="mr-5 grid grid-cols-1 gap-x-6 gap-y-8 mt-5">
            <div class="info sm:col-span-3">
              <label class="valueinfos block text-sm font-medium leading-6 text-gray-900"
                >Date de naissance :</label
              >
              <p>
                &nbsp; {{ etudiant.date_naissance_etud ? etudiant.date_naissance_etud : 'Vide' }} ,
              </p>
            </div>
          </div>
          <div class="mr-5 grid grid-cols-1 gap-x-6 gap-y-8 mt-5">
            <div class="info sm:col-span-3">
              <label class="valueinfos block text-sm font-medium leading-6 text-gray-900"
                >Lieu de naissance :</label
              >
              <p>
                &nbsp;
                {{ etudiant.lieux_naissance_etud ? etudiant.lieux_naissance_etud : 'Vide' }} ,
              </p>
            </div>
          </div>
          <div class="mr-5 grid grid-cols-1 gap-x-6 gap-y-8 mt-5">
            <div class="info sm:col-span-3">
              <label class="valueinfos block text-sm font-medium leading-6 text-gray-900"
                >Nationalité :</label
              >
              <p>&nbsp; {{ etudiant.nationalite_etud ? etudiant.nationalite_etud : 'Vide' }} ,</p>
            </div>
          </div>
          <div class="mr-5 grid grid-cols-1 gap-x-6 gap-y-8 mt-5">
            <div class="info sm:col-span-3">
              <label class="valueinfos block text-sm font-medium leading-6 text-gray-900"
                >Sexe :</label
              >
              <p>&nbsp; {{ etudiant.sexe_etud ? etudiant.sexe_etud : 'Vide' }} ,</p>
            </div>
          </div>
          <div class="mr-5 grid grid-cols-1 gap-x-6 gap-y-8 mt-5">
            <div class="info sm:col-span-3">
              <label class="valueinfos block text-sm font-medium leading-6 text-gray-900"
                >Numéro CIN :</label
              >
              <p>&nbsp; {{ etudiant.CIN_etud ? etudiant.CIN_etud : 'Vide' }} ,</p>
            </div>
          </div>
          <div class="mr-5 grid grid-cols-1 gap-x-6 gap-y-8 mt-5">
            <div class="info sm:col-span-3">
              <label class="valueinfos block text-sm font-medium leading-6 text-gray-900"
                >Téléphone :</label
              >
              <p>&nbsp; {{ etudiant.telephone_etud ? etudiant.telephone_etud : 'Vide' }} ,</p>
            </div>
          </div>
          <div class="mr-5 grid grid-cols-1 gap-x-6 gap-y-8 mt-5">
            <div class="info sm:col-span-3">
              <label class="valueinfos block text-sm font-medium leading-6 text-gray-900"
                >Nom du père :</label
              >
              <p>&nbsp; {{ etudiant.nom_pere_etud ? etudiant.nom_pere_etud : 'Vide' }} ,</p>
            </div>
          </div>
          <div class="mr-5 grid grid-cols-1 gap-x-6 gap-y-8 mt-5">
            <div class="info sm:col-span-3">
              <label class="valueinfos block text-sm font-medium leading-6 text-gray-900"
                >Nom du mère :</label
              >
              <p>&nbsp; {{ etudiant.nom_mere_etud ? etudiant.nom_mere_etud : 'Vide' }} ,</p>
            </div>
          </div>

          <div class="mr-5 grid grid-cols-1 gap-x-6 gap-y-8 mt-5">
            <div class="info sm:col-span-3">
              <label class="valueinfos block text-sm font-medium leading-6 text-gray-900"
                >Tuteur/Tutrice :</label
              >
              <p>&nbsp; {{ etudiant.nom_tuteur ? etudiant.nom_tuteur : 'Vide' }} ,</p>
            </div>
          </div>

          <div class="mr-5 grid grid-cols-1 gap-x-6 gap-y-8 mt-5">
            <div class="info sm:col-span-3">
              <label class="valueinfos block text-sm font-medium leading-6 text-gray-900"
                >Adresse :</label
              >
              <p>&nbsp; {{ etudiant.adresse_etud ? etudiant.adresse_etud : 'Vide' }} ,</p>
            </div>
          </div>
          <div class="mr-5 grid grid-cols-1 gap-x-6 gap-y-8 mt-5">
            <div class="info sm:col-span-3">
              <label class="valueinfos block text-sm font-medium leading-6 text-gray-900"
                >Série BAC :</label
              >
              <p>&nbsp; {{ etudiant.serieBAC_etud ? etudiant.serieBAC_etud : 'Vide' }} ,</p>
            </div>
          </div>
          <div class="mr-5 grid grid-cols-1 gap-x-6 gap-y-8 mt-5">
            <div class="info sm:col-span-3">
              <label class="valueinfos block text-sm font-medium leading-6 text-gray-900"
                >Année d'obtention du BAC :</label
              >
              <p>&nbsp; {{ etudiant.anneeBAC_etud ? etudiant.anneeBAC_etud : 'Vide' }} ,</p>
            </div>
          </div>
          <div class="mr-5 grid grid-cols-1 gap-x-6 gap-y-8 mt-5">
            <div class="info sm:col-span-3">
              <label class="valueinfos block text-sm font-medium leading-6 text-gray-900"
                >Etablissement d'origine :</label
              >
              <p>&nbsp; {{ etudiant.etabOrigin_etud ? etudiant.etabOrigin_etud : 'Vide' }} ,</p>
            </div>
          </div>
          <div class="mr-5 grid grid-cols-1 gap-x-6 gap-y-8 mt-5">
            <div class="info sm:col-span-3">
              <label class="valueinfos block text-sm font-medium leading-6 text-gray-900"
                >Bordereaux :</label
              >
              <a
                :href="`${URL}/storage/bordereaux/${etudiant.photoBordereaux_name}`"
                target="_blank"
              >
                &nbsp; {{ etudiant.photoBordereaux_name ? '🔗 Cliquez ici' : 'Vide' }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
