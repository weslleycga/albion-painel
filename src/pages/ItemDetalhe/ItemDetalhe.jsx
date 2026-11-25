import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { buscarItemPorBase, TIERS } from '../../data/itens'
import { SERVIDORES } from '../../services/albion'
import { usePrecos } from '../../hooks/usePrecos'
import { formatarDiferenca } from '../../utils/formatar'
import ItemIcone from '../../components/ItemIcone/ItemIcone'
import CardPreco from '../../components/CardPreco/CardPreco'
import Card from '../../components/Card/Card'
import Button from '../../components/Button/Button'
import Spinner from '../../components/Spinner/Spinner'
import Alerta from '../../components/Alerta/Alerta'

// Rota dinâmica /itens/:id  (ex: /itens/T6_BAG)
function ItemDetalhe() {
  const { id } = useParams()
  const [servidor, setServidor] = useState('americas')

  // Valida o ID da URL: precisa ser "T4_..." até "T8_..." e um item conhecido
  const partes = /^T(\d)_(.+)$/.exec(id ?? '')
  const tier = partes ? Number(partes[1]) : null
  const item = partes && TIERS.includes(tier) ? buscarItemPorBase(partes[2]) : null

  const { dados, carregando, erro, recarregar } = usePrecos([id], servidor, Boolean(item))

  if (!item) {
    return (
      <Card className="mx-auto max-w-lg text-center">
        <p className="text-5xl">🤔</p>
        <h1 className="mt-3 text-xl font-bold">Item não encontrado</h1>
        <p className="mt-1 text-stone-500">
          <code className="rounded bg-stone-100 px-2 dark:bg-stone-800">{id}</code> não está na lista do painel.
        </p>
        <Button para="/itens" className="mt-5">
          Voltar para os itens
        </Button>
      </Card>
    )
  }

  const caerleon = dados.find((d) => d.cidade === 'Caerleon')
  const blackMarket = dados.find((d) => d.cidade === 'Black Market')
  // Diferença simples: o que o BM paga menos o que custa comprar pronto em Caerleon.
  // (O cálculo real de craft, com materiais e taxas, vem na próxima entrega.)
  const diferenca =
    caerleon?.vendaMin && blackMarket?.compraMax ? blackMarket.compraMax - caerleon.vendaMin : null

  return (
    <div className="flex flex-col gap-6">
      <Link to="/itens" className="text-sm font-semibold text-ouro-600 hover:underline dark:text-ouro-400">
        ← Voltar para os itens
      </Link>

      <div className="flex flex-wrap items-center gap-5">
        <ItemIcone itemId={id} tamanho={96} alt={item.nome} />
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold">
            {item.nome} <span className="text-ouro-600 dark:text-ouro-400">T{tier}</span>
          </h1>
          <p className="text-stone-500 dark:text-stone-400">
            {item.categoria} · <code>{id}</code> · qualidade Normal
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={servidor}
            onChange={(e) => setServidor(e.target.value)}
            aria-label="Servidor"
            className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm dark:border-stone-700 dark:bg-stone-900"
          >
            {Object.entries(SERVIDORES).map(([chave, s]) => (
              <option key={chave} value={chave}>
                {s.nome}
              </option>
            ))}
          </select>
          <Button variante="secundario" tamanho="sm" onClick={recarregar} carregando={carregando}>
            Atualizar
          </Button>
        </div>
      </div>

      {carregando && dados.length === 0 && <Spinner texto="Buscando preços..." />}

      {erro && (
        <Alerta tipo="erro" acao={<Button tamanho="sm" variante="perigo" onClick={recarregar}>Tentar novamente</Button>}>
          {erro}
        </Alerta>
      )}

      {!erro && dados.length > 0 && (
        <>
          <div className="grid gap-5 md:grid-cols-2">
            <CardPreco cidade="Caerleon" preco={caerleon} />
            <CardPreco cidade="Black Market" preco={blackMarket} />
          </div>

          <Card titulo="Diferença Caerleon → Black Market" subtitulo="Prévia: ainda sem custo de materiais e taxas">
            {diferenca === null ? (
              <p className="text-sm text-stone-500">Faltam preços em uma das cidades para calcular.</p>
            ) : (
              <p className={`text-3xl font-extrabold ${diferenca > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {formatarDiferenca(diferenca)}
              </p>
            )}
          </Card>
        </>
      )}

      {!carregando && !erro && dados.length === 0 && (
        <Alerta tipo="info">Nenhum preço registrado para este item no servidor escolhido.</Alerta>
      )}
    </div>
  )
}

export default ItemDetalhe
