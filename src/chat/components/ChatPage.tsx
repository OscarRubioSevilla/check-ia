import { useRef, useEffect, useState } from 'react'
import { MobileShell } from '../../app/MobileShell'
import { useChat } from '../hooks/useChat'
import { useWorkshopContext } from '../hooks/useWorkshopContext'
import { ChatSettingsPanel } from './ChatSettings'
import { Button } from '../../shared/ui/Button'
import { Loader2, Send, Trash2 } from 'lucide-react'
import { cn } from '../../shared/lib/cn'

const SUGGESTIONS = [
  '¿Cuál proyecto va mejor?',
  'Resume evaluación de calorías',
  '¿Qué criterios faltan en cuentas-compartidas?',
  'Sugiere mejoras según las puntuaciones actuales',
]

export function ChatPage() {
  const [input, setInput] = useState('')
  const systemPrompt = useWorkshopContext()
  const { messages, loading, error, sendMessage, clearMessages } =
    useChat(systemPrompt)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const value = input
    setInput('')
    await sendMessage(value)
  }

  return (
    <MobileShell
      header={
        <>
          <h1 className="text-base font-semibold text-primary">
            Asistente de evaluación
          </h1>
          <p className="mt-1 text-sm text-secondary">
            Consulta puntuaciones y criterios del taller
          </p>
        </>
      }
      bottomPanelOffset="var(--bottom-nav-height, 0px)"
    >
      <ChatSettingsPanel />

      <div className="flex min-h-0 flex-1 flex-col px-4 pt-4 md:mx-auto md:max-w-2xl">
        {messages.length === 0 ? (
          <div className="mb-4 space-y-2">
            <p className="text-sm text-secondary">Preguntas sugeridas:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => sendMessage(suggestion)}
                  disabled={loading}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-secondary transition-colors hover:border-border-strong hover:text-primary disabled:opacity-50"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="flex-1 space-y-3 pb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'max-w-[90%] rounded-lg px-3 py-2 text-sm leading-relaxed',
                message.role === 'user'
                  ? 'ml-auto bg-accent-bg text-on-accent'
                  : 'mr-auto border border-border bg-surface text-primary',
              )}
            >
              {message.content}
            </div>
          ))}

          {loading ? (
            <div className="flex items-center gap-2 text-sm text-secondary">
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Pensando…
            </div>
          ) : null}

          {error ? (
            <p className="rounded-md border border-error bg-error-muted px-3 py-2 text-sm text-error">
              {error}
            </p>
          ) : null}

          <div ref={bottomRef} />
        </div>

        <div className="sticky bottom-0 border-t border-border bg-body pb-2 pt-3">
          {messages.length > 0 ? (
            <button
              type="button"
              onClick={clearMessages}
              className="mb-2 flex items-center gap-1 text-xs text-secondary hover:text-primary"
            >
              <Trash2 className="size-3.5" aria-hidden />
              Limpiar conversación
            </button>
          ) : null}

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Escribe tu pregunta…"
              disabled={loading}
              className="min-h-11 flex-1 rounded-md border border-border bg-surface px-3 text-sm text-primary placeholder:text-disabled focus:border-border-strong focus:outline-none focus:ring-1 focus:ring-accent-bg disabled:opacity-50"
            />
            <Button
              type="submit"
              variant="primary"
              disabled={loading || input.trim().length === 0}
              className="min-h-11 w-auto shrink-0 px-4"
            >
              <Send className="size-4" aria-hidden />
              <span className="sr-only">Enviar</span>
            </Button>
          </form>
        </div>
      </div>
    </MobileShell>
  )
}
