import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Progress from '@/views/Progress.vue';
import PersonalData from '@/views/PersonalData.vue';
import Results from '@/views/Results.vue';
import Dashboard from '@/views/Dashboard.vue';
import History from '@/views/History.vue';
import Measurement from '@/views/Measurement.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/progress',
    name: 'Progress',
    component: Progress,
  },
  {
    path: '/personal-data',
    name: 'Personal Data',
    component: PersonalData,
  },
  {
    path: '/results',
    name: 'Results',
    component: Results,
    beforeEnter: (to, from, next) => {
      const heartRateData = localStorage.getItem('heartRateData');
      if (!heartRateData) {
        next('/dashboard');
      } else {
        next();
      }
    },
  },
  {
    path: '/results/:id',
    name: 'Measurement',
    component: Measurement,
    beforeEnter: (to, from, next) => {
      const heartRateData = localStorage.getItem('heartRateData');
      if (!heartRateData) {
        next('/dashboard');
      } else {
        next();
      }
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/history',
    name: 'History',
    component: History,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;