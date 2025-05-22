// src/app/sports/page.tsx
// Página de Esportes - Lista de esportes disponíveis
import { Suspense } from 'react';
import Link from 'next/link';
import { getSports } from '@/lib/api';


  
  // Agrupar esportes por categoria
  const groupedSports = sports.reduce((acc: any, sport: any) => {
    const group = sport.group;
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(sport);
    return acc;
  }, {});

  // Cores para diferentes categorias de esportes
  const colorMap: Record<string, { bg: string, text: string, hover: string }> = {
    'soccer': { bg: 'bg-blue-100', text: 'text-blue-600', hover: 'hover:text-blue-800' },
    'basketball': { bg: 'bg-orange-100', text: 'text-orange-600', hover: 'hover:text-orange-800' },
    'tennis': { bg: 'bg-green-100', text: 'text-green-600', hover: 'hover:text-green-800' },
    'baseball': { bg: 'bg-red-100', text: 'text-red-600', hover: 'hover:text-red-800' },
    'hockey': { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:text-purple-800' },
    'football': { bg: 'bg-yellow-100', text: 'text-yellow-700', hover: 'hover:text-yellow-900' },
    'default': { bg: 'bg-gray-100', text: 'text-gray-600', hover: 'hover:text-gray-800' }
  };

  // Ícones para diferentes categorias de esportes (SVG paths)
  const iconMap: Record<string, string> = {
    'soccer': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-3.5l6-4.5-6-4.5v9z',
    'basketball': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z',
    'tennis': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm8-1.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5z',
    'default': 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(groupedSports).map(([group, sportsList]: [string, any]) => (
        <div key={group} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <div className="flex items-center mb-4">
            <div className={`${colorMap[group]?.bg || colorMap.default.bg} p-3 rounded-full`}>
              <svg 
                className={`h-6 w-6 ${colorMap[group]?.text || colorMap.default.text}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={iconMap[group] || iconMap.default} 
                />
              </svg>
            </div>
            <h2 className="ml-4 text-xl font-semibold capitalize">{group}</h2>
          </div>
          <p className="text-gray-600 mb-4">
            {sportsList.length} {sportsList.length === 1 ? 'liga disponível' : 'ligas disponíveis'}
          </p>
          <Link 
            href={`/sports/${group}`} 
            className={`${colorMap[group]?.text || colorMap.default.text} font-medium ${colorMap[group]?.hover || colorMap.default.hover}`}
          >
            Ver ligas →
          </Link>
        </div>
      ))}
    </div>
  );
}

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
      
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 p-3 rounded-full h-12 w-12"></div>
                <div className="ml-4 h-5 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      }>
        <SportsList />
      </Suspense>
    </main>
  );
}
