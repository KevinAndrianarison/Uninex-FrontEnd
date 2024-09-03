import { defineStore } from 'pinia'
import { ref } from 'vue'
import html2pdf from 'html2pdf.js'

export const useHtml2pdf = defineStore('Html2pdf', () => {
  const elementToPrint = ref(null)

  function setElement(element) {
    elementToPrint.value = element
  }

  function downloadPDF() {
    const element = elementToPrint.value
    const options = {
      margin: 0,
      filename: 'Liste des étudiants.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }

    html2pdf().from(element).set(options).save()
  }

  return {
    elementToPrint,
    setElement,
    downloadPDF
  }
})
