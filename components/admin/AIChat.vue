<template>
  <div class="ai-chat-container">
    <!-- Chat Header -->
    <div class="chat-header">
      <div class="header-left">
        <span :class="['health-dot', aiHealthy === true ? 'healthy' : aiHealthy === false ? 'unhealthy' : 'unknown']" v-tooltip="aiHealthy ? 'AI service online' : 'AI service unavailable'"></span>
        <h3>AI Assistant</h3>
        <Tag
          v-if="usageInfo"
          :value="`${usageInfo.remaining_questions}/${usageInfo.daily_limit} questions`"
          :severity="usageInfo.remaining_questions <= 2 ? 'danger' : 'success'"
        />
      </div>
      <div class="header-right">
        <Button
          icon="pi pi-history"
          class="p-button-text"
          v-tooltip="'Operation history'"
          @click="toggleHistory"
          :badge="historyItems.length > 0 ? String(historyItems.length) : undefined"
          badgeSeverity="info"
        />
        <Button
          icon="pi pi-refresh"
          class="p-button-text"
          v-tooltip="'Reset conversation'"
          @click="handleReset"
          :disabled="loading"
        />
      </div>
    </div>

    <!-- Operation History Panel -->
    <div v-if="showHistory" class="history-panel">
      <div class="history-header">
        <span class="history-title"><i class="pi pi-history"></i> Recent Operations</span>
        <Button icon="pi pi-times" class="p-button-text p-button-sm" @click="showHistory = false" />
      </div>
      <div class="history-list">
        <div v-if="historyLoading" class="history-empty">
          <ProgressSpinner style="width: 20px; height: 20px" strokeWidth="4" />
          <span>Loading...</span>
        </div>
        <div v-else-if="historyItems.length === 0" class="history-empty">
          No operations yet
        </div>
        <div
          v-for="op in historyItems"
          :key="op.id"
          class="history-item"
        >
          <div class="history-item-left">
            <i :class="['pi', getOperationIcon(op.operation_type)]" :style="{ color: getOperationColor(op.operation_type) }"></i>
            <div class="history-item-info">
              <span class="history-item-desc">{{ formatOperationDescription(op) }}</span>
              <span class="history-item-time">{{ formatOperationTime(op.created_at) }}</span>
            </div>
          </div>
          <div class="history-item-right">
            <Tag
              :value="op.status"
              :severity="getStatusSeverity(op.status)"
              style="font-size: 0.7rem"
            />
            <Button
              v-if="isRollbackable(op)"
              icon="pi pi-undo"
              class="p-button-text p-button-sm"
              v-tooltip="'Undo this operation'"
              :loading="rollingBack[op.id]"
              @click="handleRollback(op.id)"
              severity="warning"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- AI Unavailable Warning -->
    <Message v-if="aiHealthy === false" severity="error" :closable="false">
      <strong>AI service is currently unavailable.</strong> Please try again later.
    </Message>

    <!-- Messages Container -->
    <div class="messages-container" ref="messagesContainer">
      <div v-if="!hasMessages" class="empty-state">
        <i class="pi pi-android" style="font-size: 3rem; color: #6366f1;"></i>
        <h4>Ask AI anything about your website</h4>
        <div class="ai-capabilities">
          <div class="capability-group">
            <div class="capability-title"><i class="pi pi-bolt"></i> Quick Setup</div>
            <ul class="suggestions">
              <li @click="useSuggestion('Create a fresh website for my business')">"Create a fresh website for my business"</li>
              <li @click="useSuggestion('Apply a portfolio template to my site')">"Apply a portfolio template to my site"</li>
            </ul>
          </div>
          <div class="capability-group">
            <div class="capability-title"><i class="pi pi-palette"></i> Themes & Layout</div>
            <ul class="suggestions">
              <li @click="useSuggestion('Change my theme to purple')">"Change my theme to purple"</li>
              <li @click="useSuggestion('Switch to magazine layout')">"Switch to magazine layout"</li>
              <li @click="useSuggestion('Move the logo to the left and menu to the top')">"Move the logo to the left and menu to the top"</li>
            </ul>
          </div>
          <div class="capability-group">
            <div class="capability-title"><i class="pi pi-file"></i> Content & Articles</div>
            <ul class="suggestions">
              <li @click="useSuggestion('Create a new article about our services')">"Create a new article about our services"</li>
              <li @click="useSuggestion('Update my home page content')">"Update my home page content"</li>
              <li @click="useSuggestion('Create a new page called Team')">"Create a new page called Team"</li>
            </ul>
          </div>
          <div class="capability-group">
            <div class="capability-title"><i class="pi pi-bars"></i> Menu Management</div>
            <ul class="suggestions">
              <li @click="useSuggestion('Add a Services menu item')">"Add a Services menu item"</li>
              <li @click="useSuggestion('Reorder my menu items')">"Reorder my menu items"</li>
              <li @click="useSuggestion('Delete the Contact Us menu')">"Delete the Contact Us menu"</li>
            </ul>
          </div>
          <div class="capability-group">
            <div class="capability-title"><i class="pi pi-image"></i> Banners & News</div>
            <ul class="suggestions">
              <li @click="useSuggestion('Create a news article about our latest product launch')">"Create a news article about our latest product launch"</li>
              <li @click="useSuggestion('Change the banner display style')">"Change the banner display style"</li>
            </ul>
          </div>
          <div class="capability-group">
            <div class="capability-title"><i class="pi pi-search"></i> SEO</div>
            <ul class="suggestions">
              <li @click="useSuggestion('Generate SEO keywords for my content')">"Generate SEO keywords for my content"</li>
              <li @click="useSuggestion('Update SEO metadata for my home page')">"Update SEO metadata for my home page"</li>
            </ul>
          </div>
        </div>
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

        <div
          v-if="message.role === 'assistant'"
          class="message-content markdown-body"
          v-html="renderMarkdown(message.content)"
        ></div>
        <div v-else class="message-content">
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
            :class="['tool-call', (tool.needsConfirmation || tool.needsInput) ? 'pending' : (tool.success ? 'success' : 'error')]"
          >
            <div class="tool-call-top">
              <div class="tool-name">
                <i :class="['pi', getToolIcon(tool.toolName)]"></i>
                {{ formatToolName(tool.toolName) }}
              </div>
              <!-- Undo button for successful create/update operations -->
              <Button
                v-if="tool.success && canRollbackTool(tool.toolName)"
                icon="pi pi-undo"
                label="Undo"
                class="p-button-text p-button-sm"
                severity="warning"
                size="small"
                v-tooltip="'Undo this action'"
                @click="handleToolRollback(tool, message.id)"
              />
            </div>

            <!-- Confirmation UI -->
            <div v-if="tool.needsConfirmation" class="tool-confirmation">
              <div class="confirmation-preview">
                <i class="pi pi-exclamation-triangle"></i>
                {{ tool.confirmationPreview }}
              </div>
              <div class="confirmation-actions">
                <Button
                  label="Confirm"
                  icon="pi pi-check"
                  severity="danger"
                  size="small"
                  :loading="confirming[tool.confirmationId!]"
                  @click="handleConfirm(tool.confirmationId!, message.id)"
                />
                <Button
                  label="Cancel"
                  icon="pi pi-times"
                  severity="secondary"
                  size="small"
                  outlined
                  @click="handleReject(tool.confirmationId!, message.id)"
                />
              </div>
            </div>

            <!-- Input Request UI (e.g. choose which news section the item belongs to) -->
            <div v-else-if="tool.needsInput" class="tool-input">
              <div class="input-prompt">
                <i class="pi pi-question-circle"></i>
                {{ tool.inputPrompt || 'Please choose an option to continue' }}
              </div>
              <div class="input-actions">
                <Dropdown
                  v-model="inputSelections[tool.inputId]"
                  :options="tool.options"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Select a news section…"
                  class="tool-select"
                />
                <Button
                  label="Submit"
                  icon="pi pi-check"
                  severity="primary"
                  size="small"
                  :loading="responding[tool.inputId]"
                  :disabled="inputSelections[tool.inputId] === undefined || inputSelections[tool.inputId] === null"
                  @click="handleRespond(tool, message.id)"
                />
              </div>
            </div>

            <!-- Success result -->
            <div v-else-if="tool.success" class="tool-result">
              {{ formatToolResult(tool) }}
            </div>

            <!-- Categorized error display -->
            <div v-else-if="tool.error" :class="['tool-error', getErrorCategory(tool.error)]">
              <i :class="['pi', getErrorIcon(tool.error)]"></i>
              <span>{{ tool.error }}</span>
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
          :disabled="loading || isLimitReached || aiHealthy === false"
          :autoResize="true"
          rows="3"
          @keydown.ctrl.enter="handleSendMessage"
        />
        <div class="input-footer">
          <span class="input-hint">Ctrl + Enter to send</span>
          <Button
            icon="pi pi-send"
            @click="handleSendMessage"
            :disabled="!canSendMessage || !userInput.trim() || aiHealthy === false"
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
import { ref, onMounted, nextTick, watch } from 'vue';
import { useAIChat } from '~/composables/useAIChat';
import { useMarkdown } from '~/composables/useMarkdown';
import type { AIOperation } from '~/types/ai';

const {
  sendMessage, confirmAction, rejectAction, respondToInput, rollbackOperation,
  getOperationHistory, checkHealth, getUsage, resetChat,
  loading, error, messages, hasMessages, usageInfo,
  canSendMessage, isLimitReached,
} = useAIChat();

const { renderMarkdown } = useMarkdown();

const userInput = ref('');
const messagesContainer = ref<HTMLElement | null>(null);
const confirming = ref<Record<string, boolean>>({});
const rollingBack = ref<Record<number, boolean>>({});
// Pending AI input requests: selected value + submitting state, keyed by inputId
const inputSelections = ref<Record<string, number | undefined>>({});
const responding = ref<Record<string, boolean>>({});

// Health status: true = online, false = offline, null = unknown
const aiHealthy = ref<boolean | null>(null);

// Operation history
const showHistory = ref(false);
const historyItems = ref<AIOperation[]>([]);
const historyLoading = ref(false);

const useSuggestion = (text: string) => {
  userInput.value = text;
};

onMounted(async () => {
  // Check AI health and usage in parallel
  const [healthResult] = await Promise.all([
    checkHealth(),
    getUsage(),
  ]);
  aiHealthy.value = healthResult?.aiEnabled ?? false;
});

// Auto-scroll to bottom when messages change
watch(messages, async () => {
  await nextTick();
  scrollToBottom();
}, { deep: true });

const handleSendMessage = async () => {
  if (!userInput.value.trim() || !canSendMessage.value) {
    return;
  }

  const message = userInput.value.trim();
  userInput.value = '';

  await sendMessage(message);
};

const handleReset = () => {
  if (confirm('Are you sure you want to reset the conversation?')) {
    resetChat();
  }
};

const handleConfirm = async (confirmationId: string, messageId: string) => {
  confirming.value[confirmationId] = true;
  await confirmAction(confirmationId, messageId);
  confirming.value[confirmationId] = false;
};

const handleReject = async (confirmationId: string, messageId: string) => {
  await rejectAction(confirmationId, messageId);
};

const handleRespond = async (tool: any, messageId: string) => {
  const inputId = tool.inputId;
  if (!inputId) return;
  const value = inputSelections.value[inputId];
  if (value === undefined || value === null) return;
  responding.value[inputId] = true;
  await respondToInput(inputId, value, messageId);
  responding.value[inputId] = false;
};

const handleRollback = async (operationId: number) => {
  rollingBack.value[operationId] = true;
  const result = await rollbackOperation(operationId);
  rollingBack.value[operationId] = false;
  if (result.success) {
    // Refresh history
    await loadHistory();
  }
};

const handleToolRollback = async (tool: any, messageId: string) => {
  // For tool calls without a known operationId, we'll find it from history
  // The backend logs operations, so we can look up the most recent matching operation
  const history = await getOperationHistory(20);
  if (!history) return;

  // Find the most recent completed operation matching this tool
  const match = history.find(op =>
    op.status === 'completed' &&
    op.operation_data?.toolName === tool.toolName &&
    !['rolled_back'].includes(op.status)
  );

  if (match) {
    rollingBack.value[match.id] = true;
    const result = await rollbackOperation(match.id, messageId);
    rollingBack.value[match.id] = false;
    if (result.success) {
      await loadHistory();
    }
  }
};

const toggleHistory = async () => {
  showHistory.value = !showHistory.value;
  if (showHistory.value) {
    await loadHistory();
  }
};

const loadHistory = async () => {
  historyLoading.value = true;
  const data = await getOperationHistory(30);
  historyItems.value = data || [];
  historyLoading.value = false;
};

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// ── Formatting helpers ──

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

const getToolIcon = (toolName: string): string => {
  if (toolName.includes('theme')) return 'pi-palette';
  if (toolName.includes('layout')) return 'pi-th-large';
  if (toolName.includes('logo')) return 'pi-image';
  if (toolName.includes('menu')) return 'pi-bars';
  if (toolName.includes('article') || toolName.includes('content')) return 'pi-file';
  if (toolName.includes('news')) return 'pi pi-newspaper';
  if (toolName.includes('banner')) return 'pi pi-image';
  if (toolName.includes('seo')) return 'pi pi-search';
  if (toolName.includes('setup') || toolName.includes('template')) return 'pi pi-bolt';
  if (toolName.includes('delete')) return 'pi pi-trash';
  if (toolName.includes('rollback')) return 'pi pi-undo';
  return 'pi pi-cog';
};

const canRollbackTool = (toolName: string): boolean => {
  return ['create_article', 'create_menu_with_content', 'create_menu_item',
          'create_news', 'create_banner', 'update_article', 'update_menu_item',
          'update_theme', 'update_layout', 'update_logo_position', 'update_menu_position'].includes(toolName);
};

// ── Error categorization ──

type ErrorCategory = 'permission' | 'notfound' | 'sizelimit' | 'ratelimit' | 'quality' | 'generic';

const getErrorCategory = (errorMsg: string): ErrorCategory => {
  if (!errorMsg) return 'generic';
  const lower = errorMsg.toLowerCase();
  if (lower.includes('admin') || lower.includes('privilege') || lower.includes('permission') || lower.includes('access denied')) return 'permission';
  if (lower.includes('not found') || lower.includes('not exist')) return 'notfound';
  if (lower.includes('too large') || lower.includes('maximum allowed') || lower.includes('exceeds max')) return 'sizelimit';
  if (lower.includes('limit') || lower.includes('daily') || lower.includes('too many')) return 'ratelimit';
  if (lower.includes('too short') || lower.includes('no visible text') || lower.includes('empty')) return 'quality';
  return 'generic';
};

const getErrorIcon = (errorMsg: string): string => {
  const cat = getErrorCategory(errorMsg);
  switch (cat) {
    case 'permission': return 'pi pi-lock';
    case 'notfound': return 'pi pi-eye-slash';
    case 'sizelimit': return 'pi pi-file';
    case 'ratelimit': return 'pi pi-clock';
    case 'quality': return 'pi pi-exclamation-circle';
    default: return 'pi pi-times-circle';
  }
};

// ── Operation history helpers ──

const getOperationIcon = (type: string): string => {
  switch (type) {
    case 'create': return 'pi pi-plus-circle';
    case 'update': return 'pi pi-pencil';
    case 'delete': return 'pi pi-trash';
    case 'ui_change': return 'pi pi-palette';
    case 'conversation': return 'pi pi-comment';
    default: return 'pi pi-cog';
  }
};

const getOperationColor = (type: string): string => {
  switch (type) {
    case 'create': return '#059669';
    case 'update': return '#2563eb';
    case 'delete': return '#dc2626';
    case 'ui_change': return '#7c3aed';
    case 'conversation': return '#6b7280';
    default: return '#6b7280';
  }
};

const getStatusSeverity = (status: string): 'success' | 'warning' | 'danger' | 'info' => {
  switch (status) {
    case 'completed': return 'success';
    case 'pending': return 'info';
    case 'failed': return 'danger';
    case 'rolled_back': return 'warning';
    default: return 'info';
  }
};

const isRollbackable = (op: AIOperation): boolean => {
  return op.status === 'completed' && ['create', 'update'].includes(op.operation_type);
};

const formatOperationDescription = (op: AIOperation): string => {
  const toolName = op.operation_data?.toolName;
  const args = op.operation_data?.args;

  if (toolName) {
    const name = formatToolName(toolName);
    // Add target detail
    if (args?.title) return `${name}: ${args.title}`;
    if (args?.itemName || args?.menuName) return `${name}: ${args.itemName || args.menuName}`;
    if (args?.itemId) return `${name} #${args.itemId}`;
    if (args?.contentId) return `${name} #${args.contentId}`;
    if (args?.bannerId) return `${name} #${args.bannerId}`;
    return name;
  }

  // Fallback for conversation logs or generic entries
  const typeLabel = op.operation_type.charAt(0).toUpperCase() + op.operation_type.slice(1);
  const targetLabel = op.target_type ? ` ${op.target_type}` : '';
  return `${typeLabel}${targetLabel}`;
};

const formatOperationTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
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

.header-right {
  display: flex;
  gap: 0.25rem;
}

/* Health indicator dot */
.health-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
}
.health-dot.healthy {
  background: #22c55e;
  box-shadow: 0 0 4px #22c55e80;
}
.health-dot.unhealthy {
  background: #ef4444;
  box-shadow: 0 0 4px #ef444480;
}
.health-dot.unknown {
  background: #9ca3af;
}

/* Operation History Panel */
.history-panel {
  flex-shrink: 0;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
  max-height: 300px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.history-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.history-list {
  overflow-y: auto;
  padding: 0.5rem;
}

.history-empty {
  text-align: center;
  padding: 1rem;
  color: #9ca3af;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}
.history-item:hover {
  background: #e5e7eb;
}

.history-item-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.history-item-left > i {
  flex-shrink: 0;
  font-size: 0.85rem;
}

.history-item-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.history-item-desc {
  color: #1f2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-item-time {
  color: #9ca3af;
  font-size: 0.7rem;
}

.history-item-right {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
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
  padding: 2rem 1rem;
  color: #6b7280;
}

.empty-state h4 {
  margin: 0.75rem 0 1rem 0;
  color: #374151;
}

.ai-capabilities {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  text-align: left;
  max-height: 400px;
  overflow-y: auto;
  padding: 0 0.5rem;
}

.capability-group {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.75rem;
}

.capability-title {
  font-weight: 600;
  font-size: 0.8rem;
  color: #4b5563;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.capability-title i {
  color: #6366f1;
  font-size: 0.85rem;
}

.suggestions {
  list-style: none;
  padding: 0;
  margin: 0;
}

.suggestions li {
  padding: 0.3rem 0;
  color: #6366f1;
  font-size: 0.8rem;
  cursor: pointer;
  line-height: 1.4;
}

.suggestions li:hover {
  text-decoration: underline;
  color: #4f46e5;
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

/* Markdown rendering for assistant replies (v-html injected, so use :deep) */
.message.assistant .message-content.markdown-body {
  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.message.assistant .markdown-body :deep(p) {
  margin: 0 0 0.5rem;
}

.message.assistant .markdown-body :deep(p:last-child) {
  margin-bottom: 0;
}

.message.assistant .markdown-body :deep(h3) {
  font-size: 1rem;
  font-weight: 600;
  margin: 0.5rem 0 0.35rem;
  line-height: 1.3;
}

.message.assistant .markdown-body :deep(ul),
.message.assistant .markdown-body :deep(ol) {
  margin: 0.25rem 0 0.5rem;
  padding-left: 1.25rem;
}

.message.assistant .markdown-body :deep(li) {
  margin: 0.15rem 0;
}

.message.assistant .markdown-body :deep(strong) {
  font-weight: 600;
}

.message.assistant .markdown-body :deep(em) {
  font-style: italic;
}

.message.assistant .markdown-body :deep(code) {
  background: rgba(0, 0, 0, 0.06);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  font-size: 0.85em;
}

.message.assistant .markdown-body :deep(pre) {
  background: rgba(0, 0, 0, 0.06);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 0.25rem 0 0.5rem;
}

.message.assistant .markdown-body :deep(pre code) {
  background: none;
  padding: 0;
}

.message.assistant .markdown-body :deep(blockquote) {
  border-left: 3px solid #cbd5e1;
  margin: 0.25rem 0 0.5rem;
  padding: 0.1rem 0 0.1rem 0.75rem;
  color: #4b5563;
}

.message.assistant .markdown-body :deep(a) {
  color: #4f46e5;
  text-decoration: underline;
  word-break: break-all;
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

.tool-call-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tool-call.success {
  background: #d1fae5;
  color: #065f46;
}

.tool-call.error {
  background: #fee2e2;
  color: #991b1b;
}

.tool-call.pending {
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #f59e0b;
}

.tool-confirmation {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.confirmation-preview {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  font-size: 0.85rem;
  line-height: 1.4;
}

.confirmation-preview i {
  margin-top: 2px;
  flex-shrink: 0;
}

.confirmation-actions {
  display: flex;
  gap: 0.5rem;
}

.tool-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.input-prompt {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  font-size: 0.85rem;
  line-height: 1.4;
}

.input-prompt i {
  margin-top: 2px;
  flex-shrink: 0;
}

.input-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.tool-select {
  flex: 1;
  min-width: 0;
}

.tool-name {
  font-weight: 500;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.tool-name i {
  font-size: 0.8rem;
}

/* Categorized error styles */
.tool-error {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  margin-top: 0.25rem;
}
.tool-error i {
  margin-top: 2px;
  flex-shrink: 0;
}
.tool-error.permission {
  color: #991b1b;
}
.tool-error.notfound {
  color: #9a3412;
}
.tool-error.sizelimit,
.tool-error.ratelimit,
.tool-error.quality {
  color: #92400e;
}
.tool-error.generic {
  color: #991b1b;
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
