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
  const showLogin = ref(false)
  const showVerifyPassword = ref(false)
  const showPassword = ref(false)
  const showAdmin = ref(true)
  const showDeconnexion = ref(false)
  const showDeleteusers = ref(false)
  const showMdpAS = ref(false)
  const showMdpENS = ref(false)
  const showCreateAU = ref(false)
  const showCreateNiveau = ref(false)
  const showDeleteAU = ref(false)
  const showDeleteNiveau= ref(false)
  const showDeleteMention= ref(false)
  const showDeleteParcour= ref(false)
  const showDeleteSemestre= ref(false)
  const showCreateSemestre= ref(true)





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
    toggleCreatePasswordVisibility,
    togglePasswordVisibility,
    toggleVerifyPasswordVisibility
  }
})
