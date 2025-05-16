import { Mail, Lock, User, Users, BookOpen } from 'lucide-react';
// import '../App.css'; // Assuming App.css might be global or specific styles will be handled differently

export function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4">
      {/* Placeholder para o Logo */}
      <div className="mb-8 w-32 h-32 bg-gray-200 flex items-center justify-center text-gray-500 rounded-full">
        Logo
      </div>

      {/* Formulário de Login */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg space-y-6 shadow-xl">
        {/* Campo de E-mail */}
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          <input 
            type="email" 
            placeholder="E-mail"
            className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-full text-lg focus:ring-light-blue focus:border-light-blue"
          />
        </div>

        {/* Campo de Senha */}
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          <input 
            type="password" 
            placeholder="Senha"
            className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-full text-lg focus:ring-light-blue focus:border-light-blue"
          />
        </div>

        {/* Seletor de Perfil */}
        <div className="flex flex-col sm:flex-row justify-around sm:space-x-2 space-y-3 sm:space-y-0 pt-2">
          <button className="flex-1 bg-gray-200 hover:bg-light-blue text-gray-700 hover:text-white font-semibold py-3 px-4 rounded-full text-lg transition duration-150 ease-in-out flex items-center justify-center">
            <User className="mr-2 w-5 h-5" /> Aluno
          </button>
          <button className="flex-1 bg-light-blue text-white font-semibold py-3 px-4 rounded-full text-lg transition duration-150 ease-in-out flex items-center justify-center shadow-md">
            <BookOpen className="mr-2 w-5 h-5" /> Professor
          </button>
          <button className="flex-1 bg-gray-200 hover:bg-light-blue text-gray-700 hover:text-white font-semibold py-3 px-4 rounded-full text-lg transition duration-150 ease-in-out flex items-center justify-center">
            <Users className="mr-2 w-5 h-5" /> Gestor
          </button>
        </div>

        {/* Botão Entrar */}
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-full text-xl transition duration-150 ease-in-out">
          Entrar
        </button>

        {/* Esqueci minha senha */}
        <div className="text-center">
          <a href="#" className="text-sm text-blue-500 hover:text-blue-700 font-semibold">
            Esqueci minha senha
          </a>
        </div>

        {/* Links de Cadastro e Suporte */}
        <div className="text-center text-sm text-gray-600 pt-4">
          Não tem uma conta? <a href="#" className="font-semibold text-blue-500 hover:text-blue-700">Criar conta</a>
          <span className="mx-2">|</span>
          <a href="#" className="font-semibold text-blue-500 hover:text-blue-700">Suporte</a>
        </div>
      </div>
    </div>
  );
}

