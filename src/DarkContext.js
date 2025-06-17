// src/context/ThemeContext.js
import { createContext } from 'react';

export const DarkContext = createContext({
  darkMode: false,       // 현재 테마 상태
  toggleDarkMode: () => {}  // 토글 함수
});
