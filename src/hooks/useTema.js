import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

// Hook personalizado para ler o tema.
// Em vez de importar useContext + ThemeContext em todo lugar,
// os componentes só fazem: const { tema, alternarTema } = useTema()
export function useTema() {
  const contexto = useContext(ThemeContext)
  if (!contexto) {
    throw new Error('useTema() precisa ser usado dentro do <ThemeProvider>')
  }
  return contexto
}
