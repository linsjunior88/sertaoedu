"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrilhaBNCCCreator } from '@/components/TrilhaBNCCCreator';
import { TrilhasList } from '@/components/TrilhasList';
import { Plus, List } from 'lucide-react';

export default function TrilhasPage() {
  const [abaAtiva, setAbaAtiva] = useState<'criar' | 'listar'>('listar');

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Trilhas de Aprendizagem BNCC</h1>
      </div>

      {/* Navegação por abas */}
      <Card>
        <CardHeader>
          <div className="flex space-x-4">
            <Button
              variant={abaAtiva === 'listar' ? 'default' : 'outline'}
              onClick={() => setAbaAtiva('listar')}
              className="flex items-center space-x-2"
            >
              <List className="w-4 h-4" />
              <span>Trilhas Criadas</span>
            </Button>
            <Button
              variant={abaAtiva === 'criar' ? 'default' : 'outline'}
              onClick={() => setAbaAtiva('criar')}
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Criar Nova Trilha</span>
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Conteúdo das abas */}
      {abaAtiva === 'listar' && <TrilhasList />}
      {abaAtiva === 'criar' && <TrilhaBNCCCreator />}
    </div>
  );
} 