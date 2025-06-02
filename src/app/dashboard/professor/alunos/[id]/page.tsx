import { Card } from "@/components/ui/card";
import { Avatar } from '@/components/ui/Avatar';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AlunoDetalhes({ params }: { params: { id: string } }) {
  const router = useRouter();

  // Aqui você buscaria os dados do aluno usando o ID
  const aluno = {
    id: params.id,
    name: 'Pedro Oliveira',
    grade: '3º Ano EF',
    xp: 100,
    medals: 2,
    progress: {
      matematica: 85,
      portugues: 90,
    },
    topics: [
      {
        title: 'Números até 1000',
        status: 'COMPLETED',
        score: 0.9,
      },
      {
        title: 'Adição e Subtração',
        status: 'COMPLETED',
        score: 0.85,
      },
      {
        title: 'Multiplicação',
        status: 'IN_PROGRESS',
        score: 0.65,
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Avatar name={aluno.name} size={64} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{aluno.name}</h1>
            <p className="text-gray-500">{aluno.grade}</p>
          </div>
        </div>
        <Button variant="default" onClick={() => router.back()}>
          Voltar
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="XP Total" className="text-center">
          <p className="text-3xl font-bold text-blue-600">{aluno.xp}</p>
        </Card>
        <Card title="Medalhas" className="text-center">
          <p className="text-3xl font-bold text-yellow-600">{aluno.medals}</p>
        </Card>
        <Card title="Progresso Geral" className="text-center">
          <p className="text-3xl font-bold text-green-600">
            {Math.round((aluno.progress.matematica + aluno.progress.portugues) / 2)}%
          </p>
        </Card>
      </div>

      {/* Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Matemática" description="Progresso na trilha de matemática">
          <div className="space-y-4">
            {aluno.topics.map((topic) => (
              <div key={topic.title} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {topic.title}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      topic.score >= 0.8
                        ? 'text-green-600'
                        : topic.score >= 0.6
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {Math.round(topic.score * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      topic.score >= 0.8
                        ? 'bg-green-600'
                        : topic.score >= 0.6
                        ? 'bg-yellow-600'
                        : 'bg-red-600'
                    }`}
                    style={{ width: `${topic.score * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Português" description="Progresso na trilha de português">
          <div className="space-y-4">
            {[
              {
                title: 'Leitura e Compreensão',
                score: 0.95,
              },
              {
                title: 'Produção de Textos',
                score: 0.88,
              },
              {
                title: 'Gramática Básica',
                score: 0.75,
              },
            ].map((topic) => (
              <div key={topic.title} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {topic.title}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      topic.score >= 0.8
                        ? 'text-green-600'
                        : topic.score >= 0.6
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {Math.round(topic.score * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      topic.score >= 0.8
                        ? 'bg-green-600'
                        : topic.score >= 0.6
                        ? 'bg-yellow-600'
                        : 'bg-red-600'
                    }`}
                    style={{ width: `${topic.score * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Informações Pessoais</h3>
        {/* Conteúdo do card */}
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Desempenho Acadêmico</h3>
        {/* Conteúdo do card */}
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Atividades Recentes</h3>
        {/* Conteúdo do card */}
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-2">Trilhas de Aprendizagem</h3>
        <p className="text-gray-600 mb-4">Progresso nas trilhas de aprendizagem</p>
        {/* Conteúdo do card */}
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-2">Conquistas</h3>
        <p className="text-gray-600 mb-4">Conquistas e medalhas obtidas</p>
        {/* Conteúdo do card */}
      </Card>
    </div>
  );
} 