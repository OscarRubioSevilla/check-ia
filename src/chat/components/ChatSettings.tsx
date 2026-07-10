import { useState } from 'react'
import {
  clearOpenRouterApiKey,
  resolveOpenRouterApiKey,
  saveOpenRouterApiKey,
} from '../services/openrouter'
import { OPENROUTER_API_KEY_STORAGE } from '../types/chat.types'
import { Button } from '../../shared/ui/Button'
import { Settings } from 'lucide-react'

export function ChatSettingsPanel() {
  const [expanded, setExpanded] = useState(false)
  const [apiKey, setApiKey] = useState(() => {
    if (typeof window === 'undefined') {
      return ''
    }
    return window.localStorage.getItem(OPENROUTER_API_KEY_STORAGE) ?? ''
  })

  const envConfigured =
    typeof import.meta.env.VITE_OPENROUTER_API_KEY === 'string' &&
    import.meta.env.VITE_OPENROUTER_API_KEY.trim().length > 0

  const handleSave = () => {
    saveOpenRouterApiKey(apiKey)
    setExpanded(false)
  }

  const handleClear = () => {
    clearOpenRouterApiKey()
    setApiKey('')
  }

  return (
    <div className="border-b border-border bg-surface px-4 py-2">
      <button
        type="button"
        onClick={() => setExpanded((current) => !current)}
        className="flex w-full items-center gap-2 text-sm text-secondary hover:text-primary"
        aria-expanded={expanded}
      >
        <Settings className="size-4" aria-hidden />
        Ajustes OpenRouter
        {envConfigured || resolveOpenRouterApiKey() ? (
          <span className="ml-auto text-xs text-success">API configurada</span>
        ) : (
          <span className="ml-auto text-xs text-warning">Sin API key</span>
        )}
      </button>

      {expanded ? (
        <div className="mt-3 space-y-3 pb-2">
          <p className="text-xs text-secondary">
            Pega tu API key de OpenRouter para el chat. Se guarda en localStorage
            como respaldo si no hay variable de entorno.
          </p>
          <input
            type="password"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            placeholder="sk-or-..."
            className="w-full rounded-md border border-border bg-body px-3 py-2 text-sm text-primary placeholder:text-disabled focus:border-border-strong focus:outline-none focus:ring-1 focus:ring-accent-bg"
          />
          <div className="flex gap-2">
            <Button variant="primary" onClick={handleSave}>
              Guardar
            </Button>
            <Button variant="ghost" onClick={handleClear}>
              Borrar
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
