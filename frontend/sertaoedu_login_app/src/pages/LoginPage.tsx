import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserCircle, School, Building } from 'lucide-react';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('aluno'); // Default to 'aluno'
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validação simples
    if (!username || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    // Lógica de login condicional baseada no perfil e credenciais
    if (profile === 'professor' && username === 'professor' && password === 'professor') {
      // Redirecionar para o dashboard do professor
      navigate('/professor');
    } else if (profile === 'aluno' && username === 'aluno' && password === 'aluno') {
      // Redirecionar para o dashboard do aluno
      navigate('/aluno');
    } else {
      // Credenciais inválidas
      setError('Usuário ou senha incorretos para o perfil selecionado.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center shadow-md">
            <div className="text-3xl font-bold">
              <span className="text-teal-500">Sertão</span>
              <span className="text-cyan-600">Edu</span>
            </div>
          </div>
        </div>

        {/* Formulário de Login */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Bem-vindo(a)</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            {/* Seletor de Perfil */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Perfil</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                    profile === 'aluno' 
                      ? 'border-teal-500 bg-teal-50 text-teal-700' 
                      : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                  }`}
                  onClick={() => setProfile('aluno')}
                >
                  <UserCircle className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">Aluno</span>
                </button>
                <button
                  type="button"
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                    profile === 'professor' 
                      ? 'border-teal-500 bg-teal-50 text-teal-700' 
                      : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                  }`}
                  onClick={() => setProfile('professor')}
                >
                  <School className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">Professor</span>
                </button>
                <button
                  type="button"
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                    profile === 'gestor' 
                      ? 'border-teal-500 bg-teal-50 text-teal-700' 
                      : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                  }`}
                  onClick={() => setProfile('gestor')}
                >
                  <Building className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">Gestor</span>
                </button>
              </div>
            </div>
            
            {/* Campo de Email/Usuário */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                Email ou Usuário
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Digite seu email ou usuário"
                />
              </div>
            </div>
            
            {/* Campo de Senha */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Digite sua senha"
                />
              </div>
            </div>
            
            {/* Botão de Entrar */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            >
              Entrar
            </button>
            
            {/* Link para Esqueci Minha Senha */}
            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-teal-600 hover:text-teal-800">
                Esqueci minha senha
              </a>
            </div>
          </form>
        </div>
        
        {/* Links Adicionais */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-600">
            Não tem uma conta? <a href="#" className="text-teal-600 hover:text-teal-800 font-medium">Cadastre-se</a>
          </p>
          <p className="text-sm text-gray-600">
            <a href="#" className="text-teal-600 hover:text-teal-800">Precisa de ajuda?</a>
          </p>
        </div>
      </div>
    </div>
  );
}
