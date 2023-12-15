import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
              path: '/home/main/createEntry',
              name: 'createEntry',
              component: () =>
                import('../views/HomeView/MainView/CreateEntryView/CreateEntryView.vue')
            }
          ]
        }
      ]
    }
  ]
})

export default router
