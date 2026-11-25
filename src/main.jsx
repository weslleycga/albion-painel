import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeProvider'
import App from './App.jsx'
import './index.css'

// Ordem dos "provedores":
// - BrowserRouter: libera as rotas para todo o app
// - ThemeProvider: libera o tema (claro/escuro) para todo o app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
