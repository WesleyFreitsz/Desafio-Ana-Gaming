// src/lib/api.ts
// Cliente simplificado para The Odds API

const API_KEY = '46981b82950f987cb95f8610b590cf56';
const BASE_URL = 'https://api.the-odds-api.com/v4';

// Tipos básicos
interface Sport {
  key: string;
  group: string;
  title: string;
  active: boolean;
  has_outrights: boolean;
}

interface Score {
  home: number;
  away: number;
}

interface Outcome {
  name: string;
  price: number;
}

interface Market {
  key: string;
  outcomes: Outcome[];
}

interface Bookmaker {
  key: string;
  markets: Market[];
}

interface Game {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  scores?: Score;
  bookmakers?: Bookmaker[];
}

// Dados de fallback simplificados
const FALLBACK = {
  sports: [
    { key: 'soccer_epl', group: 'soccer', title: 'Premier League', active: true, has_outrights: true },
    { key: 'soccer_brazil_campeonato', group: 'soccer', title: 'Campeonato Brasileiro', active: true, has_outrights: true },
    { key: 'basketball_nba', group: 'basketball', title: 'NBA', active: true, has_outrights: true },
    { key: 'tennis_atp', group: 'tennis', title: 'ATP Tour', active: true, has_outrights: true }
  ] as Sport[],
  
  recentGames: {
    soccer_epl: [
      { id: 'soccer_epl_1', home_team: 'Manchester City', away_team: 'Liverpool', sport_key: 'soccer_epl', sport_title: 'Premier League', commence_time: '2025-05-20T19:00:00Z', scores: { home: 2, away: 1 } },
      { id: 'soccer_epl_2', home_team: 'Arsenal', away_team: 'Chelsea', sport_key: 'soccer_epl', sport_title: 'Premier League', commence_time: '2025-05-19T19:00:00Z', scores: { home: 3, away: 0 } }
    ] as Game[],
    soccer_brazil_campeonato: [
      { id: 'soccer_brazil_1', home_team: 'Flamengo', away_team: 'Palmeiras', sport_key: 'soccer_brazil_campeonato', sport_title: 'Campeonato Brasileiro', commence_time: '2025-05-20T19:00:00Z', scores: { home: 2, away: 1 } }
    ] as Game[],
    basketball_nba: [
      { id: 'basketball_nba_1', home_team: 'Lakers', away_team: 'Celtics', sport_key: 'basketball_nba', sport_title: 'NBA', commence_time: '2025-05-21T23:30:00Z', scores: { home: 105, away: 98 } }
    ] as Game[],
    tennis_atp: [
      { id: 'tennis_atp_1', home_team: 'Nadal', away_team: 'Djokovic', sport_key: 'tennis_atp', sport_title: 'ATP Tour', commence_time: '2025-05-22T14:00:00Z', scores: { home: 3, away: 2 } }
    ] as Game[]
  },
  
  upcomingGames: {
    soccer_epl: [
      { 
        id: 'soccer_epl_3', 
        home_team: 'Manchester United', 
        away_team: 'Tottenham', 
        sport_key: 'soccer_epl', 
        sport_title: 'Premier League', 
        commence_time: '2025-05-25T19:00:00Z', 
        bookmakers: [
          { 
            key: 'betfair', 
            markets: [
              { 
                key: 'h2h', 
                outcomes: [
                  { name: 'Manchester United', price: 1.85 }, 
                  { name: 'Draw', price: 3.5 }, 
                  { name: 'Tottenham', price: 4.2 }
                ] 
              }
            ] 
          }
        ] 
      }
    ] as Game[],
    soccer_brazil_campeonato: [
      { 
        id: 'soccer_brazil_3', 
        home_team: 'Fluminense', 
        away_team: 'Botafogo', 
        sport_key: 'soccer_brazil_campeonato', 
        sport_title: 'Campeonato Brasileiro', 
        commence_time: '2025-05-25T19:00:00Z', 
        bookmakers: [
          { 
            key: 'betfair', 
            markets: [
              { 
                key: 'h2h', 
                outcomes: [
                  { name: 'Fluminense', price: 2.1 }, 
                  { name: 'Draw', price: 3.2 }, 
                  { name: 'Botafogo', price: 3.5 }
                ] 
              }
            ] 
          }
        ] 
      }
    ] as Game[],
    basketball_nba: [
      { 
        id: 'basketball_nba_3', 
        home_team: 'Nets', 
        away_team: 'Heat', 
        sport_key: 'basketball_nba', 
        sport_title: 'NBA', 
        commence_time: '2025-05-25T23:30:00Z', 
        bookmakers: [
          { 
            key: 'betfair', 
            markets: [
              { 
                key: 'h2h', 
                outcomes: [
                  { name: 'Nets', price: 1.65 }, 
                  { name: 'Heat', price: 2.25 }
                ] 
              }
            ] 
          }
        ] 
      }
    ] as Game[],
    tennis_atp: [
      { 
        id: 'tennis_atp_3', 
        home_team: 'Alcaraz', 
        away_team: 'Medvedev', 
        sport_key: 'tennis_atp', 
        sport_title: 'ATP Tour', 
        commence_time: '2025-05-27T14:00:00Z', 
        bookmakers: [
          { 
            key: 'betfair', 
            markets: [
              { 
                key: 'h2h', 
                outcomes: [
                  { name: 'Alcaraz', price: 1.45 }, 
                  { name: 'Medvedev', price: 2.75 }
                ] 
              }
            ] 
          }
        ] 
      }
    ] as Game[]
  }
};

// Verifica se estamos em ambiente de build
const isBuildTime = process.env.NODE_ENV === 'production' && typeof window === 'undefined';

/**
 * Obtém a lista de esportes disponíveis
 */
export async function getSports(): Promise<Sport[]> {
  try {
    if (isBuildTime) {
      return FALLBACK.sports;
    }

    const response = await fetch(`${BASE_URL}/sports/?apiKey=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar esportes: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar esportes:', error);
    return FALLBACK.sports;
  }
}

/**
 * Obtém odds para um esporte específico
 */
export async function getOdds(sportKey: string, regions: string = 'us', markets: string = 'h2h'): Promise<Game[]> {
  try {
    if (isBuildTime) {
      return FALLBACK.upcomingGames[sportKey as keyof typeof FALLBACK.upcomingGames] || [];
    }

    const url = `${BASE_URL}/sports/${sportKey}/odds/?apiKey=${API_KEY}&regions=${regions}&markets=${markets}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar odds: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar odds:', error);
    return FALLBACK.upcomingGames[sportKey as keyof typeof FALLBACK.upcomingGames] || [];
  }
}

/**
 * Obtém eventos para um esporte específico
 */
export async function getEvents(sportKey: string): Promise<Game[]> {
  try {
    if (isBuildTime) {
      return FALLBACK.recentGames[sportKey as keyof typeof FALLBACK.recentGames] || [];
    }

    const url = `${BASE_URL}/sports/${sportKey}/scores/?apiKey=${API_KEY}&daysFrom=3`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar eventos: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    return FALLBACK.recentGames[sportKey as keyof typeof FALLBACK.recentGames] || [];
  }
}

/**
 * Obtém os últimos jogos para um esporte específico
 */
export async function getRecentGames(sportKey: string, limit: number = 3): Promise<Game[]> {
  try {
    if (isBuildTime) {
      const fallbackGames = FALLBACK.recentGames[sportKey as keyof typeof FALLBACK.recentGames] || [];
      return fallbackGames.slice(0, limit);
    }

    const events = await getEvents(sportKey);
    
    const now = new Date();
    const recentGames = events
      .filter((event) => new Date(event.commence_time) < now)
      .sort((a, b) => new Date(b.commence_time).getTime() - new Date(a.commence_time).getTime())
      .slice(0, limit);
    
    return recentGames;
  } catch (error) {
    console.error('Erro ao buscar jogos recentes:', error);
    const fallbackGames = FALLBACK.recentGames[sportKey as keyof typeof FALLBACK.recentGames] || [];
    return fallbackGames.slice(0, limit);
  }
}

/**
 * Obtém os próximos jogos para um esporte específico
 */
export async function getUpcomingGames(sportKey: string, limit: number = 3): Promise<Game[]> {
  try {
    if (isBuildTime) {
      const fallbackGames = FALLBACK.upcomingGames[sportKey as keyof typeof FALLBACK.upcomingGames] || [];
      return fallbackGames.slice(0, limit);
    }

    const odds = await getOdds(sportKey);
    
    const now = new Date();
    const upcomingGames = odds
      .filter((event) => new Date(event.commence_time) > now)
      .sort((a, b) => new Date(a.commence_time).getTime() - new Date(b.commence_time).getTime())
      .slice(0, limit);
    
    return upcomingGames;
  } catch (error) {
    console.error('Erro ao buscar próximos jogos:', error);
    const fallbackGames = FALLBACK.upcomingGames[sportKey as keyof typeof FALLBACK.upcomingGames] || [];
    return fallbackGames.slice(0, limit);
  }
}

/**
 * Obtém as ligas disponíveis para um esporte específico
 */
export async function getLeaguesBySport(sport: string): Promise<Sport[]> {
  try {
    if (isBuildTime) {
      return FALLBACK.sports.filter(s => s.group.toLowerCase() === sport.toLowerCase());
    }

    const allSports = await getSports();
    
    const leagues = allSports
      .filter((s) => s.group.toLowerCase() === sport.toLowerCase())
      .sort((a, b) => a.title.localeCompare(b.title));
    
    return leagues;
  } catch (error) {
    console.error(`Erro ao buscar ligas para ${sport}:`, error);
    return FALLBACK.sports.filter(s => s.group.toLowerCase() === sport.toLowerCase());
  }
}

/**
 * Mapeia nomes de esportes para suas chaves na API
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
 */
export async function getEventById(eventId: string): Promise<Game> {
  try {
    if (isBuildTime) {
      // Busca em jogos recentes
      for (const sportKey in FALLBACK.recentGames) {
        const games = FALLBACK.recentGames[sportKey as keyof typeof FALLBACK.recentGames];
        const event = games.find(e => e.id === eventId);
        if (event) return event;
      }
      
      // Busca em jogos futuros
      for (const sportKey in FALLBACK.upcomingGames) {
        const games = FALLBACK.upcomingGames[sportKey as keyof typeof FALLBACK.upcomingGames];
        const event = games.find(e => e.id === eventId);
        if (event) return event;
      }
      
      // Evento padrão
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

    const sports = await getSports();
    
    for (const sport of sports) {
      try {
        const odds = await getOdds(sport.key);
        const event = odds.find(e => e.id === eventId);
        
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
    
    // Evento padrão
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
}
