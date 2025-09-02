import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

// for loading vue in ejs we can simply use the default routes
const routes = [
  { path: '/dashboard-vue-in-ejs/', component: HomeView, name: 'home' },
  { path: '/dashboard-vue-in-ejs/about', component: AboutView, name: 'about' }
]

// for loading vue in ejs as a single instance under /app
// const routes = [
//   { path: '/app/', component: HomeView, name: 'home' },
//   { path: '/app/about', component: AboutView, name: 'about' },
// ]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
