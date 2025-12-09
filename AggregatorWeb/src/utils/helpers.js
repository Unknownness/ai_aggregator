import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatDate = (dateString, formatStr = 'dd MMM yyyy, HH:mm') => {
  try {
    return format(new Date(dateString), formatStr, { locale: ru });
  } catch {
    return dateString;
  }
};

export const truncateText = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateChatTitle = (messages) => {
  if (messages.length === 0) return 'Новый чат';
  
  const firstMessage = messages.find(msg => msg.role === 'user');
  if (firstMessage) {
    return truncateText(firstMessage.content, 30);
  }
  
  return 'Чат';
};

export const generateChatId = () => {
  return 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

export const sanitizeChatData = (chatData) => {
  const uniqueMessages = [];
  const seenIds = new Set();
  const seenContent = new Set();
  
  chatData.messages.forEach(msg => {
    if (!seenIds.has(msg.id) && !seenContent.has(msg.content)) {
      uniqueMessages.push(msg);
      seenIds.add(msg.id);
      seenContent.add(msg.content);
    }
  });
  
  return {
    ...chatData,
    messages: uniqueMessages
  };
};