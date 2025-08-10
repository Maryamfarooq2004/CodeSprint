import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    updateProfile as updateAuthProfile,
    updatePassword
} from 'firebase/auth';
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where
} from 'firebase/firestore';
import {
    getDownloadURL,
    ref,
    uploadBytes
} from 'firebase/storage';
import { auth, db, storage } from '../firebase/config';

// User profile operations
export const createUserProfile = async (user, additionalData = {}) => {
  if (!user) return;
  
  const userRef = doc(db, 'users', user.uid);
  const snapShot = await getDoc(userRef);
  
  if (!snapShot.exists()) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    
    try {
      await setDoc(userRef, {
        displayName,
        email,
        photoURL,
        createdAt,
        isAdmin: false,
        ...additionalData
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  }
  
  return userRef;
};

export const getUserProfile = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.exists() ? { id: userDoc.id, ...userDoc.data() } : null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId, updates) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: new Date()
    });
    
    // Update auth profile if display name or photo URL changed
    if (updates.displayName || updates.photoURL) {
      await updateAuthProfile(auth.currentUser, {
        displayName: updates.displayName,
        photoURL: updates.photoURL
      });
    }
    
    return await getUserProfile(userId);
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const uploadProfileImage = async (userId, file) => {
  try {
    const imageRef = ref(storage, `profile-images/${userId}/${file.name}`);
    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    // Update user profile with new photo URL
    await updateUserProfile(userId, { photoURL: downloadURL });
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No authenticated user');
    
    // Re-authenticate user
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    
    // Update password
    await updatePassword(user, newPassword);
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};

// Progress operations
export const getUserProgress = async (userId) => {
  try {
    const progressRef = collection(db, 'users', userId, 'progress');
    const querySnapshot = await getDocs(progressRef);
    
    const progress = [];
    querySnapshot.forEach((doc) => {
      progress.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return progress;
  } catch (error) {
    console.error('Error fetching user progress:', error);
    throw error;
  }
};

export const saveProgress = async (userId, chapterId, progressData) => {
  try {
    const progressRef = collection(db, 'users', userId, 'progress');
    
    // Check if progress exists for this chapter
    const q = query(progressRef, where('chapterId', '==', chapterId));
    const querySnapshot = await getDocs(q);
    
    const data = {
      chapterId,
      ...progressData,
      updatedAt: new Date()
    };
    
    if (!querySnapshot.empty) {
      // Update existing progress
      const existingDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, 'users', userId, 'progress', existingDoc.id), data);
      return { id: existingDoc.id, ...data };
    } else {
      // Create new progress entry
      const docRef = await addDoc(progressRef, data);
      return { id: docRef.id, ...data };
    }
  } catch (error) {
    console.error('Error saving progress:', error);
    throw error;
  }
};

export const getTypingStats = async (userId) => {
  try {
    const statsRef = collection(db, 'users', userId, 'typing_stats');
    const q = query(statsRef, orderBy('timestamp', 'desc'), limit(100));
    const querySnapshot = await getDocs(q);
    
    const stats = [];
    querySnapshot.forEach((doc) => {
      stats.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return stats;
  } catch (error) {
    console.error('Error fetching typing stats:', error);
    throw error;
  }
};

export const saveTypingSession = async (userId, sessionData) => {
  try {
    const statsRef = collection(db, 'users', userId, 'typing_stats');
    
    const data = {
      ...sessionData,
      timestamp: new Date()
    };
    
    const docRef = await addDoc(statsRef, data);
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error('Error saving typing session:', error);
    throw error;
  }
};
