import { useEffect, useState } from 'react'
import { Plus, X } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Overview from './components/Overview'
import SectionView from './components/SectionView'
import { useRellaStore } from './hooks/useRellaStore'
import type { ViewId } from './types'

const subtitles: Record<ViewId, string> = {
  overview: 'A little more clarity for your day.', calendar: 'Your time, plans and commitments.', tasks: 'The things you want to get done.', bills: 'Recurring payments, without the surprises.', memory: 'Keep the details that matter close.', inbox: 'Everything you have not sorted yet.', assistant: 'A second mind for the details of everyday life.',
}

export default function App() {
  const [activeView, setActiveView] = useState<ViewId>('overview')
  const store = useRellaStore()
  const [modalOpen, setModalOpen] = useState(false)
  const [newItem, setNewItem] = useState('')
  const [toast, setToast] = useState('')
  useEffect(() => {
    const handleNavigate = (event: Event) => setActiveView((event as CustomEvent<ViewId>).detail)
    window.addEventListener('rella:navigate', handleNavigate)
    return () => window.removeEventListener('rella:navigate', handleNavigate)
  }, [])
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2600) }
  const isTaskView = activeView === 'tasks'
  const saveQuickItem = () => {
    if (!newItem.trim()) return
    if (isTaskView) store.addTask(newItem.trim())
    else if (activeView === 'memory') store.addMemory(newItem.trim().slice(0, 60), newItem.trim())
    else store.capture(newItem.trim())
    setNewItem('')
    setModalOpen(false)
    notify(isTaskView ? 'Task added' : activeView === 'memory' ? 'Memory saved' : 'Saved to your inbox')
  }
  const activeTitle = activeView === 'overview' ? 'Good evening' : ({ calendar: 'Calendar', tasks: 'Tasks', bills: 'Bills & subscriptions', memory: 'My Memory', inbox: 'Inbox', assistant: 'Ask Rella' } as Record<ViewId, string>)[activeView]

  return <div className="app-shell"><Sidebar activeView={activeView} onNavigate={setActiveView} onAdd={() => setModalOpen(true)} /><main className="main-area"><Topbar title={activeTitle} subtitle={subtitles[activeView]} /><div className="page-content">{activeView === 'overview' ? <Overview tasks={store.tasks} reminders={store.reminders} memories={store.memories} events={store.events} bills={store.bills} onToggleTask={store.toggleTask} onAddTask={() => { setActiveView('tasks'); setModalOpen(true) }} onCapture={value => { store.capture(value); notify('Added to your inbox') }} onNavigate={setActiveView} /> : <SectionView view={activeView} tasks={store.tasks} memories={store.memories} capturedItems={store.inbox} events={store.events} bills={store.bills} onToggleTask={store.toggleTask} onToggleBillPaid={store.toggleBillPaid} onProcessInbox={store.processInbox} onAdd={() => setModalOpen(true)} onCapture={value => { store.capture(value); notify('Added to your inbox') }} onAddEvent={store.addEvent} onAddBill={store.addBill} onAddMemory={store.addMemory} onAddTask={store.addTask} />}</div></main>
    {modalOpen && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setModalOpen(false) }}><form className="add-modal" onSubmit={e => { e.preventDefault(); saveQuickItem() }}><div className="modal-heading"><div><span className="section-kicker">QUICK ADD</span><h2>{isTaskView ? 'Add a task' : activeView === 'memory' ? 'Save a memory' : 'Capture something'}</h2></div><button type="button" className="subtle-icon" onClick={() => setModalOpen(false)} aria-label="Close"><X size={19} /></button></div><label htmlFor="new-item">{isTaskView ? 'What needs to get done?' : 'What would you like to keep?'}</label><input id="new-item" autoFocus value={newItem} onChange={e => setNewItem(e.target.value)} placeholder={isTaskView ? 'e.g. Send the proposal by Friday' : 'Write a detail, date or commitment...'} /><p className="modal-hint">{isTaskView ? 'This task will appear in your task list.' : activeView === 'memory' ? 'Save this directly to My Memory.' : 'You can organise this from your Inbox.'}</p><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setModalOpen(false)}>Cancel</button><button type="submit" className="primary-button" disabled={!newItem.trim()}><Plus size={16} /> {isTaskView ? 'Add task' : activeView === 'memory' ? 'Save memory' : 'Save to inbox'}</button></div></form></div>}
    {toast && <div className="toast-message" role="status">{toast}</div>}
  </div>
}
