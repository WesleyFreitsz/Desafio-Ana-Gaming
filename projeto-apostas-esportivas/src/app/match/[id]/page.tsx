// src/app/match/[id]/page.tsx
// Página de Detalhes da Partida
import { Suspense } from 'react';
import Link from 'next/link';

interface MatchPageProps {
  params: {
    id: string;
  };
}

export default function MatchPage({ params }: MatchPageProps) {
  const { id } = params;

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/sports" className="text-blue-600 hover:text-blue-800 inline-block mb-6">
        ← Voltar para Esportes
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Detalhes da Partida</h1>
          <p className="text-blue-100">ID: {id}</p>
        </div>

        <Suspense fallback={<div className="p-6">Carregando detalhes da partida...</div>}>
          {/* Aqui serão exibidos os detalhes da partida */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="flex flex-col items-center mb-4 md:mb-0">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold">FLA</span>
                </div>
                <h2 className="text-xl font-semibold">Flamengo</h2>
              </div>

              <div className="flex flex-col items-center mb-4 md:mb-0">
                <div className="text-center px-4 py-2 bg-gray-100 rounded-lg mb-2">
                  <p className="text-sm text-gray-500">22/05/2025 - 19:00</p>
                  <p className="text-sm text-gray-500">Campeonato Brasileiro</p>
                </div>
                <div className="text-3xl font-bold">
                  2 - 1
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold">PAL</span>
                </div>
                <h2 className="text-xl font-semibold">Palmeiras</h2>
              </div>
            </div>
          </div>
        </Suspense>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-100 px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Odds Disponíveis</h2>
          </div>
          <Suspense fallback={<div className="p-6">Carregando odds...</div>}>
            {/* Aqui serão exibidas as odds disponíveis */}
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Resultado Final</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-blue-50 transition cursor-pointer">
                    <p className="font-medium">Flamengo</p>
                    <p className="text-xl font-bold text-blue-600 mt-2">2.10</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-blue-50 transition cursor-pointer">
                    <p className="font-medium">Empate</p>
                    <p className="text-xl font-bold text-blue-600 mt-2">3.25</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-blue-50 transition cursor-pointer">
                    <p className="font-medium">Palmeiras</p>
                    <p className="text-xl font-bold text-blue-600 mt-2">3.50</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Ambas Equipes Marcam</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-blue-50 transition cursor-pointer">
                    <p className="font-medium">Sim</p>
                    <p className="text-xl font-bold text-blue-600 mt-2">1.85</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-blue-50 transition cursor-pointer">
                    <p className="font-medium">Não</p>
                    <p className="text-xl font-bold text-blue-600 mt-2">1.95</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Total de Gols</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-blue-50 transition cursor-pointer">
                    <p className="font-medium">Menos de 1.5</p>
                    <p className="text-xl font-bold text-blue-600 mt-2">3.60</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-blue-50 transition cursor-pointer">
                    <p className="font-medium">Mais de 1.5</p>
                    <p className="text-xl font-bold text-blue-600 mt-2">1.30</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-blue-50 transition cursor-pointer">
                    <p className="font-medium">Menos de 2.5</p>
                    <p className="text-xl font-bold text-blue-600 mt-2">2.10</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-blue-50 transition cursor-pointer">
                    <p className="font-medium">Mais de 2.5</p>
                    <p className="text-xl font-bold text-blue-600 mt-2">1.70</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-blue-50 transition cursor-pointer">
                    <p className="font-medium">Menos de 3.5</p>
                    <p className="text-xl font-bold text-blue-600 mt-2">1.40</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center hover:bg-blue-50 transition cursor-pointer">
                    <p className="font-medium">Mais de 3.5</p>
                    <p className="text-xl font-bold text-blue-600 mt-2">2.90</p>
                  </div>
                </div>
              </div>
            </div>
          </Suspense>
        </section>

        <section className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-100 px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Estatísticas</h2>
          </div>
          <Suspense fallback={<div className="p-6">Carregando estatísticas...</div>}>
            {/* Aqui serão exibidas as estatísticas da partida */}
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">65%</span>
                    <span className="text-sm text-gray-500">Posse de Bola</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-red-500 w-[65%]"></div>
                    <div className="bg-green-500 w-[35%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">15</span>
                    <span className="text-sm text-gray-500">Finalizações</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-red-500 w-[65%]"></div>
                    <div className="bg-green-500 w-[35%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">7</span>
                    <span className="text-sm text-gray-500">Finalizações no Gol</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-red-500 w-[70%]"></div>
                    <div className="bg-green-500 w-[30%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">5</span>
                    <span className="text-sm text-gray-500">Escanteios</span>
                    <span className="font-medium">4</span>
                  </div>
                  <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-red-500 w-[55%]"></div>
                    <div className="bg-green-500 w-[45%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">2</span>
                    <span className="text-sm text-gray-500">Cartões Amarelos</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-red-500 w-[40%]"></div>
                    <div className="bg-green-500 w-[60%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">0</span>
                    <span className="text-sm text-gray-500">Cartões Vermelhos</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-red-500 w-[0%]"></div>
                    <div className="bg-green-500 w-[100%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </Suspense>
        </section>
      </div>
    </main>
  );
}
