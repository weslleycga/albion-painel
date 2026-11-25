import { createContext } from 'react'

// O "canal" do tema. Fica num arquivo separado do Provider porque o
// ESLint (react-refresh) pede que arquivos .jsx exportem SÓ componentes.
// Assim a atualização automática da tela no "npm run dev" continua funcionando.
export const ThemeContext = createContext(null)
