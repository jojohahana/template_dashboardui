import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import WidgetPage from '../views/WidgetPage.vue'
import ChartsPage from '../views/ChartsPage.vue'
import LoginPage from '@/views/LoginPage.vue'
// import AdminPage from '@/views/AdminPage.vue'
import AreaPage from '@/views/AreaPage.vue'
// import { Title } from 'chart.js'
// import axios from 'axios'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { Title: 'Home Page'},
  },

  {
    path: '/widget',
    name: 'Widget',
    component: WidgetPage
  },

  {
    path: '/charts',
    name: 'Charts',
    component: ChartsPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },


  {
    path: '/area',
    name: 'Area',
    component: AreaPage
  },

 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
