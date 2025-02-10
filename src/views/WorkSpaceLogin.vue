<template>
  <header class="header" :class="{ active: isHeaderActive }" data-header>
    <div class="container">
      <a class="logo flex items-center gap-2">
        <img src="../assets/logo_espa-removebg-preview.png" class="h-20 w-20" alt="EduWeb logo" />
      </a>

      <nav class="navbar" :class="{ active: isNavbarActive }" data-navbar>
        <div class="wrapper">
          <a class="logo">
            <img
              src="../assets/logo_espa-removebg-preview.png"
              class="h-20 w-20"
              alt="EduWeb logo"
            />
          </a>
          <button class="nav-close-btn" aria-label="close menu" @click="toggleNavbar"></button>
        </div>

        <ul class="navbar-list">
          <li class="navbar-item" @click="switchToMain">
            <a href="#acceuil" class="navbar-link" @click="closeNavbar"
              ><font-awesome-icon
                class="navbar-links cursor-pointer text-gray-500 mr-2"
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
              />Actualité</a
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
    <main v-if="isMainPage">
      <article>
        <div class="heros" id="acceuil" aria-label="home">
          <div class="flex justify-center">
            <div>
              <div>
                <h1 class="text-2xl logoESP mt-10">Ecole supérieur polytechnique d'Antsiranana</h1>
                <p class="mt-2 text-gray-500">« Polyvalence par excelence »</p>
              </div>
              <div class="mt-10">
                <figure class="hero-banner">
                  <div class="img-holder one">
                    <img
                      src="./assets/images/hero-banner-1.jpg"
                      width="270"
                      height="300"
                      alt="hero banner"
                      class="img-cover"
                    />
                  </div>
                  <div class="img-holder two">
                    <img
                      src="./assets/images/hero-banner-2.jpg"
                      width="240"
                      height="370"
                      alt="hero banner"
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
                      alt="EduWeb logo"
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
                  <p class="cursor-pointer text-blue-500 mt-5 text-right text-xs">Mot de passe oublié ?</p>
                  <Button
                    :disabled="!user.email || !user.password"
                    @click="user.login()"
                    class="w-72 border btns text-white mt-[8%] py-2 rounded cursor-pointer"
                    >Connexion</Button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <section class="section category mt-20" aria-label="category">
          <div class="container">
            <ul class="grid-list">
              <div class="category-card">
                <div class="card-icon !bg-gray-200">
                  <img
                    src="./assets/images/category-1.svg"
                    width="40"
                    height="40"
                    loading="lazy"
                    alt="Online Degree Programs"
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
                    alt="Online Degree Programs"
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
                    alt="Online Degree Programs"
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
                    alt="Online Degree Programs"
                    class="img"
                  />
                </div>
                <p class="font-bold text-lg">Online Degree Programs</p>
                <p class="card-text">Lorem ipsum dolor consec tur elit adicing sed umod tempor.</p>
              </div>
            </ul>
          </div>
        </section>

        <section class="section about" id="apropos" aria-label="about">
          <div class="container">
            <figure class="about-banner">
              <div class="img-holder">
                <img
                  src="./assets/images/about-banner.jpg"
                  width="520"
                  height="370"
                  loading="lazy"
                  alt="about banner"
                  class="img-cover"
                />
              </div>
              <img
                src="./assets/images/about-shape-3.png"
                width="722"
                height="528"
                loading="lazy"
                alt=""
                class="shape about-shape-3"
              />
            </figure>
            <div class="about-content">
              <div class="flex items-center gap-4 logoESP">
                <p class="text-2xl font-bold border-t-0 border-x-0 border-4 border-b-blue-500 py-4">
                  ESP
                </p>
                <p class="text-2xl font-bold border-t-0 border-x-0 border-4 py-4 border-b-gray-50">
                  Antsiranana
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
                alt=""
                class="shape about-shape-4"
              />
            </div>
          </div>
        </section>

        <section class="section course" id="actualite" aria-label="course">
          <div class="container">
            <div class="py-10">
              <p class="text-lg text-center logoESP text-green-500">
                <font-awesome-icon
                  class="cursor-pointer text-green-500 mr-2"
                  :icon="['fas', 'podcast']"
                />Dernières actualités
              </p>
            </div>
            <ul class="grid-list">
              <li>
                <div class="course-card">
                  <figure class="card-banner img-holder">
                    <img
                      src="./assets/images/course-1.jpg"
                      width="370"
                      height="220"
                      loading="lazy"
                      alt="Build Responsive Real- World Websites with HTML and CSS"
                      class="img-cover"
                    />
                  </figure>
                  <div class="abs-badge">
                    <span class="span">3 Weeks</span>
                  </div>
                  <div class="card-content">
                    <span class="badge">Beginner</span>
                    <h3 class="h3">
                      <a class="card-title text-lg font-bold"
                        >Build Responsive Real- World Websites with HTML and CSS</a
                      >
                    </h3>
                    <div class="wrapper">
                      <p class="card-text text-sm">
                        Lorem Ipsum Dolor Sit Amet Cons Tetur Adipisicing Sed.
                      </p>
                    </div>
                    <ul class="card-meta-list mt-4">
                      <li class="card-meta-item">
                        <span class="text-sm">8 Lessons</span>
                      </li>
                      <li class="card-meta-item">
                        <span class="text-sm">20 Students</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <div class="course-card">
                  <figure class="card-banner img-holder">
                    <img
                      src="./assets/images/course-2.jpg"
                      width="370"
                      height="220"
                      loading="lazy"
                      alt="Build Responsive Real- World Websites with HTML and CSS"
                      class="img-cover"
                    />
                  </figure>
                  <div class="abs-badge">
                    <span class="span">3 Weeks</span>
                  </div>
                  <div class="card-content">
                    <span class="badge">Beginner</span>
                    <h3 class="h3">
                      <a class="card-title text-lg font-bold"
                        >Build Responsive Real- World Websites with HTML and CSS</a
                      >
                    </h3>
                    <div class="wrapper">
                      <p class="card-text text-sm">
                        Lorem Ipsum Dolor Sit Amet Cons Tetur Adipisicing Sed.
                      </p>
                    </div>
                    <ul class="card-meta-list mt-4">
                      <li class="card-meta-item">
                        <span class="text-sm">8 Lessons</span>
                      </li>
                      <li class="card-meta-item">
                        <span class="text-sm">20 Students</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <div class="course-card">
                  <figure class="card-banner img-holder">
                    <img
                      src="./assets/images/course-3.jpg"
                      width="370"
                      height="220"
                      loading="lazy"
                      alt="Build Responsive Real- World Websites with HTML and CSS"
                      class="img-cover"
                    />
                  </figure>
                  <div class="abs-badge">
                    <span class="span">3 Weeks</span>
                  </div>
                  <div class="card-content">
                    <span class="badge">Beginner</span>
                    <h3 class="h3">
                      <a class="card-title text-lg font-bold"
                        >Build Responsive Real- World Websites with HTML and CSS</a
                      >
                    </h3>
                    <div class="wrapper">
                      <p class="card-text text-sm">
                        Lorem Ipsum Dolor Sit Amet Cons Tetur Adipisicing Sed.
                      </p>
                    </div>
                    <ul class="card-meta-list mt-4">
                      <li class="card-meta-item">
                        <span class="text-sm">8 Lessons</span>
                      </li>
                      <li class="card-meta-item">
                        <span class="text-sm">20 Students</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
            <a class="btn has-before cursor-pointer ">
              <span class="flex items-center"
                >Voir plus <font-awesome-icon
                  class="ml-2"
                  :icon="['fas', 'chevron-right']"
                /></span
              >
            </a>
          </div>
        </section>
      </article>
    </main>
    <div v-if="isSingUp" id="inscription" class="insccription">
      <p class="heros">Insccription</p>
    </div>
    <footer class="bg-gray-500 text-white mt-20 pt-5">
      <div class="footer-top section">
        <div class="flex flex-row-reverse items-top justify-evenly">
          <div class="footer-brand">
            <a class="logo">
              <img
                src="../assets/logo_espa-removebg-preview.png"
                class="h-20 w-20"
                alt="EduWeb logo"
              />
            </a>
            <div class="pt-5 flex flex-col gap-2">
              <div class="wrapper">
                <span class="span"
                  ><font-awesome-icon class="cursor-pointer" :icon="['fas', 'home']"
                /></span>
                <address class="address">70-80 Upper St Norwich NR2</address>
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
                <a href="mailto:info@eduweb.com">info@eduweb.com</a>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid'
import { useShow } from '@/stores/Show'
import { useEtablissement } from '@/stores/Etablissement'
import { onBeforeMount } from 'vue'
import { useUrl } from '@/stores/url'
import { useUser } from '@/stores/User'

const isNavbarActive = ref(false)
const isHeaderActive = ref(false)
const show = useShow()
const etablissement = useEtablissement()
const user = useUser()
const URL = useUrl().url
const isMainPage = ref(true)
const isSingUp = ref(false)

onBeforeMount(() => {
  etablissement.getEtab()
})

function switchToMain() {
  isSingUp.value = false
  isMainPage.value = true
}

function switchToInsccr() {
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
