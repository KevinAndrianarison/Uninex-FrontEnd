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
  const showAdmin = ref(false)
  const showDeconnexion = ref(false)
  const showDeleteusers = ref(false)
  const showMdpAS = ref(false)
  const showMdpENS = ref(false)
  const showMdpEtudiant = ref(false)
  const showCreateAU = ref(false)
  const showCreateNiveau = ref(false)
  const showDeleteAU = ref(false)
  const showDeleteUE = ref(false)
  const showDeleteNiveau = ref(false)
  const showDeleteMention = ref(false)
  const showDeletePost = ref(false)
  const showDeleteParcour = ref(false)
  const showDeleteSemestre = ref(false)
  const showCreateSemestre = ref(false)
  const showValiderInscription = ref(false)
  const showNavBarDir = ref(false)
  const showNavBarEtud = ref(false)
  const showNavBarEns = ref(false)
  const showFormatExcel = ref(false)
  const showListeEtudiantPdf = ref(false)
  const showListeNoteEtudiantPdf = ref(false)
  const showReleveNotePdf = ref(false)
  const showCarteEtudiant = ref(false)
  const showNavBarAS = ref(false)
  const showNavBarSECPAL = ref(false)
  const showNavBarRespMention = ref(false)
  const showNavBarRespParcours = ref(false)
  const showEtudiantInfos = ref(false)
  const showDeletEC = ref(false)
  const showDeletSalle = ref(false)
  const showDeletEDT = ref(false)
  const showCreatePost = ref(false)
  const showCreateSalle = ref(false)
  const showListeNotesEtudiant = ref(false)
  const showEDT = ref(false)
  const showEDTpdf = ref(false)
  const showFacturepdf = ref(false)
  const showCaissepdf = ref(false)
  const showCreateGroup = ref(false)
  const showDeleteGroup = ref(false)
  const showSetGroupMember = ref(false)




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
    showEDTpdf,
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
    showMessageErrorEmailDir,
    showNavBarEtud,
    showEtudiantInfos,
    showNavBarRespMention,
    showNavBarRespParcours,
    showDeleteUE,
    showDeletEC,
    showNavBarEns,
    showDeletePost,
    showCreatePost,
    showCarteEtudiant,
    showListeNoteEtudiantPdf,
    showListeNotesEtudiant,
    showReleveNotePdf,
    showCreateSalle,
    showDeletSalle,
    showDeletEDT,
    showEDT,
    showNavBarSECPAL,
    showFacturepdf,
    showCaissepdf,
    showCreateGroup,
    showDeleteGroup,
    showSetGroupMember,
    toggleCreatePasswordVisibility,
    togglePasswordVisibility,
    toggleVerifyPasswordVisibility
  }
})
