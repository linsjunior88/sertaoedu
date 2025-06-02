"use client";

import { SignUp } from "@clerk/nextjs";

export default function ProfessorRegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Cadastro de Professor</h2>
          <p className="mt-2 text-sm text-gray-600">
            Crie sua conta de professor para acessar a plataforma
          </p>
        </div>
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700",
              footerActionLink: "text-indigo-600 hover:text-indigo-700",
              card: "bg-white rounded-lg shadow-lg p-6",
              headerTitle: "text-2xl font-bold text-gray-900",
              headerSubtitle: "text-gray-600",
              socialButtonsBlockButton: "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow hover:shadow-md transition-all duration-300",
              formFieldInput: "border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300",
              formFieldLabel: "text-gray-700 font-medium",
              formButtonReset: "text-gray-600 hover:text-gray-800",
            },
          }}
          afterSignUpUrl="/dashboard/professor"
          signInUrl="/professor/login"
        />
      </div>
    </div>
  );
} 