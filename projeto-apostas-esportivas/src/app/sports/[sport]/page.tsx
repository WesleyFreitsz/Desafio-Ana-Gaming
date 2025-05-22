'use client';

// src/app/sports/[sport]/page.tsx
// Página de Ligas por Esporte
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface League {
  key: string;
  title: string;
  description?: string;
  has_outrights: boolean;
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

interface SportPageProps {
  params: {
    sport: string;
  };
}

export default function SportPage({ params }: SportPageProps) {
  const { sport } = params;
  const sportName = getSportName(sport);
  const sportKey = getSportKeyByName(sport) || 'soccer_epl'; // Fallback para futebol se não encontrar
  
  const [isLoading, setIsLoading] = useState(true);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [recentGames, setRecentGames] = useState<Game[]>([]);
  const [upcomingGames, setUpcomingGames] = useState<Game[]>([]);

  // Buscar dados ao carregar o componente
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Buscar ligas do esporte
        const leaguesResponse = await fetch(`/api/leagues?sport=${sport}`).then(res => res.json());
        
        // Buscar jogos recentes
        const recentGamesResponse = await fetch(`/api/games/recent?sport=${sportKey}&limit=3`).then(res => res.json());
        
        // Buscar próximos jogos
        const upcomingGamesResponse = await fetch(`/api/games/upcoming?sport=${sportKey}&limit=3`).then(res => res.json());
        
        setLeagues(leaguesResponse);
        setRecentGames(recentGamesResponse);
        setUpcomingGames(upcomingGamesResponse);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        // Usar dados de fallback em caso de erro
        setLeagues([
          { key: 'soccer_brazil_campeonato', title: 'Campeonato Brasileiro', has_outrights: false },
          { key: 'soccer_brazil_copa', title: 'Copa do Brasil', has_outrights: false },
          { key: 'soccer_conmebol_libertadores', title: 'Libertadores', has_outrights: false }
        ]);
        setRecentGames([
          { id: '1', home_team: 'Flamengo', away_team: 'Palmeiras', sport_key: sportKey, commence_time: '2025-05-20T19:00:00Z', scores: { home: 2, away: 1 } },
          { id: '2', home_team: 'São Paulo', away_team: 'Corinthians', sport_key: sportKey, commence_time: '2025-05-18T19:00:00Z', scores: { home: 0, away: 0 } }
        ]);
        setUpcomingGames([
          { id: '3', home_team: 'Fluminense', away_team: 'Botafogo', sport_key: sportKey, commence_time: '2025-05-25T19:00:00Z' },
          { id: '4', home_team: 'Grêmio', away_team: 'Internacional', sport_key: sportKey, commence_time: '2025-05-26T19:00:00Z' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sport, sportKey]);

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

  // Renderizar componente de ligas
  const renderLeagues = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (leagues.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">Nenhuma liga disponível para este esporte no momento.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leagues.slice(0, 6).map((league) => (
          <div key={league.key} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">{league.title}</h3>
            <p className="text-gray-600 mb-4">{league.description || `Liga de ${sportName}`}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{league.has_outrights ? 'Inclui apostas futuras' : 'Apenas jogos'}</span>
              <Link href={`/match/${league.key}`} className="text-blue-600 hover:text-blue-800">
                Ver jogos →
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Renderizar componente de jogos recentes
  const renderRecentGames = () => {
    if (isLoading) {
      return (
        <div className="p-4 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-full"></div>
        </div>
      );
    }

    if (recentGames.length === 0) {
      return (
        <div className="p-4 text-center">
          <p className="text-gray-500">Nenhum jogo recente disponível para este esporte.</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partida</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resultado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Liga</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentGames.map((game) => (
              <tr key={game.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(game.commence_time)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {game.home_team} vs {game.away_team}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {game.scores ? `${game.scores.home} - ${game.scores.away}` : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {game.sport_title || 'Liga Principal'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  <Link href={`/match/${game.id}`}>Ver detalhes</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Renderizar componente de próximos jogos
  const renderUpcomingGames = () => {
    if (isLoading) {
      return (
        <div className="p-4 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-full"></div>
        </div>
      );
    }

    if (upcomingGames.length === 0) {
      return (
        <div className="p-4 text-center">
          <p className="text-gray-500">Nenhum jogo futuro disponível para este esporte.</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partida</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Liga</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Odds (Casa-Empate-Fora)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {upcomingGames.map((game) => {
              // Extrair odds para exibição
              let oddsDisplay = 'N/A';
              if (game.bookmakers && game.bookmakers.length > 0) {
                const bookmaker = game.bookmakers[0];
                if (bookmaker.markets && bookmaker.markets.length > 0) {
                  const market = bookmaker.markets.find((m: any) => m.key === 'h2h') || bookmaker.markets[0];
                  if (market && market.outcomes) {
                    const outcomes = market.outcomes;
                    if (outcomes.length === 2) { // Sem empate (ex: tênis, basquete)
                      oddsDisplay = `${outcomes[0].price.toFixed(2)} - ${outcomes[1].price.toFixed(2)}`;
                    } else if (outcomes.length === 3) { // Com empate (ex: futebol)
                      oddsDisplay = `${outcomes[0].price.toFixed(2)} - ${outcomes[1].price.toFixed(2)} - ${outcomes[2].price.toFixed(2)}`;
                    }
                  }
                }
              }
              
              return (
                <tr key={game.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(game.commence_time)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {game.home_team} vs {game.away_team}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {game.sport_title || 'Liga Principal'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {oddsDisplay}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    <Link href={`/match/${game.id}`}>Ver detalhes</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/sports" className="text-blue-600 hover:text-blue-800 mr-2">
          ← Voltar para Esportes
        </Link>
        <h1 className="text-3xl font-bold">{sportName}</h1>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Ligas Disponíveis</h2>
        {renderLeagues()}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Jogos Recentes</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {renderRecentGames()}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Próximos Jogos</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {renderUpcomingGames()}
        </div>
      </section>
    </main>
  );
}

// Função auxiliar para obter o nome do esporte a partir da chave
function getSportName(sportKey: string): string {
  const sportNames: Record<string, string> = {
    'soccer': 'Futebol',
    'basketball': 'Basquete',
    'tennis': 'Tênis',
    'americanfootball': 'Futebol Americano',
    'baseball': 'Beisebol',
    'hockey': 'Hóquei',
    // Adicione mais esportes conforme necessário
  };
  
  return sportNames[sportKey] || sportKey.charAt(0).toUpperCase() + sportKey.slice(1);
}

// Função auxiliar para obter a chave do esporte a partir do nome
function getSportKeyByName(sportName: string): string | null {
  const sportMap: Record<string, string> = {
    'futebol': 'soccer_epl',
    'basquete': 'basketball_nba',
    'tenis': 'tennis_atp',
    'beisebol': 'baseball_mlb',
    'hoquei': 'icehockey_nhl',
    'futebol-americano': 'americanfootball_nfl',
    'soccer': 'soccer_epl',
    'basketball': 'basketball_nba',
    'tennis': 'tennis_atp',
    'baseball': 'baseball_mlb',
    'hockey': 'icehockey_nhl',
    'football': 'americanfootball_nfl'
  };
  
  return sportMap[sportName.toLowerCase()] || null;
}
