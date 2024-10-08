import './assets/main.css'
import '@fontsource/oswald'
import '@fontsource/montserrat-alternates'
import '@fontsource/montserrat'
import '@fontsource/nunito'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'tippy.js/dist/tippy.css'

import {
  faUserTie,
  faPersonChalkboard,
  faClipboardCheck,
  faFolderTree,
  faChartPie,
  faEllipsis,
  faSquarePen,
  faCheckCircle,
  faExclamationTriangle,
  faAnglesRight,
  faPaperclip,
  faRotateRight,
  faFolderOpen,
  faFileExcel,
  faListUl,
  faPrint,
  faPersonCircleXmark,
  faSquarePlus,
  faCircleCheck,
  faUserSlash,
  faAnglesDown
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUserTie,
  faPersonChalkboard,
  faClipboardCheck,
  faFolderTree,
  faChartPie,
  faEllipsis,
  faSquarePen,
  faCheckCircle,
  faExclamationTriangle,
  faAnglesRight,
  faPaperclip,
  faRotateRight,
  faFolderOpen,
  faFileExcel,
  faListUl,
  faPrint,
  faPersonCircleXmark,
  faSquarePlus,
  faCircleCheck,
  faUserSlash,
  faAnglesDown
)

import App from './App.vue'
import routes from './router/index'

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(routes)

app.mount('#app')
