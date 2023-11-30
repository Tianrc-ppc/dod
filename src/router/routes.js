import Error from '@/views/Error.vue';
import View from '@/views/View.vue';
import { createWebHashHistory } from 'vue-router';

export const history = createWebHashHistory(import.meta.env.BASE_URL);

export const routes = [
  {
    redirect: 'home',
    name: 'view',
    path: '/',
    component: View,
    children: [
      {
        name: 'home',
        path: 'home',
        component: () => import('@/views/Home.vue'),
        meta: { title: 'Playing' }
      },
      {
        name: 'game',
        path: 'game',
        component: () => import('@/views/Game.vue'),
        meta: { title: 'Game' }
      },
      {
        name: 'over',
        path: 'over',
        component: () => import('@/views/Over.vue'),
        meta: { title: 'Over' }
      },
      {
        name: 'conf',
        path: 'conf',
        component: () => import('@/views/Conf.vue'),
        meta: { title: 'Setting' }
      },
      {
        name: 'error',
        path: 'error',
        component: Error,
        meta: { title: 'Error' }
      },
      {
        path: ':match(.*)',
        redirect: 'error'
      }
    ]
  }
];
