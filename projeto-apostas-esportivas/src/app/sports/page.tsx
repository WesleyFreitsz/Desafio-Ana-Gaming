// src/app/sports/page.tsx
// Página de Esportes - Lista de esportes disponíveis
import { Suspense } from 'react';
import Link from 'next/link';

export default function SportsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Esportes Disponíveis</h1>
      
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar esporte..."
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<div>Carregando esportes...</div>}>
          {/* Aqui serão listados os esportes disponíveis */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="ml-4 text-xl font-semibold">Futebol</h2>
            </div>
            <p className="text-gray-600 mb-4">Campeonatos nacionais e internacionais de futebol.</p>
            <Link href="/sports/soccer" className="text-blue-600 font-medium hover:text-blue-800">
              Ver ligas →
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="ml-4 text-xl font-semibold">Basquete</h2>
            </div>
            <p className="text-gray-600 mb-4">NBA, FIBA e outras competições de basquete.</p>
            <Link href="/sports/basketball" className="text-orange-600 font-medium hover:text-orange-800">
              Ver ligas →
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="ml-4 text-xl font-semibold">Tênis</h2>
            </div>
            <p className="text-gray-600 mb-4">Grand Slams e torneios ATP/WTA de tênis.</p>
            <Link href="/sports/tennis" className="text-green-600 font-medium hover:text-green-800">
              Ver ligas →
            </Link>
          </div>
        </Suspense>
      </div>
    </main>
  );
}
