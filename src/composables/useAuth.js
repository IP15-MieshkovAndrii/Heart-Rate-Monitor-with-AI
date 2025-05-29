// src/composables/useAuth.js
import { onMounted } from 'vue';
import Cookies from 'js-cookie';
import { auth } from '@/utils/firebase';
import { onAuthStateChanged, getIdTokenResult } from 'firebase/auth';
import { registerUser, loginUser, logoutUser } from '@/utils/auth';

export function useAuth() {

  const AUTH_COOKIE = 'auth_data';
  const COOKIE_EXPIRY_DAYS = 1; 

  const getAuthData = () => {
    const cookieData = Cookies.get(AUTH_COOKIE);
    if (cookieData) {
      try {
        return JSON.parse(cookieData);
      } catch (error) {
        console.error('Error parsing auth cookie:', error);
        return null;
      }
    }
    return null;
  };

  const setAuthData = (firebaseUser, tokenResult) => {
    const authData = {
      user: {
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || '',
        uid: firebaseUser.uid,
        token: tokenResult.token,
        expires: tokenResult.expirationTime,
      },
      isAuthenticated: true,
      firebaseToken: tokenResult.token,
    };

    Cookies.set(AUTH_COOKIE, JSON.stringify(authData), { expires: COOKIE_EXPIRY_DAYS });
    // Maintain localStorage for backward compatibility
    localStorage.setItem('user', JSON.stringify(authData.user));
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('firebaseToken', tokenResult.token);
  };

  // Helper to clear auth data
  const clearAuthData = () => {
    Cookies.remove(AUTH_COOKIE);
    localStorage.removeItem('user');
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('firebaseToken');
  };

  onMounted(() => {
    const authData = getAuthData();
    const now = new Date();

    if (authData && authData.user && new Date(authData.user.expires) > now) {
      return;
    }
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const tokenResult = await getIdTokenResult(firebaseUser, true);
          setAuthData(firebaseUser, tokenResult);
        } catch (error) {
          console.error('Error fetching token:', error);
          clearAuthData();
        }
      } else {
        clearAuthData();
      }
    });
  });

  const register = async (email, password, name) => {
    const result = await registerUser(email, password, name);
    if (result.success && result.user && result.token) {
      setAuthData(result.user, { token: result.token, expirationTime: result.expires });
    }
    return result;
  };

  const login = async (email, password) => {
    const result = await loginUser(email, password);
    if (result.success && result.user && result.token) {
      setAuthData(result.user, { token: result.token, expirationTime: result.expires });
    }
    return result;
  };

  const logout = async () => {
    const result = await logoutUser();
    if (result.success) {
      clearAuthData();
    }
    return result;
  };

  const checkTokenValidity = async () => {
    const authData = getAuthData();
    const now = new Date();

    if (authData && authData.user && new Date(authData.user.expires) > now) {
      return true;
    }

    if (auth.currentUser) {
      try {
        const tokenResult = await getIdTokenResult(auth.currentUser, true);
        if (new Date(tokenResult.expirationTime) > now) {
          setAuthData(auth.currentUser, tokenResult);
          return true;
        } else {
          await logout();
          return false;
        }
      } catch (error) {
        console.error('Token validation error:', error);
        await logout();
        return false;
      }
    } else {
      await logout();
      return false;
    }
  };

  return {
    register,
    login,
    logout,
    checkTokenValidity,
  };
}