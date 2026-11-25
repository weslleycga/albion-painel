import { useEffect, useState } from 'react'
import { ThemeContext } from './ThemeContext'

// PARTE 3 – Context API para o tema claro/escuro
//
// Sem o Context, o tema teria que ser passado por props do App para o
// Layout, do Layout para o Header, do Header para o botão... (prop drilling).
// Com o Context, qualquer componente lê o tema direto com o hook useTema().

const CHAVE_STORAGE = 'albion-painel:tema'

// Lê a preferência salva. Se não tiver, segue o tema do sistema operacional.
function temaInicial() {
  try {
    const salvo = localStorage.getItem(CHAVE_STORAGE)
    if (salvo === 'claro' || salvo === 'escuro') return salvo
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro'
  } catch {
    return 'claro'
  }
}

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState(temaInicial)

  // Sincroniza com dois "sistemas externos" ao React:
  // 1) a classe "dark" no <html> (é ela que ativa as classes dark: do Tailwind)
  // 2) o localStorage (para lembrar a escolha quando a página recarregar)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', tema === 'escuro')
    try {
      localStorage.setItem(CHAVE_STORAGE, tema)
    } catch {
      // navegação anônima ou storage bloqueado: só não salva
    }
  }, [tema])

  function alternarTema() {
    setTema((atual) => (atual === 'escuro' ? 'claro' : 'escuro'))
  }

  const valor = { tema, alternarTema, escuro: tema === 'escuro' }

  return <ThemeContext.Provider value={valor}>{children}</ThemeContext.Provider>
}
