export const resultsGuard = (to, from, next) => {
  const heartRateData = localStorage.getItem('heartRateData');
  if (!heartRateData) {
    next('/dashboard');
  } else {
    next();
  }
};