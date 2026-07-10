import { useState } from 'react'
import { ChecklistPage } from '@/checklist/components/ChecklistPage'
import { DashboardPage } from '@/dashboard/components/DashboardPage'
import { ChatPage } from '@/chat/components/ChatPage'
import { ThemeProvider } from '@/app/ThemeProvider'
import { BottomNav, type AppTab } from '@/app/BottomNav'

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('checklist')

  return (
    <ThemeProvider>
      <div
        className="h-svh"
        style={{ '--bottom-nav-height': '4rem' } as React.CSSProperties}
      >
        {activeTab === 'checklist' ? <ChecklistPage /> : null}
        {activeTab === 'dashboard' ? <DashboardPage /> : null}
        {activeTab === 'chat' ? <ChatPage /> : null}
        <BottomNav active={activeTab} onChange={setActiveTab} />
      </div>
    </ThemeProvider>
  )
}
