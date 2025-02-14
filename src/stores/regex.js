import { defineStore } from 'pinia'
import { useShow } from '@/stores/Show'
import { useUser } from '@/stores/User'

export const useRegex = defineStore('Regex', () => {
  const show = useShow()
  const user = useUser()

  function RegexPassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    show.showMessageErrorMdp = !regex.test(password)
    if (password === '') {
      show.showMessageErrorMdp = false
    }
    if (password !== user.passwordVerifier && user.passwordVerifier !== '') {
      show.showMessageErrorConfirmMdp = true
    }
  }

  function RegexEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    show.showMessageErrorEmail = !regex.test(email)
    if (email === '') {
      show.showMessageErrorEmail = false
    }
  }

  function RegexEmailDir(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    show.showMessageErrorEmailDir = !regex.test(email)
    if (email === '') {
      show.showMessageErrorEmailDir = false
    }
  }

  function RegexEmailDirFist(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    show.showMessageErrorEmailDirFirst = !regex.test(email)
    if (email === '') {
      show.showMessageErrorEmailDirFirst = false
    }
  }

  return {
    RegexPassword,
    RegexEmailDir,
    RegexEmail,
    RegexEmailDirFist
  }
})


