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

type ClienteItem = {
  id: number
  nome: string
  cpf: string
  telefone: string
  email: string
  endereco: string
}

type EspacoItem = {
  id: number
  nome: string
  capacidade: string
  valor: string
  endereco: string
}

type ReservaItem = {
  id: number
  cliente: string
  clienteId: string
  gerenteId: string
  espacoId: string
  data: string
  convidados: string
  servicos: string
  valor: string
}

const screens: Screen[] = [
  { id: 'login', label: 'login', title: 'acesso ao sistema' },
  { id: 'home', label: 'home', title: 'painel inicial' },
  { id: 'espacos', label: 'espacos', title: 'espacos populares' },
  { id: 'gerente', label: 'painel gerencial', title: 'modulo gerencial' },
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
    items: ['gerencia-clientes'],
  },
  {
    id: 'espacos',
    label: 'espacos',
    items: ['espacos', 'gerencia-espacos'],
  },
  {
    id: 'reservas',
    label: 'reservas',
    items: ['gerencia-reservas', 'lista-convidados'],
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

const initialClientes: ClienteItem[] = [
  {
    id: 1,
    nome: 'ana monteiro',
    cpf: '123.456.789-00',
    telefone: '(35) 99999-1111',
    email: 'ana@email.com',
    endereco: 'rua a, 10',
  },
  {
    id: 2,
    nome: 'carlos neto',
    cpf: '987.654.321-00',
    telefone: '(35) 98888-2222',
    email: 'carlos@email.com',
    endereco: 'rua b, 20',
  },
]

const initialEspacos: EspacoItem[] = [
  {
    id: 1,
    nome: 'resort neo atlanta',
    capacidade: '42',
    valor: '1280',
    endereco: 'av central, 100',
  },
  {
    id: 2,
    nome: 'hall orbit',
    capacidade: '30',
    valor: '740',
    endereco: 'rua das palmeiras, 80',
  },
]

const initialReservas: ReservaItem[] = [
  {
    id: 1,
    cliente: 'ana monteiro',
    clienteId: '1',
    gerenteId: '1',
    espacoId: '1',
    data: '15/09/2026',
    convidados: 'maria, pedro',
    servicos: 'buffet',
    valor: '2500',
  },
  {
    id: 2,
    cliente: 'carlos neto',
    clienteId: '2',
    gerenteId: '1',
    espacoId: '2',
    data: '23/10/2026',
    convidados: 'julia, paulo',
    servicos: 'fotografia',
    valor: '1800',
  },
]

function Field({
  label,
  placeholder,
  value,
  type = 'text',
  onChange,
}: {
  label: string
  placeholder: string
  value?: string
  type?: string
  onChange?: (value: string) => void
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={(event) => onChange?.(event.target.value)}
      />
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

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m3 17.25 11.06-11.06 3.75 3.75L6.75 21H3zm14.71-9.04 1.41-1.41a1 1 0 0 0 0-1.41L17.62 3.9a1 1 0 0 0-1.41 0L14.8 5.31z" />
    </svg>
  )
}

function DotsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 7a2 2 0 1 0-2-2 2 2 0 0 0 2 2m0 7a2 2 0 1 0-2-2 2 2 0 0 0 2 2m0 7a2 2 0 1 0-2-2 2 2 0 0 0 2 2" />
    </svg>
  )
}

function App() {
  const [activeScreen, setActiveScreen] = useState<string>('home')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [loginEmail, setLoginEmail] = useState<string>('admin@alug.com')
  const [loginSenha, setLoginSenha] = useState<string>('admin123')
  const [resumoDashboard] = useState({
    reservasHoje: 0,
    ocupacaoMedia: 0,
    ticketsAbertos: 0,
    clientesBase: 0,
    espacosBase: 0,
    reservasBase: 0,
  })
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    operacao: true,
    clientes: false,
    espacos: false,
    reservas: false,
    financeiro: false,
  })
  const [clienteMode, setClienteMode] = useState<'criar' | 'editar' | 'deletar'>('criar')
  const [espacoMode, setEspacoMode] = useState<'criar' | 'editar' | 'deletar'>('criar')
  const [reservaMode, setReservaMode] = useState<'criar' | 'editar' | 'deletar'>('criar')
  const [clientes, setClientes] = useState<ClienteItem[]>(initialClientes)
  const [espacos, setEspacos] = useState<EspacoItem[]>(initialEspacos)
  const [reservas, setReservas] = useState<ReservaItem[]>(initialReservas)
  const [openActionKey, setOpenActionKey] = useState<string | null>(null)
  const [clienteForm, setClienteForm] = useState<ClienteItem>({
    id: 0,
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    endereco: '',
  })
  const [espacoForm, setEspacoForm] = useState<EspacoItem>({
    id: 0,
    nome: '',
    capacidade: '',
    valor: '',
    endereco: '',
  })
  const [reservaForm, setReservaForm] = useState<ReservaItem>({
    id: 0,
    cliente: '',
    clienteId: '',
    gerenteId: '',
    espacoId: '',
    data: '',
    convidados: '',
    servicos: '',
    valor: '',
  })

  const activeTitle = useMemo(
    () => screens.find((screen) => screen.id === activeScreen)?.title ?? 'painel inicial',
    [activeScreen],
  )

  const getScreen = (id: string): Screen | undefined => screens.find((screen) => screen.id === id)

  const handleLogin = () => {
    // login em modo demonstracao: libera o acesso sem validacao no backend.
    setIsAuthenticated(true)
    setActiveScreen('home')
  }

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }))
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setActiveScreen('home')
  }

  const resetClienteForm = () => {
    setClienteForm({ id: 0, nome: '', cpf: '', telefone: '', email: '', endereco: '' })
  }

  const resetEspacoForm = () => {
    setEspacoForm({ id: 0, nome: '', capacidade: '', valor: '', endereco: '' })
  }

  const resetReservaForm = () => {
    setReservaForm({
      id: 0,
      cliente: '',
      clienteId: '',
      gerenteId: '',
      espacoId: '',
      data: '',
      convidados: '',
      servicos: '',
      valor: '',
    })
  }

  const salvarCliente = () => {
    if (clienteMode === 'criar') {
      setClientes((prev) => [...prev, { ...clienteForm, id: Date.now() }])
      resetClienteForm()
      return
    }

    if (clienteMode === 'editar') {
      setClientes((prev) => prev.map((item) => (item.id === clienteForm.id ? { ...clienteForm } : item)))
      return
    }

    setClientes((prev) => prev.filter((item) => item.id !== clienteForm.id))
    resetClienteForm()
  }

  const salvarEspaco = () => {
    if (espacoMode === 'criar') {
      setEspacos((prev) => [...prev, { ...espacoForm, id: Date.now() }])
      resetEspacoForm()
      return
    }

    if (espacoMode === 'editar') {
      setEspacos((prev) => prev.map((item) => (item.id === espacoForm.id ? { ...espacoForm } : item)))
      return
    }

    setEspacos((prev) => prev.filter((item) => item.id !== espacoForm.id))
    resetEspacoForm()
  }

  const salvarReserva = () => {
    if (reservaMode === 'criar') {
      setReservas((prev) => [...prev, { ...reservaForm, id: Date.now() }])
      resetReservaForm()
      return
    }

    if (reservaMode === 'editar') {
      setReservas((prev) => prev.map((item) => (item.id === reservaForm.id ? { ...reservaForm } : item)))
      return
    }

    setReservas((prev) => prev.filter((item) => item.id !== reservaForm.id))
    resetReservaForm()
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
                  <strong>{resumoDashboard.reservasHoje || 9}</strong>
                </article>
                <article>
                  <p>ocupacao media</p>
                  <strong>{resumoDashboard.ocupacaoMedia || 87}%</strong>
                </article>
                <article>
                  <p>tickets em aberto</p>
                  <strong>{resumoDashboard.ticketsAbertos || 3}</strong>
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
            <SectionCard heading="dados conectados ao backend">
              <div className="metrics">
                <article>
                  <p>clientes base</p>
                  <strong>{resumoDashboard.clientesBase || 24}</strong>
                </article>
                <article>
                  <p>espacos base</p>
                  <strong>{resumoDashboard.espacosBase || 8}</strong>
                </article>
                <article>
                  <p>reservas base</p>
                  <strong>{resumoDashboard.reservasBase || 17}</strong>
                </article>
              </div>
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
      case 'criar-cliente':
      case 'alterar-cliente':
      case 'deletar-cliente':
        return (
          <>
            <SectionCard heading="clientes em uma tela unica">
              <div className="quick-actions">
                <button
                  className={clienteMode === 'criar' ? 'chip-btn is-selected' : 'chip-btn'}
                  onClick={() => setClienteMode('criar')}
                >
                  criar
                </button>
                <button
                  className={clienteMode === 'editar' ? 'chip-btn is-selected' : 'chip-btn'}
                  onClick={() => setClienteMode('editar')}
                >
                  editar
                </button>
                <button
                  className={clienteMode === 'deletar' ? 'chip-btn is-selected' : 'chip-btn'}
                  onClick={() => setClienteMode('deletar')}
                >
                  deletar
                </button>
              </div>
            </SectionCard>

            <SectionCard heading="lista de clientes">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>nome</th>
                    <th>cpf</th>
                    <th>telefone</th>
                    <th>acao</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((item) => {
                    const actionKey = `cliente-${item.id}`
                    return (
                      <tr key={item.id}>
                        <td>{item.nome}</td>
                        <td>{item.cpf}</td>
                        <td>{item.telefone}</td>
                        <td>
                          <div className="table-actions-wrap">
                            <button
                              className="icon-action"
                              onClick={() => {
                                setClienteMode('editar')
                                setClienteForm(item)
                              }}
                            >
                              <PencilIcon />
                            </button>
                            <button
                              className="icon-action"
                              onClick={() =>
                                setOpenActionKey((prev) => (prev === actionKey ? null : actionKey))
                              }
                            >
                              <DotsIcon />
                            </button>
                            {openActionKey === actionKey ? (
                              <div className="row-menu">
                                <button
                                  onClick={() => {
                                    setClienteMode('editar')
                                    setClienteForm(item)
                                    setOpenActionKey(null)
                                  }}
                                >
                                  editar
                                </button>
                                <button
                                  onClick={() => {
                                    setClienteMode('deletar')
                                    setClienteForm(item)
                                    setOpenActionKey(null)
                                  }}
                                >
                                  excluir
                                </button>
                              </div>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </SectionCard>

            <SectionCard heading={clienteMode === 'deletar' ? 'deletar cliente' : 'formulario cliente'}>
              {clienteMode === 'deletar' ? (
                <div className="grid-one">
                  <Field label="id ou nome" placeholder="cliente a excluir" />
                  <Field label="confirmacao" placeholder="digite excluir para confirmar" />
                </div>
              ) : (
                <div className="grid-two">
                  <Field
                    label="nome"
                    placeholder="nome do cliente"
                    value={clienteForm.nome}
                    onChange={(value) => setClienteForm((prev) => ({ ...prev, nome: value }))}
                  />
                  <Field
                    label="cpf"
                    placeholder="000.000.000-00"
                    value={clienteForm.cpf}
                    onChange={(value) => setClienteForm((prev) => ({ ...prev, cpf: value }))}
                  />
                  <Field
                    label="telefone"
                    placeholder="(00) 00000-0000"
                    value={clienteForm.telefone}
                    onChange={(value) => setClienteForm((prev) => ({ ...prev, telefone: value }))}
                  />
                  <Field
                    label="email"
                    placeholder="cliente@email.com"
                    value={clienteForm.email}
                    onChange={(value) => setClienteForm((prev) => ({ ...prev, email: value }))}
                  />
                  <Field
                    label="endereco"
                    placeholder="rua, numero, bairro"
                    value={clienteForm.endereco}
                    onChange={(value) => setClienteForm((prev) => ({ ...prev, endereco: value }))}
                  />
                </div>
              )}
              <div className="action-row">
                <button className="ghost-btn" onClick={resetClienteForm}>
                  limpar
                </button>
                <button
                  className={clienteMode === 'deletar' ? 'danger-btn' : 'primary-btn'}
                  onClick={salvarCliente}
                >
                  {clienteMode === 'criar' ? 'inserir' : clienteMode === 'editar' ? 'alterar' : 'excluir'}
                </button>
              </div>
            </SectionCard>
          </>
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

      case 'gerencia-espacos':
      case 'criar-espaco':
      case 'alterar-espaco':
      case 'deletar-espaco':
        return (
          <>
            <SectionCard heading="espacos em uma tela unica">
              <div className="quick-actions">
                <button
                  className={espacoMode === 'criar' ? 'chip-btn is-selected' : 'chip-btn'}
                  onClick={() => setEspacoMode('criar')}
                >
                  criar
                </button>
                <button
                  className={espacoMode === 'editar' ? 'chip-btn is-selected' : 'chip-btn'}
                  onClick={() => setEspacoMode('editar')}
                >
                  editar
                </button>
                <button
                  className={espacoMode === 'deletar' ? 'chip-btn is-selected' : 'chip-btn'}
                  onClick={() => setEspacoMode('deletar')}
                >
                  deletar
                </button>
              </div>
            </SectionCard>

            <SectionCard heading="lista de espacos">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>espaco</th>
                    <th>capacidade</th>
                    <th>valor</th>
                    <th>acao</th>
                  </tr>
                </thead>
                <tbody>
                  {espacos.map((item) => {
                    const actionKey = `espaco-${item.id}`
                    return (
                      <tr key={item.id}>
                        <td>{item.nome}</td>
                        <td>{item.capacidade}</td>
                        <td>{`r$ ${item.valor},00`}</td>
                        <td>
                          <div className="table-actions-wrap">
                            <button
                              className="icon-action"
                              onClick={() => {
                                setEspacoMode('editar')
                                setEspacoForm(item)
                              }}
                            >
                              <PencilIcon />
                            </button>
                            <button
                              className="icon-action"
                              onClick={() =>
                                setOpenActionKey((prev) => (prev === actionKey ? null : actionKey))
                              }
                            >
                              <DotsIcon />
                            </button>
                            {openActionKey === actionKey ? (
                              <div className="row-menu">
                                <button
                                  onClick={() => {
                                    setEspacoMode('editar')
                                    setEspacoForm(item)
                                    setOpenActionKey(null)
                                  }}
                                >
                                  editar
                                </button>
                                <button
                                  onClick={() => {
                                    setEspacoMode('deletar')
                                    setEspacoForm(item)
                                    setOpenActionKey(null)
                                  }}
                                >
                                  excluir
                                </button>
                              </div>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </SectionCard>

            <SectionCard heading={espacoMode === 'deletar' ? 'deletar espaco' : 'formulario espaco'}>
              {espacoMode === 'deletar' ? (
                <div className="grid-one">
                  <Field label="id ou nome" placeholder="espaco a excluir" />
                  <Field label="confirmacao" placeholder="digite excluir para confirmar" />
                </div>
              ) : (
                <div className="grid-two">
                  <Field
                    label="nome"
                    placeholder="nome do espaco"
                    value={espacoForm.nome}
                    onChange={(value) => setEspacoForm((prev) => ({ ...prev, nome: value }))}
                  />
                  <Field
                    label="endereco"
                    placeholder="rua, numero, bairro"
                    value={espacoForm.endereco}
                    onChange={(value) => setEspacoForm((prev) => ({ ...prev, endereco: value }))}
                  />
                  <Field
                    label="capacidade"
                    placeholder="numero de pessoas"
                    value={espacoForm.capacidade}
                    onChange={(value) => setEspacoForm((prev) => ({ ...prev, capacidade: value }))}
                  />
                  <Field
                    label="valor"
                    placeholder="r$ 0,00"
                    value={espacoForm.valor}
                    onChange={(value) => setEspacoForm((prev) => ({ ...prev, valor: value }))}
                  />
                </div>
              )}
              <div className="action-row">
                <button className="ghost-btn" onClick={resetEspacoForm}>
                  limpar
                </button>
                <button
                  className={espacoMode === 'deletar' ? 'danger-btn' : 'primary-btn'}
                  onClick={salvarEspaco}
                >
                  {espacoMode === 'criar' ? 'inserir' : espacoMode === 'editar' ? 'alterar' : 'excluir'}
                </button>
              </div>
            </SectionCard>
          </>
        )

      case 'gerencia-reservas':
      case 'criar-reserva':
      case 'alterar-reserva':
      case 'deletar-reserva':
        return (
          <>
            <SectionCard heading="reservas em uma tela unica">
              <div className="quick-actions">
                <button
                  className={reservaMode === 'criar' ? 'chip-btn is-selected' : 'chip-btn'}
                  onClick={() => setReservaMode('criar')}
                >
                  criar
                </button>
                <button
                  className={reservaMode === 'editar' ? 'chip-btn is-selected' : 'chip-btn'}
                  onClick={() => setReservaMode('editar')}
                >
                  editar
                </button>
                <button
                  className={reservaMode === 'deletar' ? 'chip-btn is-selected' : 'chip-btn'}
                  onClick={() => setReservaMode('deletar')}
                >
                  deletar
                </button>
              </div>
            </SectionCard>

            <SectionCard heading="lista de reservas">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>cliente</th>
                    <th>data</th>
                    <th>acao</th>
                  </tr>
                </thead>
                <tbody>
                  {reservas.map((item) => {
                    const actionKey = `reserva-${item.id}`
                    return (
                      <tr key={item.id}>
                        <td>{item.id.toString().padStart(3, '0')}</td>
                        <td>{item.cliente}</td>
                        <td>{item.data}</td>
                        <td>
                          <div className="table-actions-wrap">
                            <button
                              className="icon-action"
                              onClick={() => {
                                setReservaMode('editar')
                                setReservaForm(item)
                              }}
                            >
                              <PencilIcon />
                            </button>
                            <button
                              className="icon-action"
                              onClick={() =>
                                setOpenActionKey((prev) => (prev === actionKey ? null : actionKey))
                              }
                            >
                              <DotsIcon />
                            </button>
                            {openActionKey === actionKey ? (
                              <div className="row-menu">
                                <button
                                  onClick={() => {
                                    setReservaMode('editar')
                                    setReservaForm(item)
                                    setOpenActionKey(null)
                                  }}
                                >
                                  editar
                                </button>
                                <button
                                  onClick={() => {
                                    setReservaMode('deletar')
                                    setReservaForm(item)
                                    setOpenActionKey(null)
                                  }}
                                >
                                  excluir
                                </button>
                              </div>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </SectionCard>

            <SectionCard heading={reservaMode === 'deletar' ? 'deletar reserva' : 'formulario reserva'}>
              {reservaMode === 'deletar' ? (
                <div className="grid-one">
                  <Field label="reserva a excluir" placeholder="id da reserva" />
                  <Field label="confirmacao" placeholder="digite excluir para confirmar" />
                </div>
              ) : (
                <div className="grid-two">
                  <Field
                    label="cliente"
                    placeholder="nome do cliente"
                    value={reservaForm.cliente}
                    onChange={(value) => setReservaForm((prev) => ({ ...prev, cliente: value }))}
                  />
                  <Field
                    label="id do cliente"
                    placeholder="id cliente"
                    value={reservaForm.clienteId}
                    onChange={(value) => setReservaForm((prev) => ({ ...prev, clienteId: value }))}
                  />
                  <Field
                    label="id do gerente"
                    placeholder="id gerente"
                    value={reservaForm.gerenteId}
                    onChange={(value) => setReservaForm((prev) => ({ ...prev, gerenteId: value }))}
                  />
                  <Field
                    label="id do espaco"
                    placeholder="id espaco"
                    value={reservaForm.espacoId}
                    onChange={(value) => setReservaForm((prev) => ({ ...prev, espacoId: value }))}
                  />
                  <Field
                    label="data"
                    placeholder="dd/mm/aaaa"
                    value={reservaForm.data}
                    onChange={(value) => setReservaForm((prev) => ({ ...prev, data: value }))}
                  />
                  <Field
                    label="lista de convidados"
                    placeholder="nome1, nome2"
                    value={reservaForm.convidados}
                    onChange={(value) => setReservaForm((prev) => ({ ...prev, convidados: value }))}
                  />
                  <Field
                    label="servicos opcionais"
                    placeholder="buffet, fotografos"
                    value={reservaForm.servicos}
                    onChange={(value) => setReservaForm((prev) => ({ ...prev, servicos: value }))}
                  />
                  <Field
                    label="valor"
                    placeholder="r$ 0,00"
                    value={reservaForm.valor}
                    onChange={(value) => setReservaForm((prev) => ({ ...prev, valor: value }))}
                  />
                </div>
              )}
              <div className="action-row">
                <button className="ghost-btn" onClick={resetReservaForm}>
                  limpar
                </button>
                <button
                  className={reservaMode === 'deletar' ? 'danger-btn' : 'primary-btn'}
                  onClick={salvarReserva}
                >
                  {reservaMode === 'criar' ? 'inserir' : reservaMode === 'editar' ? 'alterar' : 'excluir'}
                </button>
              </div>
            </SectionCard>
          </>
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
              <Field
                label="e-mail"
                placeholder="seu@email.com"
                value={loginEmail}
                onChange={setLoginEmail}
              />
              <Field
                label="senha"
                placeholder="digite sua senha"
                value={loginSenha}
                type="password"
                onChange={setLoginSenha}
              />
            </div>
            <p className="login-error">modo demonstracao ativo</p>
            <button className="primary-btn login-submit" onClick={handleLogin}>
              entrar
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
