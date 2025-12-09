import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../../contexts/ChatContext';
import { useSettings } from '../../contexts/SettingsContext';
import Button from '../ui/Button';
import { FiSend, FiPaperclip } from 'react-icons/fi';

const ChatInput = () => {
  const [input, setInput] = useState('');
  const { isLoading, sendMessage } = useChat();
  const { settings } = useSettings();
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const messageToSend = input.trim();
    setInput('');
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    await sendMessage(messageToSend, settings);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-4"
      >
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Введите сообщение..."
              disabled={isLoading}
              className="w-full px-4 py-3 pr-12 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
              rows={1}
            />
            <button
              type="button"
              className="absolute right-3 top-3 p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              aria-label="Прикрепить файл"
            >
              <FiPaperclip className="w-5 h-5" />
            </button>
          </div>
          
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isLoading}
            disabled={!input.trim()}
            className="self-end px-6"
          >
            <FiSend className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
          Нажмите Enter для отправки, Shift+Enter для новой строки
        </div>
      </form>
    </div>
  );
};

export default ChatInput;