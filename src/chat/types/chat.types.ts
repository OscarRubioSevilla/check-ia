export const OPENROUTER_API_KEY_STORAGE = 'openrouter-api-key'

export const DEFAULT_OPENROUTER_MODEL = 'google/gemini-2.0-flash-001'

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

export interface OpenRouterChatResponse {
  choices?: Array<{
    message?: {
      role?: string
      content?: string
    }
  }>
  error?: {
    message?: string
  }
}
