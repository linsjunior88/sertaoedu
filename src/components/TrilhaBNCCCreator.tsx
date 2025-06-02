"use client";

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Trash2, GripVertical, Plus, Save, ChevronDown, ChevronRight, BookOpen } from 'lucide-react';

interface Habilidade {
  id: string;
  codigo: string;
  descricao: string;
}

interface ObjetoConhecimento {
  nome: string;
  disciplinaId: string;
  totalHabilidades: number;
  habilidades?: Habilidade[];
  expanded?: boolean;
  loading?: boolean;
}

interface UnidadeTematica {
  nome: string;
  objetos: ObjetoConhecimento[];
  expanded?: boolean;
}

interface EstruturaBNCC {
  serie: string;
  disciplina: string;
  unidades: UnidadeTematica[];
  totalUnidades: number;
  totalObjetos: number;
}

interface TrilhaPersonalizada {
  titulo: string;
  descricao: string;
  serie: string;
  disciplina: string;
  habilidadesSelecionadas: Habilidade[];
}

const series = [
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

export function TrilhaBNCCCreator() {
  const [serie, setSerie] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [estruturaBNCC, setEstruturaBNCC] = useState<EstruturaBNCC | null>(null);
  const [trilhaPersonalizada, setTrilhaPersonalizada] = useState<TrilhaPersonalizada>({
    titulo: "",
    descricao: "",
    serie: "",
    disciplina: "",
    habilidadesSelecionadas: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [habilidadesSelecionadasTemp, setHabilidadesSelecionadasTemp] = useState<Habilidade[]>([]);
  const [activeTab, setActiveTab] = useState<'criar' | 'minhas'>('criar');
  const [minhasTrilhas, setMinhasTrilhas] = useState<any[]>([]);
  const [filtroSerie, setFiltroSerie] = useState("todas");
  const [filtroDisciplina, setFiltroDisciplina] = useState("todas");

  useEffect(() => {
    if (serie && disciplina) {
      buscarEstrutura();
    }
  }, [serie, disciplina]);

  const buscarEstrutura = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/bncc/sugestoes?serie=${encodeURIComponent(serie)}&disciplina=${disciplina}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar estrutura');
      }
      const data = await response.json();
      setEstruturaBNCC(data);
    } catch (error) {
      console.error('Erro ao buscar estrutura:', error);
      toast.error('Erro ao buscar estrutura da BNCC');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleUnidade = (unidadeIndex: number) => {
    if (!estruturaBNCC) return;
    
    const novaEstrutura = { ...estruturaBNCC };
    novaEstrutura.unidades[unidadeIndex].expanded = !novaEstrutura.unidades[unidadeIndex].expanded;
    setEstruturaBNCC(novaEstrutura);
  };

  const toggleObjeto = async (unidadeIndex: number, objetoIndex: number) => {
    if (!estruturaBNCC) return;
    
    const novaEstrutura = { ...estruturaBNCC };
    const objeto = novaEstrutura.unidades[unidadeIndex].objetos[objetoIndex];
    
    objeto.expanded = !objeto.expanded;
    
    // Se está expandindo e ainda não carregou as habilidades
    if (objeto.expanded && !objeto.habilidades) {
      objeto.loading = true;
      setEstruturaBNCC({ ...novaEstrutura });
      
      try {
        const response = await fetch(
          `/api/bncc/habilidades?disciplinaId=${objeto.disciplinaId}&objetoConhecimento=${encodeURIComponent(objeto.nome)}`
        );
        if (!response.ok) {
          throw new Error('Erro ao buscar habilidades');
        }
        const habilidades = await response.json();
        
        objeto.habilidades = habilidades;
        objeto.loading = false;
        setEstruturaBNCC({ ...novaEstrutura });
      } catch (error) {
        console.error('Erro ao buscar habilidades:', error);
        toast.error('Erro ao buscar habilidades');
        objeto.loading = false;
        objeto.expanded = false;
        setEstruturaBNCC({ ...novaEstrutura });
      }
    } else {
      setEstruturaBNCC({ ...novaEstrutura });
    }
  };

  const adicionarHabilidade = (habilidade: Habilidade) => {
    const jaExiste = habilidadesSelecionadasTemp.some(h => h.id === habilidade.id);
    if (jaExiste) {
      // Se já existe, remove da seleção temporária
      setHabilidadesSelecionadasTemp(prev => prev.filter(h => h.id !== habilidade.id));
      toast.success('Habilidade removida da seleção');
    } else {
      // Se não existe, adiciona à seleção temporária
      setHabilidadesSelecionadasTemp(prev => [...prev, habilidade]);
      toast.success('Habilidade adicionada à seleção');
    }
  };

  const isHabilidadeSelecionada = (habilidadeId: string) => {
    return habilidadesSelecionadasTemp.some(h => h.id === habilidadeId);
  };

  const removerHabilidade = (habilidadeIndex: number) => {
    const novasHabilidades = trilhaPersonalizada.habilidadesSelecionadas.filter((_, index) => index !== habilidadeIndex);
    setTrilhaPersonalizada({
      ...trilhaPersonalizada,
      habilidadesSelecionadas: novasHabilidades
    });
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    const novasHabilidades = Array.from(trilhaPersonalizada.habilidadesSelecionadas);
    const [removed] = novasHabilidades.splice(source.index, 1);
    novasHabilidades.splice(destination.index, 0, removed);

    setTrilhaPersonalizada({
      ...trilhaPersonalizada,
      habilidadesSelecionadas: novasHabilidades
    });
  };

  const iniciarPersonalizacao = () => {
    setTrilhaPersonalizada({
      titulo: `Trilha ${disciplinas.find(d => d.value === disciplina)?.label} - ${serie}`,
      descricao: "Trilha personalizada baseada na BNCC",
      serie,
      disciplina,
      habilidadesSelecionadas: [...habilidadesSelecionadasTemp]
    });
    setShowCustomizer(true);
  };

  const salvarTrilha = async () => {
    if (!trilhaPersonalizada.titulo || !trilhaPersonalizada.descricao) {
      toast.error('Preencha o título e a descrição da trilha');
      return;
    }

    if (trilhaPersonalizada.habilidadesSelecionadas.length === 0) {
      toast.error('Adicione pelo menos uma habilidade à trilha');
      return;
    }

    try {
      const response = await fetch('/api/trilhas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: trilhaPersonalizada.titulo,
          descricao: trilhaPersonalizada.descricao,
          serie: trilhaPersonalizada.serie,
          disciplina: trilhaPersonalizada.disciplina,
          habilidades: trilhaPersonalizada.habilidadesSelecionadas
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar trilha');
      }

      toast.success('Trilha salva com sucesso!');
      setShowCustomizer(false);
      setHabilidadesSelecionadasTemp([]);
      setTrilhaPersonalizada({
        titulo: "",
        descricao: "",
        serie: "",
        disciplina: "",
        habilidadesSelecionadas: []
      });
    } catch (error) {
      console.error('Erro ao salvar trilha:', error);
      toast.error('Erro ao salvar trilha');
    }
  };

  const limparSelecoes = () => {
    setHabilidadesSelecionadasTemp([]);
    toast.success('Seleções limpas');
  };

  const buscarMinhasTrilhas = async () => {
    try {
      const params = new URLSearchParams();
      if (filtroSerie && filtroSerie !== "todas") params.append('serie', filtroSerie);
      if (filtroDisciplina && filtroDisciplina !== "todas") params.append('disciplina', filtroDisciplina);
      
      const response = await fetch(`/api/trilhas?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar trilhas');
      }
      const trilhas = await response.json();
      setMinhasTrilhas(trilhas);
    } catch (error) {
      console.error('Erro ao buscar trilhas:', error);
      toast.error('Erro ao buscar suas trilhas');
    }
  };

  const excluirTrilha = async (trilhaId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta trilha?')) return;
    
    try {
      const response = await fetch(`/api/trilhas/${trilhaId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Erro ao excluir trilha');
      }
      
      toast.success('Trilha excluída com sucesso!');
      buscarMinhasTrilhas();
    } catch (error) {
      console.error('Erro ao excluir trilha:', error);
      toast.error('Erro ao excluir trilha');
    }
  };

  useEffect(() => {
    if (activeTab === 'minhas') {
      buscarMinhasTrilhas();
    }
  }, [activeTab, filtroSerie, filtroDisciplina]);

  return (
    <div className="space-y-6">
      {/* Tabs de Navegação */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Trilhas BNCC
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant={activeTab === 'criar' ? 'default' : 'outline'}
                onClick={() => setActiveTab('criar')}
                className={activeTab === 'criar' ? 'bg-blue-600 hover:bg-blue-700' : ''}
              >
                Criar Nova Trilha
              </Button>
              <Button
                variant={activeTab === 'minhas' ? 'default' : 'outline'}
                onClick={() => setActiveTab('minhas')}
                className={activeTab === 'minhas' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                Minhas Trilhas Personalizadas
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Conteúdo da aba "Criar Nova Trilha" */}
      {activeTab === 'criar' && (
        <>
          {/* Seleção de Série e Disciplina */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Criar Nova Trilha BNCC
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-900">Série</Label>
                  <Select value={serie} onValueChange={setSerie}>
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
                  <Label className="text-gray-900">Disciplina</Label>
                  <Select value={disciplina} onValueChange={setDisciplina}>
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

          {/* Loading */}
          {isLoading && (
            <div className="flex items-center justify-center p-8">
              <div className="text-lg text-gray-900">Carregando estrutura BNCC...</div>
            </div>
          )}

          {/* Estrutura BNCC */}
          {estruturaBNCC && !showCustomizer && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Estrutura BNCC - {estruturaBNCC.totalUnidades} Unidades Temáticas
                </h3>
                <div className="flex items-center space-x-4">
                  {habilidadesSelecionadasTemp.length > 0 && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {habilidadesSelecionadasTemp.length} habilidade{habilidadesSelecionadasTemp.length !== 1 ? 's' : ''} selecionada{habilidadesSelecionadasTemp.length !== 1 ? 's' : ''}
                    </span>
                  )}
                  {habilidadesSelecionadasTemp.length > 0 && (
                    <Button 
                      variant="outline"
                      onClick={limparSelecoes}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Limpar Seleções
                    </Button>
                  )}
                  <Button 
                    onClick={iniciarPersonalizacao} 
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={habilidadesSelecionadasTemp.length === 0}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Trilha Personalizada
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {estruturaBNCC.unidades.map((unidade, unidadeIndex) => (
                  <Card key={unidadeIndex} className="border-2 border-gray-200">
                    <div 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleUnidade(unidadeIndex)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg text-gray-900 flex items-center">
                            {unidade.expanded ? <ChevronDown className="w-5 h-5 mr-2" /> : <ChevronRight className="w-5 h-5 mr-2" />}
                            {unidade.nome}
                          </CardTitle>
                          <span className="text-sm text-gray-600">
                            {unidade.objetos.length} objetos de conhecimento
                          </span>
                        </div>
                      </CardHeader>
                    </div>
                    
                    {unidade.expanded && (
                      <CardContent className="space-y-3">
                        {unidade.objetos.map((objeto, objetoIndex) => (
                          <Card key={objetoIndex} className="bg-gray-50">
                            <div 
                              className="cursor-pointer hover:bg-gray-100"
                              onClick={() => toggleObjeto(unidadeIndex, objetoIndex)}
                            >
                              <CardHeader className="py-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    {objeto.expanded ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />}
                                    <span className="font-medium text-gray-900">{objeto.nome}</span>
                                  </div>
                                  <span className="text-xs text-gray-600">
                                    {objeto.totalHabilidades} habilidades
                                  </span>
                                </div>
                              </CardHeader>
                            </div>
                            
                            {objeto.expanded && (
                              <CardContent className="pt-0">
                                {objeto.loading ? (
                                  <div className="text-center py-4 text-gray-600">
                                    Carregando habilidades...
                                  </div>
                                ) : objeto.habilidades && objeto.habilidades.length > 0 ? (
                                  <div className="space-y-2">
                                    {objeto.habilidades.map((habilidade) => {
                                      const isSelecionada = isHabilidadeSelecionada(habilidade.id);
                                      return (
                                        <Card 
                                          key={habilidade.id} 
                                          className={`p-3 border transition-all duration-200 ${
                                            isSelecionada 
                                              ? 'bg-green-50 border-green-300 shadow-md' 
                                              : 'bg-white border-gray-200 hover:border-gray-300'
                                          }`}
                                        >
                                          <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                              <span className={`inline-block text-xs px-2 py-1 rounded mb-1 ${
                                                isSelecionada 
                                                  ? 'bg-green-200 text-green-800' 
                                                  : 'bg-blue-100 text-blue-800'
                                              }`}>
                                                {habilidade.codigo}
                                              </span>
                                              <p className="text-sm text-gray-700">
                                                {habilidade.descricao}
                                              </p>
                                            </div>
                                            <Button
                                              size="sm"
                                              onClick={() => adicionarHabilidade(habilidade)}
                                              className={`ml-2 transition-all duration-200 ${
                                                isSelecionada
                                                  ? 'bg-red-500 hover:bg-red-600 text-white'
                                                  : 'bg-blue-500 hover:bg-blue-600 text-white'
                                              }`}
                                            >
                                              {isSelecionada ? (
                                                <Trash2 className="w-4 h-4" />
                                              ) : (
                                                <Plus className="w-4 h-4" />
                                              )}
                                            </Button>
                                          </div>
                                        </Card>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <div className="text-center py-4 text-gray-600">
                                    Nenhuma habilidade encontrada
                                  </div>
                                )}
                              </CardContent>
                            )}
                          </Card>
                        ))}
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Editor de Trilha Personalizada */}
          {showCustomizer && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Personalizar Trilha
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Informações da Trilha */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-900">Título da Trilha</Label>
                    <Input
                      value={trilhaPersonalizada.titulo}
                      onChange={(e) => setTrilhaPersonalizada({
                        ...trilhaPersonalizada,
                        titulo: e.target.value
                      })}
                      className="bg-white text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-900">Descrição</Label>
                    <Input
                      value={trilhaPersonalizada.descricao}
                      onChange={(e) => setTrilhaPersonalizada({
                        ...trilhaPersonalizada,
                        descricao: e.target.value
                      })}
                      className="bg-white text-gray-900"
                    />
                  </div>
                </div>

                {/* Habilidades Selecionadas */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">
                      Habilidades Selecionadas ({trilhaPersonalizada.habilidadesSelecionadas.length})
                    </h4>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowCustomizer(false);
                        // Manter as habilidades já selecionadas na trilha como seleções temporárias
                        setHabilidadesSelecionadasTemp([...trilhaPersonalizada.habilidadesSelecionadas]);
                      }}
                    >
                      Voltar à Seleção
                    </Button>
                  </div>

                  {trilhaPersonalizada.habilidadesSelecionadas.length === 0 ? (
                    <Card className="p-8 text-center bg-gray-50">
                      <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Nenhuma habilidade selecionada
                      </h3>
                      <p className="text-gray-600">
                        Volte à seleção e adicione habilidades à sua trilha.
                      </p>
                    </Card>
                  ) : (
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="habilidades-selecionadas">
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                            {trilhaPersonalizada.habilidadesSelecionadas.map((habilidade, index) => (
                              <Draggable key={habilidade.id} draggableId={habilidade.id} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                  >
                                    <Card className="p-3 bg-white border border-gray-200">
                                      <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-2 flex-1">
                                          <div {...provided.dragHandleProps}>
                                            <GripVertical className="w-4 h-4 text-gray-400 mt-1" />
                                          </div>
                                          <div className="flex-1">
                                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-1">
                                              {habilidade.codigo}
                                            </span>
                                            <p className="text-sm text-gray-700">
                                              {habilidade.descricao}
                                            </p>
                                          </div>
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => removerHabilidade(index)}
                                        >
                                          <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                      </div>
                                    </Card>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  )}
                </div>

                {/* Botões de Ação */}
                <div className="flex space-x-4">
                  <Button
                    onClick={salvarTrilha}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={trilhaPersonalizada.habilidadesSelecionadas.length === 0}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Trilha
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowCustomizer(false);
                      // Manter as habilidades já selecionadas na trilha como seleções temporárias
                      setHabilidadesSelecionadasTemp([...trilhaPersonalizada.habilidadesSelecionadas]);
                    }}
                  >
                    Voltar à Seleção
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Conteúdo da aba "Minhas Trilhas" */}
      {activeTab === 'minhas' && (
        <div className="space-y-6">
          {/* Filtros */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Filtrar Trilhas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-900">Série</Label>
                  <Select value={filtroSerie} onValueChange={setFiltroSerie}>
                    <SelectTrigger className="bg-white text-gray-900">
                      <SelectValue placeholder="Todas as séries" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="todas" className="text-gray-900">Todas as séries</SelectItem>
                      {series.map((s) => (
                        <SelectItem key={s.value} value={s.value} className="text-gray-900">
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-900">Disciplina</Label>
                  <Select value={filtroDisciplina} onValueChange={setFiltroDisciplina}>
                    <SelectTrigger className="bg-white text-gray-900">
                      <SelectValue placeholder="Todas as disciplinas" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="todas" className="text-gray-900">Todas as disciplinas</SelectItem>
                      {disciplinas.map((d) => (
                        <SelectItem key={d.value} value={d.value} className="text-gray-900">
                          {d.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={buscarMinhasTrilhas} className="w-full">
                    Atualizar Lista
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Trilhas */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Suas Trilhas Personalizadas ({minhasTrilhas.length})
            </h3>
            
            {minhasTrilhas.length === 0 ? (
              <Card className="p-8 text-center bg-gray-50">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhuma trilha encontrada
                </h3>
                <p className="text-gray-600 mb-4">
                  Você ainda não criou trilhas personalizadas ou não há trilhas que correspondam aos filtros selecionados.
                </p>
                <Button onClick={() => setActiveTab('criar')} className="bg-blue-600 hover:bg-blue-700">
                  Criar Primeira Trilha
                </Button>
              </Card>
            ) : (
              <div className="grid gap-4">
                {minhasTrilhas.map((trilha) => (
                  <Card key={trilha.id} className="border-2 border-gray-200 hover:border-blue-300 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-gray-900 mb-2">
                            {trilha.titulo}
                          </CardTitle>
                          <p className="text-gray-600 text-sm mb-3">
                            {trilha.descricao}
                          </p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {trilha.serie}
                            </span>
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                              {disciplinas.find(d => d.value === trilha.disciplina)?.label || trilha.disciplina}
                            </span>
                            <span className="text-gray-500">
                              {trilha.topicos?.length || 0} habilidades
                            </span>
                            <span className="text-gray-500">
                              Criada em {new Date(trilha.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Implementar visualização detalhada
                              toast.info('Funcionalidade de visualização em desenvolvimento');
                            }}
                          >
                            <BookOpen className="w-4 h-4 mr-1" />
                            Ver Detalhes
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => excluirTrilha(trilha.id)}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    {trilha.topicos && trilha.topicos.length > 0 && (
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900 text-sm">Habilidades incluídas:</h4>
                          <div className="grid gap-2 max-h-32 overflow-y-auto">
                            {trilha.topicos.slice(0, 3).map((topico: any) => (
                              <div key={topico.id} className="bg-gray-50 p-2 rounded text-xs">
                                <span className="font-medium text-blue-600">{topico.codigoBNCC}</span>
                                <p className="text-gray-700 mt-1 line-clamp-2">{topico.descricaoBNCC}</p>
                              </div>
                            ))}
                            {trilha.topicos.length > 3 && (
                              <div className="text-xs text-gray-500 text-center py-1">
                                ... e mais {trilha.topicos.length - 3} habilidades
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 