'use client';

// src/app/page.tsx
// Home/Dashboard - Página inicial
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Tipos para os dados
interface Sport {
  key: string;
  name: string;
  description: string;
  color: string;
}

interface Game {
  id: string;
  home_team: string;
  away_team: string;
  sport_key?: string;
  sport_title?: string;
  commence_time: string;
  bookmakers?: any[];
  scores?: {
    home: number;
    away: number;
  };
}

export default function Home() {
  // Estados para armazenar dados
  const [isLoading, setIsLoading] = useState(true);
  const [recentGames, setRecentGames] = useState<Game[]>([]);
  const [upcomingGames, setUpcomingGames] = useState<Game[]>([]);
  const [bestOdds, setBestOdds] = useState<Game[]>([]);

  // Esportes principais (dados estáticos)
  const mainSports: Sport[] = [
    { key: 'soccer', name: 'Futebol', description: 'Campeonatos nacionais e internacionais', color: 'blue' },
    { key: 'basketball', name: 'Basquete', description: 'NBA, FIBA e outras competições', color: 'orange' },
    { key: 'tennis', name: 'Tênis', description: 'Grand Slams e torneios ATP/WTA', color: 'green' }
  ];

  // Função para formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Função para obter nome do esporte pela chave
  const getSportNameByKey = (sportKey: string): string => {
    if (!sportKey) return '';
    
    if (sportKey.includes('soccer')) return 'Futebol';
    if (sportKey.includes('basketball')) return 'Basquete';
    if (sportKey.includes('tennis')) return 'Tênis';
    if (sportKey.includes('baseball')) return 'Beisebol';
    if (sportKey.includes('hockey')) return 'Hóquei';
    if (sportKey.includes('football')) return 'Futebol Americano';
    
    return sportKey.split('_')[0].charAt(0).toUpperCase() + sportKey.split('_')[0].slice(1);
  };

  // Buscar dados ao carregar o componente
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Buscar jogos recentes
        const recentResponse = await Promise.all([
          fetch('/api/games/recent?sport=soccer_epl&limit=1').then(res => res.json()),
          fetch('/api/games/recent?sport=basketball_nba&limit=1').then(res => res.json()),
          fetch('/api/games/recent?sport=tennis_atp&limit=1').then(res => res.json())
        ]);
        
        // Buscar próximos jogos
        const upcomingResponse = await Promise.all([
          fetch('/api/games/upcoming?sport=soccer_epl&limit=1').then(res => res.json()),
          fetch('/api/games/upcoming?sport=basketball_nba&limit=1').then(res => res.json()),
          fetch('/api/games/upcoming?sport=tennis_atp&limit=1').then(res => res.json())
        ]);
        
        // Combinar resultados
        const allRecentGames = recentResponse.flat();
        const allUpcomingGames = upcomingResponse.flat();
        
        // Filtrar jogos com odds para melhores odds
        const gamesWithOdds = allUpcomingGames
          .filter(game => game.bookmakers && game.bookmakers.length > 0)
          .sort((a, b) => {
            // Ordenar por jogos com odds mais equilibradas
            const aBookmaker = a.bookmakers[0];
            const bBookmaker = b.bookmakers[0];
            
            if (!aBookmaker || !bBookmaker) return 0;
            
            const aMarket = aBookmaker.markets.find(m => m.key === 'h2h') || aBookmaker.markets[0];
            const bMarket = bBookmaker.markets.find(m => m.key === 'h2h') || bBookmaker.markets[0];
            
            if (!aMarket || !bMarket) return 0;
            
            // Calcular a diferença entre as odds mais alta e mais baixa
            const aOdds = aMarket.outcomes.map(o => o.price);
            const bOdds = bMarket.outcomes.map(o => o.price);
            
            const aDiff = Math.max(...aOdds) - Math.min(...aOdds);
            const bDiff = Math.max(...bOdds) - Math.min(...bOdds);
            
            // Quanto menor a diferença, mais equilibrado o jogo
            return aDiff - bDiff;
          });
        
        setRecentGames(allRecentGames);
        setUpcomingGames(allUpcomingGames);
        setBestOdds(gamesWithOdds.slice(0, 3));
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        // Usar dados de fallback em caso de erro
        setRecentGames([
          { id: '1', home_team: 'Flamengo', away_team: 'Palmeiras', sport_key: 'soccer_brazil_campeonato', commence_time: '2025-05-20T19:00:00Z' },
          { id: '2', home_team: 'Lakers', away_team: 'Celtics', sport_key: 'basketball_nba', commence_time: '2025-05-21T23:30:00Z' }
        ]);
        setUpcomingGames([
          { id: '3', home_team: 'São Paulo', away_team: 'Corinthians', sport_key: 'soccer_brazil_campeonato', commence_time: '2025-05-25T19:00:00Z' },
          { id: '4', home_team: 'Warriors', away_team: 'Bucks', sport_key: 'basketball_nba', commence_time: '2025-05-26T23:30:00Z' }
        ]);
        setBestOdds([
          { id: '5', home_team: 'Nadal', away_team: 'Djokovic', sport_key: 'tennis_atp', commence_time: '2025-05-27T14:00:00Z' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Renderizar componente de categorias de esportes
  const renderSportCategories = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mainSports.map((sport) => (
          <div key={sport.key} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
            <h3 className="text-xl font-medium">{sport.name}</h3>
            <p className="text-gray-600 mt-2">{sport.description}</p>
            <Link href={`/sports/${sport.key}`} className={`text-${sport.color}-600 mt-2 inline-block`}>
              Ver ligas
            </Link>
          </div>
        ))}
      </div>
    );
  };

  // Renderizar componente de jogos recentes
  const renderRecentGames = () => {
    if (isLoading) {
      return (
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      );
    }

    if (recentGames.length === 0) {
      return <p className="text-gray-500">Nenhum jogo recente disponível no momento.</p>;
    }

    return (
      <div className="space-y-4">
        {recentGames.map((game) => (
          <div key={game.id} className="border-b pb-4 last:border-0 last:pb-0">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{game.home_team} vs {game.away_team}</p>
                <p className="text-sm text-gray-500">
                  {game.sport_title || getSportNameByKey(game.sport_key || '') || 'Liga Principal'}
                </p>
              </div>
              <Link href={`/match/${game.id}`} className="text-blue-600 hover:text-blue-800">
                Ver detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Renderizar componente de próximos jogos
  const renderUpcomingGames = () => {
    if (isLoading) {
      return (
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      );
    }

    if (upcomingGames.length === 0) {
      return <p className="text-gray-500">Nenhum jogo futuro disponível no momento.</p>;
    }

    return (
      <div className="space-y-4">
        {upcomingGames.map((game) => (
          <div key={game.id} className="border-b pb-4 last:border-0 last:pb-0">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{game.home_team} vs {game.away_team}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(game.commence_time)}
                </p>
                <p className="text-sm text-gray-500">
                  {game.sport_title || getSportNameByKey(game.sport_key || '') || 'Liga Principal'}
                </p>
              </div>
              <Link href={`/match/${game.id}`} className="text-blue-600 hover:text-blue-800">
                Ver detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Renderizar componente de melhores odds
  const renderBestOdds = () => {
    if (isLoading) {
      return (
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      );
    }

    if (bestOdds.length === 0) {
      return <p className="text-gray-500">Nenhuma odd disponível no momento.</p>;
    }

    return (
      <div className="space-y-4">
        {bestOdds.map((game) => {
          // Extrair odds para exibição
          let oddsDisplay = '';
          if (game.bookmakers && game.bookmakers.length > 0) {
            const bookmaker = game.bookmakers[0];
            if (bookmaker.markets && bookmaker.markets.length > 0) {
              const market = bookmaker.markets.find(m => m.key === 'h2h') || bookmaker.markets[0];
              if (market && market.outcomes) {
                oddsDisplay = market.outcomes.map(o => `${o.name}: ${o.price.toFixed(2)}`).join(' | ');
              }
            }
          }
          
          return (
            <div key={game.id} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{game.home_team} vs {game.away_team}</p>
                  <p className="text-sm text-gray-500">
                    {game.sport_title || getSportNameByKey(game.sport_key || '') || 'Liga Principal'}
                  </p>
                  <p className="text-sm font-medium mt-1">{oddsDisplay}</p>
                </div>
                <Link href={`/match/${game.id}`} className="text-blue-600 hover:text-blue-800">
                  Ver detalhes
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Plataforma de Visualização de Apostas Esportivas</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Categorias de Esportes</h2>
        {renderSportCategories()}
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Jogos Recentes</h2>
        <div className="bg-white rounded-lg shadow p-4">
          {renderRecentGames()}
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Próximos Jogos</h2>
        <div className="bg-white rounded-lg shadow p-4">
          {renderUpcomingGames()}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Melhores Odds</h2>
        <div className="bg-white rounded-lg shadow p-4">
          {renderBestOdds()}
        </div>
      </section>
    </main>
  );
}
