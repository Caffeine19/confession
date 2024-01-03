import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView/HomeView.vue'
import BeginView from '../views/BeginView/BeginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/begin',
      name: 'begin',
      component: BeginView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      redirect: '/home/main',
      children: [
        {
          path: '/home/main',
          name: 'main',
          component: () => import('../views/HomeView/MainView/MainView.vue'),
          redirect: '/home/main/entryStatistic',
          children: [
            {
              path: '/home/main/entryStatistic',
              name: 'entryStatistic',
              component: () =>
                import('../views/HomeView/MainView/EntryStatisticView/EntryStatisticView.vue')
            },
            {
              path: '/home/main/entryDetail/:id?',
              name: 'entryDetail',
              component: () => import('../views/HomeView/MainView/EntryDetailView/EntryDetail.vue')
            }
          ]
        }
      ]
    }
  ]
})

export default router
