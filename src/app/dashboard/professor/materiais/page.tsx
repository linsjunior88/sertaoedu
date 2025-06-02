"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Upload, 
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  Folder,
  File,
  Image,
  Video,
  Book
} from "lucide-react";

interface Material {
  id: string;
  titulo: string;
  tipo: "documento" | "imagem" | "video" | "livro";
  disciplina: string;
  dataUpload: string;
  tamanho: string;
  downloads: number;
}

const materiaisMock: Material[] = [
  {
    id: "1",
    titulo: "Apostila de Matemática - Capítulo 1",
    tipo: "documento",
    disciplina: "Matemática",
    dataUpload: "2024-03-15",
    tamanho: "2.5 MB",
    downloads: 45
  },
  {
    id: "2",
    titulo: "Vídeo Aula - Física Quântica",
    tipo: "video",
    disciplina: "Física",
    dataUpload: "2024-03-14",
    tamanho: "150 MB",
    downloads: 32
  },
  {
    id: "3",
    titulo: "Livro Digital - Química Orgânica",
    tipo: "livro",
    disciplina: "Química",
    dataUpload: "2024-03-13",
    tamanho: "8.2 MB",
    downloads: 28
  }
];

const tipoIcons = {
  documento: FileText,
  imagem: Image,
  video: Video,
  livro: Book
};

const tipoColors = {
  documento: "bg-blue-100 text-blue-800",
  imagem: "bg-purple-100 text-purple-800",
  video: "bg-red-100 text-red-800",
  livro: "bg-green-100 text-green-800"
};

export default function MateriaisPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("todos");

  const filteredMateriais = materiaisMock.filter(material => {
    const matchesSearch = material.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.disciplina.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "todos" || material.tipo === selectedFilter;
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
          Materiais Didáticos
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-3"
        >
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Folder size={20} />
            Nova Pasta
          </Button>
          <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
            <Upload size={20} />
            Upload
          </Button>
        </motion.div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar materiais..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedFilter === "todos" ? "default" : "outline"}
            onClick={() => setSelectedFilter("todos")}
          >
            Todos
          </Button>
          <Button
            variant={selectedFilter === "documento" ? "default" : "outline"}
            onClick={() => setSelectedFilter("documento")}
          >
            Documentos
          </Button>
          <Button
            variant={selectedFilter === "video" ? "default" : "outline"}
            onClick={() => setSelectedFilter("video")}
          >
            Vídeos
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMateriais.map((material, index) => {
          const Icon = tipoIcons[material.tipo];
          return (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-lg ${tipoColors[material.tipo]}`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{material.titulo}</h3>
                    <p className="text-sm text-gray-500">{material.disciplina}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Data de Upload:</span>
                    <span>{new Date(material.dataUpload).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tamanho:</span>
                    <span>{material.tamanho}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Downloads:</span>
                    <span>{material.downloads}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      <Eye size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                      <Download size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
} 