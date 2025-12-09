import React, { useState } from 'react';
import { formatDate } from '../../utils/helpers';
import { FiUser, FiCopy, FiCheck, FiChevronDown, FiChevronUp, FiActivity } from 'react-icons/fi';
import { clsx } from 'clsx';
import MarkdownRenderer from '../ui/MarkdownRenderer';

const ChatMessage = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const [isReasoningExpanded, setIsReasoningExpanded] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const isUser = message.role === 'user';
  const hasReasoning = !isUser && message.reasoningContent;

  if (hasReasoning) {
    return (
      <div className={clsx(
        'group relative rounded-2xl p-4',
        'bg-gray-50 dark:bg-gray-800/50 max-w-[85%]'
      )}>
        <div className="flex items-start gap-3">
          <div className={clsx(
            'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
            'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white'
          )}>
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-gray-900 dark:text-white">
                AI
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(message.timestamp, 'HH:mm')}
              </span>
            </div>
            
            {}
            <div className="mb-4">
              <div className={clsx(
                'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900',
                'border border-blue-100 dark:border-gray-700 rounded-lg overflow-hidden',
                'transition-all duration-300',
                isReasoningExpanded ? 'max-h-none' : 'max-h-20'
              )}>
                <button
                  onClick={() => setIsReasoningExpanded(!isReasoningExpanded)}
                  className="w-full flex items-center justify-between p-3 hover:bg-blue-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <FiActivity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-blue-700 dark:text-blue-300">
                      Рассуждения модели
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-blue-600 dark:text-blue-400 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded">
                      {isReasoningExpanded ? 'Свернуть' : 'Развернуть'}
                    </span>
                    {isReasoningExpanded ? (
                      <FiChevronUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <FiChevronDown className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                </button>
                
                <div className="p-3 overflow-y-auto">
                  <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    <MarkdownRenderer content={message.reasoningContent} />
                  </div>
                </div>
              </div>
            </div>
            
            {}
            <div className="prose dark:prose-invert max-w-none">
              <div className="text-gray-900 dark:text-gray-100">
                <MarkdownRenderer content={message.content} />
              </div>
            </div>
          </div>
          
          <button
            onClick={handleCopy}
            className={clsx(
              'opacity-0 group-hover:opacity-100 transition-opacity',
              'p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
            aria-label="Копировать сообщение"
          >
            {copied ? (
              <FiCheck className="w-4 h-4 text-green-500" />
            ) : (
              <FiCopy className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(
      'group relative rounded-2xl p-4',
      isUser
        ? 'bg-primary-50 dark:bg-primary-900/20 ml-auto max-w-[85%]'
        : 'bg-gray-50 dark:bg-gray-800/50 max-w-[85%]'
    )}>
      <div className="flex items-start gap-3">
        <div className={clsx(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          isUser
            ? 'bg-primary-500 text-white'
            : 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white'
        )}>
          {isUser ? (
            <FiUser className="w-4 h-4" />
          ) : (
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-gray-900 dark:text-white">
              {isUser ? 'Вы' : 'AI'}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(message.timestamp, 'HH:mm')}
            </span>
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            <div className="text-gray-900 dark:text-gray-100">
              <MarkdownRenderer content={message.content} />
            </div>
          </div>
        </div>
        
        {!isUser && (
          <button
            onClick={handleCopy}
            className={clsx(
              'opacity-0 group-hover:opacity-100 transition-opacity',
              'p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
            aria-label="Копировать сообщение"
          >
            {copied ? (
              <FiCheck className="w-4 h-4 text-green-500" />
            ) : (
              <FiCopy className="w-4 h-4 text-gray-500" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;