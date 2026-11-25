import clsx from 'clsx'

// Card base do projeto: caixa com fundo, borda e sombra,
// já preparada para o tema escuro.
function Card({ titulo, subtitulo, acoes, className, children }) {
  return (
    <section
      className={clsx(
        'rounded-2xl border border-stone-200 bg-white p-5 shadow-sm',
        'dark:border-stone-800 dark:bg-stone-900',
        className,
      )}
    >
      {(titulo || acoes) && (
        <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            {titulo && <h2 className="text-lg font-bold">{titulo}</h2>}
            {subtitulo && <p className="text-sm text-stone-500 dark:text-stone-400">{subtitulo}</p>}
          </div>
          {acoes}
        </header>
      )}
      {children}
    </section>
  )
}

export default Card
