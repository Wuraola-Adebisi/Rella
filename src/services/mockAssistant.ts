import type { Memory, Task } from '../types'
import type { Bill, CalendarEvent, InboxItem } from '../hooks/useRellaStore'

export type AssistantAction =
  | { type: 'create_task'; title: string; due: string; category: string; priority: Task['priority'] }
  | { type: 'create_memory'; title: string; detail: string; category: string; person?: string }
  | { type: 'create_event'; title: string; date: string; time: string; location: string; notes: string }

export type AssistantContext = {
  tasks: Task[]
  memories: Memory[]
  events: CalendarEvent[]
  bills: Bill[]
  inbox: InboxItem[]
}

export type AssistantResult = {
  intent: string
  message: string
  sources: { type: string; title: string; detail: string }[]
  action?: AssistantAction
}

const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
const formatMoney = (amount: number, currency: string) => {
  try { return new Intl.NumberFormat(undefined, { style: 'currency', currency, maximumFractionDigits: 2 }).format(amount) }
  catch { return `${currency} ${amount.toLocaleString()}` }
}
const dateLabel = (value: string) => {
  if (!value || value === 'No date') return value
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}
const extractDue = (text: string) => {
  const lower = text.toLowerCase()
  const now = new Date()
  if (lower.includes('tomorrow')) { now.setDate(now.getDate() + 1); return dateLabel(now.toISOString().slice(0, 10)) }
  if (lower.includes('today')) return 'Today'
  const match = lower.match(/by ([a-z]+ \d{1,2})/i)
  return match?.[1] ?? 'No date'
}

export function runMockAssistant(rawMessage: string, context: AssistantContext): AssistantResult {
  const message = rawMessage.trim()
  const q = normalise(message)
  const today = new Date().toISOString().slice(0, 10)
  const openTasks = context.tasks.filter(item => !item.completed)
  const unpaidBills = context.bills.filter(item => !item.paid)
  const upcomingEvents = context.events.filter(item => item.date >= today).sort((a, b) => a.date.localeCompare(b.date))
  const memoryMatches = context.memories.filter(item => normalise([item.title, item.detail, item.category, item.person ?? ''].join(' ')).split(' ').some(word => word.length > 2 && q.includes(word)))
  const personMatch = context.memories.filter(item => item.person && q.includes(normalise(item.person)))

  if (/^(schedule|book)\b/.test(q) || /^(add|create) (a )?(calendar )?event\b/.test(q)) {
    const isoMatch = message.match(/\b(20\d{2}-\d{2}-\d{2})\b/)
    const relativeDate = q.includes('tomorrow') || q.includes('today')
    if (!isoMatch && !relativeDate) return { intent: 'create_event', message: 'What date should I put this on? I need a specific date before adding it to your calendar.', sources: [] }
    const date = isoMatch?.[1] ?? (() => { const value = new Date(); if (q.includes('tomorrow')) value.setDate(value.getDate() + 1); return value.toISOString().slice(0, 10) })()
    const clockMatch = message.match(/\b(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/i)
    const twentyFourHour = message.match(/\b([01]\d|2[0-3]):([0-5]\d)\b/)
    const time = clockMatch ? (() => { let hour = Number(clockMatch[1]) % 12; if (clockMatch[3].toLowerCase() === 'pm') hour += 12; return String(hour).padStart(2, '0') + ':' + (clockMatch[2] ?? '00') })() : (twentyFourHour?.[0] ?? '09:00')
    const title = message.replace(/^(please\s+)?(schedule|book|add|create)\s+(a\s+)?(calendar\s+)?(event|meeting)?\s*(called|for|to)?\s*/i, '').replace(/\b(today|tomorrow)\b.*$/i, '').replace(/\bon\s+20\d{2}-\d{2}-\d{2}.*$/i, '').trim() || 'New event'
    return { intent: 'create_event', message: 'I can add this to your calendar. Review the date and time before saving.', sources: [], action: { type: 'create_event', title, date, time, location: '', notes: '' } }
  }
  if (/^(add|create|make|remind me to|remember to)\b/.test(q) || /\b(add a task|create a task|new task)\b/.test(q)) {
    const title = message.replace(/^(please\s+)?(add|create|make)\s+(a\s+)?(task\s+to\s+)?/i, '').replace(/^(remind me to|remember to)\s+/i, '').trim()
    if (title.length < 3) return { intent: 'create_task', message: 'What should I put on your task list?', sources: [] }
    return {
      intent: 'create_task',
      message: 'I can add this to your task list. Review the details before I save it.',
      sources: [],
      action: { type: 'create_task', title: title.replace(/\s+(today|tomorrow)$/i, '').trim(), due: extractDue(message), category: 'Personal', priority: 'Medium' },
    }
  }

  if (/^(remember that|save this|keep a note)\b/.test(q)) {
    const detail = message.replace(/^(remember that|save this|keep a note)\s*/i, '').trim()
    const title = detail.length > 58 ? `${detail.slice(0, 55)}…` : detail
    return { intent: 'create_memory', message: 'I can save this in My Memory. Check the wording before saving.', sources: [], action: { type: 'create_memory', title: title || 'New memory', detail, category: 'Note' } }
  }

  if (/bill|subscription|payment|renewal|renew/.test(q)) {
    const items = unpaidBills.sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    return {
      intent: 'retrieve_bills',
      message: items.length ? `You have ${items.length} unpaid bill${items.length === 1 ? '' : 's'} saved. Here are the next ones due:` : 'There are no unpaid bills in your saved records.',
      sources: items.slice(0, 6).map(item => ({ type: 'Bill', title: item.name, detail: `${formatMoney(item.amount, item.currency)} · Due ${dateLabel(item.dueDate)} · ${item.frequency}` })),
    }
  }

  if (/calendar|event|appointment|schedule|meeting|what.*coming up/.test(q)) {
    return {
      intent: 'retrieve_events',
      message: upcomingEvents.length ? 'Here are the upcoming events currently saved in your calendar.' : 'Your calendar has no upcoming events saved.',
      sources: upcomingEvents.slice(0, 6).map(item => ({ type: 'Calendar event', title: item.title, detail: `${dateLabel(item.date)} at ${item.time}${item.location ? ` · ${item.location}` : ''}` })),
    }
  }

  if (/task|todo|to do|what.*do|what.*need|this week|overdue/.test(q)) {
    return {
      intent: 'retrieve_tasks',
      message: openTasks.length ? `You have ${openTasks.length} open task${openTasks.length === 1 ? '' : 's'}. Here's what is still on your list:` : 'You have no open tasks at the moment.',
      sources: openTasks.slice(0, 8).map(item => ({ type: 'Task', title: item.title, detail: `${item.category} · ${item.priority} priority · ${item.due}` })),
    }
  }

  if (/inbox|captured|unsorted/.test(q)) {
    const items = context.inbox.filter(item => item.status === 'Unsorted')
    return { intent: 'retrieve_inbox', message: items.length ? `There ${items.length === 1 ? 'is' : 'are'} ${items.length} item${items.length === 1 ? '' : 's'} waiting in your Inbox.` : 'Your Inbox is clear. There are no unsorted captures.', sources: items.slice(0, 6).map(item => ({ type: 'Inbox', title: item.text, detail: new Date(item.createdAt).toLocaleDateString() })) }
  }

  if (/recommend|restaurant|food|eat|place|where/.test(q) || personMatch.length) {
    const matches = context.memories.filter(item => /recommend|restaurant|food|pasta|cafe|place/i.test([item.title, item.detail, item.category].join(' ')) || (item.person && q.includes(normalise(item.person))))
    const selected = matches.length ? matches : memoryMatches
    return { intent: 'retrieve_memory', message: selected.length ? 'I found these details in My Memory. I am only showing information that has actually been saved.' : 'I could not find a matching recommendation or place in your saved memories.', sources: selected.slice(0, 6).map(item => ({ type: item.category, title: item.title, detail: `${item.detail}${item.person ? ` · Connected to ${item.person}` : ''}` })) }
  }

  if (memoryMatches.length) {
    return { intent: 'retrieve_memory', message: 'I found a few saved details that may be relevant.', sources: memoryMatches.slice(0, 6).map(item => ({ type: item.category, title: item.title, detail: `${item.detail}${item.person ? ` · Connected to ${item.person}` : ''}` })) }
  }

  return {
    intent: 'no_match',
    message: 'I could not find a reliable match in your saved information. Try asking about a person, recommendation, task, bill, calendar event or something you captured. You can also tell me to “remember that…” or “add a task to…”.',
    sources: [],
  }
}
