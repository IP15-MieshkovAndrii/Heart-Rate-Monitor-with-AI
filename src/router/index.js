import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import HealthAssessment from '@/views/HealthAssessment.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/assessment',
    name: 'Health Assessmentt',
    component: HealthAssessment,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;