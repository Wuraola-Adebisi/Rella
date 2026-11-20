export type ViewId = 'overview' | 'calendar' | 'tasks' | 'bills' | 'memory' | 'inbox' | 'assistant'

export type Task = {
  id: string
  title: string
  due: string
  category: string
  priority: 'High' | 'Medium' | 'Low'
  completed: boolean
}

export type Reminder = {
  id: string
  title: string
  detail: string
  date: string
  kind: 'bill' | 'event' | 'task'
}

export type Memory = {
  id: string
  title: string
  detail: string
  category: string
  date: string
  person?: string
}
