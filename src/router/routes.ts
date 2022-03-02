import { RouteRecordRaw } from 'vue-router';
import Index from 'pages/Index.vue';
import Home from 'src/components/Home.vue';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/mint',
  },
  {
    path: '/',
    name: 'Home',
    component: Index,
    children: [
      {
        path: 'mint',
        component: Home,
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
