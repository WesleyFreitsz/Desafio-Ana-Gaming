// src/app/sports/[sport]/page.tsx
// Página de Ligas por Esporte
import { Suspense } from 'react';
import Link from 'next/link';
import { 
  getLeaguesBySport, 
  getRecentGames, 
  getUpcomingGames, 
  getSportKeyByName,
  formatDate
} from '@/lib/api';

interface SportPageProps {
  params: {
    sport: string;
  };
}

// Componente para exibir as ligas de um esporte
async function LeaguesList({ sport }: { sport: string }) {
  // Buscar ligas do esporte
  const leagues = await getLeaguesBySport(sport);
  
  if (leagues.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Nenhuma liga disponível para este esporte no momento.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {leagues.slice(0, 6).map((league: any) => (
        <div key={league.key} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">{league.title}</h3>
          <p className="text-gray-600 mb-4">{league.description || `Liga de ${getSportName(sport)}`}</p>
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
}

// Componente para exibir os jogos recentes de um esporte
async function RecentGames({ sportKey }: { sportKey: string }) {
  // Buscar jogos recentes
  const games = await getRecentGames(sportKey, 3);
  
  if (games.length === 0) {
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
          {games.map((game: any) => (
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
}

// Componente para exibir os próximos jogos de um esporte
async function UpcomingGames({ sportKey }: { sportKey: string }) {
  // Buscar próximos jogos
  const games = await getUpcomingGames(sportKey, 3);
  
  if (games.length === 0) {
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
          {games.map((game: any) => {
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
}

export default function SportPage({ params }: SportPageProps) {
  const { sport } = params;
  const sportName = getSportName(sport);
  const sportKey = getSportKeyByName(sport) || 'soccer_epl'; // Fallback para futebol se não encontrar

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
        <Suspense fallback={
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
        }>
          <LeaguesList sport={sport} />
        </Suspense>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Jogos Recentes</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Suspense fallback={
            <div className="p-4 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-full"></div>
            </div>
          }>
            <RecentGames sportKey={sportKey} />
          </Suspense>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Próximos Jogos</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Suspense fallback={
            <div className="p-4 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-full"></div>
            </div>
          }>
            <UpcomingGames sportKey={sportKey} />
          </Suspense>
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
