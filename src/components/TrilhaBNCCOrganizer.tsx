import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface UnidadeTematica {
  id: string;
  nome: string;
  objetos: ObjetoConhecimento[];
}

interface ObjetoConhecimento {
  id: string;
  nome: string;
  habilidades: Habilidade[];
}

interface Habilidade {
  id: string;
  codigo: string;
  descricao: string;
}

interface TrilhaBNCCOrganizerProps {
  disciplina: string;
  serie: string;
  onSave: (trilha: any) => void;
}

export function TrilhaBNCCOrganizer({ disciplina, serie, onSave }: TrilhaBNCCOrganizerProps) {
  const [unidadesTematicas, setUnidadesTematicas] = useState<UnidadeTematica[]>([]);
  const [habilidadesFiltradas, setHabilidadesFiltradas] = useState<Habilidade[]>([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [selectedUnidades, setSelectedUnidades] = useState<string[]>([]);
  const [selectedObjetos, setSelectedObjetos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    carregarDadosBNCC();
  }, [disciplina, serie]);

  const carregarDadosBNCC = async () => {
    try {
      setIsLoading(true);
      console.log('Carregando dados para:', { serie, disciplina });
      
      const response = await fetch(`/api/bncc?serie=${encodeURIComponent(serie)}&disciplina=${encodeURIComponent(disciplina)}`);
      if (!response.ok) {
        throw new Error('Erro ao carregar dados da BNCC');
      }
      
      const data = await response.json();
      console.log('Dados recebidos:', data);
      
      if (data.unidadesTematicas) {
        setUnidadesTematicas(data.unidadesTematicas);
        // Seleciona todas as unidades e objetos por padrão
        const todasUnidades = data.unidadesTematicas.map((u: UnidadeTematica) => u.id);
        const todosObjetos = data.unidadesTematicas.flatMap((u: UnidadeTematica) => 
          u.objetos.map((o: ObjetoConhecimento) => o.id)
        );
        setSelectedUnidades(todasUnidades);
        setSelectedObjetos(todosObjetos);
        // Atualiza as habilidades filtradas
        const todasHabilidades = data.unidadesTematicas.flatMap((u: UnidadeTematica) =>
          u.objetos.flatMap((o: ObjetoConhecimento) => o.habilidades)
        );
        setHabilidadesFiltradas(todasHabilidades);
      } else {
        console.error('Nenhuma unidade temática encontrada nos dados');
        toast.error('Nenhuma unidade temática encontrada');
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast.error('Erro ao carregar dados da BNCC');
    } finally {
      setIsLoading(false);
    }
  };

  const onDragEnd = (result: any) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (type === 'unidade') {
      const newUnidades = Array.from(unidadesTematicas);
      const [removed] = newUnidades.splice(source.index, 1);
      newUnidades.splice(destination.index, 0, removed);
      setUnidadesTematicas(newUnidades);
    } else if (type === 'objeto') {
      const sourceUnidade = unidadesTematicas.find(u => u.id === source.droppableId);
      const destUnidade = unidadesTematicas.find(u => u.id === destination.droppableId);
      
      if (!sourceUnidade || !destUnidade) return;

      const newUnidades = [...unidadesTematicas];
      const sourceIndex = newUnidades.findIndex(u => u.id === source.droppableId);
      const destIndex = newUnidades.findIndex(u => u.id === destination.droppableId);

      const [removed] = newUnidades[sourceIndex].objetos.splice(source.index, 1);
      newUnidades[destIndex].objetos.splice(destination.index, 0, removed);

      setUnidadesTematicas(newUnidades);
    }
  };

  const toggleUnidade = (unidadeId: string) => {
    setSelectedUnidades(prev => {
      const newSelected = prev.includes(unidadeId)
        ? prev.filter(id => id !== unidadeId)
        : [...prev, unidadeId];
      
      // Atualiza habilidades filtradas
      const habilidades = unidadesTematicas
        .filter(u => newSelected.includes(u.id))
        .flatMap(u => u.objetos)
        .filter(o => selectedObjetos.includes(o.id))
        .flatMap(o => o.habilidades);
      
      setHabilidadesFiltradas(habilidades);
      return newSelected;
    });
  };

  const toggleObjeto = (objetoId: string) => {
    setSelectedObjetos(prev => {
      const newSelected = prev.includes(objetoId)
        ? prev.filter(id => id !== objetoId)
        : [...prev, objetoId];
      
      // Atualiza habilidades filtradas
      const habilidades = unidadesTematicas
        .filter(u => selectedUnidades.includes(u.id))
        .flatMap(u => u.objetos)
        .filter(o => newSelected.includes(o.id))
        .flatMap(o => o.habilidades);
      
      setHabilidadesFiltradas(habilidades);
      return newSelected;
    });
  };

  const handleSave = () => {
    if (!titulo || !descricao) {
      toast.error('Preencha o título e a descrição da trilha');
      return;
    }

    const trilha = {
      titulo,
      descricao,
      serie,
      disciplina,
      unidadesTematicas: unidadesTematicas.filter(u => selectedUnidades.includes(u.id)),
      habilidades: habilidadesFiltradas
    };

    onSave(trilha);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg text-gray-900">Carregando dados da BNCC...</div>
      </div>
    );
  }

  if (unidadesTematicas.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg text-gray-900">Nenhuma unidade temática encontrada para esta série e disciplina.</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Lado esquerdo: Unidades Temáticas e Objetos */}
      <div className="space-y-6">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="unidades" type="unidade">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {unidadesTematicas.map((unidade, index) => (
                  <Draggable key={unidade.id} draggableId={unidade.id} index={index}>
                    {(provided) => (
                      <Card className="mb-4 bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader className="bg-blue-50">
                          <CardTitle className="flex items-center justify-between text-gray-900">
                            <span>{unidade.nome}</span>
                            <input
                              type="checkbox"
                              checked={selectedUnidades.includes(unidade.id)}
                              onChange={() => toggleUnidade(unidade.id)}
                              className="h-4 w-4 text-blue-600"
                            />
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                          <Droppable droppableId={unidade.id} type="objeto">
                            {(provided) => (
                              <div {...provided.droppableProps} ref={provided.innerRef}>
                                {unidade.objetos.map((objeto, index) => (
                                  <Draggable key={objeto.id} draggableId={objeto.id} index={index}>
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="p-3 mb-2 bg-gray-50 rounded-md flex items-center justify-between hover:bg-gray-100 transition-colors"
                                      >
                                        <span className="text-gray-900">{objeto.nome}</span>
                                        <input
                                          type="checkbox"
                                          checked={selectedObjetos.includes(objeto.id)}
                                          onChange={() => toggleObjeto(objeto.id)}
                                          className="h-4 w-4 text-blue-600"
                                        />
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="grid gap-4 mt-6">
          <div className="grid gap-2">
            <Label htmlFor="titulo" className="text-gray-900">Título da Trilha</Label>
            <Input
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Digite o título da trilha"
              className="bg-white text-gray-900"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="descricao" className="text-gray-900">Descrição</Label>
            <Input
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Digite a descrição da trilha"
              className="bg-white text-gray-900"
            />
          </div>
        </div>
      </div>

      {/* Lado direito: Habilidades filtradas */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Habilidades Selecionadas</h3>
        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
          {habilidadesFiltradas.map((habilidade) => (
            <Card key={habilidade.id} className="p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="font-medium text-blue-600">{habilidade.codigo}</div>
              <div className="text-sm text-gray-700 mt-1">{habilidade.descricao}</div>
            </Card>
          ))}
        </div>
      </div>

      <div className="col-span-2">
        <Button 
          onClick={handleSave} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Salvar Trilha
        </Button>
      </div>
    </div>
  );
} 