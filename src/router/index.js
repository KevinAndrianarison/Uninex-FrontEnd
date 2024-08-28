import { createRouter, createWebHistory } from 'vue-router'
import WorkSpaceGestionAgentScolarite from '../views/directeur/WorkSpaceGestionAgentScolarite.vue'
import WorkSpaceGestionEnseignant from '../views/directeur/WorkSpaceGestionEnseignant.vue'
import WorkSpaceGestionMention from '../views/directeur/WorkSpaceGestionMention.vue'
import WorkSpaceGestionParcours from '../views/directeur/WorkSpaceGestionParcours.vue'
import WorkSpaceGestionRole from '../views/directeur/WorkSpaceGestionRole.vue'
import WorkSpaceDiscussion from '../views/WorkSpaceDiscussion.vue'
import WorkSpaceAnnonces from '../views/WorkSpaceAnnonces.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: '/',
      name: 'Annonces',
      component: WorkSpaceAnnonces
    }
  ]
})

export default router
