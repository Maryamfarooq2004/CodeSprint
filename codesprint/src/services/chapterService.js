import {
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    where
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const getAllChapters = async () => {
  try {
    const chaptersRef = collection(db, 'chapters');
    const q = query(chaptersRef, orderBy('language'), orderBy('level'), orderBy('order'));
    const querySnapshot = await getDocs(q);
    
    const chapters = [];
    querySnapshot.forEach((doc) => {
      chapters.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return chapters;
  } catch (error) {
    console.error('Error fetching chapters:', error);
    throw error;
  }
};

export const getChapterById = async (chapterId) => {
  try {
    const chapterDoc = await getDoc(doc(db, 'chapters', chapterId));
    return chapterDoc.exists() ? { id: chapterDoc.id, ...chapterDoc.data() } : null;
  } catch (error) {
    console.error('Error fetching chapter:', error);
    throw error;
  }
};

export const getChaptersByLanguage = async (language) => {
  try {
    const chaptersRef = collection(db, 'chapters');
    const q = query(
      chaptersRef, 
      where('language', '==', language),
      orderBy('level'), 
      orderBy('order')
    );
    const querySnapshot = await getDocs(q);
    
    const chapters = [];
    querySnapshot.forEach((doc) => {
      chapters.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return chapters;
  } catch (error) {
    console.error('Error fetching chapters by language:', error);
    throw error;
  }
};

export const getChaptersByLevel = async (level) => {
  try {
    const chaptersRef = collection(db, 'chapters');
    const q = query(
      chaptersRef, 
      where('level', '==', level),
      orderBy('language'), 
      orderBy('order')
    );
    const querySnapshot = await getDocs(q);
    
    const chapters = [];
    querySnapshot.forEach((doc) => {
      chapters.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return chapters;
  } catch (error) {
    console.error('Error fetching chapters by level:', error);
    throw error;
  }
};

export const getChaptersByCategory = async (category) => {
  try {
    const chaptersRef = collection(db, 'chapters');
    const q = query(
      chaptersRef, 
      where('category', '==', category),
      orderBy('language'), 
      orderBy('order')
    );
    const querySnapshot = await getDocs(q);
    
    const chapters = [];
    querySnapshot.forEach((doc) => {
      chapters.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return chapters;
  } catch (error) {
    console.error('Error fetching chapters by category:', error);
    throw error;
  }
};

export const searchChapters = async (searchTerm) => {
  try {
    // Note: Firestore doesn't support full-text search natively
    // This is a basic implementation - for production, consider using Algolia or similar
    const chapters = await getAllChapters();
    
    return chapters.filter(chapter =>
      chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chapter.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (chapter.snippet && chapter.snippet.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  } catch (error) {
    console.error('Error searching chapters:', error);
    throw error;
  }
};

// Helper functions to organize chapters
export const groupChaptersByCategory = (chapters) => {
  return chapters.reduce((acc, chapter) => {
    const category = chapter.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(chapter);
    return acc;
  }, {});
};

export const groupChaptersByLanguage = (chapters) => {
  return chapters.reduce((acc, chapter) => {
    const language = chapter.language;
    if (!acc[language]) {
      acc[language] = [];
    }
    acc[language].push(chapter);
    return acc;
  }, {});
};

export const groupChaptersByLevel = (chapters) => {
  return chapters.reduce((acc, chapter) => {
    const level = chapter.level;
    if (!acc[level]) {
      acc[level] = [];
    }
    acc[level].push(chapter);
    return acc;
  }, {});
};

// Get random chapter for practice
export const getRandomChapter = async (filters = {}) => {
  try {
    let chapters;
    
    if (filters.language) {
      chapters = await getChaptersByLanguage(filters.language);
    } else if (filters.level) {
      chapters = await getChaptersByLevel(filters.level);
    } else if (filters.category) {
      chapters = await getChaptersByCategory(filters.category);
    } else {
      chapters = await getAllChapters();
    }
    
    if (chapters.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * chapters.length);
    return chapters[randomIndex];
  } catch (error) {
    console.error('Error getting random chapter:', error);
    throw error;
  }
};
