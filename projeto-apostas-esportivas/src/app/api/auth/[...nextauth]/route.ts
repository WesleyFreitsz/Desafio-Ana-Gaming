import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
    } & DefaultSession["user"];
  }
}

// Configuração do provedor de autenticação GitHub
const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "seu-github-client-id",
      clientSecret: process.env.GITHUB_SECRET || "seu-github-client-secret",
    }),
  ],
  // Páginas personalizadas
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  // Callbacks para personalizar o comportamento da autenticação
  callbacks: {
    async session({ session, token }) {
      // Adicionar informações do token à sessão
      if (token && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Adicionar informações do usuário ao token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  // Configurações de segurança
  secret: process.env.NEXTAUTH_SECRET || "seu-nextauth-secret",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
});

export { handler as GET, handler as POST };
