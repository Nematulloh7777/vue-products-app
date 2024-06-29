import {createWebHistory, createRouter} from 'vue-router'

import Home from './pages/home.vue'
import Login from './pages/login.vue'
import TableSetup from './components/table-setup.vue'
import SettingGoods from './components/setting-goods.vue'

const routes = [
  {path: '/', name: 'Login', component: Login},
  {path: '/home', name: 'home', component: Home},
  {path: '/settingGoods', name: 'SettingGoods', component: SettingGoods},
  {path: '/tableSetup', name: 'TableSetup', component: TableSetup},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
