// Chapter Registry - Maps chapter IDs to their content functions
import { getChapter1Content } from './en/chapter1.js';
import { getChapter2Content } from './en/chapter2.js';
import { getChapter11Content } from './en/chapter11.js';
import { getChapter12Content } from './en/chapter12.js';
import { getChapter18Content } from './en/chapter18.js';
import { getChapter20Content } from './en/chapter20.js';
import { getChapter1ContentArabic } from './ar/chapter1.js';
import { getChapter2ContentArabic } from './ar/chapter2.js';
import { getChapter11ContentArabic } from './ar/chapter11.js';

// English chapters registry
export const englishChapters = {
  1: getChapter1Content,
  2: getChapter2Content,
  11: getChapter11Content,
  12: getChapter12Content,
  18: getChapter18Content,
  20: getChapter20Content,
};

// Arabic chapters registry
export const arabicChapters = {
  1: getChapter1ContentArabic,
  2: getChapter2ContentArabic,
  11: getChapter11ContentArabic,
  // Add more Arabic chapters as they are created
  // 12: getChapter12ContentArabic,
  // 18: getChapter18ContentArabic,
  // 20: getChapter20ContentArabic,
};

// Function to get chapter content by ID and language
export function getChapterContent(chapterId, language = 'en') {
  const chapters = language === 'ar' ? arabicChapters : englishChapters;
  const chapterFunction = chapters[chapterId];
  
  if (chapterFunction) {
    return chapterFunction();
  }
  
  return null;
}

// Function to get all available chapter IDs for a language
export function getAvailableChapterIds(language = 'en') {
  const chapters = language === 'ar' ? arabicChapters : englishChapters;
  return Object.keys(chapters).map(Number);
}

// Function to check if a chapter exists
export function chapterExists(chapterId, language = 'en') {
  const chapters = language === 'ar' ? arabicChapters : englishChapters;
  return chapters.hasOwnProperty(chapterId);
} 