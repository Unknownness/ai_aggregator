import React, { useState, Suspense } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { ChatProvider } from './contexts/ChatContext';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/layout/ErrorBoundary';
import './styles/globals.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <SettingsProvider>
          <ChatProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
              <Suspense fallback={
                <div className="flex items-center justify-center h-screen">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Загрузка чата...</p>
                  </div>
                </div>
              }>
                <Layout
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
              </Suspense>
            </div>
          </ChatProvider>
        </SettingsProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;