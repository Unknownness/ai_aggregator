import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import Button from './Button';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={`Переключить на ${theme === 'light' ? 'темную' : 'светлую'} тему`}
      className="p-2 rounded-full"
    >
      {theme === 'light' ? (
        <FiMoon className="w-5 h-5" />
      ) : (
        <FiSun className="w-5 h-5" />
      )}
    </Button>
  );
};

export default ThemeToggle;