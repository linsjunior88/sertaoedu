import React from 'react';
import { StatusIndicator } from '../ui_elements/StatusIndicator'; // Ajuste o caminho se necessário

// Interface para os dados do aluno
interface Student {
  id: number;
  name: string;
  // No futuro, este status seria derivado de uma percentagem de competências BNCC
  // Verde (>= 81%), Amarelo (50-80%), Vermelho (< 50%)
  status: 'green' | 'yellow' | 'red'; 
  lastActivity: string;
  bnccProgress?: number; // Opcional: para mostrar a percentagem real no futuro
}

export function StudentListCard() {
  // Dados fictícios para a lista de alunos, alinhados com a ideia de status BNCC
  const students: Student[] = [
    { id: 1, name: 'Ana Silva Pereira', status: 'green', bnccProgress: 85, lastActivity: 'Completou a Lição 5 de Matemática' },
    { id: 2, name: 'Bruno Costa Alves', status: 'yellow', bnccProgress: 72, lastActivity: 'Iniciou o Quiz 3 de Ciências' },
    { id: 3, name: 'Carlos Dias Rocha', status: 'red', bnccProgress: 45, lastActivity: 'Pendente: Atividade 2 de Português' },
    { id: 4, name: 'Daniela Rocha Lima', status: 'green', bnccProgress: 92, lastActivity: 'Completou a Lição 4 de História' },
    { id: 5, name: 'Eduardo Matos Santos', status: 'yellow', bnccProgress: 65, lastActivity: 'Enviou Tarefa 1 de Geografia (Atrasado)' },
    { id: 6, name: 'Fernanda Oliveira', status: 'green', bnccProgress: 95, lastActivity: 'Excelente desempenho no Projeto Interdisciplinar' },
    { id: 7, name: 'Gustavo Martins', status: 'red', bnccProgress: 30, lastActivity: 'Não iniciou a Atividade 4' },
  ];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Alunos e Progresso (BNCC)</h3>
      <div className="space-y-4 max-h-[30rem] overflow-y-auto pr-2">
        {students.map(student => (
          <div 
            key={student.id} 
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 border-l-4 
                       ${student.status === 'green' ? 'border-green-500' : student.status === 'yellow' ? 'border-yellow-500' : 'border-red-500'}"
          >
            <div className="flex items-center">
              <StatusIndicator status={student.status} size="medium" />
              <div className="ml-4">
                <span className="text-gray-800 font-medium block text-base">{student.name}</span>
                {student.bnccProgress !== undefined && (
                  <span className="text-xs text-gray-500">
                    BNCC: {student.bnccProgress}%
                  </span>
                )}
              </div>
            </div>
            <span className="text-sm text-gray-600 text-right truncate w-1/3" title={student.lastActivity}>{student.lastActivity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

