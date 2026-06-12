import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { ToolCallResult, UsageInfo } from '~/types/ai';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  toolCalls?: ToolCallResult[];
  loading?: boolean;
  error?: string;
  operationIds?: number[];
}

export const useAIChatStore = defineStore('aiChat', () => {
  // State
  const messages = ref<ChatMessage[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const usageInfo = ref<UsageInfo | null>(null);
  const conversationId = ref<number | null>(null);

  // Computed
  const hasMessages = computed(() => messages.value.length > 0);
  const remainingQuestions = computed(() => usageInfo.value?.remaining_questions ?? 10);
  const canSendMessage = computed(() => remainingQuestions.value > 0 && !loading.value);
  const isLimitReached = computed(() => remainingQuestions.value === 0);

  // Actions
  function addMessage(message: Omit<ChatMessage, 'id' | 'timestamp'>) {
    const newMessage: ChatMessage = {
      ...message,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    };
    messages.value.push(newMessage);
    return newMessage.id;
  }

  function updateMessage(id: string, updates: Partial<ChatMessage>) {
    const index = messages.value.findIndex(m => m.id === id);
    if (index !== -1) {
      messages.value[index] = { ...messages.value[index], ...updates };
    }
  }

  function removeMessage(id: string) {
    const index = messages.value.findIndex(m => m.id === id);
    if (index !== -1) {
      messages.value.splice(index, 1);
    }
  }

  function clearMessages() {
    messages.value = [];
  }

  function setLoading(val: boolean) {
    loading.value = val;
  }

  function setError(val: string | null) {
    error.value = val;
  }

  function setUsageInfo(val: UsageInfo) {
    usageInfo.value = val;
  }

  function setConversationId(val: number | null) {
    conversationId.value = val;
  }

  function resetConversation() {
    clearMessages();
    conversationId.value = null;
    error.value = null;
  }

  // Get last assistant message
  const lastAssistantMessage = computed(() => {
    const assistantMessages = messages.value.filter(m => m.role === 'assistant');
    return assistantMessages[assistantMessages.length - 1] || null;
  });

  // Get loading state for last message
  const lastMessageLoading = computed(() => {
    if (messages.value.length === 0) return false;
    return messages.value[messages.value.length - 1].loading || false;
  });

  return {
    // State
    messages,
    loading,
    error,
    usageInfo,
    conversationId,

    // Computed
    hasMessages,
    remainingQuestions,
    canSendMessage,
    isLimitReached,
    lastAssistantMessage,
    lastMessageLoading,

    // Actions
    addMessage,
    updateMessage,
    removeMessage,
    clearMessages,
    setLoading,
    setError,
    setUsageInfo,
    setConversationId,
    resetConversation,
  };
});
