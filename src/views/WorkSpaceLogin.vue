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
          <div class="flex justify-center flex-wrap gap-10">
            <div class="px-2">
              <div>
                <h1 class="text-2xl logoESP mt-10">
                  {{ etablissement.etablissement.nom_etab }} d'{{
                    etablissement.etablissement.ville_etab
                  }}
                </h1>
                <p class="mt-2 text-gray-500">
                  <font-awesome-icon
                    class="cursor-pointer text-gray-500"
                    :icon="['fas', 'quote-left']"
                  />
                  {{ etablissement.etablissement.slogan_etab }}
                  <font-awesome-icon
                    class="cursor-pointer text-gray-500"
                    :icon="['fas', 'quote-right']"
                  />
                </p>
              </div>
              <div class="mt-10">
                <figure class="hero-banner">
                  <div class="img-holder one">
                    <img
                      :src="`${URL}/storage/acceuil/${acceuil.photoAcceuil.photoNameOne}`"
                      width="330"
                      height="300"
                      class="img-cover !w-[330px] !h-[300px]"
                    />
                  </div>
                  <div class="img-holder two">
                    <img
                      :src="`${URL}/storage/acceuil/${acceuil.photoAcceuil.photoNameTwo}`"
                      width="330"
                      height="300"
                      class="img-cover !w-[330px] !h-[300px]"
                    />
                  </div>
                </figure>
              </div>
            </div>
            <div class="flex justify-center items-center w-[40%]">
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
            <ul class="flex justify-center flex-wrap gap-4 items-center">
              <div
                v-for="mention in acceuil.listMention"
                :key="mention.id"
                class="category-card w-80"
                data-animate="fade-in"
              >
                <div class="card-icon !bg-gray-400/20">
                  <img
                    :src="`${URL}/storage/mentions/${mention.photo_name}`"
                    width="40"
                    height="40"
                    loading="lazy"
                    class="img !w-[40px] !h-[40px] rounded-full"
                  />
                </div>
                <p class="font-bold text-lg">{{ mention.nomMention }}</p>
                <p class="card-text text-sm !text-gray-600">
                  {{ mention.descriptionMention }}
                </p>
              </div>
            </ul>
          </div>
        </section>

        <section v-if="!isAllAnnonce" class="section about" id="apropos" aria-label="about">
          <div class="container">
            <figure class="about-banner">
              <div class="img-holder">
                <img
                  :src="`${URL}/storage/acceuil/${acceuil.photoAcceuil.photoNameThree}`"
                  width="520"
                  height="370"
                  loading="lazy"
                  class="img-cover !w-[520px] !h-[370px]"
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
                <p
                  class="text-2xl font-bold border-t-0 border-x-0 border-4 py-4 border-b-gray-100/20"
                >
                  {{ etablissement.etablissement.ville_etab }}
                </p>
              </div>
              <ul class="mt-10 flex flex-col gap-4">
                <li>
                  <font-awesome-icon
                    class="cursor-pointer text-black mr-2"
                    :icon="['fas', 'terminal']"
                  />
                  <b class="text-3xl text-black mr-2 logoESP">{{ enseignant.ListeENS.length }}</b>
                  Enseignants
                </li>
                <p class="text-gray-600 mt-2 text-sm">
                  ✅ Nos
                  <font-awesome-icon
                    class="cursor-pointer text-gray-500"
                    :icon="['fas', 'quote-left']"
                  /><b> ENSEIGNANTS </b
                  ><font-awesome-icon
                    class="cursor-pointer text-gray-500"
                    :icon="['fas', 'quote-right']"
                  />, experts et expérimentés, offrent un <b>enseignement de qualité</b> alliant
                  théorie et pratique. Leur pédagogie et leur engagement garantissent une
                  <b>formation enrichissante</b> pour chaque apprenant.
                </p>
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

        <section
          v-if="!isAllAnnonce && annonces.listAnnonce.length !== 0"
          class="section course"
          id="actualite"
          aria-label="course"
        >
          <div class="container">
            <div class="py-10">
              <p class="text-lg text-center logoESP text-green-500">
                <font-awesome-icon
                  class="cursor-pointer text-green-500 mr-2"
                  :icon="['fas', 'podcast']"
                />Dernières annonces
              </p>
            </div>
            <ul class="flex justify-center items-center gap-10">
              <li
                class="w-80"
                :key="ann.id"
                v-for="(ann, index) in annonces.listAnnonce.slice(0, 3)"
              >
                <div class="course-card">
                  <figure class="card-banner img-holder h-[200px]">
                    <img
                      :src="`${URL}/storage/annonce/${ann.fichier_nom}`"
                      width="370"
                      height="220"
                      loading="lazy"
                      class="img-cover"
                    />
                  </figure>
                  <div class="abs-badge">
                    <span class="span text-xs">{{ ann.timeAgo }}</span>
                  </div>
                  <div class="flex flex-col justify-between p-4">
                    <span class="badge text-xs">{{ ann.user.email }}</span>
                    <h3 class="h3">
                      <a class="card-title text-sm font-bold">{{ ann.titre }}</a>
                    </h3>
                    <div class="wrapper">
                      <p
                        v-html="highlightHashtags(ann.description)"
                        class="card-text text-sm whitespace-pre-wrap truncate"
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
            <div class="pb-5">
              <p class="text-lg text-center logoESP text-green-500">
                <font-awesome-icon
                  class="cursor-pointer text-green-500 mr-2"
                  :icon="['fas', 'podcast']"
                />Toutes les annonces
              </p>
            </div>
            <div class="flex items-center justify-center text-xs flex-wrap gap-4">
              <div class="relative" ref="menuRef">
                <button
                  @click="showCategorieMenu = !showCategorieMenu"
                  class="px-4 py-2 rounded flex gap-2 items-center text-gray-600 !bg-gray-200"
                >
                  Catégories <font-awesome-icon class="cursor-pointer" :icon="['fas', 'filter']" />
                </button>

                <div
                  v-if="showCategorieMenu"
                  class="absolute left-0 top-full mt-1 bg-white border max-h-40 overflow-y-auto shadow-lg rounded w-48 p-2 z-10"
                >
                  <p class="flex items-center cursor-pointer hover:bg-gray-100 p-1 px-2 rounded">
                    <span class="!flex gap-2">
                      <input
                        type="radio"
                        value="Tout"
                        v-model="filtreCategorie"
                        class="cursor-pointer"
                      />Tout</span
                    >
                  </p>
                  <p
                    v-for="cat in category.listCategorie"
                    :key="cat"
                    class="flex items-center cursor-pointer hover:bg-gray-100 p-1 px-2 rounded"
                  >
                    <span class="!flex gap-2">
                      <input
                        type="radio"
                        :value="cat.titre"
                        v-model="filtreCategorie"
                        class="cursor-pointer"
                      />{{ cat.titre }}</span
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
                <SelectTrigger
                  class="w-40 text-center select-trigger h-8 !bg-gray-200 !text-gray-600"
                >
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
            <ul class="flex justify-center flex-wrap gap-10 mt-10 px-5">
              <li class="w-[350px]" :key="ann.id" v-for="(ann, index) in annoncesAffichees">
                <div class="course-card">
                  <figure class="card-banner img-holder h-[200px]">
                    <img
                      :src="`${URL}/storage/annonce/${ann.fichier_nom}`"
                      width="370"
                      height="220"
                      loading="lazy"
                      class="img-cover"
                    />
                  </figure>
                  <div class="abs-badge">
                    <span class="span text-xs">{{ ann.timeAgo }}</span>
                  </div>
                  <div class="flex flex-col justify-between p-4">
                    <span class="badge text-xs">{{ ann.user.email }}</span>
                    <h3 class="h3">
                      <a class="card-title text-sm font-bold">{{ ann.titre }}</a>
                    </h3>
                    <div class="wrapper">
                      <p
                        v-html="highlightHashtags(ann.description)"
                        class="card-text text-sm whitespace-pre-wrap truncate"
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
            <div
              v-if="annoncesAffichees.length === 0"
              class="flex items-center justify-center flex-col"
            >
              <div
                class="h-20 w-36 bg-[url('../assets/pngtree-empty-box-icon-for-your-project-png-image_1533458-removebg-preview.png')] bg-cover bg-center"
              ></div>
              <p class="text-xs font-bold mt-2">Aucune annonce trouvée</p>
            </div>
            <div
              v-if="annoncesAffichees.length !== 0"
              class="flex text-xs items-center justify-center flex-wrap gap-4 mt-10"
            >
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
    <footer class="bg-gray-500 text-white text-xs mt-20 pt-5">
      <div class="footer-top section">
        <div class="flex flex-row-reverse items-top justify-evenly gap-5 flex-wrap">
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

          <div class="footer-list px-2">
            <p class="footer-list-title logoESP">Contact</p>
            <p class="footer-list-text mt-5">Écrivez dans le champ ci-dessus pour nous contacter</p>
            <div class="newsletter-form">
              <textarea
                type="email"
                name="email_address"
                placeholder="Votre message"
                v-model="message"
                required
                class="input-field focus:outline-none text-black !w-80 !h-20"
              ></textarea>

              <button :disabled="!message" @click="sendEmail" class="btn has-before">
                <span class="span">Envoyer</span>
              </button>
            </div>
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
import { useCategory } from '@/stores/Category'
import { useAcceuil } from '@/stores/Acceuil'
import { useEnseignant } from '@/stores/Enseignant'
import { useEtudiant } from '@/stores/Etudiant'

const dateFiltreOptions = [
  'Tout',
  'Il y a 1 mois',
  'Il y a 3 mois',
  'Il y a 6 mois',
  'Plus de 1 an'
]

const menuRef = ref(null)
const message = ref('')
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
const category = useCategory()
const acceuil = useAcceuil()
const enseignant = useEnseignant()
const etudiant = useEtudiant()

onBeforeMount(async () => {
  await Promise.all([acceuil.getPhotoAcceuil(), acceuil.getAllMention(), enseignant.getAllENS()])
})

const sendEmail = () => {
  const subject = encodeURIComponent('Sujet de votre email')
  const body = encodeURIComponent(message.value)
  const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${etablissement.etablissement.email_etab}&su=${subject}&body=${body}`
  window.open(mailtoLink, '_blank')
  message.value = ''
}

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

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-10')
        entry.target.classList.add('opacity-100', 'translate-y-0')
        if (entry.target.getAttribute('data-animate') === 'counter') {
          const counter = entry.target.querySelector('b')
          const targetNumber = parseInt(counter.textContent, 10)
          let currentNumber = 0
          const increment = targetNumber / 100
          const interval = setInterval(() => {
            currentNumber += increment
            if (currentNumber >= targetNumber) {
              currentNumber = targetNumber
              clearInterval(interval)
            }
            counter.textContent = Math.round(currentNumber)
          }, 30)
        }
      }
    })
  })

  const fadeInElements = document.querySelectorAll('[data-animate="fade-in"]')
  const counterElements = document.querySelectorAll('[data-animate="counter"]')

  fadeInElements.forEach((el) => observer.observe(el))
  counterElements.forEach((el) => observer.observe(el))
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const annoncesFiltrees = computed(() => {
  let result = annonces.listAnnonce

  if (filtreCategorie.value !== 'Tout') {
    result = result.filter((a) => a.categori.titre === filtreCategorie.value)
  }

  if (recherche.value) {
    result = result.filter(
      (a) =>
        (a.titre && a.titre.toLowerCase().includes(recherche.value.toLowerCase())) ||
        (a.description && a.description.toLowerCase().includes(recherche.value.toLowerCase()))
    )
  }

  if (filtreDate.value) {
    const now = new Date()
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())

    result = result.filter((a) => {
      const annonceDate = new Date(a.created_at)
      const monthsAgo = (date) => {
        const d = new Date(date)
        d.setMonth(now.getMonth() - d.getMonth())
        return d
      }

      switch (filtreDate.value.trim()) {
        case 'Il y a 1 mois':
          return annonceDate <= monthsAgo(1) && annonceDate > oneYearAgo
        case 'Il y a 3 mois':
          return annonceDate <= monthsAgo(3) && annonceDate > oneYearAgo
        case 'Il y a 6 mois':
          return annonceDate <= monthsAgo(6) && annonceDate > oneYearAgo
        case 'Plus de 1 an':
          return annonceDate <= oneYearAgo
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
