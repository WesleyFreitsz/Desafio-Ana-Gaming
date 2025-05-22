// src/app/api/leagues/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getLeaguesBySport } from '@/lib/api';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sport = searchParams.get('sport') || 'soccer';

  try {
    const leagues = await getLeaguesBySport(sport);
    return NextResponse.json(leagues);
  } catch (error) {
    console.error(`Erro ao buscar ligas para ${sport}:`, error);
    return NextResponse.json([], { status: 500 });
  }
}
