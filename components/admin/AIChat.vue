<template>
  <div class="ai-chat-container">
    <!-- Chat Header -->
    <div class="chat-header">
      <div class="header-left">
        <h3>AI Assistant</h3>
        <Tag
          v-if="usageInfo"
          :value="`${usageInfo.remaining_questions}/${usageInfo.daily_limit} questions`"
          :severity="usageInfo.remaining_questions <= 2 ? 'danger' : 'success'"
        />
      </div>
      <div class="header-right">
        <Button
          icon="pi pi-refresh"
          class="p-button-text"
          v-tooltip="'Reset conversation'"
          @click="handleReset"
          :disabled="loading"
        />
      </div>
    </div>

    <!-- Messages Container -->
    <div class="messages-container" ref="messagesContainer">
      <div v-if="!hasMessages" class="empty-state">
        <i class="pi pi-android" style="font-size: 3rem; color: #6366f1;"></i>
        <h4>Ask AI anything about your website</h4>
        <p>Try:</p>
        <ul class="suggestions">
          <li>"Change my theme to purple"</li>
          <li>"Create a news article about..."</li>
          <li>"Update my menu structure"</li>
          <li>"Generate SEO keywords for my content"</li>
        </ul>
      </div>

      <div
        v-for="message in messages"
        :key="message.id"
        :class="['message', message.role]"
      >
        <div class="message-header">
          <span class="message-role">
            {{ message.role === 'user' ? 'You' : 'AI Assistant' }}
          </span>
          <span class="message-time">
            {{ formatTime(message.timestamp) }}
          </span>
        </div>

        <div class="message-content">
          {{ message.content }}
        </div>

        <!-- Tool Calls Results -->
        <div v-if="message.toolCalls && message.toolCalls.length > 0" class="tool-calls">
          <div class="tool-calls-header">
            <i class="pi pi-cog"></i>
            Actions performed:
          </div>
          <div
            v-for="(tool, index) in message.toolCalls"
            :key="index"
            :class="['tool-call', tool.success ? 'success' : 'error']"
          >
            <div class="tool-name">{{ formatToolName(tool.toolName) }}</div>
            <div v-if="tool.success" class="tool-result">
              {{ formatToolResult(tool) }}
            </div>
            <div v-else class="tool-error">
              {{ tool.error }}
            </div>
          </div>
        </div>

        <!-- Loading Indicator -->
        <div v-if="message.loading" class="message-loading">
          <ProgressSpinner style="width: 20px; height: 20px" strokeWidth="4" />
          <span>AI is thinking...</span>
        </div>
      </div>
    </div>

    <!-- Error Display -->
    <Message v-if="error" severity="error" :closable="true" @close="error = null">
      {{ error }}
    </Message>

    <!-- Rate Limit Warning -->
    <Message v-if="isLimitReached" severity="warn" :closable="false">
      You've reached your daily limit of 10 questions. Come back tomorrow or upgrade your plan.
    </Message>

    <!-- Input Area -->
    <div class="input-area">
      <div class="input-wrapper">
        <Textarea
          v-model="userInput"
          placeholder="Ask AI to modify your website..."
          :disabled="loading || isLimitReached"
          :autoResize="true"
          rows="3"
          @keydown.ctrl.enter="handleSendMessage"
        />
        <div class="input-footer">
          <span class="input-hint">Ctrl + Enter to send</span>
          <Button
            icon="pi pi-send"
            @click="handleSendMessage"
            :disabled="!canSendMessage || !userInput.trim()"
            :loading="loading"
            severity="primary"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import { useAIChat } from '~/composables/useAIChat';
import { useAuthStore } from '~/stores/auth';

const { sendMessage, loading, error, messages, hasMessages, usageInfo, canSendMessage, isLimitReached, remainingQuestions, getUsage, resetChat } = useAIChat();
const authStore = useAuthStore();

const userInput = ref('');
const messagesContainer = ref<HTMLElement | null>(null);

onMounted(async () => {
  await getUsage();
});

// Auto-scroll to bottom when messages change
watch(messages, async () => {
  await nextTick();
  scrollToBottom();
}, { deep: true });

const handleSendMessage = async () => {
  if (!userInput.value.trim() || !canSendMessage.value) {
    console.log('Send blocked:', {
      hasInput: !!userInput.value.trim(),
      canSendMessage: canSendMessage.value,
      loading: loading.value,
      remainingQuestions: remainingQuestions.value
    });
    return;
  }

  const message = userInput.value.trim();
  userInput.value = '';

  console.log('Sending message to AI:', message);
  const result = await sendMessage(message, {
    langId: authStore.user?.lang_id,
  });
  console.log('AI response:', result);
};

const handleReset = () => {
  if (confirm('Are you sure you want to reset the conversation?')) {
    resetChat();
  }
};

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatToolName = (toolName: string) => {
  return toolName
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const formatToolResult = (tool: any) => {
  if (tool.result) {
    if (tool.result.title) return `Created: ${tool.result.title}`;
    if (tool.result.updated !== undefined) return 'Updated successfully';
    if (tool.result.deleted !== undefined) return 'Deleted successfully';
    if (tool.result.created !== undefined) return 'Created successfully';
    return 'Completed';
  }
  return 'Completed';
};
</script>

<style scoped>
.ai-chat-container {
  display: flex;
  flex-direction: column;
  height: 80%;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.chat-header {
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header-left h3 {
  margin: 0;
  font-size: 1.125rem;
  color: #1f2937;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
}

.empty-state h4 {
  margin: 1rem 0 0.5rem 0;
  color: #374151;
}

.suggestions {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
  text-align: left;
  display: inline-block;
}

.suggestions li {
  padding: 0.25rem 0;
  color: #6366f1;
  cursor: pointer;
}

.suggestions li:hover {
  text-decoration: underline;
}

.message {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 80%;
}

.message.user {
  align-self: flex-end;
}

.message.assistant {
  align-self: flex-start;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.message-role {
  font-weight: 500;
}

.message-content {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  line-height: 1.5;
}

.message.user .message-content {
  background: #6366f1;
  color: white;
}

.message.assistant .message-content {
  background: #f3f4f6;
  color: #1f2937;
}

.tool-calls {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.tool-calls-header {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.tool-call {
  padding: 0.5rem;
  border-radius: 4px;
  margin-top: 0.25rem;
  font-size: 0.875rem;
}

.tool-call.success {
  background: #d1fae5;
  color: #065f46;
}

.tool-call.error {
  background: #fee2e2;
  color: #991b1b;
}

.tool-name {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.message-loading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.input-area {
  flex-shrink: 0;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.input-hint {
  font-size: 0.875rem;
  color: #6b7280;
}

@media (max-width: 768px) {
  .message {
    max-width: 95%;
  }
}
</style>
