// src/app/auth/signin/page.tsx
import { getProviders } from 'next-auth/react';
import SignInComponent from '@/components/auth/SignInComponent';

export default async function SignIn() {
  const providers = await getProviders();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 text-white text-center">
          <h1 className="text-3xl font-bold">Bem-vindo ao BetView</h1>
          <p className="mt-2 text-blue-100">Faça login para acessar a plataforma</p>
        </div>
        
        <div className="p-6">
          <SignInComponent providers={providers} />
        </div>
      </div>
    </div>
  );
}
