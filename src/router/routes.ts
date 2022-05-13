import { RouteRecordRaw } from 'vue-router';
import Index from 'pages/Index.vue';
import ECDSA from 'pages/ECDSA.vue';
import Register from 'src/components/Register/Register.vue';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/register',
  },
  {
    path: '/',
    name: 'Register',
    component: Index,
    children: [
      {
        path: 'register',
        component: Register,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
