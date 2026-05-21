export interface ToolCallResult {
  toolName: string;
  success: boolean;
  result?: any;
  error?: string;
}

export interface UsageInfo {
  remaining_questions: number;
  daily_limit: number;
  questions_count: number;
  reset_at: string;
}
