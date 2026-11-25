// Funções pequenas de formatação usadas em várias telas

// 1234567 → "1.234.567"
export function formatarPrata(valor) {
  if (!valor) return '—'
  return valor.toLocaleString('pt-BR')
}

// Diferença com sinal: 1500 → "+1.500", -300 → "-300"
export function formatarDiferenca(valor) {
  if (valor === null || valor === undefined) return '—'
  const sinal = valor > 0 ? '+' : valor < 0 ? '-' : ''
  return sinal + Math.abs(valor).toLocaleString('pt-BR')
}

// Data da API → "há 2 h", "há 3 dias"...
// A API usa "0001-01-01T00:00:00" quando não existe preço registrado.
export function tempoDesde(dataTexto) {
  if (!dataTexto || dataTexto.startsWith('0001')) return 'sem registro'
  const data = new Date(dataTexto.endsWith('Z') ? dataTexto : `${dataTexto}Z`)
  const minutos = Math.floor((Date.now() - data.getTime()) / 60000)
  if (minutos < 1) return 'agora'
  if (minutos < 60) return `há ${minutos} min`
  const horas = Math.floor(minutos / 60)
  if (horas < 24) return `há ${horas} h`
  const dias = Math.floor(horas / 24)
  return `há ${dias} ${dias === 1 ? 'dia' : 'dias'}`
}
