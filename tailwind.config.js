/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // 'class': o tema escuro liga quando o <html> tem a classe "dark".
  // Quem coloca/tira essa classe é o ThemeContext.
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ouro: {
          400: '#f5c542',
          500: '#e0a91b',
          600: '#b9860f',
        },
      },
    },
  },
  plugins: [],
}
