# ⚒️ Albion Painel – Craft para o Black Market

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Deploy na Vercel](https://img.shields.io/badge/deploy-Vercel-000000?logo=vercel&logoColor=white)

Painel web que ajuda jogadores de **Albion Online** a descobrir quais itens vale a pena comprar ou craftar em **Caerleon** e vender no **Black Market**. Ele usa preços reais enviados pela comunidade.

## 🔗 Acesse

| | Link |
|---|---|
| 🌐 **Aplicação online** | **https://albion-painel.vercel.app** |
| 💻 Código-fonte | https://github.com/weslleycga/albion-painel |

> Teste um link direto, como **https://albion-painel.vercel.app/itens/T6_BAG**: a página abre sem erro 404, graças ao SPA fallback (veja a seção [Deploy](#-deploy)).

---

## 📸 Telas

### Desktop

![Tela inicial no desktop](./docs/prints/desktop-inicio.png)

![Consulta de preços no desktop](./docs/prints/desktop-consulta.png)

### Mobile

<p>
  <img src="./docs/prints/mobile-inicio.png" alt="Tela inicial no celular" width="260" />
  &nbsp;&nbsp;
  <img src="./docs/prints/mobile-menu.png" alt="Menu aberto no celular" width="260" />
  &nbsp;&nbsp;
  <img src="./docs/prints/mobile-item.png" alt="Detalhes de um item no celular" width="260" />
</p>

---

## 🎯 O problema e a solução

No Albion Online, o **Black Market** de Caerleon compra itens dos jogadores para abastecer os baús do jogo. Os preços mudam o dia todo, e descobrir se vale a pena vender um item lá exige comparar dezenas de valores à mão, item por item e tier por tier.

O **Albion Painel** faz essa comparação automaticamente:

- **Consulta de preços:** escolha um item e veja de uma vez, do T4 ao T8, quanto ele custa em Caerleon e quanto o Black Market paga. A diferença aparece em verde (lucro) ou vermelho (prejuízo).
- **Catálogo de itens:** navegue pelos itens acompanhados, filtrando por categoria (armas, armaduras, acessórios) e por tier.
- **Detalhes do item:** página própria para cada item (`/itens/T6_BAG`), com os preços das duas cidades e há quanto tempo cada preço foi registrado.
- **Três servidores:** Américas, Europa e Ásia.
- **Tema claro e escuro:** a escolha fica salva no navegador e, na primeira visita, segue a preferência do sistema.
- **Responsivo:** menu ☰ no celular e tabelas que rolam para o lado em telas pequenas.
- **Feedback em todas as etapas:** spinner ao carregar, mensagens de erro com "Tentar novamente", aviso de "muitas consultas seguidas" (erro 429) e página 404.

## 🛠️ Tecnologias

| Tecnologia | Para quê |
|---|---|
| [React 19](https://react.dev/) | Interface em componentes |
| [React Router 7](https://reactrouter.com/) | Navegação entre páginas sem recarregar (SPA), rota dinâmica `/itens/:id` |
| [Tailwind CSS 3](https://v3.tailwindcss.com/) | Estilos, responsividade (`sm:`, `md:`, `lg:`) e tema escuro (`dark:`) |
| Context API | Tema claro/escuro global, sem passar props |
| [Vite 8](https://vite.dev/) | Servidor de desenvolvimento e build de produção |
| [ESLint](https://eslint.org/) | Análise do código (regras de hooks e de Fast Refresh) |
| [clsx](https://github.com/lukeed/clsx) | Montagem condicional de classes CSS |
| [Albion Online Data Project](https://www.albion-online-data.com/) | API pública de preços (sem chave) |
| [Vercel](https://vercel.com/) | Hospedagem e deploy automático a cada `git push` |

## 💻 Como rodar localmente

**Pré-requisitos:** [Node.js](https://nodejs.org/) 20 ou mais recente e Git.

```bash
# 1. Clonar o repositório
git clone https://github.com/weslleycga/albion-painel.git
cd albion-painel

# 2. Instalar as dependências
npm install

# 3. Rodar em modo de desenvolvimento
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente `http://localhost:5173`).

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com atualização automática |
| `npm run lint` | Verifica o código com o ESLint |
| `npm run build` | Gera a versão de produção na pasta `dist/` |
| `npm run preview` | Abre a versão de produção localmente, para testar antes do deploy |

Não é preciso nenhuma chave de API nem arquivo `.env`.

## 📁 Estrutura do projeto

```
src/
├── components/        peças visuais reutilizáveis (Button, Card, Header, Footer, Spinner, Alerta...)
├── pages/             uma pasta por rota (Inicio, Itens, ItemDetalhe, Consulta, Sobre, NaoEncontrado)
├── services/          comunicação com a API
│   ├── api.js             fetch genérico: trata erro de rede e response.ok
│   └── albion.js          URLs e formato de dados do Albion Data Project
├── contexts/          estado global
│   ├── ThemeContext.jsx   o contexto do tema (só o createContext)
│   └── ThemeProvider.jsx  guarda o tema e sincroniza com <html> e localStorage
├── hooks/             lógica reutilizável (useTema, usePrecos)
├── data/              lista de itens acompanhados e tiers
├── utils/             formatação de prata, diferença e "há 2 h"
├── App.jsx            definição das rotas
└── main.jsx           BrowserRouter + ThemeProvider
```

---

## ✅ Parte 1 – Build de produção e ESLint

Antes do deploy, rodei o build e o ESLint localmente:

```bash
npm run lint    # ✖ 1 problema encontrado → corrigido → 0 problemas
npm run build   # ✓ build sem erros nem avisos
```

**Problema encontrado pelo ESLint:**

```
src/contexts/ThemeContext.jsx
  error  Fast refresh only works when a file only exports components.
         Move your React context(s) to a separate file  react-refresh/only-export-components
```

O arquivo exportava o **contexto** (`createContext`) e o **componente** `ThemeProvider` juntos. Isso quebra o *Fast Refresh*, a atualização automática da tela ao salvar um arquivo no `npm run dev`.

**Correção:** separei em dois arquivos:
- `ThemeContext.jsx` passa a exportar só o contexto;
- `ThemeProvider.jsx` exporta só o componente.

A configuração do ESLint fica no `eslint.config.js` e usa:
- `eslint-plugin-react-hooks`: confere as regras dos hooks e as dependências do `useEffect`;
- `eslint-plugin-react-refresh`: confere o problema acima.

## 🚀 Parte 2 – Deploy

A aplicação está publicada na **Vercel**, ligada ao repositório do GitHub. A cada `git push` na branch `main`, a Vercel roda `npm run build` e publica a pasta `dist/` automaticamente.

### SPA fallback (redirecionamento de rotas)

Numa SPA existe **um único `index.html`**. Quem decide qual página mostrar é o React Router, no navegador. O problema: ao abrir um link direto como `/itens/T6_BAG`, ou ao apertar F5 nessa página, o **servidor** procura um arquivo `itens/T6_BAG` que não existe e responde **404**.

A solução é dizer ao servidor: *"para qualquer endereço, entregue o `index.html`"*. Depois disso, o React Router lê a URL e mostra a página certa.

**Vercel:** arquivo `vercel.json` na raiz:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Netlify:** arquivo `public/_redirects`, que o Vite copia para dentro da `dist/`:

```
/*    /index.html    200
```

O projeto tem os dois arquivos, então funciona nas duas plataformas. Arquivos que existem de verdade (JS, CSS, favicon) continuam sendo entregues normalmente: o redirecionamento só vale quando o arquivo não existe.

### Testes em produção

| Teste | Resultado |
|---|---|
| Navegar pelo menu (Início, Itens, Consulta, Sobre) sem recarregar a página | ⬜ |
| Abrir `/itens/T6_BAG` direto na barra de endereço | ⬜ |
| Apertar F5 em `/consulta` | ⬜ |
| Abrir uma rota inexistente (`/xyz`) → página 404 do próprio app | ⬜ |
| Consultar preços (API do Albion Data) | ⬜ |
| Trocar de servidor (Américas / Europa / Ásia) | ⬜ |
| Alternar tema e recarregar a página → tema continua salvo | ⬜ |
| Celular (375px): menu ☰, cards em uma coluna, tabela com rolagem lateral | ⬜ |
| Tablet e desktop: menu horizontal e grid de 2 e 3 colunas | ⬜ |

---

## 💭 Parte 4 – Reflexão

### Qual o impacto de ter um projeto documentado e publicado no seu portfólio como desenvolvedor?

**Um projeto publicado prova que eu sei terminar.** Muita gente começa projetos. Poucos levam um até o fim: com tratamento de erros, funcionando no celular, sem 404 nos links e acessível por qualquer pessoa. Um link que abre e funciona mostra que conheço o **ciclo completo** do software:

1. planejar;
2. desenvolver;
3. testar;
4. corrigir os avisos do build;
5. configurar o servidor;
6. publicar.

É isso que acontece no trabalho de verdade.

**Ele reduz o esforço de quem avalia.** Um recrutador ou cliente não vai clonar o repositório, instalar dependências e rodar `npm run dev` para ver o que eu fiz. Com um link, ele vê o resultado em **dez segundos**, inclusive pelo celular. Se precisa de esforço para ver, na prática o projeto não é visto.

**A documentação mostra como eu penso.** O código mostra *o que* eu fiz. O README mostra *por que* fiz e *como* organizei:
- qual problema o projeto resolve;
- quais decisões tomei, como o SPA fallback e a separação do contexto;
- quais erros encontrei e como resolvi.

Isso mostra comunicação e capacidade de explicar decisões técnicas, habilidades tão importantes quanto programar, principalmente em equipe.

**Ele vira material de conversa.** Numa entrevista, em vez de responder perguntas genéricas, posso dizer: *"no meu projeto, a API pode responder 429 quando há muitas consultas; olha como tratei"*. Um projeto real e público dá exemplos concretos para tudo.

**Ele resolve um problema real.** Este painel não é uma lista de tarefas de tutorial. Ele nasceu de uma necessidade minha como jogador e consome dados reais. Projetos com propósito chamam mais atenção que exercícios repetidos.

### Por que o README é a primeira coisa que um recrutador lê?

**Porque é a primeira coisa que aparece.** Ao abrir qualquer repositório no GitHub, o README é exibido logo abaixo da lista de arquivos. Ele funciona como a **capa** e o **cartão de visitas** do projeto.

**Porque o tempo do recrutador é curto.** Um recrutador avalia muitos candidatos e gasta poucos minutos em cada repositório. Em segundos, o README precisa responder:
- o que é o projeto;
- se ele funciona (link do deploy e prints);
- quais tecnologias usa (para cruzar com a vaga);
- se a pessoa sabe se comunicar.

**Porque nem todo recrutador lê código.** Muitos recrutadores não são programadores. O README é a parte do projeto que **qualquer pessoa entende**. Prints e um link funcionando falam mais do que mil linhas de JavaScript.

**Porque ele revela cuidado.** Um repositório sem README, ou só com o texto padrão do Vite, passa a impressão de projeto abandonado ou incompleto. Um README organizado, com instruções que funcionam, mostra profissionalismo: o mesmo cuidado que a pessoa teria com a documentação de um sistema da empresa.

**Em resumo:** o código prova que eu sei programar. O deploy prova que eu sei entregar. O README faz alguém **querer olhar** os dois.

---

## 🗺️ Próximos passos

- [ ] Receitas de craft com a quantidade de materiais de cada item
- [ ] Cálculo de lucro real: preço no Black Market − materiais − taxas do mercado
- [ ] Ranking dos itens mais lucrativos do momento
- [ ] Painel de acompanhamento da meta diária de prata

## 👤 Autor

**Weslley Cutrim**, estudante de Análise e Desenvolvimento de Sistemas.
[GitHub](https://github.com/weslleycga)

---

<sub>Projeto de fã, sem ligação com a Sandbox Interactive. Os preços são enviados por jogadores através do Albion Online Data Project e podem estar desatualizados.</sub>
