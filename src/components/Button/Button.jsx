import { Link } from 'react-router-dom'
import clsx from 'clsx'

const VARIANTES = {
  primario: 'bg-ouro-500 text-stone-900 hover:bg-ouro-400 focus-visible:ring-ouro-400',
  secundario:
    'bg-stone-800 text-white hover:bg-stone-700 focus-visible:ring-stone-500 dark:bg-stone-700 dark:hover:bg-stone-600',
  contorno:
    'border-2 border-stone-300 text-stone-700 hover:border-ouro-500 hover:text-ouro-600 dark:border-stone-600 dark:text-stone-200',
  perigo: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400',
}

const TAMANHOS = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5',
  lg: 'px-6 py-3 text-lg',
}

// Botão base do projeto.
// - Com a prop "para", vira um <Link> do React Router com a mesma aparência
//   (colocar <button> dentro de <Link> é HTML inválido).
// - Sem "para", é um <button> normal e repassa onClick, type, disabled...
function Button({ variante = 'primario', tamanho = 'md', carregando = false, para, className, children, ...resto }) {
  const classes = clsx(
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition',
    'focus:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-50',
    VARIANTES[variante],
    TAMANHOS[tamanho],
    className,
  )

  if (para) {
    return (
      <Link to={para} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" {...resto} disabled={carregando || resto.disabled} className={classes}>
      {carregando && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  )
}

export default Button
