
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`relative w-12 h-12 rounded-2xl transition-all duration-300 hover:scale-105 ${
        isDark 
          ? 'glass-card hover:shadow-accent/20' 
          : 'bg-white/80 border border-gray-200 hover:bg-white hover:shadow-lg hover:shadow-primary/10'
      }`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Sun 
        className={`h-5 w-5 transition-all duration-500 ${
          isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
        } ${isDark ? 'text-yellow-400' : 'text-orange-500'}`} 
      />
      <Moon 
        className={`absolute h-5 w-5 transition-all duration-500 ${
          isDark ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
        } ${isDark ? 'text-blue-300' : 'text-blue-600'}`} 
      />
    </Button>
  );
};

export default ThemeToggle;
