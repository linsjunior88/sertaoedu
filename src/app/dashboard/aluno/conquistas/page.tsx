import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ConquistasPage() {
  // Aqui você buscaria as conquistas do banco de dados
  const conquistas = [
    {
      id: 1,
      title: 'Primeira Missão',
      description: 'Completou sua primeira atividade',
      icon: '🎯',
      status: 'UNLOCKED',
      date: '2024-03-20',
      xp: 50,
    },
    {
      id: 2,
      title: 'Estudante Dedicado',
      description: 'Manteve uma sequência de 5 dias de estudos',
      icon: '📚',
      status: 'UNLOCKED',
      date: '2024-03-22',
      xp: 100,
    },
    {
      id: 3,
      title: 'Mestre da Matemática',
      description: 'Acertou 90% das questões de matemática',
      icon: '🔢',
      status: 'UNLOCKED',
      date: '2024-03-23',
      xp: 150,
    },
    {
      id: 4,
      title: 'Leitor Avançado',
      description: 'Lê mais de 10 páginas por dia',
      icon: '📖',
      status: 'LOCKED',
      date: null,
      xp: 200,
    },
    {
      id: 5,
      title: 'Colecionador de XP',
      description: 'Acumulou 1000 pontos de experiência',
      icon: '⭐',
      status: 'LOCKED',
      date: null,
      xp: 300,
    },
    {
      id: 6,
      title: 'Aventureiro do Conhecimento',
      description: 'Explorou todas as trilhas disponíveis',
      icon: '🏆',
      status: 'LOCKED',
      date: null,
      xp: 500,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'UNLOCKED':
        return 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200';
      case 'LOCKED':
        return 'bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-200';
      default:
        return 'bg-white';
    }
  };

  const getIconAnimation = (status: string) => {
    switch (status) {
      case 'UNLOCKED':
        return 'animate-bounce';
      case 'LOCKED':
        return 'animate-pulse';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">Minhas Conquistas</h1>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 text-purple-500 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <CardTitle className="text-purple-700">Conquistas Desbloqueadas</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">3</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 text-yellow-500 animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <CardTitle className="text-yellow-700">XP Total das Conquistas</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">300</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 text-blue-500 animate-spin">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <CardTitle className="text-blue-700">Próxima Conquista</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold text-blue-600">Leitor Avançado</p>
            <p className="text-sm text-blue-500">200 XP</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Conquistas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {conquistas.map((conquista) => (
          <Card key={conquista.id} className={getStatusColor(conquista.status)}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`text-4xl ${getIconAnimation(conquista.status)}`}>
                    {conquista.icon}
                  </div>
                  <div>
                    <CardTitle className={conquista.status === 'UNLOCKED' ? 'text-yellow-700' : 'text-gray-500'}>
                      {conquista.title}
                    </CardTitle>
                    <p className={conquista.status === 'UNLOCKED' ? 'text-yellow-600' : 'text-gray-400'}>
                      {conquista.description}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  {conquista.status === 'UNLOCKED' ? (
                    <>
                      <p className="text-sm text-yellow-600">
                        Conquistada em: {new Date(conquista.date!).toLocaleDateString('pt-BR')}
                      </p>
                      <p className="text-lg font-bold text-yellow-600">+{conquista.xp} XP</p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">Bloqueada</p>
                  )}
                </div>
                {conquista.status === 'UNLOCKED' && (
                  <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                    Ver Detalhes
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 