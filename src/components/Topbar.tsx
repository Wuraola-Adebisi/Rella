import { Bell, Search, Command } from 'lucide-react'

export default function Topbar({ title, subtitle, onSearch, onNotifications, displayName }: { title: string; subtitle: string; onSearch: () => void; onNotifications: () => void; displayName: string }) {
  return <header className="topbar"><div className="mobile-brand"><span className="brand-mark">r</span><span className="brand-name">rella</span></div><div className="page-heading"><span className="eyebrow">PERSONAL SPACE</span><h1>{title}</h1><p>{subtitle}</p></div><div className="topbar-actions"><button className="search-trigger" onClick={onSearch}><Search size={16} /><span>Search anything...</span><kbd><Command size={11} /> K</kbd></button><button className="icon-button notification-button" aria-label="Notifications" onClick={onNotifications}><Bell size={18} /><i /></button><span className="topbar-avatar">{displayName.split(' ').filter(Boolean).map(part => part[0]).join('').slice(0,2).toUpperCase()}</span></div></header>
}
