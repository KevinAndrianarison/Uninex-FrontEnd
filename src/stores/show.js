import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShow = defineStore('Show', () => {
  const showHome = ref(false)
  const showSpinner = ref(false)
  const showFirstConfig = ref(false)
  const showCreatePassword = ref(false)
  const showMessageErrorMdp = ref(false)
  const showMessageErrorConfirmMdp = ref(false)
  const showMessageErrorEmail = ref(false)
  const showMessageErrorEmailDir = ref(false)
  const showLogin = ref(false)
  const showVerifyPassword = ref(false)
  const showPassword = ref(false)
  const showAdmin = ref(true)
  const showDeconnexion = ref(false)
  const showDeleteusers = ref(false)
  const showMdpAS = ref(false)
  const showMdpENS = ref(false)
  const showMdpEtudiant = ref(false)
  const showCreateAU = ref(false)
  const showCreateNiveau = ref(false)
  const showDeleteAU = ref(false)
  const showDeleteNiveau = ref(false)
  const showDeleteMention = ref(false)
  const showDeleteParcour = ref(false)
  const showDeleteSemestre = ref(false)
  const showCreateSemestre = ref(false)
  const showValiderInscription = ref(false)
  const ShowListEtudiantEmpty = ref(true) //Always TRUE
  const showNavBarDir = ref(false)
  const showFormatExcel = ref(false)
  const showListeEtudiantPdf = ref(false)
  const showNavBarAS = ref(true)

  function toggleCreatePasswordVisibility() {
    showCreatePassword.value = !showCreatePassword.value
  }

  function togglePasswordVisibility() {
    showPassword.value = !showPassword.value
  }

  function toggleVerifyPasswordVisibility() {
    showVerifyPassword.value = !showVerifyPassword.value
  }

  return {
    showHome,
    showSpinner,
    showFirstConfig,
    showCreatePassword,
    showVerifyPassword,
    showAdmin,
    showPassword,
    showLogin,
    showMessageErrorMdp,
    showMessageErrorConfirmMdp,
    showMessageErrorEmail,
    showDeconnexion,
    showDeleteusers,
    showMdpAS,
    showMdpENS,
    showCreateAU,
    showDeleteMention,
    showDeleteAU,
    showCreateNiveau,
    showDeleteNiveau,
    showDeleteParcour,
    showCreateSemestre,
    showDeleteSemestre,
    showNavBarDir,
    showNavBarAS,
    showFormatExcel,
    showMdpEtudiant,
    showValiderInscription,
    showListeEtudiantPdf,
    ShowListEtudiantEmpty,
    showMessageErrorEmailDir,
    toggleCreatePasswordVisibility,
    togglePasswordVisibility,
    toggleVerifyPasswordVisibility
  }
})
