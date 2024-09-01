<script setup>
import { useShow } from '@/stores/Show'
import { useEtudiant } from '@/stores/Etudiant'
import { useMessages } from '@/stores/Messages'
import * as XLSX from 'xlsx'

const show = useShow()
const etudiant = useEtudiant()
const messages = useMessages()

function closeModal() {
  show.showFormatExcel = false
}

function onFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()

    reader.onload = function (e) {
      const workbook = XLSX.read(e.target.result, { type: 'array' })
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

      if (jsonData.length === 0) {
        messages.messageError = 'Le fichier Excel est vide !'
        setTimeout(() => {
          messages.messageError = ''
        }, 3000)
        return
      }
      const headers = (jsonData[0] || []).map((header) =>
        header ? header.toString().trim().toLowerCase() : ''
      )
      const nomCompletIndex = headers.indexOf('nom complet')
      const adresseEmailIndex = headers.indexOf('adresse email')
      if (nomCompletIndex === -1 || adresseEmailIndex === -1) {
        messages.messageError = 'Les colonnes "Nom complet" et "Adresse email sont introvables !'
        setTimeout(() => {
          messages.messageError = ''
        }, 3000)

        return
      }
      etudiant.ListeEtudiantByExcel = jsonData
        .slice(1)
        .map((row) => ({
          nomComplet: row[nomCompletIndex] || '',
          adresseEmail: row[adresseEmailIndex] || ''
        }))
        .filter((row) => row.nomComplet && row.adresseEmail)
      etudiant.bigPostEtudiant()
    }

    reader.readAsArrayBuffer(file)
  }
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showFormatExcel" @click="closeModal()">
      <div class="formMod">
        <p class="infos">Assurez-vous que votre fichier Excel a la structure suivante :</p>
        <div class="class formInputs mt-4"></div>
        <div class="valide">
          <button type="submit" class="Modifie btn btn-primary mt-4">
            J'ai compris
            <input
              class="absolute inset-0 opacity-0 cursor-pointer"
              type="file"
              accept=".xlsx, .xls"
              @change="onFileChange"
            />
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
