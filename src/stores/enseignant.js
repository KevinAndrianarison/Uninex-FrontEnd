import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useUser } from '@/stores/User'
import { usePassword } from '@/stores/Password'
import { useUrl } from '@/stores/url'
import { useShow } from '@/stores/Show'
import { useMessages } from '@/stores/messages'
import { useInfosheader } from '@/stores/Infosheader'
import { useInfossetup } from '@/stores/Infossetup'
import { useEc } from '@/stores/Ec'
import { useMention } from '@/stores/mention'
import { useParcour } from '@/stores/parcour'

export const useEnseignant = defineStore('Enseignant', () => {
  const URL = useUrl().url
  const user = useUser()
  const ec = useEc()
  const show = useShow()
  const password = usePassword()
  const messages = useMessages()
  const infosheader = useInfosheader()
  const infossetup = useInfossetup()
  const mention = useMention()
  const parcour = useParcour()

  const ListeENS = ref([])
  const ListeChefMention = ref([])
  const ListeChefParcours = ref([])
  const ListeENSEDT = ref([])
  const ListeENSTemp = ref([])
  const nomComplet_ens = ref('')
  const nom_ens = ref('')
  const nom_ensEDT = ref('')
  const idTop = ref(null)
  const id_ens = ref(null)
  const id_ensEDT = ref(null)
  const idBottom = ref(null)
  const name = ref('')
  const date_recrutement_ens = ref('')
  const categorie_ens = ref('')
  const grade_ens = ref('')
  const searchalue = ref('')
  const telephone_ens = ref(null)
  const selectedType = ref('enseignant')

  function createEnseignant() {
    show.showSpinner = true
    const formDataUserENS = {
      status_user: 'ENS',
      validiter_compte: true,
      email: user.email,
      password: password.password,
      photo: user.photo
    }
    axios
      .post(`${URL}/api/user/register`, formDataUserENS, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        if (response.data) {
          const formDataENS = {
            nomComplet_ens: nomComplet_ens.value,
            grade_ens: grade_ens.value,
            categorie_ens: categorie_ens.value,
            telephone_ens: telephone_ens.value,
            date_recrutement_ens: date_recrutement_ens.value.split('-').reverse().join('-'),
            user_id: response.data.id
          }
          axios
            .post(`${URL}/api/enseignant`, formDataENS, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then((response) => {
              getAllENS()
              if (selectedType.value === 'mention' && mention.mentionParcours.id) {
                mention.addRespMentionAdd(response.data.id)
              }
              if (selectedType.value === 'parcours' && parcour.parcours_id) {
                parcour.addRespParcoursAdd(response.data.id)
              }
            })
            .catch((err) => {
              console.error(err)
              show.showSpinner = false
            })
          messages.messageSucces = 'Compte créé !'
          setTimeout(() => {
            messages.messageSucces = ''
          }, 3000)
          date_recrutement_ens.value = ''
          telephone_ens.value = null
          nomComplet_ens.value = ''
        }
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
    user.photo = null
    user.photoName = ''
    password.password = ''
    user.email = ''
  }

  function getAllENS() {
    //Corrige nomEns tsy miala après suppr ens
    nom_ens.value = ''
    name.value = ''
    show.showSpinner = true
    axios
      .get(`${URL}/api/enseignant`)
      .then((response) => {
        ListeENS.value = []
        if (response.data.length !== 0) {
          ListeENS.value = response.data
          ListeChefMention.value = filterByMention(response.data)
          ListeChefParcours.value = filterByParcours(response.data)
          nom_ens.value = ListeENS.value[0].nomComplet_ens
          name.value = ListeENS.value[0].nomComplet_ens
          idBottom.value = ListeENS.value[0].id
          idTop.value = ListeENS.value[0].id
          ListeENSTemp.value = response.data
        }
        show.showSpinner = false
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  function filterByMention(array) {
    return array.filter((element) => element.chefMention_status === '1')
  }

  function filterByParcours(array) {
    return array.filter((element) => element.chefParcours_status === '1')
  }

  function getAllENSEDT() {
    axios
      .get(`${URL}/api/enseignant`)
      .then((response) => {
        if (response.data.length !== 0) {
          ListeENSEDT.value = response.data
          nom_ensEDT.value = response.data[0].nomComplet_ens
          id_ensEDT.value = response.data[0].id
          ec.getAllECByEnsEDT(id_ensEDT.value)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function setEnseignant() {
    show.showSpinner = true
    let formData = {
      nomComplet_ens: infossetup.nom,
      telephone_ens: infossetup.telephone
    }

    axios
      .put(`${URL}/api/enseignant/${id_ens.value}`, formData)
      .then((response) => {
        let user = localStorage.getItem('user')
        user = JSON.parse(user)
        if (user.user.status_user === 'ENS') {
          infosheader.nom = response.data.nomComplet_ens
          infossetup.nom = response.data.nomComplet_ens
          infossetup.telephone = response.data.telephone_ens
          user.nomComplet_ens = response.data.nomComplet_ens
          user.telephone_ens = response.data.telephone_ens
        }
        let updatedUser = JSON.stringify(user)
        localStorage.setItem('user', updatedUser)
        messages.messageSucces = 'Modification réussi !'
        show.showSpinner = false
        setTimeout(() => {
          messages.messageSucces = ''
        }, 3000)
      })
      .catch((err) => {
        console.error(err)
        show.showSpinner = false
      })
  }

  function search(valeur) {
    if (!valeur) {
      getAllENS()
    } else {
      ListeENS.value = ListeENSTemp.value
      ListeENS.value = ListeENS.value.filter((list) => {
        return list.nomComplet_ens.toLocaleLowerCase().match(valeur.toLocaleLowerCase())
      })
    }
  }

  return {
    nomComplet_ens,
    date_recrutement_ens,
    telephone_ens,
    ListeENS,
    grade_ens,
    searchalue,
    categorie_ens,
    nom_ens,
    name,
    idTop,
    id_ens,
    idBottom,
    ListeENSEDT,
    nom_ensEDT,
    id_ensEDT,
    ListeChefMention,
    ListeChefParcours,
    selectedType,
    getAllENSEDT,
    createEnseignant,
    setEnseignant,
    getAllENS,
    search
  }
})
