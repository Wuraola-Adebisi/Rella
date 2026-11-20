import { useEffect, useState } from 'react'
import { initialTasks, memories as starterMemories, reminders as starterReminders } from '../data'
import type { Memory, Reminder, Task } from '../types'
import { readMockState, writeMockState, removeMockState, downloadWorkspace } from '../services/mockDatabase'

export type CalendarEvent = { id: string; title: string; date: string; time: string; location: string; notes: string }
export type Bill = { id: string; name: string; amount: number; currency: string; dueDate: string; frequency: 'One-time' | 'Weekly' | 'Monthly' | 'Yearly'; category: string; paid: boolean }
export type InboxItem = { id: string; text: string; createdAt: string; status: 'Unsorted' | 'Processed' }

type Store = { tasks: Task[]; memories: Memory[]; events: CalendarEvent[]; bills: Bill[]; inbox: InboxItem[]; reminders: Reminder[] }
const seed: Store = {
  tasks: initialTasks,
  memories: starterMemories,
  events: [
    { id: 'e1', title: 'Project check-in', date: '2026-11-25', time: '10:00', location: 'Online', notes: 'Review current progress with the product team.' },
    { id: 'e2', title: 'Family dinner', date: '2026-11-28', time: '18:30', location: '', notes: '' },
  ],
  bills: [
    { id: 'b1', name: 'Internet subscription', amount: 18500, currency: 'NGN', dueDate: '2026-11-21', frequency: 'Monthly', category: 'Utilities', paid: false },
    { id: 'b2', name: 'Domain renewal', amount: 24000, currency: 'NGN', dueDate: '2026-11-24', frequency: 'Yearly', category: 'Software', paid: false },
  ],
  inbox: [],
  reminders: starterReminders,
}
const STORAGE_KEY = 'rella.mock-store.v1'

export function useRellaStore() {
  const [store, setStore] = useState<Store>(() => {
    return readMockState<Store>(STORAGE_KEY, seed)
  })
  useEffect(() => { writeMockState(STORAGE_KEY, store) }, [store])

  const addTask = (title: string, due = 'No date', category = 'Personal', priority: Task['priority'] = 'Medium') =>
    setStore(s => ({ ...s, tasks: [{ id: crypto.randomUUID(), title, due, category, priority, completed: false }, ...s.tasks] }))
  const toggleTask = (id: string) => setStore(s => ({ ...s, tasks: s.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t) }))
  const addMemory = (title: string, detail: string, category = 'Note', person?: string) =>
    setStore(s => ({ ...s, memories: [{ id: crypto.randomUUID(), title, detail, category, date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), person }, ...s.memories] }))
  const addEvent = (event: Omit<CalendarEvent, 'id'>) => setStore(s => ({ ...s, events: [...s.events, { ...event, id: crypto.randomUUID() }].sort((a,b) => a.date.localeCompare(b.date)) }))
  const addBill = (bill: Omit<Bill, 'id' | 'paid'>) => setStore(s => ({ ...s, bills: [...s.bills, { ...bill, id: crypto.randomUUID(), paid: false }].sort((a,b) => a.dueDate.localeCompare(b.dueDate)) }))
  const toggleBillPaid = (id: string) => setStore(s => ({ ...s, bills: s.bills.map(b => b.id === id ? { ...b, paid: !b.paid } : b) }))
  const capture = (text: string) => setStore(s => ({ ...s, inbox: [{ id: crypto.randomUUID(), text, createdAt: new Date().toISOString(), status: 'Unsorted' }, ...s.inbox] }))
  const processInbox = (id: string, destination: 'task' | 'memory') => setStore(s => {
    const item = s.inbox.find(i => i.id === id)
    if (!item) return s
    const inbox = s.inbox.map(i => i.id === id ? { ...i, status: 'Processed' as const } : i)
    if (destination === 'task') return { ...s, inbox, tasks: [{ id: crypto.randomUUID(), title: item.text, due: 'No date', category: 'Personal', priority: 'Medium', completed: false }, ...s.tasks] }
    return { ...s, inbox, memories: [{ id: crypto.randomUUID(), title: item.text.slice(0, 60), detail: item.text, category: 'Note', date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) }, ...s.memories] }
  })
  const removeTask = (id: string) => setStore(s => ({ ...s, tasks: s.tasks.filter(item => item.id !== id) }))
  const updateTask = (id: string, patch: Partial<Omit<Task, 'id'>>) => setStore(s => ({ ...s, tasks: s.tasks.map(item => item.id === id ? { ...item, ...patch } : item) }))
  const removeMemory = (id: string) => setStore(s => ({ ...s, memories: s.memories.filter(item => item.id !== id) }))
  const updateMemory = (id: string, patch: Partial<Omit<Memory, 'id'>>) => setStore(s => ({ ...s, memories: s.memories.map(item => item.id === id ? { ...item, ...patch } : item) }))
  const removeEvent = (id: string) => setStore(s => ({ ...s, events: s.events.filter(item => item.id !== id) }))
  const removeBill = (id: string) => setStore(s => ({ ...s, bills: s.bills.filter(item => item.id !== id) }))
  const resetDemoData = () => { removeMockState(STORAGE_KEY); setStore(seed) }
  const exportData = () => downloadWorkspace('rella-workspace.json', store)
  return { ...store, addTask, toggleTask, addMemory, addEvent, addBill, toggleBillPaid, capture, processInbox, removeTask, updateTask, removeMemory, updateMemory, removeEvent, removeBill, resetDemoData, exportData }
}
