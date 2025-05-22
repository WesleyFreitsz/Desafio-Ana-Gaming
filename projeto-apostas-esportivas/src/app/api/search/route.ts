// src/app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSports, getOdds } from '@/lib/api';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query || query.length < 3) {
    return NextResponse.json([]);
  }

  try {
    // Buscar todos os esportes disponíveis
    const sports = await getSports();
    
    // Array para armazenar resultados
    let results: any[] = [];
    
    // Buscar odds para cada esporte e filtrar resultados
    for (const sport of sports.slice(0, 3)) { // Limitando a 3 esportes para performance
      try {
        const odds = await getOdds(sport.key);
        
        // Filtrar eventos que correspondem à consulta
        const filteredEvents = odds.filter((event: any) => {
          const homeTeam = event.home_team.toLowerCase();
          const awayTeam = event.away_team.toLowerCase();
          const sportName = sport.group.toLowerCase();
          const leagueName = sport.title.toLowerCase();
          const date = new Date(event.commence_time).toLocaleDateString('pt-BR');
          
          const searchQuery = query.toLowerCase();
          
          return (
            homeTeam.includes(searchQuery) ||
            awayTeam.includes(searchQuery) ||
            sportName.includes(searchQuery) ||
            leagueName.includes(searchQuery) ||
            date.includes(searchQuery)
          );
        });
        
        // Adicionar informações do esporte aos eventos filtrados
        const eventsWithSportInfo = filteredEvents.map((event: any) => ({
          ...event,
          sport: sport.group,
          league: sport.title
        }));
        
        results = [...results, ...eventsWithSportInfo];
      } catch (error) {
        console.error(`Erro ao buscar odds para ${sport.key}:`, error);
      }
    }
    
    // Limitar a 10 resultados
    results = results.slice(0, 10);
    
    return NextResponse.json(results);
  } catch (error) {
    console.error('Erro na busca:', error);
    return NextResponse.json([]);
  }
}
