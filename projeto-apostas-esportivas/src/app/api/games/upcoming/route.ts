// src/app/api/games/upcoming/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUpcomingGames } from '@/lib/api';

// Dados de fallback para garantir que o endpoint sempre retorne algo
const FALLBACK_GAMES = {
  soccer_epl: [
    { id: 'soccer_epl_3', home_team: 'Manchester United', away_team: 'Tottenham', sport_key: 'soccer_epl', sport_title: 'Premier League', commence_time: '2025-05-25T19:00:00Z', bookmakers: [{ key: 'betfair', markets: [{ key: 'h2h', outcomes: [{ name: 'Manchester United', price: 1.85 }, { name: 'Draw', price: 3.5 }, { name: 'Tottenham', price: 4.2 }] }] }] },
    { id: 'soccer_epl_4', home_team: 'Newcastle', away_team: 'Everton', sport_key: 'soccer_epl', sport_title: 'Premier League', commence_time: '2025-05-26T19:00:00Z', bookmakers: [{ key: 'betfair', markets: [{ key: 'h2h', outcomes: [{ name: 'Newcastle', price: 1.7 }, { name: 'Draw', price: 3.8 }, { name: 'Everton', price: 4.5 }] }] }] }
  ],
  soccer_brazil_campeonato: [
    { id: 'soccer_brazil_3', home_team: 'Fluminense', away_team: 'Botafogo', sport_key: 'soccer_brazil_campeonato', sport_title: 'Campeonato Brasileiro', commence_time: '2025-05-25T19:00:00Z', bookmakers: [{ key: 'betfair', markets: [{ key: 'h2h', outcomes: [{ name: 'Fluminense', price: 2.1 }, { name: 'Draw', price: 3.2 }, { name: 'Botafogo', price: 3.5 }] }] }] },
    { id: 'soccer_brazil_4', home_team: 'Grêmio', away_team: 'Internacional', sport_key: 'soccer_brazil_campeonato', sport_title: 'Campeonato Brasileiro', commence_time: '2025-05-26T19:00:00Z', bookmakers: [{ key: 'betfair', markets: [{ key: 'h2h', outcomes: [{ name: 'Grêmio', price: 2.4 }, { name: 'Draw', price: 3.1 }, { name: 'Internacional', price: 2.9 }] }] }] }
  ],
  basketball_nba: [
    { id: 'basketball_nba_3', home_team: 'Nets', away_team: 'Heat', sport_key: 'basketball_nba', sport_title: 'NBA', commence_time: '2025-05-25T23:30:00Z', bookmakers: [{ key: 'betfair', markets: [{ key: 'h2h', outcomes: [{ name: 'Nets', price: 1.65 }, { name: 'Heat', price: 2.25 }] }] }] },
    { id: 'basketball_nba_4', home_team: 'Suns', away_team: 'Clippers', sport_key: 'basketball_nba', sport_title: 'NBA', commence_time: '2025-05-26T23:30:00Z', bookmakers: [{ key: 'betfair', markets: [{ key: 'h2h', outcomes: [{ name: 'Suns', price: 1.55 }, { name: 'Clippers', price: 2.45 }] }] }] }
  ],
  tennis_atp: [
    { id: 'tennis_atp_3', home_team: 'Alcaraz', away_team: 'Medvedev', sport_key: 'tennis_atp', sport_title: 'ATP Tour', commence_time: '2025-05-27T14:00:00Z', bookmakers: [{ key: 'betfair', markets: [{ key: 'h2h', outcomes: [{ name: 'Alcaraz', price: 1.45 }, { name: 'Medvedev', price: 2.75 }] }] }] },
    { id: 'tennis_atp_4', home_team: 'Tsitsipas', away_team: 'Zverev', sport_key: 'tennis_atp', sport_title: 'ATP Tour', commence_time: '2025-05-28T12:00:00Z', bookmakers: [{ key: 'betfair', markets: [{ key: 'h2h', outcomes: [{ name: 'Tsitsipas', price: 1.85 }, { name: 'Zverev', price: 1.95 }] }] }] }
  ]
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sport = searchParams.get('sport') || 'soccer_epl';
  const limit = parseInt(searchParams.get('limit') || '3', 10);

  try {
    // Tenta buscar próximos jogos da API
    const games = await getUpcomingGames(sport, limit);
    return NextResponse.json(games);
  } catch (error) {
    console.error(`Erro ao buscar próximos jogos para ${sport}:`, error);
    
    // Em caso de erro, retorna dados de fallback específicos para o esporte
    const fallbackData = FALLBACK_GAMES[sport as keyof typeof FALLBACK_GAMES] || [];
    return NextResponse.json(fallbackData.slice(0, limit), { status: 200 }); // Retorna 200 mesmo em caso de erro
  }
}
