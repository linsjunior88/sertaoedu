"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ClipboardList, 
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  Users,
  Calendar,
  FileText
} from "lucide-react";

interface Atividade {
  id: string;
  titulo: string;
  disciplina: string;
  turma: string;
  dataEntrega: string;
  status: "pendente" | "em_andamento" | "concluida";
  alunosEnviados: number;
  totalAlunos: number;
  tipo: "prova" | "trabalho" | "exercicio";
}

const atividadesMock: Atividade[] = [
  {
    id: "1",
    titulo: "Prova de Matemática - Capítulo 1",
    disciplina: "Matemática",
    turma: "Turma A",
    dataEntrega: "2024-03-20",
    status: "pendente",
    alunosEnviados: 0,
    totalAlunos: 25,
    tipo: "prova"
  },
  {
    id: "2",
    titulo: "Trabalho de Física - Mecânica",
    disciplina: "Física",
    turma: "Turma B",
    dataEntrega: "2024-03-18",
    status: "em_andamento",
    alunosEnviados: 15,
    totalAlunos: 20,
    tipo: "trabalho"
  },
  {
    id: "3",
    titulo: "Exercícios de Química - Reações",
    disciplina: "Química",
    turma: "Turma C",
    dataEntrega: "2024-03-15",
    status: "concluida",
    alunosEnviados: 18,
    totalAlunos: 18,
    tipo: "exercicio"
  }
];

const statusColors = {
  pendente: "bg-yellow-100 text-yellow-800",
  em_andamento: "bg-blue-100 text-blue-800",
  concluida: "bg-green-100 text-green-800"
};

const tipoIcons = {
  prova: FileText,
  trabalho: ClipboardList,
  exercicio: CheckCircle2
};

const tipoColors = {
  prova: "bg-red-100 text-red-800",
  trabalho: "bg-purple-100 text-purple-800",
  exercicio: "bg-blue-100 text-blue-800"
};

export default function AtividadesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("todas");

  const filteredAtividades = atividadesMock.filter(atividade => {
    const matchesSearch = atividade.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         atividade.disciplina.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "todas" || atividade.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-gray-900"
        >
          Atividades
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus size={20} />
            Nova Atividade
          </Button>
        </motion.div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar atividades..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedFilter === "todas" ? "default" : "outline"}
            onClick={() => setSelectedFilter("todas")}
          >
            Todas
          </Button>
          <Button
            variant={selectedFilter === "pendente" ? "default" : "outline"}
            onClick={() => setSelectedFilter("pendente")}
          >
            Pendentes
          </Button>
          <Button
            variant={selectedFilter === "em_andamento" ? "default" : "outline"}
            onClick={() => setSelectedFilter("em_andamento")}
          >
            Em Andamento
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAtividades.map((atividade, index) => {
          const Icon = tipoIcons[atividade.tipo];
          return (
            <motion.div
              key={atividade.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-lg ${tipoColors[atividade.tipo]}`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{atividade.titulo}</h3>
                    <p className="text-sm text-gray-500">{atividade.disciplina} - {atividade.turma}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[atividade.status]}`}>
                    {atividade.status.replace("_", " ").charAt(0).toUpperCase() + atividade.status.slice(1)}
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    Entrega: {new Date(atividade.dataEntrega).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users size={16} className="mr-2" />
                    {atividade.alunosEnviados}/{atividade.totalAlunos} alunos
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(atividade.alunosEnviados / atividade.totalAlunos) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      <Edit size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
} 