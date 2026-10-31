'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="p-2 rounded-full border border-border bg-surface hover:bg-surface-secondary text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer flex items-center justify-center shadow-sm"
      aria-label="Toggle Light and Dark Theme"
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-foreground-muted hover:text-foreground transition-colors" />
      ) : (
        <Sun className="w-5 h-5 text-amber-400 hover:text-amber-300 transition-colors" />
      )}
    </button>
  );
};

