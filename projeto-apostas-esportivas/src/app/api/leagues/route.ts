// src/app/api/leagues/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getLeaguesBySport } from '@/lib/api';

// Dados de fallback para garantir que o endpoint sempre retorne algo
const FALLBACK_LEAGUES = {
  soccer: [
    { key: 'soccer_epl', group: 'soccer', title: 'Premier League', active: true, has_outrights: true },
    { key: 'soccer_brazil_campeonato', group: 'soccer', title: 'Campeonato Brasileiro', active: true, has_outrights: true },
    { key: 'soccer_brazil_copa', group: 'soccer', title: 'Copa do Brasil', active: true, has_outrights: true },
    { key: 'soccer_conmebol_libertadores', group: 'soccer', title: 'Libertadores', active: true, has_outrights: true }
  ],
  basketball: [
    { key: 'basketball_nba', group: 'basketball', title: 'NBA', active: true, has_outrights: true },
    { key: 'basketball_euroleague', group: 'basketball', title: 'Euroleague', active: true, has_outrights: true },
    { key: 'basketball_brazil_nbb', group: 'basketball', title: 'NBB', active: true, has_outrights: true }
  ],
  tennis: [
    { key: 'tennis_atp', group: 'tennis', title: 'ATP Tour', active: true, has_outrights: true },
    { key: 'tennis_wta', group: 'tennis', title: 'WTA Tour', active: true, has_outrights: true },
    { key: 'tennis_grand_slam_french_open', group: 'tennis', title: 'Roland Garros', active: true, has_outrights: true }
  ]
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sport = searchParams.get('sport') || 'soccer';

  try {
    // Tenta buscar ligas da API
    const leagues = await getLeaguesBySport(sport);
    return NextResponse.json(leagues);
  } catch (error) {
    console.error(`Erro ao buscar ligas para ${sport}:`, error);
    
    // Em caso de erro, retorna dados de fallback específicos para o esporte
    const fallbackData = FALLBACK_LEAGUES[sport as keyof typeof FALLBACK_LEAGUES] || [];
    return NextResponse.json(fallbackData, { status: 200 }); // Retorna 200 mesmo em caso de erro
  }
}
