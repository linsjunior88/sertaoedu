import React, { useState } from 'react';
import { Home, CheckCircle, ListChecks, Rocket, BookOpen, UserCircle, LogOut, Menu, X } from 'lucide-react';

interface AlunoMenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
}

const alunoMenuItems: AlunoMenuItem[] = [
  { id: 'progresso', label: 'Meu Progresso', icon: Rocket, path: '/aluno/progresso' },
  { id: 'atividades', label: 'Atividades', icon: ListChecks, path: '/aluno/atividades' },
  { id: 'projetos', label: 'Projetos', icon: CheckCircle, path: '/aluno/projetos' },
  { id: 'biblioteca', label: 'Biblioteca', icon: BookOpen, path: '/aluno/biblioteca' },
];

export function AlunoSidebar() {
  const [activeItem, setActiveItem] = React.useState<string>('progresso');
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botão de menu móvel - visível apenas em telas pequenas */}
      <button 
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-teal-400 hover:bg-teal-500 text-white p-2 rounded-full shadow-lg transition-all duration-200"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay para fechar o menu em dispositivos móveis quando clicado fora */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar - não fixa em dispositivos móveis */}
      <aside 
        className={`
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0
          bg-gradient-to-br from-teal-400 to-cyan-500 text-white p-4 
          fixed md:sticky top-0 left-0 h-screen z-40
          w-64 md:w-60
          transition-transform duration-300 ease-in-out
          flex flex-col
          shadow-xl
        `}
      >
        <div className="text-2xl font-bold mb-10 text-center py-3 border-b border-teal-300">
          <span className="text-yellow-100">Sertão</span>
          <span className="text-white">Edu</span>
        </div>
        <nav className="flex-grow">
          <ul>
            {alunoMenuItems.map((item) => (
              <li key={item.id} className="mb-3">
                <a
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveItem(item.id);
                    if (window.innerWidth < 768) {
                      setIsOpen(false);
                    }
                  }}
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 ease-in-out 
                              ${activeItem === item.id 
                                ? 'bg-white/20 text-white shadow-md scale-105' 
                                : 'hover:bg-white/10 hover:text-gray-100'}`}
                >
                  <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-3 border-t border-teal-300">
          <a href="/login" /* Lógica de logout */ className="flex items-center p-3 text-teal-100 hover:bg-white/10 hover:text-white rounded-lg transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">Sair</span>
          </a>
        </div>
      </aside>
    </>
  );
}
