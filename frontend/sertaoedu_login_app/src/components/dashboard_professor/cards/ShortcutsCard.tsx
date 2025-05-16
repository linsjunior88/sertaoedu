import React from 'react';
import { PlusCircle, BookOpenText, MessageSquare } from 'lucide-react';

export function ShortcutsCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Atalhos Rápidos</h3>
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center p-3 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors text-base font-medium">
          <PlusCircle className="mr-2 w-5 h-5" /> Criar Nova Atividade
        </button>
        <button className="w-full flex items-center justify-center p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors text-base font-medium">
          <BookOpenText className="mr-2 w-5 h-5" /> Acessar Biblioteca
        </button>
        <button className="w-full flex items-center justify-center p-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition-colors text-base font-medium">
          <MessageSquare className="mr-2 w-5 h-5" /> Enviar Comunicado
        </button>
      </div>
    </div>
  );
}

