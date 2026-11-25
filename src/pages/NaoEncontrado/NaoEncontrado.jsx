import { useLocation } from 'react-router-dom'
import Card from '../../components/Card/Card'
import Button from '../../components/Button/Button'

function NaoEncontrado() {
  const { pathname } = useLocation()
  return (
    <Card className="mx-auto max-w-lg text-center">
      <p className="text-6xl font-extrabold text-ouro-500">404</p>
      <h1 className="mt-2 text-xl font-bold">Página não encontrada</h1>
      <p className="mt-1 text-stone-500">
        A rota <code className="rounded bg-stone-100 px-2 dark:bg-stone-800">{pathname}</code> não existe.
      </p>
      <Button para="/" className="mt-5">
        Ir para o início
      </Button>
    </Card>
  )
}

export default NaoEncontrado
