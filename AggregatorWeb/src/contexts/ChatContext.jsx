import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { sendMessageToBackend } from '../services/nimService';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useLocalStorage('chat-history', []);
  const [currentChatId, setCurrentChatId] = useLocalStorage('current-chat-id', null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentChat = React.useMemo(() => {
    if (!currentChatId && chats.length > 0) {
      const firstChat = chats[0];
      setCurrentChatId(firstChat.id);
      return firstChat;
    }
    return chats.find(chat => chat.id === currentChatId) || null;
  }, [chats, currentChatId, setCurrentChatId]);

  const createNewChat = useCallback((model = 'meta/llama-3.3-70b-instruct') => {
    const newChat = {
      id: uuidv4(),
      title: 'Новый чат',
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      model
    };
    
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    return newChat.id;
  }, [setChats, setCurrentChatId]);

  const deleteChat = useCallback((chatId) => {
    setChats(prev => {
      const filtered = prev.filter(chat => chat.id !== chatId);
      if (filtered.length === 0) {
        const newChat = {
          id: uuidv4(),
          title: 'Новый чат',
          messages: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          model: 'meta/llama-3.3-70b-instruct'
        };
        setCurrentChatId(newChat.id);
        return [newChat];
      }
      
      if (currentChatId === chatId) {
        setCurrentChatId(filtered[0].id);
      }
      
      return filtered;
    });
  }, [setChats, currentChatId, setCurrentChatId]);

  const updateChatTitle = useCallback((chatId, title) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, title, updatedAt: new Date().toISOString() }
        : chat
    ));
  }, [setChats]);

  const sendMessage = useCallback(async (content, settings) => {
    if (!content.trim()) return;
    
    setIsLoading(true);
    setError(null);

    const userMessage = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };

    const targetChatId = currentChatId;
    if (!targetChatId) {
      setError('Нет активного чата');
      setIsLoading(false);
      return;
    }

    const currentChatState = chats.find(chat => chat.id === targetChatId);
    if (!currentChatState) {
      setError('Чат не найден');
      setIsLoading(false);
      return;
    }

    const messagesForNim = currentChatState.messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));
    
    messagesForNim.push({ role: 'user', content });

    setChats(prev => prev.map(chat => {
      if (chat.id === targetChatId) {
        const updatedMessages = [...chat.messages, userMessage];
        const newTitle = chat.messages.length === 0 
          ? content.substring(0, 30) + (content.length > 30 ? '...' : '')
          : chat.title;
        
        return {
          ...chat,
          title: newTitle,
          messages: updatedMessages,
          updatedAt: new Date().toISOString()
        };
      }
      return chat;
    }));

    try {
      const response = await sendMessageToBackend(messagesForNim, settings);

      const assistantMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: response.content,
        reasoningContent: response.reasoningContent,
        timestamp: new Date().toISOString()
      };

      setChats(prev => prev.map(chat => {
        if (chat.id === targetChatId) {
          const userMessageIndex = chat.messages.findIndex(msg => 
            msg.id === userMessage.id || 
            (msg.role === 'user' && msg.content === content)
          );
          
          if (userMessageIndex !== -1) {
            const updatedMessages = [...chat.messages];
            if (updatedMessages[userMessageIndex].id !== userMessage.id) {
              updatedMessages[userMessageIndex] = userMessage;
            }
            updatedMessages.push(assistantMessage);
            
            return {
              ...chat,
              messages: updatedMessages,
              updatedAt: new Date().toISOString()
            };
          }
          
          return {
            ...chat,
            messages: [...chat.messages, userMessage, assistantMessage],
            updatedAt: new Date().toISOString()
          };
        }
        return chat;
      }));

    } catch (err) {
      setChats(prev => prev.map(chat => {
        if (chat.id === targetChatId) {
          return {
            ...chat,
            messages: chat.messages.filter(msg => msg.id !== userMessage.id),
            updatedAt: new Date().toISOString()
          };
        }
        return chat;
      }));
      
      setError(err.message || 'Ошибка при отправке сообщения');
      console.error('Error sending message:', err);
    } finally {
      setIsLoading(false);
    }
  }, [chats, currentChatId, setChats]);

  const clearChat = useCallback((chatId = currentChatId) => {
    if (!chatId) return;
    
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, messages: [], updatedAt: new Date().toISOString() }
        : chat
    ));
  }, [currentChatId, setChats]);

  return (
    <ChatContext.Provider value={{
      chats,
      currentChat,
      currentChatId,
      isLoading,
      error,
      createNewChat,
      deleteChat,
      updateChatTitle,
      sendMessage,
      clearChat,
      setCurrentChatId
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};