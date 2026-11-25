# ⚒️ Albion Painel – Craft para o Black Market

Projeto final do curso de React. É um painel para descobrir quais itens do **Albion Online** vale a pena craftar em Caerleon e vender no **Black Market**. Ele usa preços reais da API pública do [Albion Online Data Project](https://www.albion-online-data.com/).

> **Status:** entrega parcial, com o esqueleto do app. Navegação, consulta de preços e tema claro/escuro já funcionam. O cálculo de lucro com o custo dos materiais vem nas próximas entregas.

## Como executar

```bash
npm install
npm run dev
```

Abra no navegador o endereço que aparecer no terminal (normalmente `http://localhost:5173`).

---

## Parte 1 – Planejamento e estrutura de pastas

### Escopo do projeto

**Problema:** no Albion Online, o Black Market de Caerleon compra itens dos jogadores. Para saber se um craft dá lucro, é preciso comparar à mão:
- o preço dos materiais no mercado;
- o valor que o Black Market paga pelo item pronto;
- as taxas do mercado.

Isso leva muito tempo e muda o dia todo.

**Solução:** um painel web que busca os preços atualizados na API e mostra quais itens compensam.

**Público:** jogador sem premium que joga em cidades seguras e quer ganhar prata com craft. A meta é **10 milhões de prata por dia**.

| Funcionalidade | Prioridade | Entrega |
|---|---|---|
| Navegação entre páginas (Início, Itens, Consulta, Sobre) | Essencial | ✅ Esta |
| Consulta de preços em Caerleon e no Black Market | Essencial | ✅ Esta |
| Detalhes de um item com rota dinâmica (`/itens/:id`) | Essencial | ✅ Esta |
| Tema claro/escuro salvo no navegador | Essencial | ✅ Esta |
| Receitas de craft (materiais de cada item) | Essencial | ⏳ Próxima |
| Cálculo de lucro (BM − materiais − taxas) | Essencial | ⏳ Próxima |
| Ranking dos itens mais lucrativos | Importante | ⏳ Próxima |
| Painel da meta diária | Desejável | ⏳ Final |
| Deploy na Vercel | Essencial | ⏳ Final |

### Estrutura de pastas

```
src/
├── components/        ← peças visuais REUTILIZÁVEIS (não sabem de qual página fazem parte)
│   ├── Button/            botão base (primário, secundário, contorno, perigo; vira Link com "para")
│   ├── Card/              caixa base com título, subtítulo e ações
│   ├── Layout/            Header + <Outlet /> + Footer
│   ├── Header/            menu com NavLink + botão de tema
│   ├── Footer/
│   ├── Spinner/           estado de carregando
│   ├── Alerta/            mensagens de erro, informação e sucesso
│   ├── ItemIcone/         imagem oficial do item
│   └── CardPreco/         preços de um item em uma cidade
├── pages/             ← uma pasta por ROTA: juntam os componentes e os dados
│   ├── Inicio/            /
│   ├── Itens/             /itens
│   ├── ItemDetalhe/       /itens/:id
│   ├── Consulta/          /consulta
│   ├── Sobre/             /sobre
│   └── NaoEncontrado/     qualquer outra URL (404)
├── services/          ← comunicação com o mundo de fora (APIs)
│   ├── api.js             fetchJSON genérico: response.ok + erros de rede
│   └── albion.js          funções específicas da API do Albion Data
├── contexts/          ← estados GLOBAIS (Context API)
│   └── ThemeContext.jsx   tema claro/escuro + localStorage
├── hooks/             ← hooks personalizados (lógica reutilizável)
│   ├── useTema.js         lê o ThemeContext
│   └── usePrecos.js       busca preços com loading/erro prontos
├── data/
│   └── itens.js           lista de itens acompanhados e tiers
├── utils/
│   └── formatar.js        formatação de prata, diferença e "há 2 h"
├── App.jsx            ← definição das rotas
├── main.jsx           ← BrowserRouter + ThemeProvider
└── index.css          ← Tailwind
```

---

## Parte 2 – Esqueleto do app

### React Router com Layout

```jsx
<Routes>
  <Route path="/" element={<Layout />}>       {/* Header + Outlet + Footer */}
    <Route index element={<Inicio />} />
    <Route path="itens" element={<Itens />} />
    <Route path="itens/:id" element={<ItemDetalhe />} />
    <Route path="consulta" element={<Consulta />} />
    <Route path="sobre" element={<Sobre />} />
    <Route path="*" element={<NaoEncontrado />} />
  </Route>
</Routes>
```

- **4 páginas no menu** (Início, Itens, Consulta, Sobre), mais a página de detalhes e a 404.
- O **Header** é fixo no topo e responsivo, com menu ☰ no celular. O `NavLink` destaca a página atual em dourado.

### Serviço de API

O `services/api.js` tem uma função **genérica** de fetch, usada pelo projeto inteiro. Ela já trata os dois tipos de erro:

```js
export async function fetchJSON(url) {
  let resposta
  try {
    resposta = await fetch(url)
  } catch {
    throw new ApiError('Não foi possível conectar.', 0)   // erro de rede
  }
  if (!resposta.ok) {
    throw new ApiError(`A API respondeu com erro ${resposta.status}.`, resposta.status)  // erro HTTP
  }
  return resposta.json()
}
```

O `services/albion.js` usa essa função para montar a URL da API do Albion. Ele também converte os nomes em inglês (`sell_price_min`) para os nomes que as telas usam (`vendaMin`).

Exemplo de URL gerada:
```
https://west.albion-online-data.com/api/v2/stats/prices/T6_BAG.json?locations=Caerleon,Black Market&qualities=1
```

### Componentes base

- **`Button`**:
  - Tem 4 variantes (`primario`, `secundario`, `contorno`, `perigo`) e 3 tamanhos.
  - Mostra um spinner quando `carregando`.
  - Com a prop `para`, vira um `<Link>` do React Router com a mesma aparência. Assim não é preciso colocar `<button>` dentro de `<Link>`, o que seria HTML inválido.
- **`Card`**: uma caixa com título, subtítulo e área de ações opcionais. Já vem pronta para o tema escuro.

Ambos usam `clsx` para juntar as classes do Tailwind.

### Hook personalizado `usePrecos`

A página de detalhes carrega os preços **quando abre**, então usa um `useEffect`. Esse efeito fica dentro de um hook, para a página não precisar repetir o controle de carregando e erro:

```jsx
const { dados, carregando, erro, recarregar } = usePrecos([id], servidor)
```

Já a página **Consulta** busca quando o usuário clica no botão, então a chamada fica no `onSubmit`.

---

## Parte 3 – Tema claro/escuro com Context API

1. **`contexts/ThemeContext.jsx`** cria o contexto e o `ThemeProvider`, que guarda o estado `tema`.
2. Um `useEffect` no provider sincroniza o tema com duas coisas de fora do React:
   - a classe `dark` no `<html>`, que ativa as classes `dark:` do Tailwind (`darkMode: 'class'` no `tailwind.config.js`);
   - o `localStorage`, para lembrar a escolha.
3. **`hooks/useTema.js`** é um atalho para ler o contexto. Ele avisa com um erro se for usado fora do provider.
4. O botão ☀️/🌙 no Header chama `alternarTema()`. **Nenhuma prop** foi passada do App até ele.

```jsx
const { escuro, alternarTema } = useTema()
```

**Detalhes extras:**
- Na primeira visita, o tema segue a preferência do sistema operacional (`prefers-color-scheme`).
- Um pequeno script no `index.html` aplica o tema salvo **antes** do React carregar. Assim a tela não "pisca" branca para quem usa o tema escuro.

---

## Parte 4 – Reflexão

### Qual a importância de separar `pages`, `components` e `services` em um projeto React que está crescendo?

Cada pasta tem **uma responsabilidade**, e isso traz várias vantagens.

**1. Cada arquivo tem um motivo só para mudar.**
- `components/`: **como as coisas aparecem**. O `Button` não sabe se está na página de itens ou na consulta.
- `pages/`: **o que cada tela mostra**. A página junta componentes e dados para montar uma rota.
- `services/`: **de onde vêm os dados**. Só ela sabe a URL da API e o formato da resposta.

Se a API do Albion mudar o endereço ou o nome de um campo, altero **um arquivo** (`albion.js`). As páginas nem percebem. Se eu quiser mudar a cor dos botões, altero só o `Button`, e todas as páginas atualizam.

**2. Reutilização em vez de copiar e colar.**
O `Card` aparece em todas as páginas. Se cada página tivesse sua própria caixa, uma correção, como o suporte ao tema escuro, precisaria ser repetida em dezenas de lugares, e alguma sempre ficaria esquecida.

**3. Fica fácil de achar as coisas.**
Num projeto com 50 arquivos, a estrutura responde sozinha: um problema no menu está em `components/Header`, um erro na busca de preços está em `services/`. Isso ajuda muito quando outra pessoa entra no projeto, ou quando eu volto a ele depois de meses.

**4. Fica mais fácil testar e trocar peças.**
Como a lógica de API está separada da tela, dá para testar o `buscarPrecos` sem abrir o navegador. Também dá para trocar a API inteira por outra sem mexer no visual.

**5. O projeto cresce sem virar bagunça.**
Em um exercício pequeno, tudo no `App.jsx` funciona. Num projeto real, esse arquivo chegaria a milhares de linhas misturando HTML, estilos, `fetch` e regras de negócio. Separar desde o começo custa pouco e evita uma reorganização dolorosa depois.

Resumindo: **componentes cuidam da aparência, páginas montam as telas, services buscam os dados, contexts guardam o estado global e hooks guardam a lógica reutilizável.**

---

## Tecnologias

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://v3.tailwindcss.com/) (com `darkMode: 'class'`)
- [clsx](https://github.com/lukeed/clsx)
- [Albion Online Data Project](https://www.albion-online-data.com/) (API de preços)

*Projeto de fã, sem ligação com a Sandbox Interactive. Os preços são enviados por jogadores e podem estar desatualizados.*
