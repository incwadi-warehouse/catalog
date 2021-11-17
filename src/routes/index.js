export default [
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
    path: '/settings',
    name: 'settings',
    component: () => import('../views/SettingsView'),
  },
  {
    path: '/settings/branch',
    name: 'settings.branch',
    component: () => import('../views/BranchSettingsView'),
  },
  {
    path: '/settings/inventory',
    name: 'settings.inventory',
    component: () => import('../views/InventorySettingsView'),
  },
  {
    path: '/settings/condition',
    name: 'settings.condition',
    component: () => import('../views/ConditionSettingsView'),
  },
  {
    path: '/settings/format',
    name: 'settings.format',
    component: () => import('../views/FormatSettingsView'),
  },
  {
    path: '/settings/genre',
    name: 'settings.genre',
    component: () => import('../views/GenreSettingsView'),
  },
  {
    path: '/settings/staff',
    name: 'settings.staff',
    component: () => import('../views/StaffSettingsView'),
  },
  {
    path: '/settings/bookmark',
    name: 'settings.bookmark',
    component: () => import('../views/BookmarkSettingsView'),
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
]
