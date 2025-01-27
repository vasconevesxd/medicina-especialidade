import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()
  await authStore.getSession()

  const isAuthPage = ['/login', '/signup'].includes(to.path)
  if (!authStore.user && !isAuthPage) {
    return {
      name: '/login',
    }
  }

  if (authStore.user && isAuthPage) {
    return {
      name: '/',
    }
  }
})

if (import.meta.hot) {
  handleHotUpdate(router)
}

export default router
