import { useState } from 'react'
import { ArrowUp, Sparkles } from 'lucide-react'

export default function QuickCapture({ onSubmit }: { onSubmit: (value: string) => void }) {
  const [value, setValue] = useState('')
  const submit = () => { if (value.trim()) { onSubmit(value.trim()); setValue('') } }
  return <div className="capture-card"><div className="capture-topline"><span className="capture-icon"><Sparkles size={16} /></span><div><strong>Get it out of your head.</strong><p>Tell Rella what you want to remember or take care of.</p></div></div><div className="capture-input-wrap"><textarea value={value} onChange={e => setValue(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() } }} placeholder="e.g. Remind me to call Sarah about the trip on Friday..." rows={2} /><div className="capture-controls"><span>Rella will help organise it</span><button className="capture-send" onClick={submit} disabled={!value.trim()} aria-label="Save capture"><ArrowUp size={17} /></button></div></div></div>
}
