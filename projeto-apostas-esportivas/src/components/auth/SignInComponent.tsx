'use client';

// src/components/auth/SignInComponent.tsx

import { signIn } from 'next-auth/react';
import { useState } from 'react';

interface SignInComponentProps {
  providers: Record<string, any> | null;
}

export default function SignInComponent({ providers }: SignInComponentProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (providerId: string) => {
    setIsLoading(true);
    await signIn(providerId, { callbackUrl: '/' });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-gray-600">
          Faça login com sua conta do GitHub para acessar todas as funcionalidades da plataforma.
        </p>
      </div>

      <div className="space-y-4">
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              key={provider.id}
              onClick={() => handleSignIn(provider.id)}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-lg font-medium transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              )}
              {isLoading ? 'Processando...' : `Entrar com ${provider.name}`}
            </button>
          ))}
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>
          Ao fazer login, você concorda com nossos{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Termos de Serviço
          </a>{' '}
          e{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Política de Privacidade
          </a>
          .
        </p>
      </div>
    </div>
  );
}
