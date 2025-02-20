import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import WidgetPage from '../views/WidgetPage.vue'
import ChartsPage from '../views/ChartsPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import AreaPage from '@/views/AreaPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { title: 'Home - Energy Monitoring' }, // ✅ Fix: Use lowercase "title"
  },
  {
    path: '/widget',
    name: 'Widget',
    component: WidgetPage,
    meta: { title: 'Widget - Energy Monitoring' }, // ✅ Add title for other pages
  },
  {
    path: '/charts',
    name: 'Charts',
    component: ChartsPage,
    meta: { title: 'Charts - Energy Monitoring' },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { title: 'Login - Energy Monitoring' },
  },
  {
    path: '/area',
    name: 'Area',
    component: AreaPage,
    meta: { title: 'Area - Energy Monitoring' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

// ✅ Fix: Change "Title" to "title" for consistency
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Default Title";
  next();
});

export default router;
