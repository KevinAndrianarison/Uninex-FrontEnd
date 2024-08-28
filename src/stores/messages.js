import { defineStore } from "pinia";
import { ref } from "vue";

export const useMessages = defineStore("Messages", () => {
  const messageSucces = ref("");
  const messageError = ref("");
  return {
    messageSucces,
    messageError,
  };
});
