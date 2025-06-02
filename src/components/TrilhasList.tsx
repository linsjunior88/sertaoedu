"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Edit, Trash2, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

interface Topico {
  id: string;
  titulo: string;
  descricao: string;
  status: string;
  codigoBNCC?: string;
  descricaoBNCC?: string;
}

interface Trilha {
  id: string;
  titulo: string;
  descricao: string;
  serie: string;
  disciplina: string;
  bimestre: number;
  topicos: Topico[];
  createdAt: string;
}

const series = [
  { value: "", label: "Todas as séries" },
  { value: "1º Ano EF", label: "1º Ano - Ensino Fundamental" },
  { value: "2º Ano EF", label: "2º Ano - Ensino Fundamental" },
  { value: "3º Ano EF", label: "3º Ano - Ensino Fundamental" },
  { value: "4º Ano EF", label: "4º Ano - Ensino Fundamental" },
  { value: "5º Ano EF", label: "5º Ano - Ensino Fundamental" },
  { value: "6º Ano EF", label: "6º Ano - Ensino Fundamental" },
  { value: "7º Ano EF", label: "7º Ano - Ensino Fundamental" },
  { value: "8º Ano EF", label: "8º Ano - Ensino Fundamental" },
  { value: "9º Ano EF", label: "9º Ano - Ensino Fundamental" },
  { value: "1º Ano EM", label: "1º Ano - Ensino Médio" },
  { value: "2º Ano EM", label: "2º Ano - Ensino Médio" },
  { value: "3º Ano EM", label: "3º Ano - Ensino Médio" },
];

const disciplinas = [
  { value: "", label: "Todas as disciplinas" },
  { value: "portugues", label: "Língua Portuguesa" },
  { value: "ingles", label: "Língua Inglesa" },
  { value: "matematica", label: "Matemática" },
  { value: "ciencias", label: "Ciências" },
  { value: "arte", label: "Arte" },
  { value: "geografia", label: "Geografia" },
  { value: "historia", label: "História" },
  { value: "ensino_religioso", label: "Ensino Religioso" },
  { value: "computacao", label: "Computação" },
  { value: "educacao_fisica", label: "Educação Física" },
];

export function TrilhasList() {
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);
  const [filtroSerie, setFiltroSerie] = useState("");
  const [filtroDisciplina, setFiltroDisciplina] = useState("");
  const [trilhaSelecionada, setTrilhaSelecionada] = useState<Trilha | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    carregarTrilhas();
  }, [filtroSerie, filtroDisciplina]);

  const carregarTrilhas = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filtroSerie) params.append('serie', filtroSerie);
      if (filtroDisciplina) params.append('disciplina', filtroDisciplina);

      const response = await fetch(`/api/trilhas?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Erro ao carregar trilhas');
      }
      const data = await response.json();
      setTrilhas(data);
    } catch (error) {
      console.error('Erro ao carregar trilhas:', error);
      toast.error('Erro ao carregar trilhas');
    } finally {
      setIsLoading(false);
    }
  };

  const excluirTrilha = async (trilhaId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta trilha?')) {
      return;
    }

    try {
      const response = await fetch(`/api/trilhas/${trilhaId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir trilha');
      }

      toast.success('Trilha excluída com sucesso!');
      carregarTrilhas();
    } catch (error) {
      console.error('Erro ao excluir trilha:', error);
      toast.error('Erro ao excluir trilha');
    }
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDisciplinaLabel = (value: string) => {
    const disciplina = disciplinas.find(d => d.value === value);
    return disciplina ? disciplina.label : value;
  };

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Trilhas BNCC Criadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Filtrar por Série</label>
              <Select value={filtroSerie} onValueChange={setFiltroSerie}>
                <SelectTrigger className="bg-white text-gray-900">
                  <SelectValue placeholder="Selecione a série" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {series.map((s) => (
                    <SelectItem key={s.value} value={s.value} className="text-gray-900">
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Filtrar por Disciplina</label>
              <Select value={filtroDisciplina} onValueChange={setFiltroDisciplina}>
                <SelectTrigger className="bg-white text-gray-900">
                  <SelectValue placeholder="Selecione a disciplina" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {disciplinas.map((d) => (
                    <SelectItem key={d.value} value={d.value} className="text-gray-900">
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Trilhas */}
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-lg text-gray-900">Carregando trilhas...</div>
        </div>
      ) : trilhas.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma trilha encontrada
            </h3>
            <p className="text-gray-600">
              Crie sua primeira trilha BNCC ou ajuste os filtros para encontrar trilhas existentes.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trilhas.map((trilha) => (
            <Card key={trilha.id} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">{trilha.titulo}</CardTitle>
                <p className="text-sm text-gray-600">{trilha.descricao}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Série:</span>
                    <span className="font-medium text-gray-900">{trilha.serie}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Disciplina:</span>
                    <span className="font-medium text-gray-900">{getDisciplinaLabel(trilha.disciplina)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Habilidades:</span>
                    <span className="font-medium text-gray-900">{trilha.topicos.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Criada em:</span>
                    <span className="font-medium text-gray-900">{formatarData(trilha.createdAt)}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTrilhaSelecionada(trilha)}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => excluirTrilha(trilha.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de Detalhes da Trilha */}
      {trilhaSelecionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl text-gray-900">{trilhaSelecionada.titulo}</CardTitle>
                  <p className="text-gray-600 mt-1">{trilhaSelecionada.descricao}</p>
                  <div className="flex space-x-4 mt-2 text-sm text-gray-600">
                    <span>Série: {trilhaSelecionada.serie}</span>
                    <span>Disciplina: {getDisciplinaLabel(trilhaSelecionada.disciplina)}</span>
                    <span>Habilidades: {trilhaSelecionada.topicos.length}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setTrilhaSelecionada(null)}
                >
                  Fechar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Habilidades da Trilha:</h4>
                <div className="space-y-3">
                  {trilhaSelecionada.topicos.map((topico) => (
                    <Card key={topico.id} className="p-4 bg-gray-50">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <h5 className="font-medium text-gray-900">{topico.titulo}</h5>
                          {topico.codigoBNCC && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {topico.codigoBNCC}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-700">{topico.descricao}</p>
                        {topico.descricaoBNCC && (
                          <p className="text-xs text-gray-600 italic">{topico.descricaoBNCC}</p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 