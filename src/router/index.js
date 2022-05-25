import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: { name: 'search' },
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView'),
      props: (route) => ({
        is404: route.params.is404,
        query: route.query,
      }),
    },
    {
      path: '/search/book/:id',
      name: 'book.update',
      component: () => import('../views/SearchView'),
      props: (route) => ({
        is404: route.params.is404,
        query: route.query,
        id: route.params.id,
      }),
    },
    {
      path: '/search/author/:id',
      name: 'author.update',
      component: () => import('../views/UpdateAuthorView'),
      props(route) {
        const props = route.params
        props.id = +props.id
        return props
      },
    },
    {
      path: '/reservation',
      name: 'reservation',
      component: () => import('../views/ReservationView'),
    },
    {
      path: '/directory',
      name: 'directory',
      component: () => import('../views/DirectoryView'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView'),
    },
    {
      path: '*',
      redirect: { name: 'index', params: { is404: true } },
    },
  ],
  scrollBehavior(to, from) {
    if (to.name === 'book.update' || from.name === 'book.update') return
    return { x: 0, y: 0 }
  },
})

export default router
