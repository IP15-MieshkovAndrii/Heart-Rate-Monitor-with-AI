import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Progress from '@/views/Progress.vue';
import PersonalData from '@/views/PersonalData.vue';
import Results from '@/views/Results.vue';
import Dashboard from '@/views/Dashboard.vue';
import History from '@/views/History.vue';
import Measurement from '@/views/Measurement.vue';
import SignIn from '@/views/SignIn.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import { resultsGuard } from '@/middlewares/results';
import { authGuard } from '@/middlewares/auth';
import Profile from '@/views/Profile.vue';
import AddMeasure from '@/views/AddMeasure.vue';

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
    path: '/profile',
    name: 'Profile',
    component: Profile,
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
    beforeEnter: resultsGuard,
  },
  {
    path: '/results/:id',
    name: 'Measurement',
    component: Measurement,
    beforeEnter: resultsGuard,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/measure/new',
    name: 'New Measurement',
    component: AddMeasure,
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    beforeEnter: authGuard,
    meta: { requiresAuth: true },
  },
  {
    path: '/sign-in',
    name: 'Sign In',
    component: SignIn,
    meta: { requiresGuest: true },
    beforeEnter: authGuard,
    
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true },
    beforeEnter: authGuard,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true },
    beforeEnter: authGuard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;