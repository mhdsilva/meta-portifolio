export const storyTimeline = [
  // --- ATO 1: ESTRUTURA (HTML PURO) ---
  {
    id: 1,
    sender: 'user',
    text: 'IA, vamos começar do zero. Gera um esqueleto HTML básico para o meu portfólio.',
    delay: 800
  },
  {
    id: 2,
    sender: 'ai',
    text: 'Com certeza. Criando estrutura semântica: header, main e footer...',
    action: 'SHOW_HTML', // O Preview deve mostrar um site "feio" (fundo branco, Times New Roman)
    delay: 3500
  },

  // --- ATO 2: ESTILIZAÇÃO (CSS) ---
  {
    id: 3,
    sender: 'user',
    text: 'Beleza, agora dá uma cara de site de desenvolvedor. Bota um tema Dark e uma tipografia moderna.',
    delay: 2500
  },
  {
    id: 4,
    sender: 'ai',
    text: 'Aplicando Reset CSS e definindo variáveis de cores. Ativando Dark Mode...',
    action: 'APPLY_STYLES', // O Preview ganha cores, fontes e layout (Flexbox/Grid)
    delay: 4000
  },

  // --- ATO 3: IDENTIDADE (SOBRE MIM) ---
  {
    id: 5,
    sender: 'user',
    text: 'Gostei. Agora escreve uma seção "Sobre Mim" que conte que eu vim da roça mas domino o código.',
    delay: 3000
  },
  {
    id: 6,
    sender: 'ai',
    text: 'Digitando bio... "Cultivando soluções digitais com a resiliência de quem entende o valor do plantio."',
    action: 'ADD_ABOUT', // Surge a seção de texto com uma animação de fade-in
    delay: 4500
  },

  // --- ATO 4: CARREIRA E SKILLS ---
  {
    id: 7,
    sender: 'user',
    text: 'Ficou massa. Adiciona agora minha trajetória profissional e as tecnologias que eu uso.',
    delay: 3000
  },
  {
    id: 8,
    sender: 'ai',
    text: 'Mapeando linha do tempo e organizando o stack tecnológico no Celeiro de Habilidades.',
    action: 'ADD_EXPERIENCE_SKILLS', // Aparecem os cards de exp e as tags de skills
    delay: 5000
  },

  // --- ATO 5: O ERRO (PARTÍCULAS) ---
  {
    id: 9,
    sender: 'user',
    text: 'O site tá sólido. Mas quero algo "uau". Bota um efeito de partículas pesadão no fundo.',
    delay: 3000
  },
  {
    id: 10,
    sender: 'ai',
    text: 'Injetando Three.js para renderização de partículas em tempo real...',
    action: 'TRIGGER_CRASH', // A tela "quebra" ou dá glitch
    delay: 3500
  },
  {
    id: 11,
    sender: 'user',
    text: 'Nossa, pesado até demais! Quebrou tudo. Corrige esse script e otimiza a performance!',
    delay: 3000
  },
  {
    id: 12,
    sender: 'ai',
    text: 'Ops! Vazamento de memória detectado. Refatorando para usar instanciamento e reduzir draw calls...',
    action: 'FIX_CRASH', // O site volta limpo com partículas leves e fluidas
    delay: 4000
  },

  // --- ATO 6: PORTFÓLIO (PROJETOS) ---
  {
    id: 13,
    sender: 'user',
    text: 'Agora sim tá profissional. Mostra meus projetos principais agora.',
    delay: 2500
  },
  {
    id: 14,
    sender: 'ai',
    text: 'Puxando repositórios... Renderizando vitrine de projetos.',
    action: 'SHOW_PROJECTS', // Cards de projetos aparecem
    delay: 4000
  },

  // --- ATO 7: INTERAÇÃO ---
  {
    id: 15,
    sender: 'user',
    text: 'Para fechar, deixa o visitante escolher o toque final do estilo.',
    delay: 3000
  },
  {
    id: 16,
    sender: 'ai',
    text: 'Olá, visitante! Qual "vibe" você quer aplicar agora para finalizar a build?',
    action: 'SHOW_INTERACTION',
    payload: {
      options: [
        { label: 'Minimalista (Clean)', value: 'MINIMAL' },
        { label: 'Cyberpunk (Neon)', value: 'CYBER' },
        { label: 'Vibe Roça (Rústico)', value: 'RUSTIC' }
      ]
    },
    delay: 0 // Pausa para escolha
  },

  // --- ATO 8: FINALIZAÇÃO ---
  {
    id: 17,
    sender: 'ai',
    text: 'Build finalizada com sucesso! O portfólio está 100% operacional. O que achou?',
    action: 'FINAL_VIEW',
    delay: 3000
  }
];

export default storyTimeline
