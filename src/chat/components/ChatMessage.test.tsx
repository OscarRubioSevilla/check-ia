import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createRoot, type Root } from 'react-dom/client'
import { act } from 'react'
import { ChatMessage } from './ChatMessage'

describe('ChatMessage', () => {
  let container: HTMLDivElement
  let root: Root

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
  })

  afterEach(() => {
    act(() => {
      root.unmount()
    })
    container.remove()
  })

  it('renders markdown bold and lists for assistant messages', () => {
    const content = '**¿Cuál proyecto va mejor?**\n\n- Item A\n- Item B'

    act(() => {
      root.render(<ChatMessage role="assistant" content={content} />)
    })

    expect(container.querySelector('strong')?.textContent).toBe(
      '¿Cuál proyecto va mejor?',
    )
    expect(container.querySelectorAll('li')).toHaveLength(2)
    expect(container.querySelector('ul')).not.toBeNull()
  })

  it('keeps user messages as plain text', () => {
    act(() => {
      root.render(<ChatMessage role="user" content="**not bold**" />)
    })

    expect(container.querySelector('strong')).toBeNull()
    expect(container.textContent).toBe('**not bold**')
  })
})
