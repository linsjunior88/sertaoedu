"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AlunoDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "aluno") {
      router.push("/aluno/login");
    }
  }, [user, router]);

  if (!user || user.role !== "aluno") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Dashboard do Aluno
              </h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">
                Olá, {user.username}
              </span>
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Bem-vindo ao seu Dashboard
            </h2>
            <p className="text-gray-600">
              Aqui você poderá ver seus cursos e atividades.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 