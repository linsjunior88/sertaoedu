import React from 'react';
import { UserCircle, LogOut, Bell, Search, Menu } from 'lucide-react';

export function Header() {
  // Placeholder para o nome do professor - viria do estado/contexto de autenticação
  const professorName = "Prof. Dr. Exemplo Silva";

  return (
    <header className="ml-0 md:ml-64 p-4 bg-white border-b border-gray-200 flex justify-between items-center fixed top-0 left-0 right-0 z-40 h-16">
      {/* Ícone do Menu para Mobile (opcional, se o sidebar for ocultável) */}
      <div className="md:hidden">
        <button className="p-2 text-gray-600 hover:text-blue-600">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Campo de Busca (Opcional, pode ser adicionado se necessário) */}
      <div className="hidden md:flex relative items-center">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="search" 
          placeholder="Buscar alunos, turmas, atividades..."
          className="pl-10 pr-4 py-2 w-full max-w-xs border border-gray-300 rounded-full text-sm focus:ring-light-blue focus:border-light-blue"
        />
      </div>

      {/* Ações do Utilizador */}
      <div className="flex items-center space-x-3 sm:space-x-5">
        <button className="relative p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors" title="Notificações">
          <Bell className="w-6 h-6" />
          {/* Badge de Notificação (Exemplo) */}
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>
        
        <div className="flex items-center space-x-2">
          <UserCircle className="w-8 h-8 text-gray-500" />
          <span className="hidden sm:inline text-sm text-gray-700 font-medium">{professorName}</span>
        </div>

        <button 
          className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors" 
          title="Sair"
          onClick={() => { 
            // Lógica de logout aqui (ex: limpar token, redirecionar)
            console.log("Logout clicado"); 
            window.location.href = '/login'; // Simples redirecionamento por agora
          }}
        >
          <LogOut className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}

