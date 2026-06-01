import { defineComponent, computed, mergeProps, ref, watch, nextTick, resolveComponent, resolveDirective, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, s as storeToRefs, f as defineStore } from './server.mjs';
import { u as useApi } from './useApi-C5-eJazW.mjs';
import { u as useAuthStore } from './auth-Bg8VnjAZ.mjs';
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
  const { messages, hasMessages, loading, error, usageInfo, remainingQuestions, canSendMessage, isLimitReached } = storeToRefs(chatStore);
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
        chatStore.updateMessage(loadingMessageId, {
          content: result.response,
          toolCalls: result.toolCalls,
          loading: false
        });
        return;
      }
      if (jobStatus === "failed") {
        chatStore.updateMessage(loadingMessageId, {
          content: "",
          loading: false,
          error: jobError || "AI processing failed"
        });
        chatStore.setError(jobError || "AI processing failed");
        return;
      }
      await new Promise((r) => setTimeout(r, 1e3));
    }
    chatStore.updateMessage(loadingMessageId, {
      content: "",
      loading: false,
      error: "Request timed out. Please try again."
    });
    chatStore.setError("Request timed out");
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
      const request = { message, context };
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
    resetChat
  };
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AIChat",
  __ssrInlineRender: true,
  setup(__props) {
    const { sendMessage, loading, error, messages, hasMessages, usageInfo, canSendMessage, isLimitReached, remainingQuestions, resetChat } = useAIChat();
    const authStore = useAuthStore();
    const userInput = ref("");
    const messagesContainer = ref(null);
    watch(messages, async () => {
      await nextTick();
      scrollToBottom();
    }, { deep: true });
    const handleSendMessage = async () => {
      var _a;
      if (!userInput.value.trim() || !canSendMessage.value) {
        console.log("Send blocked:", {
          hasInput: !!userInput.value.trim(),
          canSendMessage: canSendMessage.value,
          loading: loading.value,
          remainingQuestions: remainingQuestions.value
        });
        return;
      }
      const message = userInput.value.trim();
      userInput.value = "";
      console.log("Sending message to AI:", message);
      const result = await sendMessage(message, {
        langId: (_a = authStore.user) == null ? void 0 : _a.lang_id
      });
      console.log("AI response:", result);
    };
    const handleReset = () => {
      if (confirm("Are you sure you want to reset the conversation?")) {
        resetChat();
      }
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Tag = resolveComponent("Tag");
      const _component_Button = resolveComponent("Button");
      const _component_ProgressSpinner = resolveComponent("ProgressSpinner");
      const _component_Message = resolveComponent("Message");
      const _component_Textarea = resolveComponent("Textarea");
      const _directive_tooltip = resolveDirective("tooltip");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "ai-chat-container" }, _attrs))} data-v-6333d89d><div class="chat-header" data-v-6333d89d><div class="header-left" data-v-6333d89d><h3 data-v-6333d89d>AI Assistant</h3>`);
      if (unref(usageInfo)) {
        _push(ssrRenderComponent(_component_Tag, {
          value: `${unref(usageInfo).remaining_questions}/${unref(usageInfo).daily_limit} questions`,
          severity: unref(usageInfo).remaining_questions <= 2 ? "danger" : "success"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="header-right" data-v-6333d89d>`);
      _push(ssrRenderComponent(_component_Button, mergeProps({
        icon: "pi pi-refresh",
        class: "p-button-text",
        onClick: handleReset,
        disabled: unref(loading)
      }, ssrGetDirectiveProps(_ctx, _directive_tooltip, "Reset conversation")), null, _parent));
      _push(`</div></div><div class="messages-container" data-v-6333d89d>`);
      if (!unref(hasMessages)) {
        _push(`<div class="empty-state" data-v-6333d89d><i class="pi pi-android" style="${ssrRenderStyle({ "font-size": "3rem", "color": "#6366f1" })}" data-v-6333d89d></i><h4 data-v-6333d89d>Ask AI anything about your website</h4><div class="ai-capabilities" data-v-6333d89d><div class="capability-group" data-v-6333d89d><div class="capability-title" data-v-6333d89d><i class="pi pi-bolt" data-v-6333d89d></i> Quick Setup</div><ul class="suggestions" data-v-6333d89d><li data-v-6333d89d>&quot;Create a fresh website for my business&quot;</li><li data-v-6333d89d>&quot;Apply a portfolio template to my site&quot;</li></ul></div><div class="capability-group" data-v-6333d89d><div class="capability-title" data-v-6333d89d><i class="pi pi-palette" data-v-6333d89d></i> Themes &amp; Layout</div><ul class="suggestions" data-v-6333d89d><li data-v-6333d89d>&quot;Change my theme to purple&quot;</li><li data-v-6333d89d>&quot;Switch to magazine layout&quot;</li><li data-v-6333d89d>&quot;Move the logo to the left and menu to the top&quot;</li></ul></div><div class="capability-group" data-v-6333d89d><div class="capability-title" data-v-6333d89d><i class="pi pi-file" data-v-6333d89d></i> Content &amp; Articles</div><ul class="suggestions" data-v-6333d89d><li data-v-6333d89d>&quot;Create a new article about our services&quot;</li><li data-v-6333d89d>&quot;Update my home page content&quot;</li><li data-v-6333d89d>&quot;Create a new page called Team&quot;</li></ul></div><div class="capability-group" data-v-6333d89d><div class="capability-title" data-v-6333d89d><i class="pi pi-bars" data-v-6333d89d></i> Menu Management</div><ul class="suggestions" data-v-6333d89d><li data-v-6333d89d>&quot;Add a Services menu item&quot;</li><li data-v-6333d89d>&quot;Reorder my menu items&quot;</li><li data-v-6333d89d>&quot;Delete the Contact Us menu&quot;</li></ul></div><div class="capability-group" data-v-6333d89d><div class="capability-title" data-v-6333d89d><i class="pi pi-image" data-v-6333d89d></i> Banners &amp; News</div><ul class="suggestions" data-v-6333d89d><li data-v-6333d89d>&quot;Create a news article about our latest product launch&quot;</li><li data-v-6333d89d>&quot;Change the banner display style&quot;</li></ul></div><div class="capability-group" data-v-6333d89d><div class="capability-title" data-v-6333d89d><i class="pi pi-search" data-v-6333d89d></i> SEO</div><ul class="suggestions" data-v-6333d89d><li data-v-6333d89d>&quot;Generate SEO keywords for my content&quot;</li><li data-v-6333d89d>&quot;Update SEO metadata for my home page&quot;</li></ul></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(messages), (message) => {
        _push(`<div class="${ssrRenderClass(["message", message.role])}" data-v-6333d89d><div class="message-header" data-v-6333d89d><span class="message-role" data-v-6333d89d>${ssrInterpolate(message.role === "user" ? "You" : "AI Assistant")}</span><span class="message-time" data-v-6333d89d>${ssrInterpolate(formatTime(message.timestamp))}</span></div><div class="message-content" data-v-6333d89d>${ssrInterpolate(message.content)}</div>`);
        if (message.toolCalls && message.toolCalls.length > 0) {
          _push(`<div class="tool-calls" data-v-6333d89d><div class="tool-calls-header" data-v-6333d89d><i class="pi pi-cog" data-v-6333d89d></i> Actions performed: </div><!--[-->`);
          ssrRenderList(message.toolCalls, (tool, index) => {
            _push(`<div class="${ssrRenderClass(["tool-call", tool.success ? "success" : "error"])}" data-v-6333d89d><div class="tool-name" data-v-6333d89d>${ssrInterpolate(formatToolName(tool.toolName))}</div>`);
            if (tool.success) {
              _push(`<div class="tool-result" data-v-6333d89d>${ssrInterpolate(formatToolResult(tool))}</div>`);
            } else {
              _push(`<div class="tool-error" data-v-6333d89d>${ssrInterpolate(tool.error)}</div>`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (message.loading) {
          _push(`<div class="message-loading" data-v-6333d89d>`);
          _push(ssrRenderComponent(_component_ProgressSpinner, {
            style: { "width": "20px", "height": "20px" },
            strokeWidth: "4"
          }, null, _parent));
          _push(`<span data-v-6333d89d>AI is thinking...</span></div>`);
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
      _push(`<div class="input-area" data-v-6333d89d><div class="input-wrapper" data-v-6333d89d>`);
      _push(ssrRenderComponent(_component_Textarea, {
        modelValue: userInput.value,
        "onUpdate:modelValue": ($event) => userInput.value = $event,
        placeholder: "Ask AI to modify your website...",
        disabled: unref(loading) || unref(isLimitReached),
        autoResize: true,
        rows: "3",
        onKeydown: handleSendMessage
      }, null, _parent));
      _push(`<div class="input-footer" data-v-6333d89d><span class="input-hint" data-v-6333d89d>Ctrl + Enter to send</span>`);
      _push(ssrRenderComponent(_component_Button, {
        icon: "pi pi-send",
        onClick: handleSendMessage,
        disabled: !unref(canSendMessage) || !userInput.value.trim(),
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
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-6333d89d"]]);
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
//# sourceMappingURL=ai-chat-D0_5SF0w.mjs.map
