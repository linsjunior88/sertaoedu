import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = [
    "/",
    "/professor/login",
    "/aluno/login",
    "/professor/register",
    "/aluno/register",
  ];

  // Rotas que devem ser ignoradas pelo middleware
  const ignoredRoutes = [
    "/_next",
    "/api",
    "/favicon.ico",
    "/images",
    "/styles",
  ];

  // Verifica se a rota atual é uma rota ignorada
  if (ignoredRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Verifica se a rota atual é uma rota pública
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Verifica se o usuário está tentando acessar o dashboard do professor
  if (pathname.startsWith("/dashboard/professor")) {
    const user = request.cookies.get("user");
    if (!user) {
      return NextResponse.redirect(new URL("/professor/login", request.url));
    }
  }

  // Verifica se o usuário está tentando acessar o dashboard do aluno
  if (pathname.startsWith("/dashboard/aluno")) {
    const user = request.cookies.get("user");
    if (!user) {
      return NextResponse.redirect(new URL("/aluno/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}; 