import { useMemo, useState, type ReactNode } from 'react'
import './App.css'

type Screen = {
  id: string
  label: string
  title: string
}

type NavGroup = {
  id: string
  label: string
  items: string[]
}

type SpaceCard = {
  name: string
  price: string
  capacity: string
  image: string
}

const screens: Screen[] = [
  { id: 'login', label: 'login', title: 'acesso ao sistema' },
  { id: 'home', label: 'home', title: 'painel inicial' },
  { id: 'espacos', label: 'espacos', title: 'espacos populares' },
  { id: 'gerente', label: 'acesso gerente', title: 'menu gerente' },
  {
    id: 'gerencia-clientes',
    label: 'gerenciamento clientes',
    title: 'gerenciamento de clientes',
  },
  { id: 'criar-cliente', label: 'criar cliente', title: 'novo cliente' },
  { id: 'alterar-cliente', label: 'alterar cliente', title: 'editar cliente' },
  { id: 'deletar-cliente', label: 'deletar cliente', title: 'remover cliente' },
  {
    id: 'lista-convidados',
    label: 'lista convidados',
    title: 'convidados da reserva',
  },
  { id: 'criar-espaco', label: 'criar espaco', title: 'novo espaco' },
  {
    id: 'gerencia-espacos',
    label: 'gerenciamento espacos',
    title: 'gerenciamento de espacos',
  },
  { id: 'criar-reserva', label: 'criar reserva', title: 'nova reserva' },
  {
    id: 'gerencia-reservas',
    label: 'gerenciamento reservas',
    title: 'gerenciamento de reservas',
  },
  { id: 'alterar-reserva', label: 'alterar reserva', title: 'alterar reserva' },
  { id: 'deletar-reserva', label: 'deletar reserva', title: 'deletar reserva' },
  { id: 'alterar-espaco', label: 'alterar espaco', title: 'alterar espaco' },
  { id: 'deletar-espaco', label: 'deletar espaco', title: 'deletar espaco' },
  { id: 'pagamento', label: 'pagamento', title: 'metodo de pagamento' },
]

const navGroups: NavGroup[] = [
  { id: 'operacao', label: 'operacao', items: ['home', 'gerente'] },
  {
    id: 'clientes',
    label: 'clientes',
    items: ['gerencia-clientes', 'criar-cliente', 'alterar-cliente', 'deletar-cliente'],
  },
  {
    id: 'espacos',
    label: 'espacos',
    items: ['espacos', 'gerencia-espacos', 'criar-espaco', 'alterar-espaco', 'deletar-espaco'],
  },
  {
    id: 'reservas',
    label: 'reservas',
    items: [
      'gerencia-reservas',
      'criar-reserva',
      'alterar-reserva',
      'deletar-reserva',
      'lista-convidados',
    ],
  },
  { id: 'financeiro', label: 'financeiro', items: ['pagamento'] },
]

const spaceCards: SpaceCard[] = [
  {
    name: 'resort neo atlanta',
    price: 'r$ 1.280 / dia',
    capacity: '42 pessoas',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'casa aurora',
    price: 'r$ 820 / dia',
    capacity: '20 pessoas',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'hall orbit',
    price: 'r$ 740 / dia',
    capacity: '30 pessoas',
    image:
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
  },
]

const primaryActions = ['criar novo cliente', 'fazer reserva', 'adicionar novo espaco']

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input placeholder={placeholder} />
    </label>
  )
}

function SectionCard({
  heading,
  children,
}: {
  heading: string
  children: ReactNode
}) {
  return (
    <section className="section-card">
      <h3>{heading}</h3>
      {children}
    </section>
  )
}

function NavIcon({ id }: { id: string }) {
  switch (id) {
    case 'home':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 10.5 12 3l9 7.5v10a.5.5 0 0 1-.5.5H14v-6h-4v6H3.5a.5.5 0 0 1-.5-.5z" />
        </svg>
      )
    case 'espacos':
    case 'gerencia-espacos':
    case 'criar-espaco':
    case 'alterar-espaco':
    case 'deletar-espaco':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 20h18v1H3zM5 19V8h14v11h-2v-4H7v4zm3-8h2v2H8zm6 0h2v2h-2z" />
        </svg>
      )
    case 'gerente':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2 2 7l10 5 8-4v7h2V7zM6 13v4c0 2.2 2.7 4 6 4s6-1.8 6-4v-4l-6 3z" />
        </svg>
      )
    case 'gerencia-clientes':
    case 'criar-cliente':
    case 'alterar-cliente':
    case 'deletar-cliente':
    case 'lista-convidados':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4m-8 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3m0 2c-2.7 0-5 1.3-5 3v2h8v-2c0-.9.3-1.7.9-2.4A9.6 9.6 0 0 0 8 13m8 0c-2.7 0-5 1.3-5 3v2h10v-2c0-1.7-2.3-3-5-3" />
        </svg>
      )
    case 'gerencia-reservas':
    case 'criar-reserva':
    case 'alterar-reserva':
    case 'deletar-reserva':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 2h2v2h6V2h2v2h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3zm12 8H5v10h14zm-9 3h4v2h-4z" />
        </svg>
      )
    case 'pagamento':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2H3zm0 4h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm12 4h4v2h-4z" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 4h16v16H4z" />
        </svg>
      )
  }
}

function GroupIcon({ id }: { id: string }) {
  switch (id) {
    case 'operacao':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m1 10.6V7h-2v7h6v-2z" />
        </svg>
      )
    case 'clientes':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4m-8 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3m0 2c-2.7 0-5 1.3-5 3v2h8v-2c0-.9.3-1.7.9-2.4A9.6 9.6 0 0 0 8 13m8 0c-2.7 0-5 1.3-5 3v2h10v-2c0-1.7-2.3-3-5-3" />
        </svg>
      )
    case 'espacos':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 20h18v1H3zM5 19V8h14v11h-2v-4H7v4zm3-8h2v2H8zm6 0h2v2h-2z" />
        </svg>
      )
    case 'reservas':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 2h2v2h6V2h2v2h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3zm12 8H5v10h14zm-9 3h4v2h-4z" />
        </svg>
      )
    case 'financeiro':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2a8 8 0 0 0-2 15.7V20h4v-2.3A8 8 0 0 0 12 2m1 12.9V16h-2v-1.1a4 4 0 0 1-3-3.9h2a2 2 0 0 0 4 0c0-1.1-.9-1.5-2.4-2S8 7.8 8 6a4 4 0 0 1 3-3.9V1.9h2v.2a4 4 0 0 1 3 3.9h-2a2 2 0 0 0-4 0c0 1 .8 1.4 2.4 2S16 9.2 16 11a4 4 0 0 1-3 3.9" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 4h16v16H4z" />
        </svg>
      )
  }
}

function App() {
  const [activeScreen, setActiveScreen] = useState<string>('home')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    operacao: true,
    clientes: false,
    espacos: false,
    reservas: false,
    financeiro: false,
  })

  const activeTitle = useMemo(
    () => screens.find((screen) => screen.id === activeScreen)?.title ?? 'painel inicial',
    [activeScreen],
  )

  const getScreen = (id: string): Screen | undefined => screens.find((screen) => screen.id === id)

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }))
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
    setActiveScreen('home')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setActiveScreen('home')
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case 'login':
        return (
          <SectionCard heading="bem vindo de volta">
            <div className="grid-one">
              <Field label="email" placeholder="exemplo@alug.com" />
              <Field label="senha" placeholder="••••••••" />
            </div>
            <div className="action-row login-action-row">
              <button className="primary-btn" onClick={handleLogin}>
                entrar
              </button>
            </div>
          </SectionCard>
        )

      case 'home':
        return (
          <>
            <SectionCard heading="resumo de reservas ativas">
              <div className="metrics">
                <article>
                  <p>reservas hoje</p>
                  <strong>09</strong>
                </article>
                <article>
                  <p>ocupacao media</p>
                  <strong>87%</strong>
                </article>
                <article>
                  <p>tickets em aberto</p>
                  <strong>03</strong>
                </article>
              </div>
            </SectionCard>
            <SectionCard heading="espacos em destaque">
              <div className="card-grid">
                {spaceCards.map((card) => (
                  <article key={card.name} className="image-card">
                    <img src={card.image} alt={card.name} />
                    <div>
                      <h4>{card.name}</h4>
                      <p>{card.price}</p>
                      <p>{card.capacity}</p>
                    </div>
                  </article>
                ))}
              </div>
            </SectionCard>
          </>
        )

      case 'espacos':
        return (
          <>
            <SectionCard heading="espacos populares">
              <div className="card-grid">
                {spaceCards.map((card) => (
                  <article key={card.name} className="image-card">
                    <img src={card.image} alt={card.name} />
                    <div>
                      <h4>{card.name}</h4>
                      <p>{card.price}</p>
                      <p>{card.capacity}</p>
                    </div>
                  </article>
                ))}
              </div>
            </SectionCard>
            <SectionCard heading="pesquisar espaco">
              <Field label="nome do espaco" placeholder="digite para pesquisar" />
            </SectionCard>
          </>
        )

      case 'gerente':
        return (
          <>
            <SectionCard heading="menu rapido">
              <div className="quick-actions">
                {primaryActions.map((action) => (
                  <button key={action} className="chip-btn">
                    {action}
                  </button>
                ))}
              </div>
            </SectionCard>
            <SectionCard heading="atalhos do sistema">
              <div className="tags">
                <span>clientes</span>
                <span>espacos</span>
                <span>reservas</span>
                <span>convidados</span>
              </div>
            </SectionCard>
          </>
        )

      case 'gerencia-clientes':
        return (
          <>
            <SectionCard heading="acoes de clientes">
              <div className="quick-actions">
                <button className="chip-btn">criar cliente</button>
                <button className="chip-btn">alterar cliente</button>
                <button className="chip-btn">deletar cliente</button>
              </div>
            </SectionCard>
            <SectionCard heading="pesquisar cliente">
              <Field label="nome" placeholder="nome completo" />
            </SectionCard>
          </>
        )

      case 'criar-cliente':
      case 'alterar-cliente':
        return (
          <SectionCard
            heading={activeScreen === 'criar-cliente' ? 'criar cliente' : 'alterar cliente'}
          >
            <div className="grid-two">
              <Field label="nome" placeholder="nome do cliente" />
              <Field label="cpf" placeholder="000.000.000-00" />
              <Field label="telefone" placeholder="(00) 00000-0000" />
              <Field label="email" placeholder="cliente@email.com" />
              <Field label="endereco" placeholder="rua, numero, bairro" />
            </div>
            <div className="action-row">
              <button className="ghost-btn">voltar</button>
              <button className="primary-btn">
                {activeScreen === 'criar-cliente' ? 'inserir' : 'alterar'}
              </button>
            </div>
          </SectionCard>
        )

      case 'deletar-cliente':
        return (
          <SectionCard heading="deletar cliente">
            <div className="grid-one">
              <Field label="nome do cliente" placeholder="digite o nome" />
              <Field label="confirmacao" placeholder="digite deletar para confirmar" />
            </div>
            <div className="action-row">
              <button className="ghost-btn">voltar</button>
              <button className="danger-btn">excluir</button>
            </div>
          </SectionCard>
        )

      case 'lista-convidados':
        return (
          <SectionCard heading="lista de convidados">
            <table className="data-table">
              <thead>
                <tr>
                  <th>nome</th>
                  <th>documento</th>
                  <th>status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ana monteiro</td>
                  <td>***.***.***-18</td>
                  <td>confirmado</td>
                </tr>
                <tr>
                  <td>carlos neto</td>
                  <td>***.***.***-22</td>
                  <td>pendente</td>
                </tr>
                <tr>
                  <td>joana ferraz</td>
                  <td>***.***.***-45</td>
                  <td>confirmado</td>
                </tr>
              </tbody>
            </table>
          </SectionCard>
        )

      case 'criar-espaco':
        return (
          <SectionCard heading="criar espaco">
            <div className="grid-two">
              <Field label="endereco" placeholder="rua, numero, bairro" />
              <Field label="capacidade" placeholder="numero de pessoas" />
              <Field label="valor" placeholder="r$ 0,00" />
            </div>
            <div className="action-row">
              <button className="ghost-btn">voltar</button>
              <button className="primary-btn">inserir</button>
            </div>
          </SectionCard>
        )

      case 'gerencia-espacos':
        return (
          <>
            <SectionCard heading="acoes de espacos">
              <div className="quick-actions">
                <button className="chip-btn">criar espaco</button>
                <button className="chip-btn">alterar espaco</button>
                <button className="chip-btn">deletar espaco</button>
              </div>
            </SectionCard>
            <SectionCard heading="pesquisar espaco">
              <Field label="nome" placeholder="nome do espaco" />
            </SectionCard>
          </>
        )

      case 'criar-reserva':
        return (
          <SectionCard heading="criar reserva">
            <div className="grid-two">
              <Field label="id do cliente" placeholder="id cliente" />
              <Field label="id do gerente" placeholder="id gerente" />
              <Field label="id do espaco" placeholder="id espaco" />
              <Field label="data" placeholder="dd/mm/aaaa" />
              <Field label="lista de convidados" placeholder="nome1, nome2" />
              <Field label="servicos extras" placeholder="buffet, fotografos" />
              <Field label="valor" placeholder="r$ 0,00" />
            </div>
            <div className="action-row">
              <button className="ghost-btn">voltar</button>
              <button className="primary-btn">prosseguir</button>
            </div>
          </SectionCard>
        )

      case 'gerencia-reservas':
        return (
          <>
            <SectionCard heading="acoes de reservas">
              <div className="quick-actions">
                <button className="chip-btn">fazer reserva</button>
                <button className="chip-btn">alterar reserva</button>
                <button className="chip-btn">deletar reserva</button>
              </div>
            </SectionCard>
            <SectionCard heading="pesquisar reserva">
              <Field label="id ou cliente" placeholder="buscar reserva" />
            </SectionCard>
          </>
        )

      case 'alterar-reserva':
        return (
          <SectionCard heading="alterar reserva">
            <div className="grid-two">
              <Field label="id do cliente" placeholder="id cliente" />
              <Field label="id do gerente" placeholder="id gerente" />
              <Field label="id do espaco" placeholder="id espaco" />
              <Field label="data" placeholder="dd/mm/aaaa" />
              <Field label="lista de convidados" placeholder="nome1, nome2" />
              <Field label="servicos opcionais" placeholder="buffet, fotografos" />
              <Field label="valor" placeholder="r$ 0,00" />
            </div>
            <div className="action-row">
              <button className="ghost-btn">voltar</button>
              <button className="primary-btn">alterar</button>
            </div>
          </SectionCard>
        )

      case 'deletar-reserva':
        return (
          <SectionCard heading="deletar reserva">
            <div className="grid-one">
              <Field label="reserva a excluir" placeholder="id da reserva" />
              <Field label="confirmacao" placeholder="digite excluir para confirmar" />
            </div>
            <div className="action-row">
              <button className="ghost-btn">voltar</button>
              <button className="danger-btn">excluir</button>
            </div>
          </SectionCard>
        )

      case 'alterar-espaco':
        return (
          <SectionCard heading="alterar espaco">
            <div className="grid-two">
              <Field label="endereco" placeholder="rua, numero, bairro" />
              <Field label="capacidade" placeholder="numero de pessoas" />
              <Field label="valor" placeholder="r$ 0,00" />
            </div>
            <div className="action-row">
              <button className="ghost-btn">voltar</button>
              <button className="primary-btn">alterar</button>
            </div>
          </SectionCard>
        )

      case 'deletar-espaco':
        return (
          <SectionCard heading="deletar espaco">
            <div className="grid-one">
              <Field label="espaco a excluir" placeholder="id do espaco" />
              <Field label="confirmacao" placeholder="digite excluir para confirmar" />
            </div>
            <div className="action-row">
              <button className="ghost-btn">voltar</button>
              <button className="danger-btn">excluir</button>
            </div>
          </SectionCard>
        )

      case 'pagamento':
        return (
          <SectionCard heading="metodo de pagamento">
            <div className="grid-two">
              <div className="quick-actions">
                <button className="chip-btn">cartao de debito</button>
                <button className="chip-btn">cartao de credito</button>
                <button className="chip-btn">pix</button>
              </div>
              <div className="payment-info">
                <h4>dados</h4>
                <p>titular: nome do cliente</p>
                <p>cpf: 000.000.000-00</p>
                <p>conta: banco alug</p>
                <p>agencia: 0001</p>
                <p>conta corrente: 12345-6</p>
                <p>chave pix: contato@alug.com</p>
              </div>
            </div>
            <div className="action-row">
              <button className="ghost-btn">cancelar</button>
              <button className="primary-btn">registrar pagamento</button>
            </div>
          </SectionCard>
        )

      default:
        return null
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="login-layout">
        <section className="login-hero">
          <div className="hero-icon">al</div>
          <h1>alug sistema</h1>
        </section>

        <section className="login-panel">
          <div className="login-form-card">
            <div className="login-brand">alug</div>
            <p className="login-caption">informe e-mail e senha para acessar o sistema.</p>
            <div className="grid-one login-fields">
              <Field label="e-mail" placeholder="seu@email.com" />
              <Field label="senha" placeholder="digite sua senha" />
            </div>
            <button className="primary-btn login-submit" onClick={handleLogin}>
              entrar como administrador
            </button>
          </div>
          <small className="login-footer">desenvolvido por equipe alug</small>
        </section>
      </main>
    )
  }

  return (
    <div className="dashboard-shell">
      <aside className="left-nav">
        <div className="nav-logo">
          <strong>alug sistema</strong>
          <small>inovar sempre</small>
        </div>
        {navGroups.map((group) => (
          <section key={group.id} className="nav-group">
            <button
              className="nav-group-toggle"
              onClick={() => toggleGroup(group.id)}
              aria-expanded={openGroups[group.id]}
            >
              <span className="nav-group-header">
                <span className="nav-icon">
                  <GroupIcon id={group.id} />
                </span>
                <span>{group.label}</span>
              </span>
              <span className={openGroups[group.id] ? 'nav-chevron is-open' : 'nav-chevron'}>
                ▾
              </span>
            </button>
            {openGroups[group.id] && (
              <div className="nav-group-items">
                {group.items.map((id) => {
                  const screen = getScreen(id)
                  if (!screen) {
                    return null
                  }

                  return (
                    <button
                      key={screen.id}
                      onClick={() => setActiveScreen(screen.id)}
                      className={screen.id === activeScreen ? 'nav-btn is-active' : 'nav-btn'}
                    >
                      <span className="nav-btn-inner">
                        <span className="nav-icon">
                          <NavIcon id={screen.id} />
                        </span>
                        <span>{screen.label}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </section>
        ))}
      </aside>

      <main className="workspace-main">
        <header className="topbar">
          <div className="header-title-group">
            <button className="menu-dot">☰</button>
            <h1>painel</h1>
          </div>
          <button className="ghost-btn" onClick={handleLogout}>
            sair
          </button>
        </header>

        <section className="content-area">
          <div className="content-header">
            <h2>{activeTitle}</h2>
          </div>
          <div className="content-body">{renderScreen()}</div>
        </section>
      </main>
    </div>
  )
}

export default App
