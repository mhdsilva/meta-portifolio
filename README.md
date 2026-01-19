# 🎭 Meta-Developer Portfolio

> Um portfólio que se constrói sozinho através de uma conversa com IA — simulando a experiência de pair programming em tempo real.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?logo=framer&logoColor=white)

## 📖 Conceito

Este não é um portfólio comum. É uma **experiência interativa** que simula uma interface de desenvolvimento (IDE) dividida em duas colunas:

- **🤖 Flutuante**: Chat de IA onde acontece a "conversa" de desenvolvimento
- **👁️ Coluna Direita**: Live Preview do site sendo construído em tempo real

O visitante assiste a uma narrativa pré-definida onde o desenvolvedor conversa com a IA, e o portfólio vai sendo construído passo a passo, desde um HTML básico até um site moderno e estilizado.

## 🎬 O Storytelling

A experiência é dividida em **6 atos**:

| Ato | Descrição | Ação no Preview |
|-----|-----------|-----------------|
| **1. Estrutura** | Gera esqueleto HTML básico | Site "feio" com Times New Roman |
| **2. Estilização** | Aplica tema Dark e tipografia moderna | Transição visual para design moderno |
| **3. Identidade** | Adiciona seção "Sobre Mim" | Bento Grid com glassmorphism |
| **4. Carreira** | Timeline de experiência + Tech Stack | Cards interativos surgem |
| **5. O Erro** | Tenta adicionar partículas pesadas | Site "quebra" com glitch |
| **6. Correção** | Corrige o bug + ativa Code Lens | Site restaurado com feature especial |

## ✨ Features Especiais

### 🔍 Code Lens
Após a "correção do bug", um efeito especial é ativado: ao passar o mouse sobre qualquer seção, uma "lente de código" revela o código-fonte do componente por trás daquela parte do site. Um efeito visual que demonstra transparência e conhecimento técnico.

### ⌨️ Typing Animation
- Mensagens do usuário simulam digitação caractere por caractere
- Mensagens da IA têm indicador de "digitando..." antes de aparecer
- Input de chat reage visualmente durante a "digitação"

### 📱 Design Responsivo
- Layout adaptativo para desktop (duas colunas) e mobile (stacked)
- Chat expansível/retrátil em dispositivos móveis
- Touch-friendly com gestos intuitivos

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                         App.jsx                             │
│  ┌─────────────────────┐  ┌──────────────────────────────┐  │
│  │      Chat.jsx       │  │        Preview.jsx           │  │
│  │                     │  │                              │  │
│  │ • Mensagens         │  │ • INITIAL (aguardando)       │  │
│  │ • Typing indicator  │  │ • HTML_VIEW (sem estilo)     │  │
│  │ • Input simulado    │  │ • STYLED_SITE (com seções)   │  │
│  │ • Reset button      │  │ • FINAL (completo)           │  │
│  └─────────────────────┘  └──────────────────────────────┘  │
│                    ▲                    ▲                   │
│                    │                    │                   │
│              ┌─────┴────────────────────┴─────┐             │
│              │     useStorytelling Hook       │             │
│              │                                │             │
│              │ • messages[]                   │             │
│              │ • currentAction                │             │
│              │ • isTyping / isPaused          │             │
│              │ • processStep()                │             │
│              │ • nextStep()                   │             │
│              └────────────────────────────────┘             │
│                              ▲                              │
│                              │                              │
│                    ┌─────────┴─────────┐                    │
│                    │    story.js       │                    │
│                    │ (Timeline Array)  │                    │
│                    └───────────────────┘                    │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Estrutura de Pastas

```
src/
├── App.jsx                    # Componente raiz (layout principal)
├── main.jsx                   # Entry point
├── index.css                  # Estilos globais
│
├── components/
│   ├── Chat.jsx               # Painel de chat com IA
│   ├── Preview.jsx            # Container do preview + reducer de estado
│   │
│   └── preview/               # Componentes do site renderizado
│       ├── Navbar.jsx         # Navegação fixa
│       ├── Hero.jsx           # Seção principal com parallax
│       ├── About.jsx          # Bento Grid sobre mim
│       ├── Experience.jsx     # Timeline de experiência
│       ├── TechStack.jsx      # Grid de tecnologias
│       ├── Footer.jsx         # Rodapé com contato
│       ├── CodeLensWrapper.jsx# HOC para efeito de lente de código
│       ├── CodeLensContext.jsx# Context para estado global do Code Lens
│       └── ...                # Outros componentes auxiliares
│
├── data/
│   ├── story.js               # Timeline do storytelling
│   └── codeSnippets.js        # Código exibido no Code Lens
│
└── hooks/
    └── useStorytelling.js     # Engine principal da narrativa
```

## 🔧 Como Funciona

### 1. Story Timeline (`data/story.js`)

Array de objetos que define a sequência da narrativa:

```javascript
{
  id: 1,
  sender: 'user',           // 'user' ou 'ai'
  text: 'Mensagem...',      // Texto exibido no chat
  action: 'SHOW_HTML',      // Comando para o Preview (opcional)
  delay: 2500               // Tempo antes da próxima mensagem
}
```

### 2. Storytelling Hook (`hooks/useStorytelling.js`)

Engine que controla o fluxo:
- **`processStep()`**: Adiciona mensagem e dispara ação
- **`nextStep()`**: Avança para próximo item da timeline
- Simula digitação do usuário (30ms por caractere)
- Simula "pensamento" da IA antes de responder

### 3. Preview Reducer (`components/Preview.jsx`)

Gerencia o estado visual através de actions:

| Action | Efeito |
|--------|--------|
| `SHOW_HTML` | Renderiza HTML puro (estilo anos 90) |
| `APPLY_STYLES` | Ativa tema dark + transição |
| `ADD_ABOUT` | Adiciona seção Sobre + scroll automático |
| `ADD_EXPERIENCE_SKILLS` | Adiciona timeline e tech stack |
| `TRIGGER_CRASH` | Aplica filtro de glitch + modal de erro |
| `FIX_CRASH` | Remove erro + ativa Code Lens |
| `FINAL_VIEW` | Estado final completo |

### 4. Code Lens System

Sistema de "lente de código" que revela o código-fonte:

```jsx
<CodeLensWrapper code={codeSnippets.hero} filename="Hero.jsx">
  <Hero theme={theme} />
</CodeLensWrapper>
```

Quando ativo, ao passar o mouse sobre um componente, uma máscara circular revela o código por trás, criando um efeito visual de "raio-x do código".

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+
- npm ou pnpm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/portifolio.git

# Entre na pasta
cd portifolio

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run preview` | Preview da build de produção |
| `npm run lint` | Executa ESLint |

## 🛠️ Stack Técnica

| Tecnologia | Uso |
|------------|-----|
| **React 19** | UI Components + Hooks |
| **Vite 7** | Build tool + HMR |
| **Tailwind CSS 4** | Estilização utility-first |
| **Framer Motion 12** | Animações e transições |
| **Lucide React** | Biblioteca de ícones |

## 🎨 Customização

### Editando o Storytelling

Para modificar a narrativa, edite `src/data/story.js`:

```javascript
export const storyTimeline = [
  {
    id: 1,
    sender: 'user',
    text: 'Sua nova mensagem aqui...',
    delay: 2000
  },
  {
    id: 2,
    sender: 'ai',
    text: 'Resposta da IA...',
    action: 'NOME_DA_ACTION', // Defina no Preview reducer
    delay: 3000
  }
]
```

### Adicionando Novas Actions

1. Adicione o case no reducer em `Preview.jsx`:

```javascript
case 'NOVA_ACTION':
  return { ...state, novoEstado: true }
```

2. Implemente a renderização condicional no JSX

### Editando o Conteúdo do Portfólio

Os componentes em `src/components/preview/` contêm o conteúdo real:

- `Hero.jsx` - Título, subtítulo e CTAs
- `About.jsx` - Bio, formação e conquistas
- `Experience.jsx` - Histórico profissional
- `TechStack.jsx` - Skills e tecnologias

## 📄 Licença

Este projeto é pessoal e não possui licença de uso aberto. Sinta-se à vontade para usar como inspiração, mas solicite permissão para uso comercial.

---

<div align="center">

**Desenvolvido com ☕ e 💜 por Matheus Henrique da Silva**

[LinkedIn](https://linkedin.com/in/matheushenrique2773) • [GitHub](https://github.com/seu-usuario)

</div>
