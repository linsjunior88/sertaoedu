import { z } from 'zod';
import { router, publicProcedure } from '@/lib/trpc';
import { prisma } from '@/lib/prisma';

export const tracksRouter = router({
  // Listar trilhas por série e disciplina
  list: publicProcedure
    .input(
      z.object({
        grade: z.string(),
        subject: z.string(),
      })
    )
    .query(async ({ input }) => {
      return prisma.learningTrack.findMany({
        where: {
          grade: input.grade,
          subject: input.subject,
        },
        include: {
          topics: {
            orderBy: {
              order: 'asc',
            },
          },
        },
      });
    }),

  // Criar nova trilha
  create: publicProcedure
    .input(
      z.object({
        grade: z.string(),
        subject: z.string(),
        title: z.string(),
        description: z.string(),
        topics: z.array(
          z.object({
            title: z.string(),
            order: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      return prisma.learningTrack.create({
        data: {
          grade: input.grade,
          subject: input.subject,
          title: input.title,
          description: input.description,
          topics: {
            create: input.topics,
          },
        },
        include: {
          topics: true,
        },
      });
    }),

  // Atualizar trilha existente
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        topics: z
          .array(
            z.object({
              id: z.string().optional(),
              title: z.string(),
              order: z.number(),
            })
          )
          .optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, topics, ...data } = input;

      if (topics) {
        // Primeiro, remova todos os tópicos existentes
        await prisma.topic.deleteMany({
          where: { learningTrackId: id },
        });

        // Depois, crie os novos tópicos
        await prisma.topic.createMany({
          data: topics.map((topic) => ({
            ...topic,
            learningTrackId: id,
          })),
        });
      }

      return prisma.learningTrack.update({
        where: { id },
        data,
        include: {
          topics: {
            orderBy: {
              order: 'asc',
            },
          },
        },
      });
    }),
}); 