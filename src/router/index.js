import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import WidgetPage from '../views/WidgetPage.vue'
import ChartsPage from '../views/ChartsPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import AdminPage from '@/views/AdminPage.vue'
// import { Title } from 'chart.js'
// import axios from 'axios'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { Title: 'Home Page'}
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


  // trial for admin page
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage
  },

 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


//CSRF Token Default Header for Axios
// const token = document.head.querySelector('meta[name="csrf-token"]');
// if (token) {
//     axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
// } else {
//     console.error('CSRF token not found');
// }

// Axios Setup
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default router
