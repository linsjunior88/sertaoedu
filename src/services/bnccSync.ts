import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const BNCC_API_BASE = "https://cientificar1992.pythonanywhere.com";

interface BNCCCompetenciaResponse {
  comp_gerais: {
    nome_competencia: string;
    competencias: string[];
  };
  comp_fundamental: Record<string, {
    nome_competencia: string;
    competencias: string[];
  }>;
  comp_medio: Record<string, {
    nome_competencia: string;
    competencias: string[];
  }>;
}

interface BNCCDisciplinaResponse {
  nome_disciplina: string;
  ano: Array<{
    nome_ano: string[];
    unidades_tematicas?: Array<{
      nome: string;
      objetos_conhecimento: Array<{
        nome: string;
        habilidades: Array<{
          codigo: string;
          descricao: string;
        }>;
      }>;
    }>;
    codigo_habilidade?: Array<{
      codigo: string;
      descricao: string;
    }>;
  }>;
}

export class BNCCSyncService {
  private async fetchBNCCData<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BNCC_API_BASE}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados da BNCC: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(`Resposta da API para ${endpoint}:`, data);
    return data;
  }

  async syncCompetencias(): Promise<void> {
    try {
      const competenciasData = await this.fetchBNCCData<BNCCCompetenciaResponse>("/bncc_competencias/");

      // Competências Gerais
      for (const [idx, descricao] of competenciasData.comp_gerais.competencias.entries()) {
        await prisma.competenciaBNCC.upsert({
          where: { id: `geral_${idx+1}` },
          update: {
            descricao,
            tipo: "geral",
            area: "geral",
          },
          create: {
            id: `geral_${idx+1}`,
            descricao,
            tipo: "geral",
            area: "geral",
          },
        });
      }

      // Competências Fundamentais
      for (const [areaKey, areaObj] of Object.entries(competenciasData.comp_fundamental)) {
        for (const [idx, descricao] of areaObj.competencias.entries()) {
          await prisma.competenciaBNCC.upsert({
            where: { id: `fundamental_${areaKey}_${idx+1}` },
            update: {
              descricao,
              tipo: "especifica",
              area: areaKey,
            },
            create: {
              id: `fundamental_${areaKey}_${idx+1}`,
              descricao,
              tipo: "especifica",
              area: areaKey,
            },
          });
        }
      }

      // Competências do Médio
      for (const [areaKey, areaObj] of Object.entries(competenciasData.comp_medio)) {
        for (const [idx, descricao] of areaObj.competencias.entries()) {
          await prisma.competenciaBNCC.upsert({
            where: { id: `medio_${areaKey}_${idx+1}` },
            update: {
              descricao,
              tipo: "especifica",
              area: areaKey,
            },
            create: {
              id: `medio_${areaKey}_${idx+1}`,
              descricao,
              tipo: "especifica",
              area: areaKey,
            },
          });
        }
      }

      console.log("Competências sincronizadas com sucesso");
    } catch (error) {
      console.error("Erro ao sincronizar competências:", error);
      throw error;
    }
  }

  async syncDisciplina(disciplina: string, nivel: "fundamental" | "medio"): Promise<void> {
    try {
      const endpoint = `/bncc_${nivel}/disciplina/${disciplina}/`;
      const data = await this.fetchBNCCData<BNCCDisciplinaResponse>(endpoint);

      for (const anoData of data.ano) {
        const ano = Array.isArray(anoData.nome_ano) ? anoData.nome_ano[0] : "medio";
        
        // Caso Fundamental (com unidades_tematicas)
        if (Array.isArray(anoData.unidades_tematicas)) {
          for (const unidade of anoData.unidades_tematicas) {
            if (!Array.isArray(unidade.objetos_conhecimento)) continue;
            for (const objeto of unidade.objetos_conhecimento) {
              for (const habilidade of objeto.habilidades) {
                await prisma.disciplinaBNCC.upsert({
                  where: { 
                    codigo_ano: {
                      codigo: habilidade.codigo.split(".")[0],
                      ano
                    }
                  },
                  update: {
                    nome: data.nome_disciplina,
                    area: disciplina,
                    unidades_tematicas: [unidade.nome],
                    objetos_conhecimento: [objeto.nome],
                    habilidades: {
                      upsert: {
                        where: { codigo: habilidade.codigo },
                        update: { descricao: habilidade.descricao },
                        create: { 
                          codigo: habilidade.codigo,
                          descricao: habilidade.descricao
                        }
                      }
                    }
                  },
                  create: {
                    codigo: habilidade.codigo.split(".")[0],
                    nome: data.nome_disciplina,
                    area: disciplina,
                    ano,
                    unidades_tematicas: [unidade.nome],
                    objetos_conhecimento: [objeto.nome],
                    habilidades: {
                      create: {
                        codigo: habilidade.codigo,
                        descricao: habilidade.descricao
                      }
                    }
                  }
                });
              }
            }
          }
        } else if (Array.isArray(anoData.codigo_habilidade)) {
          // Caso Médio (com codigo_habilidade)
          for (const habilidade of anoData.codigo_habilidade) {
            if (!habilidade.codigo) {
              console.warn('Habilidade sem código encontrada:', habilidade);
              continue;
            }

            const codigoBase = habilidade.codigo.includes(".") 
              ? habilidade.codigo.split(".")[0] 
              : habilidade.codigo;

            await prisma.disciplinaBNCC.upsert({
              where: {
                codigo_ano: {
                  codigo: codigoBase,
                  ano
                }
              },
              update: {
                nome: data.nome_disciplina,
                area: disciplina,
                unidades_tematicas: [],
                objetos_conhecimento: [],
                habilidades: {
                  upsert: {
                    where: { codigo: habilidade.codigo },
                    update: { descricao: habilidade.descricao },
                    create: {
                      codigo: habilidade.codigo,
                      descricao: habilidade.descricao
                    }
                  }
                }
              },
              create: {
                codigo: codigoBase,
                nome: data.nome_disciplina,
                area: disciplina,
                ano,
                unidades_tematicas: [],
                objetos_conhecimento: [],
                habilidades: {
                  create: {
                    codigo: habilidade.codigo,
                    descricao: habilidade.descricao
                  }
                }
              }
            });
          }
        } else {
          // Log para facilitar futuros ajustes
          console.warn('Estrutura de anoData não reconhecida:', JSON.stringify(anoData, null, 2));
        }
      }

      console.log(`Disciplina ${disciplina} sincronizada com sucesso`);
    } catch (error) {
      console.error(`Erro ao sincronizar disciplina ${disciplina}:`, error);
      throw error;
    }
  }

  async syncAll(): Promise<void> {
    try {
      // Sincroniza competências
      await this.syncCompetencias();

      // Sincroniza disciplinas do Fundamental
      const disciplinasFundamental = [
        "lingua_portuguesa",
        "arte",
        "educacao_fisica",
        "lingua_inglesa",
        "matematica",
        "ciencias",
        "geografia",
        "historia",
        "ensino_religioso",
        "computacao"
      ];

      for (const disciplina of disciplinasFundamental) {
        await this.syncDisciplina(disciplina, "fundamental");
      }

      // Sincroniza disciplinas do Médio
      const disciplinasMedio = [
        "linguagens",
        "matematica_medio",
        "ciencias_natureza",
        "ciencias_humanas",
        "lingua_portuguesa_medio",
        "computacao_medio"
      ];

      for (const disciplina of disciplinasMedio) {
        await this.syncDisciplina(disciplina, "medio");
      }

      console.log("Sincronização completa realizada com sucesso");
    } catch (error) {
      console.error("Erro na sincronização completa:", error);
      throw error;
    }
  }
} 