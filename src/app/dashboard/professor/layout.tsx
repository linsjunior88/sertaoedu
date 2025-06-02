"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from 'next/link';
import { 
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  ClipboardList,
  GraduationCap,
  Calendar,
  LogOut
} from 'lucide-react';

export default function ProfessorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "professor") {
      router.push("/professor/login");
    }
  }, [user, router]);

  if (!user || user.role !== "professor") {
    return null;
  }

  const menuItems = [
    {
      href: "/dashboard/professor",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />
    },
    {
      href: "/dashboard/professor/turmas",
      label: "Minhas Turmas",
      icon: <Users size={20} />
    },
    {
      href: "/dashboard/professor/trilhas",
      label: "Trilhas BNCC",
      icon: <GraduationCap size={20} />
    },
    {
      href: "/dashboard/professor/plano-aula",
      label: "Plano de Aula",
      icon: <Calendar size={20} />
    },
    {
      href: "/dashboard/professor/turma",
      label: "Visão da Turma",
      icon: <Users size={20} />
    },
    {
      href: "/dashboard/professor/atividades",
      label: "Atividades",
      icon: <ClipboardList size={20} />
    },
    {
      href: "/dashboard/professor/materiais",
      label: "Materiais",
      icon: <FileText size={20} />
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-600">SertãoEdu</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-medium">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">{user.username}</p>
                <p className="text-xs text-gray-500">Professor</p>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="text-sm text-red-600 hover:text-red-700 flex items-center gap-2"
            >
              <LogOut size={16} />
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-600">SertãoEdu</h2>
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