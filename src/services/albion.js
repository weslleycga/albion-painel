import { fetchJSON } from './api'

// API pública do Albion Data Project (preços enviados pelos jogadores)
// Documentação: https://www.albion-online-data.com/api
export const SERVIDORES = {
  americas: { nome: 'Américas (West)', host: 'https://west.albion-online-data.com' },
  europa: { nome: 'Europa', host: 'https://europe.albion-online-data.com' },
  asia: { nome: 'Ásia (East)', host: 'https://east.albion-online-data.com' },
}

export const CIDADES_PADRAO = ['Caerleon', 'Black Market']

// Busca os preços atuais de um ou mais itens.
// Ex: buscarPrecos(['T4_BAG', 'T5_BAG'], { servidor: 'americas' })
export async function buscarPrecos(itens, { servidor = 'americas', cidades = CIDADES_PADRAO, qualidade = 1 } = {}) {
  const { host } = SERVIDORES[servidor] ?? SERVIDORES.americas
  const ids = encodeURIComponent(itens.join(','))
  const locais = encodeURIComponent(cidades.join(','))

  const url = `${host}/api/v2/stats/prices/${ids}.json?locations=${locais}&qualities=${qualidade}`
  const dados = await fetchJSON(url)

  // Deixa os dados no formato que as telas usam
  return dados.map((linha) => ({
    item: linha.item_id,
    cidade: linha.city,
    qualidade: linha.quality,
    vendaMin: linha.sell_price_min,        // menor preço à venda no mercado
    vendaMinData: linha.sell_price_min_date,
    compraMax: linha.buy_price_max,        // maior ordem de compra
    compraMaxData: linha.buy_price_max_date,
  }))
}

// URL da imagem oficial do item
export function urlImagemItem(itemId, tamanho = 64) {
  return `https://render.albiononline.com/v1/item/${itemId}.png?size=${tamanho}`
}
