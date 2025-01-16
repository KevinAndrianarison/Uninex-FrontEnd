import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'

export const useTheme = defineStore('Theme', () => {
  const theme = ref(localStorage.getItem('theme') || 'light')

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
  }

  return {
    theme,
    toggleTheme
  }
})
