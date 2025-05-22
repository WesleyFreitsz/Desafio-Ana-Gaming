// src/app/page.tsx
// Home/Dashboard - Página inicial
import { Suspense } from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Plataforma de Visualização de Apostas Esportivas</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Categorias de Esportes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Suspense fallback={<div>Carregando categorias...</div>}>
            {/* Aqui serão exibidas as categorias de esportes */}
            <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
              <h3 className="text-xl font-medium">Futebol</h3>
              <p className="text-gray-600 mt-2">Campeonatos nacionais e internacionais</p>
              <Link href="/sports/soccer" className="text-blue-600 mt-2 inline-block">
                Ver ligas
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
              <h3 className="text-xl font-medium">Basquete</h3>
              <p className="text-gray-600 mt-2">NBA, FIBA e outras competições</p>
              <Link href="/sports/basketball" className="text-blue-600 mt-2 inline-block">
                Ver ligas
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
              <h3 className="text-xl font-medium">Tênis</h3>
              <p className="text-gray-600 mt-2">Grand Slams e torneios ATP/WTA</p>
              <Link href="/sports/tennis" className="text-blue-600 mt-2 inline-block">
                Ver ligas
              </Link>
            </div>
          </Suspense>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Jogos Recentes</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <Suspense fallback={<div>Carregando jogos recentes...</div>}>
            {/* Aqui serão exibidos os jogos recentes */}
            <p className="text-gray-500">Carregando dados de jogos recentes...</p>
          </Suspense>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Próximos Jogos</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <Suspense fallback={<div>Carregando próximos jogos...</div>}>
            {/* Aqui serão exibidos os próximos jogos */}
            <p className="text-gray-500">Carregando dados de próximos jogos...</p>
          </Suspense>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Melhores Odds</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <Suspense fallback={<div>Carregando melhores odds...</div>}>
            {/* Aqui serão exibidas as melhores odds */}
            <p className="text-gray-500">Carregando dados de melhores odds...</p>
          </Suspense>
        </div>
      </section>
    </main>
  );
}
