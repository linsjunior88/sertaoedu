-- CreateTable
CREATE TABLE "CompetenciaBNCC" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ensino" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompetenciaBNCC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisciplinaBNCC" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "ano" TEXT NOT NULL,
    "unidades_tematicas" TEXT[],
    "objetos_conhecimento" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DisciplinaBNCC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HabilidadeBNCC" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "disciplinaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HabilidadeBNCC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trilha" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "serie" TEXT NOT NULL,
    "disciplina" TEXT NOT NULL,
    "bimestre" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trilha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topico" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "codigoBNCC" TEXT,
    "descricaoBNCC" TEXT,
    "trilhaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanoAula" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "serie" TEXT NOT NULL,
    "disciplina" TEXT NOT NULL,
    "bimestre" INTEGER NOT NULL,
    "objetivos" TEXT[],
    "conteudo" TEXT[],
    "metodologia" TEXT[],
    "avaliacao" TEXT[],
    "trilhaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanoAula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atividade" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "codigoBNCC" TEXT,
    "descricaoBNCC" TEXT,
    "planoAulaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Atividade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompetenciaBNCC_nome_ensino_key" ON "CompetenciaBNCC"("nome", "ensino");

-- CreateIndex
CREATE UNIQUE INDEX "DisciplinaBNCC_codigo_ano_key" ON "DisciplinaBNCC"("codigo", "ano");

-- CreateIndex
CREATE UNIQUE INDEX "HabilidadeBNCC_codigo_key" ON "HabilidadeBNCC"("codigo");

-- AddForeignKey
ALTER TABLE "HabilidadeBNCC" ADD CONSTRAINT "HabilidadeBNCC_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "DisciplinaBNCC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topico" ADD CONSTRAINT "Topico_trilhaId_fkey" FOREIGN KEY ("trilhaId") REFERENCES "Trilha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanoAula" ADD CONSTRAINT "PlanoAula_trilhaId_fkey" FOREIGN KEY ("trilhaId") REFERENCES "Trilha"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atividade" ADD CONSTRAINT "Atividade_planoAulaId_fkey" FOREIGN KEY ("planoAulaId") REFERENCES "PlanoAula"("id") ON DELETE RESTRICT ON UPDATE CASCADE; 