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
          <li class="navbar-item">
            <a href="#home" class="navbar-link" @click="closeNavbar"
              ><font-awesome-icon
                class="navbar-links cursor-pointer text-gray-500 mr-2"
                :icon="['fas', 'home']"
              />Acceuil</a
            >
          </li>
          <li class="navbar-item">
            <a href="#about" class="navbar-link" @click="closeNavbar">
              <font-awesome-icon
                class="navbar-links cursor-pointer text-gray-500 mr-2"
                :icon="['fas', 'circle-info']"
              />A propos</a
            >
          </li>
          <li class="navbar-item">
            <a href="#courses" class="navbar-link" @click="closeNavbar">
              <font-awesome-icon
                class="navbar-links cursor-pointer text-gray-500 mr-2"
                :icon="['fas', 'podcast']"
              />Actualité</a
            >
          </li>
          <li class="navbar-item"></li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <article>
      <div class="heros" id="home" aria-label="home">
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
                    class="pl-3 pr-3 block w-60 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
                  />
                </div>
                <div class="mt-[10%] relative">
                  <input
                    placeholder="Mot de passe"
                    v-model="user.password"
                    :type="show.showPassword ? 'text' : 'password'"
                    @keyup.enter="user.login()"
                    class="pl-3 pr-10 block w-60 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-[rgba(45, 52, 54,1.0)] focus:ring-2 focus:ring-inset focus:ring-[rgba(0, 184, 148,1.0)] focus:outline-none"
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
                <p class="text-blue-500 mt-5 text-right text-xs">Mot de passe oublié ?</p>
                <Button
                  :disabled="!user.email || !user.password"
                  @click="user.login()"
                  class="w-60 border btns bg-blue-500 text-white mt-[8%] py-2 rounded cursor-pointer"
                  >Connexion</Button
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="section category mt-20" aria-label="category">
        <div class="container">
          <p class="text-center font-bold text-green-500">CATEGORIE</p>
          <p class="text-center text-gray-500 text-xl mt-2">
            Consectetur adipiscing elit sed do eiusmod tempor.
          </p>
          <ul class="grid-list">
            <div class="category-card">
              <div class="card-icon">
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
              <p class="font-bold text-green-500">7 Courses</p>
            </div>
            <div class="category-card">
              <div class="card-icon">
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
              <p class="font-bold text-red-500">7 Courses</p>
            </div>
            <div class="category-card">
              <div class="card-icon">
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
              <p class="font-bold text-blue-500">7 Courses</p>
            </div>
            <div class="category-card">
              <div class="card-icon">
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
              <p class="font-bold text-yellow-500">7 Courses</p>
            </div>
          </ul>
        </div>
      </section>

      <section class="section about" id="about" aria-label="about">
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
            <p class="text-2xl font-bold">About Us</p>
            <h2 class="text-sm section-title">
              Over 10 Years in <span class="span">Distant learning</span> for Skill Development
            </h2>
            <p class="mt-4 text-gray-500 text-sm">
              Lorem ipsum dolor sit amet consectur adipiscing elit sed eiusmod ex tempor incididunt
              labore dolore magna aliquaenim ad minim.
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

      <section class="section course" id="courses" aria-label="course">
        <div class="container">
          <div class="py-10">
            <p class="text-lg font-bold text-green-500 text-center">POPULAIRE</p>
            <p class="text-center text-gray-500 text-xl mt-2">
              Consectetur adipiscing elit sed do eiusmod tempor.
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
          <a class="btn has-before">
            <span class="span">Browse more courses</span>
          </a>
        </div>
      </section>
    </article>
  </main>

  <footer class="bg-gray-500 text-white mt-20 py-10">
    <div class="footer-top section">
      <div class="container grid-list">
        <div class="footer-brand">
          <a class="logo">
            <img
              src="../assets/logo_espa-removebg-preview.png"
              class="h-20 w-20"
              alt="EduWeb logo"
            />
          </a>
          <p class="footer-brand-text">
            Lorem ipsum dolor amet consecto adi pisicing elit sed eiusm tempor incidid unt labore
            dolore.
          </p>
          <div class="wrapper">
            <span class="span">Add:</span>
            <address class="address">70-80 Upper St Norwich NR2</address>
          </div>
          <div class="wrapper">
            <span class="span">Call:</span>
            <a href="tel:+011234567890" class="footer-link">+01 123 4567 890</a>
          </div>
          <div class="wrapper">
            <span class="span">Email:</span>
            <a href="mailto:info@eduweb.com" class="footer-link">info@eduweb.com</a>
          </div>
        </div>

        <div class="footer-list">
          <p class="footer-list-title logoESP">Contact</p>
          <p class="footer-list-text">
            Enter your email address to register to our newsletter subscription
          </p>
          <form action="" class="newsletter-form">
            <input
              type="email"
              name="email_address"
              placeholder="Your email"
              required
              class="input-field focus:outline-none text-black"
            />
            <button type="submit" class="btn has-before">
              <span class="span">Subscribe</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </footer>

  <a
    href="#top"
    class="back-top-btn px-3 py-2"
    :class="{ active: isHeaderActive }"
    aria-label="back top top"
    data-back-top-btn
  >
    <font-awesome-icon
      class="cursor-pointer text-white "
      :icon="['fas', 'angle-up']"
    />
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

onBeforeMount(() => {
  etablissement.getEtab()
})

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

<style scoped>
li {
  list-style: none;
}

a,
img,
span,
data,
input,
button {
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  height: auto;
}

input,
button {
  background: none;
  border: none;
  font: inherit;
}

input {
  width: 100%;
}

button {
  cursor: pointer;
}

address {
  font-style: normal;
}

.logoESP {
  font-family: 'oswald', 'sans-serif' !important;
}

html {
  font-family: 'Poppins', sans-serif;
  font-size: 10px;
  scroll-behavior: smooth;
}

body {
  background-color: hsl(0, 0%, 100%);
  color: hsl(0, 0%, 50%);
  font-size: 1.6rem;
  line-height: 1.75;
}

:focus-visible {
  outline-offset: 4px;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background-color: hsl(0, 0%, 98%);
}

::-webkit-scrollbar-thumb {
  background-color: hsl(0, 0%, 80%);
}

::-webkit-scrollbar-thumb:hover {
  background-color: hsl(0, 0%, 70%);
}

.container {
  padding-inline: 15px;
}

.shape {
  position: absolute;
  display: none;
}

.has-bg-image {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.h1,
.h2,
.h3 {
  color: hsl(0, 0%, 9%);
  font-family: 'nunito';
  line-height: 1;
}

.h1,
.h2 {
  font-weight: 600;
}

.h1 {
  font-size: 3.2rem;
}

.h2 {
  font-size: 2.3rem;
}

.h3 {
  font-size: 2.3rem;
  font-weight: 500;
}

.section-title {
  --color: hsl(351, 83%, 61%);
  text-align: center;
}

.section-title .span {
  display: inline-block;
  color: var(--color);
}

.btn {
  background-color: hsl(170, 75%, 41%);
  color: hsl(0, 0%, 100%);
  display: flex;
  align-items: center;
  gap: 7px;
  max-width: max-content;
  padding: 10px 20px;
  border-radius: 5px;
  overflow: hidden;
}

.btns {
  background-color: hsl(170, 75%, 41%);
  color: hsl(0, 0%, 100%);
}

.has-before,
.has-after {
  position: relative;
  z-index: 1;
}

.has-before::before,
.has-after::after {
  position: absolute;
  content: '';
}

.btn::before {
  inset: 0;
  background-image: linear-gradient(-90deg, hsl(151, 58%, 46%) 0%, hsl(170, 75%, 41%) 100%);
  z-index: -1;
  border-radius: inherit;
  transform: translateX(-100%);
  transition: 0.5s ease;
}

.btn:is(:hover, :focus)::before {
  transform: translateX(0);
}

.img-holder {
  aspect-ratio: var(--width) / var(--height);
  background-color: hsl(0, 0%, 80%);
  overflow: hidden;
}

.img-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.section-subtitle {
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 1px;
  text-align: center;
  margin-block-end: 15px;
}

.section-text {
  font-size: 1.5rem;
  text-align: center;
  margin-block: 15px 25px;
}

.grid-list {
  display: grid;
  gap: 30px;
}

.category-card,
.stats-card {
  background-color: hsla(var(--color), 0.1);
}

:is(.course, .blog) .section-title {
  margin-block-end: 40px;
}

.header .btn {
  display: none;
}

.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: hsl(0, 0%, 100%);
  box-shadow: 0 6px 15px 0 hsla(0, 0%, 0%, 0.05);
  z-index: 4;
}

.header.active {
  position: fixed;
}

.header .container,
.header-actions,
.navbar .wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

.header-action-btn,
.nav-close-btn {
  position: relative;
  color: hsl(0, 0%, 9%);
  font-size: 24px;
  transition: 0.25s ease;
}

.header-action-btn:is(:hover, :focus) {
  color: hsl(170, 75%, 41%);
}

.header-action-btn .btn-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: hsl(170, 75%, 41%);
  color: hsl(0, 0%, 100%);
  font-family: 'League Spartan', sans-serif;
  font-size: 1.4rem;
  min-width: 20px;
  height: 20px;
  border-radius: 50%;
}

.navbar {
  position: fixed;
  top: 0;
  left: -320px;
  background-color: hsl(0, 0%, 100%);
  width: 100%;
  max-width: 320px;
  height: 100%;
  z-index: 2;
  transition: 0.25s cubic-bezier(0.51, 0.03, 0.64, 0.28);
}

.navbar.active {
  transform: translateX(320px);
  transition: 0.5s cubic-bezier(0.33, 0.85, 0.4, 0.96);
}

.navbar .wrapper {
  padding: 15px 20px;
  border-block-end: 1px solid hsl(0, 0%, 90%);
}

.nav-close-btn {
  background-color: hsl(0, 0%, 100%);
  box-shadow: 0 10px 30px hsla(0, 0%, 0%, 0.06);
  padding: 8px;
  border-radius: 50%;
}

.nav-close-btn:is(:hover, :focus) {
  background-color: hsl(170, 75%, 41%);
  color: hsl(0, 0%, 100%);
}

.navbar-list {
  padding: 15px 20px;
}

.navbar-item:not(:last-child) {
  border-block-end: 1px solid hsl(0, 0%, 90%);
}

.navbar-link {
  padding-block: 8px;
  font-weight: 500;
  transition: 0.25s ease;
}

.navbar-link:is(:hover, :focus) {
  color: hsl(170, 75%, 41%);
}

.navbar-links {
  transition: 0.25s ease;
}

.navbar-links:is(:hover, :focus) {
  color: hsl(170, 75%, 41%);
}

.overlay {
  position: fixed;
  inset: 0;
  background-color: hsla(0, 0%, 0%, 0.8);
  pointer-events: none;
  opacity: 0;
  z-index: 1;
  transition: 0.25s ease;
}

.overlay.active {
  opacity: 1;
  pointer-events: all;
}

.hero {
  padding-block-start: calc(75px + 80px);
}

.heros {
  padding-block-start: 95px;
}

.hero .container {
  display: grid;
  gap: 40px;
}

.hero-text {
  color: hsl(0, 0%, 9%);
  font-size: 1.8rem;
  text-align: center;
  margin-block: 18px 20px;
}

.hero .btn {
  margin-inline: auto;
}

.hero-banner {
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  align-items: flex-start;
  gap: 30px;
}

.hero-banner .img-holder.one {
  border-top-right-radius: 70px;
  border-bottom-left-radius: 110px;
}

.hero-banner .img-holder.two {
  border-top-left-radius: 50px;
  border-bottom-right-radius: 90px;
}

.category .section-subtitle {
  color: hsl(351, 83%, 61%);
}

.category .section-title {
  --color: hsl(170, 75%, 41%);
}

.category .section-text {
  margin-block-end: 40px;
}

.category-card {
  padding: 50px 30px;
  text-align: center;
  border-radius: 5px;
}

.category-card .card-icon {
  background-color: hsla(var(--color), 0.1);
  width: 80px;
  height: 80px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  margin-inline: auto;
  margin-block-end: 30px;
}

.category-card .card-text {
  color: hsl(0, 0%, 9%);
  margin-block: 15px 25px;
}

.category-card .card-badge {
  background-color: hsla(var(--color), 0.1);
  color: hsl(var(--color));
  font-size: 1.5rem;
  font-weight: 500;
  padding: 2px 18px;
  max-width: max-content;
  margin-inline: auto;
  border-radius: 5px;
}

.about {
  padding-block-start: 0;
  overflow: hidden;
}

.about .container {
  display: grid;
  gap: 30px;
}

.about-banner {
  position: relative;
  z-index: 1;
}

.about-banner .img-holder {
  border-radius: 10px;
}

.about-shape-2 {
  display: block;
  bottom: -100px;
  left: -60px;
  animation: bounce 2.5s infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-30px);
  }

  60% {
    transform: translateY(-15px);
  }
}

.about :is(.section-subtitle, .section-title, .section-text) {
  text-align: left;
}

.about-item {
  margin-block: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.about-item {
  color: hsl(42, 94%, 55%);
  font-size: 20px;
  --ionicon-stroke-width: 50px;
}

.about-item .span {
  color: hsl(0, 0%, 9%);
}

.course-card {
  position: relative;
  background-color: hsl(0, 0%, 100%);
  border-radius: 5px;
  overflow: hidden;
}

.course-card .img-cover {
  transition: 0.5s ease;
}

.course-card:is(:hover, :focus-within) .img-cover {
  transform: scale(1.1);
}

.course-card :is(.abs-badge, .badge) {
  border-radius: 3px;
}

.course-card .abs-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: hsl(42, 94%, 55%);
  color: hsl(0, 0%, 100%);
  display: flex;
  align-items: center;
  gap: 5px;
  line-height: 1;
  padding: 6px 8px;
  padding-block-end: 3px;
}

.course-card .abs-badge {
  font-size: 18px;
  margin-block-end: 5px;
  --ionicon-stroke-width: 50px;
}

.course-card .card-content {
  padding: 25px;
}

.course-card .badge {
  background-color: hsla(170, 75%, 41%, 0.15);
  max-width: max-content;
  color: hsl(170, 75%, 41%);
  line-height: 25px;
  padding-inline: 10px;
}

.course-card .card-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-block: 15px 8px;
  transition: 0.25s ease;
}

.course-card .card-title:is(:hover, :focus) {
  color: hsl(170, 75%, 41%);
}

.course-card :is(.wrapper, .rating-wrapper, .card-meta-list, .card-meta-item) {
  display: flex;
  align-items: center;
}

.course-card .wrapper {
  gap: 10px;
}

.course-card .rating-wrapper {
  gap: 3px;
}

.course-card .rating-wrapper {
  color: hsl(42, 94%, 55%);
}

.course-card .rating-text {
  color: hsl(0, 0%, 9%);
  font-size: 1.4rem;
  font-weight: 500;
}

.course-card .price {
  color: hsl(351, 83%, 61%);
  font-size: 1.8rem;
  font-weight: 600;
  margin-block: 8px 15px;
}

.course-card .card-meta-list {
  flex-wrap: wrap;
}

.course-card .card-meta-item {
  position: relative;
  gap: 5px;
}

.course-card .card-meta-item:not(:last-child)::after {
  content: '|';
  display: inline-block;
  color: hsl(0, 0%, 90%);
  padding-inline: 10px;
}

.course-card .card-meta-item {
  color: hsl(0, 0%, 65%);
  --ionicon-stroke-width: 50px;
}

.course-card .card-meta-item .span {
  color: hsl(0, 0%, 9%);
  font-size: 1.3rem;
}

.course .btn {
  margin-inline: auto;
  margin-block-start: 60px;
}

.video {
  background-size: contain;
  background-position: center top;
}

.video-banner {
  position: relative;
  border-top-right-radius: 80px;
  border-bottom-left-radius: 120px;
}

.video .play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: hsl(351, 83%, 61%);
  font-size: 30px;
  padding: 16px;
  color: hsl(0, 0%, 100%);
  border-radius: 50%;
  box-shadow: 0 0 0 0 hsla(0, 0%, 100%, 0.5);
  z-index: 1;
  animation: pulse 3s ease infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 hsla(0, 0%, 100%, 0.5);
  }
  100% {
    box-shadow: 0 0 0 20px transparent;
  }
}

.video-banner::after {
  inset: 0;
  background-color: hsla(0, 0%, 0%, 0.3);
}

.stats-card {
  text-align: center;
  padding: 25px;
  border-radius: 10px;
}

.stats-card :is(.card-title, .card-text) {
  font-family: 'League Spartan', sans-serif;
}

.stats-card .card-title {
  color: hsl(var(--color));
  font-size: 3.2rem;
  line-height: 1.1;
}

.stats-card .card-text {
  color: hsl(0, 0%, 9%);
  text-transform: uppercase;
}

.blog-card .card-banner {
  border-radius: 10px;
}

.blog-card .card-banner .img-cover {
  transition: 0.5s ease;
}

.blog-card .card-banner::after {
  inset: 0;
  background-color: hsla(0, 0%, 0%, 0.5);
  opacity: 0;
  transition: 0.25s ease;
}

.blog-card:is(:hover, :focus-within) .card-banner .img-cover {
  transform: scale(1.1);
}

.blog-card:is(:hover, :focus-within) .card-banner::after {
  opacity: 1;
}

.blog-card .card-content {
  position: relative;
  margin-inline: 15px;
  background-color: hsl(0, 0%, 100%);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 50px 0 hsla(220, 53%, 22%, 0.1);
  margin-block-start: -100px;
  z-index: 1;
}

.blog-card .card-btn {
  position: absolute;
  top: -40px;
  right: 30px;
  background-color: hsl(170, 75%, 41%);
  color: hsl(0, 0%, 100%);
  font-size: 20px;
  padding: 20px;
  border-radius: 50%;
  transition: 0.25s ease;
  opacity: 0;
}

.blog-card .card-btn:is(:hover, :focus) {
  background-color: hsl(351, 83%, 61%);
}

.blog-card:is(:hover, :focus-within) .card-btn {
  opacity: 1;
  transform: translateY(10px);
}

.blog-card :is(.card-meta-item, .card-text, .card-subtitle) {
  font-size: 1.5rem;
}

.blog-card .card-subtitle {
  text-transform: uppercase;
}

.blog-card .card-title {
  margin-block: 10px 15px;
  transition: 0.25s ease;
}

.blog-card .card-title:is(:hover, :focus) {
  color: hsl(170, 75%, 41%);
}

.blog-card :is(.card-meta-list, .card-meta-item) {
  display: flex;
}

.blog-card .card-meta-list {
  flex-wrap: wrap;
  gap: 10px 20px;
  margin-block-end: 20px;
}

.blog-card .card-meta-item {
  gap: 10px;
  align-items: center;
  color: hsl(0, 0%, 9%);
}

.blog-card .card-meta-item {
  color: hsl(170, 75%, 41%);
  font-size: 18px;
  --ionicon-stroke-width: 40px;
}

.footer {
  background-repeat: no-repeat;
  background-color: hsl(180, 3%, 7%);
  color: hsl(0, 0%, 73%);
  font-size: 1.5rem;
}

.footer-top {
  display: grid;
  gap: 30px;
}

.footer-brand-text {
  margin-block: 20px;
}

.footer-brand .wrapper {
  display: flex;
  gap: 5px;
}

.footer-brand .wrapper .span {
  font-weight: 500;
}

.footer-link {
  transition: 0.25s ease;
}

.footer-link:is(:hover, :focus) {
  color: hsl(170, 75%, 41%);
}

.footer-list-title {
  color: hsl(0, 0%, 100%);
  font-family: 'League Spartan', sans-serif;
  font-size: 2.3rem;
  font-weight: 600;
  margin-block-end: 10px;
}

.footer-list .footer-link {
  padding-block: 5px;
}

.newsletter-form {
  margin-block: 20px 35px;
}

.newsletter-form .input-field {
  background-color: hsl(0, 0%, 100%);
  padding: 12px;
  border-radius: 5px;
  margin-block-end: 20px;
}

.newsletter-form .btn {
  min-width: 100%;
  justify-content: center;
}

.social-list {
  display: flex;
  gap: 25px;
}

.social-link {
  font-size: 20px;
}

.footer-bottom {
  border-block-start: 1px solid hsl(0, 0%, 9%);
  padding-block: 30px;
}

.copyright {
  text-align: center;
}

.copyright-link {
  color: hsl(170, 75%, 41%);
  display: inline-block;
}

.back-top-btn {
  position: fixed;
  bottom: 40px;
  right: 30px;
  background-color: hsl(170, 75%, 41%);
  color: hsl(0, 0%, 100%);
  border-radius: 50%;
  z-index: 3;
  opacity: 0;
  pointer-events: none;
  transition: 0.25s ease;
}

.back-top-btn.active {
  transform: translateY(10px);
  opacity: 1;
  pointer-events: all;
}

@media (min-width: 575px) {
  .container {
    max-width: 520px;
    width: 100%;
    margin-inline: auto;
  }
  .grid-list {
    grid-template-columns: 1fr 1fr;
  }
  :is(.course, .blog) .grid-list {
    grid-template-columns: 1fr;
  }

  .header-actions {
    gap: 30px;
  }
  .hero-banner {
    grid-template-columns: 1fr 0.9fr;
  }
  .video .play-btn {
    padding: 25px;
  }
  .stats-card {
    padding: 40px 30px;
  }
  .footer-brand,
  .footer-list:last-child {
    grid-column: 1 / 3;
  }
  .newsletter-form {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .newsletter-form .input-field {
    margin-block-end: 0;
  }
  .newsletter-form .btn {
    min-width: max-content;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
  .btn {
    padding: 15px 30px;
  }
  :is(.course, .blog) .grid-list {
    grid-template-columns: 1fr 1fr;
  }
  .header .container {
    padding-inline: 30px;
  }
  .header .btn {
    display: flex;
    padding: 10px 30px;
    margin-inline: 20px;
  }
  .hero {
    padding-block-start: calc(75px + 90px);
  }
  .hero .container {
    gap: 50px;
  }
  .hero-text {
    margin-block-end: 30px;
  }
  .hero-banner {
    position: relative;
    z-index: 1;
  }
  .hero-banner .img-holder {
    max-width: max-content;
  }
  .hero-banner .img-holder.one {
    justify-self: flex-end;
  }
  .hero-banner .img-holder.two {
    margin-block-start: 100px;
  }
  .hero-shape-1 {
    display: block;
    position: absolute;
    bottom: -40px;
    left: -10px;
  }
  .about {
    padding-block-start: 50px;
  }
  .about-banner {
    padding: 60px;
    padding-inline-end: 0;
  }
  .about-banner .img-holder {
    max-width: max-content;
    margin-inline: auto;
  }
  .about-shape-1 {
    display: block;
    top: -40px;
    right: -70px;
  }
  .newsletter-form .btn {
    padding-block: 10px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
  .grid-list {
    grid-template-columns: repeat(4, 1fr);
  }
  :is(.course, .blog) .grid-list {
    grid-template-columns: repeat(3, 1fr);
  }
  .hero .container {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
  .hero .section-title,
  .hero-text {
    text-align: left;
  }
  .hero .btn {
    margin-inline: 0;
  }
  .about .container {
    grid-template-columns: 1fr 0.6fr;
    align-items: center;
    gap: 60px;
  }
  .video-banner {
    max-width: 75%;
    margin-inline: auto;
  }
  .footer .grid-list {
    grid-template-columns: 1fr 0.6fr 0.6fr 1.2fr;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1185px;
  }
  .shape {
    display: block;
  }
  .about-content,
  .video-card,
  .blog {
    position: relative;
  }
  .header-action-btn:last-child,
  .navbar .wrapper,
  .overlay {
    display: none;
  }
  .header.active {
    transform: translateY(-100%);
    animation: slideIn 0.5s ease forwards;
  }
  @keyframes slideIn {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  .navbar,
  .navbar.active {
    all: unset;
  }
  .navbar-list {
    display: flex;
    gap: 50px;
    padding: 0;
  }
  .navbar-item:not(:last-child) {
    border-block-end: none;
  }
  .navbar-link {
    color: hsl(0, 0%, 9%);
    padding-block: 20px;
  }
  .header .btn {
    margin-inline-end: 0;
  }
  .hero {
    padding-block-start: calc(75px + 120px);
  }
  .hero .container {
    gap: 80px;
  }
  .hero-shape-2 {
    top: -80px;
    z-index: -1;
  }
  .about .container {
    gap: 110px;
  }
  .about-banner .img-holder {
    margin-inline: 0;
  }
  .about-shape-3 {
    top: -20px;
    left: -100px;
    z-index: -1;
  }
  .about-content {
    z-index: 1;
  }
  .about-shape-4 {
    top: 30px;
    right: -60px;
    z-index: -1;
  }
  .video-shape-1 {
    top: -50px;
    left: 0;
  }
  .video-shape-2 {
    top: -80px;
    right: 120px;
    z-index: 1;
  }
  .blog-shape {
    top: 0;
    left: 0;
  }
}
</style>
