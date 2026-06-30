import { useMemo, useState, useEffect, useCallback, type ReactNode } from 'react'
import {
  login as loginApi,
  listarClientes,
  criarCliente as criarClienteApi,
  atualizarCliente as atualizarClienteApi,
  deletarCliente as deletarClienteApi,
  listarEspacos,
  criarEspaco as criarEspacoApi,
  atualizarEspaco as atualizarEspacoApi,
  deletarEspaco as deletarEspacoApi,
  listarReservas,
  criarReserva as criarReservaApi,
  atualizarReserva as atualizarReservaApi,
  deletarReserva as deletarReservaApi,
  listarConvidadosPorReserva,
  adicionarConvidado as adicionarConvidadoApi,
  removerConvidado as removerConvidadoApi,
  type ClienteApi,
  type EspacoApi,
  type ReservaApi,
  type ConvidadoApi,
} from './api'
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

type ClienteFormState = {
  apiId: number | null
  nome: string
  cpf: string
  telefone: string
  email: string
}

type EspacoFormState = {
  apiId: number | null
  capacidade: string
  valor: string
  cep: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  estado: string
}

type ReservaFormState = {
  apiId: number | null
  dataEvento: string
  quantidadeConvidados: string
  valorTotal: string
  idCliente: string
  idGerente: string
  idEspaco: string
}

type QuickForm = { dataEvento: string; quantidadeConvidados: string; idCliente: string }

const SPACE_IMAGES = [
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
]

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

const EMPTY_CLIENTE_FORM: ClienteFormState = { apiId: null, nome: '', cpf: '', telefone: '', email: '' }
const EMPTY_ESPACO_FORM: EspacoFormState = { apiId: null, capacidade: '', valor: '', cep: '', logradouro: '', numero: '', bairro: '', cidade: '', estado: 'MG' }
const EMPTY_RESERVA_FORM: ReservaFormState = { apiId: null, dataEvento: '', quantidadeConvidados: '', valorTotal: '', idCliente: '', idGerente: '1', idEspaco: '' }



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

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 3h6l1 1h4v2H4V4h4zm-2 5h10l-1 13H8zm5 2h-2v9h2zm4 0h-2l-.5 9h2zm-8 0H6l.5 9H9z" />
    </svg>
  )
}

function App() {
  const [activeScreen, setActiveScreen] = useState<string>('home')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [loginEmail, setLoginEmail] = useState<string>('admin@alug.com')
  const [loginSenha, setLoginSenha] = useState<string>('admin123')
  const [loginError, setLoginError] = useState<string>('')
  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    operacao: true,
    clientes: false,
    espacos: false,
    reservas: false,
    financeiro: false,
  })
  const [clienteMode, setClienteMode] = useState<'criar' | 'editar' | 'deletar' | null>(null)
  const [espacoMode, setEspacoMode] = useState<'criar' | 'editar' | 'deletar' | null>(null)
  const [reservaMode, setReservaMode] = useState<'criar' | 'editar' | 'deletar' | null>(null)
  const [clientesApi, setClientesApi] = useState<ClienteApi[]>([])
  const [openActionKey, setOpenActionKey] = useState<string | null>(null)
  const [opError, setOpError] = useState('')
  const [clienteForm, setClienteForm] = useState<ClienteFormState>(EMPTY_CLIENTE_FORM)
  const [espacoForm, setEspacoForm] = useState<EspacoFormState>(EMPTY_ESPACO_FORM)
  const [reservaForm, setReservaForm] = useState<ReservaFormState>(EMPTY_RESERVA_FORM)

  const [espacosApi, setEspacosApi] = useState<EspacoApi[]>([])
  const [reservasApi, setReservasApi] = useState<ReservaApi[]>([])
  const [reservandoEspaco, setReservandoEspaco] = useState<EspacoApi | null>(null)
  const [quickForm, setQuickForm] = useState<QuickForm>({ dataEvento: '', quantidadeConvidados: '', idCliente: '' })
  const [quickStatus, setQuickStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [quickErro, setQuickErro] = useState('')
  const [payMethod, setPayMethod] = useState<'pix' | 'credito' | 'debito' | 'boleto' | null>(null)
  const [convidadosPorReserva, setConvidadosPorReserva] = useState<Record<number, ConvidadoApi[]>>({})
  const [novoConvidadoForm, setNovoConvidadoForm] = useState({ nome: '', telefone: '' })
  const [novoConvidadoReservaId, setNovoConvidadoReservaId] = useState<number | null>(null)

  const activeTitle = useMemo(
    () => screens.find((screen) => screen.id === activeScreen)?.title ?? 'painel inicial',
    [activeScreen],
  )

  const getScreen = (id: string): Screen | undefined => screens.find((screen) => screen.id === id)

  const handleLogin = async () => {
    setLoginError('')
    setIsLoadingLogin(true)

    try {
      const resposta = await loginApi(loginEmail, loginSenha)
      localStorage.setItem('alug_token', resposta.token)
      setIsAuthenticated(true)
      setActiveScreen('home')
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'nao foi possivel autenticar'
      setLoginError(mensagem)
    } finally {
      setIsLoadingLogin(false)
    }
  }

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }))
  }

  const handleLogout = () => {
    localStorage.removeItem('alug_token')
    setIsAuthenticated(false)
    setActiveScreen('home')
  }

  useEffect(() => {
    if (!isAuthenticated) return
    const token = localStorage.getItem('alug_token') ?? ''
    listarClientes(token).then(setClientesApi).catch(() => {})
    listarEspacos(token).then(setEspacosApi).catch(() => {})
    listarReservas(token).then(setReservasApi).catch(() => {})
  }, [isAuthenticated])

  const isReservado = (idEspaco: number) => {
    const hoje = new Date().toISOString().slice(0, 10)
    return reservasApi.find((r) => r.idEspaco === idEspaco && r.dataEvento >= hoje)
  }

  const handleQuickReserva = async () => {
    if (!reservandoEspaco) return
    setQuickStatus('loading')
    setQuickErro('')
    const token = localStorage.getItem('alug_token') ?? ''
    try {
      await criarReservaApi(
        {
          dataEvento: quickForm.dataEvento,
          quantidadeConvidados: Number(quickForm.quantidadeConvidados) || 1,
          valorTotal: reservandoEspaco.valor,
          idCliente: Number(quickForm.idCliente) || 1,
          idGerente: 1,
          idEspaco: reservandoEspaco.idEspaco,
        },
        token,
      )
      setQuickStatus('ok')
      listarReservas(token).then(setReservasApi).catch(() => {})
      setTimeout(() => {
        setReservandoEspaco(null)
        setQuickStatus('idle')
        setQuickForm({ dataEvento: '', quantidadeConvidados: '', idCliente: '' })
      }, 1800)
    } catch (err) {
      setQuickErro(err instanceof Error ? err.message : 'erro ao criar reserva')
      setQuickStatus('error')
    }
  }

  const resetClienteForm = () => setClienteForm(EMPTY_CLIENTE_FORM)
  const resetEspacoForm = () => setEspacoForm(EMPTY_ESPACO_FORM)
  const resetReservaForm = () => setReservaForm(EMPTY_RESERVA_FORM)

  const carregarConvidados = useCallback(async (idReserva: number) => {
    const token = localStorage.getItem('alug_token') ?? ''
    try {
      const lista = await listarConvidadosPorReserva(idReserva, token)
      setConvidadosPorReserva((prev) => ({ ...prev, [idReserva]: lista }))
    } catch {
      setConvidadosPorReserva((prev) => ({ ...prev, [idReserva]: [] }))
    }
  }, [])

  const handleRemoverConvidado = async (idReserva: number, idConvidado: number) => {
    const token = localStorage.getItem('alug_token') ?? ''
    try {
      await removerConvidadoApi(idReserva, idConvidado, token)
      setConvidadosPorReserva((prev) => ({
        ...prev,
        [idReserva]: (prev[idReserva] ?? []).filter((c) => c.idConvidado !== idConvidado),
      }))
    } catch { /* silently fail */ }
  }

  const handleAdicionarConvidado = async (idReserva: number) => {
    if (!novoConvidadoForm.nome.trim() || !novoConvidadoForm.telefone.trim()) return
    const token = localStorage.getItem('alug_token') ?? ''
    try {
      const novo = await adicionarConvidadoApi(idReserva, novoConvidadoForm, token)
      setConvidadosPorReserva((prev) => ({
        ...prev,
        [idReserva]: [...(prev[idReserva] ?? []), novo],
      }))
      setNovoConvidadoForm({ nome: '', telefone: '' })
      setNovoConvidadoReservaId(null)
    } catch { /* silently fail */ }
  }

  const salvarCliente = async (): Promise<boolean> => {
    if (!clienteMode) return false
    const token = localStorage.getItem('alug_token') ?? ''
    setOpError('')
    try {
      const payload = { nome: clienteForm.nome, email: clienteForm.email, cpf: clienteForm.cpf, telefone: clienteForm.telefone, endereco: null }
      if (clienteMode === 'criar') {
        const novo = await criarClienteApi(payload, token)
        setClientesApi((prev) => [...prev, novo])
      } else if (clienteMode === 'editar' && clienteForm.apiId != null) {
        const upd = await atualizarClienteApi(clienteForm.apiId, payload, token)
        setClientesApi((prev) => prev.map((c) => c.idCliente === clienteForm.apiId ? upd : c))
      } else if (clienteMode === 'deletar' && clienteForm.apiId != null) {
        await deletarClienteApi(clienteForm.apiId, token)
        setClientesApi((prev) => prev.filter((c) => c.idCliente !== clienteForm.apiId))
      }
      return true
    } catch (e) {
      setOpError(e instanceof Error ? e.message : 'erro na operacao')
      return false
    }
  }

  const salvarEspaco = async (): Promise<boolean> => {
    if (!espacoMode) return false
    const token = localStorage.getItem('alug_token') ?? ''
    setOpError('')
    const endereco = { cep: espacoForm.cep, logradouro: espacoForm.logradouro, numero: espacoForm.numero, bairro: espacoForm.bairro, cidade: espacoForm.cidade, estado: espacoForm.estado }
    try {
      if (espacoMode === 'criar') {
        const novo = await criarEspacoApi({ capacidade: Number(espacoForm.capacidade), valor: Number(espacoForm.valor), endereco }, token)
        setEspacosApi((prev) => [...prev, novo])
      } else if (espacoMode === 'editar' && espacoForm.apiId != null) {
        const upd = await atualizarEspacoApi(espacoForm.apiId, { capacidade: Number(espacoForm.capacidade), valor: Number(espacoForm.valor), endereco }, token)
        setEspacosApi((prev) => prev.map((e) => e.idEspaco === espacoForm.apiId ? upd : e))
      } else if (espacoMode === 'deletar' && espacoForm.apiId != null) {
        await deletarEspacoApi(espacoForm.apiId, token)
        setEspacosApi((prev) => prev.filter((e) => e.idEspaco !== espacoForm.apiId))
      }
      return true
    } catch (e) {
      setOpError(e instanceof Error ? e.message : 'erro na operacao')
      return false
    }
  }

  const salvarReserva = async (): Promise<boolean> => {
    if (!reservaMode) return false
    const token = localStorage.getItem('alug_token') ?? ''
    setOpError('')
    const payload = {
      dataEvento: reservaForm.dataEvento,
      quantidadeConvidados: Number(reservaForm.quantidadeConvidados) || 1,
      valorTotal: Number(reservaForm.valorTotal) || 0,
      idCliente: Number(reservaForm.idCliente) || 1,
      idGerente: Number(reservaForm.idGerente) || 1,
      idEspaco: Number(reservaForm.idEspaco) || 1,
    }
    try {
      if (reservaMode === 'criar') {
        await criarReservaApi(payload, token)
        listarReservas(token).then(setReservasApi).catch(() => {})
      } else if (reservaMode === 'editar' && reservaForm.apiId != null) {
        await atualizarReservaApi(reservaForm.apiId, payload, token)
        listarReservas(token).then(setReservasApi).catch(() => {})
      } else if (reservaMode === 'deletar' && reservaForm.apiId != null) {
        await deletarReservaApi(reservaForm.apiId, token)
        setReservasApi((prev) => prev.filter((r) => r.idReserva !== reservaForm.apiId))
      }
      return true
    } catch (e) {
      setOpError(e instanceof Error ? e.message : 'erro na operacao')
      return false
    }
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
                  <strong>{reservasApi.length}</strong>
                </article>
                <article>
                  <p>espacos cadastrados</p>
                  <strong>{espacosApi.length || 0}</strong>
                </article>
                <article>
                  <p>reservas ativas</p>
                  <strong>{reservasApi.filter(r => r.dataEvento >= new Date().toISOString().slice(0,10)).length}</strong>
                </article>
              </div>
            </SectionCard>
            <SectionCard heading="espacos em destaque">
              <div className="card-grid">
                {espacosApi.map((espaco, idx) => {
                  const reserva = isReservado(espaco.idEspaco)
                  return (
                    <article key={espaco.idEspaco} className="image-card">
                      <img src={SPACE_IMAGES[idx % SPACE_IMAGES.length]} alt={espaco.endereco?.logradouro} />
                      <div>
                        <h4>{espaco.endereco?.logradouro}</h4>
                        <p>r$ {espaco.valor.toLocaleString('pt-BR')} / dia</p>
                        <p>{espaco.capacidade} pessoas</p>
                        {reserva ? (
                          <span className="badge-reservado">reservado até {reserva.dataEvento}</span>
                        ) : (
                          <button
                            className="primary-btn btn-reservar"
                            onClick={() => { if (espaco.idEspaco > 0) setReservandoEspaco(espaco) }}
                            disabled={espaco.idEspaco < 0}
                          >
                            reservar
                          </button>
                        )}
                      </div>
                    </article>
                  )
                })}
                {espacosApi.length === 0 && <p className="empty-cell">nenhum espaco cadastrado</p>}
              </div>
            </SectionCard>
          </>
        )

      case 'espacos':
        return (
          <>
            <SectionCard heading="espacos populares">
              <div className="card-grid">
                {espacosApi.map((espaco, idx) => (
                  <article key={espaco.idEspaco} className="image-card">
                    <img src={SPACE_IMAGES[idx % SPACE_IMAGES.length]} alt={espaco.endereco?.logradouro} />
                    <div>
                      <h4>{espaco.endereco?.logradouro}</h4>
                      <p>r$ {espaco.valor.toLocaleString('pt-BR')} / dia</p>
                      <p>{espaco.capacidade} pessoas</p>
                    </div>
                  </article>
                ))}
                {espacosApi.length === 0 && <p className="empty-cell">nenhum espaco cadastrado</p>}
              </div>
            </SectionCard>
            <SectionCard heading="pesquisar espaco">
              <Field label="nome do espaco" placeholder="digite para pesquisar" />
            </SectionCard>
            <SectionCard heading="dados conectados ao backend">
              <div className="metrics">
                <article>
                  <p>clientes base</p>
                  <strong>{clientesApi.length}</strong>
                </article>
                <article>
                  <p>espacos base</p>
                  <strong>{espacosApi.length}</strong>
                </article>
                <article>
                  <p>reservas base</p>
                  <strong>{reservasApi.length}</strong>
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
                <button
                  className="chip-btn"
                  onClick={() => { setClienteMode('criar'); setActiveScreen('gerencia-clientes') }}
                >
                  criar novo cliente
                </button>
                <button
                  className="chip-btn"
                  onClick={() => { setReservaMode('criar'); setActiveScreen('gerencia-reservas') }}
                >
                  fazer reserva
                </button>
                <button
                  className="chip-btn"
                  onClick={() => { setEspacoMode('criar'); setActiveScreen('gerencia-espacos') }}
                >
                  adicionar novo espaco
                </button>
              </div>
            </SectionCard>
            <SectionCard heading="atalhos do sistema">
              <div className="tags">
                <button className="tag-btn" onClick={() => setActiveScreen('gerencia-clientes')}>clientes</button>
                <button className="tag-btn" onClick={() => setActiveScreen('gerencia-espacos')}>espacos</button>
                <button className="tag-btn" onClick={() => setActiveScreen('gerencia-reservas')}>reservas</button>
                <button className="tag-btn" onClick={() => setActiveScreen('lista-convidados')}>convidados</button>
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
            {clienteMode !== null && (
              <SectionCard
                heading={
                  clienteMode === 'criar' ? 'novo cliente' :
                  clienteMode === 'editar' ? 'editar cliente' : 'excluir cliente'
                }
              >
                {clienteMode === 'deletar' ? (
                  <>
                    <p className="confirm-text">
                      Deseja excluir <strong>{clienteForm.nome}</strong>? Esta ação não pode ser desfeita.
                    </p>
                    <div className="action-row">
                      <button className="ghost-btn" onClick={() => { setClienteMode(null); resetClienteForm(); setOpError('') }}>cancelar</button>
                      <button className="danger-btn" onClick={async () => { if (await salvarCliente()) { setClienteMode(null); resetClienteForm(); setOpError('') } }}>
                        sim, excluir
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid-two">
                      <Field label="nome" placeholder="nome completo" value={clienteForm.nome} onChange={(v) => setClienteForm((p) => ({ ...p, nome: v }))} />
                      <Field label="cpf" placeholder="000.000.000-00" value={clienteForm.cpf} onChange={(v) => setClienteForm((p) => ({ ...p, cpf: v }))} />
                      <Field label="telefone" placeholder="(00) 00000-0000" value={clienteForm.telefone} onChange={(v) => setClienteForm((p) => ({ ...p, telefone: v }))} />
                      <Field label="email" placeholder="cliente@email.com" value={clienteForm.email} onChange={(v) => setClienteForm((p) => ({ ...p, email: v }))} />
                    </div>
                    {opError && <p className="modal-error">{opError}</p>}
                    <div className="action-row">
                      <button className="ghost-btn" onClick={() => { setClienteMode(null); resetClienteForm(); setOpError('') }}>cancelar</button>
                      <button className="primary-btn" onClick={async () => { if (await salvarCliente()) { setClienteMode(null); resetClienteForm(); setOpError('') } }}>
                        {clienteMode === 'criar' ? 'inserir' : 'alterar'}
                      </button>
                    </div>
                  </>
                )}
              </SectionCard>
            )}

            <SectionCard heading="lista de clientes">
              <div className="list-header">
                <span className="list-count">{clientesApi.length} clientes cadastrados</span>
                <button className="primary-btn btn-sm" onClick={() => { resetClienteForm(); setClienteMode('criar') }}>+ novo cliente</button>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>nome</th>
                    <th>email</th>
                    <th>telefone</th>
                    <th>acoes</th>
                  </tr>
                </thead>
                <tbody>
                  {clientesApi.map((item) => (
                    <tr key={item.idCliente}>
                      <td>{item.idCliente}</td>
                      <td>{item.nome}</td>
                      <td>{item.email}</td>
                      <td>{item.telefone}</td>
                      <td>
                        <div className="row-actions">
                          <button className="icon-action edit-action" title="editar" onClick={() => { setClienteMode('editar'); setClienteForm({ apiId: item.idCliente, nome: item.nome, cpf: '', telefone: item.telefone, email: item.email }) }}>
                            <PencilIcon />
                          </button>
                          <button className="icon-action del-action" title="excluir" onClick={() => { setClienteMode('deletar'); setClienteForm({ apiId: item.idCliente, nome: item.nome, cpf: '', telefone: item.telefone, email: item.email }) }}>
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SectionCard>
          </>
        )

      case 'lista-convidados':
        return (
          <SectionCard heading="convidados por reserva">
            {reservasApi.map((r) => {
              const key = `conv-${r.idReserva}`
              const isOpen = openActionKey === key
              const convList = convidadosPorReserva[r.idReserva]
              const showAdd = novoConvidadoReservaId === r.idReserva
              return (
                <div key={r.idReserva} className="reserva-accordion">
                  <button
                    className="accordion-header"
                    onClick={() => {
                      const next = isOpen ? null : key
                      setOpenActionKey(next)
                      if (next && !convList) carregarConvidados(r.idReserva)
                    }}
                  >
                    <span>
                      <strong>Reserva #{String(r.idReserva).padStart(3, '0')}</strong>
                      <span className="acc-sub"> — {r.nomeCliente}</span>
                      <span className="acc-date"> · {r.dataEvento}</span>
                    </span>
                    <span className={isOpen ? 'nav-chevron is-open' : 'nav-chevron'}>▾</span>
                  </button>
                  {isOpen && (
                    <div className="accordion-body">
                      <p className="acc-detail">Espaco: <strong>#{r.idEspaco}</strong> &nbsp; Convidados: <strong>{r.quantidadeConvidados}</strong> &nbsp; Valor: <strong>r$ {r.valorTotal?.toLocaleString('pt-BR')}</strong></p>
                      <div className="conv-list">
                        {(convList ?? []).length === 0 && <p className="empty-cell" style={{ fontSize: '0.8rem' }}>nenhum convidado cadastrado</p>}
                        {(convList ?? []).map((c) => (
                          <div key={c.idConvidado} className="conv-item">
                            <span className="conv-nome">{c.nome}</span>
                            <span className="conv-tel">{c.telefone}</span>
                            <button className="icon-action del-action" title="remover" onClick={() => handleRemoverConvidado(r.idReserva, c.idConvidado)}>
                              <TrashIcon />
                            </button>
                          </div>
                        ))}
                      </div>
                      {showAdd ? (
                        <div className="conv-add-form">
                          <input className="conv-input" placeholder="nome" value={novoConvidadoForm.nome} onChange={(e) => setNovoConvidadoForm((p) => ({ ...p, nome: e.target.value }))} />
                          <input className="conv-input" placeholder="telefone" value={novoConvidadoForm.telefone} onChange={(e) => setNovoConvidadoForm((p) => ({ ...p, telefone: e.target.value }))} />
                          <button className="primary-btn btn-sm" onClick={() => handleAdicionarConvidado(r.idReserva)}>adicionar</button>
                          <button className="ghost-btn btn-sm" onClick={() => { setNovoConvidadoReservaId(null); setNovoConvidadoForm({ nome: '', telefone: '' }) }}>cancelar</button>
                        </div>
                      ) : (
                        <button className="ghost-btn btn-sm" style={{ marginTop: '8px' }} onClick={() => setNovoConvidadoReservaId(r.idReserva)}>+ convidado</button>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
            {reservasApi.length === 0 && <p className="empty-cell">nenhuma reserva cadastrada</p>}
          </SectionCard>
        )

      case 'gerencia-espacos':
      case 'criar-espaco':
      case 'alterar-espaco':
      case 'deletar-espaco':
        return (
          <>
            {espacoMode !== null && (
              <SectionCard
                heading={
                  espacoMode === 'criar' ? 'novo espaco' :
                  espacoMode === 'editar' ? 'editar espaco' : 'excluir espaco'
                }
              >
                {espacoMode === 'deletar' ? (
                  <>
                    <p className="confirm-text">
                      Deseja excluir <strong>{espacoForm.nome}</strong>? Esta ação não pode ser desfeita.
                    </p>
                    <div className="action-row">
                      <button className="ghost-btn" onClick={() => { setEspacoMode(null); resetEspacoForm(); setOpError('') }}>cancelar</button>
                      <button className="danger-btn" onClick={async () => { if (await salvarEspaco()) { setEspacoMode(null); resetEspacoForm(); setOpError('') } }}>sim, excluir</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid-two">
                      <Field label="capacidade" placeholder="numero de pessoas" value={espacoForm.capacidade} onChange={(v) => setEspacoForm((p) => ({ ...p, capacidade: v }))} />
                      <Field label="valor (r$)" placeholder="1280" value={espacoForm.valor} onChange={(v) => setEspacoForm((p) => ({ ...p, valor: v }))} />
                      <Field label="cep" placeholder="37200000" value={espacoForm.cep} onChange={(v) => setEspacoForm((p) => ({ ...p, cep: v }))} />
                      <Field label="logradouro" placeholder="Av. Central" value={espacoForm.logradouro} onChange={(v) => setEspacoForm((p) => ({ ...p, logradouro: v }))} />
                      <Field label="numero" placeholder="100" value={espacoForm.numero} onChange={(v) => setEspacoForm((p) => ({ ...p, numero: v }))} />
                      <Field label="bairro" placeholder="Centro" value={espacoForm.bairro} onChange={(v) => setEspacoForm((p) => ({ ...p, bairro: v }))} />
                      <Field label="cidade" placeholder="Lavras" value={espacoForm.cidade} onChange={(v) => setEspacoForm((p) => ({ ...p, cidade: v }))} />
                      <Field label="estado" placeholder="MG" value={espacoForm.estado} onChange={(v) => setEspacoForm((p) => ({ ...p, estado: v }))} />
                    </div>
                    {opError && <p className="modal-error">{opError}</p>}
                    <div className="action-row">
                      <button className="ghost-btn" onClick={() => { setEspacoMode(null); resetEspacoForm(); setOpError('') }}>cancelar</button>
                      <button className="primary-btn" onClick={async () => { if (await salvarEspaco()) { setEspacoMode(null); resetEspacoForm(); setOpError('') } }}>
                        {espacoMode === 'criar' ? 'inserir' : 'alterar'}
                      </button>
                    </div>
                  </>
                )}
              </SectionCard>
            )}

            <SectionCard heading="lista de espacos">
              <div className="list-header">
                <span className="list-count">{espacosApi.length} espacos cadastrados</span>
                <button className="primary-btn btn-sm" onClick={() => { resetEspacoForm(); setEspacoMode('criar') }}>+ novo espaco</button>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>endereco</th>
                    <th>capacidade</th>
                    <th>valor</th>
                    <th>acoes</th>
                  </tr>
                </thead>
                <tbody>
                  {espacosApi.map((item) => (
                    <tr key={item.idEspaco}>
                      <td>{item.idEspaco}</td>
                      <td>{item.endereco?.logradouro}, {item.endereco?.cidade}</td>
                      <td>{item.capacidade} pessoas</td>
                      <td>r$ {item.valor.toLocaleString('pt-BR')}</td>
                      <td>
                        <div className="row-actions">
                          <button className="icon-action edit-action" title="editar" onClick={() => {
                            setEspacoMode('editar')
                            setEspacoForm({ apiId: item.idEspaco, capacidade: String(item.capacidade), valor: String(item.valor), cep: item.endereco?.cep || '', logradouro: item.endereco?.logradouro || '', numero: item.endereco?.numero || '', bairro: item.endereco?.bairro || '', cidade: item.endereco?.cidade || '', estado: item.endereco?.estado || 'MG' })
                          }}>
                            <PencilIcon />
                          </button>
                          <button className="icon-action del-action" title="excluir" onClick={() => {
                            setEspacoMode('deletar')
                            setEspacoForm({ apiId: item.idEspaco, capacidade: String(item.capacidade), valor: String(item.valor), cep: '', logradouro: item.endereco?.logradouro || '', numero: '', bairro: '', cidade: '', estado: 'MG' })
                          }}>
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SectionCard>
          </>
        )

      case 'gerencia-reservas':
      case 'criar-reserva':
      case 'alterar-reserva':
      case 'deletar-reserva':
        return (
          <>
            {reservaMode !== null && (
              <SectionCard
                heading={
                  reservaMode === 'criar' ? 'nova reserva' :
                  reservaMode === 'editar' ? 'editar reserva' : 'excluir reserva'
                }
              >
                {reservaMode === 'deletar' ? (
                  <>
                    <p className="confirm-text">
                      Deseja excluir a reserva de <strong>{reservaForm.idCliente}</strong> para {reservaForm.dataEvento}?
                    </p>
                    <div className="action-row">
                      <button className="ghost-btn" onClick={() => { setReservaMode(null); resetReservaForm(); setOpError('') }}>cancelar</button>
                      <button className="danger-btn" onClick={async () => { if (await salvarReserva()) { setReservaMode(null); resetReservaForm(); setOpError('') } }}>sim, excluir</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid-two">
                      <label className="field">
                        <span>cliente</span>
                        <select value={reservaForm.idCliente} onChange={(e) => setReservaForm((p) => ({ ...p, idCliente: e.target.value }))}>
                          <option value="">selecione um cliente</option>
                          {clientesApi.map((c) => <option key={c.idCliente} value={c.idCliente}>{c.nome}</option>)}
                        </select>
                      </label>
                      <label className="field">
                        <span>espaco</span>
                        <select value={reservaForm.idEspaco} onChange={(e) => setReservaForm((p) => ({ ...p, idEspaco: e.target.value }))}>
                          <option value="">selecione um espaco</option>
                          {espacosApi.map((e) => <option key={e.idEspaco} value={e.idEspaco}>{e.endereco?.logradouro} — r$ {e.valor.toLocaleString('pt-BR')}</option>)}
                        </select>
                      </label>
                      <Field label="data do evento" placeholder="aaaa-mm-dd" type="date" value={reservaForm.dataEvento} onChange={(v) => setReservaForm((p) => ({ ...p, dataEvento: v }))} />
                      <Field label="qtd convidados" placeholder="20" value={reservaForm.quantidadeConvidados} onChange={(v) => setReservaForm((p) => ({ ...p, quantidadeConvidados: v }))} />
                      <Field label="valor total (r$)" placeholder="1280" value={reservaForm.valorTotal} onChange={(v) => setReservaForm((p) => ({ ...p, valorTotal: v }))} />
                      <Field label="id do gerente" placeholder="1" value={reservaForm.idGerente} onChange={(v) => setReservaForm((p) => ({ ...p, idGerente: v }))} />
                    </div>
                    {opError && <p className="modal-error">{opError}</p>}
                    <div className="action-row">
                      <button className="ghost-btn" onClick={() => { setReservaMode(null); resetReservaForm(); setOpError('') }}>cancelar</button>
                      <button className="primary-btn" onClick={async () => { if (await salvarReserva()) { setReservaMode(null); resetReservaForm(); setOpError('') } }}>
                        {reservaMode === 'criar' ? 'inserir' : 'alterar'}
                      </button>
                    </div>
                  </>
                )}
              </SectionCard>
            )}

            <SectionCard heading="lista de reservas">
              <div className="list-header">
                <span className="list-count">{reservasApi.length} reservas cadastradas</span>
                <button className="primary-btn btn-sm" onClick={() => { resetReservaForm(); setReservaMode('criar') }}>+ nova reserva</button>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>cliente</th>
                    <th>espaco</th>
                    <th>data</th>
                    <th>convidados</th>
                    <th>valor</th>
                    <th>acoes</th>
                  </tr>
                </thead>
                <tbody>
                  {reservasApi.map((item) => (
                    <tr key={item.idReserva}>
                      <td>{String(item.idReserva).padStart(3, '0')}</td>
                      <td>{item.nomeCliente}</td>
                      <td>#{item.idEspaco}</td>
                      <td>{item.dataEvento}</td>
                      <td>{item.quantidadeConvidados}</td>
                      <td>r$ {item.valorTotal?.toLocaleString('pt-BR')}</td>
                      <td>
                        <div className="row-actions">
                          <button className="icon-action edit-action" title="editar" onClick={() => {
                            setReservaMode('editar')
                            setReservaForm({ apiId: item.idReserva, dataEvento: item.dataEvento, quantidadeConvidados: String(item.quantidadeConvidados), valorTotal: String(item.valorTotal), idCliente: String(item.idCliente), idGerente: String(item.idGerente), idEspaco: String(item.idEspaco) })
                          }}>
                            <PencilIcon />
                          </button>
                          <button className="icon-action del-action" title="excluir" onClick={() => {
                            setReservaMode('deletar')
                            setReservaForm({ apiId: item.idReserva, dataEvento: item.dataEvento, quantidadeConvidados: String(item.quantidadeConvidados), valorTotal: String(item.valorTotal), idCliente: String(item.idCliente), idGerente: String(item.idGerente), idEspaco: String(item.idEspaco) })
                          }}>
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SectionCard>
          </>
        )

      case 'pagamento': {
        const totalArrecadado = reservasApi.reduce((acc, r) => acc + (r.valorTotal || 0), 0)
        const ticketMedio = reservasApi.length > 0 ? Math.round(totalArrecadado / reservasApi.length) : 0
        return (
          <>
            <SectionCard heading="resumo financeiro">
              <div className="metrics">
                <article>
                  <p>total arrecadado</p>
                  <strong>r$ {totalArrecadado.toLocaleString('pt-BR')}</strong>
                </article>
                <article>
                  <p>reservas registradas</p>
                  <strong>{reservasApi.length}</strong>
                </article>
                <article>
                  <p>ticket medio</p>
                  <strong>r$ {ticketMedio.toLocaleString('pt-BR')}</strong>
                </article>
              </div>
            </SectionCard>

            <SectionCard heading="metodo de pagamento">
              <div className="payment-methods">
                {(['pix', 'credito', 'debito', 'boleto'] as const).map((m) => (
                  <button
                    key={m}
                    className={payMethod === m ? 'pay-card is-selected' : 'pay-card'}
                    onClick={() => setPayMethod(m)}
                  >
                    <span className="pay-icon">
                      {m === 'pix' ? '⚡' : m === 'credito' ? '💳' : m === 'debito' ? '🏦' : '📄'}
                    </span>
                    <span className="pay-label">
                      {m === 'credito' ? 'crédito' : m === 'debito' ? 'débito' : m}
                    </span>
                    <small>
                      {m === 'pix' ? 'instantâneo' : m === 'credito' ? 'até 12x' : m === 'debito' ? 'à vista' : '3 dias úteis'}
                    </small>
                  </button>
                ))}
              </div>
              {payMethod === 'pix' && (
                <div className="pix-info">
                  <p>Chave Pix: <strong>contato@alug.com</strong></p>
                  <p>Banco: <strong>Alug Financeiro</strong></p>
                  <p>Nome: <strong>Alug Sistema LTDA</strong></p>
                </div>
              )}
              {(payMethod === 'credito' || payMethod === 'debito') && (
                <div className="grid-two" style={{ marginTop: '16px' }}>
                  <Field label="numero do cartao" placeholder="0000 0000 0000 0000" />
                  <Field label="titular" placeholder="como impresso no cartao" />
                  <Field label="validade" placeholder="MM/AA" />
                  <Field label="cvv" placeholder="000" />
                </div>
              )}
            </SectionCard>

            <SectionCard heading="registrar pagamento">
              <div className="grid-two">
                <Field label="id da reserva" placeholder="ex: 001" />
                <Field label="valor (r$)" placeholder="0,00" />
              </div>
              <div className="action-row">
                <button className="ghost-btn">cancelar</button>
                <button className="primary-btn" disabled={!payMethod}>registrar pagamento</button>
              </div>
            </SectionCard>
          </>
        )
      }

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
            <p className="login-error">{loginError || 'use as credenciais do backend para entrar'}</p>
            <button
              className="primary-btn login-submit"
              onClick={handleLogin}
              disabled={isLoadingLogin}
            >
              {isLoadingLogin ? 'entrando...' : 'entrar'}
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

      {reservandoEspaco && (
        <div className="modal-overlay" onClick={() => { setReservandoEspaco(null); setQuickStatus('idle'); setQuickErro('') }}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>reservar espaco</h3>
            <p className="modal-info">
              <strong>{reservandoEspaco.endereco?.logradouro}</strong> &mdash; {reservandoEspaco.capacidade} pessoas &mdash; r$ {reservandoEspaco.valor.toLocaleString('pt-BR')}/dia
            </p>
            <div className="grid-two">
              <Field
                label="data do evento"
                placeholder="aaaa-mm-dd"
                type="date"
                value={quickForm.dataEvento}
                onChange={(v) => setQuickForm((p) => ({ ...p, dataEvento: v }))}
              />
              <Field
                label="id do cliente"
                placeholder="ex: 1"
                value={quickForm.idCliente}
                onChange={(v) => setQuickForm((p) => ({ ...p, idCliente: v }))}
              />
              <Field
                label="quantidade de convidados"
                placeholder="ex: 20"
                value={quickForm.quantidadeConvidados}
                onChange={(v) => setQuickForm((p) => ({ ...p, quantidadeConvidados: v }))}
              />
            </div>
            {quickStatus === 'ok' && <p className="modal-success">reserva criada com sucesso!</p>}
            {quickStatus === 'error' && <p className="modal-error">{quickErro}</p>}
            <div className="action-row">
              <button className="ghost-btn" onClick={() => { setReservandoEspaco(null); setQuickStatus('idle'); setQuickErro('') }}>cancelar</button>
              <button
                className="primary-btn"
                onClick={handleQuickReserva}
                disabled={quickStatus === 'loading' || quickStatus === 'ok' || !quickForm.dataEvento}
              >
                {quickStatus === 'loading' ? 'reservando...' : 'confirmar reserva'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
