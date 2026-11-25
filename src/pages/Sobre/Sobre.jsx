import Card from '../../components/Card/Card'
import { useTema } from '../../hooks/useTema'

const ETAPAS = [
  { feito: true, texto: 'Estrutura de pastas, rotas, Layout e componentes base' },
  { feito: true, texto: 'Serviço de API com tratamento de erros' },
  { feito: true, texto: 'Tema claro/escuro com Context API + localStorage' },
  { feito: false, texto: 'Receitas de craft (materiais de cada item)' },
  { feito: false, texto: 'Cálculo de lucro: preço no BM − custo dos materiais − taxas' },
  { feito: false, texto: 'Ranking dos itens mais lucrativos e meta diária' },
  { feito: false, texto: 'Deploy na Vercel' },
]

function Sobre() {
  const { tema } = useTema()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold sm:text-3xl">Sobre o projeto</h1>

      <Card titulo="Problema">
        <p className="text-stone-600 dark:text-stone-300">
          No Albion Online, o Black Market de Caerleon compra itens dos jogadores. Saber quais itens dão
          lucro exige comparar muitos preços à mão. Este painel faz essa comparação automaticamente
          com a API pública do Albion Data Project.
        </p>
      </Card>

      <Card titulo="Roteiro" subtitulo="O que já foi feito e o que vem nas próximas entregas">
        <ul className="space-y-2">
          {ETAPAS.map((etapa) => (
            <li key={etapa.texto} className="flex gap-3">
              <span>{etapa.feito ? '✅' : '⏳'}</span>
              <span className={etapa.feito ? '' : 'text-stone-500 dark:text-stone-400'}>{etapa.texto}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card titulo="Tecnologias">
        <p className="text-stone-600 dark:text-stone-300">
          React, React Router, Tailwind CSS, Context API e Vite. Tema atual: <strong>{tema}</strong>.
        </p>
      </Card>
    </div>
  )
}

export default Sobre
