import { defineAppSetup } from '@slidev/types'

export default defineAppSetup(({ router }) => {
  router.addRoute({
    path: '/changelog',
    component: () => import('../views/changelog.vue'),
  })
  router.addRoute({
    path: '/routes',
    component: () => import('../views/routes.vue'),
  })
})
