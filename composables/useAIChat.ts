import { storeToRefs } from 'pinia';
import { useApi } from './useApi';
import { useAIChatStore } from '~/stores/aiChat';
import type { ToolCallResult, UsageInfo, AIOperation, ContentVersion } from '~/types/ai';

export interface SendMessageRequest {
  message: string;
  conversationId?: number;
  context?: {
    langId?: number;
  };
}

export interface SendMessageResponse {
  response: string;
  toolCalls?: ToolCallResult[];
  conversationId?: number;
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
  const { messages, hasMessages, loading, error, usageInfo, remainingQuestions, canSendMessage, isLimitReached, conversationId } = storeToRefs(chatStore);

  const pollJob = async (jobId: string, loadingMessageId: string): Promise<SendMessageResponse | null> => {
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
        // Save conversationId from result for subsequent messages
        if (result.conversationId && !conversationId.value) {
          chatStore.setConversationId(result.conversationId);
        }

        chatStore.updateMessage(loadingMessageId, {
          content: result.response,
          toolCalls: result.toolCalls,
          loading: false,
        });
        return result;
      }

      if (jobStatus === 'failed') {
        chatStore.updateMessage(loadingMessageId, {
          content: '',
          loading: false,
          error: jobError || 'AI processing failed',
        });
        chatStore.setError(jobError || 'AI processing failed');
        return null;
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
    return null;
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

      const request: SendMessageRequest = {
        message,
        context,
        ...(conversationId.value ? { conversationId: conversationId.value } : {}),
      };

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

  const getOperationHistory = async (limit: number = 50): Promise<AIOperation[] | null> => {
    try {
      const response = await api.get<AIOperation[]>(`/ai-chat/history?limit=${limit}`);
      return response.success ? response.data : null;
    } catch (error: any) {
      console.error('Error fetching operation history:', error);
      return null;
    }
  };

  const checkHealth = async () => {
    try {
      const response = await api.get<{ aiEnabled: boolean; timestamp: string }>('/ai-chat/health');
      return response.success ? response.data : null;
    } catch (error: any) {
      console.error('Error checking AI health:', error);
      return null;
    }
  };

  const confirmAction = async (confirmationId: string, messageId: string) => {
    try {
      const response = await api.post<{ toolName: string; success: boolean; result?: any; error?: string }>(
        `/ai-chat/confirm/${confirmationId}`, {}
      );

      // Update the message's toolCalls to reflect the confirmed result
      const msg = chatStore.messages.find(m => m.id === messageId);
      if (msg && msg.toolCalls) {
        msg.toolCalls = msg.toolCalls.map(tc =>
          tc.confirmationId === confirmationId
            ? { ...tc, needsConfirmation: false, success: response.data?.success ?? response.success, result: response.data?.result, error: response.data?.error }
            : tc
        );
        chatStore.updateMessage(messageId, { toolCalls: msg.toolCalls });
      }

      return { success: response.data?.success ?? response.success, result: response.data };
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to confirm action' };
    }
  };

  const rejectAction = async (confirmationId: string, messageId: string) => {
    try {
      await api.post(`/ai-chat/reject/${confirmationId}`, {});

      // Update the message's toolCalls to reflect the rejected result
      const msg = chatStore.messages.find(m => m.id === messageId);
      if (msg && msg.toolCalls) {
        msg.toolCalls = msg.toolCalls.map(tc =>
          tc.confirmationId === confirmationId
            ? { ...tc, needsConfirmation: false, success: false, error: 'Action cancelled' }
            : tc
        );
        chatStore.updateMessage(messageId, { toolCalls: msg.toolCalls });
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to reject action' };
    }
  };

  const rollbackOperation = async (operationId: number, messageId?: string) => {
    try {
      const response = await api.post<{ toolName: string; success: boolean; result?: any; error?: string }>(
        `/ai-chat/rollback/${operationId}`, {}
      );

      // If messageId provided, update the tool call to show rolled back status
      if (messageId) {
        const msg = chatStore.messages.find(m => m.id === messageId);
        if (msg && msg.toolCalls) {
          msg.toolCalls = msg.toolCalls.map(tc =>
            tc.operationId === operationId
              ? { ...tc, success: false, error: 'Undone' }
              : tc
          );
          chatStore.updateMessage(messageId, { toolCalls: msg.toolCalls });
        }
      }

      return { success: response.data?.success ?? response.success, result: response.data };
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to rollback operation' };
    }
  };

  const getContentVersions = async (contentId: number): Promise<ContentVersion[] | null> => {
    try {
      const response = await api.get<ContentVersion[]>(`/ai-chat/content/${contentId}/versions`);
      return response.success ? response.data : null;
    } catch (error: any) {
      console.error('Error fetching content versions:', error);
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
    conversationId,

    // Actions
    sendMessage,
    confirmAction,
    rejectAction,
    rollbackOperation,
    getContentVersions,
    getUsage,
    getOperationHistory,
    checkHealth,
    resetChat,
  };
};
