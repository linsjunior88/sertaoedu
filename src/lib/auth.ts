import { authMiddleware } from "@clerk/nextjs";
import { prisma } from "./prisma";

export default authMiddleware({
  publicRoutes: ["/", "/login", "/register"],
  async afterAuth(auth, req) {
    // Se o usuário estiver autenticado, sincronize com o banco de dados
    if (auth.userId) {
      const user = await prisma.user.findUnique({
        where: { id: auth.userId },
      });

      if (!user) {
        // Cria um novo usuário no banco de dados
        await prisma.user.create({
          data: {
            id: auth.userId,
            email: auth.sessionClaims?.email as string,
            name: auth.sessionClaims?.name as string,
            role: "STUDENT", // Role padrão, pode ser alterado depois
          },
        });
      }
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 