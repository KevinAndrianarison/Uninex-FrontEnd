import './assets/main.css'
import './assets/index.css'
import '@fontsource/oswald'
import '@fontsource/montserrat-alternates'
import '@fontsource/montserrat'
import '@fontsource/nunito'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'tippy.js/dist/tippy.css'

import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'right-top', 
  timeout: 3000,        
});

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
  faPen,
  faXmark,
  faArrowDown,
  faListCheck,
  faEye,
  faCircleXmark,
  faSort,
  faCalendarPlus,
  faClockRotateLeft,
  faChartSimple,
  faFilePdf,
  faFileCirclePlus,
  faTrash,
  faImages,
  faChevronLeft,
  faBan,
  faLockOpen,
  faUsers,
  faBell,
  faUserMinus,
  faGear,
  faUserGear,
  faRotate,
  faRightFromBracket,
  faComment,
  faMagnifyingGlass,
  faArrowDownAZ,
  faCircleInfo,
  faUserPen,
  faPhone,
  faAt,
  faUnlock,
  faCalendarDay,
  faStar,
  faCircle,
  faSmile
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
  faXmark,
  faCirclePlus,
  faArrowDown,
  faListCheck,
  faEye,
  faCircleXmark,
  faSort,
  faCalendarPlus,
  faClockRotateLeft,
  faChartSimple,
  faFilePdf,
  faFileCirclePlus,
  faImages,
  faTrash,
  faChevronLeft,
  faBan,
  faLockOpen,
  faUsers,
  faBell,
  faUserMinus,
  faGear,
  faUserGear,
  faRotate,
  faRightFromBracket,
  faComment,
  faMagnifyingGlass,
  faArrowDownAZ,
  faCircleInfo,
  faUserPen,
  faPhone,
  faAt,
  faUnlock,
  faCalendarDay,
  faStar,
  faCircle,
  faSmile
)

import App from './App.vue'
import routes from './router/index'

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(routes)

app.mount('#app')
