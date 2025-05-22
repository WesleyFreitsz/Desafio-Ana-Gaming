// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Rotas que não precisam de autenticação
const publicRoutes = ['/', '/sports', '/sports/[sport]', '/match/[id]', '/api/auth'];

// Middleware para proteção de rotas
export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  // Verifica se a rota atual é pública
  const isPublicRoute = publicRoutes.some(route => {
    if (route.includes('[') && route.includes(']')) {
      // Para rotas dinâmicas, verificamos o padrão
      const pattern = route.replace(/\[.*?\]/g, '[^/]+');
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(pathname);
    }
    // Para rotas de API de autenticação
    if (route === '/api/auth' && pathname.startsWith('/api/auth/')) {
      return true;
    }
    return pathname === route;
  });

  // Se for uma rota pública, permite o acesso
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Se não estiver autenticado e tentar acessar uma rota protegida, redireciona para login
  if (!session) {
    const url = new URL('/api/auth/signin', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  // Se estiver autenticado, permite o acesso
  return NextResponse.next();
}

// Configuração para aplicar o middleware apenas em rotas específicas
export const config = {
  matcher: [
    // Aplica a todas as rotas exceto arquivos estáticos e API routes
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
