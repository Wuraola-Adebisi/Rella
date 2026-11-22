import { ArrowRight, ArrowUpRight, CalendarDays, Check, CheckCircle2, Clock3, CreditCard, MessageCircle, Sparkles } from 'lucide-react'

export default function LandingPage({ onEnter }: { onEnter: () => void }) {
  return <main className="landing">
    <header className="landing-nav">
      <a className="landing-brand" href="#top" aria-label="Rella home"><span className="landing-mark">r</span> rella</a>
      <nav aria-label="Main navigation"><a href="#how-it-works">How it works</a><a href="#inside">Inside Rella</a></nav>
      <button className="landing-nav-cta" onClick={onEnter}>Open Rella <ArrowUpRight size={16}/></button>
    </header>
    <section className="landing-hero" id="top">
      <div className="landing-copy">
        <span className="landing-eyebrow"><i/> A LITTLE MORE HEADSPACE</span>
        <h1>Your life has a lot going on.<br/><em>Keep it all together.</em></h1>
        <p>Plans, responsibilities, payments and the little details you don't want to forget. Rella gives them one thoughtful place to live.</p>
        <div className="landing-actions"><button className="landing-primary" onClick={onEnter}>Get started <ArrowRight size={17}/></button><a href="#how-it-works">See how it works <span>↓</span></a></div>
        <div className="landing-proof"><div className="proof-avatars"><span>W</span><span>J</span><span>A</span></div><span>One calmer place for everyday life.</span></div>
      </div>
      <div className="landing-visual" aria-label="Preview of the Rella app">
        <div className="visual-orbit orbit-one"/><div className="visual-orbit orbit-two"/>
        <div className="visual-note note-top"><span className="note-icon"><Check size={14}/></span><span><strong>One less thing to remember</strong><small>Everything has its place</small></span></div>
        <div className="preview-window">
          <div className="preview-head"><div className="preview-brand"><span>r</span> rella</div><div className="preview-profile">W</div></div>
          <div className="preview-greeting"><small>MONDAY, NOVEMBER 23</small><h3>A little more room<br/>for your day.</h3></div>
          <div className="preview-capture"><Sparkles size={15}/><span>What’s on your mind?</span><span className="capture-arrow">↑</span></div>
          <div className="preview-section-head"><strong>On your mind</strong><span>See all</span></div>
          <div className="preview-task"><span className="fake-check"><Check size={11}/></span><span><b>Send the project update</b><small>Today · Work</small></span><i>Today</i></div>
          <div className="preview-task"><span className="fake-check"/><span><b>Pick up a few things</b><small>Tomorrow · Personal</small></span><i>Tomorrow</i></div>
          <div className="preview-bottom"><div><CalendarDays size={15}/><span>Plans</span></div><div><CreditCard size={15}/><span>Payments</span></div><div><MessageCircle size={15}/><span>Ask Rella</span></div></div>
        </div>
        <div className="visual-note note-bottom"><span className="note-spark"><Sparkles size={15}/></span><span><strong>“When is that appointment?”</strong><small>Just ask Rella.</small></span></div>
      </div>
      <div className="landing-scroll">SCROLL TO EXPLORE <span>↓</span></div>
    </section>
    <section className="landing-manifesto" id="how-it-works">
      <span className="landing-eyebrow">LESS KEEPING TRACK. MORE LIVING.</span>
      <h2>Get it out of your head.<br/><em>Keep it close when you need it.</em></h2>
      <p>Rella brings the moving pieces of everyday life together, without asking you to manage another complicated system.</p>
      <div className="manifesto-steps"><article><span>01</span><strong>Put it somewhere</strong><p>Save a task, a date, a payment or a detail in seconds.</p></article><article><span>02</span><strong>Find it when it matters</strong><p>Your information stays organised and easy to come back to.</p></article><article><span>03</span><strong>Ask instead of searching</strong><p>Ask Rella about the things you've saved and get a clearer answer.</p></article></div>
    </section>
    <section className="landing-inside" id="inside">
      <div className="inside-heading"><span className="landing-eyebrow">A PLACE FOR THE WHOLE PICTURE</span><h2>Everything important.<br/><em>Nothing overwhelming.</em></h2></div>
      <div className="inside-grid">
        <article className="inside-card inside-large"><div className="inside-icon"><CalendarDays size={19}/></div><span>YOUR TIME</span><h3>Know what’s coming.</h3><p>Keep plans, appointments and important dates together so fewer things catch you off guard.</p><div className="mini-calendar"><div><small>MON</small><b>23</b></div><div className="today-date"><small>TUE</small><b>24</b></div><div><small>WED</small><b>25</b></div><div><small>THU</small><b>26</b></div><div><small>FRI</small><b>27</b></div></div></article>
        <article className="inside-card"><div className="inside-icon peach"><CheckCircle2 size={19}/></div><span>YOUR RESPONSIBILITIES</span><h3>Keep the next thing clear.</h3><p>Tasks and everyday commitments, without the noise.</p><div className="mini-lines"><i/><i/><i/></div></article>
        <article className="inside-card"><div className="inside-icon lilac"><CreditCard size={19}/></div><span>YOUR PAYMENTS</span><h3>Stay ahead of due dates.</h3><p>Keep track of bills and subscriptions in one simple view.</p><div className="payment-chip"><Clock3 size={14}/> Next payment · Nov 28</div></article>
        <article className="inside-card inside-memory"><div className="inside-icon"><Sparkles size={19}/></div><span>YOUR MEMORY</span><h3>Keep the details that matter.</h3><p>People, places, preferences and little things worth remembering. Search them or simply ask.</p><div className="memory-tags"><i>People</i><i>Places</i><i>Notes</i><i>Recommendations</i></div></article>
      </div>
    </section>
    <section className="landing-closer"><span className="landing-eyebrow">MAKE A LITTLE MORE ROOM</span><h2>Life is full enough.<br/><em>Let Rella hold the details.</em></h2><button className="landing-primary" onClick={onEnter}>Step inside Rella <ArrowRight size={17}/></button><small>A calmer place to keep track of it all.</small></section>
    <footer className="landing-footer"><a className="landing-brand" href="#top"><span className="landing-mark">r</span> rella</a><span>Make room for what matters.</span><span>© 2026 Rella</span></footer>
  </main>
}
