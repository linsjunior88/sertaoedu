import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { ProfessorDashboardPage } from '../pages/ProfessorDashboardPage';

// Simula uma verificação de autenticação
// No futuro, isto viria de um contexto de autenticação ou estado global
const isAuthenticated = () => {
  // Para fins de teste, vamos assumir que o professor está sempre autenticado
  // ou que o login redireciona para cá após sucesso.
  // Poderia verificar um token no localStorage, por exemplo.
  return true; // Mude para false para testar o redirecionamento para login
};

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  if (!isAuthenticated()) {
    // Redireciona para a página de login se não estiver autenticado
    return <Navigate to="/login" replace />;
  }
  return children;
};

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/professor/dashboard"
        element={
          <ProtectedRoute>
            <ProfessorDashboardPage />
          </ProtectedRoute>
        }
      />
      {/* Rota padrão: redireciona para o dashboard se autenticado, senão para login */}
      <Route 
        path="*" 
        element={<Navigate to={isAuthenticated() ? "/professor/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}

