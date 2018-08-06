const adminHome = r => require.ensure([], () => r(require('VIEWS/admin/adminHome/index.vue')), 'adminHome')
const editArticle = r => require.ensure([], () => r(require('VIEWS/admin/article/editArticle.vue')), 'editArticle')
const articleManage = r => require.ensure([], () => r(require('VIEWS/admin/article/articleManage.vue')), 'articleManage')
const articleDeleted = r => require.ensure([], () => r(require('VIEWS/admin/article/articleDeleted.vue')), 'articleDeleted')
const articleDrafts = r => require.ensure([], () => r(require('VIEWS/admin/article/articleDrafts.vue')), 'articleDrafts')
const articlePreview = r => require.ensure([], () => r(require('VIEWS/admin/article/articlePreview.vue')), 'articlePreview')
const adminCategories = r => require.ensure([], () => r(require('VIEWS/admin/categories/index.vue')), 'adminCategories')
const webConfig = r => require.ensure([], () => r(require('VIEWS/admin/webConfig/index.vue')), 'webConfig')
const webConfigAbout = r => require.ensure([], () => r(require('VIEWS/admin/webConfig/about.vue')), 'webConfigAbout')
const webConfigFriends = r => require.ensure([], () => r(require('VIEWS/admin/webConfig/friends.vue')), 'webConfigFriends')
const adminArticleList = r => require.ensure([], () => r(require('VIEWS/admin/categories/articleList.vue')), 'adminArticleList')
const adminComments = r => require.ensure([], () => r(require('VIEWS/admin/comments/index.vue')), 'adminComments')
const webConfigResume = r => require.ensure([], () => r(require('VIEWS/admin/webConfig/resume.vue')), 'webConfigResume')

export default [
  {
    path: '/admin',
    name: 'adminHome',
    component: adminHome,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/article/publish',
    name: 'publishArticle',
    component: editArticle,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/article/edit',
    name: 'editArticle',
    component: editArticle,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/article/manage',
    name: 'articleManage',
    component: articleManage,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/article/deleted',
    name: 'articleDeleted',
    component: articleDeleted,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/article/drafts',
    name: 'articleDrafts',
    component: articleDrafts,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/article/preview',
    name: 'articlePreview',
    component: articlePreview,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/categories',
    name: 'adminCategories',
    component: adminCategories,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/comments',
    name: 'adminComments',
    component: adminComments,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/webConfig',
    name: 'webConfig',
    component: webConfig,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/webConfig/about',
    name: 'webConfigAbout',
    component: webConfigAbout,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/webConfig/friends',
    name: 'webConfigFriends',
    component: webConfigFriends,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/articlelist',
    name: 'adminArticleList',
    component: adminArticleList,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/admin/webConfig/resume',
    name: 'webConfigResume',
    component: webConfigResume,
    meta: {
      requireAuth: true
    }
  }
]
