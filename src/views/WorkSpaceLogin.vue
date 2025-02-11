<template>
  <header class="header" :class="{ active: isHeaderActive }" data-header>
    <div class="container">
      <a class="logo flex items-center gap-2">
        <img src="../assets/logo_espa-removebg-preview.png" class="h-20 w-20" />
      </a>

      <nav class="navbar" :class="{ active: isNavbarActive }" data-navbar>
        <div class="wrapper">
          <a class="logo">
            <img
              :src="`${URL}/storage/etablissement/${etablissement.etablissement.nomlogo_etab}`"
              class="h-20 w-20"
            />
          </a>
          <button class="nav-close-btn" aria-label="close menu" @click="toggleNavbar"></button>
        </div>

        <ul class="navbar-list">
          <li class="navbar-item" @click="switchToMain">
            <a href="#acceuil" class="navbar-link" @click="closeNavbar"
              ><font-awesome-icon
                class="navbar-links cursor-pointer mb-0.5 text-gray-500 mr-2"
                :icon="['fas', 'home']"
              />Acceuil</a
            >
          </li>
          <li @click="switchToMain" class="navbar-item">
            <a href="#apropos" class="navbar-link" @click="closeNavbar">
              <font-awesome-icon
                class="navbar-links cursor-pointer text-gray-500 mr-2"
                :icon="['fas', 'circle-info']"
              />À propos</a
            >
          </li>
          <li @click="switchToMain" class="navbar-item">
            <a href="#actualite" class="navbar-link" @click="closeNavbar">
              <font-awesome-icon
                class="navbar-links cursor-pointer text-gray-500 mr-2"
                :icon="['fas', 'podcast']"
              />Actualités</a
            >
          </li>
          <li @click="switchToInsccr" class="navbar-item">
            <a href="#inscription" class="navbar-link" @click="closeNavbar">
              <font-awesome-icon
                class="navbar-links cursor-pointer text-gray-500 mr-2"
                :icon="['fas', 'graduation-cap']"
              />Inscription</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <div class="site-container">
    <main v-if="isMainPage" class="mainComponent">
      <article>
        <div v-if="!isAllAnnonce" class="heros" id="acceuil" aria-label="home">
          <div class="flex justify-center">
            <div>
              <div>
                <h1 class="text-2xl logoESP mt-10">
                  {{ etablissement.etablissement.nom_etab }} d'{{
                    etablissement.etablissement.ville_etab
                  }}
                </h1>
                <p class="mt-2 text-gray-500">« {{ etablissement.etablissement.slogan_etab }} »</p>
              </div>
              <div class="mt-10">
                <figure class="hero-banner">
                  <div class="img-holder one">
                    <img
                      src="./assets/images/hero-banner-1.jpg"
                      width="270"
                      height="300"
                      class="img-cover"
                    />
                  </div>
                  <div class="img-holder two">
                    <img
                      src="./assets/images/hero-banner-2.jpg"
                      width="240"
                      height="370"
                      class="img-cover"
                    />
                  </div>
                </figure>
              </div>
            </div>
            <div class="flex justify-center items-center w-[50%]">
              <div class="form bg-white rounded-xl px-10 rounded-sm pb-10 rounded-sm">
                <div>
                  <div class="flex justify-center mt-5">
                    <img
                      src="../assets/depositphotos_35717211-stock-illustration-vector-user-icon-removebg-preview.png"
                      class="h-20 w-20"
                    />
                  </div>
                  <div class="text-center text-xl logoESP mt-5">Connectez-vous !</div>
                </div>
                <div class="inputButton">
                  <div class="mt-10">
                    <input
                      type="text"
                      v-model="user.email"
                      @keyup.enter="user.login()"
                      placeholder="Adresse email"
                      class="pl-3 pr-3 block w-72 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                    />
                  </div>
                  <div class="mt-[10%] relative">
                    <input
                      placeholder="Mot de passe"
                      v-model="user.password"
                      :type="show.showPassword ? 'text' : 'password'"
                      @keyup.enter="user.login()"
                      class="pl-3 pr-10 block w-72 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                    />
                    <button
                      type="button"
                      @click="show.togglePasswordVisibility()"
                      class="absolute inset-y-0 right-3 pl-3 flex items-center text-gray-600"
                    >
                      <EyeIcon v-if="!show.showPassword" class="h-6 w-5" />
                      <EyeSlashIcon v-else class="h-6 w-5" />
                    </button>
                  </div>
                  <p class="cursor-pointer text-blue-500 mt-5 text-right text-xs">
                    Mot de passe oublié ?
                  </p>
                  <Button
                    :disabled="!user.email || !user.password"
                    @click="user.login()"
                    class="w-72 border btns text-white mt-[8%] py-2 !block rounded cursor-pointer"
                    >Connexion</Button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <section v-if="!isAllAnnonce" class="section category mt-20" aria-label="category">
          <div class="container">
            <ul class="grid-list">
              <div class="category-card">
                <div class="card-icon !bg-gray-200">
                  <img
                    src="./assets/images/category-1.svg"
                    width="40"
                    height="40"
                    loading="lazy"
                    class="img"
                  />
                </div>
                <p class="font-bold text-lg">Online Degree Programs</p>
                <p class="card-text">Lorem ipsum dolor consec tur elit adicing sed umod tempor.</p>
              </div>
              <div class="category-card">
                <div class="card-icon !bg-gray-200">
                  <img
                    src="./assets/images/category-2.svg"
                    width="40"
                    height="40"
                    loading="lazy"
                    class="img"
                  />
                </div>
                <p class="font-bold text-lg">Online Degree Programs</p>
                <p class="card-text">Lorem ipsum dolor consec tur elit adicing sed umod tempor.</p>
              </div>
              <div class="category-card">
                <div class="card-icon !bg-gray-200">
                  <img
                    src="./assets/images/category-3.svg"
                    width="40"
                    height="40"
                    loading="lazy"
                    class="img"
                  />
                </div>
                <p class="font-bold text-lg">Online Degree Programs</p>
                <p class="card-text">Lorem ipsum dolor consec tur elit adicing sed umod tempor.</p>
              </div>
              <div class="category-card">
                <div class="card-icon !bg-gray-200">
                  <img
                    src="./assets/images/category-4.svg"
                    width="40"
                    height="40"
                    loading="lazy"
                    class="img"
                  />
                </div>
                <p class="font-bold text-lg">Online Degree Programs</p>
                <p class="card-text">Lorem ipsum dolor consec tur elit adicing sed umod tempor.</p>
              </div>
            </ul>
          </div>
        </section>

        <section v-if="!isAllAnnonce" class="section about" id="apropos" aria-label="about">
          <div class="container">
            <figure class="about-banner">
              <div class="img-holder">
                <img
                  src="./assets/images/about-banner.jpg"
                  width="520"
                  height="370"
                  loading="lazy"
                  class="img-cover"
                />
              </div>
              <img
                src="./assets/images/about-shape-3.png"
                width="722"
                height="528"
                loading="lazy"
                class="shape about-shape-3"
              />
            </figure>
            <div class="about-content">
              <div class="flex items-center gap-4 logoESP">
                <p class="text-2xl font-bold border-t-0 border-x-0 border-4 border-b-blue-500 py-4">
                  {{ etablissement.etablissement.abr_etab }}
                </p>
                <p class="text-2xl font-bold border-t-0 border-x-0 border-4 py-4 border-b-gray-50">
                  {{ etablissement.etablissement.ville_etab }}
                </p>
              </div>
              <h2 class="text-sm section-title mt-4">
                Over 10 Years in <span class="span">Distant learning</span> for Skill Development
              </h2>
              <p class="mt-4 text-gray-500 text-sm">
                Lorem ipsum dolor sit amet consectur adipiscing elit sed eiusmod ex tempor
                incididunt labore dolore magna aliquaenim ad minim.
              </p>
              <ul class="about-list flex flex-col gap-4 mt-5">
                <li class="text-sm text-yellow-400 font-bold">
                  <span class="font-bold">Expert Trainers</span>
                </li>
                <li class="text-sm text-yellow-400">
                  <span class="font-bold">Expert Trainers</span>
                </li>
                <li class="text-sm text-yellow-400">
                  <span class="font-bold">Expert Trainers</span>
                </li>
              </ul>
              <img
                src="./assets/images/about-shape-4.svg"
                width="100"
                height="100"
                loading="lazy"
                class="shape about-shape-4"
              />
            </div>
          </div>
        </section>

        <section v-if="!isAllAnnonce" class="section course" id="actualite" aria-label="course">
          <div class="container">
            <div class="py-10">
              <p class="text-lg text-center logoESP text-green-500">
                <font-awesome-icon
                  class="cursor-pointer text-green-500 mr-2"
                  :icon="['fas', 'podcast']"
                />Dernières annonces
              </p>
            </div>
            <ul class="grid-list">
              <li>
                <div :key="ann.id" v-for="(ann, index) in annonces.listAnnonce" class="course-card">
                  <figure class="card-banner img-holder">
                    <img
                      :src="`${URL}/storage/annonce/${ann.fichier_nom}`"
                      width="370"
                      height="220"
                      loading="lazy"
                      class="img-cover"
                    />
                  </figure>
                  <div class="abs-badge">
                    <span class="span">{{ ann.timeAgo }}</span>
                  </div>
                  <div class="card-content">
                    <span class="badge">{{ ann.user.email }}</span>
                    <h3 class="h3">
                      <a class="card-title text-lg font-bold">{{ ann.titre }}</a>
                    </h3>
                    <div class="wrapper">
                      <p
                        v-html="highlightHashtags(ann.description)"
                        class="card-text text-sm whitespace-pre-wrap"
                      ></p>
                    </div>
                    <ul class="card-meta-list mt-4">
                      <li class="card-meta-item flex justify-between items-center w-full">
                        <span class="text-sm">{{ ann.likes_count }} J'aime</span>
                        <font-awesome-icon
                          @click="telecharger(ann.fichier_nom)"
                          class="cursor-pointer text-blue-500 bg-blue-200 py-1.5 p-2 rounded-full relative overflow-hidden transition duration-500 ease-in-out hover:bg-yellow-400 hover:text-white hover:shadow-lg before:absolute before:inset-0 before:-left-full before:bg-white/30 before:w-full before:h-full before:transition before:duration-700 hover:before:left-full"
                          :icon="['fas', 'arrow-down']"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
            <a @click="toogleAnnonce" class="btn has-before cursor-pointer">
              <span class="flex items-center"
                >Voir plus <font-awesome-icon class="ml-2" :icon="['fas', 'chevron-right']"
              /></span>
            </a>
          </div>
        </section>
        <div v-if="isAllAnnonce">
          <div class="heros">
            <div class="py-10">
              <p class="text-lg text-center logoESP text-green-500">
                <font-awesome-icon
                  class="cursor-pointer text-green-500 mr-2"
                  :icon="['fas', 'podcast']"
                />Toutes les annonces
              </p>
            </div>
            <div class="flex items-center justify-center gap-4">
              <div class="relative" ref="menuRef">
                <button
                  @click="showCategorieMenu = !showCategorieMenu"
                  class="px-4 py-2 rounded flex gap-2 items-center text-gray-600 !bg-gray-200"
                >
                  Catégories <font-awesome-icon class="cursor-pointer" :icon="['fas', 'filter']" />
                </button>

                <div
                  v-if="showCategorieMenu"
                  class="absolute left-0 top-full mt-1 bg-white border h-40 overflow-y-auto shadow-lg rounded w-48 p-2 z-10"
                >
                  <p
                    v-for="cat in categories"
                    :key="cat"
                    class="flex items-center cursor-pointer hover:bg-gray-100 p-1 px-2 rounded"
                  >
                    <span class="!flex gap-2">
                      <input
                        type="radio"
                        :value="cat"
                        v-model="filtreCategorie"
                        class="cursor-pointer"
                      />{{ cat }}</span
                    >
                  </p>
                </div>
              </div>
              <div class="flex">
                <input
                  type="text"
                  v-model="recherche"
                  placeholder="Rechercher une annonce..."
                  class="!w-60 py-2 pl-2 focus:outline-none !bg-white"
                />
                <p class="bg-blue-500 px-4 flex items-center rounded-r bg-white justify-center">
                  <font-awesome-icon
                    class="cursor-pointer text-blue-500"
                    :icon="['fas', 'magnifying-glass']"
                  />
                </p>
              </div>
              <Select @update:modelValue="handleDate">
                <SelectTrigger class="w-40 text-center select-trigger !bg-gray-200 !text-gray-600">
                  <SelectValue class="focus:outline-none" placeholder="Filtrer par date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="option in dateFiltreOptions" :value="option" :key="option">
                      {{ option }}</SelectItem
                    >
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 px-10 mt-10">
              <div
                v-for="annonce in annoncesAffichees"
                :key="annonce.id"
                class="p-4 bg-gray-100 rounded-lg shadow-sm transition-transform transform hover:scale-105 hover:shadow-md"
              >
                <h3 class="font-semibold text-lg">{{ annonce.titre }}</h3>
                <p class="text-gray-500">{{ annonce.categorie }} - {{ annonce.date }}</p>
              </div>
            </div>
            <div class="flex items-center justify-center flex-col">
              <div
                class="h-20 w-36 bg-[url('../assets/pngtree-empty-box-icon-for-your-project-png-image_1533458-removebg-preview.png')] bg-cover bg-center"
              ></div>
              <p class="text-xs font-bold mt-2">Aucune annonce trouvée</p>
            </div>
            <div class="flex items-center justify-center gap-4 mt-10">
              <p class="text-xs font-bold">Affichage :</p>
              <Select @update:modelValue="handlePage">
                <SelectTrigger class="w-40 text-center select-trigger !bg-white">
                  <SelectValue class="focus:outline-none" placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="10"> 10 par page</SelectItem>
                    <SelectItem value="20"> 20 par page</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div class="flex space-x-2">
                <button
                  @click="pageActuelle--"
                  :disabled="pageActuelle === 1"
                  class="px-3 py-1 !bg-blue-500 text-white flex items-center !text-xs rounded disabled:opacity-50"
                >
                  Précédent
                </button>
                <span class="px-4 py-2 rounded">{{ pageActuelle }} / {{ totalPages }}</span>
                <button
                  @click="pageActuelle++"
                  :disabled="pageActuelle >= totalPages"
                  class="px-3 py-1 !bg-blue-500 text-white flex items-center !text-xs rounded disabled:opacity-50"
                >
                  Suivant
                </button>
              </div>

              <span class="text-sm text-gray-600 text-xs"
                >({{ annoncesAffichees.length }} / {{ annoncesFiltrees.length }}) annonces
                affichées</span
              >
            </div>
          </div>
        </div>
      </article>
    </main>
    <div v-if="isSingUp" id="inscription" class="insccription">
      <p class="heros mt-10">
        <Inscription />
      </p>
    </div>
    <footer class="bg-gray-500 text-white mt-20 pt-5">
      <div class="footer-top section">
        <div class="flex flex-row-reverse items-top justify-evenly">
          <div class="footer-brand">
            <a class="logo">
              <img
                :src="`${URL}/storage/etablissement/${etablissement.etablissement.nomlogo_etab}`"
                class="h-20 w-20"
              />
            </a>
            <div class="pt-5 flex flex-col gap-2">
              <div class="wrapper">
                <span class="span"
                  ><font-awesome-icon class="cursor-pointer" :icon="['fas', 'home']"
                /></span>
                <address class="address">
                  {{ etablissement.etablissement.codePostal_etab }}-{{
                    etablissement.etablissement.ville_etab
                  }}-{{ etablissement.etablissement.pays_etab }}
                </address>
              </div>
              <div class="wrapper">
                <span class="span"
                  ><font-awesome-icon class="cursor-pointer" :icon="['fas', 'phone']"
                /></span>
                <a href="tel:+011234567890">+01 123 4567 890</a>
              </div>
              <div class="wrapper">
                <span class="span"
                  ><font-awesome-icon class="cursor-pointer" :icon="['fas', 'envelope']"
                /></span>
                <a href="mailto:info@eduweb.com">{{ etablissement.etablissement.email_etab }}</a>
              </div>
            </div>
          </div>

          <div class="footer-list">
            <p class="footer-list-title logoESP">Contact</p>
            <p class="footer-list-text">Écrivez dans le champ ci-dessus pour nous contacter</p>
            <form action="" class="newsletter-form">
              <textarea
                type="email"
                name="email_address"
                placeholder="Votre message"
                required
                class="input-field focus:outline-none text-black !w-80 !h-20"
              ></textarea>

              <button type="submit" class="btn has-before">
                <span class="span">Envoyer</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  </div>
  <a
    href="#top"
    class="back-top-btn px-3 py-2"
    :class="{ active: isHeaderActive }"
    aria-label="back top top"
    data-back-top-btn
  >
    <font-awesome-icon class="cursor-pointer text-white" :icon="['fas', 'angle-up']" />
  </a>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid'
import { useShow } from '@/stores/Show'
import { useEtablissement } from '@/stores/Etablissement'
import { onBeforeMount } from 'vue'
import { useUrl } from '@/stores/url'
import { useUser } from '@/stores/User'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import Inscription from './Inscription.vue'
import { useAnnonce } from '@/stores/Annonce'

const Listeannonces = ref([
  // { id: 1, titre: 'Annonce 1', categorie: 'Immobilier', date: '2024-12-15' },
])
const categories = ['Tout', 'Immobilier', 'Emploi', 'Véhicules', 'Multimédia', 'Services', 'Maison']
const dateFiltreOptions = ['Ce mois', '3 derniers mois', '6 derniers mois', '1 an']
const menuRef = ref(null)
const filtreCategorie = ref('Tout')
const recherche = ref('')
const filtreDate = ref('')
const annoncesParPage = ref(10)
const pageActuelle = ref(1)
const showCategorieMenu = ref(false)
const isNavbarActive = ref(false)
const isHeaderActive = ref(false)
const show = useShow()
const etablissement = useEtablissement()
const user = useUser()
const URL = useUrl().url
const isMainPage = ref(true)
const isSingUp = ref(false)
const isAllAnnonce = ref(false)
const annonces = useAnnonce()

function handlePage(valeur) {
  annoncesParPage.value = valeur
}

function telecharger(nom) {
  const url = `${URL}/api/annonce/files/${nom}`
  const link = document.createElement('a')
  link.href = url
  link.download = nom
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function highlightHashtags(text) {
  if (text) {
    if (text.includes('#')) {
      text = text.replace(/#(\w+)/g, '<span class="text-blue-500 font-bold">#$1</span>')
    }
    if (text.includes('@')) {
      text = text.replace(/@(\w+)/g, '<span class="font-bold">@$1</span>')
    }
  }
  return text
}

function handleDate(valeur) {
  filtreDate.value = valeur
}

const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    showCategorieMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const annoncesFiltrees = computed(() => {
  let result = Listeannonces.value

  if (filtreCategorie.value !== 'Tout') {
    result = result.filter((a) => a.categorie === filtreCategorie.value)
  }

  if (recherche.value) {
    result = result.filter((a) => a.titre.toLowerCase().includes(recherche.value.toLowerCase()))
  }

  if (filtreDate.value) {
    const now = new Date()
    result = result.filter((a) => {
      const annonceDate = new Date(a.date)
      switch (filtreDate.value) {
        case 'Ce mois':
          return (
            now.getMonth() === annonceDate.getMonth() &&
            now.getFullYear() === annonceDate.getFullYear()
          )
        case '3 derniers mois':
          return (now - annonceDate) / (1000 * 60 * 60 * 24) <= 90
        case '6 derniers mois':
          return (now - annonceDate) / (1000 * 60 * 60 * 24) <= 180
        case '1 an':
          return now.getFullYear() === annonceDate.getFullYear()
        default:
          return true
      }
    })
  }

  return result
})

const totalPages = computed(() => Math.ceil(annoncesFiltrees.value.length / annoncesParPage.value))
const annoncesAffichees = computed(() =>
  annoncesFiltrees.value.slice(
    (pageActuelle.value - 1) * annoncesParPage.value,
    pageActuelle.value * annoncesParPage.value
  )
)

onBeforeMount(() => {
  etablissement.getEtab()
})

function toogleAnnonce() {
  isAllAnnonce.value = !isAllAnnonce.value
}

function switchToMain() {
  isSingUp.value = false
  isAllAnnonce.value = false
  isMainPage.value = true
}

function switchToInsccr() {
  isSingUp.value = false
  isMainPage.value = false
  isSingUp.value = true
}

const toggleNavbar = () => {
  isNavbarActive.value = !isNavbarActive.value
}

const closeNavbar = () => {
  isNavbarActive.value = false
}

const activeElem = () => {
  if (window.scrollY > 100) {
    isHeaderActive.value = true
  } else {
    isHeaderActive.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', activeElem)
})

onUnmounted(() => {
  window.removeEventListener('scroll', activeElem)
})
</script>

<style scoped src="../styles/Login.css"></style>
