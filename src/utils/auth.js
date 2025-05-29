import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';

export const registerUser = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: name });
    const token = await user.getIdToken(true);

    return {
      success: true,
      token,
      user: {
        email: user.email,
        displayName: user.displayName,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: error.message,
    };
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken(true);

    return {
      success: true,
      token,
      user: {
        email: user.email,
        displayName: user.displayName || '',
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: error.message,
    };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.code,
      message: error.message,
    };
  }
};