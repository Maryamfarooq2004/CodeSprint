import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import { auth } from '../firebase/config';
import { getUserProfile } from '../services/userService';

export const useAuthState = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get additional user data from Firestore
          const userData = await getUserProfile(user.uid);
          
          dispatch(setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            ...userData
          }));
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Still set basic user data even if profile fetch fails
          dispatch(setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
          }));
        }
      } else {
        dispatch(setUser(null));
      }
    });
    
    return () => unsubscribe();
  }, [dispatch]);
};
