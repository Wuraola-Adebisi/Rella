import { CalendarDays, CheckSquare, CreditCard, Inbox, Brain, MessageCircle, Plus, Settings, ChevronDown } from 'lucide-react'
import type { ViewId } from '../types'

type SidebarProps = { activeView: ViewId; onNavigate: (view: ViewId) => void; onAdd: () => void; onSettings: () => void; inboxCount: number }

const primaryItems: { id: ViewId; label: string; icon: typeof CheckSquare }[] = [
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'bills', label: 'Bills & subscriptions', icon: CreditCard },
  { id: 'memory', label: 'My Memory', icon: Brain },
  { id: 'inbox', label: 'Inbox', icon: Inbox },
]

export default function Sidebar({ activeView, onNavigate, onAdd, onSettings, inboxCount }: SidebarProps) {
  return (
    <aside className="sidebar">
      <button className="brand-lockup" onClick={() => onNavigate('tasks')} aria-label="Rella home">
        <span className="brand-mark">r</span><span className="brand-name">rella</span>
      </button>
      <button className="workspace-switcher" onClick={onSettings}><span className="workspace-avatar">W</span><span className="workspace-copy"><strong>Personal space</strong><small>Your life, in one place</small></span><ChevronDown size={15} /></button>
      <button className="add-button" onClick={onAdd}><Plus size={17} strokeWidth={2.4} /> Add something <span>⌘ K</span></button>
      <div className="nav-section-label">YOUR SPACE</div>
      <nav className="main-nav" aria-label="Main navigation">
        {primaryItems.map(({ id, label, icon: Icon }) => <button key={id} className={`nav-item ${activeView === id ? 'active' : ''}`} onClick={() => onNavigate(id)}><Icon size={18} strokeWidth={1.8} /><span>{label}</span>{id === 'inbox' && inboxCount > 0 && <span className="nav-count">{inboxCount}</span>}</button>)}
      </nav>
      <div className="nav-section-label assistant-label">YOUR ASSISTANT</div>
      <button className={`nav-item ${activeView === 'assistant' ? 'active' : ''}`} onClick={() => onNavigate('assistant')}><MessageCircle size={18} strokeWidth={1.8} /><span>Ask Rella</span></button>
      <div className="sidebar-bottom">
        <div className="sidebar-tip"><div className="tip-icon"><Brain size={16} /></div><strong>A little less to remember.</strong><p>Save the details. Rella will help you find them when you need them.</p><button onClick={() => onNavigate('memory')}>Explore My Memory <span>→</span></button></div>
        <button className="nav-item settings-item" onClick={onSettings}><Settings size={18} strokeWidth={1.8} /><span>Settings</span></button>
        <button className="profile-button" onClick={onSettings}><span className="profile-avatar">WA</span><span className="profile-copy"><strong>Wuraola Adebisi</strong><small>Personal account</small></span><MoreDots /></button>
      </div>
    </aside>
  )
}

function MoreDots() { return <span className="more-dots">···</span> }
