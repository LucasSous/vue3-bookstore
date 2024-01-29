import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('../pages/Dashboard/DashboardPage.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '/users',
        component: () => import('../pages/Users/UsersPage.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '/books',
        component: () => import('../pages/Books/BooksPage.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '/publishers',
        component: () => import('../pages/Publishers/PublishersPage.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '/rents',
        component: () => import('../pages/Rents/RentsPage.vue'),
      },
    ],
  },
  {
    path: '/not-found',
    name: 'not-found',
    component: () => import('../pages/NotFound/NotFoundPage.vue'),
  },
];

export default routes;
