import {
  DEFAULT_OPENROUTER_MODEL,
  OPENROUTER_API_KEY_STORAGE,
  type OpenRouterChatRequest,
  type OpenRouterChatResponse,
} from '../types/chat.types'

const OPENROUTER_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions'

export function resolveOpenRouterApiKey(): string | undefined {
  const envKey = import.meta.env.VITE_OPENROUTER_API_KEY

  if (typeof envKey === 'string' && envKey.trim().length > 0) {
    return envKey.trim()
  }

  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem(OPENROUTER_API_KEY_STORAGE)
    if (stored && stored.trim().length > 0) {
      return stored.trim()
    }
  }

  return undefined
}

export function saveOpenRouterApiKey(apiKey: string): void {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(OPENROUTER_API_KEY_STORAGE, apiKey.trim())
}

export function clearOpenRouterApiKey(): void {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(OPENROUTER_API_KEY_STORAGE)
}

export async function sendOpenRouterChat(
  request: OpenRouterChatRequest,
  apiKey?: string,
): Promise<string> {
  const resolvedKey = apiKey ?? resolveOpenRouterApiKey()

  if (!resolvedKey) {
    throw new Error(
      'Falta API key de OpenRouter. Configúrala en ajustes o VITE_OPENROUTER_API_KEY.',
    )
  }

  const response = await fetch(OPENROUTER_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resolvedKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : '',
      'X-Title': 'Check IA Workshop',
    },
    body: JSON.stringify({
      model: request.model || DEFAULT_OPENROUTER_MODEL,
      messages: request.messages,
      temperature: request.temperature ?? 0.4,
    }),
  })

  const payload = (await response.json()) as OpenRouterChatResponse

  if (!response.ok) {
    throw new Error(
      payload.error?.message ??
        `OpenRouter respondió con estado ${response.status}`,
    )
  }

  return extractOpenRouterAssistantText(payload)
}

export function extractOpenRouterAssistantText(
  payload: OpenRouterChatResponse,
): string {
  const message = payload.choices?.[0]?.message
  const candidates = [
    message?.content,
    message?.reasoning,
    message?.reasoning_details?.[0]?.text,
  ]

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim().length > 0) {
      return candidate.trim()
    }
  }

  throw new Error('OpenRouter devolvió una respuesta vacía.')
}
