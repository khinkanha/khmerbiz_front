import { defineComponent, computed, mergeProps, ref, watch, nextTick, resolveComponent, resolveDirective, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc, s as storeToRefs, f as defineStore } from './server.mjs';
import { u as useApi } from './auth-CZZkTxj2.mjs';
import { marked } from 'marked';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@primeuix/themes/aura/accordion';
import '@primeuix/themes/aura/autocomplete';
import '@primeuix/themes/aura/avatar';
import '@primeuix/themes/aura/badge';
import '@primeuix/themes/aura/base';
import '@primeuix/themes/aura/blockui';
import '@primeuix/themes/aura/breadcrumb';
import '@primeuix/themes/aura/button';
import '@primeuix/themes/aura/card';
import '@primeuix/themes/aura/carousel';
import '@primeuix/themes/aura/cascadeselect';
import '@primeuix/themes/aura/checkbox';
import '@primeuix/themes/aura/chip';
import '@primeuix/themes/aura/colorpicker';
import '@primeuix/themes/aura/confirmdialog';
import '@primeuix/themes/aura/confirmpopup';
import '@primeuix/themes/aura/contextmenu';
import '@primeuix/themes/aura/datatable';
import '@primeuix/themes/aura/dataview';
import '@primeuix/themes/aura/datepicker';
import '@primeuix/themes/aura/dialog';
import '@primeuix/themes/aura/divider';
import '@primeuix/themes/aura/dock';
import '@primeuix/themes/aura/drawer';
import '@primeuix/themes/aura/editor';
import '@primeuix/themes/aura/fieldset';
import '@primeuix/themes/aura/fileupload';
import '@primeuix/themes/aura/floatlabel';
import '@primeuix/themes/aura/galleria';
import '@primeuix/themes/aura/iconfield';
import '@primeuix/themes/aura/iftalabel';
import '@primeuix/themes/aura/image';
import '@primeuix/themes/aura/imagecompare';
import '@primeuix/themes/aura/inlinemessage';
import '@primeuix/themes/aura/inplace';
import '@primeuix/themes/aura/inputchips';
import '@primeuix/themes/aura/inputgroup';
import '@primeuix/themes/aura/inputnumber';
import '@primeuix/themes/aura/inputotp';
import '@primeuix/themes/aura/inputtext';
import '@primeuix/themes/aura/knob';
import '@primeuix/themes/aura/listbox';
import '@primeuix/themes/aura/megamenu';
import '@primeuix/themes/aura/menu';
import '@primeuix/themes/aura/menubar';
import '@primeuix/themes/aura/message';
import '@primeuix/themes/aura/metergroup';
import '@primeuix/themes/aura/multiselect';
import '@primeuix/themes/aura/orderlist';
import '@primeuix/themes/aura/organizationchart';
import '@primeuix/themes/aura/overlaybadge';
import '@primeuix/themes/aura/paginator';
import '@primeuix/themes/aura/panel';
import '@primeuix/themes/aura/panelmenu';
import '@primeuix/themes/aura/password';
import '@primeuix/themes/aura/picklist';
import '@primeuix/themes/aura/popover';
import '@primeuix/themes/aura/progressbar';
import '@primeuix/themes/aura/progressspinner';
import '@primeuix/themes/aura/radiobutton';
import '@primeuix/themes/aura/rating';
import '@primeuix/themes/aura/ripple';
import '@primeuix/themes/aura/scrollpanel';
import '@primeuix/themes/aura/select';
import '@primeuix/themes/aura/selectbutton';
import '@primeuix/themes/aura/skeleton';
import '@primeuix/themes/aura/slider';
import '@primeuix/themes/aura/speeddial';
import '@primeuix/themes/aura/splitbutton';
import '@primeuix/themes/aura/splitter';
import '@primeuix/themes/aura/stepper';
import '@primeuix/themes/aura/steps';
import '@primeuix/themes/aura/tabmenu';
import '@primeuix/themes/aura/tabs';
import '@primeuix/themes/aura/tabview';
import '@primeuix/themes/aura/tag';
import '@primeuix/themes/aura/terminal';
import '@primeuix/themes/aura/textarea';
import '@primeuix/themes/aura/tieredmenu';
import '@primeuix/themes/aura/timeline';
import '@primeuix/themes/aura/toast';
import '@primeuix/themes/aura/togglebutton';
import '@primeuix/themes/aura/toggleswitch';
import '@primeuix/themes/aura/toolbar';
import '@primeuix/themes/aura/tooltip';
import '@primeuix/themes/aura/tree';
import '@primeuix/themes/aura/treeselect';
import '@primeuix/themes/aura/treetable';
import '@primeuix/themes/aura/virtualscroller';
import '@primeuix/utils/eventbus';
import '@primeuix/utils';
import '@primeuix/utils/object';
import '@primeuix/styled';
import '@primeuix/utils/dom';
import '@primeuix/styles/base';
import '@primeuix/styles/badge';
import '@primeuix/utils/uuid';
import '@primeuix/styles/ripple';
import '@primeuix/styles/button';
import '@primeuix/utils/zindex';
import '@primeuix/styles/inputtext';
import '@primeuix/styles/datepicker';
import '@primeuix/styles/card';
import '@primeuix/styles/carousel';
import '@primeuix/styles/checkbox';
import '@primeuix/styles/dialog';
import '@primeuix/styles/confirmdialog';
import '@primeuix/styles/paginator';
import '@primeuix/styles/iconfield';
import '@primeuix/styles/virtualscroller';
import '@primeuix/styles/select';
import '@primeuix/styles/inputnumber';
import '@primeuix/styles/datatable';
import '@primeuix/styles/radiobutton';
import '@primeuix/styles/editor';
import '@primeuix/styles/message';
import '@primeuix/styles/progressbar';
import '@primeuix/styles/fileupload';
import '@primeuix/styles/menu';
import '@primeuix/styles/password';
import '@primeuix/styles/progressspinner';
import '@primeuix/styles/slider';
import '@primeuix/styles/tag';
import '@primeuix/styles/textarea';
import '@primeuix/styles/toast';
import '@primeuix/styles/toggleswitch';

const useAIChatStore = defineStore("aiChat", () => {
  const messages = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const usageInfo = ref(null);
  const conversationId = ref(null);
  const hasMessages = computed(() => messages.value.length > 0);
  const remainingQuestions = computed(() => {
    var _a2;
    var _a;
    return (_a2 = (_a = usageInfo.value) == null ? void 0 : _a.remaining_questions) != null ? _a2 : 10;
  });
  const canSendMessage = computed(() => remainingQuestions.value > 0 && !loading.value);
  const isLimitReached = computed(() => remainingQuestions.value === 0);
  function addMessage(message) {
    const newMessage = {
      ...message,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    messages.value.push(newMessage);
    return newMessage.id;
  }
  function updateMessage(id, updates) {
    const index = messages.value.findIndex((m) => m.id === id);
    if (index !== -1) {
      messages.value[index] = { ...messages.value[index], ...updates };
    }
  }
  function removeMessage(id) {
    const index = messages.value.findIndex((m) => m.id === id);
    if (index !== -1) {
      messages.value.splice(index, 1);
    }
  }
  function clearMessages() {
    messages.value = [];
  }
  function setLoading(val) {
    loading.value = val;
  }
  function setError(val) {
    error.value = val;
  }
  function setUsageInfo(val) {
    usageInfo.value = val;
  }
  function setConversationId(val) {
    conversationId.value = val;
  }
  function resetConversation() {
    clearMessages();
    conversationId.value = null;
    error.value = null;
  }
  const lastAssistantMessage = computed(() => {
    const assistantMessages = messages.value.filter((m) => m.role === "assistant");
    return assistantMessages[assistantMessages.length - 1] || null;
  });
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
    resetConversation
  };
});
const useAIChat = () => {
  const api = useApi();
  const chatStore = useAIChatStore();
  const { messages, hasMessages, loading, error, usageInfo, remainingQuestions, canSendMessage, isLimitReached, conversationId } = storeToRefs(chatStore);
  const pollJob = async (jobId, loadingMessageId) => {
    const maxPolls = 120;
    let pollCount = 0;
    while (pollCount < maxPolls) {
      pollCount++;
      const response = await api.get(`/ai-chat/job/${jobId}`);
      if (!response.success || !response.data) {
        break;
      }
      const { jobStatus, result, error: jobError, remainingQuestions: remaining } = response.data;
      if (remaining !== void 0) {
        chatStore.setUsageInfo({
          remaining_questions: remaining,
          daily_limit: 10,
          questions_count: 10 - remaining,
          reset_at: ""
        });
      }
      if (jobStatus === "completed" && result) {
        if (result.conversationId && !conversationId.value) {
          chatStore.setConversationId(result.conversationId);
        }
        chatStore.updateMessage(loadingMessageId, {
          content: result.response,
          toolCalls: result.toolCalls,
          loading: false
        });
        return result;
      }
      if (jobStatus === "failed") {
        chatStore.updateMessage(loadingMessageId, {
          content: "",
          loading: false,
          error: jobError || "AI processing failed"
        });
        chatStore.setError(jobError || "AI processing failed");
        return null;
      }
      await new Promise((r) => setTimeout(r, 1e3));
    }
    chatStore.updateMessage(loadingMessageId, {
      content: "",
      loading: false,
      error: "Request timed out. Please try again."
    });
    chatStore.setError("Request timed out");
    return null;
  };
  const sendMessage = async (message, context) => {
    var _a;
    try {
      chatStore.setLoading(true);
      chatStore.setError(null);
      chatStore.addMessage({
        role: "user",
        content: message
      });
      const loadingMessageId = chatStore.addMessage({
        role: "assistant",
        content: "",
        loading: true
      });
      const request = {
        message,
        context,
        ...conversationId.value ? { conversationId: conversationId.value } : {}
      };
      const response = await api.post("/ai-chat/message", request);
      if (response.success && ((_a = response.data) == null ? void 0 : _a.jobId)) {
        await pollJob(response.data.jobId, loadingMessageId);
        return { success: true };
      } else {
        chatStore.removeMessage(loadingMessageId);
        const errorMessage = response.message || "Failed to send message";
        chatStore.setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error2) {
      chatStore.setLoading(false);
      const errorMessage = error2.message || "Network error";
      chatStore.setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      chatStore.setLoading(false);
    }
  };
  const getUsage = async () => {
    try {
      const response = await api.get("/ai-chat/usage");
      if (response.success && response.data && response.data.remaining_questions !== void 0) {
        chatStore.setUsageInfo(response.data);
        return response.data;
      }
    } catch (error2) {
      console.error("Error fetching usage:", error2);
    }
    return null;
  };
  const getOperationHistory = async (limit = 50) => {
    try {
      const response = await api.get(`/ai-chat/history?limit=${limit}`);
      return response.success ? response.data : null;
    } catch (error2) {
      console.error("Error fetching operation history:", error2);
      return null;
    }
  };
  const checkHealth = async () => {
    try {
      const response = await api.get("/ai-chat/health");
      return response.success ? response.data : null;
    } catch (error2) {
      console.error("Error checking AI health:", error2);
      return null;
    }
  };
  const confirmAction = async (confirmationId, messageId) => {
    var _a2;
    var _a;
    try {
      const response = await api.post(
        `/ai-chat/confirm/${confirmationId}`,
        {}
      );
      const msg = chatStore.messages.find((m) => m.id === messageId);
      if (msg && msg.toolCalls) {
        msg.toolCalls = msg.toolCalls.map(
          (tc) => {
            var _a3;
            var _a22, _b, _c;
            return tc.confirmationId === confirmationId ? { ...tc, needsConfirmation: false, success: (_a3 = (_a22 = response.data) == null ? void 0 : _a22.success) != null ? _a3 : response.success, result: (_b = response.data) == null ? void 0 : _b.result, error: (_c = response.data) == null ? void 0 : _c.error } : tc;
          }
        );
        chatStore.updateMessage(messageId, { toolCalls: msg.toolCalls });
      }
      return { success: (_a2 = (_a = response.data) == null ? void 0 : _a.success) != null ? _a2 : response.success, result: response.data };
    } catch (error2) {
      return { success: false, error: error2.message || "Failed to confirm action" };
    }
  };
  const rejectAction = async (confirmationId, messageId) => {
    try {
      await api.post(`/ai-chat/reject/${confirmationId}`, {});
      const msg = chatStore.messages.find((m) => m.id === messageId);
      if (msg && msg.toolCalls) {
        msg.toolCalls = msg.toolCalls.map(
          (tc) => tc.confirmationId === confirmationId ? { ...tc, needsConfirmation: false, success: false, error: "Action cancelled" } : tc
        );
        chatStore.updateMessage(messageId, { toolCalls: msg.toolCalls });
      }
      return { success: true };
    } catch (error2) {
      return { success: false, error: error2.message || "Failed to reject action" };
    }
  };
  const rollbackOperation = async (operationId, messageId) => {
    var _a2;
    var _a;
    try {
      const response = await api.post(
        `/ai-chat/rollback/${operationId}`,
        {}
      );
      if (messageId) {
        const msg = chatStore.messages.find((m) => m.id === messageId);
        if (msg && msg.toolCalls) {
          msg.toolCalls = msg.toolCalls.map(
            (tc) => tc.operationId === operationId ? { ...tc, success: false, error: "Undone" } : tc
          );
          chatStore.updateMessage(messageId, { toolCalls: msg.toolCalls });
        }
      }
      return { success: (_a2 = (_a = response.data) == null ? void 0 : _a.success) != null ? _a2 : response.success, result: response.data };
    } catch (error2) {
      return { success: false, error: error2.message || "Failed to rollback operation" };
    }
  };
  const getContentVersions = async (contentId) => {
    try {
      const response = await api.get(`/ai-chat/content/${contentId}/versions`);
      return response.success ? response.data : null;
    } catch (error2) {
      console.error("Error fetching content versions:", error2);
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
    resetChat
  };
};
marked.setOptions({ breaks: true, gfm: true });
const useMarkdown = () => {
  const renderMarkdown = (md) => {
    if (!md) return "";
    const rawHtml = marked.parse(md, { async: false });
    return rawHtml;
  };
  return { renderMarkdown };
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AIChat",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      sendMessage,
      confirmAction,
      rejectAction,
      rollbackOperation,
      getOperationHistory,
      resetChat,
      loading,
      error,
      messages,
      hasMessages,
      usageInfo,
      canSendMessage,
      isLimitReached
    } = useAIChat();
    const { renderMarkdown } = useMarkdown();
    const userInput = ref("");
    const messagesContainer = ref(null);
    const confirming = ref({});
    const rollingBack = ref({});
    const aiHealthy = ref(null);
    const showHistory = ref(false);
    const historyItems = ref([]);
    const historyLoading = ref(false);
    watch(messages, async () => {
      await nextTick();
      scrollToBottom();
    }, { deep: true });
    const handleSendMessage = async () => {
      if (!userInput.value.trim() || !canSendMessage.value) {
        return;
      }
      const message = userInput.value.trim();
      userInput.value = "";
      await sendMessage(message);
    };
    const handleReset = () => {
      if (confirm("Are you sure you want to reset the conversation?")) {
        resetChat();
      }
    };
    const handleConfirm = async (confirmationId, messageId) => {
      confirming.value[confirmationId] = true;
      await confirmAction(confirmationId, messageId);
      confirming.value[confirmationId] = false;
    };
    const handleReject = async (confirmationId, messageId) => {
      await rejectAction(confirmationId, messageId);
    };
    const handleRollback = async (operationId) => {
      rollingBack.value[operationId] = true;
      const result = await rollbackOperation(operationId);
      rollingBack.value[operationId] = false;
      if (result.success) {
        await loadHistory();
      }
    };
    const handleToolRollback = async (tool, messageId) => {
      const history = await getOperationHistory(20);
      if (!history) return;
      const match = history.find(
        (op) => {
          var _a;
          return op.status === "completed" && ((_a = op.operation_data) == null ? void 0 : _a.toolName) === tool.toolName && !["rolled_back"].includes(op.status);
        }
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
    const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };
    const formatToolName = (toolName) => {
      return toolName.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    };
    const formatToolResult = (tool) => {
      if (tool.result) {
        if (tool.result.title) return `Created: ${tool.result.title}`;
        if (tool.result.updated !== void 0) return "Updated successfully";
        if (tool.result.deleted !== void 0) return "Deleted successfully";
        if (tool.result.created !== void 0) return "Created successfully";
        return "Completed";
      }
      return "Completed";
    };
    const getToolIcon = (toolName) => {
      if (toolName.includes("theme")) return "pi-palette";
      if (toolName.includes("layout")) return "pi-th-large";
      if (toolName.includes("logo")) return "pi-image";
      if (toolName.includes("menu")) return "pi-bars";
      if (toolName.includes("article") || toolName.includes("content")) return "pi-file";
      if (toolName.includes("news")) return "pi pi-newspaper";
      if (toolName.includes("banner")) return "pi pi-image";
      if (toolName.includes("seo")) return "pi pi-search";
      if (toolName.includes("setup") || toolName.includes("template")) return "pi pi-bolt";
      if (toolName.includes("delete")) return "pi pi-trash";
      if (toolName.includes("rollback")) return "pi pi-undo";
      return "pi pi-cog";
    };
    const canRollbackTool = (toolName) => {
      return [
        "create_article",
        "create_menu_with_content",
        "create_menu_item",
        "create_news",
        "create_banner",
        "update_article",
        "update_menu_item",
        "update_theme",
        "update_layout",
        "update_logo_position",
        "update_menu_position"
      ].includes(toolName);
    };
    const getErrorCategory = (errorMsg) => {
      if (!errorMsg) return "generic";
      const lower = errorMsg.toLowerCase();
      if (lower.includes("admin") || lower.includes("privilege") || lower.includes("permission") || lower.includes("access denied")) return "permission";
      if (lower.includes("not found") || lower.includes("not exist")) return "notfound";
      if (lower.includes("too large") || lower.includes("maximum allowed") || lower.includes("exceeds max")) return "sizelimit";
      if (lower.includes("limit") || lower.includes("daily") || lower.includes("too many")) return "ratelimit";
      if (lower.includes("too short") || lower.includes("no visible text") || lower.includes("empty")) return "quality";
      return "generic";
    };
    const getErrorIcon = (errorMsg) => {
      const cat = getErrorCategory(errorMsg);
      switch (cat) {
        case "permission":
          return "pi pi-lock";
        case "notfound":
          return "pi pi-eye-slash";
        case "sizelimit":
          return "pi pi-file";
        case "ratelimit":
          return "pi pi-clock";
        case "quality":
          return "pi pi-exclamation-circle";
        default:
          return "pi pi-times-circle";
      }
    };
    const getOperationIcon = (type) => {
      switch (type) {
        case "create":
          return "pi pi-plus-circle";
        case "update":
          return "pi pi-pencil";
        case "delete":
          return "pi pi-trash";
        case "ui_change":
          return "pi pi-palette";
        case "conversation":
          return "pi pi-comment";
        default:
          return "pi pi-cog";
      }
    };
    const getOperationColor = (type) => {
      switch (type) {
        case "create":
          return "#059669";
        case "update":
          return "#2563eb";
        case "delete":
          return "#dc2626";
        case "ui_change":
          return "#7c3aed";
        case "conversation":
          return "#6b7280";
        default:
          return "#6b7280";
      }
    };
    const getStatusSeverity = (status) => {
      switch (status) {
        case "completed":
          return "success";
        case "pending":
          return "info";
        case "failed":
          return "danger";
        case "rolled_back":
          return "warning";
        default:
          return "info";
      }
    };
    const isRollbackable = (op) => {
      return op.status === "completed" && ["create", "update"].includes(op.operation_type);
    };
    const formatOperationDescription = (op) => {
      var _a, _b;
      const toolName = (_a = op.operation_data) == null ? void 0 : _a.toolName;
      const args = (_b = op.operation_data) == null ? void 0 : _b.args;
      if (toolName) {
        const name = formatToolName(toolName);
        if (args == null ? void 0 : args.title) return `${name}: ${args.title}`;
        if ((args == null ? void 0 : args.itemName) || (args == null ? void 0 : args.menuName)) return `${name}: ${args.itemName || args.menuName}`;
        if (args == null ? void 0 : args.itemId) return `${name} #${args.itemId}`;
        if (args == null ? void 0 : args.contentId) return `${name} #${args.contentId}`;
        if (args == null ? void 0 : args.bannerId) return `${name} #${args.bannerId}`;
        return name;
      }
      const typeLabel = op.operation_type.charAt(0).toUpperCase() + op.operation_type.slice(1);
      const targetLabel = op.target_type ? ` ${op.target_type}` : "";
      return `${typeLabel}${targetLabel}`;
    };
    const formatOperationTime = (dateStr) => {
      const date = new Date(dateStr);
      const now = /* @__PURE__ */ new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMin = Math.floor(diffMs / 6e4);
      const diffHr = Math.floor(diffMs / 36e5);
      const diffDay = Math.floor(diffMs / 864e5);
      if (diffMin < 1) return "Just now";
      if (diffMin < 60) return `${diffMin}m ago`;
      if (diffHr < 24) return `${diffHr}h ago`;
      if (diffDay < 7) return `${diffDay}d ago`;
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Tag = resolveComponent("Tag");
      const _component_Button = resolveComponent("Button");
      const _component_ProgressSpinner = resolveComponent("ProgressSpinner");
      const _component_Message = resolveComponent("Message");
      const _component_Textarea = resolveComponent("Textarea");
      const _directive_tooltip = resolveDirective("tooltip");
      let _temp0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ai-chat-container" }, _attrs))} data-v-228dd7a1><div class="chat-header" data-v-228dd7a1><div class="header-left" data-v-228dd7a1><span${ssrRenderAttrs(_temp0 = mergeProps({
        class: ["health-dot", aiHealthy.value === true ? "healthy" : aiHealthy.value === false ? "unhealthy" : "unknown"]
      }, ssrGetDirectiveProps(_ctx, _directive_tooltip, aiHealthy.value ? "AI service online" : "AI service unavailable")))} data-v-228dd7a1>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : (_a = _temp0.innerHTML) != null ? _a : ""}</span><h3 data-v-228dd7a1>AI Assistant</h3>`);
      if (unref(usageInfo)) {
        _push(ssrRenderComponent(_component_Tag, {
          value: `${unref(usageInfo).remaining_questions}/${unref(usageInfo).daily_limit} questions`,
          severity: unref(usageInfo).remaining_questions <= 2 ? "danger" : "success"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="header-right" data-v-228dd7a1>`);
      _push(ssrRenderComponent(_component_Button, mergeProps({
        icon: "pi pi-history",
        class: "p-button-text",
        onClick: toggleHistory,
        badge: historyItems.value.length > 0 ? String(historyItems.value.length) : void 0,
        badgeSeverity: "info"
      }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "Operation history")), null, _parent));
      _push(ssrRenderComponent(_component_Button, mergeProps({
        icon: "pi pi-refresh",
        class: "p-button-text",
        onClick: handleReset,
        disabled: unref(loading)
      }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "Reset conversation")), null, _parent));
      _push(`</div></div>`);
      if (showHistory.value) {
        _push(`<div class="history-panel" data-v-228dd7a1><div class="history-header" data-v-228dd7a1><span class="history-title" data-v-228dd7a1><i class="pi pi-history" data-v-228dd7a1></i> Recent Operations</span>`);
        _push(ssrRenderComponent(_component_Button, {
          icon: "pi pi-times",
          class: "p-button-text p-button-sm",
          onClick: ($event) => showHistory.value = false
        }, null, _parent));
        _push(`</div><div class="history-list" data-v-228dd7a1>`);
        if (historyLoading.value) {
          _push(`<div class="history-empty" data-v-228dd7a1>`);
          _push(ssrRenderComponent(_component_ProgressSpinner, {
            style: { "width": "20px", "height": "20px" },
            strokeWidth: "4"
          }, null, _parent));
          _push(`<span data-v-228dd7a1>Loading...</span></div>`);
        } else if (historyItems.value.length === 0) {
          _push(`<div class="history-empty" data-v-228dd7a1> No operations yet </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(historyItems.value, (op) => {
          _push(`<div class="history-item" data-v-228dd7a1><div class="history-item-left" data-v-228dd7a1><i class="${ssrRenderClass(["pi", getOperationIcon(op.operation_type)])}" style="${ssrRenderStyle({ color: getOperationColor(op.operation_type) })}" data-v-228dd7a1></i><div class="history-item-info" data-v-228dd7a1><span class="history-item-desc" data-v-228dd7a1>${ssrInterpolate(formatOperationDescription(op))}</span><span class="history-item-time" data-v-228dd7a1>${ssrInterpolate(formatOperationTime(op.created_at))}</span></div></div><div class="history-item-right" data-v-228dd7a1>`);
          _push(ssrRenderComponent(_component_Tag, {
            value: op.status,
            severity: getStatusSeverity(op.status),
            style: { "font-size": "0.7rem" }
          }, null, _parent));
          if (isRollbackable(op)) {
            _push(ssrRenderComponent(_component_Button, mergeProps({
              icon: "pi pi-undo",
              class: "p-button-text p-button-sm",
              loading: rollingBack.value[op.id],
              onClick: ($event) => handleRollback(op.id),
              severity: "warning"
            }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "Undo this operation")), null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (aiHealthy.value === false) {
        _push(ssrRenderComponent(_component_Message, {
          severity: "error",
          closable: false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<strong data-v-228dd7a1${_scopeId}>AI service is currently unavailable.</strong> Please try again later. `);
            } else {
              return [
                createVNode("strong", null, "AI service is currently unavailable."),
                createTextVNode(" Please try again later. ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="messages-container" data-v-228dd7a1>`);
      if (!unref(hasMessages)) {
        _push(`<div class="empty-state" data-v-228dd7a1><i class="pi pi-android" style="${ssrRenderStyle({ "font-size": "3rem", "color": "#6366f1" })}" data-v-228dd7a1></i><h4 data-v-228dd7a1>Ask AI anything about your website</h4><div class="ai-capabilities" data-v-228dd7a1><div class="capability-group" data-v-228dd7a1><div class="capability-title" data-v-228dd7a1><i class="pi pi-bolt" data-v-228dd7a1></i> Quick Setup</div><ul class="suggestions" data-v-228dd7a1><li data-v-228dd7a1>&quot;Create a fresh website for my business&quot;</li><li data-v-228dd7a1>&quot;Apply a portfolio template to my site&quot;</li></ul></div><div class="capability-group" data-v-228dd7a1><div class="capability-title" data-v-228dd7a1><i class="pi pi-palette" data-v-228dd7a1></i> Themes &amp; Layout</div><ul class="suggestions" data-v-228dd7a1><li data-v-228dd7a1>&quot;Change my theme to purple&quot;</li><li data-v-228dd7a1>&quot;Switch to magazine layout&quot;</li><li data-v-228dd7a1>&quot;Move the logo to the left and menu to the top&quot;</li></ul></div><div class="capability-group" data-v-228dd7a1><div class="capability-title" data-v-228dd7a1><i class="pi pi-file" data-v-228dd7a1></i> Content &amp; Articles</div><ul class="suggestions" data-v-228dd7a1><li data-v-228dd7a1>&quot;Create a new article about our services&quot;</li><li data-v-228dd7a1>&quot;Update my home page content&quot;</li><li data-v-228dd7a1>&quot;Create a new page called Team&quot;</li></ul></div><div class="capability-group" data-v-228dd7a1><div class="capability-title" data-v-228dd7a1><i class="pi pi-bars" data-v-228dd7a1></i> Menu Management</div><ul class="suggestions" data-v-228dd7a1><li data-v-228dd7a1>&quot;Add a Services menu item&quot;</li><li data-v-228dd7a1>&quot;Reorder my menu items&quot;</li><li data-v-228dd7a1>&quot;Delete the Contact Us menu&quot;</li></ul></div><div class="capability-group" data-v-228dd7a1><div class="capability-title" data-v-228dd7a1><i class="pi pi-image" data-v-228dd7a1></i> Banners &amp; News</div><ul class="suggestions" data-v-228dd7a1><li data-v-228dd7a1>&quot;Create a news article about our latest product launch&quot;</li><li data-v-228dd7a1>&quot;Change the banner display style&quot;</li></ul></div><div class="capability-group" data-v-228dd7a1><div class="capability-title" data-v-228dd7a1><i class="pi pi-search" data-v-228dd7a1></i> SEO</div><ul class="suggestions" data-v-228dd7a1><li data-v-228dd7a1>&quot;Generate SEO keywords for my content&quot;</li><li data-v-228dd7a1>&quot;Update SEO metadata for my home page&quot;</li></ul></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(messages), (message) => {
        var _a2;
        _push(`<div class="${ssrRenderClass(["message", message.role])}" data-v-228dd7a1><div class="message-header" data-v-228dd7a1><span class="message-role" data-v-228dd7a1>${ssrInterpolate(message.role === "user" ? "You" : "AI Assistant")}</span><span class="message-time" data-v-228dd7a1>${ssrInterpolate(formatTime(message.timestamp))}</span></div>`);
        if (message.role === "assistant") {
          _push(`<div class="message-content markdown-body" data-v-228dd7a1>${(_a2 = unref(renderMarkdown)(message.content)) != null ? _a2 : ""}</div>`);
        } else {
          _push(`<div class="message-content" data-v-228dd7a1>${ssrInterpolate(message.content)}</div>`);
        }
        if (message.toolCalls && message.toolCalls.length > 0) {
          _push(`<div class="tool-calls" data-v-228dd7a1><div class="tool-calls-header" data-v-228dd7a1><i class="pi pi-cog" data-v-228dd7a1></i> Actions performed: </div><!--[-->`);
          ssrRenderList(message.toolCalls, (tool, index) => {
            _push(`<div class="${ssrRenderClass(["tool-call", tool.needsConfirmation ? "pending" : tool.success ? "success" : "error"])}" data-v-228dd7a1><div class="tool-call-top" data-v-228dd7a1><div class="tool-name" data-v-228dd7a1><i class="${ssrRenderClass(["pi", getToolIcon(tool.toolName)])}" data-v-228dd7a1></i> ${ssrInterpolate(formatToolName(tool.toolName))}</div>`);
            if (tool.success && canRollbackTool(tool.toolName)) {
              _push(ssrRenderComponent(_component_Button, mergeProps({
                icon: "pi pi-undo",
                label: "Undo",
                class: "p-button-text p-button-sm",
                severity: "warning",
                size: "small",
                onClick: ($event) => handleToolRollback(tool, message.id)
              }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "Undo this action")), null, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
            if (tool.needsConfirmation) {
              _push(`<div class="tool-confirmation" data-v-228dd7a1><div class="confirmation-preview" data-v-228dd7a1><i class="pi pi-exclamation-triangle" data-v-228dd7a1></i> ${ssrInterpolate(tool.confirmationPreview)}</div><div class="confirmation-actions" data-v-228dd7a1>`);
              _push(ssrRenderComponent(_component_Button, {
                label: "Confirm",
                icon: "pi pi-check",
                severity: "danger",
                size: "small",
                loading: confirming.value[tool.confirmationId],
                onClick: ($event) => handleConfirm(tool.confirmationId, message.id)
              }, null, _parent));
              _push(ssrRenderComponent(_component_Button, {
                label: "Cancel",
                icon: "pi pi-times",
                severity: "secondary",
                size: "small",
                outlined: "",
                onClick: ($event) => handleReject(tool.confirmationId, message.id)
              }, null, _parent));
              _push(`</div></div>`);
            } else if (tool.success) {
              _push(`<div class="tool-result" data-v-228dd7a1>${ssrInterpolate(formatToolResult(tool))}</div>`);
            } else if (tool.error) {
              _push(`<div class="${ssrRenderClass(["tool-error", getErrorCategory(tool.error)])}" data-v-228dd7a1><i class="${ssrRenderClass(["pi", getErrorIcon(tool.error)])}" data-v-228dd7a1></i><span data-v-228dd7a1>${ssrInterpolate(tool.error)}</span></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (message.loading) {
          _push(`<div class="message-loading" data-v-228dd7a1>`);
          _push(ssrRenderComponent(_component_ProgressSpinner, {
            style: { "width": "20px", "height": "20px" },
            strokeWidth: "4"
          }, null, _parent));
          _push(`<span data-v-228dd7a1>AI is thinking...</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
      if (unref(error)) {
        _push(ssrRenderComponent(_component_Message, {
          severity: "error",
          closable: true,
          onClose: ($event) => error.value = null
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(error))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(error)), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(isLimitReached)) {
        _push(ssrRenderComponent(_component_Message, {
          severity: "warn",
          closable: false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` You&#39;ve reached your daily limit of 10 questions. Come back tomorrow or upgrade your plan. `);
            } else {
              return [
                createTextVNode(" You've reached your daily limit of 10 questions. Come back tomorrow or upgrade your plan. ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="input-area" data-v-228dd7a1><div class="input-wrapper" data-v-228dd7a1>`);
      _push(ssrRenderComponent(_component_Textarea, {
        modelValue: userInput.value,
        "onUpdate:modelValue": ($event) => userInput.value = $event,
        placeholder: "Ask AI to modify your website...",
        disabled: unref(loading) || unref(isLimitReached) || aiHealthy.value === false,
        autoResize: true,
        rows: "3",
        onKeydown: handleSendMessage
      }, null, _parent));
      _push(`<div class="input-footer" data-v-228dd7a1><span class="input-hint" data-v-228dd7a1>Ctrl + Enter to send</span>`);
      _push(ssrRenderComponent(_component_Button, {
        icon: "pi pi-send",
        onClick: handleSendMessage,
        disabled: !unref(canSendMessage) || !userInput.value.trim() || aiHealthy.value === false,
        loading: unref(loading),
        severity: "primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Send `);
          } else {
            return [
              createTextVNode(" Send ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AIChat.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-228dd7a1"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ai-chat",
  __ssrInlineRender: true,
  setup(__props) {
    const { usageInfo } = useAIChat();
    computed(() => {
      var _a;
      if (!((_a = usageInfo.value) == null ? void 0 : _a.reset_at)) return "";
      const resetDate = new Date(usageInfo.value.reset_at);
      return resetDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AIChat = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ai-chat-page" }, _attrs))} data-v-4f6d6d06><div class="page-header" data-v-4f6d6d06><h1 data-v-4f6d6d06>AI Assistant</h1><p data-v-4f6d6d06>Get help with website management, content creation, and more</p></div><div class="chat-layout" data-v-4f6d6d06><div class="chat-main" data-v-4f6d6d06>`);
      _push(ssrRenderComponent(_component_AIChat, null, null, _parent));
      _push(`</div><div class="chat-sidebar" data-v-4f6d6d06><div class="sidebar-section" data-v-4f6d6d06><h3 data-v-4f6d6d06>What can AI do?</h3><ul class="capability-list" data-v-4f6d6d06><li data-v-4f6d6d06><i class="pi pi-bolt" data-v-4f6d6d06></i><div data-v-4f6d6d06><strong data-v-4f6d6d06>Quick Website Setup</strong><p data-v-4f6d6d06>Generate a complete website with pages, menus, and content from scratch</p></div></li><li data-v-4f6d6d06><i class="pi pi-th-large" data-v-4f6d6d06></i><div data-v-4f6d6d06><strong data-v-4f6d6d06>Apply Templates</strong><p data-v-4f6d6d06>Business, portfolio, blog, or organization templates with matching themes</p></div></li><li data-v-4f6d6d06><i class="pi pi-palette" data-v-4f6d6d06></i><div data-v-4f6d6d06><strong data-v-4f6d6d06>Theme &amp; Layout</strong><p data-v-4f6d6d06>Change colors (6 themes), layouts (classic, single page, magazine, hero), logo &amp; menu positions</p></div></li><li data-v-4f6d6d06><i class="pi pi-file" data-v-4f6d6d06></i><div data-v-4f6d6d06><strong data-v-4f6d6d06>Create &amp; Edit Pages</strong><p data-v-4f6d6d06>Create articles, update content, delete pages, add new menu sections</p></div></li><li data-v-4f6d6d06><i class="pi pi-bars" data-v-4f6d6d06></i><div data-v-4f6d6d06><strong data-v-4f6d6d06>Menu Management</strong><p data-v-4f6d6d06>Add, rename, reorder, or delete menu items and submenus</p></div></li><li data-v-4f6d6d06><i class="pi pi-image" data-v-4f6d6d06></i><div data-v-4f6d6d06><strong data-v-4f6d6d06>Banners &amp; News</strong><p data-v-4f6d6d06>Create news articles, manage banners, change display styles</p></div></li><li data-v-4f6d6d06><i class="pi pi-search" data-v-4f6d6d06></i><div data-v-4f6d6d06><strong data-v-4f6d6d06>SEO Optimization</strong><p data-v-4f6d6d06>Generate keywords, update meta titles &amp; descriptions</p></div></li></ul></div><div class="sidebar-section" data-v-4f6d6d06><h3 data-v-4f6d6d06>Tips</h3><ul class="tips-list" data-v-4f6d6d06><li data-v-4f6d6d06>Be specific about what you want</li><li data-v-4f6d6d06>Use natural language - no technical terms needed</li><li data-v-4f6d6d06>AI will ask before making major changes</li><li data-v-4f6d6d06>All changes can be undone</li><li data-v-4f6d6d06>Daily limit resets at midnight</li></ul></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/ai-chat.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const aiChat = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4f6d6d06"]]);

export { aiChat as default };
//# sourceMappingURL=ai-chat-pdxSYu5o.mjs.map
