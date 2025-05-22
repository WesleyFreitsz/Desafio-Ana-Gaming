// src/lib/api.ts
// Cliente para The Odds API

const API_KEY = '46981b82950f987cb95f8610b590cf56'; // Chave fornecida pelo usuário
const BASE_URL = 'https://api.the-odds-api.com/v4';

/**
 * Obtém a lista de esportes disponíveis
 */
export async function getSports() {
  try {
    const response = await fetch(`${BASE_URL}/sports/?apiKey=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar esportes: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar esportes:', error);
    throw error;
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
    const url = `${BASE_URL}/sports/${sportKey}/odds/?apiKey=${API_KEY}&regions=${regions}&markets=${markets}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar odds: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar odds:', error);
    throw error;
  }
}

/**
 * Obtém eventos para um esporte específico
 * @param sportKey - Chave do esporte
 */
export async function getEvents(sportKey: string) {
  try {
    const url = `${BASE_URL}/sports/${sportKey}/scores/?apiKey=${API_KEY}&daysFrom=3`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar eventos: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    throw error;
  }
}

/**
 * Obtém os últimos jogos para um esporte específico
 * @param sportKey - Chave do esporte
 * @param limit - Número máximo de jogos a retornar
 */
export async function getRecentGames(sportKey: string, limit: number = 3) {
  try {
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
    throw error;
  }
}

/**
 * Obtém os próximos jogos para um esporte específico
 * @param sportKey - Chave do esporte
 * @param limit - Número máximo de jogos a retornar
 */
export async function getUpcomingGames(sportKey: string, limit: number = 3) {
  try {
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
    throw error;
  }
}

/**
 * Obtém as ligas disponíveis para um esporte específico
 * @param sport - Nome do esporte (ex: 'basketball', 'soccer')
 */
export async function getLeaguesBySport(sport: string) {
  try {
    const allSports = await getSports();
    
    // Filtra as ligas pelo nome do esporte
    const leagues = allSports
      .filter((s: any) => s.group.toLowerCase() === sport.toLowerCase())
      .sort((a: any, b: any) => a.title.localeCompare(b.title));
    
    return leagues;
  } catch (error) {
    console.error(`Erro ao buscar ligas para ${sport}:`, error);
    throw error;
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
    throw error;
  }
}
