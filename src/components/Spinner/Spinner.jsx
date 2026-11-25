function Spinner({ texto = 'Carregando...' }) {
  return (
    <div role="status" className="flex flex-col items-center gap-3 py-10">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-ouro-500 dark:border-stone-700 dark:border-t-ouro-400" />
      <p className="text-sm text-stone-500 dark:text-stone-400">{texto}</p>
    </div>
  )
}

export default Spinner
