import React from 'react';
import { useChat } from '../../contexts/ChatContext';
import { formatDate } from '../../utils/helpers';
import { FiMessageSquare, FiTrash2, FiClock } from 'react-icons/fi';
import { clsx } from 'clsx';

const ChatList = () => {
  const { chats, currentChatId, setCurrentChatId, deleteChat } = useChat();

  const handleDelete = (e, chatId) => {
    e.stopPropagation();
    if (window.confirm('Вы уверены, что хотите удалить этот чат?')) {
      deleteChat(chatId);
    }
  };

  return (
    <div className="space-y-1 p-2">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className={clsx(
            'group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            currentChatId === chat.id
              ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
              : 'border border-transparent'
          )}
          onClick={() => setCurrentChatId(chat.id)}
        >
          <div className="flex-shrink-0">
            <FiMessageSquare className={clsx(
              'w-5 h-5',
              currentChatId === chat.id
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-500 dark:text-gray-400'
            )} />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className={clsx(
              'font-medium truncate',
              currentChatId === chat.id
                ? 'text-primary-700 dark:text-primary-300'
                : 'text-gray-900 dark:text-gray-100'
            )}>
              {chat.title}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <FiClock className="w-3 h-3" />
              <span>{formatDate(chat.updatedAt, 'dd.MM HH:mm')}</span>
              {chat.messages.length > 0 && (
                <span className="ml-auto">
                  {chat.messages.length} сообщ.
                </span>
              )}
            </div>
          </div>

          <button
            onClick={(e) => handleDelete(e, chat.id)}
            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-opacity"
            aria-label="Удалить чат"
          >
            <FiTrash2 className="w-4 h-4 text-gray-500 hover:text-red-500" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ChatList;