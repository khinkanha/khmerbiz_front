export interface ToolCallResult {
  toolName: string;
  success: boolean;
  result?: any;
  error?: string;
  needsConfirmation?: boolean;
  confirmationId?: string;
  confirmationPreview?: string;
  operationId?: number;
}

export interface UsageInfo {
  remaining_questions: number;
  daily_limit: number;
  questions_count: number;
  reset_at: string;
}

export type AIOperationType = 'create' | 'update' | 'delete' | 'ui_change' | 'conversation';
export type AITargetType = 'content' | 'menu' | 'banner' | 'setting' | 'seo' | 'chat';
export type AIOperationStatus = 'pending' | 'completed' | 'failed' | 'rolled_back';

export interface AIOperation {
  id: number;
  user_id: number;
  domain_id: number;
  operation_type: AIOperationType;
  target_type: AITargetType;
  target_id: number | null;
  operation_data: {
    toolName?: string;
    args?: Record<string, any>;
    [key: string]: any;
  };
  status: AIOperationStatus;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface ContentVersion {
  id: number;
  content_id: number;
  version: number;
  title: string | null;
  description: string | null;
  created_by: number;
  restoration_expires_at: string;
  created_at: string;
}
