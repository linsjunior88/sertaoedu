## Estrutura de Pastas e Integração do Painel de Professores

Para integrar o novo Painel de Professores ao projeto React existente (`sertaoedu_login_app`), proponho a seguinte estrutura de pastas dentro de `src/` e algumas modificações para gerir a navegação entre a tela de login e o painel.

### 1. Instalação de Dependência para Roteamento

O projeto atual não parece ter uma biblioteca de roteamento. Para navegar entre a página de login e o painel do professor, precisaremos do `react-router-dom`. Vou adicioná-lo ao projeto.

### 2. Estrutura de Pastas Proposta dentro de `src/`

```
sertaoedu_login_app/
├── public/
├── src/
│   ├── assets/                     # Imagens, ícones estáticos (se não do Lucide)
│   ├── components/
│   │   ├── auth/                   # Componentes específicos da tela de login (opcional, se refatorar)
│   │   │   └── LoginForm.tsx       # (Exemplo)
│   │   ├── dashboard_professor/    # Componentes específicos do Painel do Professor
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar.tsx         # Menu Lateral Fixo
│   │   │   │   └── Header.tsx          # Cabeçalho com nome do professor e perfil
│   │   │   ├── cards/
│   │   │   │   ├── PerformanceChartCard.tsx  # Card com gráficos de desempenho
│   │   │   │   ├── StudentListCard.tsx     # Card com lista de alunos e status
│   │   │   │   ├── NotificationsCard.tsx   # Card com notificações recentes
│   │   │   │   └── ShortcutsCard.tsx       # Card com atalhos
│   │   │   └── ui_elements/        # Pequenos elementos reutilizáveis do dashboard
│   │   │       └── StatusIndicator.tsx # (Exemplo para status verde/vermelho)
│   │   └── shared/                 # Componentes reutilizáveis em toda a aplicação (ex: botões customizados, modais)
│   ├── pages/                      # Componentes de página de nível superior
│   │   ├── LoginPage.tsx           # A tela de login atual será movida/refatorada para cá
│   │   └── ProfessorDashboardPage.tsx # Nova página para o painel do professor
│   ├── routes/                     # Configuração e gestão de rotas
│   │   └── AppRouter.tsx           # Define as rotas da aplicação (ex: /login, /professor/dashboard)
│   ├── hooks/                      # Hooks customizados
│   ├── lib/                        # Funções utilitárias
│   ├── App.css
│   ├── App.tsx                     # Será modificado para usar o AppRouter
│   ├── index.css
│   ├── main.tsx                    # Ponto de entrada, envolverá o App com BrowserRouter do react-router-dom
│   └── vite-env.d.ts
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── tailwind.config.js
├── todo.md                       # O todo.md principal do projeto
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### 3. Modificações nos Ficheiros Existentes

*   **`src/main.tsx`**: Será modificado para importar `BrowserRouter` de `react-router-dom` e envolver o componente `<App />`.
*   **`src/App.tsx`**: O conteúdo atual da tela de login será movido para `src/pages/LoginPage.tsx`. O `App.tsx` passará a renderizar o `<AppRouter />`.
*   **`src/routes/AppRouter.tsx`** (novo): Este ficheiro conterá a lógica para definir as rotas, por exemplo, a rota `/login` que renderiza `<LoginPage />` e a rota `/professor/dashboard` (ou similar) que renderiza `<ProfessorDashboardPage />`. Poderemos adicionar rotas protegidas aqui no futuro.

### Próximos Passos Imediatos:

1.  Instalar `react-router-dom`.
2.  Criar a estrutura de pastas básica e os ficheiros placeholder (vazios ou com conteúdo mínimo) para `AppRouter.tsx`, `LoginPage.tsx` (movendo o conteúdo existente), e `ProfessorDashboardPage.tsx`.
3.  Modificar `main.tsx` e `App.tsx` para implementar o roteamento básico.

Esta estrutura visa manter o projeto organizado, modular e escalável à medida que adicionamos novas funcionalidades. O que acha desta proposta de organização?

Após a sua confirmação, posso prosseguir com a instalação da dependência e a criação desta estrutura inicial.
