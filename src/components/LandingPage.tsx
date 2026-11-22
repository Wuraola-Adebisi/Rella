import { ArrowRight, ArrowUpRight, CalendarDays, Check, CheckCircle2, Clock3, CreditCard, MessageCircle, Search, Bookmark, Inbox, Wallet } from 'lucide-react'

export default function LandingPage({ onEnter }: { onEnter: () => void }) {
  return <main className="landing">
    <header className="landing-nav">
      <a className="landing-brand" href="#top" aria-label="Rella home"><span className="landing-mark">r</span> rella</a>
      <nav aria-label="Main navigation"><a href="#how-it-works">How it works</a><a href="#your-life">What you can keep</a><a href="#ask-rella">Ask Rella</a></nav>
      <button className="landing-nav-cta" onClick={onEnter}>Open Rella <ArrowUpRight size={16}/></button>
    </header>
    <section className="landing-hero" id="top">
      <div className="landing-copy">
        <span className="landing-eyebrow"><i/> A CALMER WAY TO KEEP TRACK</span>
        <h1>So much to remember.<br/><em>One place to keep it.</em></h1>
        <p>Your plans, tasks, bills and all those little details that matter. Bring them together with Rella, so you can spend less time trying to remember and more time getting on with your day.</p>
        <div className="landing-actions"><button className="landing-primary" onClick={onEnter}>Get started <ArrowRight size={17}/></button><a href="#how-it-works">Take a look around <span>↓</span></a></div>
        <div className="landing-proof"><span className="landing-proof-icon"><CheckCircle2 size={17}/></span><span>For the big plans and the small things you don't want to forget.</span></div>
      </div>
      <div className="landing-visual" aria-label="Illustration of a Rella personal workspace">
        <div className="visual-orbit orbit-one"/><div className="visual-orbit orbit-two"/>
        <div className="visual-note note-top"><span className="note-icon"><Check size={14}/></span><span><strong>It's all in one place</strong><small>Plans, payments and personal notes</small></span></div>
        <div className="preview-window">
          <div className="preview-head"><div className="preview-brand"><span>r</span> rella</div><div className="preview-profile">W</div></div>
          <div className="preview-greeting"><small>YOUR SPACE, AT A GLANCE</small><h3>A little more room<br/>to think clearly.</h3></div>
          <div className="preview-capture"><Inbox size={15}/><span>Get that thought out of your head…</span><span className="capture-arrow">↑</span></div>
          <div className="preview-section-head"><strong>On your list</strong><span>View tasks</span></div>
          <div className="preview-task"><span className="fake-check"/><span><b>Send the project update</b><small>Work · Task</small></span><i>Today</i></div>
          <div className="preview-task"><span className="fake-check"/><span><b>Book the dentist appointment</b><small>Personal · Reminder</small></span><i>This week</i></div>
          <div className="preview-saved"><Bookmark size={14}/><span><b>Remember</b><small>Sam recommended the little Italian place on King Street.</small></span></div>
          <div className="preview-bottom"><div><CalendarDays size={15}/><span>Plans</span></div><div><Wallet size={15}/><span>Bills</span></div><div><MessageCircle size={15}/><span>Ask Rella</span></div></div>
        </div>
        <div className="visual-note note-bottom"><span className="note-spark"><Search size={15}/></span><span><strong>Where did I save that?</strong><small>Find it without the mental search.</small></span></div>
      </div>
      <div className="landing-scroll">A LITTLE MORE HEADSPACE <span>↓</span></div>
    </section>
    <section className="landing-manifesto" id="how-it-works">
      <span className="landing-eyebrow">MADE FOR REAL, EVERYDAY LIFE</span>
      <h2>Your life isn't one to-do list.<br/><em>Your space shouldn't be either.</em></h2>
      <p>Some things need a date. Some need doing. Others are simply worth remembering. Rella gives each one a place, without making you juggle a dozen different apps.</p>
      <div className="manifesto-steps">
        <article><span>01</span><strong>Get it out of your head</strong><p>Capture a task, a date, a payment or a passing thought before it slips away.</p></article>
        <article><span>02</span><strong>Give it a place</strong><p>Keep everyday responsibilities and personal details organised in one space.</p></article>
        <article><span>03</span><strong>Come back when you need it</strong><p>Look it up, revisit what you saved or ask Rella to help you find the detail.</p></article>
      </div>
    </section>
    <section className="landing-life" id="your-life">
      <div className="life-photo"><img src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=85" alt="An open notebook and planner on a desk" loading="lazy"/><div className="life-photo-caption"><span>THE EVERYDAY DETAILS</span><strong>All the things that make up a life.</strong></div></div>
      <div className="life-copy">
        <span className="landing-eyebrow">ONE SPACE, MANY MOVING PARTS</span>
        <h2>Not everything belongs in the same list.<br/><em>It can still live in the same place.</em></h2>
        <p>Keep the practical parts of life close, while leaving room for the personal details that are easy to lose in a crowded inbox or a forgotten note.</p>
        <ul className="life-points">
          <li><span><CalendarDays size={17}/></span><div><strong>Plans & dates</strong><small>Appointments, events and the things coming up.</small></div></li>
          <li><span><CheckCircle2 size={17}/></span><div><strong>Tasks & responsibilities</strong><small>Everyday to-dos, follow-ups and commitments.</small></div></li>
          <li><span><CreditCard size={17}/></span><div><strong>Bills & subscriptions</strong><small>Payment amounts, due dates and recurring costs.</small></div></li>
          <li><span><Bookmark size={17}/></span><div><strong>Personal memory</strong><small>People, recommendations, preferences and useful notes.</small></div></li>
        </ul>
      </div>
    </section>
    <section className="landing-inside">
      <div className="inside-heading"><span className="landing-eyebrow">A CLOSER LOOK</span><h2>Clearer days start with<br/><em>knowing where things are.</em></h2><p>Move between the parts of your life without losing the bigger picture.</p></div>
      <div className="inside-grid">
        <article className="inside-card inside-large"><div className="inside-icon"><CalendarDays size={19}/></div><span>YOUR TIME</span><h3>See what's coming.</h3><p>Keep appointments, plans and important dates together, so you can look ahead with a little more confidence.</p><div className="mini-calendar"><div><small>MON</small><b>23</b></div><div className="today-date"><small>TUE</small><b>24</b></div><div><small>WED</small><b>25</b></div><div><small>THU</small><b>26</b></div><div><small>FRI</small><b>27</b></div></div></article>
        <article className="inside-card"><div className="inside-icon peach"><CheckCircle2 size={19}/></div><span>YOUR RESPONSIBILITIES</span><h3>Know what needs doing.</h3><p>Keep work and personal tasks in view, with a clear place for what's next.</p><div className="mini-lines"><i/><i/><i/></div></article>
        <article className="inside-card"><div className="inside-icon lilac"><CreditCard size={19}/></div><span>YOUR MONEY</span><h3>Keep payment dates close.</h3><p>Track bills and subscriptions, see what's due and keep recurring costs from catching you by surprise.</p><div className="payment-chip"><Clock3 size={14}/> Your next due date, at a glance</div></article>
        <article className="inside-card inside-memory"><div className="inside-icon"><Bookmark size={19}/></div><span>YOUR MEMORY</span><h3>Hold on to the useful details.</h3><p>Save recommendations, names, preferences and those small things you know you'll want to find again.</p><div className="memory-tags"><i>People</i><i>Places</i><i>Notes</i><i>Recommendations</i></div></article>
      </div>
    </section>
    <section className="landing-ask" id="ask-rella">
      <div className="ask-copy"><span className="landing-eyebrow">WHEN YOU CAN'T REMEMBER WHERE</span><h2>Don't dig through everything.<br/><em>Just ask Rella.</em></h2><p>Somewhere in your notes is the name of that place, the date of that appointment or the recommendation someone made. Ask about what you've saved and get back to the detail you need.</p><button className="landing-primary" onClick={onEnter}>Meet Rella <ArrowRight size={17}/></button></div>
      <div className="ask-visual" aria-label="Example of asking Rella to find a saved recommendation">
        <div className="ask-window"><div className="ask-window-head"><span className="ask-avatar">r</span><span><strong>Ask Rella</strong><small>Your personal space</small></span><span className="ask-status"/></div>
          <div className="ask-question"><span>YOU</span><p>Where was that pasta place Sam recommended?</p></div>
          <div className="ask-answer"><span>RELLA</span><p>You saved a recommendation from Sam for a little Italian place on King Street. You noted that they recommended trying the pasta.</p><div className="ask-source"><Bookmark size={13}/> From your saved memory</div></div>
          <div className="ask-input">Ask about something you've saved… <span>↑</span></div>
        </div>
        <div className="ask-decoration"><MessageCircle size={20}/><span>Less searching.<br/><strong>More remembering.</strong></span></div>
      </div>
    </section>
    <section className="landing-photo-strip" aria-label="A more organised everyday">
      <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=85" alt="A laptop and notebook on a bright work desk" loading="lazy"/>
      <div><span className="landing-eyebrow">MAKE SPACE FOR YOUR ATTENTION</span><h2>Keep track of the details.<br/><em>Keep your mind on the moment.</em></h2><p>Rella is here for the things you need to remember, so they don't all have to stay in your head.</p></div>
      <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85" alt="A calm, light-filled workspace" loading="lazy"/>
    </section>
    <section className="landing-closer"><span className="landing-eyebrow">A LITTLE MORE ROOM FOR YOU</span><h2>Life has enough tabs open.<br/><em>Let Rella keep track of the details.</em></h2><p>Bring your plans, responsibilities and important notes into one place.</p><button className="landing-primary" onClick={onEnter}>Step inside Rella <ArrowRight size={17}/></button><small>Start with one thing. Add the rest as life happens.</small></section>
    <footer className="landing-footer"><a className="landing-brand" href="#top"><span className="landing-mark">r</span> rella</a><div className="footer-links"><a href="#how-it-works">How it works</a><a href="#your-life">What you can keep</a><a href="#ask-rella">Ask Rella</a><button onClick={onEnter}>Open your space</button></div><span>© 2026 Rella</span></footer>
  </main>
}