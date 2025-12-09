import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import ChatList from './ChatList';
import NewChatButton from './NewChatButton';
import ModelSelector from './ModelSelector';
import ThemeToggle from '../ui/ThemeToggle';
import { FiSettings } from 'react-icons/fi';

const Sidebar = ({ isOpen, onClose }) => {
  const { theme } = useTheme();

  return (
    <>
      {}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        {}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Chat
            </h1>
            <ThemeToggle />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Powered by NVIDIA
          </p>
        </div>

        {}
        <div className="p-4">
          <NewChatButton />
        </div>

        {}
        <div className="flex-1 overflow-y-auto">
          <ChatList />
        </div>

        {}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-3">
            <FiSettings className="text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Настройки модели
            </span>
          </div>
          <ModelSelector />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;