const storyTimeline = [
  // --- ATO 1: O INÍCIO RÁPIDO ---
  {
    id: 1,
    sender: 'user',
    text: 'IA, preciso de um portfólio agora. Gera um esqueleto básico pra mim, por favor.',
    delay: 500
  },
  {
    id: 2,
    sender: 'ai',
    text: 'Entendido! Iniciando scaffolding... Criando Grid e Placeholders.',
    action: 'SET_VIEW',
    payload: 'SKELETON', // Mostra blocos cinzas/esqueleto
    delay: 1500
  },

  // --- ATO 2: REFINAMENTO VISUAL ---
  {
    id: 3,
    sender: 'user',
    text: 'Legal, mas tá muito sem graça. Muda esse cabeçalho pra algo moderno e bota um modo escuro.',
    delay: 2000
  },
  {
    id: 4,
    sender: 'ai',
    text: 'Boa escolha. Aplicando Dark Mode e Glassmorphism no Navbar...',
    action: 'UPDATE_STYLE',
    payload: { theme: 'dark', navbar: 'glass' },
    delay: 1800
  },

  // --- ATO 3: O ERRO PLANEJADO ---
  {
    id: 5,
    sender: 'user',
    text: 'Agora bota um efeito de partículas bem pesado no fundo pra impressionar.',
    delay: 2500
  },
  {
    id: 6,
    sender: 'ai',
    text: 'Claro, injetando animação de alta performance...',
    action: 'TRIGGER_CRASH', // Aqui a tela da direita deve ficar preta ou dar erro
    delay: 1000
  },
  {
    id: 7,
    sender: 'user',
    text: 'Eita! Quebrou tudo. Dá um "Rollback" e corrige a importação da biblioteca, você esqueceu o escopo!',
    delay: 3000
  },
  {
    id: 8,
    sender: 'ai',
    text: 'Putz, erro de iniciante. Corrigindo dependências e limpando o cache...',
    action: 'FIX_CRASH', // O site volta ao normal, mas com as partículas funcionando suave
    delay: 2000
  },

  // --- ATO 4: CONTEÚDO ---
  {
    id: 9,
    sender: 'user',
    text: 'Agora sim. Pode "puxar" meus projetos principais da horta de código.',
    delay: 2000
  },
  {
    id: 10,
    sender: 'ai',
    text: 'Colhendo projetos do GitHub... Renderizando cards interativos.',
    action: 'SHOW_PROJECTS',
    payload: ['projeto-1', 'projeto-2', 'projeto-3'],
    delay: 2500
  },

  // --- ATO 5: INTERAÇÃO DO VISITANTE ---
  {
    id: 11,
    sender: 'user',
    text: 'IA, cansei de escolher. Deixa quem está assistindo decidir o toque final.',
    delay: 2000
  },
  {
    id: 12,
    sender: 'ai',
    text: 'Olá, visitante! Qual sotaque visual você prefere para este portfólio?',
    action: 'SHOW_INTERACTION',
    payload: {
      options: [
        { label: 'Minimalista (Clean)', value: 'MINIMAL' },
        { label: 'Cyberpunk (Neon)', value: 'CYBER' },
        { label: 'Vibe Roça (Rústico)', value: 'RUSTIC' }
      ]
    },
    delay: 1500
  },

  // --- ATO 6: ENCERRAMENTO ---
  {
    id: 13,
    sender: 'ai',
    text: 'Escolha aplicada! O portfólio está pronto para navegação. Gostou da build?',
    action: 'FINAL_VIEW',
    delay: 2000
  }
];

export default storyTimeline
