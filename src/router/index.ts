import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'Home',
      component: () => import('../views/form/form-page.vue'),
    },
    {
      path: '/form',
      name: 'Form',
      component: () => import('../views/form/form-page.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about/about-view.vue'),
    },
  ],
})

export default router
