export const OPENROUTER_API_KEY_STORAGE = 'openrouter-api-key'

export const DEFAULT_OPENROUTER_MODEL = 'deepseek/deepseek-v4-flash'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  createdAt: string
}

export interface OpenRouterChatRequest {
  model: string
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>
  temperature?: number
}

export interface OpenRouterReasoningDetail {
  text?: string
}

export interface OpenRouterMessage {
  role?: string
  content?: string | null
  reasoning?: string
  reasoning_details?: OpenRouterReasoningDetail[]
}

export interface OpenRouterChatResponse {
  choices?: Array<{
    message?: OpenRouterMessage
  }>
  error?: {
    message?: string
  }
}
