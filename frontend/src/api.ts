export type LoginResponse = {
  token: string
  nome: string
  email: string
  perfil: string
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

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
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
  return request<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, senha }),
  })
}

export async function carregarResumoDashboard(token?: string): Promise<DashboardResumo> {
  return request<DashboardResumo>('/api/dashboard/resumo', {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })
}
