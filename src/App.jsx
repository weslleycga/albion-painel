import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Inicio from './pages/Inicio/Inicio'
import Itens from './pages/Itens/Itens'
import ItemDetalhe from './pages/ItemDetalhe/ItemDetalhe'
import Consulta from './pages/Consulta/Consulta'
import Sobre from './pages/Sobre/Sobre'
import NaoEncontrado from './pages/NaoEncontrado/NaoEncontrado'

// Todas as páginas ficam dentro do Layout (Header + Outlet + Footer)
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="itens" element={<Itens />} />
        <Route path="itens/:id" element={<ItemDetalhe />} />
        <Route path="consulta" element={<Consulta />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="*" element={<NaoEncontrado />} />
      </Route>
    </Routes>
  )
}

export default App
