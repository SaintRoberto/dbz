import { createRouter, createWebHistory } from 'vue-router'
import CharDetails from '../views/CharDetails.vue';
import dbzList from '@/components/dbzList.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dbzList',
      component: dbzList
    },
    {
      path: '/details/:idChar',
      name: 'details',
      component: CharDetails // Tu componente de detalles
    }
  ]  
})

export default router
