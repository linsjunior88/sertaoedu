import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { ProfessorDashboardPage } from '../pages/ProfessorDashboardPage';
import { AlunoDashboardPage } from '../pages/AlunoDashboardPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/professor" element={<ProfessorDashboardPage />} />
      <Route path="/aluno" element={<AlunoDashboardPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
