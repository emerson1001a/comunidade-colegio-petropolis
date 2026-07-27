"use client";

import { useMemo, useState } from "react";

type View = "home" | "search" | "market" | "advertise" | "admin";

const professionals = [
  { id: 1, initials: "AM", name: "Dra. Ana Martins", role: "Odontopediatria", relation: "Mãe de aluna • desde 2018", rating: "4,9", reviews: 24, area: "Lourdes", available: "Hoje, 16h", tone: "teal", verified: true },
  { id: 2, initials: "RC", name: "Dr. Rafael Costa", role: "Ortodontia e estética", relation: "Ex-aluno • turma de 2004", rating: "4,8", reviews: 17, area: "Funcionários", available: "Amanhã, 9h", tone: "blue", verified: true },
  { id: 3, initials: "SO", name: "Sorriso Odonto", role: "Clínica odontológica", relation: "Parceiro externo", rating: "4,7", reviews: 31, area: "Savassi", available: "Nesta semana", tone: "gold", sponsored: true, verified: false },
];

const listings = [
  { icon: "🚲", title: "Bicicleta infantil aro 20", seller: "Mariana • mãe do 5º ano", price: "R$ 690", condition: "Seminova", color: "mint" },
  { icon: "📚", title: "Coleção Harry Potter", seller: "Eduardo • ex-aluno", price: "R$ 240", condition: "Ótimo estado", color: "lavender" },
  { icon: "🎹", title: "Teclado Yamaha PSR", seller: "Carolina • mãe do 8º ano", price: "R$ 1.350", condition: "Pouco usado", color: "sand" },
];

function Mark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand">
      <span className={`brand-mark ${compact ? "compact" : ""}`}><i>P</i></span>
      {!compact && <span><strong>Comunidade</strong><b>Petrópolis</b></span>}
    </div>
  );
}

function Avatar({ initials, tone = "blue", small = false }: { initials: string; tone?: string; small?: boolean }) {
  return <span className={`avatar ${tone} ${small ? "small" : ""}`}>{initials}</span>;
}

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [view, setView] = useState<View>("home");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<typeof professionals[0] | null>(null);
  const [whatsapp, setWhatsapp] = useState(false);
  const [waStep, setWaStep] = useState(0);
  const [review, setReview] = useState(false);
  const [reviewSent, setReviewSent] = useState(false);
  const [adStep, setAdStep] = useState(0);
  const [toast, setToast] = useState("");

  const runSearch = (term?: string) => {
    setQuery(term || query || "Dentista");
    setView("search");
  };

  const notify = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(""), 2800);
  };

  if (!entered) {
    return (
      <main className="welcome-shell">
        <div className="welcome-orb orb-one" />
        <div className="welcome-orb orb-two" />
        <header className="welcome-nav">
          <Mark />
          <span className="demo-pill">Demonstração privada</span>
        </header>
        <section className="welcome-card">
          <div className="eyebrow">Uma rede que já existe. Agora, conectada.</div>
          <h1>Confiança que aproxima.<br /><em>Negócios que fortalecem.</em></h1>
          <p>Encontre profissionais, oportunidades e produtos recomendados por famílias e ex-alunos do Colégio Petrópolis.</p>
          <div className="phone-field">
            <span>🇧🇷 +55</span>
            <input aria-label="Telefone" defaultValue="(31) 99999-2026" />
          </div>
          <button className="primary wide" onClick={() => setEntered(true)}>Receber código de acesso <span>→</span></button>
          <small>Ao continuar, você concorda com os termos da comunidade.<br />Nenhum dado real será utilizado nesta demonstração.</small>
          <div className="trust-row">
            <span>✓ Vínculo verificado</span><span>✓ Ambiente privado</span><span>✓ Dados protegidos</span>
          </div>
        </section>
        <aside className="welcome-proof">
          <div className="proof-stack">
            <div className="proof-card back">“Encontrei uma arquiteta em quem confio.”</div>
            <div className="proof-card front">
              <div className="mini-stars">★★★★★</div>
              <p>“Em dois minutos encontrei uma dentista indicada por outras famílias.”</p>
              <div><Avatar initials="MS" tone="teal" small /><span><b>Marina Souza</b><small>Mãe de aluno • 6º ano</small></span></div>
            </div>
          </div>
          <div className="proof-metric"><strong>+340</strong><span>famílias interessadas<br />em participar</span></div>
        </aside>
      </main>
    );
  }

  const nav = [
    { id: "home", label: "Início", icon: "⌂" },
    { id: "search", label: "Serviços", icon: "◇" },
    { id: "market", label: "Classificados", icon: "▣" },
    { id: "advertise", label: "Anunciar", icon: "＋" },
  ] as const;

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <Mark />
        <nav>
          {nav.map(item => (
            <button key={item.id} className={view === item.id ? "active" : ""} onClick={() => setView(item.id)}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
          <div className="nav-separator" />
          <button className={view === "admin" ? "active" : ""} onClick={() => setView("admin")}><span>▥</span>Painel da comunidade</button>
        </nav>
        <div className="community-card">
          <span>REDE PETRÓPOLIS</span>
          <strong>1.248 membros</strong>
          <div className="tiny-faces"><i>AM</i><i>RC</i><i>MS</i><i>+1k</i></div>
        </div>
        <button className="profile-chip" onClick={() => notify("Perfil demonstrativo verificado")}>
          <Avatar initials="ES" tone="blue" small />
          <span><b>Emerson Silva</b><small>Membro verificado</small></span><i>•••</i>
        </button>
      </aside>

      <section className="content">
        <header className="topbar">
          <div className="mobile-mark"><Mark compact /></div>
          <div className="global-search">
            <span>⌕</span>
            <input aria-label="Busca global" placeholder="O que você procura na comunidade?" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && runSearch()} />
            <kbd>↵</kbd>
          </div>
          <button className="whatsapp-mini" onClick={() => setWhatsapp(true)}>◉ <span>Perguntar à comunidade</span></button>
          <button className="bell">♢<i /></button>
        </header>

        {view === "home" && (
          <div className="page">
            <section className="hero">
              <div>
                <div className="eyebrow">DOMINGO, 26 DE JULHO</div>
                <h2>Olá, Ricardo.<br /><em>Como a comunidade pode ajudar?</em></h2>
                <div className="hero-search">
                  <span>⌕</span>
                  <input aria-label="Pesquisar profissionais" placeholder="Ex.: dentista, arquiteto, professor particular..." value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && runSearch()} />
                  <button onClick={() => runSearch()}>Buscar</button>
                </div>
                <div className="quick-tags">
                  {["Dentista", "Arquiteto", "Festa infantil", "Professor de inglês"].map(x => <button key={x} onClick={() => runSearch(x)}>{x}</button>)}
                </div>
              </div>
              <div className="hero-network">
                <div className="network-ring ring-one" />
                <div className="network-ring ring-two" />
                <Avatar initials="AM" tone="teal" />
                <Avatar initials="RC" tone="blue" />
                <Avatar initials="CL" tone="gold" />
                <Avatar initials="MS" tone="rose" />
                <span className="network-center">P</span>
                <small>Uma rede de<br /><b>confiança real</b></small>
              </div>
            </section>

            <div className="section-title"><div><span>PERTO DE VOCÊ</span><h3>Profissionais em destaque</h3></div><button onClick={() => setView("search")}>Ver todos →</button></div>
            <div className="professional-grid">
              {professionals.map(pro => (
                <article className="professional-card" key={pro.id} onClick={() => setSelected(pro)}>
                  {pro.sponsored && <span className="sponsored">PATROCINADO</span>}
                  <div className="pro-head"><Avatar initials={pro.initials} tone={pro.tone} /><div><h4>{pro.name}</h4><p>{pro.role}</p></div></div>
                  <div className="relation">{pro.verified ? "✓ " : "◈ "}{pro.relation}</div>
                  <div className="pro-bottom"><span><b>★ {pro.rating}</b> ({pro.reviews})</span><span className="availability">● {pro.available}</span></div>
                </article>
              ))}
            </div>

            <div className="two-columns">
              <section>
                <div className="section-title compact-title"><div><span>DESAPEGO COM CONFIANÇA</span><h3>Novos nos classificados</h3></div><button onClick={() => setView("market")}>Explorar →</button></div>
                <div className="listing-row">
                  {listings.slice(0, 2).map(item => <article className={`listing-card ${item.color}`} key={item.title}><div className="listing-art">{item.icon}</div><div><span>{item.condition}</span><h4>{item.title}</h4><p>{item.seller}</p><strong>{item.price}</strong></div></article>)}
                </div>
              </section>
              <aside className="impact-card">
                <span>IMPACTO DA COMUNIDADE</span>
                <h3>R$ 184 mil</h3>
                <p>em negócios gerados entre membros neste mês</p>
                <div className="mini-bars"><i /><i /><i /><i /><i /><i /><i /></div>
                <small>↑ 18% em relação ao mês anterior</small>
              </aside>
            </div>
          </div>
        )}

        {view === "search" && (
          <div className="page">
            <div className="search-heading">
              <div><span>RESULTADOS DA COMUNIDADE</span><h2>{query || "Dentistas"} <em>perto de você</em></h2><p>Encontramos profissionais com vínculo verificado e disponibilidade recente.</p></div>
              <button className="outline" onClick={() => setWhatsapp(true)}>◉ Refinar pelo WhatsApp</button>
            </div>
            <div className="filter-bar">
              <button>Categoria: Odontologia⌄</button><button>Região: Todas⌄</button><button>Disponível nesta semana⌄</button><button>Mais bem avaliados⌄</button>
            </div>
            <div className="results-layout">
              <div className="results-list">
                {professionals.map((pro, idx) => (
                  <article className="result-card" key={pro.id}>
                    <div className="result-rank">{idx + 1}</div>
                    <Avatar initials={pro.initials} tone={pro.tone} />
                    <div className="result-main">
                      <div><h3>{pro.name} {pro.verified && <i>✓</i>}</h3>{pro.sponsored && <span className="sponsored inline">PATROCINADO</span>}</div>
                      <p>{pro.role} • {pro.area}</p>
                      <div className="relation">{pro.verified ? "✓ " : "◈ "}{pro.relation}</div>
                      <div className="reason"><b>Por que apareceu:</b> corresponde à busca, tem agenda atualizada e boas avaliações.</div>
                    </div>
                    <div className="result-action">
                      <strong>★ {pro.rating}</strong><small>{pro.reviews} avaliações confirmadas</small>
                      <span className="availability">● {pro.available}</span>
                      <button onClick={() => setSelected(pro)}>Ver perfil</button>
                    </div>
                  </article>
                ))}
              </div>
              <aside className="concierge-card">
                <div className="concierge-icon">◉</div>
                <span>ASSISTENTE PETRÓPOLIS</span>
                <h3>Posso encontrar a melhor opção para você.</h3>
                <p>Informe especialidade, bairro e melhor horário. A comunidade faz o resto.</p>
                <button onClick={() => setWhatsapp(true)}>Conversar agora</button>
                <small>Respostas baseadas apenas em perfis verificados.</small>
              </aside>
            </div>
          </div>
        )}

        {view === "market" && (
          <div className="page">
            <div className="search-heading market-heading">
              <div><span>CLASSIFICADOS PETRÓPOLIS</span><h2>Boas histórias merecem <em>novos capítulos.</em></h2><p>Compre e venda entre pessoas que fazem parte da mesma comunidade.</p></div>
              <button className="primary" onClick={() => notify("Novo anúncio iniciado — demonstração")}>＋ Publicar um item</button>
            </div>
            <div className="category-strip">{["Todos", "Infantil", "Livros", "Esportes", "Música", "Casa", "Tecnologia"].map((x,i)=><button className={i===0?"active":""} key={x}>{x}</button>)}</div>
            <div className="market-grid">
              {[...listings, { icon:"🪑",title:"Cadeira de escritório",seller:"Paulo • pai do 2º ano",price:"R$ 480",condition:"Excelente",color:"sky" }, {icon:"🎮",title:"Nintendo Switch OLED",seller:"André • ex-aluno",price:"R$ 1.850",condition:"Com acessórios",color:"lavender"}, {icon:"🛴",title:"Patinete dobrável",seller:"Renata • mãe do 4º ano",price:"R$ 320",condition:"Seminovo",color:"mint"}].map(item=>(
                <article className="market-card" key={item.title}>
                  <div className={`market-art ${item.color}`}>{item.icon}<button>♡</button></div>
                  <span>{item.condition}</span><h3>{item.title}</h3><p>{item.seller}</p><strong>{item.price}</strong>
                  <button onClick={()=>notify("Conversa com o vendedor aberta")}>Tenho interesse</button>
                </article>
              ))}
            </div>
          </div>
        )}

        {view === "advertise" && (
          <div className="page">
            <div className="ad-hero">
              <div><span>FORTALEÇA SUA PRESENÇA</span><h2>Seu negócio em evidência.<br /><em>Dentro da rede certa.</em></h2><p>Alcance famílias que valorizam confiança, qualidade e boas recomendações.</p></div>
              <div className="ad-preview">
                <span>EXEMPLO DE DESTAQUE</span>
                <div><Avatar initials="AR" tone="gold" /><p><b>Ateliê Rios Arquitetura</b><small>Projetos residenciais • Membro verificado</small></p><i>PATROCINADO</i></div>
              </div>
            </div>
            <h3 className="plan-title">Escolha como quer aparecer</h3>
            <div className="plans">
              {[
                { name:"Presença", price:"R$ 149", note:"por 30 dias", items:["Perfil em destaque","Selo de apoiador","Relatório de visualizações"] },
                { name:"Destaque", price:"R$ 349", note:"por 30 dias", items:["Tudo do Presença","Prioridade na categoria","Até 2 campanhas"], best:true },
                { name:"Parceiro", price:"R$ 790", note:"por 30 dias", items:["Tudo do Destaque","Benefício exclusivo","Relatório de contatos"] }
              ].map((plan,idx)=>(
                <article className={`plan-card ${plan.best?"best":""}`} key={plan.name}>
                  {plan.best&&<span>MAIS ESCOLHIDO</span>}<h3>{plan.name}</h3><div><strong>{plan.price}</strong><small>{plan.note}</small></div>
                  <ul>{plan.items.map(x=><li key={x}>✓ {x}</li>)}</ul>
                  <button onClick={()=>setAdStep(idx+1)}>Escolher {plan.name}</button>
                </article>
              ))}
            </div>
            <p className="ad-note">Todos os anúncios passam por curadoria e aparecem identificados como patrocinados. Pagamento não interfere nas avaliações.</p>
          </div>
        )}

        {view === "admin" && (
          <div className="page admin-page">
            <div className="search-heading"><div><span>PAINEL DA COMUNIDADE</span><h2>Uma rede saudável, <em>em números.</em></h2><p>Visão demonstrativa para gestão e tomada de decisões.</p></div><button className="outline">Últimos 30 dias⌄</button></div>
            <div className="metrics">
              {[["1.248","Membros verificados","+12%"],["438","Contatos gerados","+21%"],["R$ 184 mil","Negócios declarados","+18%"],["4,8","Confiança média","↑ 0,2"]].map(x=><article key={x[1]}><span>{x[1]}</span><strong>{x[0]}</strong><small>{x[2]}</small></article>)}
            </div>
            <div className="admin-grid">
              <article className="chart-card"><div><span>NEGÓCIOS NA COMUNIDADE</span><button>Mensal⌄</button></div><h3>Valor declarado por membros</h3><div className="chart"><i style={{height:"32%"}}/><i style={{height:"46%"}}/><i style={{height:"40%"}}/><i style={{height:"58%"}}/><i style={{height:"66%"}}/><i style={{height:"82%"}}/><i className="today" style={{height:"94%"}}/></div><div className="chart-labels"><span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span><span>Jul</span></div></article>
              <article className="health-card"><span>SAÚDE DA REDE</span><h3>Confiança em alta</h3><div className="health-score"><strong>92</strong><small>/100</small></div><p>Baixo índice de denúncias e alta taxa de respostas.</p><ul><li><i className="green"/> 94% perfis completos</li><li><i className="green"/> 87% respostas em 24h</li><li><i className="gold"/> 3 revisões pendentes</li></ul></article>
            </div>
            <article className="activity-table">
              <div><span>ATIVIDADE RECENTE</span><button>Ver todas →</button></div>
              {[["AM","Dra. Ana Martins","Recebeu uma avaliação 5 estrelas","Há 12 min","teal"],["RC","Rafael Costa","Atualizou sua disponibilidade","Há 34 min","blue"],["MS","Mariana Souza","Marcou uma venda como concluída","Há 1 h","rose"],["AR","Ateliê Rios","Campanha aprovada para veiculação","Há 2 h","gold"]].map(row=><div className="activity-row" key={row[1]}><Avatar initials={row[0]} tone={row[4]} small/><b>{row[1]}</b><span>{row[2]}</span><small>{row[3]}</small></div>)}
            </article>
          </div>
        )}
      </section>

      <nav className="mobile-nav">
        {nav.slice(0,4).map(item=><button key={item.id} className={view===item.id?"active":""} onClick={()=>setView(item.id)}><span>{item.icon}</span>{item.label}</button>)}
      </nav>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <article className="profile-modal" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setSelected(null)}>×</button>
            <div className="profile-cover"><Avatar initials={selected.initials} tone={selected.tone} /><span className="availability">● {selected.available}</span></div>
            <h2>{selected.name} {selected.verified && <i>✓</i>}</h2>
            <p className="role">{selected.role} • {selected.area}</p>
            <div className="relation">{selected.verified ? "✓ " : "◈ "}{selected.relation}</div>
            <div className="profile-stats"><div><strong>★ {selected.rating}</strong><small>{selected.reviews} avaliações</small></div><div><strong>98%</strong><small>respondem em 24h</small></div><div><strong>4 anos</strong><small>na comunidade</small></div></div>
            <h3>Sobre</h3><p>Atendimento cuidadoso e personalizado, com agenda reservada para membros da Comunidade Petrópolis.</p>
            <div className="profile-actions"><button className="primary" onClick={() => { setWhatsapp(true); setSelected(null); }}>Conversar pelo WhatsApp</button><button className="outline" onClick={() => setReview(true)}>Avaliações</button></div>
          </article>
        </div>
      )}

      {whatsapp && (
        <div className="drawer-backdrop" onClick={() => setWhatsapp(false)}>
          <aside className="whatsapp-drawer" onClick={e=>e.stopPropagation()}>
            <header><div className="wa-avatar">P</div><div><b>Assistente Petrópolis</b><small>● online • respostas da comunidade</small></div><button onClick={()=>setWhatsapp(false)}>×</button></header>
            <div className="wa-chat">
              <div className="wa-date">HOJE</div>
              <div className="wa-message bot">Olá, Ricardo! Sou o assistente da Comunidade Petrópolis. O que você procura hoje?<time>15:42</time></div>
              {waStep >= 1 && <div className="wa-message user">Dentista<time>15:43 ✓✓</time></div>}
              {waStep >= 2 && <><div className="wa-message bot">Encontrei profissionais verificados. Você tem preferência de especialidade ou horário?<time>15:43</time></div><div className="wa-options"><button onClick={()=>setWaStep(3)}>Odontopediatria</button><button onClick={()=>setWaStep(3)}>Ortodontia</button><button onClick={()=>setWaStep(3)}>Qualquer especialidade</button></div></>}
              {waStep >= 3 && <div className="wa-message bot result-message"><b>Estas são as melhores opções:</b><span>1. Dra. Ana Martins • ★ 4,9<br/>Disponível hoje, 16h</span><span>2. Dr. Rafael Costa • ★ 4,8<br/>Disponível amanhã, 9h</span><small>Resultados baseados em categoria, disponibilidade e avaliações confirmadas.</small><time>15:44</time></div>}
            </div>
            <footer>{waStep === 0 ? <button className="wa-start" onClick={()=>{setWaStep(1); setTimeout(()=>setWaStep(2),500)}}>Experimentar: “Dentista” →</button> : <><button>＋</button><input aria-label="Mensagem" placeholder="Digite uma mensagem..." /><button className="wa-send" onClick={()=>setWaStep(Math.max(3,waStep+1))}>➤</button></>}</footer>
          </aside>
        </div>
      )}

      {review && (
        <div className="modal-backdrop">
          <article className="review-modal">
            <button className="close" onClick={()=>setReview(false)}>×</button>
            {!reviewSent ? <><span>AVALIAÇÃO CONFIRMADA</span><h2>Como foi sua experiência?</h2><p>O convite foi enviado pela Dra. Ana e está vinculado a um atendimento confirmado.</p><div className="stars">{[1,2,3,4,5].map(x=><button key={x}>★</button>)}</div><div className="review-tags"><button>Pontualidade</button><button>Atendimento</button><button>Comunicação</button></div><textarea aria-label="Comentário" placeholder="Conte à comunidade como foi o atendimento..." /><button className="primary wide" onClick={()=>setReviewSent(true)}>Publicar avaliação</button></> : <div className="success-state"><i>✓</i><h2>Avaliação publicada!</h2><p>Obrigado por ajudar a fortalecer a confiança na comunidade.</p><button className="primary" onClick={()=>{setReview(false);setReviewSent(false)}}>Concluir</button></div>}
          </article>
        </div>
      )}

      {adStep > 0 && (
        <div className="modal-backdrop">
          <article className="checkout-modal">
            <button className="close" onClick={()=>setAdStep(0)}>×</button>
            <span>CONTRATAÇÃO DEMONSTRATIVA</span><h2>Finalize seu destaque</h2>
            <div className="checkout-line"><div><b>Plano {adStep===1?"Presença":adStep===2?"Destaque":"Parceiro"}</b><small>Veiculação por 30 dias</small></div><strong>{adStep===1?"R$ 149":adStep===2?"R$ 349":"R$ 790"}</strong></div>
            <label>Nome da empresa<input defaultValue="Ateliê Rios Arquitetura" /></label>
            <label>Forma de pagamento</label><div className="payment-choices"><button className="selected">Pix</button><button>Cartão</button></div>
            <button className="primary wide" onClick={()=>{setAdStep(0);notify("Pagamento simulado aprovado • anúncio em revisão")}}>Gerar pagamento demonstrativo</button>
            <small className="secure">🔒 Nenhuma cobrança real será realizada.</small>
          </article>
        </div>
      )}
      {toast && <div className="toast">✓ {toast}</div>}
    </main>
  );
}
