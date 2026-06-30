export type LoginResponse = {
  token: string
  tipo: string
  tempoExpiracao: number
}

export type DashboardResumo = {
  reservasHoje: number
  ocupacaoMedia: number
  ticketsAbertos: number
  clientesBase: number
  espacosBase: number
  reservasBase: number
}

const apiBaseUrl = import.meta.env.VITE_API_URL ?? ''
const apiPrefix = import.meta.env.VITE_API_PREFIX ?? '/api'

function construirUrl(path: string): string {
  const prefixoNormalizado = apiPrefix.endsWith('/') ? apiPrefix.slice(0, -1) : apiPrefix
  const rotaNormalizada = path.startsWith('/') ? path : `/${path}`
  return `${apiBaseUrl}${prefixoNormalizado}${rotaNormalizada}`
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(construirUrl(path), {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  })

  if (!response.ok) {
    let errorMessage = `erro ${response.status}`

    try {
      const errorBody = (await response.json()) as { mensagem?: string; message?: string }
      errorMessage = errorBody.mensagem ?? errorBody.message ?? errorMessage
    } catch {
      errorMessage = `erro ${response.status}`
    }

    throw new Error(errorMessage)
  }

  return (await response.json()) as T
}

export async function login(email: string, senha: string): Promise<LoginResponse> {
  return request<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, senha }),
  })
}

export async function carregarResumoDashboard(token?: string): Promise<DashboardResumo> {
  return request<DashboardResumo>('/dashboard/resumo', {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })
}

export type EspacoApi = {
  idEspaco: number
  capacidade: number
  valor: number
  endereco: {
    idEndereco?: number
    cep?: string
    logradouro: string
    numero?: string
    complemento?: string
    bairro: string
    cidade: string
    estado?: string
  }
}

export type ClienteApi = {
  idCliente: number
  nome: string
  email: string
  telefone: string
}

export type EnderecoPayload = {
  cep: string
  logradouro: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  estado: string
}

export type CriarClientePayload = {
  nome: string
  email: string
  cpf: string
  telefone: string
  endereco?: EnderecoPayload | null
}

export type CriarEspacoPayload = {
  capacidade: number
  valor: number
  endereco: EnderecoPayload
}

export type ReservaApi = {
  idReserva: number
  dataEvento: string
  quantidadeConvidados: number
  valorTotal: number
  idCliente: number
  nomeCliente: string
  idGerente: number
  nomeGerente: string
  idEspaco: number
}

export type CriarReservaPayload = {
  dataEvento: string
  quantidadeConvidados: number
  valorTotal: number
  idCliente: number
  idGerente: number
  idEspaco: number
}

export type ConvidadoApi = {
  idConvidado: number
  nome: string
  telefone: string
  idReserva: number
}

export type CriarConvidadoPayload = {
  nome: string
  telefone: string
}

function authHeader(token: string) {
  return { Authorization: `Bearer ${token}` }
}

export async function listarEspacos(token: string): Promise<EspacoApi[]> {
  return request<EspacoApi[]>('/espacos', {
    method: 'GET',
    headers: authHeader(token),
  })
}

export async function listarReservas(token: string): Promise<ReservaApi[]> {
  return request<ReservaApi[]>('/reservas', {
    method: 'GET',
    headers: authHeader(token),
  })
}

export async function criarReserva(payload: CriarReservaPayload, token: string): Promise<ReservaApi> {
  return request<ReservaApi>('/reservas', {
    method: 'POST',
    headers: authHeader(token),
    body: JSON.stringify(payload),
  })
}

export async function atualizarReserva(id: number, payload: CriarReservaPayload, token: string): Promise<ReservaApi> {
  return request<ReservaApi>(`/reservas/${id}`, {
    method: 'PUT',
    headers: authHeader(token),
    body: JSON.stringify(payload),
  })
}

export async function deletarReserva(id: number, token: string): Promise<void> {
  await fetch(construirUrl(`/reservas/${id}`), {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authHeader(token) },
  })
}

export async function listarClientes(token: string): Promise<ClienteApi[]> {
  return request<ClienteApi[]>('/clientes', {
    method: 'GET',
    headers: authHeader(token),
  })
}

export async function criarCliente(payload: CriarClientePayload, token: string): Promise<ClienteApi> {
  return request<ClienteApi>('/clientes', {
    method: 'POST',
    headers: authHeader(token),
    body: JSON.stringify(payload),
  })
}

export async function atualizarCliente(id: number, payload: CriarClientePayload, token: string): Promise<ClienteApi> {
  return request<ClienteApi>(`/clientes/${id}`, {
    method: 'PUT',
    headers: authHeader(token),
    body: JSON.stringify(payload),
  })
}

export async function deletarCliente(id: number, token: string): Promise<void> {
  await fetch(construirUrl(`/clientes/${id}`), {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authHeader(token) },
  })
}

export async function criarEspaco(payload: CriarEspacoPayload, token: string): Promise<EspacoApi> {
  return request<EspacoApi>('/espacos', {
    method: 'POST',
    headers: authHeader(token),
    body: JSON.stringify(payload),
  })
}

export async function atualizarEspaco(id: number, payload: CriarEspacoPayload, token: string): Promise<EspacoApi> {
  return request<EspacoApi>(`/espacos/${id}`, {
    method: 'PUT',
    headers: authHeader(token),
    body: JSON.stringify(payload),
  })
}

export async function deletarEspaco(id: number, token: string): Promise<void> {
  await fetch(construirUrl(`/espacos/${id}`), {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authHeader(token) },
  })
}

export async function listarConvidadosPorReserva(idReserva: number, token: string): Promise<ConvidadoApi[]> {
  return request<ConvidadoApi[]>(`/reservas/${idReserva}/convidados`, {
    method: 'GET',
    headers: authHeader(token),
  })
}

export async function adicionarConvidado(idReserva: number, payload: CriarConvidadoPayload, token: string): Promise<ConvidadoApi> {
  return request<ConvidadoApi>(`/reservas/${idReserva}/convidados`, {
    method: 'POST',
    headers: authHeader(token),
    body: JSON.stringify(payload),
  })
}

export async function removerConvidado(idReserva: number, idConvidado: number, token: string): Promise<void> {
  await fetch(construirUrl(`/reservas/${idReserva}/convidados/${idConvidado}`), {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authHeader(token) },
  })
}
