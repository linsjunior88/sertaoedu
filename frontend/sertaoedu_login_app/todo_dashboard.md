# Todo - Painel de Professores

## Estrutura e Configuração Inicial
- [x] Confirmar requisitos com o utilizador.
- [x] Definir estrutura de pastas e integração (documento `painel_professor_estrutura.md` criado e aprovado).
- [x] Instalar `react-router-dom`.
- [x] Criar estrutura de pastas (`pages`, `routes`, `components/dashboard_professor/*`, etc.).
- [x] Mover tela de login para `src/pages/LoginPage.tsx`.
- [x] Criar `src/routes/AppRouter.tsx` com rotas básicas.
- [x] Criar `src/pages/ProfessorDashboardPage.tsx` (estrutura inicial).
- [x] Atualizar `src/App.tsx` para usar `AppRouter`.
- [x] Atualizar `src/main.tsx` para usar `BrowserRouter`.

## Criação de Componentes Base
- [x] Criar `Sidebar.tsx` (layout/dashboard_professor/layout).
- [x] Criar `Header.tsx` (layout/dashboard_professor/layout).
- [x] Criar `PerformanceChartCard.tsx` (layout/dashboard_professor/cards).
- [x] Criar `StudentListCard.tsx` (layout/dashboard_professor/cards) com dados fictícios iniciais.
- [x] Criar `NotificationsCard.tsx` (layout/dashboard_professor/cards) com dados fictícios iniciais.
- [x] Criar `ShortcutsCard.tsx` (layout/dashboard_professor/cards).
- [x] Criar `StatusIndicator.tsx` (layout/dashboard_professor/ui_elements).

## Implementação do Layout e Design Visual
- [x] Refinar `Sidebar.tsx` com ícones Lucide e estilos finais.
- [x] Refinar `Header.tsx` com estilos finais e interações (placeholder para perfil/sair).
- [x] Implementar layout responsivo e visual limpo na `ProfessorDashboardPage.tsx`.
    - [x] Garantir espaçamento generoso e divisórias claras.
    - [x] Aplicar cores suaves e destaque para ações principais.
    - [x] Assegurar hierarquia visual e princípios de neurociência.
- [x] Refinar estilos dos cards (`PerformanceChartCard`, `StudentListCard`, `NotificationsCard`, `ShortcutsCard`).

## Dados e Funcionalidades
- [x] Integrar dados fictícios nos gráficos de `PerformanceChartCard` (barras e pizza) usando Recharts.
- [x] Implementar lógica de status do aluno (verde/amarelo/vermelho) em `StudentListCard` conforme critérios BNCC.
- [x] Adicionar interatividade básica (ex: botões nos atalhos, links no menu).

## Validação e Testes
- [x] Validar funcionalidades e design em vários tamanhos de tela (desktop, tablet, mobile).
- [x] Testar a navegação entre login e dashboard.

## Sincronização e Entrega
- [ ] Sincronizar todos os ficheiros com o repositório GitHub do utilizador (após desenvolvimento).
- [ ] Reportar resultados e confirmar com o utilizador.
