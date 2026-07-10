import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '../../shared/lib/cn'
import type { ChatMessage as ChatMessageType } from '../types/chat.types'
import styles from './ChatMessage.module.css'

interface ChatMessageProps {
  role: ChatMessageType['role']
  content: string
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user'

  return (
    <div
      className={cn(
        'max-w-[90%] rounded-lg px-3 py-2 text-sm',
        isUser
          ? styles.userMessage
          : cn('mr-auto border border-border bg-surface text-primary', styles.assistantMessage),
      )}
    >
      {isUser ? (
        <p className={styles.userText}>{content}</p>
      ) : (
        <div className={styles.markdown}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  )
}
