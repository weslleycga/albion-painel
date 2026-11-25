import { useCallback, useEffect, useState } from 'react'
import { buscarPrecos } from '../services/albion'

// Hook personalizado que busca preços e cuida dos estados da requisição.
// As páginas não precisam repetir loading/erro/dados: só usam o hook.
//
//   const { dados, carregando, erro, recarregar } = usePrecos(['T4_BAG'], 'americas')
//
// Passe "ativo = false" para não buscar nada ainda (ex: antes de escolher um item).
export function usePrecos(itens, servidor, ativo = true) {
  const [dados, setDados] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const [contador, setContador] = useState(0) // muda para forçar nova busca

  // Transforma o array em texto para usar nas dependências do useEffect
  // (arrays novos a cada render fariam o efeito rodar sem parar)
  const chaveItens = itens.join(',')

  useEffect(() => {
    if (!ativo || chaveItens === '') return

    let ignorar = false

    async function carregar() {
      setCarregando(true)
      setErro('')
      try {
        const resultado = await buscarPrecos(chaveItens.split(','), { servidor })
        if (!ignorar) setDados(resultado)
      } catch (e) {
        if (!ignorar) {
          setErro(e.message)
          setDados([])
        }
      } finally {
        if (!ignorar) setCarregando(false)
      }
    }

    carregar()
    return () => {
      ignorar = true
    }
  }, [chaveItens, servidor, ativo, contador])

  const recarregar = useCallback(() => setContador((n) => n + 1), [])

  return { dados, carregando, erro, recarregar }
}
