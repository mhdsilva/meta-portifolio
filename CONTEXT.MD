Contexto do Projeto: Estou construindo um portfólio "Meta-Developer". O site deve simular uma interface de desenvolvimento (IDE) dividida em duas colunas. A coluna da esquerda é um Chat de IA e a da direita é o Live Preview do site sendo construído.

Objetivo: O site deve seguir um "storytelling" pré-definido onde eu (o usuário) converso com a IA no chat, e as mudanças acontecem em tempo real no Preview. O roteiro inclui: iniciar um esqueleto rápido, mudar o estilo visual, simular um erro crítico de código, corrigir o erro e, finalmente, oferecer opções para o visitante escolher o tema.

Stack Técnica:

React + Vite (Frontend)

Tailwind CSS (Estilização dinâmica)

Framer Motion ou GSAP (Para animações de entrada e transições)

Lucide React (Ícones)

Instruções de Arquitetura:

Crie uma estrutura de Layout de duas colunas (Painel Lateral de Chat e Área de Visualização Principal).

Implemente um "Storytelling Engine": Use um array de objetos (timeline) que contenha mensagens (sender: 'user' ou 'ai') e ações (cmd: 'UPDATE_UI', 'SHOW_ERROR', etc.).

O chat deve ter um efeito de "typing" (digitação) para as mensagens da IA.

O Preview da direita deve reagir ao estado atual do engine. Por exemplo, se o comando for 'SHOW_SKELETON', ele renderiza blocos cinzas; se for 'ADD_NAVBAR', ele renderiza o componente de navegação.