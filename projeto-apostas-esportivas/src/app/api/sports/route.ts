// src/app/api/sports/route.ts
import { NextResponse } from 'next/server';
import { getSports } from '@/lib/api';

// Dados de fallback para garantir que o endpoint sempre retorne algo
const FALLBACK_SPORTS = [
  { key: 'soccer_epl', group: 'soccer', title: 'Premier League', active: true, has_outrights: true },
  { key: 'soccer_brazil_campeonato', group: 'soccer', title: 'Campeonato Brasileiro', active: true, has_outrights: true },
  { key: 'soccer_brazil_copa', group: 'soccer', title: 'Copa do Brasil', active: true, has_outrights: true },
  { key: 'basketball_nba', group: 'basketball', title: 'NBA', active: true, has_outrights: true },
  { key: 'basketball_euroleague', group: 'basketball', title: 'Euroleague', active: true, has_outrights: true },
  { key: 'tennis_atp', group: 'tennis', title: 'ATP Tour', active: true, has_outrights: true },
  { key: 'tennis_wta', group: 'tennis', title: 'WTA Tour', active: true, has_outrights: true }
];

export async function GET() {
  try {
    // Tenta buscar esportes da API
    const sports = await getSports();
    return NextResponse.json(sports);
  } catch (error) {
    console.error('Erro ao buscar esportes:', error);
    
    // Em caso de erro, retorna dados de fallback
    return NextResponse.json(FALLBACK_SPORTS, { status: 200 }); // Retorna 200 mesmo em caso de erro
  }
}
