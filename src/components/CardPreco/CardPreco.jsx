import Card from '../Card/Card'
import { formatarPrata, tempoDesde } from '../../utils/formatar'

// Mostra os preços de UMA cidade para um item
function CardPreco({ cidade, preco }) {
  const blackMarket = cidade === 'Black Market'

  return (
    <Card
      titulo={blackMarket ? '🏴 Black Market' : `🏰 ${cidade}`}
      subtitulo={blackMarket ? 'Para onde vamos vender' : 'Onde vamos comprar'}
    >
      {!preco ? (
        <p className="text-sm text-stone-500">Sem dados para esta cidade.</p>
      ) : (
        <dl className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-stone-50 p-3 dark:bg-stone-800/60">
            <dt className="text-xs uppercase text-stone-500 dark:text-stone-400">
              {blackMarket ? 'Ordem de compra (BM paga)' : 'Menor preço à venda'}
            </dt>
            <dd className="mt-1 text-2xl font-extrabold text-ouro-600 dark:text-ouro-400">
              {formatarPrata(blackMarket ? preco.compraMax : preco.vendaMin)}
            </dd>
            <dd className="text-xs text-stone-500">
              {tempoDesde(blackMarket ? preco.compraMaxData : preco.vendaMinData)}
            </dd>
          </div>
          <div className="rounded-xl bg-stone-50 p-3 dark:bg-stone-800/60">
            <dt className="text-xs uppercase text-stone-500 dark:text-stone-400">
              {blackMarket ? 'Menor preço à venda' : 'Maior ordem de compra'}
            </dt>
            <dd className="mt-1 text-2xl font-extrabold">
              {formatarPrata(blackMarket ? preco.vendaMin : preco.compraMax)}
            </dd>
            <dd className="text-xs text-stone-500">
              {tempoDesde(blackMarket ? preco.vendaMinData : preco.compraMaxData)}
            </dd>
          </div>
        </dl>
      )}
    </Card>
  )
}

export default CardPreco
