export const MODELS = [
  { id: 'meta/llama-3.3-70b-instruct', name: 'Llama 3.3 70B', description: 'Meta Llama 3.3 70B Instruct' },
  { id: 'mistralai/mistral-large-3-675b-instruct-2512', name: 'Mistral 635B', description: 'Mistral 635B Instruct 2512' },
  { id: 'nvidia/nvidia-nemotron-nano-9b-v2', name: 'Nemotron 9B', description: 'Nvidia Nemotron Nano 9B v2' },
];

export const DEFAULT_SETTINGS = {
  model: 'meta/llama-3.3-70b-instruct',
  parameters: {
    temperature: 0.7,
    topP: 0.9,
    frequencyPenalty: 0,
    presencePenalty: 0,
    maxTokens: 16384,
  }
};

export const MESSAGE_ROLES = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system'
};