import { useState } from 'react'
import { ITENS, TIERS, montarId } from '../../data/itens'
import { buscarPrecos, SERVIDORES } from '../../services/albion'
import { formatarPrata, formatarDiferenca, tempoDesde } from '../../utils/formatar'
import Card from '../../components/Card/Card'
import Button from '../../components/Button/Button'
import Spinner from '../../components/Spinner/Spinner'
import Alerta from '../../components/Alerta/Alerta'
import ItemIcone from '../../components/ItemIcone/ItemIcone'

// Consulta de vários tiers de um item de uma vez.
// A busca é disparada pelo botão, então a chamada fica no submit (não no useEffect).
function Consulta() {
  const [base, setBase] = useState(ITENS[0].base)
  const [servidor, setServidor] = useState('americas')
  const [status, setStatus] = useState('ocioso') // ocioso | carregando | sucesso | erro
  const [linhas, setLinhas] = useState([])
  const [erro, setErro] = useState('')

  async function consultar(evento) {
    evento.preventDefault()
    setStatus('carregando')
    setErro('')
    try {
      const ids = TIERS.map((t) => montarId(base, t))
      const precos = await buscarPrecos(ids, { servidor })
      // Junta Caerleon e Black Market na mesma linha, por tier
      const tabela = ids.map((id, i) => ({
        id,
        tier: TIERS[i],
        caerleon: precos.find((p) => p.item === id && p.cidade === 'Caerleon'),
        bm: precos.find((p) => p.item === id && p.cidade === 'Black Market'),
      }))
      setLinhas(tabela)
      setStatus('sucesso')
    } catch (e) {
      setErro(e.message)
      setStatus('erro')
    }
  }

  const nomeItem = ITENS.find((i) => i.base === base)?.nome

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Consulta de preços</h1>
        <p className="mt-1 text-stone-500 dark:text-stone-400">
          Compare um item em todos os tiers: preço em Caerleon e quanto o Black Market paga.
        </p>
      </div>

      <Card>
        <form onSubmit={consultar} className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="flex flex-1 flex-col gap-1 text-sm font-semibold">
            Item
            <select
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className="rounded-lg border border-stone-300 bg-white px-3 py-2.5 font-normal dark:border-stone-700 dark:bg-stone-950"
            >
              {ITENS.map((item) => (
                <option key={item.base} value={item.base}>
                  {item.nome} ({item.categoria})
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold">
            Servidor
            <select
              value={servidor}
              onChange={(e) => setServidor(e.target.value)}
              className="rounded-lg border border-stone-300 bg-white px-3 py-2.5 font-normal dark:border-stone-700 dark:bg-stone-950"
            >
              {Object.entries(SERVIDORES).map(([chave, s]) => (
                <option key={chave} value={chave}>
                  {s.nome}
                </option>
              ))}
            </select>
          </label>
          <Button type="submit" carregando={status === 'carregando'}>
            Consultar
          </Button>
        </form>
      </Card>

      {status === 'ocioso' && (
        <Alerta tipo="info">Escolha um item e clique em “Consultar”.</Alerta>
      )}
      {status === 'carregando' && <Spinner texto={`Buscando ${nomeItem} T4 a T8...`} />}
      {status === 'erro' && (
        <Alerta tipo="erro">{erro}</Alerta>
      )}
      {status === 'sucesso' && (
        <Card titulo={nomeItem} subtitulo={`Servidor ${SERVIDORES[servidor].nome} · qualidade Normal`}>
          {/* overflow-x-auto: no celular a tabela rola para o lado */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="text-xs uppercase text-stone-500 dark:text-stone-400">
                <tr>
                  <th className="py-2">Item</th>
                  <th className="py-2 text-right">Caerleon (venda)</th>
                  <th className="py-2 text-right">Black Market (compra)</th>
                  <th className="py-2 text-right">Diferença</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {linhas.map((l) => {
                  const dif = l.caerleon?.vendaMin && l.bm?.compraMax ? l.bm.compraMax - l.caerleon.vendaMin : null
                  return (
                    <tr key={l.id}>
                      <td className="py-2">
                        <div className="flex items-center gap-2">
                          <ItemIcone itemId={l.id} tamanho={36} alt="" />
                          <span className="font-bold">T{l.tier}</span>
                        </div>
                      </td>
                      <td className="py-2 text-right">
                        {formatarPrata(l.caerleon?.vendaMin)}
                        <span className="block text-xs text-stone-400">{tempoDesde(l.caerleon?.vendaMinData)}</span>
                      </td>
                      <td className="py-2 text-right">
                        {formatarPrata(l.bm?.compraMax)}
                        <span className="block text-xs text-stone-400">{tempoDesde(l.bm?.compraMaxData)}</span>
                      </td>
                      <td
                        className={`py-2 text-right font-bold ${
                          dif === null ? 'text-stone-400' : dif > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {formatarDiferenca(dif)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}

export default Consulta
