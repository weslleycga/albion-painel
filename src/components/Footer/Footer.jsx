function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white py-6 text-center text-sm text-stone-500 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400">
      <p>Albion Painel — Weslley Cutrim</p>
      <p className="mt-1 text-xs">
        Preços:{' '}
        <a
          href="https://www.albion-online-data.com/"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-ouro-600"
        >
          Albion Online Data Project
        </a>
        . Projeto de fãs, sem ligação com a Sandbox Interactive.
      </p>
    </footer>
  )
}

export default Footer
