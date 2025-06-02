"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import React from 'react';
import Link from 'next/link';
import { Avatar } from '@/components/ui/Avatar';

export default function AlunoDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-indigo-600">SertãoEdu</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link
            href="/dashboard/aluno"
            className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600"
          >
            <span>Dashboard</span>
          </Link>
          <Link
            href="/dashboard/aluno/trilhas"
            className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600"
          >
            <span>Minhas Trilhas</span>
          </Link>
          <Link
            href="/dashboard/aluno/atividades"
            className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600"
          >
            <span>Atividades</span>
          </Link>
          <Link
            href="/dashboard/aluno/conquistas"
            className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600"
          >
            <span>Conquistas</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <Avatar
              src="https://github.com/shadcn.png"
              alt="Aluno"
              className="w-8 h-8"
            />
            <div>
              <p className="text-sm font-medium text-gray-700">João Silva</p>
              <p className="text-xs text-gray-500">Aluno</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-indigo-600">SertãoEdu</h2>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8 mt-16 md:mt-0">
          {children}
        </div>
      </div>
    </div>
  );
} 