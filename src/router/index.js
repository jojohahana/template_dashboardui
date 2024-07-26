import { createRouter, createWebHistory } from 'vue-router'
// import HomePage from '../views/Home.vue'
// import AboutPage from '../views/About.vue'
// import ContactPage from '../views/Contact.vue'
import FeaturesPage from '../views/Features.vue'

const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: HomePage
//   },
//   {
//     path: '/about',
//     name: 'About',
//     component: AboutPage
//   },
//   {
//     path: '/contact',
//     name: 'Contact',
//     component: ContactPage
//   },

  {
    path: '/features',
    name: 'Features',
    component: FeaturesPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
