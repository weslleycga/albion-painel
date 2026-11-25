import clsx from 'clsx'

const TIPOS = {
  erro: { icone: '⚠️', classe: 'border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200' },
  info: { icone: 'ℹ️', classe: 'border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-200' },
  sucesso: { icone: '✅', classe: 'border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200' },
}

function Alerta({ tipo = 'info', children, acao }) {
  const { icone, classe } = TIPOS[tipo]
  return (
    <div role={tipo === 'erro' ? 'alert' : 'status'} className={clsx('flex flex-wrap items-center gap-3 rounded-xl border p-4', classe)}>
      <span>{icone}</span>
      <div className="flex-1 text-sm">{children}</div>
      {acao}
    </div>
  )
}

export default Alerta
