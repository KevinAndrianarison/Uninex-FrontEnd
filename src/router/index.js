import { createRouter, createWebHistory } from 'vue-router'
import WorkSpaceGestionAgentScolarite from '../views/directeur/WorkSpaceGestionAgentScolarite.vue'
import WorkSpaceGestionEnseignant from '../views/directeur/WorkSpaceGestionEnseignant.vue'
import WorkSpaceGestionMention from '../views/directeur/WorkSpaceGestionMention.vue'
import WorkSpaceGestionParcours from '../views/directeur/WorkSpaceGestionParcours.vue'
import WorkSpaceGestionInscription from '../views/agentScolarite/WorkSpaceGestionInscription.vue'
import WorkSpaceListeEtudiant from '../views/agentScolarite/WorkSpaceListeEtudiant.vue'
import WorkSpaceGestionSalle from '../views/agentScolarite/WorkSpaceGestionSalle.vue'
import WorkSpaceGestionEDP from '../views/agentScolarite/WorkSpaceGestionEDT.vue'
import WorkSpaceGestionNotes from '../views/agentScolarite/WorkSpaceGestionNotes.vue'
import WorkSpaceGestionRole from '../views/directeur/WorkSpaceGestionRole.vue'
import WorkSpaceInscription from '../views/etudiant/WorkSpaceInscription.vue'
import WorkSpaceCours from '../views/etudiant/WorkSpaceCours.vue'
import WorkSpaceGestionUE from '../views/chefDeMention/WorkSpaceGestionUE.vue'
import WorkSpaceGestionEC from '../views/chefDeMention/WorkSpaceGestionEC.vue'
import WorkSpaceNotes from '../views/etudiant/WorkSpaceNotes.vue'
import WorkSpaceDiscussion from '../views/WorkSpaceDiscussion.vue'
import WorkSpaceConfiguration from '../views/WorkSpaceConfiguration.vue'
import WorkSpaceAnnonces from '../views/WorkSpaceAnnonces.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/chefDeMention/GestionEC',
      name: 'GestionEC',
      component: WorkSpaceGestionEC
    },
    {
      path: '/chefDeMention/GestionUE',
      name: 'GestionUE',
      component: WorkSpaceGestionUE
    },
    {
      path: '/etudiant/Notes',
      name: 'Notes',
      component: WorkSpaceNotes
    },
    {
      path: '/etudiant/Cours',
      name: 'Cours',
      component: WorkSpaceCours
    },
    {
      path: '/etudiant/Inscription',
      name: 'Inscription',
      component: WorkSpaceInscription
    },
    {
      path: '/agentScolarite/GestionEDP',
      name: 'GestionEDP',
      component: WorkSpaceGestionEDP
    },
    {
      path: '/agentScolarite/GestionSalle',
      name: 'GestionSalle',
      component: WorkSpaceGestionSalle
    },
    {
      path: '/agentScolarite/GestionNotes',
      name: 'GestionNotes',
      component: WorkSpaceGestionNotes
    },
    {
      path: '/ListeEtudiant',
      name: 'ListeEtudiant',
      component: WorkSpaceListeEtudiant
    },
    {
      path: '/agentScolarite/GestionInscription',
      name: 'GestionInscription',
      component: WorkSpaceGestionInscription
    },
    {
      path: '/directeur/GestionAgentScolarite',
      name: 'GestionAgentScolarite',
      component: WorkSpaceGestionAgentScolarite
    },
    {
      path: '/directeur/GestionEnseignant',
      name: 'GestionEnseignant',
      component: WorkSpaceGestionEnseignant
    },
    {
      path: '/directeur/GestionMention',
      name: 'GestionMention',
      component: WorkSpaceGestionMention
    },
    {
      path: '/directeur/GestionParcours',
      name: 'GestionParcours',
      component: WorkSpaceGestionParcours
    },
    {
      path: '/directeur/GestionRole',
      name: 'GestionRole',
      component: WorkSpaceGestionRole
    },
    {
      path: '/Discussion',
      name: 'Discussion',
      component: WorkSpaceDiscussion
    },
    {
      path: '/Configuration',
      name: 'Configuration',
      component: WorkSpaceConfiguration
    },
    {
      path: '/',
      name: 'Annonces',
      component: WorkSpaceAnnonces
    }
  ]
})

export default router
