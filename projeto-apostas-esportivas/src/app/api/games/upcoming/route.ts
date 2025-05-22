// src/app/api/games/upcoming/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUpcomingGames } from '@/lib/api';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sport = searchParams.get('sport') || 'soccer_epl';
  const limit = parseInt(searchParams.get('limit') || '3', 10);

  try {
    const games = await getUpcomingGames(sport, limit);
    return NextResponse.json(games);
  } catch (error) {
    console.error(`Erro ao buscar próximos jogos para ${sport}:`, error);
    return NextResponse.json([], { status: 500 });
  }
}
