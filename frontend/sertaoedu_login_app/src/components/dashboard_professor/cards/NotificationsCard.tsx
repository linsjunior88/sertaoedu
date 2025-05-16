import React from 'react';
import { Bell } from 'lucide-react';

export function NotificationsCard() {
  // Dados fictícios para notificações
  const notifications = [
    { id: 1, text: 'Nova tarefa enviada por Ana Silva.', time: '5 min atrás', type: 'new_submission' },
    { id: 2, text: 'Lembrete: Reunião de planejamento amanhã às 10h.', time: '1 hora atrás', type: 'reminder' },
    { id: 3, text: 'Bruno Costa precisa de ajuda com a Lição 3.', time: '3 horas atrás', type: 'help_request' },
    { id: 4, text: 'Atualização do sistema agendada para domingo.', time: 'Ontem', type: 'system_update' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Notificações Recentes</h3>
        <Bell className="w-5 h-5 text-gray-500" />
      </div>
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {notifications.map(notification => (
          <div key={notification.id} className="p-3 bg-blue-50 rounded-md border-l-4 border-light-blue">
            <p className="text-sm text-gray-800">{notification.text}</p>
            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

