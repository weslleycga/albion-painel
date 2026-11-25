import Card from '../../components/Card/Card'
import Button from '../../components/Button/Button'
import { ITENS } from '../../data/itens'

const META_DIARIA = 10_000_000

function Inicio() {
  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-2xl bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 px-6 py-10 text-white shadow-lg sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-ouro-400">Albion Online</p>
        <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Craft para o Black Market</h1>
        <p className="mt-3 max-w-2xl text-stone-300">
          Painel para descobrir quais itens vale a pena craftar em Caerleon e vender no Black Market,
          usando preços reais enviados pelos jogadores.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button para="/consulta" tamanho="lg">
            Consultar preços
          </Button>
          <Button para="/itens" tamanho="lg" variante="contorno" className="border-stone-500 text-white dark:text-white">
            Ver itens
          </Button>
        </div>
      </section>

      <div className="grid gap-5 sm:grid-cols-3">
        <Card titulo="🎯 Meta diária">
          <p className="text-3xl font-extrabold text-ouro-600 dark:text-ouro-400">
            {META_DIARIA.toLocaleString('pt-BR')}
          </p>
          <p className="text-sm text-stone-500 dark:text-stone-400">de prata por dia</p>
        </Card>
        <Card titulo="📦 Itens acompanhados">
          <p className="text-3xl font-extrabold">{ITENS.length}</p>
          <p className="text-sm text-stone-500 dark:text-stone-400">em 5 tiers (T4 a T8)</p>
        </Card>
        <Card titulo="🏰 Rota">
          <p className="text-xl font-extrabold">Caerleon → Black Market</p>
          <p className="text-sm text-stone-500 dark:text-stone-400">comprar, craftar e vender na mesma cidade</p>
        </Card>
      </div>

      <Card titulo="Status do projeto" subtitulo="Entrega parcial — esqueleto do app">
        <ul className="grid gap-2 text-sm sm:grid-cols-2">
          <li>✅ Navegação entre páginas (React Router)</li>
          <li>✅ Consulta de preços na API do Albion Data</li>
          <li>✅ Tema claro e escuro (Context API)</li>
          <li>⏳ Custo dos materiais de cada receita</li>
          <li>⏳ Cálculo de lucro por item</li>
          <li>⏳ Ranking dos itens mais lucrativos</li>
        </ul>
      </Card>
    </div>
  )
}

export default Inicio
