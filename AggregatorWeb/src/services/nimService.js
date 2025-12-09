import api from './api';

export const sendMessageToBackend = async (messages, settings) => {
  const requestData = {
    model: settings.model,
    messages: messages.map(msg => ({
      role: msg.role,
      content: msg.content
    })),
    temperature: settings.parameters.temperature,
    top_p: settings.parameters.topP,
    frequency_penalty: settings.parameters.frequencyPenalty,
    presence_penalty: settings.parameters.presencePenalty,
    max_tokens: settings.parameters.maxTokens,
    stream: false
  };

  const response = await api.post('', requestData);
  
  if (response.choices && response.choices.length > 0) {
    const choice = response.choices[0];
    return {
      content: choice.message?.content || '',
      reasoningContent: choice.message?.reasoning_content || null
    };
  }
  
  throw new Error('Неверный формат ответа от сервера');
};

export const validateModel = (model) => {
  const validModels = ['meta/llama-3.3-70b-instruct', 'mistralai/mistral-large-3-675b-instruct-2512', 'nvidia/nvidia-nemotron-nano-9b-v2'];
  return validModels.includes(model);
};
