import React, { useEffect } from 'react';
import { useChat } from '../../contexts/ChatContext';
import { useSettings } from '../../contexts/SettingsContext';
import Button from '../ui/Button';
import { FiPlus } from 'react-icons/fi';

const NewChatButton = () => {
  const { createNewChat, chats } = useChat();
  const { settings } = useSettings();

  useEffect(() => {
    if (chats.length === 0) {
      createNewChat(settings.model);
    }
  }, [chats.length, createNewChat, settings.model]);

  const handleNewChat = () => {
    createNewChat(settings.model);
  };

  return (
    <Button
      variant="primary"
      onClick={handleNewChat}
      className="w-full justify-center"
    >
      <FiPlus className="mr-2" />
      Новый чат
    </Button>
  );
};

export default NewChatButton;