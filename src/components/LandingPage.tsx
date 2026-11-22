import { ArrowRight, ArrowUpRight, CalendarDays, Check, CheckCircle2, Clock3, CreditCard, MessageCircle, Search, Bookmark, Inbox, Wallet } from 'lucide-react'

const photos = {
  workspace: 'https://images.pexels.com/photos/34147402/pexels-photo-34147402.jpeg?auto=compress&cs=tinysrgb&w=1600',
  finances: 'https://images.pexels.com/photos/5900029/pexels-photo-5900029.jpeg?auto=compress&cs=tinysrgb&w=1400',
  calendar: 'https://images.pexels.com/photos/5908729/pexels-photo-5908729.jpeg?auto=compress&cs=tinysrgb&w=1400',
}

export default function LandingPage({ onEnter }: { onEnter: () => void }) {
  return <main className="landing">
    <header className="landing-nav">
      <a className="landing-brand" href="#top" aria-label="Rella home"><span className="landing-mark">r</span> rella</a>
      <nav aria-label="Main navigation"><a href="#how-it-works">How it works</a><a href="#what-you-can-manage">What you can manage</a><a href="#ask-rella">Ask Rella</a></nav>
      <button className="landing-nav-cta" onClick={onEnter}>Open Rella <ArrowUpRight size={16}/></button>
    </header>

    <section className="landing-hero" id="top">
      <div className="landing-copy">
        <span className="landing-eyebrow"><i/> KEEP YOUR EVERYDAY LIFE ORGANised</span>
        <h1>Keep your plans,<br/>tasks and important details <em>in one place.</em></h1>
        <p>Rella helps you keep track of tasks, appointments, bills and useful information, so you know what needs doing and where to find what matters.</p>
        <div className="landing-actions"><button className="landing-primary" onClick={onEnter}>Open your space <ArrowRight size={17}/></button><a href="#how-it-works">See how it works <span>↓</span></a></div>
        <div className="landing-proof"><span className="landing-proof-icon"><CheckCircle2 size={17}/></span><span>One place for the things you need to remember.</span></div>
      </div>
      <div className="landing-visual" aria-label="Preview of the Rella workspace">
        <div className="visual-orbit orbit-one"/><div className="visual-orbit orbit-two"/>
        <div className="visual-note note-top"><span className="note-icon"><Check size={14}/></span><span><strong>Your details, organised</strong><small>Plans, payments and saved notes</small></span></div>
        <div className="preview-window">
          <div className="preview-head"><div className="preview-brand"><span>r</span> rella</div><div className="preview-profile">W</div></div>
          <div className="preview-greeting"><small>YOUR SPACE</small><h3>Everything you need<br/>to keep track of.</h3></div>
          <div className="preview-capture"><Inbox size={15}/><span>Add a task, note or reminder...</span><span className="capture-arrow">↑</span></div>
          <div className="preview-section-head"><strong>Tasks to do</strong><span>View all</span></div>
          <div className="preview-task"><span className="fake-check"/><span><b>Send the project update</b><small>Work · Task</small></span><i>Today</i></div>
          <div className="preview-task"><span className="fake-check"/><span><b>Book a dentist appointment</b><small>Personal · Task</small></span><i>This week</i></div>
          <div className="preview-saved"><Bookmark size={14}/><span><b>Saved note</b><small>Sam recommended the Italian place on King Street.</small></span></div>
          <div className="preview-bottom"><div><CalendarDays size={15}/><span>Calendar</span></div><div><Wallet size={15}/><span>Bills</span></div><div><MessageCircle size={15}/><span>Ask Rella</span></div></div>
        </div>
        <div className="visual-note note-bottom"><span className="note-spark"><Search size={15}/></span><span><strong>Find saved information</strong><small>Go back to details when you need them.</small></span></div>
      </div>
    </section>

    <section className="landing-manifesto" id="how-it-works">
      <span className="landing-eyebrow">HOW IT WORKS</span>
      <h2>A simple way to stay on top<br/><em>of everyday life.</em></h2>
      <p>Add the things you need to remember, keep them organised and find them again when you need them.</p>
      <div className="manifesto-steps">
        <article><span>01</span><strong>Add what matters</strong><p>Save a task, appointment, bill, reminder or useful note.</p></article>
        <article><span>02</span><strong>Keep it organised</strong><p>Rella gives your plans, responsibilities and notes their own place.</p></article>
        <article><span>03</span><strong>Find it when you need it</strong><p>Look through your saved information or ask Rella to help find a detail.</p></article>
      </div>
    </section>

    <section className="landing-life" id="what-you-can-manage">
      <div className="life-photo"><img src={photos.workspace} alt="Laptop, notebook and phone arranged on a tidy desk" loading="lazy"/><div className="life-photo-caption"><span>YOUR EVERYDAY LIFE</span><strong>Keep the important details together.</strong></div></div>
      <div className="life-copy">
        <span className="landing-eyebrow">WHAT YOU CAN MANAGE</span>
        <h2>Your plans, tasks, bills and notes.<br/><em>All in one place.</em></h2>
        <p>Use Rella to organise the practical things you do every day and keep useful information close by.</p>
        <ul className="life-points">
          <li><span><CalendarDays size={17}/></span><div><strong>Calendar & appointments</strong><small>Keep track of dates, events and what's coming up.</small></div></li>
          <li><span><CheckCircle2 size={17}/></span><div><strong>Tasks & to-dos</strong><small>Know what needs doing and keep track of your progress.</small></div></li>
          <li><span><CreditCard size={17}/></span><div><strong>Bills & subscriptions</strong><small>Save payment amounts, due dates and recurring costs.</small></div></li>
          <li><span><Bookmark size={17}/></span><div><strong>Saved information</strong><small>Keep notes, recommendations, names and useful details.</small></div></li>
        </ul>
      </div>
    </section>

    <section className="landing-inside">
      <div className="inside-heading"><span className="landing-eyebrow">EXPLORE YOUR WORKSPACE</span><h2>Everything has<br/><em>a place in Rella.</em></h2><p>Open the section you need and see what you have saved.</p></div>
      <div className="inside-grid">
        <article className="inside-card inside-large"><div className="inside-icon"><CalendarDays size={19}/></div><span>CALENDAR</span><h3>See your upcoming plans.</h3><p>Add appointments, events and important dates, then check what's coming up.</p><div className="mini-calendar"><div><small>MON</small><b>23</b></div><div className="today-date"><small>TUE</small><b>24</b></div><div><small>WED</small><b>25</b></div><div><small>THU</small><b>26</b></div><div><small>FRI</small><b>27</b></div></div></article>
        <article className="inside-card"><div className="inside-icon peach"><CheckCircle2 size={19}/></div><span>TASKS</span><h3>Keep track of what needs doing.</h3><p>Add tasks, set due dates and mark things as complete.</p><div className="mini-lines"><i/><i/><i/></div></article>
        <article className="inside-card"><div className="inside-icon lilac"><CreditCard size={19}/></div><span>BILLS & SUBSCRIPTIONS</span><h3>Know what's due and when.</h3><p>Keep payment dates and recurring costs in one place.</p><div className="payment-chip"><Clock3 size={14}/> Keep your next due date in view</div></article>
        <article className="inside-card inside-memory"><div className="inside-icon"><Bookmark size={19}/></div><span>MY MEMORY</span><h3>Save details you want to remember.</h3><p>Keep names, recommendations, preferences and notes you may need later.</p><div className="memory-tags"><i>People</i><i>Places</i><i>Notes</i><i>Recommendations</i></div></article>
      </div>
    </section>

    <section className="landing-ask" id="ask-rella">
      <div className="ask-copy"><span className="landing-eyebrow">ASK RELLA</span><h2>Looking for something<br/><em>you saved earlier?</em></h2><p>Ask about a detail in your saved information. Rella can help you find the note, recommendation or reminder you're looking for.</p><button className="landing-primary" onClick={onEnter}>Open Ask Rella <ArrowRight size={17}/></button></div>
      <div className="ask-visual" aria-label="Example conversation asking Rella to find a saved recommendation">
        <div className="ask-window"><div className="ask-window-head"><span className="ask-avatar">r</span><span><strong>Ask Rella</strong><small>Your saved information</small></span><span className="ask-status"/></div>
          <div className="ask-question"><span>YOU</span><p>Where was that pasta place Sam recommended?</p></div>
          <div className="ask-answer"><span>RELLA</span><p>You saved a recommendation from Sam for an Italian place on King Street. You also noted that they recommended trying the pasta.</p><div className="ask-source"><Bookmark size={13}/> From your saved memory</div></div>
          <div className="ask-input">Ask about something you've saved… <span>↑</span></div>
        </div>
        <div className="ask-decoration"><MessageCircle size={20}/><span>Find the details.<br/><strong>Get on with your day.</strong></span></div>
      </div>
    </section>

    <section className="landing-photo-strip" aria-label="Everyday planning and money management">
      <img src={photos.finances} alt="Person organising bills and writing notes at a desk" loading="lazy"/>
      <div><span className="landing-eyebrow">MADE FOR EVERYDAY USE</span><h2>From daily tasks to monthly bills.</h2><p>Keep the details of your day together, instead of spreading them across different notes and lists.</p></div>
      <img src={photos.calendar} alt="Open planner and laptop on a tidy desk" loading="lazy"/>
    </section>

    <section className="landing-closer"><span className="landing-eyebrow">GET STARTED WITH RELLA</span><h2>Put your plans and important details<br/><em>in one place.</em></h2><p>Start with a task, an appointment or a note. Add more whenever you need to.</p><button className="landing-primary" onClick={onEnter}>Open Rella <ArrowRight size={17}/></button><small>Your personal space for everyday life.</small></section>

    <footer className="landing-footer"><a className="landing-brand" href="#top"><span className="landing-mark">r</span> rella</a><div className="footer-links"><a href="#how-it-works">How it works</a><a href="#what-you-can-manage">What you can manage</a><a href="#ask-rella">Ask Rella</a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a><button onClick={onEnter}>Open your space</button></div><span>© 2026 Rella</span></footer>
  </main>
}
