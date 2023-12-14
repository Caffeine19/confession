import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect(to) {
        return { path: '/home/main' }
      },
      children: [
        {
          path: '/home/main',
          name: 'main',
          component: () => import('../views/MainView/MainView.vue')
        }
      ]
    }
  ]
})

export default router
