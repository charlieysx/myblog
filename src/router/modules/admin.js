const adminHome = r => require.ensure([], () => r(require('VIEWS/admin/adminHome/index.vue')), 'adminHome')

export default [
  {
    path: '/admin/*',
    redirect: '/admin'
  },
  {
    path: '/admin',
    name: 'adminHome',
    component: adminHome,
    meta: {
      requireAuth: true
    }
  }
]
