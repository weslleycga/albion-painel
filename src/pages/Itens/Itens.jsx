import { useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { ITENS, TIERS, montarId } from '../../data/itens'
import ItemIcone from '../../components/ItemIcone/ItemIcone'

const CATEGORIAS = ['Todas', ...new Set(ITENS.map((item) => item.categoria))]

function Itens() {
  const [categoria, setCategoria] = useState('Todas')
  const [tier, setTier] = useState(6)

  const visiveis = categoria === 'Todas' ? ITENS : ITENS.filter((item) => item.categoria === categoria)

  return (
    <div>
      <h1 className="text-2xl font-bold sm:text-3xl">Itens</h1>
      <p className="mt-1 text-stone-500 dark:text-stone-400">
        Escolha o tier e clique em um item para ver os preços em Caerleon e no Black Market.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoria(cat)}
              className={clsx(
                'rounded-full px-4 py-1.5 text-sm font-semibold transition',
                categoria === cat
                  ? 'bg-ouro-500 text-stone-900'
                  : 'bg-stone-200 text-stone-700 hover:bg-stone-300 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700',
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm font-semibold">
          Tier
          <select
            value={tier}
            onChange={(e) => setTier(Number(e.target.value))}
            className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 dark:border-stone-700 dark:bg-stone-900"
          >
            {TIERS.map((t) => (
              <option key={t} value={t}>
                T{t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visiveis.map((item) => {
          const id = montarId(item.base, tier)
          return (
            <Link
              key={item.base}
              to={`/itens/${id}`}
              className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-ouro-500 hover:shadow-md dark:border-stone-800 dark:bg-stone-900"
            >
              <ItemIcone itemId={id} alt={item.nome} />
              <div>
                <p className="font-bold">
                  {item.nome} <span className="text-ouro-600 dark:text-ouro-400">T{tier}</span>
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">{item.categoria}</p>
                <code className="text-xs text-stone-400">{id}</code>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Itens
