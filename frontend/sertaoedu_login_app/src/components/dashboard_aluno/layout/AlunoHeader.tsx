import React from 'react';
import { UserCircle, LogOut, Bell, Search, Menu, Star } from 'lucide-react';

export function AlunoHeader() {
  // Placeholder para o nome do aluno - viria do estado/contexto de autenticação
  const alunoName = "Aluno Exemplo";
  const alunoLevel = 5; // Exemplo de nível de gamificação

  return (
    <header className="p-3 bg-white border-b border-gray-200 flex justify-between items-center fixed top-0 left-0 right-0 z-30 h-14 shadow-sm">
      {/* Espaço reservado para o botão de menu (já implementado no Sidebar) */}
      <div className="w-8 md:hidden"></div>

      {/* Título da página - visível apenas em desktop */}
      <div className="hidden md:block text-lg font-semibold text-teal-600">
        Painel do Aluno
      </div>

      {/* Placeholder em dispositivos móveis */}
      <div className="md:hidden text-lg font-semibold text-teal-600">
        <span className="text-teal-500">Sertão</span>
        <span className="text-cyan-600">Edu</span>
      </div>

      {/* Ações do Utilizador e Gamificação */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="flex items-center space-x-1 text-yellow-400" title={`Nível ${alunoLevel}`}>
          <Star className="w-5 h-5 fill-current" />
          <span className="text-sm font-bold">{alunoLevel}</span>
        </div>

        <button className="relative p-2 text-teal-500 hover:text-teal-600 rounded-full hover:bg-teal-50 transition-colors" title="Notificações">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 block h-1.5 w-1.5 rounded-full bg-red-500 ring-1 ring-white"></span>
        </button>
        
        <div className="flex items-center space-x-2">
          {/* Placeholder para AvatarDisplay, se for usado aqui */}
          <UserCircle className="w-7 h-7 text-teal-500" /> 
          <span className="hidden sm:inline text-xs text-gray-700 font-medium">{alunoName}</span>
        </div>

        <button 
          className="p-1.5 text-gray-600 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors" 
          title="Sair"
          onClick={() => { 
            console.log("Logout clicado"); 
            window.location.href = '/login';
          }}
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
