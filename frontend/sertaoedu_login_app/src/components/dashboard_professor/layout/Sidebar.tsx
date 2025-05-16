import React from 'react';
import { Home, BookOpen, BarChart2, MessageSquare, Settings, LogOut, Users, ClipboardList, Library, Send, PieChart } from 'lucide-react';

// Interface para os itens do menu
interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string; // Adicionar path para navegação futura
  // subItems?: MenuItem[]; // Para submenus, se necessário no futuro
}

const menuItems: MenuItem[] = [
  { id: 'turmas', label: 'Turmas', icon: Users, path: '/professor/turmas' },
  { id: 'planejamento', label: 'Planejamento', icon: ClipboardList, path: '/professor/planejamento' },
  { id: 'biblioteca', label: 'Biblioteca', icon: Library, path: '/professor/biblioteca' },
  { id: 'comunicacao', label: 'Comunicação', icon: Send, path: '/professor/comunicacao' },
  { id: 'relatorios', label: 'Relatórios', icon: PieChart, path: '/professor/relatorios' },
];

export function Sidebar() {
  // Estado para o item ativo (pode ser gerenciado por rota no futuro)
  const [activeItem, setActiveItem] = React.useState<string>('turmas');

  return (
    <aside className="w-64 bg-gray-800 text-gray-100 p-4 h-screen fixed top-0 left-0 shadow-2xl flex flex-col">
      <div className="text-3xl font-bold mb-10 text-center text-white py-4 border-b border-gray-700">
        SertãoEdu
      </div>
      <nav className="flex-grow">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-3">
              <a 
                href={item.path} 
                onClick={() => setActiveItem(item.id)} // Simplesmente define o item ativo; a navegação real virá do router
                className={`flex items-center p-3 rounded-lg transition-all duration-200 ease-in-out 
                            ${activeItem === item.id 
                              ? 'bg-light-blue text-white shadow-md scale-105' 
                              : 'hover:bg-gray-700 hover:text-white'}`}
              >
                <item.icon className="w-6 h-6 mr-4 flex-shrink-0" />
                <span className="text-base font-medium">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-700">
        <ul>
          <li className="mb-3">
            <a href="#" className="flex items-center p-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
              <Settings className="w-6 h-6 mr-4" />
              <span className="text-base font-medium">Configurações</span>
            </a>
          </li>
          <li>
            <a href="/login" /* Idealmente, isso chamaria uma função de logout */ className="flex items-center p-3 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors">
              <LogOut className="w-6 h-6 mr-4" />
              <span className="text-base font-medium">Sair</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

