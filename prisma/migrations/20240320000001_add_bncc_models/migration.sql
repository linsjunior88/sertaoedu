-- CreateTable
CREATE TABLE "UnidadeTematica" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "serie" TEXT NOT NULL,
    "disciplina" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UnidadeTematica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObjetoConhecimento" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "unidadeTematicaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ObjetoConhecimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habilidade" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "objetoConhecimentoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Habilidade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UnidadeTematica_nome_serie_disciplina_key" ON "UnidadeTematica"("nome", "serie", "disciplina");

-- CreateIndex
CREATE UNIQUE INDEX "ObjetoConhecimento_nome_unidadeTematicaId_key" ON "ObjetoConhecimento"("nome", "unidadeTematicaId");

-- CreateIndex
CREATE UNIQUE INDEX "Habilidade_codigo_objetoConhecimentoId_key" ON "Habilidade"("codigo", "objetoConhecimentoId");

-- AddForeignKey
ALTER TABLE "ObjetoConhecimento" ADD CONSTRAINT "ObjetoConhecimento_unidadeTematicaId_fkey" FOREIGN KEY ("unidadeTematicaId") REFERENCES "UnidadeTematica"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habilidade" ADD CONSTRAINT "Habilidade_objetoConhecimentoId_fkey" FOREIGN KEY ("objetoConhecimentoId") REFERENCES "ObjetoConhecimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE; 