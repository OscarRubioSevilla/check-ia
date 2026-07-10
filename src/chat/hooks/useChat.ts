import { useCallback, useState } from 'react'
import { DEFAULT_OPENROUTER_MODEL, type ChatMessage } from '../types/chat.types'
import { sendOpenRouterChat } from '../services/openrouter'

function createMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function useChat(systemPrompt: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim()
      if (!trimmed || loading) {
        return
      }

      const userMessage: ChatMessage = {
        id: createMessageId(),
        role: 'user',
        content: trimmed,
        createdAt: new Date().toISOString(),
      }

      setMessages((current) => [...current, userMessage])
      setLoading(true)
      setError(null)

      try {
        const response = await sendOpenRouterChat({
          model: DEFAULT_OPENROUTER_MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            ...[...messages, userMessage].map((message) => ({
              role: message.role,
              content: message.content,
            })),
          ],
        })

        const assistantMessage: ChatMessage = {
          id: createMessageId(),
          role: 'assistant',
          content: response,
          createdAt: new Date().toISOString(),
        }

        setMessages((current) => [...current, assistantMessage])
      } catch (caught) {
        const message =
          caught instanceof Error
            ? caught.message
            : 'No se pudo obtener respuesta del asistente.'
        setError(message)
      } finally {
        setLoading(false)
      }
    },
    [loading, messages, systemPrompt],
  )

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearMessages,
  }
}
