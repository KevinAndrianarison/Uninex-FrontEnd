import './assets/main.css'
import '@fontsource/oswald'
import '@fontsource/montserrat-alternates'
import '@fontsource/montserrat'
import '@fontsource/nunito'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

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
  faAnglesDown,
  faPaperPlane,
  faBarsStaggered,
  faCommentDots,
  faTrashCan,
  faHeart,
  faCirclePlus,
  faPen
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
  faAnglesDown,
  faPaperPlane,
  faBarsStaggered,
  faHeart,
  faCommentDots,
  faTrashCan,
  faPen,
  faCirclePlus
)

import App from './App.vue'
import routes from './router/index'

window.Pusher = Pusher

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY, 
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  encrypted: true
})

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(routes)

app.mount('#app')
