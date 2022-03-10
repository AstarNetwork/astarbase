import { RouteRecordRaw } from 'vue-router';
import Index from 'pages/Index.vue';
import Mint from 'src/components/Mint/Mint.vue';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/mint',
  },
  {
    path: '/',
    name: 'Mint',
    component: Index,
    children: [
      {
        path: 'mint',
        component: Mint,
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
