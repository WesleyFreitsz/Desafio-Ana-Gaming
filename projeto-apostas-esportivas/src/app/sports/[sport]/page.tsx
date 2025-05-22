// src/app/sports/[sport]/page.tsx
// Página de Ligas por Esporte
import { Suspense } from 'react';
import Link from 'next/link';

interface SportPageProps {
  params: {
    sport: string;
  };
}

export default function SportPage({ params }: SportPageProps) {
  const { sport } = params;
  const sportName = getSportName(sport);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/sports" className="text-blue-600 hover:text-blue-800 mr-2">
          ← Voltar para Esportes
        </Link>
        <h1 className="text-3xl font-bold">{sportName}</h1>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Ligas Disponíveis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense fallback={<div>Carregando ligas...</div>}>
            {/* Aqui serão listadas as ligas do esporte selecionado */}
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Campeonato Brasileiro</h3>
              <p className="text-gray-600 mb-4">Principal competição de clubes do Brasil</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">24 times</span>
                <Link href={`/match/123`} className="text-blue-600 hover:text-blue-800">
                  Ver jogos →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Copa do Brasil</h3>
              <p className="text-gray-600 mb-4">Torneio eliminatório com clubes de todo o país</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">92 times</span>
                <Link href={`/match/456`} className="text-blue-600 hover:text-blue-800">
                  Ver jogos →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Libertadores</h3>
              <p className="text-gray-600 mb-4">Principal competição de clubes da América do Sul</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">32 times</span>
                <Link href={`/match/789`} className="text-blue-600 hover:text-blue-800">
                  Ver jogos →
                </Link>
              </div>
            </div>
          </Suspense>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Jogos Recentes</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Suspense fallback={<div className="p-4">Carregando jogos recentes...</div>}>
            {/* Aqui serão listados os jogos recentes do esporte */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partida</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resultado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Liga</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">22/05/2025</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Flamengo vs Palmeiras</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 - 1</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Campeonato Brasileiro</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      <Link href={`/match/123`}>Ver detalhes</Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20/05/2025</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">São Paulo vs Corinthians</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0 - 0</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Campeonato Brasileiro</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      <Link href={`/match/456`}>Ver detalhes</Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Suspense>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Próximos Jogos</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Suspense fallback={<div className="p-4">Carregando próximos jogos...</div>}>
            {/* Aqui serão listados os próximos jogos do esporte */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partida</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Liga</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Odds (Casa-Empate-Fora)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">25/05/2025</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Fluminense vs Botafogo</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Campeonato Brasileiro</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2.10 - 3.25 - 3.50</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      <Link href={`/match/789`}>Ver detalhes</Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">26/05/2025</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Grêmio vs Internacional</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Campeonato Brasileiro</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2.50 - 3.10 - 2.90</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      <Link href={`/match/101`}>Ver detalhes</Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Suspense>
        </div>
      </section>
    </main>
  );
}

// Função auxiliar para obter o nome do esporte a partir da chave
function getSportName(sportKey: string): string {
  const sportNames: Record<string, string> = {
    'soccer': 'Futebol',
    'basketball': 'Basquete',
    'tennis': 'Tênis',
    'americanfootball': 'Futebol Americano',
    'baseball': 'Beisebol',
    'hockey': 'Hóquei',
    // Adicione mais esportes conforme necessário
  };
  
  return sportNames[sportKey] || sportKey.charAt(0).toUpperCase() + sportKey.slice(1);
}
