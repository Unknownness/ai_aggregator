import React, { useRef, useEffect } from 'react';
import { useChat } from '../../contexts/ChatContext';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import LoadingSpinner from '../ui/LoadingSpinner';
import { FiInbox } from 'react-icons/fi';

const ChatContainer = () => {
  const { currentChat, isLoading, error } = useChat();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p className="text-lg font-semibold">Нет активного чата</p>
          <p className="mt-2">Создайте новый чат, чтобы начать общение</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center text-red-600 dark:text-red-400">
          <p className="text-lg font-semibold">Ошибка</p>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto w-full p-4">
          {currentChat.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-gray-500 dark:text-gray-400">
              <FiInbox className="w-16 h-16 mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">
                Начните новый разговор
              </h3>
              <p className="text-center">
                Задайте вопрос ниже, чтобы начать диалог с ИИ
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {currentChat.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {isLoading && (
                <div className="flex items-center gap-3 p-4">
                  <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-primary-500 dark:bg-primary-400" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white mb-2">
                      Генерация ответа...
                    </div>
                    <LoadingSpinner size="sm" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>
      
      <ChatInput />
    </div>
  );
};

export default ChatContainer;