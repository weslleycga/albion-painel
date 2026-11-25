// Função GENÉRICA de fetch, usada por todos os serviços do projeto.
// Ela centraliza o tratamento de erro: quem chama só usa try/catch.

export class ApiError extends Error {
  constructor(mensagem, status) {
    super(mensagem)
    this.name = 'ApiError'
    this.status = status // código HTTP (404, 500...) ou 0 se for erro de rede
  }
}

export async function fetchJSON(url, opcoes = {}) {
  let resposta

  try {
    resposta = await fetch(url, opcoes)
  } catch {
    // O fetch só cai aqui quando nem chega ao servidor (sem internet, DNS...)
    throw new ApiError('Não foi possível conectar. Verifique sua internet.', 0)
  }

  // O fetch NÃO lança erro em 404/500: precisamos conferir o "ok"
  if (!resposta.ok) {
    const mensagens = {
      404: 'Não encontrado na API.',
      429: 'Muitas consultas seguidas. Espere um minuto e tente de novo.',
    }
    throw new ApiError(
      mensagens[resposta.status] ?? `A API respondeu com erro ${resposta.status}.`,
      resposta.status,
    )
  }

  return resposta.json()
}
