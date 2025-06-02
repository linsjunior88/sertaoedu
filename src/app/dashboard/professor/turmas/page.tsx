"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Plus,
  Search,
  Filter,
  ChevronRight
} from "lucide-react";

interface Turma {
  id: string;
  nome: string;
  disciplina: string;
  alunos: number;
  periodo: string;
  status: "ativa" | "concluída" | "aguardando";
}

const turmasMock: Turma[] = [
  {
    id: "1",
    nome: "Turma A - Matemática",
    disciplina: "Matemática",
    alunos: 25,
    periodo: "2024.1",
    status: "ativa"
  },
  {
    id: "2",
    nome: "Turma B - Física",
    disciplina: "Física",
    alunos: 20,
    periodo: "2024.1",
    status: "ativa"
  },
  {
    id: "3",
    nome: "Turma C - Química",
    disciplina: "Química",
    alunos: 18,
    periodo: "2024.1",
    status: "aguardando"
  }
];

const statusColors = {
  ativa: "bg-green-100 text-green-800",
  concluída: "bg-blue-100 text-blue-800",
  aguardando: "bg-yellow-100 text-yellow-800"
};

export default function TurmasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("todas");

  const filteredTurmas = turmasMock.filter(turma => {
    const matchesSearch = turma.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         turma.disciplina.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "todas" || turma.status === selectedFilter;
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
          Minhas Turmas
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus size={20} />
            Nova Turma
          </Button>
        </motion.div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar turmas..."
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
            variant={selectedFilter === "ativa" ? "default" : "outline"}
            onClick={() => setSelectedFilter("ativa")}
          >
            Ativas
          </Button>
          <Button
            variant={selectedFilter === "aguardando" ? "default" : "outline"}
            onClick={() => setSelectedFilter("aguardando")}
          >
            Aguardando
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTurmas.map((turma, index) => (
          <motion.div
            key={turma.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{turma.nome}</h3>
                  <p className="text-sm text-gray-500">{turma.disciplina}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[turma.status]}`}>
                  {turma.status.charAt(0).toUpperCase() + turma.status.slice(1)}
                </span>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Users size={16} className="mr-2" />
                  {turma.alunos} alunos
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  {turma.periodo}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                  Ver detalhes
                </Button>
                <Button variant="ghost" className="text-gray-600 hover:text-gray-700">
                  <ChevronRight size={20} />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 