import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-6xl p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bem-vindo ao SertãoEdu
          </h1>
          <p className="text-lg text-gray-600">
            Plataforma educacional com trilhas BNCC e geração de planos de aula com IA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/professor/login"
            className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold text-blue-600 mb-3">
                Área do Professor
              </h2>
              <p className="text-gray-600 text-sm">
                Acesse sua área para gerenciar suas turmas e conteúdos
              </p>
            </div>
          </Link>

          <Link
            href="/aluno/login"
            className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold text-green-600 mb-3">
                Área do Aluno
              </h2>
              <p className="text-gray-600 text-sm">
                Acesse sua área para ver seus cursos e atividades
              </p>
            </div>
          </Link>

          <Link
            href="/trilhas"
            className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold text-purple-600 mb-3">
                Trilhas BNCC
              </h2>
              <p className="text-gray-600 text-sm">
                Crie trilhas personalizadas baseadas na BNCC
              </p>
            </div>
          </Link>

          <Link
            href="/planos-aula"
            className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold text-orange-600 mb-3">
                Planos de Aula IA
              </h2>
              <p className="text-gray-600 text-sm">
                Gere planos de aula completos com inteligência artificial
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Desenvolvido para educadores do Sertão - Tecnologia a serviço da educação
          </p>
        </div>
      </div>
    </div>
  );
}
