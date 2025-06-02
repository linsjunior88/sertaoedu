"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, ChevronDown, ChevronUp, Search } from "lucide-react";

interface Habilidade {
  id: string;
  nome: string;
  status: "pendente" | "em_andamento" | "concluido";
}

interface Disciplina {
  id: string;
  nome: string;
  media: number;
  habilidades: Habilidade[];
}

interface Aluno {
  id: string;
  nome: string;
  avatar: string;
  mediaGeral: number;
  disciplinas: Disciplina[];
  alertas: {
    tipo: "baixo_desempenho" | "falta" | "comportamento";
    mensagem: string;
  }[];
}

const alunosMock: Aluno[] = [
  {
    id: "1",
    nome: "João Silva",
    avatar: "JS",
    mediaGeral: 7.5,
    disciplinas: [
      {
        id: "1",
        nome: "Matemática",
        media: 8.0,
        habilidades: [
          {
            id: "1-1",
            nome: "Números Naturais",
            status: "concluido",
          },
          {
            id: "1-2",
            nome: "Operações Básicas",
            status: "em_andamento",
          },
        ],
      },
      {
        id: "2",
        nome: "Português",
        media: 7.0,
        habilidades: [
          {
            id: "2-1",
            nome: "Leitura",
            status: "concluido",
          },
          {
            id: "2-2",
            nome: "Escrita",
            status: "em_andamento",
          },
        ],
      },
    ],
    alertas: [
      {
        tipo: "baixo_desempenho",
        mensagem: "Desempenho abaixo da média em Português",
      },
    ],
  },
  {
    id: "2",
    nome: "Maria Santos",
    avatar: "MS",
    mediaGeral: 8.5,
    disciplinas: [
      {
        id: "1",
        nome: "Matemática",
        media: 9.0,
        habilidades: [
          {
            id: "1-1",
            nome: "Números Naturais",
            status: "concluido",
          },
          {
            id: "1-2",
            nome: "Operações Básicas",
            status: "concluido",
          },
        ],
      },
      {
        id: "2",
        nome: "Português",
        media: 8.0,
        habilidades: [
          {
            id: "2-1",
            nome: "Leitura",
            status: "concluido",
          },
          {
            id: "2-2",
            nome: "Escrita",
            status: "em_andamento",
          },
        ],
      },
    ],
    alertas: [],
  },
];

const statusColors = {
  pendente: "bg-yellow-100 text-yellow-800",
  em_andamento: "bg-blue-100 text-blue-800",
  concluido: "bg-green-100 text-green-800",
};

const alertaColors = {
  baixo_desempenho: "bg-red-100 text-red-800",
  falta: "bg-orange-100 text-orange-800",
  comportamento: "bg-purple-100 text-purple-800",
};

export default function TurmaPage() {
  const [alunos, setAlunos] = useState(alunosMock);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedAluno, setExpandedAluno] = useState<string | null>(null);
  const [selectedDisciplina, setSelectedDisciplina] = useState<string | null>(null);

  const filteredAlunos = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAlunoById = (id: string) => {
    return alunos.find((aluno) => aluno.id === id);
  };

  const getDisciplinaById = (alunoId: string, disciplinaId: string) => {
    const aluno = getAlunoById(alunoId);
    return aluno?.disciplinas.find((d) => d.id === disciplinaId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Visão da Turma</h1>
        <div className="relative">
          <Input
            type="text"
            placeholder="Buscar aluno..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlunos.map((aluno) => (
          <Card key={aluno.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-medium">{aluno.avatar}</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{aluno.nome}</h3>
                  <p className="text-sm text-gray-500">
                    Média Geral: {aluno.mediaGeral.toFixed(1)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setExpandedAluno(expandedAluno === aluno.id ? null : aluno.id)
                }
              >
                {expandedAluno === aluno.id ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
            </div>

            {expandedAluno === aluno.id && (
              <div className="mt-4 space-y-4">
                {aluno.alertas.length > 0 && (
                  <div className="space-y-2">
                    {aluno.alertas.map((alerta, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-2 p-2 rounded-lg ${
                          alertaColors[alerta.tipo]
                        }`}
                      >
                        <AlertTriangle className="w-4 h-4 mt-0.5" />
                        <p className="text-sm">{alerta.mensagem}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  {aluno.disciplinas.map((disciplina) => (
                    <div
                      key={disciplina.id}
                      className="border border-gray-200 rounded-lg p-3"
                    >
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() =>
                          setSelectedDisciplina(
                            selectedDisciplina === `${aluno.id}-${disciplina.id}`
                              ? null
                              : `${aluno.id}-${disciplina.id}`
                          )
                        }
                      >
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {disciplina.nome}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Média: {disciplina.media.toFixed(1)}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          {selectedDisciplina ===
                          `${aluno.id}-${disciplina.id}` ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                      </div>

                      {selectedDisciplina === `${aluno.id}-${disciplina.id}` && (
                        <div className="mt-2 space-y-2">
                          {disciplina.habilidades.map((habilidade) => (
                            <div
                              key={habilidade.id}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded"
                            >
                              <span className="text-sm">{habilidade.nome}</span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  statusColors[habilidade.status]
                                }`}
                              >
                                {habilidade.status
                                  .charAt(0)
                                  .toUpperCase() +
                                  habilidade.status.slice(1)}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
} 