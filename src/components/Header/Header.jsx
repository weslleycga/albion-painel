import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { useTema } from '../../hooks/useTema'

const LINKS = [
  { para: '/', rotulo: 'Início', end: true },
  { para: '/itens', rotulo: 'Itens' },
  { para: '/consulta', rotulo: 'Consulta' },
  { para: '/sobre', rotulo: 'Sobre' },
]

function classeLink({ isActive }) {
  return clsx(
    'block rounded-lg px-4 py-2 font-medium transition',
    isActive
      ? 'bg-ouro-500 text-stone-900'
      : 'text-stone-300 hover:bg-stone-800 hover:text-white',
  )
}

function BotaoTema() {
  // Lê o tema do Context: nenhum componente pai precisou passar props
  const { escuro, alternarTema } = useTema()
  return (
    <button
      type="button"
      onClick={alternarTema}
      className="rounded-lg p-2 text-xl transition hover:bg-stone-800"
      aria-label={escuro ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      title={escuro ? 'Tema claro' : 'Tema escuro'}
    >
      {escuro ? '☀️' : '🌙'}
    </button>
  )
}

function Header() {
  const [menuAberto, setMenuAberto] = useState(false)
  const fechar = () => setMenuAberto(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-800 bg-stone-900 shadow-lg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" onClick={fechar} className="flex items-center gap-2 text-lg font-extrabold text-ouro-400">
          <span className="text-2xl">⚒️</span> Albion Painel
        </Link>

        <div className="flex items-center gap-1">
          <ul className="hidden gap-1 md:flex">
            {LINKS.map((link) => (
              <li key={link.para}>
                <NavLink to={link.para} end={link.end} className={classeLink}>
                  {link.rotulo}
                </NavLink>
              </li>
            ))}
          </ul>

          <BotaoTema />

          <button
            type="button"
            onClick={() => setMenuAberto((aberto) => !aberto)}
            className="rounded-lg p-2 text-2xl text-stone-300 hover:bg-stone-800 md:hidden"
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuAberto}
          >
            {menuAberto ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {menuAberto && (
        <ul className="flex flex-col gap-1 border-t border-stone-800 px-4 pb-4 pt-2 md:hidden">
          {LINKS.map((link) => (
            <li key={link.para}>
              <NavLink to={link.para} end={link.end} onClick={fechar} className={classeLink}>
                {link.rotulo}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}

export default Header
