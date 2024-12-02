import { defineStore } from 'pinia'
import { ref } from 'vue'
import html2pdf from 'html2pdf.js'
import { useParcour } from '@/stores/Parcour'
import { useAu } from '@/stores/Au'
import { useEtudiant } from '@/stores/Etudiant'
import { useEc } from '@/stores/Ec'
import { useEdt } from '@/stores/Edt'

// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'

export const useHtml2pdf = defineStore('Html2pdf', () => {
  const elementToPrint = ref(null)
  const parcour = useParcour()
  const au = useAu()
  const etudiant = useEtudiant()
  const ec = useEc()
  const edt = useEdt()

  function setElement(element) {
    elementToPrint.value = element
  }

  function downloadPDF() {
    const element = elementToPrint.value
    const options = {
      margin: 0,
      filename: `Liste des étudiants - ${parcour.parcours_abr} - ${au.oneAU}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }

    html2pdf().from(element).set(options).save()
  }

  function downloadEDT() {
    const element = elementToPrint.value
    const options = {
      margin: 0,
      filename: `Emplois du temps - ${edt.parcoursEdt} - ${edt.SemestreEdt}  - ${edt.AUedt}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    }

    html2pdf().from(element).set(options).save()
  }

  function downloadNote() {
    const element = elementToPrint.value
    const options = {
      margin: 0,
      filename: `Note des étudiants - ${parcour.parcours_abr} (${ec.ecNomBySemestre}) - ${au.oneAU}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }

    html2pdf().from(element).set(options).save()
  }
  function downloadCarte() {
    const element = elementToPrint.value
    const options = {
      margin: 0,
      filename: `Carte d'étudiant - ${etudiant.nomComplet_etud} - ${parcour.parcours_abr} - ${au.oneAU}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    }

    html2pdf().from(element).set(options).save()
  }

  function downloadReleve() {
    const element = elementToPrint.value
    const options = {
      margin: 0,
      filename: `Relevé de notes - ${etudiant.nomComplet_etud} - ${parcour.parcours_abr} - ${au.oneAU}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }

    html2pdf().from(element).set(options).save()
  }

  return {
    elementToPrint,
    downloadReleve,
    downloadEDT,
    downloadEDT,
    setElement,
    downloadNote,
    downloadPDF,
    downloadCarte
  }
})
