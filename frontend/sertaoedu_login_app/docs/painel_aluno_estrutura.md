## Estrutura de Pastas e Componentes para o Painel do Aluno

Para integrar o novo Painel do Aluno ao projeto React existente (`sertaoedu_login_app`), mantendo a organização e incorporando os elementos de gamificação e design lúdico solicitados, proponho a seguinte adição à estrutura de pastas dentro de `src/`.

### 1. Estrutura de Pastas Proposta para o Painel do Aluno (adições a `src/`)

Continuaremos a usar `react-router-dom` para a navegação.

```
sertaoedu_login_app/
├── src/
│   ├── components/
│   │   ├── auth/                   # (Existente)
│   │   ├── dashboard_professor/    # (Existente)
│   │   ├── dashboard_aluno/        # NOVO: Componentes específicos do Painel do Aluno
│   │   │   ├── layout/
│   │   │   │   ├── AlunoSidebar.tsx      # Menu Lateral Fixo para Aluno
│   │   │   │   └── AlunoHeader.tsx       # Cabeçalho para Aluno (pode ser similar ao do professor ou mais simples)
│   │   │   ├── cards/
│   │   │   │   ├── ProgressoCard.tsx     # Card com barra de progresso, estrelas, foguetes, etc.
│   │   │   │   ├── AtividadesCard.tsx    # Card com lista de atividades pendentes (status, prazos)
│   │   │   │   ├── ProjetosCard.tsx      # Card com projetos práticos em andamento
│   │   │   │   └── SugestoesCard.tsx     # Card com sugestões de conteúdos (lista/cards com imagens)
│   │   │   ├── gamification/
│   │   │   │   ├── AvatarDisplay.tsx   # Componente para exibir o avatar do aluno (que evolui)
│   │   │   │   ├── LevelIndicator.tsx  # Indicador de nível, estrelas, etc.
│   │   │   │   └── ProgressBar.tsx     # Componente de barra de progresso customizável
│   │   │   └── ui_elements/        # Pequenos elementos reutilizáveis do dashboard do aluno
│   │   │       └── ActivityStatusTag.tsx # (Exemplo para status de atividade)
│   │   └── shared/                 # (Existente)
│   ├── pages/
│   │   ├── LoginPage.tsx           # (Existente)
│   │   ├── ProfessorDashboardPage.tsx # (Existente)
│   │   └── AlunoDashboardPage.tsx    # NOVA página para o painel do aluno
│   ├── routes/                     # (Existente)
│   │   └── AppRouter.tsx           # Será atualizado para incluir a rota do painel do aluno
│   ├── assets/
│   │   └── images/                 # NOVO: Para imagens de gamificação, avatares base, etc.
│   │       └── avatars/
│   │       └── badges/
│   ├── hooks/                      # (Existente)
│   ├── lib/                        # (Existente)
│   └── ... (restantes ficheiros existentes)
```

### 2. Novos Componentes Chave para o Painel do Aluno:

*   **`AlunoSidebar.tsx`**: Menu lateral com "Meu Progresso", "Atividades", "Projetos", "Biblioteca".
*   **`AlunoHeader.tsx`**: Cabeçalho similar ao do professor, mas adaptado para o aluno (nome, avatar, talvez pontos/nível, botão de sair).
*   **`ProgressoCard.tsx`**: Exibirá a barra de progresso de aprendizagem, possivelmente com elementos visuais de gamificação (estrelas, foguetes, medalhas).
*   **`AtividadesCard.tsx`**: Lista de atividades pendentes com status (Pendente, Em Atraso após 1 dia do prazo, Concluída) e prazos. Feedback visual para tarefas concluídas.
*   **`ProjetosCard.tsx`**: Cards para projetos práticos em andamento (nome, data de entrega, resumo).
*   **`SugestoesCard.tsx`**: Sugestões de conteúdos (lista simples ou cards com imagens e descrições).
*   **`AvatarDisplay.tsx`**: Componente para mostrar o avatar do aluno, que poderá mudar conforme o progresso.
*   **`LevelIndicator.tsx`**: Para mostrar o nível do aluno, estrelas, ou outros indicadores de reputação/progresso.
*   **`ProgressBar.tsx`**: Um componente de barra de progresso reutilizável e estilizado.
*   **`AlunoDashboardPage.tsx`**: A página principal que organizará todos estes componentes do painel do aluno.

### 3. Modificações no Roteamento (`AppRouter.tsx`):

A rota `/aluno/dashboard` (ou similar) será adicionada e protegida, assim como a do professor. A lógica de login no `LoginPage.tsx` precisará ser ajustada para redirecionar para o dashboard correto com base no perfil e credenciais.

### 4. Foco no Design Lúdico e Neurociência:

Todos os componentes serão desenvolvidos com:
*   **Cores suaves e vibrantes** de forma equilibrada para evitar poluição visual, mas manter o aspeto lúdico.
*   **Ícones ilustrativos e feedback visual claro** (animações subtis, mudanças de cor/estado) para tarefas concluídas ou interações.
*   **Espaçamento amplo** e layout limpo.
*   **Elementos de gamificação** integrados de forma intuitiva para motivar e prender a atenção.

### Próximos Passos Imediatos (após aprovação desta estrutura):

1.  Criar a nova estrutura de pastas e os ficheiros placeholder para os componentes do painel do aluno.
2.  Atualizar `AppRouter.tsx` para incluir a rota do painel do aluno.
3.  Começar a desenvolver o layout base da `AlunoDashboardPage.tsx` e os componentes `AlunoSidebar.tsx` e `AlunoHeader.tsx`.

Esta estrutura visa criar uma base sólida para o painel do aluno, permitindo o desenvolvimento iterativo dos elementos de gamificação e conteúdo. O que acha desta proposta de organização para o painel do aluno?

