import { useApi } from './useApi';
import { useAIChatStore } from '~/stores/aiChat';
import type { ToolCallResult, UsageInfo } from '~/types/ai';

export interface SendMessageRequest {
  message: string;
  context?: {
    langId?: number;
  };
}

export interface SendMessageResponse {
  response: string;
  toolCalls?: ToolCallResult[];
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  remainingQuestions: number;
}

export const useAIChat = () => {
  const api = useApi();
  const chatStore = useAIChatStore();

  const sendMessage = async (message: string, context?: { langId?: number }) => {
    try {
      console.log('AI Chat: Sending message', { message, context });
      chatStore.setLoading(true);
      chatStore.setError(null);

      // Add user message to chat
      chatStore.addMessage({
        role: 'user',
        content: message,
      });

      // Add loading message for assistant
      const loadingMessageId = chatStore.addMessage({
        role: 'assistant',
        content: '',
        loading: true,
      });

      const request: SendMessageRequest = {
        message,
        context,
      };

      console.log('AI Chat: Making API request', request);
      const response = await api.post<SendMessageResponse>('/ai-chat/message', request);
      console.log('AI Chat: API response', response);

      if (response.success && response.data) {
        // Update loading message with actual response
        chatStore.updateMessage(loadingMessageId, {
          content: response.data.response,
          toolCalls: response.data.toolCalls,
          loading: false,
        });

        // Update usage info
        if (response.data.remainingQuestions !== undefined) {
          chatStore.setUsageInfo({
            remaining_questions: response.data.remainingQuestions,
            daily_limit: 10,
            questions_count: 10 - response.data.remainingQuestions,
            reset_at: '', // Will be set from usage endpoint
          });
        }

        return {
          success: true,
          response: response.data.response,
          toolCalls: response.data.toolCalls,
          usage: response.data.usage,
        };
      } else {
        // Remove loading message
        chatStore.removeMessage(loadingMessageId);

        const errorMessage = response.message || 'Failed to send message';
        chatStore.setError(errorMessage);
        console.error('AI Chat: Request failed', response);

        return {
          success: false,
          error: errorMessage,
        };
      }
    } catch (error: any) {
      chatStore.setLoading(false);
      const errorMessage = error.message || 'Network error';
      chatStore.setError(errorMessage);
      console.error('AI Chat: Exception caught', error);

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      chatStore.setLoading(false);
    }
  };

  const getUsage = async () => {
    try {
      const response = await api.get<UsageInfo>('/ai-chat/usage');

      if (response.success && response.data) {
        chatStore.setUsageInfo(response.data);
        return response.data;
      }
    } catch (error: any) {
      console.error('Error fetching usage:', error);
    }
    return null;
  };

  const getOperationHistory = async (limit: number = 50) => {
    try {
      const response = await api.get(`/ai-chat/history?limit=${limit}`);
      return response.success ? response.data : null;
    } catch (error: any) {
      console.error('Error fetching operation history:', error);
      return null;
    }
  };

  const checkHealth = async () => {
    try {
      const response = await api.get('/ai-chat/health');
      return response.success ? response.data : null;
    } catch (error: any) {
      console.error('Error checking AI health:', error);
      return null;
    }
  };

  const resetChat = () => {
    chatStore.resetConversation();
  };

  return {
    // State access
    messages: chatStore.messages,
    loading: chatStore.loading,
    error: chatStore.error,
    usageInfo: chatStore.usageInfo,
    remainingQuestions: chatStore.remainingQuestions,
    canSendMessage: chatStore.canSendMessage,
    isLimitReached: chatStore.isLimitReached,

    // Actions
    sendMessage,
    getUsage,
    getOperationHistory,
    checkHealth,
    resetChat,
  };
};
