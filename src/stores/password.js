import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePassword = defineStore('Password', () => {
  const password = ref('')

  function generatePassword() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]'
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      password.value += characters[randomIndex]
    }
  }

  return {
    password,
    generatePassword
  }
})
