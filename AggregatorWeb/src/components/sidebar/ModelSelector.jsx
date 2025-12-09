import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import Select from '../ui/Select';

const ModelSelector = () => {
  const { settings, updateModel, updateTemperature, updateMaxTokens, updateTopP, models } = useSettings();

  const handleModelChange = (e) => {
    updateModel(e.target.value);
  };

  return (
    <div className="space-y-4">
      <Select
        label="Модель"
        value={settings.model}
        onChange={handleModelChange}
        options={models.map(model => ({
          value: model.id,
          label: `${model.name} - ${model.description}`
        }))}
        className="w-full"
      />

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Temperature
            </label>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {settings.parameters.temperature.toFixed(1)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={settings.parameters.temperature}
            onChange={(e) => updateTemperature(e.target.value)}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600 dark:accent-primary-500"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Более высокие значения делают ответы более случайными
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Max Tokens
            </label>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {settings.parameters.maxTokens}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="16384"
            step="1"
            value={settings.parameters.maxTokens}
            onChange={(e) => updateMaxTokens(e.target.value)}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600 dark:accent-primary-500"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Максимальная длина ответа в токенах
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Top P
            </label>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {settings.parameters.topP.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={settings.parameters.topP}
            onChange={(e) => updateTopP(e.target.value)}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600 dark:accent-primary-500"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Контролирует разнообразие ответов
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;