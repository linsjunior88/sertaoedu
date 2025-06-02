"use client";

import { SignUp } from "@clerk/nextjs";

export default function AlunoRegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Comece sua Aventura!</h2>
          <p className="text-sm text-gray-600">
            Crie sua conta de aluno e comece sua jornada de aprendizado
          </p>
        </div>
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: "bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
              footerActionLink: "text-green-600 hover:text-green-700",
              card: "bg-white rounded-lg shadow-lg p-6",
              headerTitle: "text-2xl font-bold text-gray-900",
              headerSubtitle: "text-gray-600",
              socialButtonsBlockButton: "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded-full shadow hover:shadow-md transition-all duration-300",
              formFieldInput: "border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300",
              formFieldLabel: "text-gray-700 font-medium",
              formButtonReset: "text-gray-600 hover:text-gray-800",
              identityPreviewEditButton: "text-green-600 hover:text-green-700",
              identityPreviewText: "text-gray-700",
              formFieldAction: "text-green-600 hover:text-green-700",
              formFieldInputShowPasswordButton: "text-gray-500 hover:text-gray-700",
              formFieldInputShowPasswordIcon: "text-gray-500",
              formResendCodeLink: "text-green-600 hover:text-green-700",
              otpCodeFieldInput: "border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300",
              footerAction: "text-gray-600",
              footerActionLink: "text-green-600 hover:text-green-700",
              formFieldSuccessText: "text-green-600",
              formFieldWarningText: "text-yellow-600",
              formFieldErrorText: "text-red-600",
            },
          }}
          afterSignUpUrl="/dashboard/aluno"
          signInUrl="/aluno/login"
        />
      </div>
    </div>
  );
} 