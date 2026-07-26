import { useState } from 'react'
import {
  Bell, BookOpen, CalendarDays, ChevronRight, CircleHelp, Compass, Heart,
  Home, Image, Menu, MessageCircle, MoreHorizontal, Search, Send, Settings,
  Sparkles, Trophy, UsersRound, X,
} from 'lucide-react'

const navItems = [
  [Home, 'Início'], [Compass, 'Explorar'], [UsersRound, 'Grupos'],
  [CalendarDays, 'Agenda'], [BookOpen, 'Biblioteca'],
]

const stories = [
  { name: 'Feira Cultural', icon: '🎨', tone: 'yellow' },
  { name: 'Interclasses', icon: '🏆', tone: 'green' },
  { name: 'Clube do Livro', icon: '📚', tone: 'blue' },
  { name: 'Música no Pátio', icon: '🎵', tone: 'coral' },
  { name: 'Ver mais', icon: '+', tone: 'cream' },
]

const comments = [
  { name: 'Pedro M.', text: 'Já estou ensaiando! Vai ser incrível 💚' },
  { name: 'Clara Souza', text: 'Nossa turma confirmou presença!' },
]

function Logo({ compact = false }) {
  return <div className={`logo ${compact ? 'compact' : ''}`}>
    <div className="logo-mark"><span>CP</span><i /></div>
    {!compact && <div><strong>COLÉGIO</strong><b>PETRÓPOLIS</b><small>JUNTOS, VAMOS MAIS LONGE</small></div>}
  </div>
}

function Avatar({ initials, color = 'mint', online = false, large = false }) {
  return <div className={`avatar ${color} ${large ? 'large' : ''}`}>
    {initials}{online && <i className="online" />}
  </div>
}

function Sidebar({ open, close }) {
  return <aside className={`sidebar ${open ? 'open' : ''}`}>
    <button className="close-menu" onClick={close} aria-label="Fechar menu"><X /></button>
    <Logo />
    <nav>
      {navItems.map(([Icon, label], i) => <button className={i === 0 ? 'active' : ''} key={label} onClick={close}>
        <Icon size={20} /><span>{label}</span>{i === 2 && <em>4</em>}
      </button>)}
    </nav>
    <div className="sidebar-bottom">
      <button><CircleHelp size={20} />Ajuda</button>
      <button><Settings size={20} />Configurações</button>
      <div className="profile-mini"><Avatar initials="AM" color="coral" /><div><b>Ana Martins</b><small>2º Ano B • Aluna</small></div><MoreHorizontal size={18} /></div>
    </div>
  </aside>
}

function Header({ openMenu }) {
  return <header>
    <button className="menu-button" onClick={openMenu} aria-label="Abrir menu"><Menu /></button>
    <div className="mobile-logo"><Logo compact /></div>
    <label className="search"><Search size={18} /><input aria-label="Buscar" placeholder="Buscar na comunidade..." /><kbd>⌘ K</kbd></label>
    <div className="header-actions">
      <button className="icon-button" aria-label="Notificações"><Bell size={21} /><i /></button>
      <Avatar initials="AM" color="coral" />
    </div>
  </header>
}

function Composer({ onPublish }) {
  const [text, setText] = useState('')
  return <div className="card composer">
    <div><Avatar initials="AM" color="coral" /><button className="composer-input" onClick={() => document.querySelector('#post-text').focus()}>Compartilhe algo com a comunidade...</button></div>
    <textarea id="post-text" value={text} onChange={e => setText(e.target.value)} placeholder="Escreva sua publicação..." />
    <div className="composer-actions"><button><Image size={18} /> Foto ou vídeo</button><button><CalendarDays size={18} /> Evento</button><button className="publish" disabled={!text.trim()} onClick={() => { onPublish(text); setText('') }}><Send size={16} /> Publicar</button></div>
  </div>
}

function UserPost({ newText, onDismiss }) {
  return <article className="card post new-post">
    <div className="post-head"><Avatar initials="AM" color="coral" /><div><b>Ana Martins</b><span>Agora • 2º Ano B</span></div><button onClick={onDismiss} aria-label="Remover publicação"><X size={18} /></button></div>
    <p>{newText}</p><div className="post-actions"><button><Heart size={18} /> Curtir</button><button><MessageCircle size={18} /> Comentar</button></div>
  </article>
}

function MainPost() {
  const [liked, setLiked] = useState(false)
  const [showComments, setShowComments] = useState(true)
  return <article className="card post">
    <div className="post-head"><Avatar initials="LC" color="green" /><div><b>Lucas Carvalho <span className="verified">✓</span></b><span>Há 25 min • Coordenação</span></div><button aria-label="Mais opções"><MoreHorizontal /></button></div>
    <p>Falta pouco para a nossa <strong>Feira Cultural 2026!</strong> 🌎✨</p>
    <p>As turmas prepararam projetos incríveis sobre culturas do mundo todo. Esperamos vocês e suas famílias neste sábado!</p>
    <div className="event-art">
      <span className="doodle d1">✦</span><span className="doodle d2">⌁</span><span className="doodle d3">☆</span>
      <div className="art-date"><small>AGOSTO</small><b>09</b><span>SÁBADO • 09H</span></div>
      <div className="art-copy"><small>COLÉGIO PETRÓPOLIS APRESENTA</small><h2>FEIRA<br/><em>CULTURAL</em></h2><p>UM MUNDO DE DESCOBERTAS</p></div>
      <div className="art-globe">🌎</div>
    </div>
    <div className="post-stats"><span><i>💚</i><i>👏</i> {liked ? 129 : 128} reações</span><button onClick={() => setShowComments(!showComments)}>12 comentários</button></div>
    <div className="post-actions"><button className={liked ? 'liked' : ''} onClick={() => setLiked(!liked)}><Heart size={19} fill={liked ? 'currentColor' : 'none'} /> {liked ? 'Curtido' : 'Curtir'}</button><button onClick={() => setShowComments(!showComments)}><MessageCircle size={19} /> Comentar</button><button><Send size={18} /> Compartilhar</button></div>
    {showComments && <div className="comments">{comments.map((c, i) => <div className="comment" key={c.name}><Avatar initials={i ? 'CS' : 'PM'} color={i ? 'yellow' : 'blue'} /><p><b>{c.name}</b>{c.text}</p></div>)}<div className="comment-box"><Avatar initials="AM" color="coral" /><label><input placeholder="Escreva um comentário..."/><button aria-label="Enviar comentário"><Send size={16}/></button></label></div></div>}
  </article>
}

function RightPanel() {
  const events = [
    { day: '09', mon: 'AGO', title: 'Feira Cultural', meta: 'Sáb • 09:00 — 13:00', color: 'yellow' },
    { day: '14', mon: 'AGO', title: 'Reunião de Pais', meta: 'Qui • 19:00 — 20:30', color: 'green' },
    { day: '20', mon: 'AGO', title: 'Interclasses', meta: 'Qua • 08:00', color: 'blue' },
  ]
  return <aside className="right-panel">
    <section className="side-card welcome"><div><span>Olá, Ana! 👋</span><h3>Que bom ter você por aqui.</h3><p>Continue participando para fortalecer nossa comunidade!</p></div><Sparkles /></section>
    <section className="side-card"><div className="side-title"><h3>Próximos eventos</h3><button>Ver agenda</button></div>{events.map(e => <div className="event-row" key={e.day}><div className={`date-box ${e.color}`}><b>{e.day}</b><span>{e.mon}</span></div><div><b>{e.title}</b><small>{e.meta}</small></div><ChevronRight size={17}/></div>)}</section>
    <section className="side-card ranking"><div className="side-title"><h3><Trophy size={18}/> Turmas em destaque</h3><button>Ver ranking</button></div><p>Participação na comunidade este mês</p>
      {[['1','3º Ano A','1.280 pts','🥇'],['2','2º Ano B','1.145 pts','🥈'],['3','1º Ano C','980 pts','🥉']].map(r => <div className="rank-row" key={r[0]}><span>{r[3]}</span><b>{r[1]}</b><small>{r[2]}</small></div>)}
      <div className="your-class">Sua turma está em <b>2º lugar!</b><span>🔥</span></div>
    </section>
  </aside>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [newPost, setNewPost] = useState('')
  return <div className="app-shell">
    <Sidebar open={menuOpen} close={() => setMenuOpen(false)} />
    {menuOpen && <button className="overlay" onClick={() => setMenuOpen(false)} aria-label="Fechar menu" />}
    <div className="page"><Header openMenu={() => setMenuOpen(true)} />
      <main><section className="feed"><div className="greeting"><div><p>DOMINGO, 26 DE JULHO</p><h1>Bom dia, Ana!</h1><span>Veja o que está acontecendo no Petrópolis.</span></div><div className="weather">☀️ <b>21°</b><small>Petrópolis, RJ</small></div></div>
        <div className="stories">{stories.map(s => <button key={s.name}><div className={`story ${s.tone}`}>{s.icon}</div><span>{s.name}</span></button>)}</div>
        <Composer onPublish={setNewPost} />
        <div className="feed-filter"><b>Novidades</b><button>Mais recentes⌄</button></div>
        {newPost && <UserPost newText={newPost} onDismiss={() => setNewPost('')} />}
        <MainPost />
      </section><RightPanel /></main>
    </div>
  </div>
}
