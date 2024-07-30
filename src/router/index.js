import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
// import AboutPage from '../views/About.vue'
import FeaturesPage from '../views/Features.vue'
import ChartsPage from '../views/ChartsPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },

  {
    path: '/features',
    name: 'Features',
    component: FeaturesPage
  },

  {
    path: '/charts',
    name: 'Charts',
    component: ChartsPage
  },

 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
