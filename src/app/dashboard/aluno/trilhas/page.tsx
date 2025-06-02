import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TrilhasPage() {
  // Aqui você buscaria as trilhas do banco de dados
  const trilhas = [
    {
      id: 1,
      title: 'Trilha de Matemática - 3º Ano',
      subject: 'Matemática',
      grade: '3º Ano EF',
      progress: 65,
      topics: [
        {
          id: 1,
          title: 'Números até 1000',
          status: 'completed',
          score: 95,
          xp: 100,
        },
        {
          id: 2,
          title: 'Adição e Subtração',
          status: 'in_progress',
          score: 75,
          xp: 75,
        },
        {
          id: 3,
          title: 'Multiplicação',
          status: 'locked',
          score: 0,
          xp: 0,
        },
      ],
    },
    {
      id: 2,
      title: 'Trilha de Português - 3º Ano',
      subject: 'Português',
      grade: '3º Ano EF',
      progress: 80,
      topics: [
        {
          id: 1,
          title: 'Leitura e Compreensão',
          status: 'completed',
          score: 90,
          xp: 100,
        },
        {
          id: 2,
          title: 'Produção de Textos',
          status: 'in_progress',
          score: 85,
          xp: 85,
        },
        {
          id: 3,
          title: 'Gramática Básica',
          status: 'locked',
          score: 0,
          xp: 0,
        },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'locked':
        return 'bg-gray-100 text-gray-500 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'in_progress':
        return 'Em Progresso';
      case 'locked':
        return 'Bloqueado';
      default:
        return 'Não Iniciado';
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute -top-4 -right-4 w-16 h-16 text-yellow-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">Minhas Trilhas de Aprendizado</h1>
      </div>

      <div className="space-y-8">
        {trilhas.map((trilha) => (
          <Card key={trilha.id} className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 text-indigo-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </div>
                  <div>
                    <CardTitle className="text-indigo-700">{trilha.title}</CardTitle>
                    <p className="text-indigo-600">{trilha.grade}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-indigo-600 font-semibold">Progresso Total</p>
                  <p className="text-2xl font-bold text-indigo-700">{trilha.progress}%</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trilha.topics.map((topic) => (
                  <div
                    key={topic.id}
                    className={`p-4 rounded-lg border-2 ${getStatusColor(topic.status)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8">
                          {topic.status === 'completed' && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-green-500">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                          )}
                          {topic.status === 'in_progress' && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                              <path d="M12 6v6l4 2" />
                            </svg>
                          )}
                          {topic.status === 'locked' && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
                              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold">{topic.title}</h4>
                          <p className="text-sm">{getStatusText(topic.status)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {topic.status !== 'locked' && (
                          <>
                            <p className="text-sm font-medium">Pontuação</p>
                            <p className="text-lg font-bold">{topic.score}%</p>
                            <p className="text-sm text-indigo-600">+{topic.xp} XP</p>
                          </>
                        )}
                      </div>
                    </div>
                    {topic.status === 'in_progress' && (
                      <div className="mt-3">
                        <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
                          Continuar Aprendendo
                        </Button>
                      </div>
                    )}
                    {topic.status === 'completed' && (
                      <div className="mt-3">
                        <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                          Revisar Conteúdo
                        </Button>
                      </div>
                    )}
                    {topic.status === 'locked' && (
                      <div className="mt-3">
                        <Button className="w-full bg-gray-300 text-gray-500 cursor-not-allowed" disabled>
                          Conteúdo Bloqueado
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 