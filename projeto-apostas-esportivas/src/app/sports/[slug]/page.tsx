
'use client';

import Link from 'next/link';
import { useState, useEffect, use } from 'react'; // Importar use
import { useSearchParams } from 'next/navigation';
import { Match, getOddsAPIClient, Sport } from '@/lib/api/betsapi';

// Mapeamento de slugs genéricos para grupos da API
// Adicionar mapeamentos para os novos esportes
const SLUG_TO_GROUP_MAP: Record<string, string> = {
  'soccer': 'Soccer',
  'basketball': 'Basketball',
  'tennis': 'Tennis',
  'volleyball': 'Volleyball', // Assumindo que o grupo na API é 'Volleyball'
  'mma_mixed_martial_arts': 'Mixed Martial Arts', // Assumindo que o grupo na API é 'Mixed Martial Arts'
  'esports': 'E-sports', // Assumindo que o grupo na API é 'E-sports'
};

// Componente da Página
export default function SportDetailsOrLeagueListPage({ params }: { params: Promise<{ slug: string }> }) {
  // Corrigir acesso aos params usando React.use()
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  
  const searchParams = useSearchParams();
  const isPlaceholder = searchParams.get('placeholder') === 'true';

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para lógica de listagem de ligas (generalizado)
  const [isGroupPage, setIsGroupPage] = useState(false);
  const [groupName, setGroupName] = useState<string>('');
  const [leagues, setLeagues] = useState<Sport[]>([]);
  const [selectedLeagueKey, setSelectedLeagueKey] = useState<string | null>(null);
  const [isLoadingMatches, setIsLoadingMatches] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);

  // Estado para informações gerais do esporte (quando não é página de grupo)
  const [sportInfo, setSportInfo] = useState<Sport | null>(null);

  // Efeito principal para buscar dados baseado no slug
  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      if (isPlaceholder) {
        setIsLoading(false);
        return; // Não busca dados se for placeholder
      }

      setIsLoading(true);
      setError(null);
      setMatches([]); // Limpa jogos ao mudar de slug/grupo
      setSelectedLeagueKey(null); // Limpa seleção de liga
      const apiClient = getOddsAPIClient();
      const targetGroup = SLUG_TO_GROUP_MAP[slug]; // Verifica se o slug atual corresponde a um grupo mapeado

      // Verifica se o slug corresponde a um grupo mapeado
      if (targetGroup) {
        setIsGroupPage(true);
        setGroupName(targetGroup);
        console.log(`[SportDetailsPage] Detected group page: ${targetGroup}. Fetching leagues...`);
        try {
          // Busca todos os esportes e filtra pelo grupo correspondente
          const allSports = await apiClient.getSports(true);
          const groupLeagues = allSports.filter(sport => 
            sport.group === targetGroup && 
            sport.active && 
            !sport.has_outrights // Geralmente não queremos mostrar 'Winner' etc. como liga
          );
          
          groupLeagues.sort((a, b) => a.title.localeCompare(b.title));
          
          console.log(`[SportDetailsPage] Leagues found for group ${targetGroup}:`, groupLeagues);
          setLeagues(groupLeagues);
        } catch (err) {
          console.error(`[SportDetailsPage] Error fetching leagues for group ${targetGroup}:`, err);
          setError(`Erro ao carregar as ligas de ${targetGroup}.`);
          setLeagues([]);
        }
      } else {
        // É uma chave de esporte/liga específica (ex: soccer_epl, basketball_nba)
        // Ou um slug que não foi mapeado como grupo (pode ser um erro ou esporte não suportado)
        setIsGroupPage(false);
        setGroupName('');
        setLeagues([]);
        console.log(`[SportDetailsPage] Detected specific sport/league key or unmapped slug: ${slug}. Fetching matches directly...`);
        try {
          // 1. Busca info do esporte (para título)
          const allSports = await apiClient.getSports(true);
          const currentSport = allSports.find(s => s.key === slug);
          // Se não encontrar info, pode ser um slug inválido ou não mapeado
          if (!currentSport) {
            console.warn(`[SportDetailsPage] No sport info found for key/slug: ${slug}. Treating as potentially invalid.`);
            setError(`Esporte ou liga não encontrado: ${slug}`);
            setIsLoading(false);
            return;
          }
          setSportInfo(currentSport);

          // 2. Busca os jogos diretamente (se for uma liga específica)
          setIsLoadingMatches(true); // Indica carregamento de jogos
          const eventsData = await apiClient.getOddsBySport(slug, 'eu', 'h2h'); // Ajustar region
          console.log(`[SportDetailsPage] Events/Odds received for ${slug}:`, eventsData);
          if (!eventsData || eventsData.length === 0) {
            setMatches([]);
          } else {
            const mappedMatches = eventsData.map(event => apiClient['mapEventOddsToMatch'](event));
            setMatches(mappedMatches);
          }
        } catch (err) {
          console.error(`[SportDetailsPage] Error fetching data for ${slug}:`, err);
          setError(`Erro ao carregar jogos para ${slug}. Verifique o console.`);
          setMatches([]);
        } finally {
            setIsLoadingMatches(false); // Finaliza carregamento de jogos
        }
      }
      setIsLoading(false);
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, isPlaceholder]); // Depende do slug e se é placeholder

  // Efeito para buscar partidas QUANDO uma liga é selecionada (em uma página de grupo)
  useEffect(() => {
    const fetchMatchesForLeague = async () => {
      if (!selectedLeagueKey) {
        setMatches([]); // Limpa partidas se nenhuma liga está selecionada
        return;
      }

      setIsLoadingMatches(true);
      setError(null);
      const apiClient = getOddsAPIClient();
      console.log(`[SportDetailsPage] Fetching matches for selected league: ${selectedLeagueKey}`);

      try {
        const eventsData = await apiClient.getOddsBySport(selectedLeagueKey, 'eu', 'h2h'); // Ajustar region
        console.log(`[SportDetailsPage] Events/Odds received for ${selectedLeagueKey}:`, eventsData);
        if (!eventsData || eventsData.length === 0) {
          setMatches([]);
        } else {
          const mappedMatches = eventsData.map(event => apiClient['mapEventOddsToMatch'](event));
          setMatches(mappedMatches);
        }
      } catch (err) {
        console.error(`[SportDetailsPage] Error fetching matches for league ${selectedLeagueKey}:`, err);
        // Define o erro, mas não limpa a seleção de liga, para o usuário ver o erro
        setError(`Erro ao carregar jogos para ${selectedLeagueKey}.`); 
        setMatches([]);
      } finally {
        setIsLoadingMatches(false);
      }
    };

    if (isGroupPage && selectedLeagueKey) {
      fetchMatchesForLeague();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLeagueKey, isGroupPage]); // Depende da liga selecionada e se é página de grupo

  // --- Funções Auxiliares ---
  // Atualizar para incluir ícones dos novos esportes
  const getGroupIcon = (groupSlugOrKey: string): string => {
    const lowerSlug = groupSlugOrKey.toLowerCase();
    if (lowerSlug.includes('soccer')) return '⚽';
    if (lowerSlug.includes('basketball')) return '🏀';
    if (lowerSlug.includes('tennis')) return '🎾';
    if (lowerSlug.includes('volleyball')) return '🏐';
    if (lowerSlug.includes('mma') || lowerSlug.includes('mixed_martial_arts')) return '🥊';
    if (lowerSlug.includes('esports')) return '🎮';
    // Adicionar mais casos se necessário
    return '🏅'; // Ícone padrão
  };

  // --- Renderização ---

  if (isLoading) {
    return <div className="container-custom py-8 text-center"><p className="text-gray-500">Carregando...</p></div>;
  }

  if (isPlaceholder) {
    return (
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-6">{getGroupIcon(slug)} {slug.charAt(0).toUpperCase() + slug.slice(1).replace(/_/g, ' ')}</h1>
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">Conteúdo para este esporte estará disponível em breve.</p>
          <Link href="/" className="mt-4 inline-block text-green-800 hover:text-green-600">
            Voltar para Home
          </Link>
        </div>
      </div>
    );
  }

  // Mostra erro principal se ocorreu ao carregar ligas ou info do esporte
  if (error && !isLoadingMatches && !selectedLeagueKey) { 
    return (
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-6">Erro ao Carregar</h1>
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Link href="/" className="text-green-800 hover:text-green-600">
            Voltar para Home
          </Link>
        </div>
      </div>
    );
  }

  // Renderização para Página de Grupo (Futebol, Basquete, Tênis, Vôlei, MMA, E-sports)
  if (isGroupPage) {
    const selectedLeagueName = leagues.find(l => l.key === selectedLeagueKey)?.title || '';
    const groupIcon = getGroupIcon(slug);
    const pageTitle = `${groupIcon} ${groupName} - Ligas Disponíveis`;

    return (
      <div className="container-custom">
        <h1 className="text-3xl font-bold my-6">{pageTitle}</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar com as ligas do grupo */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold mb-4">Selecione a Liga</h2>
            {leagues.length === 0 && !isLoading ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">Nenhuma liga ativa encontrada para {groupName}.</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                  {leagues.map((league) => (
                    <li key={league.key}>
                      <button
                        onClick={() => {
                          setError(null); // Limpa erro anterior ao selecionar nova liga
                          setSelectedLeagueKey(league.key);
                        }}
                        className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors text-left ${
                          selectedLeagueKey === league.key ? 'bg-green-50 border-l-4 border-green-800 font-semibold' : ''
                        }`}
                      >
                        <span>{league.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Conteúdo principal com as partidas da liga selecionada */}
          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold mb-4">
              {selectedLeagueKey ? `Próximos Jogos: ${selectedLeagueName}` : 'Selecione uma liga para ver os jogos'}
            </h2>
            
            {/* Mostra erro específico do carregamento de partidas aqui */}
            {error && selectedLeagueKey && <p className="text-red-500 mb-4">{error}</p>} 

            {selectedLeagueKey && isLoadingMatches ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">Carregando partidas...</p>
              </div>
            ) : selectedLeagueKey && matches.length > 0 ? (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {/* Tabela de Jogos */} 
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jogo</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data/Hora</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Casa</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Empate</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Fora</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Bookmaker</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {matches.map((match) => (
                        <tr key={match.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Link href={`/match/${match.id}?sport_key=${match.sport_key}`} className="text-green-800 hover:text-green-600 font-medium">
                              {match.homeTeam} vs {match.awayTeam}
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{match.date} {match.time}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-center font-medium">{match.odds.home > 0 ? match.odds.home.toFixed(2) : '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-center font-medium">{match.odds.draw !== null && match.odds.draw > 0 ? match.odds.draw.toFixed(2) : '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-center font-medium">{match.odds.away > 0 ? match.odds.away.toFixed(2) : '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{match.bookmaker}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : selectedLeagueKey && !isLoadingMatches && !error ? (
              // Só mostra 'nenhuma partida' se não estiver carregando e não houver erro
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">Não há partidas disponíveis para esta liga ({selectedLeagueName}) no momento.</p>
              </div>
            ) : null /* Não mostra nada se nenhuma liga foi selecionada ainda */}
          </div>
        </div>
      </div>
    );
  }

  // Renderização para Página de Esporte/Liga Específica (se slug não for um grupo mapeado)
  // Ex: Acessando diretamente /sports/soccer_epl
  const pageTitleDirect = sportInfo ? `${getGroupIcon(sportInfo.key)} ${sportInfo.title}` : `Esporte: ${slug}`; 
  return (
    <div className="container-custom">
      <h1 className="text-3xl font-bold my-6">{pageTitleDirect}</h1>
      <section>
        <h2 className="text-2xl font-bold mb-4">Próximos Jogos</h2>
        {isLoadingMatches ? (
             <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">Carregando partidas...</p>
              </div>
        ) : error ? (
             <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-red-500 mb-4">Erro ao carregar jogos: {error}</p>
              </div>
        ) : matches.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Tabela de Jogos */} 
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                 <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jogo</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data/Hora</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Casa</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Empate</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Fora</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Bookmaker</th>
                      </tr>
                    </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {matches.map((match) => (
                    <tr key={match.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link href={`/match/${match.id}?sport_key=${match.sport_key}`} className="text-green-800 hover:text-green-600 font-medium">
                          {match.homeTeam} vs {match.awayTeam}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{match.date} {match.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center font-medium">{match.odds.home > 0 ? match.odds.home.toFixed(2) : '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center font-medium">{match.odds.draw !== null && match.odds.draw > 0 ? match.odds.draw.toFixed(2) : '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center font-medium">{match.odds.away > 0 ? match.odds.away.toFixed(2) : '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{match.bookmaker}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">Nenhum jogo encontrado para {pageTitleDirect} no momento.</p>
          </div>
        )}
      </section>
    </div>
  );
}

