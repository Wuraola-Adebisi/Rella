import { useEffect, useMemo, useState } from 'react'
import { initialTasks, memories as starterMemories } from '../data'
import type { Memory, Reminder, Task } from '../types'
import { readMockState, writeMockState, removeMockState, downloadWorkspace } from '../services/mockDatabase'

export type CalendarEvent = { id: string; title: string; date: string; time: string; location: string; notes: string }
export type Bill = { id: string; name: string; amount: number; currency: string; dueDate: string; frequency: 'One-time' | 'Weekly' | 'Monthly' | 'Yearly'; category: string; paid: boolean }
export type InboxItem = { id: string; text: string; createdAt: string; status: 'Unsorted' | 'Processed' }

type Store = { tasks: Task[]; memories: Memory[]; events: CalendarEvent[]; bills: Bill[]; inbox: InboxItem[] }
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
}
const STORAGE_KEY = 'rella.mock-store.v1'
const localDate = (date: Date) => [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-')
const parseTaskDue = (value: string): string | null => {
  if (!value || value === 'No date') return null
  const now = new Date()
  if (value.toLowerCase() === 'today') return localDate(now)
  if (value.toLowerCase() === 'tomorrow') { now.setDate(now.getDate() + 1); return localDate(now) }
  if (/^20\\d{2}-\\d{2}-\\d{2}$/.test(value)) return value
  const named = value.match(/^([A-Za-z]{3})\\s+(\\d{1,2})$/)
  if (named) {
    const parsed = new Date(now.getFullYear(), new Date(`${named[1]} 1, ${now.getFullYear()}`).getMonth(), Number(named[2]))
    if (parsed.getTime() < new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()) parsed.setFullYear(parsed.getFullYear() + 1)
    return localDate(parsed)
  }
  return null
}
const dateLabel = (iso: string) => {
  const date = new Date(`${iso}T12:00:00`)
  const today = localDate(new Date())
  const tomorrowDate = new Date(); tomorrowDate.setDate(tomorrowDate.getDate() + 1)
  if (iso === today) return 'Today'
  if (iso === localDate(tomorrowDate)) return 'Tomorrow'
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function useRellaStore() {
  const [store, setStore] = useState<Store>(() => readMockState<Store>(STORAGE_KEY, seed))
  useEffect(() => { writeMockState(STORAGE_KEY, store) }, [store])

  const reminders = useMemo<Reminder[]>(() => {
    const today = localDate(new Date())
    const taskReminders = store.tasks.filter(task => !task.completed).flatMap(task => {
      const due = parseTaskDue(task.due)
      return due && due >= today ? [{ id: `task-${task.id}`, title: task.title, detail: `${task.category} · ${task.priority} priority`, date: dateLabel(due), kind: 'task' as const, sortDate: due }] : []
    })
    const eventReminders = store.events.filter(event => event.date >= today).map(event => ({
      id: `event-${event.id}`, title: event.title, detail: [event.location, event.time].filter(Boolean).join(' · '), date: dateLabel(event.date), kind: 'event' as const, sortDate: event.date,
    }))
    const billReminders = store.bills.filter(bill => !bill.paid).map(bill => ({
      id: `bill-${bill.id}`, title: bill.name, detail: `${new Intl.NumberFormat(undefined, { style: 'currency', currency: bill.currency, maximumFractionDigits: 0 }).format(bill.amount)} · ${bill.frequency === 'One-time' ? 'Payment due' : 'Renews'}`, date: dateLabel(bill.dueDate), kind: 'bill' as const, sortDate: bill.dueDate,
    }))
    return [...taskReminders, ...eventReminders, ...billReminders].sort((a, b) => a.sortDate.localeCompare(b.sortDate)).slice(0, 8).map(({ sortDate: _sortDate, ...item }) => item)
  }, [store.tasks, store.events, store.bills])

  const addTask = (title: string, due = 'No date', category = 'Personal', priority: Task['priority'] = 'Medium') =>
    setStore(s => ({ ...s, tasks: [{ id: crypto.randomUUID(), title, due, category, priority, completed: false }, ...s.tasks] }))
  const toggleTask = (id: string) => setStore(s => ({ ...s, tasks: s.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t) }))
  const addMemory = (title: string, detail: string, category = 'Note', person?: string) =>
    setStore(s => ({ ...s, memories: [{ id: crypto.randomUUID(), title, detail, category, date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), person }, ...s.memories] }))
  const addEvent = (event: Omit<CalendarEvent, 'id'>) => setStore(s => ({ ...s, events: [...s.events, { ...event, id: crypto.randomUUID() }].sort((a,b) => a.date.localeCompare(b.date)) }))
  const updateEvent = (id: string, patch: Partial<Omit<CalendarEvent, 'id'>>) => setStore(s => ({ ...s, events: s.events.map(item => item.id === id ? { ...item, ...patch } : item).sort((a,b) => a.date.localeCompare(b.date)) }))
  const addBill = (bill: Omit<Bill, 'id' | 'paid'>) => setStore(s => ({ ...s, bills: [...s.bills, { ...bill, id: crypto.randomUUID(), paid: false }].sort((a,b) => a.dueDate.localeCompare(b.dueDate)) }))
  const updateBill = (id: string, patch: Partial<Omit<Bill, 'id'>>) => setStore(s => ({ ...s, bills: s.bills.map(item => item.id === id ? { ...item, ...patch } : item).sort((a,b) => a.dueDate.localeCompare(b.dueDate)) }))
  const toggleBillPaid = (id: string) => setStore(s => ({ ...s, bills: s.bills.map(b => b.id === id ? { ...b, paid: !b.paid } : b) }))
  const capture = (text: string) => setStore(s => ({ ...s, inbox: [{ id: crypto.randomUUID(), text, createdAt: new Date().toISOString(), status: 'Unsorted' }, ...s.inbox] }))
  const processInbox = (id: string, destination: 'task' | 'memory') => setStore(s => {
    const item = s.inbox.find(i => i.id === id)
    if (!item) return s
    const inbox = s.inbox.map(i => i.id === id ? { ...i, status: 'Processed' as const } : i)
    if (destination === 'task') return { ...s, inbox, tasks: [{ id: crypto.randomUUID(), title: item.text, due: 'No date', category: 'Personal', priority: 'Medium', completed: false }, ...s.tasks] }
    return { ...s, inbox, memories: [{ id: crypto.randomUUID(), title: item.text.slice(0, 60), detail: item.text, category: 'Note', date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) }, ...s.memories] }
  })
  const restoreInbox = (id: string) => setStore(s => ({ ...s, inbox: s.inbox.map(item => item.id === id ? { ...item, status: 'Unsorted' } : item) }))
  const removeInbox = (id: string) => setStore(s => ({ ...s, inbox: s.inbox.filter(item => item.id !== id) }))
  const removeTask = (id: string) => setStore(s => ({ ...s, tasks: s.tasks.filter(item => item.id !== id) }))
  const updateTask = (id: string, patch: Partial<Omit<Task, 'id'>>) => setStore(s => ({ ...s, tasks: s.tasks.map(item => item.id === id ? { ...item, ...patch } : item) }))
  const removeMemory = (id: string) => setStore(s => ({ ...s, memories: s.memories.filter(item => item.id !== id) }))
  const updateMemory = (id: string, patch: Partial<Omit<Memory, 'id'>>) => setStore(s => ({ ...s, memories: s.memories.map(item => item.id === id ? { ...item, ...patch } : item) }))
  const removeEvent = (id: string) => setStore(s => ({ ...s, events: s.events.filter(item => item.id !== id) }))
  const removeBill = (id: string) => setStore(s => ({ ...s, bills: s.bills.filter(item => item.id !== id) }))
  const resetDemoData = () => { removeMockState(STORAGE_KEY); setStore(seed) }
  const exportData = () => downloadWorkspace('rella-workspace.json', store)
  return { ...store, reminders, addTask, toggleTask, addMemory, addEvent, updateEvent, addBill, updateBill, toggleBillPaid, capture, processInbox, restoreInbox, removeInbox, removeTask, updateTask, removeMemory, updateMemory, removeEvent, removeBill, resetDemoData, exportData }
}
