import { useEffect, useRef, useState } from 'react'
import { ArrowUp, Brain, CalendarDays, Check, Clock3, CreditCard, MessageCircle, Plus, RotateCcw, Sparkles, UserRound } from 'lucide-react'
import type { Memory, Task } from '../types'
import type { AssistantAction, AssistantContext } from '../services/mockAssistant'
import { runMockAssistant } from '../services/mockAssistant'
import type { Bill, CalendarEvent, InboxItem } from '../hooks/useRellaStore'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: { type: string; title: string; detail: string }[]
  action?: AssistantAction
  actionState?: 'pending' | 'done' | 'dismissed'
  intent?: string
  createdAt: string
}

type Props = {
  tasks: Task[]; memories: Memory[]; events: CalendarEvent[]; bills: Bill[]; inbox: InboxItem[]
  onAddTask: (title: string, due?: string, category?: string, priority?: Task['priority']) => void
  onAddMemory: (title: string, detail: string, category?: string, person?: string) => void
  onAddEvent: (event: Omit<CalendarEvent, 'id'>) => void
}

const STORAGE_KEY = 'rella.mock-assistant.v1'
const starterPrompts = [
  { label: 'What should I take care of?', icon: Clock3, prompt: 'What do I need to take care of this week?' },
  { label: 'Find a recommendation', icon: Brain, prompt: 'What restaurant did Sarah recommend?' },
  { label: 'Upcoming payments', icon: CreditCard, prompt: 'What subscriptions are coming up?' },
  { label: 'My calendar', icon: CalendarDays, prompt: 'What is coming up in my calendar?' },
]
const id = () => typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`

export default function AssistantView({ tasks, memories, events, bills, inbox, onAddTask, onAddMemory, onAddEvent }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as ChatMessage[] }
    catch { return [] }
  })
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const context: AssistantContext = { tasks, memories, events, bills, inbox }

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)) }, [messages])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [messages])

  const send = (value = draft) => {
    const content = value.trim()
    if (!content || busy) return
    setBusy(true)
    const userMessage: ChatMessage = { id: id(), role: 'user', content, createdAt: new Date().toISOString() }
    const result = runMockAssistant(content, context, messages)
    const assistantMessage: ChatMessage = { id: id(), role: 'assistant', content: result.message, sources: result.sources, action: result.action, actionState: result.action ? 'pending' : undefined, intent: result.intent, createdAt: new Date().toISOString() }
    setMessages(current => [...current, userMessage, assistantMessage])
    setDraft('')
    window.setTimeout(() => setBusy(false), 240)
  }

  const confirmAction = (message: ChatMessage) => {
    if (!message.action || message.actionState !== 'pending') return
    const action = message.action
    if (action.type === 'create_task') onAddTask(action.title, action.due, action.category, action.priority)
    if (action.type === 'create_memory') onAddMemory(action.title, action.detail, action.category, action.person)
    if (action.type === 'create_event') onAddEvent(action)
    setMessages(current => current.map(item => item.id === message.id ? { ...item, actionState: 'done', content: action.type === 'create_task' ? 'Your task has been added.' : action.type === 'create_memory' ? 'Saved to My Memory.' : 'Your event has been added to the calendar.' } : item))
  }

  const dismissAction = (message: ChatMessage) => setMessages(current => current.map(item => item.id === message.id ? { ...item, actionState: 'dismissed' } : item))
  const clearConversation = () => { setMessages([]); localStorage.removeItem(STORAGE_KEY) }
  const actionLabel = (action: AssistantAction) => action.type === 'create_task' ? 'Add task' : action.type === 'create_memory' ? 'Save memory' : 'Add to calendar'
  const actionTitle = (action: AssistantAction) => action.type === 'create_task' ? action.title : action.type === 'create_memory' ? action.title : action.title
  const actionDetail = (action: AssistantAction) => action.type === 'create_task' ? `${action.category} · ${action.priority} priority · ${action.due}` : action.type === 'create_memory' ? action.detail : `${action.date} · ${action.time}`

  return <section className="rella-assistant">
    <div className="assistant-workspace">
      <div className="assistant-chat-column">
        <div className="assistant-chat-header">
          <div className="assistant-avatar"><Sparkles size={18} /></div>
          <div><strong>Rella</strong><span><i /> Personal assistant</span></div>
          <button className="assistant-clear" onClick={clearConversation} title="Clear conversation"><RotateCcw size={15} /><span>New chat</span></button>
        </div>
        <div className="assistant-messages" aria-live="polite">
          {!messages.length && <div className="assistant-welcome">
            <div className="assistant-welcome-mark"><MessageCircle size={25} /></div>
            <span className="section-kicker">A LITTLE MORE HEADSPACE</span>
            <h3>What would you like to figure out?</h3>
            <p>Ask about something you've saved, get a clearer view of your commitments, or tell me what you need to remember.</p>
            <div className="assistant-prompt-grid">{starterPrompts.map(item => { const Icon = item.icon; return <button key={item.prompt} onClick={() => send(item.prompt)}><Icon size={16} /><span>{item.label}</span><small>{item.prompt}</small></button> })}</div>
          </div>}
          {messages.map(item => <article className={`chat-message chat-${item.role}`} key={item.id}>
            <div className="chat-avatar">{item.role === 'assistant' ? <Sparkles size={15} /> : <UserRound size={15} />}</div>
            <div className="chat-message-body">
              <div className="chat-message-meta"><strong>{item.role === 'assistant' ? 'Rella' : 'You'}</strong><time>{new Date(item.createdAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</time></div>
              <p>{item.content}</p>
              {!!item.sources?.length && <div className="assistant-source-list">{item.sources.map((source, index) => <div className="assistant-source" key={`${item.id}-${index}`}><span>{source.type}</span><strong>{source.title}</strong><p>{source.detail}</p></div>)}</div>}
              {item.action && item.actionState === 'pending' && <div className="assistant-action-card"><div><span>PROPOSED ACTION</span><strong>{actionTitle(item.action)}</strong><p>{actionDetail(item.action)}</p></div><div className="assistant-action-buttons"><button className="secondary-button" onClick={() => dismissAction(item)}>Not now</button><button className="primary-button" onClick={() => confirmAction(item)}><Check size={14} /> {actionLabel(item.action)}</button></div></div>}
              {item.actionState === 'done' && <span className="assistant-action-status"><Check size={13} /> Saved to your Rella workspace</span>}
              {item.actionState === 'dismissed' && <span className="assistant-dismissed">Action dismissed. Nothing was changed.</span>}
            </div>
          </article>)}
          <div ref={bottomRef} />
        </div>
        <form className="assistant-message-form" onSubmit={event => { event.preventDefault(); send() }}>
          <textarea value={draft} onChange={event => setDraft(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); send() } }} placeholder="Message Rella…" rows={2} aria-label="Message Rella" />
          <div><span>Enter to send · Shift + Enter for a new line</span><button type="submit" disabled={!draft.trim() || busy} aria-label="Send message"><ArrowUp size={17} /></button></div>
        </form>
        <p className="assistant-footnote">Rella's responses are generated from this workspace's saved information. Review suggested actions before confirming.</p>
      </div>
      <aside className="assistant-context-panel">
        <span className="section-kicker">YOUR SPACE</span>
        <h3>Connected context</h3>
        <p>Rella can look across the information you've saved here.</p>
        <div className="assistant-context-stat"><span><Check size={14} /> Open tasks</span><strong>{tasks.filter(item => !item.completed).length}</strong></div>
        <div className="assistant-context-stat"><span><Brain size={14} /> Saved memories</span><strong>{memories.length}</strong></div>
        <div className="assistant-context-stat"><span><CalendarDays size={14} /> Upcoming events</span><strong>{events.filter(item => item.date >= new Date().toISOString().slice(0, 10)).length}</strong></div>
        <div className="assistant-context-stat"><span><CreditCard size={14} /> Unpaid bills</span><strong>{bills.filter(item => !item.paid).length}</strong></div>
        <div className="assistant-context-note"><Plus size={15} /><span>New details you capture become part of this context.</span></div>
      </aside>
    </div>
  </section>
}
