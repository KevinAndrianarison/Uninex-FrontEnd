import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNote = defineStore('Note', () => {
  const noteEC = ref(null)

  return {
    noteEC
  }
})
