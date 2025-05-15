import { Mail, Lock, User, Users, BookOpen } from 'lucide-react';
import './App.css';

function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4">
      {/* Placeholder para o Logo */}
      <div className="mb-8 w-32 h-32 bg-gray-200 flex items-center justify-center text-gray-500 rounded-full">
        Logo
      </div>

      {/* Formulário de Login */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg space-y-6">
        {/* Campo de E-mail */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          <input 
            type="email" 
            placeholder="E-mail"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full text-lg focus:ring-light-blue focus:border-light-blue"
          />
        </div>

        {/* Campo de Senha */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          <input 
            type="password" 
            placeholder="Senha"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full text-lg focus:ring-light-blue focus:border-light-blue"
          />
        </div>

        {/* Seletor de Perfil */}
        <div className="flex justify-around space-x-2 pt-2">
          <button className="flex-1 bg-gray-200 hover:bg-light-blue text-gray-700 hover:text-white font-semibold py-3 px-4 rounded-full text-lg transition duration-150 ease-in-out items-center justify-center">
            <User className="mr-2 w-5 h-5" /> Aluno
          </button>
          <button className="flex-1 bg-gray-200 hover:bg-light-blue text-gray-700 hover:text-white font-semibold py-3 px-4 rounded-full text-lg transition duration-150 ease-in-out items-center justify-center">
            <BookOpen className="mr-2 w-5 h-5" /> Professor
          </button>
          <button className="flex-1 bg-gray-200 hover:bg-light-blue text-gray-700 hover:text-white font-semibold py-3 px-4 rounded-full text-lg transition duration-150 ease-in-out items-center justify-center">
            <Users className="mr-2 w-5 h-5" /> Gestor
          </button>
        </div>

        {/* Botão Entrar */}
        <button className="w-full bg-light-blue hover:bg-blue-500 text-white font-bold py-4 px-4 rounded-full text-xl transition duration-150 ease-in-out">
          Entrar
        </button>

        {/* Esqueci minha senha */}
        <div className="text-center">
          <a href="#" className="text-sm text-light-blue hover:text-blue-600 font-semibold">
            Esqueci minha senha
          </a>
        </div>

        {/* Links de Cadastro e Suporte */}
        <div className="text-center text-sm text-gray-600 pt-4">
          Não tem uma conta? <a href="#" className="font-semibold text-light-blue hover:text-blue-600">Criar conta</a>
          <span className="mx-2">|</span>
          <a href="#" className="font-semibold text-light-blue hover:text-blue-600">Suporte</a>
        </div>
      </div>
    </div>
  );
}

function App() {
  return <LoginPage />;
}

export default App;

