
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// Importar o novo cliente e tipos da API
import { Match, getOddsAPIClient } from '@/lib/api/betsapi'; 

export default function Home() {
  const [isLoadingFeaturedMatches, setIsLoadingFeaturedMatches] = useState(true);
  const [featuredMatches, setFeaturedMatches] = useState<Match[]>([]);
  const [errorFeaturedMatches, setErrorFeaturedMatches] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedMatches = async () => {
      try {
        setIsLoadingFeaturedMatches(true);
        setErrorFeaturedMatches(null); // Reset error state
        
        const apiClient = getOddsAPIClient();
        // Buscar jogos de futebol em destaque (4 jogos das ligas principais)
        const matchesData = await apiClient.getFeaturedFootballMatches('eu', 'h2h', 4); 
        
        console.log('[HomePage] Featured football matches received:', matchesData);

        if (matchesData && matchesData.length > 0) {
          setFeaturedMatches(matchesData);
        } else {
          setFeaturedMatches([]);
          console.log('[HomePage] Nenhum jogo de futebol em destaque encontrado.');
        }
      } catch (err) {
        console.error('[HomePage] Error fetching featured football matches:', err);
        setErrorFeaturedMatches('Erro ao carregar os jogos em destaque. Verifique o console.');
        setFeaturedMatches([]);
      } finally {
        setIsLoadingFeaturedMatches(false);
      }
    };

    fetchFeaturedMatches();
  }, []);

  // Esportes em Destaque - Mostrar apenas Futebol, Basquete e Tênis
  // Atualizar hrefs para apontar para as páginas de grupo
  const SPORTS_DATA_DISPLAY = [
    { key: 'soccer', name: 'Futebol', icon: '⚽', active: true, href: '/sports/soccer' }, 
    { key: 'basketball', name: 'Basquete', icon: '🏀', active: true, href: '/sports/basketball' }, 
    { key: 'tennis', name: 'Tênis', icon: '🎾', active: true, href: '/sports/tennis' }, 
  ];

  return (
    <div className="container-custom">
      {/* Esportes em Destaque */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-6">Esportes em Destaque</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {SPORTS_DATA_DISPLAY.map((sport) => (
            <Link 
              key={sport.key} 
              href={sport.href} // Usar o href definido
              className={`card flex flex-col items-center justify-center py-8 ${!sport.active ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={(e) => !sport.active && e.preventDefault()} // Prevenir clique se inativo
            >
              <div className="text-4xl mb-4">{sport.icon}</div>
              <h3 className="text-xl font-semibold">{sport.name}</h3>
              {!sport.active && <span className="text-xs text-gray-500 mt-1">(Em breve)</span>}
            </Link>
          ))}
        </div>
      </section>

      {/* Próximos Jogos (Futebol em Destaque) */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Jogos de Futebol em Destaque</h2>
        
        {isLoadingFeaturedMatches ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">Carregando jogos...</p>
          </div>
        ) : errorFeaturedMatches ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-red-500">{errorFeaturedMatches}</p>
          </div>
        ) : featuredMatches.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">Nenhum jogo de futebol encontrado nas ligas em destaque no momento.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jogo / Liga
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data/Hora
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Casa
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Empate
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fora
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Casa de Apostas
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {featuredMatches.map((match) => (
                    <tr key={match.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link href={`/match/${match.id}?sport_key=${match.sport_key}`} className="text-green-800 hover:text-green-600 font-medium">
                          {match.homeTeam} vs {match.awayTeam}
                        </Link>
                        <div className="text-xs text-gray-500">{match.league}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {match.date} {match.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center font-medium">
                        {match.odds.home > 0 ? match.odds.home.toFixed(2) : '-'} 
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center font-medium">
                        {match.odds.draw !== null && match.odds.draw > 0 ? match.odds.draw.toFixed(2) : '-'} 
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center font-medium">
                        {match.odds.away > 0 ? match.odds.away.toFixed(2) : '-'} 
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {match.bookmaker}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

