// src/lib/api.ts
// Cliente para The Odds API

const API_KEY = 'YOUR_API_KEY'; // Substituir pela chave real em produção
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
 * @param sportKey - Chave do esporte (ex: 'soccer_brazil_campeonato')
 * @param regions - Regiões para odds (ex: 'br', 'us', 'eu')
 * @param markets - Mercados de apostas (ex: 'h2h', 'spreads', 'totals')
 */
export async function getOdds(sportKey: string, regions: string = 'br', markets: string = 'h2h') {
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
    const url = `${BASE_URL}/sports/${sportKey}/scores/?apiKey=${API_KEY}`;
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
 * Obtém detalhes de um evento específico
 * @param eventId - ID do evento
 */
export async function getEventDetails(eventId: string) {
  try {
    // Nota: Esta é uma implementação simulada, pois a API não tem endpoint específico para detalhes de evento
    // Em uma implementação real, você pode precisar filtrar os resultados de getOdds ou getEvents
    const url = `${BASE_URL}/events/${eventId}?apiKey=${API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar detalhes do evento: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar detalhes do evento:', error);
    throw error;
  }
}
