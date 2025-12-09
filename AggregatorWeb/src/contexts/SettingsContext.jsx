import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEFAULT_SETTINGS, MODELS } from '../utils/constants';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useLocalStorage('chat-settings', DEFAULT_SETTINGS);

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateModel = (model) => {
    setSettings(prev => ({ ...prev, model }));
  };

  const updateParameter = (key, value) => {
    setSettings(prev => ({
      ...prev,
      parameters: {
        ...prev.parameters,
        [key]: value
      }
    }));
  };

  const updateTemperature = (temperature) => {
    updateParameter('temperature', parseFloat(temperature));
  };

  const updateMaxTokens = (maxTokens) => {
    updateParameter('maxTokens', parseInt(maxTokens));
  };

  const updateTopP = (topP) => {
    updateParameter('topP', parseFloat(topP));
  };

  return (
    <SettingsContext.Provider value={{
      settings,
      updateSettings,
      updateModel,
      updateParameter,
      updateTemperature,
      updateMaxTokens,
      updateTopP,
      models: MODELS
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};