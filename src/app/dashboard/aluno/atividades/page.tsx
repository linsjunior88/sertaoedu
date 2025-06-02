import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AtividadesPage() {
  // Aqui você buscaria as atividades do banco de dados
  const atividades = [
    {
      id: 1,
      title: 'Exercícios de Multiplicação',
      subject: 'Matemática',
      topic: 'Multiplicação',
      status: 'pending',
      dueDate: '2024-03-25',
      xp: 50,
      difficulty: 'easy',
    },
    {
      id: 2,
      title: 'Leitura e Interpretação',
      subject: 'Português',
      topic: 'Leitura',
      status: 'pending',
      dueDate: '2024-03-28',
      xp: 75,
      difficulty: 'medium',
    },
    {
      id: 3,
      title: 'Problemas de Matemática',
      subject: 'Matemática',
      topic: 'Problemas',
      status: 'completed',
      dueDate: '2024-03-20',
      xp: 100,
      difficulty: 'hard',
      score: 85,
    },
    {
      id: 4,
      title: 'Produção de Texto',
      subject: 'Português',
      topic: 'Escrita',
      status: 'completed',
      dueDate: '2024-03-22',
      xp: 150,
      difficulty: 'medium',
      score: 90,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'Fácil';
      case 'medium':
        return 'Médio';
      case 'hard':
        return 'Difícil';
      default:
        return 'Não definido';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">Minhas Missões</h1>
        <div className="w-64">
          <Input
            type="search"
            placeholder="Buscar missões..."
            className="bg-white border-2 border-indigo-200 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Missões Pendentes */}
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 text-yellow-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            <CardTitle className="text-yellow-700">Missões Pendentes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {atividades
              .filter((atividade) => atividade.status === 'pending')
              .map((atividade) => (
                <div
                  key={atividade.id}
                  className={`p-4 rounded-lg border-2 ${getStatusColor(atividade.status)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 text-yellow-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold">{atividade.title}</h4>
                        <p className="text-sm">{atividade.subject} • {atividade.topic}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-0.5 text-xs rounded-full ${getDifficultyColor(atividade.difficulty)}`}>
                            {getDifficultyText(atividade.difficulty)}
                          </span>
                          <span className="text-sm text-yellow-600">
                            Entrega: {new Date(atividade.dueDate).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Recompensa</p>
                      <p className="text-lg font-bold text-yellow-600">+{atividade.xp} XP</p>
                      <Button className="mt-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                        Iniciar Missão
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Missões Concluídas */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </div>
            <CardTitle className="text-green-700">Missões Concluídas</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {atividades
              .filter((atividade) => atividade.status === 'completed')
              .map((atividade) => (
                <div
                  key={atividade.id}
                  className={`p-4 rounded-lg border-2 ${getStatusColor(atividade.status)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold">{atividade.title}</h4>
                        <p className="text-sm">{atividade.subject} • {atividade.topic}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-0.5 text-xs rounded-full ${getDifficultyColor(atividade.difficulty)}`}>
                            {getDifficultyText(atividade.difficulty)}
                          </span>
                          <span className="text-sm text-green-600">
                            Concluída em: {new Date(atividade.dueDate).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Pontuação</p>
                      <p className="text-lg font-bold text-green-600">{atividade.score}%</p>
                      <p className="text-sm text-green-600">+{atividade.xp} XP</p>
                      <Button className="mt-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                        Revisar Missão
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 