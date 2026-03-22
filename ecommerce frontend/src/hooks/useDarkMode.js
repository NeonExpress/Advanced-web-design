// src/hooks/useDarkMode.js
import { useEffect, useState } from 'react';

export default function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    // 1) If user chose a theme before, use it
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    // 2) Otherwise, follow OS preference on first load
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });

  useEffect(() => {
    const cls = 'dark';
    if (isDark) {
      document.body.classList.add(cls);
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove(cls);
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return { isDark, setIsDark, toggle: () => setIsDark(v => !v) };
}