import { ChecklistPage } from '@/checklist/components/ChecklistPage'
import { ThemeProvider } from '@/app/ThemeProvider'

export default function App() {
  return (
    <ThemeProvider>
      <ChecklistPage />
    </ThemeProvider>
  )
}
