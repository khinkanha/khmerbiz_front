import { storeToRefs } from 'pinia';
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

export interface AsyncJobResponse {
  jobId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

export interface JobStatusResponse {
  jobId: string;
  jobStatus: 'pending' | 'processing' | 'completed' | 'failed';
  result?: SendMessageResponse;
  error?: string;
  remainingQuestions: number;
}

export const useAIChat = () => {
  const api = useApi();
  const chatStore = useAIChatStore();
  const { messages, hasMessages, loading, error, usageInfo, remainingQuestions, canSendMessage, isLimitReached } = storeToRefs(chatStore);

  const pollJob = async (jobId: string, loadingMessageId: string): Promise<void> => {
    const maxPolls = 120; // ~2 minutes at 1s interval
    let pollCount = 0;

    while (pollCount < maxPolls) {
      pollCount++;
      const response = await api.get<JobStatusResponse>(`/ai-chat/job/${jobId}`);

      if (!response.success || !response.data) {
        break;
      }

      const { jobStatus, result, error: jobError, remainingQuestions: remaining } = response.data;

      // Update usage info on every poll
      if (remaining !== undefined) {
        chatStore.setUsageInfo({
          remaining_questions: remaining,
          daily_limit: 10,
          questions_count: 10 - remaining,
          reset_at: '',
        });
      }

      if (jobStatus === 'completed' && result) {
        chatStore.updateMessage(loadingMessageId, {
          content: result.response,
          toolCalls: result.toolCalls,
          loading: false,
        });
        return;
      }

      if (jobStatus === 'failed') {
        chatStore.updateMessage(loadingMessageId, {
          content: '',
          loading: false,
          error: jobError || 'AI processing failed',
        });
        chatStore.setError(jobError || 'AI processing failed');
        return;
      }

      // Wait 1s before next poll
      await new Promise(r => setTimeout(r, 1000));
    }

    // Timeout
    chatStore.updateMessage(loadingMessageId, {
      content: '',
      loading: false,
      error: 'Request timed out. Please try again.',
    });
    chatStore.setError('Request timed out');
  };

  const sendMessage = async (message: string, context?: { langId?: number }) => {
    try {
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

      const request: SendMessageRequest = { message, context };

      // Send message — get jobId back immediately
      const response = await api.post<AsyncJobResponse>('/ai-chat/message', request);

      if (response.success && response.data?.jobId) {
        // Poll for result
        await pollJob(response.data.jobId, loadingMessageId);
        return { success: true };
      } else {
        chatStore.removeMessage(loadingMessageId);
        const errorMessage = response.message || 'Failed to send message';
        chatStore.setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error: any) {
      chatStore.setLoading(false);
      const errorMessage = error.message || 'Network error';
      chatStore.setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      chatStore.setLoading(false);
    }
  };

  const getUsage = async () => {
    try {
      const response = await api.get<UsageInfo>('/ai-chat/usage');

      if (response.success && response.data && (response.data as any).remaining_questions !== undefined) {
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
    // State access (via storeToRefs to preserve reactivity)
    messages,
    hasMessages,
    loading,
    error,
    usageInfo,
    remainingQuestions,
    canSendMessage,
    isLimitReached,

    // Actions
    sendMessage,
    getUsage,
    getOperationHistory,
    checkHealth,
    resetChat,
  };
};
