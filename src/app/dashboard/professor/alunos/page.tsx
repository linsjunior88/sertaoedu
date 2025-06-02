import { Card } from "@/components/ui/card";
import { Avatar } from '@/components/ui/Avatar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AlunosPage() {
  const router = useRouter();

  // Aqui você buscaria a lista de alunos do banco de dados
  const alunos = [
    {
      id: '1',
      name: 'Pedro Oliveira',
      grade: '3º Ano EF',
      progress: 85,
      xp: 100,
      medals: 2,
    },
    {
      id: '2',
      name: 'Ana Costa',
      grade: '3º Ano EF',
      progress: 95,
      xp: 150,
      medals: 3,
    },
    {
      id: '3',
      name: 'João Silva',
      grade: '3º Ano EF',
      progress: 70,
      xp: 80,
      medals: 1,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Alunos</h1>
        <div className="flex space-x-4">
          <Input
            type="search"
            placeholder="Buscar alunos..."
            className="w-64"
          />
          <Button variant="primary">Adicionar Aluno</Button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Aluno
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Série
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Progresso
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  XP
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Medalhas
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {alunos.map((aluno) => (
                <tr key={aluno.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Avatar name={aluno.name} size={40} />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {aluno.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{aluno.grade}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${aluno.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">
                        {aluno.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{aluno.xp}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{aluno.medals}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="default" onClick={() => router.push(`/dashboard/professor/alunos/${aluno.id}`)}>
                      Ver Detalhes
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
} 