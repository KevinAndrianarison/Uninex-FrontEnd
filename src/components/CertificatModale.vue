<script setup>
import { useShow } from '@/stores/Show'
import { useEtablissement } from '@/stores/etablissement'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/stores/Theme'
import { ref, onMounted } from 'vue'
import { useEtudiant } from '@/stores/Etudiant'
import { useDirecteur } from '@/stores/Directeur'
import html2pdf from 'html2pdf.js'

const show = useShow()
const theme = useTheme()
const etablissement = useEtablissement()
const formattedDate = ref('')
const etudiant = useEtudiant()
const directeur = useDirecteur()

onMounted(() => {
  const date = new Date(Date.now())
  formattedDate.value = date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
})

function closeModaleCertificat() {
  show.showCertificatModal = false
  etudiant.etudiantCert = {}
  etudiant.auCert = {}
}

async function generatePDF() {
  const element = document.getElementById('certificatContent');
  const originalOverflow = element.style.overflowY;
  const originalHeight = element.style.height;
  const originalMaxHeight = element.style.maxHeight;
  element.style.overflowY = 'visible';
  element.style.height = 'auto';
  element.style.maxHeight = 'none';

  const opt = {
    margin: 0.5,
    filename: `CERTIFICAT DE SCOLARITÉ - ${etudiant.etudiantCert.nomComplet_etud} / ${etudiant.auCert.annee_debut}-${etudiant.auCert.annee_fin}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, scrollY: 0 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  try {
    await html2pdf().set(opt).from(element).save();
  } finally {
    element.style.overflowY = originalOverflow;
    element.style.height = originalHeight;
    element.style.maxHeight = originalMaxHeight;
  }
}

</script>

<template>
  <Transition>
    <div class="showModal" v-if="show.showCertificatModal">
      <div
        :class="
          theme.theme === 'light' ? 'formModalCERT ' : 'formModalCERT !bg-gray-600 !text-white'
        "
      >
        <div class="divbtn">
          <button type="button" class="Annullers" @click="closeModaleCertificat()">
            <XMarkIcon :class="theme.theme === 'light' ? '' : 'text-red-500'" class="h-6 w-6" />
          </button>
        </div>
        <div id="certificatContent" class="w-[800px] max-h-[80vh] overflow-y-auto mx-auto p-10 border-gray-300 bg-white">
          <div class="flex justify-center gap-4">
            <div class="h-20 logoESP w-20"></div>
            <div class="text-center">
              <p class="font-semibold text-sm">
                REPOBLIKAN'I MADAGASCAR <br />
                Fitiavana - Tanindrazana - Fandrosoana
              </p>
              <p class="mt-2 text-xs uppercase">
                MINISTÈRE DE L'ENSEIGNEMENT SUPÉRIEUR ET DE LA RECHERCHE SCIENTIFIQUE <br />
                UNIVERSITÉ D’{{ etablissement.etablissement.ville_etab }} <br />
                {{ etablissement.etablissement.nom_etab }}
                {{ etablissement.etablissement.ville_etab }}
              </p>
              <p class="mt-2 text-xs">
                mail : {{ etablissement.etablissement.email_etab }}<br />
                Contact : {{ etablissement.etablissement.numero }}
              </p>
            </div>
          </div>

          <h1 class="text-center font-bold text-lg mt-10 underline">CERTIFICAT DE SCOLARITÉ</h1>

          <div class="mt-10 text-justify text-xs mx-20 leading-relaxed">
            <p>
              Le Directeur de l'{{ etablissement.etablissement.nom_etab }} d’{{
                etablissement.etablissement.ville_etab
              }}
              certifie que :
            </p>

            <div class="mt-4">
              <p class="inline">Monsieur/Madame</p>
              <span class="font-bold ml-2"> {{ etudiant.etudiantCert.nomComplet_etud }}</span>
            </div>

            <p>
              Né(e) le
              <span class="font-semibold ml-2">{{ etudiant.etudiantCert.date_naissance_etud }}</span> à
              <span class="font-semibold ml-2">{{ etudiant.etudiantCert.lieux_naissance_etud }}</span>
            </p>
            <p>
              Fils (Fille) de
              <span class="font-semibold ml-2">{{ etudiant.etudiantCert.nom_pere_etud }}</span> et de
              <span class="font-semibold ml-2">{{ etudiant.etudiantCert.nom_mere_etud }}</span>
            </p>

            <p class="mt-4">
              Parcours :
              <span class="font-semibold uppercase">{{
                etudiant.etudiantCert.matricule_etud.split('/')[
                  etudiant.etudiantCert.matricule_etud.split('/').length - 1
                ]
              }}</span>
            </p>
            <p>
              en
              <span class="font-semibold uppercase">{{
                etudiant.etudiantCert.niveau.nom_niveau
              }}</span>
              au titre de l'année universitaire
              <span class="font-semibold"
                >{{ etudiant.auCert.annee_debut }} - {{ etudiant.auCert.annee_fin }}</span
              >
            </p>

            <p class="mt-4">
              est régulièrement inscrit(e) dans mon Établissement comme étudiant(e) permanent(e).
            </p>
            <p class="mt-2">
              Le présent certificat lui est délivré pour servir et valoir ce que de droit.
            </p>
          </div>
          <div class="flex mt-10 mx-10 text-xs items-center">
            <div class="w-[400px] italic text-gray-600">
              Il n’est délivré qu’un seul certificat de scolarité. Faites-en des photocopies pour
              les faire certifier conformes à l’original, par une autorité compétente.
            </div>
            <div class="w-full text-center">
              <p class="text-xs">
                Fait à Antsiranana, le <span class="font-semibold">{{ formattedDate }}</span>
              </p>
              <p class="mt-5">Le Directeur de l’{{ etablissement.etablissement.abr_etab }}</p>
              <p class="mt-20">
                {{ directeur.grade_dir !== 'Assistant' ? directeur.grade_dir : 'Madame/Monsieur' }}
                {{ directeur.nomComplet_dir }}
              </p>
            </div>
          </div>
        </div>
        <div class="mt-5 flex justify-center">
          <button class="bg-blue-500 text-xs text-white px-4 py-2 rounded" @click="generatePDF">
            Génerer PDF
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped src="../styles/Modale.css"></style>
