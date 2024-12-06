<script setup>
import { useShow } from '@/stores/Show'
import { useAu } from '@/stores/Au'
import { useNiveau } from '@/stores/Niveau'
import { useEtudiant } from '@/stores/Etudiant'
import { useUrl } from '@/stores/url'
import axios from 'axios'
import { useTransaction } from '@/stores/Transaction'

const show = useShow()
const niveau = useNiveau()
const au = useAu()
const etudiant = useEtudiant()
const URL = useUrl().url
const transaction = useTransaction()

function closeValiderInscription() {
  show.showValiderInscription = false
}

function ValiderInscription() {
  etudiant.setValiditeInscriptionEtudiant()
  postTransaction()
  closeValiderInscription()
}

function postTransaction() {
  const dateActuelle = new Date()
  const dateFormatee = dateActuelle.toLocaleDateString('fr-FR')
  const userString = localStorage.getItem('user')
  const user = JSON.parse(userString)
  let formData = {
    montant: niveau.NiveauCheck.montant_droit,
    type: 'Recette',
    description: "Droit d'inscription",
    categorie: 'Frais de scolarité',
    user_id: user.user.id,
    au_id: au.idAU,
    date: dateFormatee
  }

  axios
    .post(`${URL}/api/transaction`, formData)
    .then((response) => {
      transaction.getByIdAU()
    })
    .catch((err) => {
      console.error(err)
    })
}
</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showValiderInscription">
      <div class="formModal">
        <h6 class="login">
          Voulez-vous vraiment valider l'inscription de "<b>{{ etudiant.etudnomComplet }} </b>" ?
        </h6>
        <div class="valider">
          <button type="button" class="Modifier btn btn-primary mt-5" @click="ValiderInscription()">
            OUI
          </button>
          <button
            type="button"
            class="Annuller btn btn-primary mt-5"
            @click="closeValiderInscription()"
          >
            NON
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
