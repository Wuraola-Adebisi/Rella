import { useMemo, useState } from 'react'
import { Search, X, CheckSquare, Brain, CalendarDays, CreditCard, Inbox } from 'lucide-react'
import type { ViewId } from '../types'
import type { Task } from '../types'
import type { Bill, CalendarEvent, InboxItem } from '../hooks/useRellaStore'

type Props = { tasks: Task[]; memories: Memory[]; events: CalendarEvent[]; bills: Bill[]; inbox: InboxItem[]; onNavigate: (view: ViewId) => void; onClose: () => void }
export default function WorkspaceSearch({ tasks, memories, events, bills, inbox, onNavigate, onClose }: Props) {
  const [query, setQuery] = useState('')
  const groups = [
    { view: 'tasks' as ViewId, Icon: CheckSquare, type: 'Task', items: tasks.map(item => ({ title: item.title, detail: item.due })) },
    { view: 'memory' as ViewId, Icon: Brain, type: 'Memory', items: memories.map(item => ({ title: item.title, detail: item.detail })) },
    { view: 'calendar' as ViewId, Icon: CalendarDays, type: 'Event', items: events.map(item => ({ title: item.title, detail: item.date })) },
    { view: 'bills' as ViewId, Icon: CreditCard, type: 'Bill', items: bills.map(item => ({ title: item.name, detail: item.dueDate })) },
    { view: 'inbox' as ViewId, Icon: Inbox, type: 'Inbox', items: inbox.map(item => ({ title: item.text, detail: item.status })) },
  ]
  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return []
    return groups.flatMap(group => group.items.filter(item => (item.title + ' ' + item.detail).toLowerCase().includes(term)).map(item => ({ ...item, view: group.view, Icon: group.Icon, type: group.type }))).slice(0, 12)
  }, [query, tasks, memories, events, bills, inbox])
  return <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}><section className="add-modal global-search-modal"><div className="modal-heading"><div><span className="section-kicker">WORKSPACE SEARCH</span><h2>Find something in Rella</h2></div><button type="button" className="subtle-icon" onClick={onClose} aria-label="Close"><X size={19} /></button></div><div className="global-search-input"><Search size={17} /><input autoFocus value={query} onChange={event => setQuery(event.target.value)} placeholder="Search tasks, memories, events, bills and captures…" /></div><div className="global-search-results">{query.trim() ? results.length ? results.map((item,index) => <button key={item.type + item.title + index} onClick={() => { onNavigate(item.view); onClose() }}><span className="global-result-icon"><item.Icon size={15} /></span><span><strong>{item.title}</strong><small>{item.type} · {item.detail}</small></span></button>) : <p className="empty-copy">No matching records. Try another search.</p> : <p className="empty-copy">Search across everything you've saved in this workspace.</p>}</div></section></div>
}
