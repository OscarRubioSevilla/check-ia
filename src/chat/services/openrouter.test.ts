import { describe, expect, it } from 'vitest'
import { extractOpenRouterAssistantText } from './openrouter'
import type { OpenRouterChatResponse } from '../types/chat.types'

describe('extractOpenRouterAssistantText', () => {
  it('prefers message.content when present', () => {
    const payload: OpenRouterChatResponse = {
      choices: [
        {
          message: {
            role: 'assistant',
            content: '  Respuesta directa  ',
            reasoning: 'Razonamiento interno',
          },
        },
      ],
    }

    expect(extractOpenRouterAssistantText(payload)).toBe('Respuesta directa')
  })

  it('falls back to reasoning when content is null (DeepSeek v4 flash)', () => {
    const payload: OpenRouterChatResponse = {
      choices: [
        {
          message: {
            role: 'assistant',
            content: null,
            reasoning: '  ¡Hola! Estoy aquí para ayudarte...  ',
          },
        },
      ],
    }

    expect(extractOpenRouterAssistantText(payload)).toBe(
      '¡Hola! Estoy aquí para ayudarte...',
    )
  })

  it('falls back to reasoning_details[0].text when content and reasoning are empty', () => {
    const payload: OpenRouterChatResponse = {
      choices: [
        {
          message: {
            role: 'assistant',
            content: null,
            reasoning: '',
            reasoning_details: [{ text: '  Texto en reasoning_details  ' }],
          },
        },
      ],
    }

    expect(extractOpenRouterAssistantText(payload)).toBe('Texto en reasoning_details')
  })

  it('throws when all candidate fields are empty', () => {
    const payload: OpenRouterChatResponse = {
      choices: [
        {
          message: {
            role: 'assistant',
            content: null,
            reasoning: '   ',
            reasoning_details: [{ text: '' }],
          },
        },
      ],
    }

    expect(() => extractOpenRouterAssistantText(payload)).toThrow(
      'OpenRouter devolvió una respuesta vacía.',
    )
  })
})
