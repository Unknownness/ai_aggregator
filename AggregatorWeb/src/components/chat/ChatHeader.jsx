import React from 'react';
import { useChat } from '../../contexts/ChatContext';
import { useSettings } from '../../contexts/SettingsContext';
import { FiTrash2, FiCopy, FiInfo } from 'react-icons/fi';
import Button from '../ui/Button';
import { formatDate } from '../../utils/helpers';

const ChatHeader = () => {
  const { currentChat, clearChat, updateChatTitle } = useChat();
  const { settings, models } = useSettings();
  
  const currentModel = models.find(m => m.id === settings.model);

  const handleClearChat = () => {
    if (window.confirm('Вы уверены, что хотите очистить историю этого чата?')) {
      clearChat();
    }
  };

  const handleCopyChat = async () => {
    const chatText = currentChat.messages
      .map(msg => `${msg.role === 'user' ? 'Вы' : 'AI'}: ${msg.content}`)
      .join('\n\n');
    
    try {
      await navigator.clipboard.writeText(chatText);
      alert('Чат скопирован в буфер обмена!');
    } catch (err) {
      console.error('Ошибка копирования:', err);
    }
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={currentChat.title}
              onChange={(e) => updateChatTitle(currentChat.id, e.target.value)}
              className="text-xl font-semibold bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary-500 rounded px-1 py-0.5 w-full text-gray-900 dark:text-white"
            />
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
              <div className="flex items-center gap-1">
                <FiInfo className="w-3 h-3" />
                <span>{currentModel?.name || 'Модель не выбрана'}</span>
              </div>
              <div>
                {currentChat.messages.length} сообщений
              </div>
              <div>
                Обновлено: {formatDate(currentChat.updatedAt, 'dd.MM.yyyy HH:mm')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyChat}
              title="Скопировать весь чат"
            >
              <FiCopy className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearChat}
              title="Очистить историю"
            >
              <FiTrash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;