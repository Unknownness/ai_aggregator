import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import ChatContainer from '../chat/ChatContainer';
import { FiMenu, FiX } from 'react-icons/fi';

const Layout = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="flex h-screen">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-md bg-white dark:bg-gray-800 shadow-md"
          aria-label="Открыть меню"
        >
          {sidebarOpen ? (
            <FiX className="w-5 h-5" />
          ) : (
            <FiMenu className="w-5 h-5" />
          )}
        </button>
        
        <ChatContainer />
      </main>
    </div>
  );
};

export default Layout;