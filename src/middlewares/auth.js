import { useAuth } from '@/composables/useAuth';
const {  checkTokenValidity } = useAuth();
export const authGuard = async (to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  if (to.meta.requiresAuth) {
    const isValid = await checkTokenValidity();
    if (isValid && isAuthenticated) {
      next();
    } else {
      next('/sign-in');
    }
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next('/dashboard')
    // next();
  } else {
    next();
  }
};