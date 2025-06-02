"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Wand2, Download, Save, BookOpen, Clock, Target, Users, Lightbulb, CheckCircle, FileText, Settings, ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';

interface Trilha {
  id: string;
  titulo: string;
  descricao: string;
  serie: string;
  disciplina: string;
  topicos: {
    id: string;
    titulo: string;
    descricao: string;
    codigoBNCC: string;
    descricaoBNCC: string;
  }[];
}

interface HabilidadeSelecionada {
  id: string;
  codigo: string;
  descricao: string;
  trilhaId: string;
  trilhaTitulo: string;
}

interface PlanoGerado {
  titulo: string;
  duracao: string;
  objetivoGeral: string;
  objetivosEspecificos: string[];
  conteudos: {
    conceituais: string[];
    procedimentais: string[];
    atitudinais: string[];
  };
  metodologia: string[];
  desenvolvimento: {
    inicial: string;
    principal: string;
    fechamento: string;
  };
  avaliacao: {
    criterios: string[];
    instrumentos: string[];
    indicadores: string[];
  };
  recursos: string[];
  referencias: string[];
  links: string[];
  atividadesComplementares: string[];
  adaptacoes: string[];
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

export default function PlanoAulaPage() {
  const [serie, setSerie] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [tema, setTema] = useState("");
  const [trilhasDisponiveis, setTrilhasDisponiveis] = useState<Trilha[]>([]);
  const [trilhasExpandidas, setTrilhasExpandidas] = useState<Set<string>>(new Set());
  const [habilidadesSelecionadas, setHabilidadesSelecionadas] = useState<HabilidadeSelecionada[]>([]);
  const [planoGerado, setPlanoGerado] = useState<PlanoGerado | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'configurar' | 'visualizar'>('configurar');

  useEffect(() => {
    if (serie && disciplina) {
      buscarTrilhas();
    }
  }, [serie, disciplina]);

  const buscarTrilhas = async () => {
    try {
      const params = new URLSearchParams();
      if (serie) params.append('serie', serie);
      if (disciplina) params.append('disciplina', disciplina);
      
      const response = await fetch(`/api/trilhas?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar trilhas');
      }
      const trilhas = await response.json();
      setTrilhasDisponiveis(trilhas);
    } catch (error) {
      console.error('Erro ao buscar trilhas:', error);
      toast.error('Erro ao buscar trilhas disponíveis');
    }
  };

  const toggleTrilha = (trilhaId: string) => {
    const novasExpandidas = new Set(trilhasExpandidas);
    if (novasExpandidas.has(trilhaId)) {
      novasExpandidas.delete(trilhaId);
    } else {
      novasExpandidas.add(trilhaId);
    }
    setTrilhasExpandidas(novasExpandidas);
  };

  const toggleHabilidade = (habilidade: any, trilha: Trilha) => {
    const habilidadeCompleta: HabilidadeSelecionada = {
      id: habilidade.id,
      codigo: habilidade.codigoBNCC,
      descricao: habilidade.descricaoBNCC,
      trilhaId: trilha.id,
      trilhaTitulo: trilha.titulo
    };

    const jaExiste = habilidadesSelecionadas.some(h => h.id === habilidade.id);
    
    if (jaExiste) {
      setHabilidadesSelecionadas(prev => prev.filter(h => h.id !== habilidade.id));
      toast.success('Habilidade removida da seleção');
    } else {
      setHabilidadesSelecionadas(prev => [...prev, habilidadeCompleta]);
      toast.success('Habilidade adicionada à seleção');
    }
  };

  const isHabilidadeSelecionada = (habilidadeId: string) => {
    return habilidadesSelecionadas.some(h => h.id === habilidadeId);
  };

  const removerHabilidade = (habilidadeId: string) => {
    setHabilidadesSelecionadas(prev => prev.filter(h => h.id !== habilidadeId));
    toast.success('Habilidade removida');
  };

  const limparSelecoes = () => {
    setHabilidadesSelecionadas([]);
    toast.success('Todas as seleções foram limpas');
  };

  const gerarPlanoAula = async () => {
    if (!serie || !disciplina) {
      toast.error('Selecione a série e disciplina');
      return;
    }

    if (habilidadesSelecionadas.length === 0) {
      toast.error('Selecione pelo menos uma habilidade');
      return;
    }

    setIsGenerating(true);
    try {
      const habilidadeIds = habilidadesSelecionadas.map(h => h.id);

      const response = await fetch('/api/plano-aula/gerar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          habilidadeIds,
          serie,
          disciplina,
          tema: tema || undefined
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao gerar plano de aula');
      }

      const resultado = await response.json();
      setPlanoGerado(resultado.plano);
      setActiveTab('visualizar');
      toast.success('Plano de aula gerado com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar plano:', error);
      toast.error(`Erro ao gerar plano de aula: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const exportarPlano = () => {
    if (!planoGerado) return;

    const conteudo = `
# ${planoGerado.titulo}

## Identificação
- **Duração:** ${planoGerado.duracao}
- **Série:** ${serie}
- **Disciplina:** ${disciplinas.find(d => d.value === disciplina)?.label}
- **Tema:** ${tema || 'Baseado em habilidades BNCC'}

## Habilidades BNCC Trabalhadas
${habilidadesSelecionadas.map(h => `- **${h.codigo}:** ${h.descricao}`).join('\n')}

## Objetivo Geral
${planoGerado.objetivoGeral}

## Objetivos Específicos
${planoGerado.objetivosEspecificos.map(obj => `- ${obj}`).join('\n')}

## Conteúdos
### Conceituais
${planoGerado.conteudos.conceituais.map(c => `- ${c}`).join('\n')}

### Procedimentais
${planoGerado.conteudos.procedimentais.map(c => `- ${c}`).join('\n')}

### Atitudinais
${planoGerado.conteudos.atitudinais.map(c => `- ${c}`).join('\n')}

## Metodologia
${planoGerado.metodologia.map(m => `- ${m}`).join('\n')}

## Desenvolvimento da Aula
### Momento Inicial
${planoGerado.desenvolvimento.inicial}

### Desenvolvimento Principal
${planoGerado.desenvolvimento.principal}

### Fechamento
${planoGerado.desenvolvimento.fechamento}

## Avaliação
### Critérios
${planoGerado.avaliacao.criterios.map(c => `- ${c}`).join('\n')}

### Instrumentos
${planoGerado.avaliacao.instrumentos.map(i => `- ${i}`).join('\n')}

## Recursos Didáticos
${planoGerado.recursos.map(r => `- ${r}`).join('\n')}

## Referências
${planoGerado.referencias.map(r => `- ${r}`).join('\n')}

## Links Úteis
${planoGerado.links.map(l => `- ${l}`).join('\n')}

## Atividades Complementares
${planoGerado.atividadesComplementares.map(a => `- ${a}`).join('\n')}

## Adaptações
${planoGerado.adaptacoes.map(a => `- ${a}`).join('\n')}
    `;

    const blob = new Blob([conteudo], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plano-aula-${disciplina}-${serie.replace(/\s+/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Plano de aula exportado!');
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
              <Wand2 className="w-6 h-6 mr-2 text-purple-600" />
              Gerador de Planos de Aula com IA
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant={activeTab === 'configurar' ? 'default' : 'outline'}
                onClick={() => setActiveTab('configurar')}
                className={activeTab === 'configurar' ? 'bg-purple-600 hover:bg-purple-700' : ''}
              >
                <Settings className="w-4 h-4 mr-2" />
                Configurar
              </Button>
              <Button
                variant={activeTab === 'visualizar' ? 'default' : 'outline'}
                onClick={() => setActiveTab('visualizar')}
                disabled={!planoGerado}
                className={activeTab === 'visualizar' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                <FileText className="w-4 h-4 mr-2" />
                Visualizar Plano
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Aba Configurar */}
      {activeTab === 'configurar' && (
        <div className="space-y-6">
          {/* Configurações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Configurações do Plano de Aula
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
              <div className="space-y-2">
                <Label className="text-gray-900">Tema da Aula (Opcional)</Label>
                <Input
                  value={tema}
                  onChange={(e) => setTema(e.target.value)}
                  placeholder="Ex: Interpretação de textos narrativos"
                  className="bg-white text-gray-900"
                />
              </div>
            </CardContent>
          </Card>

          {/* Habilidades Selecionadas */}
          {habilidadesSelecionadas.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    Habilidades Selecionadas ({habilidadesSelecionadas.length})
                  </CardTitle>
                  <Button
                    variant="outline"
                    onClick={limparSelecoes}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Limpar Todas
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {habilidadesSelecionadas.map((habilidade) => (
                    <div key={habilidade.id} className="flex items-start justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded">
                            {habilidade.codigo}
                          </span>
                          <span className="text-xs text-gray-500">
                            {habilidade.trilhaTitulo}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">
                          {habilidade.descricao}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removerHabilidade(habilidade.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Seleção de Trilhas e Habilidades */}
          {trilhasDisponiveis.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Selecionar Habilidades das Trilhas ({trilhasDisponiveis.length} trilhas disponíveis)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trilhasDisponiveis.map((trilha) => (
                    <Card key={trilha.id} className="border-2 border-gray-200">
                      <div 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleTrilha(trilha.id)}
                      >
                        <CardHeader className="py-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              {trilhasExpandidas.has(trilha.id) ? 
                                <ChevronDown className="w-5 h-5 mr-2" /> : 
                                <ChevronRight className="w-5 h-5 mr-2" />
                              }
                              <div>
                                <h4 className="font-medium text-gray-900">{trilha.titulo}</h4>
                                <p className="text-sm text-gray-600">{trilha.descricao}</p>
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">
                              {trilha.topicos.length} habilidades
                            </span>
                          </div>
                        </CardHeader>
                      </div>
                      
                      {trilhasExpandidas.has(trilha.id) && (
                        <CardContent className="pt-0">
                          <div className="space-y-2">
                            {trilha.topicos.map((topico) => {
                              const isSelecionada = isHabilidadeSelecionada(topico.id);
                              return (
                                <div 
                                  key={topico.id} 
                                  className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                                    isSelecionada 
                                      ? 'bg-green-50 border-green-300 shadow-md' 
                                      : 'bg-white border-gray-200 hover:border-gray-300'
                                  }`}
                                  onClick={() => toggleHabilidade(topico, trilha)}
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <span className={`inline-block text-xs px-2 py-1 rounded mb-1 ${
                                        isSelecionada 
                                          ? 'bg-green-200 text-green-800' 
                                          : 'bg-blue-100 text-blue-800'
                                      }`}>
                                        {topico.codigoBNCC}
                                      </span>
                                      <p className="text-sm text-gray-700">
                                        {topico.descricaoBNCC}
                                      </p>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                      isSelecionada 
                                        ? 'bg-green-500 border-green-500' 
                                        : 'border-gray-300'
                                    }`}>
                                      {isSelecionada && (
                                        <CheckCircle className="w-3 h-3 text-white" />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Botão Gerar */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="text-sm text-gray-600">
                  {habilidadesSelecionadas.length > 0 ? (
                    `${habilidadesSelecionadas.length} habilidade${habilidadesSelecionadas.length !== 1 ? 's' : ''} selecionada${habilidadesSelecionadas.length !== 1 ? 's' : ''}`
                  ) : (
                    'Selecione pelo menos uma habilidade para gerar o plano de aula'
                  )}
                </div>
                <Button
                  onClick={gerarPlanoAula}
                  disabled={isGenerating || habilidadesSelecionadas.length === 0}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Gerando Plano...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5 mr-2" />
                      Gerar Plano de Aula com IA
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Aba Visualizar Plano */}
      {activeTab === 'visualizar' && planoGerado && (
        <div className="space-y-6">
          {/* Cabeçalho do Plano */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                    {planoGerado.titulo}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {planoGerado.duracao}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {serie}
                    </span>
                    <span className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {disciplinas.find(d => d.value === disciplina)?.label}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={exportarPlano} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                  <Button onClick={() => toast.info('Funcionalidade de salvar em desenvolvimento')}>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Habilidades BNCC */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg text-gray-900">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Habilidades BNCC Trabalhadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {habilidadesSelecionadas.map((habilidade) => (
                  <div key={habilidade.id} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded font-medium">
                        {habilidade.codigo}
                      </span>
                      <p className="text-sm text-gray-700 flex-1">
                        {habilidade.descricao}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Objetivos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg text-gray-900">
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                Objetivos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Objetivo Geral</h4>
                <p className="text-gray-700">{planoGerado.objetivoGeral}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Objetivos Específicos</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {planoGerado.objetivosEspecificos.map((obj, index) => (
                    <li key={index}>{obj}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Conteúdos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg text-gray-900">
                <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                Conteúdos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Conceituais</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {planoGerado.conteudos.conceituais.map((c, index) => (
                      <li key={index}>{c}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Procedimentais</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {planoGerado.conteudos.procedimentais.map((c, index) => (
                      <li key={index}>{c}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Atitudinais</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {planoGerado.conteudos.atitudinais.map((c, index) => (
                      <li key={index}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metodologia e Desenvolvimento */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-gray-900">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                  Metodologia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {planoGerado.metodologia.map((m, index) => (
                    <li key={index}>{m}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-gray-900">
                  <CheckCircle className="w-5 h-5 mr-2 text-purple-600" />
                  Avaliação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h5 className="font-medium text-sm text-gray-900">Critérios</h5>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {planoGerado.avaliacao.criterios.map((c, index) => (
                      <li key={index}>{c}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-sm text-gray-900">Instrumentos</h5>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {planoGerado.avaliacao.instrumentos.map((i, index) => (
                      <li key={index}>{i}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Desenvolvimento da Aula */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">Desenvolvimento da Aula</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Momento Inicial</h4>
                <p className="text-gray-700">{planoGerado.desenvolvimento.inicial}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Desenvolvimento Principal</h4>
                <p className="text-gray-700">{planoGerado.desenvolvimento.principal}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Fechamento</h4>
                <p className="text-gray-700">{planoGerado.desenvolvimento.fechamento}</p>
              </div>
            </CardContent>
          </Card>

          {/* Recursos e Referências */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Recursos Didáticos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {planoGerado.recursos.map((r, index) => (
                    <li key={index}>{r}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Referências</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {planoGerado.referencias.map((r, index) => (
                    <li key={index}>{r}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Atividades Complementares e Adaptações */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Atividades Complementares</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {planoGerado.atividadesComplementares.map((a, index) => (
                    <li key={index}>{a}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Adaptações</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {planoGerado.adaptacoes.map((a, index) => (
                    <li key={index}>{a}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
} 