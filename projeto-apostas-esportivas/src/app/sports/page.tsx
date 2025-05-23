
'use client';

import Link from 'next/link';

// Mapeamento de slugs de grupo para exibição
// Usaremos os slugs corretos da API ou grupos genéricos para os links
const SPORTS_DISPLAY_DATA = [
  { slug: 'soccer', name: 'Futebol', icon: '⚽' },
  { slug: 'basketball', name: 'Basquete', icon: '🏀' },
  { slug: 'tennis', name: 'Tênis', icon: '🎾' },
  { slug: 'volleyball', name: 'Vôlei', icon: '🏐' }, // Usar slug que corresponda ao grupo da API se existir, ou um genérico
  { slug: 'mma_mixed_martial_arts', name: 'MMA', icon: '🥊' }, // Verificar slug exato do grupo na API
  { slug: 'esports', name: 'eSports', icon: '🎮' }, // Verificar slug exato do grupo na API
];

export default function SportsPage() {
  return (
    <div className="container-custom">
      <h1 className="text-3xl font-bold mb-8">Esportes Disponíveis</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {SPORTS_DISPLAY_DATA.map((sport) => (
          <Link 
            key={sport.slug} 
            // Usar o slug correto no href para direcionar à página de listagem de ligas
            href={`/sports/${sport.slug}`}
            className="card flex flex-col items-center justify-center py-10 hover:bg-gray-50"
          >
            <div className="text-5xl mb-4">{sport.icon}</div>
            <h2 className="text-xl font-semibold">{sport.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

