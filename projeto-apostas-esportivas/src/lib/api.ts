// src/lib/api.ts
// Cliente para The Odds API

const API_KEY = '46981b82950f987cb95f8610b590cf56'; // Chave fornecida pelo usuário
const BASE_URL = 'https://api.the-odds-api.com/v4';

// Dados de fallback para quando a API não estiver disponível
const FALLBACK_DATA = {
  sports: [
    { key: 'soccer_epl', group: 'soccer', title: 'Premier League', active: true, has_outrights: true },
    { key: 'soccer_brazil_campeonato', group: 'soccer', title: 'Campeonato Brasileiro', active: true, has_outrights: true },
    { key: 'soccer_brazil_copa', group: 'soccer', title: 'Copa do Brasil', active: true, has_outrights: true },
    { key: 'basketball_nba', group: 'basketball', title: 'NBA', active: true, has_outrights: true },
    { key: 'basketball_euroleague', group: 'basketball', title: 'Euroleague', active: true, has_outrights: true },
    { key: 'tennis_atp', group: 'tennis', title: 'ATP Tour', active: true, has_outrights: true },
    { key: 'tennis_wta', group: 'tennis', title: 'WTA Tour', active: true, has_outrights: true }
  ],
  recentGames: {
    soccer_epl: [
      { id: 'soccer_epl_1', home_team: 'Manchester City', away_team: 'Liverpool', sport_key: 'soccer_epl', sport_title: 'Premier League', commence_time: '2025-05-20T19:00:00Z', scores: { home: 2, away: 1 } },
      { id: 'soccer_epl_2', home_team: 'Arsenal', away_team: 'Chelsea', sport_key: 'soccer_epl', sport_title: 'Premier League', commence_time: '2025-05-19T19:00:00Z', scores: { home: 3, away: 0 } }
    ],
    soccer_brazil_campeonato: [
      { id: 'soccer_brazil_1', home_team: 'Flamengo', away_team: 'Palmeiras', sport_key: 'soccer_brazil_campeonato', sport_title: 'Campeonato Brasileiro', commence_time: '2025-05-20T19:00:00Z', scores: { home: 2, away: 1 } },
      { id: 'soccer_brazil_2', home_team: 'São Paulo', away_team: 'Corinthians', sport_key: 'soccer_brazil_campeonato', sport_title: 'Campeonato Brasileiro', commence_time: '2025-05-18T19:00:00Z', scores: { home: 0, away: 0 } }
    ],
    basketball_nba: [
      { id: 'basketball_nba_1', home_team: 'Lakers', away_team: 'Celtics', sport_key: 'basketball_nba', sport_title: 'NBA', commence_time: '2025-05-21T23:30:00Z', scores: { home: 105, away: 98 } },
      { id: 'basketball_nba_2', home_team: 'Warriors', away_team: 'Bucks', sport_key: 'basketball_nba', sport_title: 'NBA', commence_time: '2025-05-20T23:30:00Z', scores: { home: 110, away: 115 } }
    ],
    tennis_atp: [
      { id: 'tennis_atp_1', home_team: 'Nadal', away_team: 'Djokovic', sport_key: 'tennis_atp', sport_title: 'ATP Tour', commence_time: '2025-05-22T14:00:00Z', scores: { home: 3, away: 2 } },
      { id: 'tennis_atp_2', home_team: 'Federer', away_team: 'Murray', sport_key: 'tennis_atp', sport_title: 'ATP Tour', commence_time: '2025-05-21T12:00:00Z', scores: { home: 3, away: 0 } }
    ]
  },
  upcomingGames: {
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
  }
};

// Verifica se estamos em ambiente de build
const isBuildTime = process.env.NODE_ENV === 'production' && typeof window === 'undefined';

/**
 * Obtém a lista de esportes disponíveis
 */
export async function getSports() {
  try {
    // Se estamos em ambiente de build, retorna dados de fallback
    if (isBuildTime) {
      console.log('Ambiente de build detectado, usando dados de fallback para esportes');
      return FALLBACK_DATA.sports;
    }

    const response = await fetch(`${BASE_URL}/sports/?apiKey=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar esportes: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar esportes:', error);
    // Em caso de erro, retorna dados de fallback
    return FALLBACK_DATA.sports;
  }
}

/**
 * Obtém odds para um esporte específico
 * @param sportKey - Chave do esporte (ex: 'basketball_nba')
 * @param regions - Regiões para odds (ex: 'br', 'us', 'eu')
 * @param markets - Mercados de apostas (ex: 'h2h', 'spreads', 'totals')
 */
export async function getOdds(sportKey: string, regions: string = 'us', markets: string = 'h2h') {
  try {
    // Se estamos em ambiente de build, retorna dados de fallback
    if (isBuildTime) {
      console.log(`Ambiente de build detectado, usando dados de fallback para odds de ${sportKey}`);
      return FALLBACK_DATA.upcomingGames[sportKey as keyof typeof FALLBACK_DATA.upcomingGames] || [];
    }

    const url = `${BASE_URL}/sports/${sportKey}/odds/?apiKey=${API_KEY}&regions=${regions}&markets=${markets}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar odds: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar odds:', error);
    // Em caso de erro, retorna dados de fallback
    return FALLBACK_DATA.upcomingGames[sportKey as keyof typeof FALLBACK_DATA.upcomingGames] || [];
  }
}

/**
 * Obtém eventos para um esporte específico
 * @param sportKey - Chave do esporte
 */
export async function getEvents(sportKey: string) {
  try {
    // Se estamos em ambiente de build, retorna dados de fallback
    if (isBuildTime) {
      console.log(`Ambiente de build detectado, usando dados de fallback para eventos de ${sportKey}`);
      return FALLBACK_DATA.recentGames[sportKey as keyof typeof FALLBACK_DATA.recentGames] || [];
    }

    const url = `${BASE_URL}/sports/${sportKey}/scores/?apiKey=${API_KEY}&daysFrom=3`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar eventos: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    // Em caso de erro, retorna dados de fallback
    return FALLBACK_DATA.recentGames[sportKey as keyof typeof FALLBACK_DATA.recentGames] || [];
  }
}

/**
 * Obtém os últimos jogos para um esporte específico
 * @param sportKey - Chave do esporte
 * @param limit - Número máximo de jogos a retornar
 */
export async function getRecentGames(sportKey: string, limit: number = 3) {
  try {
    // Se estamos em ambiente de build, retorna dados de fallback
    if (isBuildTime) {
      console.log(`Ambiente de build detectado, usando dados de fallback para jogos recentes de ${sportKey}`);
      const fallbackGames = FALLBACK_DATA.recentGames[sportKey as keyof typeof FALLBACK_DATA.recentGames] || [];
      return fallbackGames.slice(0, limit);
    }

    // Busca eventos recentes (até 3 dias atrás)
    const events = await getEvents(sportKey);
    
    // Filtra eventos que já aconteceram e ordena por data (mais recentes primeiro)
    const now = new Date();
    const recentGames = events
      .filter((event: any) => new Date(event.commence_time) < now)
      .sort((a: any, b: any) => new Date(b.commence_time).getTime() - new Date(a.commence_time).getTime())
      .slice(0, limit);
    
    return recentGames;
  } catch (error) {
    console.error('Erro ao buscar jogos recentes:', error);
    // Em caso de erro, retorna dados de fallback
    const fallbackGames = FALLBACK_DATA.recentGames[sportKey as keyof typeof FALLBACK_DATA.recentGames] || [];
    return fallbackGames.slice(0, limit);
  }
}

/**
 * Obtém os próximos jogos para um esporte específico
 * @param sportKey - Chave do esporte
 * @param limit - Número máximo de jogos a retornar
 */
export async function getUpcomingGames(sportKey: string, limit: number = 3) {
  try {
    // Se estamos em ambiente de build, retorna dados de fallback
    if (isBuildTime) {
      console.log(`Ambiente de build detectado, usando dados de fallback para próximos jogos de ${sportKey}`);
      const fallbackGames = FALLBACK_DATA.upcomingGames[sportKey as keyof typeof FALLBACK_DATA.upcomingGames] || [];
      return fallbackGames.slice(0, limit);
    }

    // Busca odds para obter jogos futuros
    const odds = await getOdds(sportKey);
    
    // Filtra eventos que ainda não aconteceram e ordena por data (mais próximos primeiro)
    const now = new Date();
    const upcomingGames = odds
      .filter((event: any) => new Date(event.commence_time) > now)
      .sort((a: any, b: any) => new Date(a.commence_time).getTime() - new Date(b.commence_time).getTime())
      .slice(0, limit);
    
    return upcomingGames;
  } catch (error) {
    console.error('Erro ao buscar próximos jogos:', error);
    // Em caso de erro, retorna dados de fallback
    const fallbackGames = FALLBACK_DATA.upcomingGames[sportKey as keyof typeof FALLBACK_DATA.upcomingGames] || [];
    return fallbackGames.slice(0, limit);
  }
}

/**
 * Obtém as ligas disponíveis para um esporte específico
 * @param sport - Nome do esporte (ex: 'basketball', 'soccer')
 */
export async function getLeaguesBySport(sport: string) {
  try {
    // Se estamos em ambiente de build, retorna dados de fallback filtrados por esporte
    if (isBuildTime) {
      console.log(`Ambiente de build detectado, usando dados de fallback para ligas de ${sport}`);
      return FALLBACK_DATA.sports.filter(s => s.group.toLowerCase() === sport.toLowerCase());
    }

    const allSports = await getSports();
    
    // Filtra as ligas pelo nome do esporte
    const leagues = allSports
      .filter((s: any) => s.group.toLowerCase() === sport.toLowerCase())
      .sort((a: any, b: any) => a.title.localeCompare(b.title));
    
    return leagues;
  } catch (error) {
    console.error(`Erro ao buscar ligas para ${sport}:`, error);
    // Em caso de erro, retorna dados de fallback filtrados por esporte
    return FALLBACK_DATA.sports.filter(s => s.group.toLowerCase() === sport.toLowerCase());
  }
}

/**
 * Mapeia nomes de esportes para suas chaves na API
 * @param sportName - Nome do esporte em português
 * @returns Chave do esporte ou null se não encontrado
 */
export function getSportKeyByName(sportName: string): string | null {
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

/**
 * Formata a data para exibição
 * @param dateString - String de data ISO
 * @returns Data formatada em pt-BR
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Obtém detalhes de um evento específico pelo ID
 * @param eventId - ID do evento
 */
export async function getEventById(eventId: string) {
  try {
    // Se estamos em ambiente de build, busca nos dados de fallback
    if (isBuildTime) {
      console.log(`Ambiente de build detectado, buscando evento ${eventId} nos dados de fallback`);
      
      // Busca em jogos recentes
      for (const sportKey in FALLBACK_DATA.recentGames) {
        const games = FALLBACK_DATA.recentGames[sportKey as keyof typeof FALLBACK_DATA.recentGames];
        const event = games.find((e: any) => e.id === eventId);
        if (event) return event;
      }
      
      // Busca em jogos futuros
      for (const sportKey in FALLBACK_DATA.upcomingGames) {
        const games = FALLBACK_DATA.upcomingGames[sportKey as keyof typeof FALLBACK_DATA.upcomingGames];
        const event = games.find((e: any) => e.id === eventId);
        if (event) return event;
      }
      
      // Se não encontrar, retorna um evento padrão
      return {
        id: eventId,
        home_team: 'Time A',
        away_team: 'Time B',
        sport_key: 'soccer_epl',
        sport_title: 'Premier League',
        commence_time: '2025-05-25T19:00:00Z',
        bookmakers: [{ 
          key: 'betfair', 
          markets: [{ 
            key: 'h2h', 
            outcomes: [
              { name: 'Time A', price: 2.1 }, 
              { name: 'Draw', price: 3.2 }, 
              { name: 'Time B', price: 3.5 }
            ] 
          }] 
        }]
      };
    }

    // Busca todos os esportes
    const sports = await getSports();
    
    // Para cada esporte, busca odds e verifica se o evento existe
    for (const sport of sports) {
      try {
        const odds = await getOdds(sport.key);
        const event = odds.find((e: any) => e.id === eventId);
        
        if (event) {
          return {
            ...event,
            sport: sport.title,
            group: sport.group
          };
        }
      } catch (error) {
        console.error(`Erro ao buscar odds para ${sport.key}:`, error);
      }
    }
    
    throw new Error(`Evento com ID ${eventId} não encontrado`);
  } catch (error) {
    console.error('Erro ao buscar evento por ID:', error);
    
    // Em caso de erro, retorna um evento padrão
    return {
      id: eventId,
      home_team: 'Time A',
      away_team: 'Time B',
      sport_key: 'soccer_epl',
      sport_title: 'Premier League',
      commence_time: '2025-05-25T19:00:00Z',
      bookmakers: [{ 
        key: 'betfair', 

(Content truncated due to size limit. Use line ranges to read in chunks)
