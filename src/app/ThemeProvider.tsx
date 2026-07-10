import type { PropsWithChildren } from 'react'
import { Theme } from '@astryxdesign/core/theme'
import { neutralTheme } from '@/themes/neutral/neutral'

export function ThemeProvider({ children }: PropsWithChildren) {
  return <Theme theme={neutralTheme}>{children}</Theme>
}
