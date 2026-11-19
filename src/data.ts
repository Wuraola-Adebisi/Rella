import type { Memory, Reminder, Task } from './types'

export const initialTasks: Task[] = [
  { id: 't1', title: 'Send the revised proposal to Tolu', due: 'Today', category: 'Work', priority: 'High', completed: false },
  { id: 't2', title: 'Book a dentist appointment', due: 'Today', category: 'Personal', priority: 'Medium', completed: false },
  { id: 't3', title: 'Review December travel options', due: 'Tomorrow', category: 'Personal', priority: 'Medium', completed: false },
  { id: 't4', title: 'Renew domain registration', due: 'Nov 24', category: 'Admin', priority: 'Low', completed: true },
]

export const reminders: Reminder[] = [
  { id: 'r1', title: 'Internet subscription', detail: '₦18,500 · Renews monthly', date: 'Tomorrow', kind: 'bill' },
  { id: 'r2', title: 'Call Mum', detail: 'Personal reminder', date: 'Nov 23', kind: 'task' },
  { id: 'r3', title: 'Project check-in', detail: 'With the product team', date: 'Nov 25', kind: 'event' },
]

export const memories: Memory[] = [
  { id: 'm1', title: 'Nok — seafood pasta', detail: 'Sarah recommended trying the seafood pasta. She said to go in the evening.', category: 'Recommendation', date: 'Nov 18', person: 'Sarah' },
  { id: 'm2', title: 'December family trip', detail: 'Need to discuss dates and accommodation with my sister.', category: 'Plan', date: 'Nov 16', person: 'My sister' },
  { id: 'm3', title: 'Preferred work hours', detail: 'Most focused between 9:00 am and 1:00 pm.', category: 'Preference', date: 'Nov 12' },
]
