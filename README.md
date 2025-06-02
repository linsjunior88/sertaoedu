# SertãoEdu - Plataforma Educacional

Uma plataforma educacional inovadora que facilita o trabalho do professor e engaja os alunos através de trilhas de aprendizagem personalizadas e gamificação.

## 🚀 Funcionalidades

- Trilhas de aprendizagem baseadas na BNCC
- Interface gamificada para alunos
- Dashboard para professores
- Sistema de progresso e recompensas
- Atividades adaptativas
- Integração com IA para personalização

## 🛠️ Tecnologias

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Prisma (PostgreSQL)
- tRPC
- Clerk (Autenticação)
- Shadcn/ui

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL
- Conta no Clerk.dev

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/sertaoedu.git
cd sertaoedu
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Copie o arquivo `.env.example` para `.env`
- Preencha as variáveis com suas credenciais

4. Configure o banco de dados:
```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🔑 Configuração do Clerk

1. Crie uma conta em [clerk.dev](https://clerk.dev)
2. Crie um novo projeto
3. Copie as chaves de API para o arquivo `.env`

## 📦 Estrutura do Projeto

```
src/
├── app/                    # Páginas da aplicação
│   ├── (auth)/            # Rotas públicas
│   └── dashboard/         # Área protegida
├── components/            # Componentes reutilizáveis
├── lib/                   # Utilitários e configurações
└── server/               # Backend (tRPC)
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
