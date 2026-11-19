import { useEffect, useState } from 'react'
import { Plus, X } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Overview from './components/Overview'
import SectionView from './components/SectionView'
import { initialTasks, memories, reminders } from './data'
import type { Task, ViewId } from './types'

const subtitles: Record<ViewId, string> = {
  overview: 'A little more clarity for your day.', calendar: 'Your time, plans and commitments.', tasks: 'The things you want to get done.', bills: 'Recurring payments, without the surprises.', memory: 'Keep the details that matter close.', inbox: 'Everything you have not sorted yet.', assistant: 'A second mind for the details of everyday life.',
}

export default function App() {
  const [activeView, setActiveView] = useState<ViewId>('overview')
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [modalOpen, setModalOpen] = useState(false)
  const [newTask, setNewTask] = useState('')
  const [toast, setToast] = useState('')
  const [capturedItems, setCapturedItems] = useState<string[]>([])

  useEffect(() => {
    const handleNavigate = (event: Event) => setActiveView((event as CustomEvent<ViewId>).detail)
    window.addEventListener('rella:navigate', handleNavigate)
    return () => window.removeEventListener('rella:navigate', handleNavigate)
  }, [])

  const addTask = () => {
    if (!newTask.trim()) return
    setTasks(current => [{ id: crypto.randomUUID(), title: newTask.trim(), due: 'No date', category: 'Personal', priority: 'Medium', completed: false }, ...current])
    setNewTask('')
    setModalOpen(false)
    notify('Task added to your list')
  }
  const toggleTask = (id: string) => setTasks(current => current.map(task => task.id === id ? { ...task, completed: !task.completed } : task))
  const capture = (value: string) => { setCapturedItems(current => [value, ...current]); notify('Added to your inbox') }
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2600) }
  const activeTitle = activeView === 'overview' ? 'Good evening' : ({ calendar: 'Calendar', tasks: 'Tasks', bills: 'Bills & subscriptions', memory: 'My Memory', inbox: 'Inbox', assistant: 'Ask Rella' } as Record<ViewId, string>)[activeView]

  return <div className="app-shell"><Sidebar activeView={activeView} onNavigate={setActiveView} onAdd={() => setModalOpen(true)} /><main className="main-area"><Topbar title={activeTitle} subtitle={subtitles[activeView]} /><div className="page-content">{activeView === 'overview' ? <Overview tasks={tasks} reminders={reminders} memories={memories} onToggleTask={toggleTask} onAddTask={() => setModalOpen(true)} onCapture={capture} onNavigate={setActiveView} /> : <SectionView view={activeView} tasks={tasks} memories={memories} onToggleTask={toggleTask} onAdd={() => setModalOpen(true)} onCapture={capture} />}</div></main>
    {modalOpen && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setModalOpen(false) }}><form className="add-modal" onSubmit={e => { e.preventDefault(); addTask() }}><div className="modal-heading"><div><span className="section-kicker">QUICK ADD</span><h2>Add to your space</h2></div><button type="button" className="subtle-icon" onClick={() => setModalOpen(false)} aria-label="Close"><X size={19} /></button></div><label htmlFor="new-task">What would you like to add?</label><input id="new-task" autoFocus value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Write a task or something to remember..." /><p className="modal-hint">For now, quick add creates a task. Use the capture box to save a note or reminder to your inbox.</p><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setModalOpen(false)}>Cancel</button><button type="submit" className="primary-button" disabled={!newTask.trim()}><Plus size={16} /> Add task</button></div></form></div>}
    {toast && <div className="toast-message">{toast}</div>}
  </div>
}
