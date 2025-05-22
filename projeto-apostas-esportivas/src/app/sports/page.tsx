// src/app/page.tsx
// Home/Dashboard - Página inicial
import { Suspense } from 'react';
import Link from 'next/link';
import { getSports, getRecentGames, getUpcomingGames } from '@/lib/api';

// Componente para exibir categorias de esportes
async function SportCategories() {
  // Buscar esportes da API
  const allSports = await getSports();
  
  // Filtrar apenas os principais esportes (futebol, basquete, tênis)
  const mainSports = [
    { key: 'soccer', name: 'Futebol', description: 'Campeonatos nacionais e internacionais', color: 'blue' },
    { key: 'basketball', name: 'Basquete', description: 'NBA, FIBA e outras competições', color: 'orange' },
    { key: 'tennis', name: 'Tênis', description: 'Grand Slams e torneios ATP/WTA', color: 'green' }
  ];
  
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
}

// Componente para exibir jogos recentes
async function RecentGames() {
  // Buscar jogos recentes de futebol, basquete e tênis
  const soccerGames = await getRecentGames('soccer_epl', 1);
  const basketballGames = await getRecentGames('basketball_nba', 1);
  const tennisGames = await getRecentGames('tennis_atp', 1);
  
  // Combinar todos os jogos
  const allGames = [...soccerGames, ...basketballGames, ...tennisGames];
  
  if (allGames.length === 0) {
    return <p className="text-gray-500">Nenhum jogo recente disponível no momento.</p>;
  }
  
  return (
    <div className="space-y-4">
      {allGames.map((game: any) => (
        <div key={game.id} className="border-b pb-4 last:border-0 last:pb-0">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{game.home_team} vs {game.away_team}</p>
              <p className="text-sm text-gray-500">
                {game.sport_title || getSportNameByKey(game.sport_key) || 'Liga Principal'}
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
}

// Componente para exibir próximos jogos
async function UpcomingGames() {
  // Buscar próximos jogos de futebol, basquete e tênis
  const soccerGames = await getUpcomingGames('soccer_epl', 1);
  const basketballGames = await getUpcomingGames('basketball_nba', 1);
  const tennisGames = await getUpcomingGames('tennis_atp', 1);
  
  // Combinar todos os jogos
  const allGames = [...soccerGames, ...basketballGames, ...tennisGames];
  
  if (allGames.length === 0) {
    return <p className="text-gray-500">Nenhum jogo futuro disponível no momento.</p>;
  }
  
  return (
    <div className="space-y-4">
      {allGames.map((game: any) => (
        <div key={game.id} className="border-b pb-4 last:border-0 last:pb-0">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{game.home_team} vs {game.away_team}</p>
              <p className="text-sm text-gray-500">
                {new Date(game.commence_time).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <p className="text-sm text-gray-500">
                {game.sport_title || getSportNameByKey(game.sport_key) || 'Liga Principal'}
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
}

// Componente para exibir melhores odds
async function BestOdds() {
  // Buscar próximos jogos com odds interessantes
  const soccerGames = await getUpcomingGames('soccer_epl', 1);
  const basketballGames = await getUpcomingGames('basketball_nba', 1);
  const tennisGames = await getUpcomingGames('tennis_atp', 1);
  
  // Combinar todos os jogos e ordenar por odds mais interessantes
  const allGames = [...soccerGames, ...basketballGames, ...tennisGames]
    .filter((game: any) => game.bookmakers && game.bookmakers.length > 0)
    .sort((a: any, b: any) => {
      // Ordenar por jogos com odds mais equilibradas
      const aBookmaker = a.bookmakers[0];
      const bBookmaker = b.bookmakers[0];
      
      if (!aBookmaker || !bBookmaker) return 0;
      
      const aMarket = aBookmaker.markets.find((m: any) => m.key === 'h2h') || aBookmaker.markets[0];
      const bMarket = bBookmaker.markets.find((m: any) => m.key === 'h2h') || bBookmaker.markets[0];
      
      if (!aMarket || !bMarket) return 0;
      
      // Calcular a diferença entre as odds mais alta e mais baixa
      const aOdds = aMarket.outcomes.map((o: any) => o.price);
      const bOdds = bMarket.outcomes.map((o: any) => o.price);
      
      const aDiff = Math.max(...aOdds) - Math.min(...aOdds);
      const bDiff = Math.max(...bOdds) - Math.min(...bOdds);
      
      // Quanto menor a diferença, mais equilibrado o jogo
      return aDiff - bDiff;
    });
  
  if (allGames.length === 0) {
    return <p className="text-gray-500">Nenhuma odd disponível no momento.</p>;
  }
  
  return (
    <div className="space-y-4">
      {allGames.slice(0, 3).map((game: any) => {
        // Extrair odds para exibição
        let oddsDisplay = '';
        if (game.bookmakers && game.bookmakers.length > 0) {
          const bookmaker = game.bookmakers[0];
          if (bookmaker.markets && bookmaker.markets.length > 0) {
            const market = bookmaker.markets.find((m: any) => m.key === 'h2h') || bookmaker.markets[0];
            if (market && market.outcomes) {
              oddsDisplay = market.outcomes.map((o: any) => `${o.name}: ${o.price.toFixed(2)}`).join(' | ');
            }
          }
        }
        
        return (
          <div key={game.id} className="border-b pb-4 last:border-0 last:pb-0">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{game.home_team} vs {game.away_team}</p>
                <p className="text-sm text-gray-500">
                  {game.sport_title || getSportNameByKey(game.sport_key) || 'Liga Principal'}
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
}

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Plataforma de Visualização de Apostas Esportivas</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Categorias de Esportes</h2>
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        }>
          <SportCategories />
        </Suspense>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Jogos Recentes</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <Suspense fallback={
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          }>
            <RecentGames />
          </Suspense>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Próximos Jogos</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <Suspense fallback={
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          }>
            <UpcomingGames />
          </Suspense>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Melhores Odds</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <Suspense fallback={
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          }>
            <BestOdds />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

// Função auxiliar para obter o nome do esporte a partir da chave
function getSportNameByKey(sportKey: string): string {
  if (!sportKey) return '';
  
  if (sportKey.includes('soccer')) return 'Futebol';
  if (sportKey.includes('basketball')) return 'Basquete';
  if (sportKey.includes('tennis')) return 'Tênis';
  if (sportKey.includes('baseball')) return 'Beisebol';
  if (sportKey.includes('hockey')) return 'Hóquei';
  if (sportKey.includes('football')) return 'Futebol Americano';
  
  return sportKey.split('_')[0].charAt(0).toUpperCase() + sportKey.split('_')[0].slice(1);
}
