<template>
  <div :class="theme.theme === 'light' ? '' : ' !bg-gray-600 !text-white'">
    <div class="flex gap-5">
      <button
        @click="
          setListeNote(
            etd.etudiant.ec,
            etd.etudiant.id,
            etd.etudiant.matricule_etud.split('/')[
              etd.etudiant.matricule_etud.split('/').length - 1
            ],
            etd.semestres,
            etd.au.id
          )
        "
        v-for="(etd, index) in etudiant.listCurscusNote"
        :class="
          etudiant.idCursus === etd.etudiant.id
            ? 'bg-blue-500 text-xs p-2 text-white rounded border-2 border-blue-500'
            : 'bg-white text-xs p-2 text-blue-500 rounded border-2 border-blue-500'
        "
      >
        <p>{{ etd.au.annee_debut }}-{{ etd.au.annee_fin }}</p>
      </button>
    </div>
    <div class="mt-4 flex justify-between">
      <div class="text-xs flex">
        <button
          @click="switchToNote"
          :class="
            isNotes
              ? 'bg-yellow-500 border border-yellow-500 p-2 px-4 text-white '
              : 'bg-white p-2 px-4 text-yellow-500 '
          "
        >
          Notes
        </button>
        <button
          @click="switchToCours"
          :class="
            isCours
              ? 'bg-yellow-500 border border-yellow-500 p-2 px-4 text-white '
              : 'bg-white p-2 px-4 text-yellow-500 '
          "
        >
          Cours
        </button>
        <button
          @click="switchToEDT"
          :class="
            isEDPT
              ? 'bg-yellow-500 border border-yellow-500 p-2 px-4 text-white '
              : 'bg-white  p-2 px-4 text-yellow-500 '
          "
        >
          Emplois du temps
        </button>
      </div>
      <button
        @click="confirmCommandeCertificat"
        class="text-xs text-white bg-yellow-500 px-5 py-2 rounded"
      >
        Demander un certificat de scolarité
      </button>
    </div>

    <div class="mt-4">
      Parcours : <b>{{ etudiant.niveau }}</b>
    </div>
    <div v-if="isNotes">
      <div
        :class="theme.theme === 'light' ? '' : '!bg-gray-600 !border-gray-400'"
        class="border rounded mt-2"
      >
        <div
          :class="theme.theme === 'light' ? '' : '!border-b-gray-400'"
          class="flex list-none text-xs bg-blue-100 p-2"
        >
          <li class="w-[30%] font-bold">Nom EC</li>
          <li class="w-[30%] font-bold">Nom UE</li>
          <li class="w-[20%] font-bold">Semestre</li>
          <li class="w-[10%] font-bold">Status</li>
          <li class="w-[10%] font-bold text-center">Note / 20</li>
        </div>
        <div class="max-h-[50vh] overflow-y-auto">
          <div :key="etd.id" v-for="(etd, index) in etudiant.listNote">
            <div
              :class="theme.theme === 'light' ? '' : '!border-t-gray-400'"
              class="flex list-none text-xs p-1 border-t px-2"
            >
              <li class="w-[30%]">{{ etd.nom_ec }}</li>
              <li class="w-[30%]">{{ etd.ue.nom_ue }}</li>
              <li class="w-[20%]">{{ etd.ue.semestre.nom_semestre }}</li>
              <li class="w-[10%]">
                <p v-if="etd.pivot.noteEc >= 10" class="flex items-center w-full">
                  <CheckBadgeIcon class="text-green-500 h-5 w-5 mr-1" /> Validé
                </p>
                <p v-if="etd.pivot.noteEc < 10" class="flex items-center w-full">
                  <font-awesome-icon class="mr-2 text-red-500" :icon="['fas', 'xmark']" /> Non
                  validé
                </p>
              </li>
              <li
                :class="
                  etd.pivot.noteEc >= 10
                    ? 'w-[10%] text-center'
                    : 'w-[10%] text-center text-red-500 font-bold'
                "
              >
                {{ etd.pivot.noteEc }}
              </li>
            </div>
          </div>
        </div>

        <div
          v-if="etudiant.listNote.length === 0"
          class="flex items-center justify-center flex-col py-5"
        >
          <div
            class="h-20 w-36 bg-[url('../assets/pngtree-empty-box-icon-for-your-project-png-image_1533458-removebg-preview.png')] bg-cover bg-center"
          ></div>
          <p class="text-xs font-bold mt-2">Aucune note n'a été trouvée</p>
        </div>
      </div>
      <div v-if="etudiant.listNote.length !== 0" class="flex mt-4 gap-2">
        <button
          @click="getOneEtudiant"
          class="bg-blue-400 flex gap-2 rounded text-white text-xs px-5 py-2 cursor-pointer"
        >
          Relevé des notes
        </button>
        <button
          @click="confirmCommandeReleve"
          class="bg-green-500 flex gap-2 rounded text-white text-xs px-5 py-2 cursor-pointer"
        >
          Demander un relevé
        </button>
      </div>
    </div>
    <div v-if="isEDPT">
      <div v-for="(eplt, index) in etudiant.listEDT" :key="index" class="flex gap-4 text-xs mt-4">
        <button
          class="bg-gray-200 p-2 px-4 rounded flex items-center gap-2"
          v-for="(EDT, index) in eplt.edt"
          :key="index"
          @click="showOneEDT(EDT.id)"
        >
          <font-awesome-icon :icon="['fas', 'eye']" />
          <div class="font-bold">
            <p>{{ eplt.nom_semestre }} ({{ index + 1 }})</p>
          </div>
        </button>
      </div>
    </div>
    <div v-if="isCours">
      <div v-for="(cours, index) in etudiant.listNote" :key="index">
        <div class="flex items-center gap-4 text-xs mt-4" v-if="cours.cour">
          <p>{{ cours.nom_ec }} :</p>
          <button
            class="bg-white border p-2 px-4 rounded flex items-center gap-4"
            v-for="(COUR, index) in cours.cour"
            :key="index"
          >
            <font-awesome-icon
              @click="telechargerCours(COUR.cours_name)"
              :icon="['fas', 'arrow-down']"
              class="text-blue-500 bg-blue-200 py-1.5 p-2 rounded-full"
            />
            <div class="font-bold text-left">
              <p class="font-bold">{{ COUR.nom_cours }}</p>
              <p class="text-gray-500">{{ COUR.categorie_cours }}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { useEtudiant } from '@/stores/Etudiant'
import { useTheme } from '@/stores/Theme'
import { CheckBadgeIcon } from '@heroicons/vue/24/outline'
import axios from 'axios'
import { useShow } from '@/stores/Show'
import { useUrl } from '@/stores/url'
import { useEdt } from '@/stores/Edt'
import { useMessages } from '@/stores/messages'
import Notiflix from 'notiflix';

const URL = useUrl().url
const show = useShow()
const edt = useEdt()
const etudiant = useEtudiant()
const messages = useMessages()
const theme = useTheme()
const isNotes = ref(true)
const isEDPT = ref(false)
const isCours = ref(false)

function telechargerCours(nom) {
  const url = `${URL}/api/cours/file/${nom}`
  const link = document.createElement('a')
  link.href = url
  link.download = nom
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function showOneEDT(id) {
  axios
    .get(`${URL}/api/grpedt/${id}`)
    .then((response) => {
      edt.oneEDT = transformData(response.data.edt)
      edt.AUedt = `${response.data.au.annee_debut} - ${response.data.au.annee_fin}`
      edt.parcoursEdt = response.data.parcour.abr_parcours
      edt.SemestreEdt = response.data.semestre.nom_semestre
      show.showEDT = true
    })
    .catch((err) => {
      console.error(err)
    })
}

function transformData(rawData) {
  const order = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
  const groupedByDay = {}

  rawData.forEach((item) => {
    const dayName = item.jour.nom
    const horaire = item.heure.valeur
    const seance = {
      horaire: horaire,
      matiere: `EC ${item.ec_id}`,
      enseignant: item.enseignant.nomComplet_ens,
      salle: item.salle.nom_salle
    }
    if (!groupedByDay[dayName]) {
      groupedByDay[dayName] = {}
    }
    if (!groupedByDay[dayName][horaire]) {
      groupedByDay[dayName][horaire] = seance
    }
  })
  return Object.keys(groupedByDay)
    .sort((a, b) => order.indexOf(a) - order.indexOf(b))
    .map((dayName) => ({
      jour: dayName,
      seances: Object.values(groupedByDay[dayName])
    }))
}

function switchToCours() {
  isEDPT.value = false
  isNotes.value = false
  isCours.value = true
}

function switchToNote() {
  isCours.value = false
  isEDPT.value = false
  isNotes.value = true
}

function switchToEDT() {
  isCours.value = false
  isNotes.value = false
  isEDPT.value = true
}

function commandeReleve() {
  let currentDate = new Date()
  let formattedDate = currentDate.toISOString().split('T')[0]
  let formData = {
    categorie: 'Relevé des notes',
    status: 'En attente',
    etudiant_id: etudiant.idCursus,
    au_id: etudiant.auID,
    date: formattedDate
  }
  show.showSpinner = true

  axios
    .post(`${URL}/api/commande`, formData)
    .then((response) => {
      messages.messageSucces = 'Commande envoyé !'
      show.showSpinner = false
      setTimeout(() => {
        messages.messageSucces = ''
      }, 3000)
    })
    .catch((err) => {
      console.error(err)
      show.showSpinner = false
    })
}

function confirmCommandeReleve() {
  Notiflix.Confirm.show(
    'Confirmation',
    'Voulez-vous vraiment demander un relevé de notes ?',
    'Oui',
    'Non',
    () => {
      commandeReleve();
    },
    () => {
    }
  );
}

function commandeCertificat() {
  let currentDate = new Date()
  let formattedDate = currentDate.toISOString().split('T')[0]
  let formData = {
    categorie: 'Certificat de scolarité',
    status: 'En attente',
    au_id: etudiant.auID,
    etudiant_id: etudiant.idCursus,
    date: formattedDate
  }
  show.showSpinner = true
  axios
    .post(`${URL}/api/commande`, formData)
    .then((response) => {
      messages.messageSucces = 'Commande envoyé !'
      show.showSpinner = false
      setTimeout(() => {
        messages.messageSucces = ''
      }, 3000)
    })
    .catch((err) => {
      console.error(err)
      show.showSpinner = false
    })
}

function confirmCommandeCertificat() {
  Notiflix.Confirm.show(
    'Confirmation',
    'Voulez-vous vraiment demander un certificat de scolarité ?',
    'Oui',
    'Non',
    () => {
      commandeCertificat();
    },
    () => {
    }
  );
}

function getOneEtudiant() {
  etudiant.isshowNotes = true
  etudiant.id_etud = etudiant.idCursus
  etudiant.getEtudiantById()
}

function setListeNote(list, id, niveau, edt, idANNU) {
  etudiant.niveau = niveau
  etudiant.idCursus = id
  etudiant.auID = idANNU
  etudiant.listNote = list
  etudiant.listEDT = edt
}

onBeforeMount(() => {
  const userString = localStorage.getItem('user')
  const users = JSON.parse(userString)
  if (users.user.status_user === 'Etudiant') {
    etudiant.id_cursus = users.cursu_id
    etudiant.getCursus()
  }
})
</script>

<style scoped></style>
