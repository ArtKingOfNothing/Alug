import { useMemo, useState, type ReactNode } from 'react'
import './App.css'

type Screen = {
  id: string
  label: string
  title: string
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

function App() {
  const [activeScreen, setActiveScreen] = useState<string>('home')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  const menuScreens = screens.filter((screen) => screen.id !== 'login')

  const activeTitle = useMemo(
    () => menuScreens.find((screen) => screen.id === activeScreen)?.title ?? 'painel inicial',
    [activeScreen, menuScreens],
  )

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
        {menuScreens.map((screen) => (
          <button
            key={screen.id}
            onClick={() => setActiveScreen(screen.id)}
            className={screen.id === activeScreen ? 'nav-btn is-active' : 'nav-btn'}
          >
            {screen.label}
          </button>
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
