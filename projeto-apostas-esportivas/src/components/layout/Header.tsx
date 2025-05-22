'use client';

// src/components/layout/Header.tsx
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Função para lidar com a busca
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      // Simulação de busca - em produção, isso seria uma chamada real à API
      // Aguarda 500ms para simular o tempo de resposta da API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Busca por partidas que correspondem à consulta
      // Em uma implementação real, isso seria uma chamada à API
      const results = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .catch(() => {
          // Fallback para quando a API não está disponível durante o desenvolvimento
          return [
            { id: '1', home_team: 'Flamengo', away_team: 'Palmeiras', league: 'Brasileirão', sport: 'soccer', commence_time: '2025-05-25T19:00:00Z' },
            { id: '2', home_team: 'Lakers', away_team: 'Celtics', league: 'NBA', sport: 'basketball', commence_time: '2025-05-24T23:30:00Z' },
            { id: '3', home_team: 'Nadal', away_team: 'Djokovic', league: 'Roland Garros', sport: 'tennis', commence_time: '2025-05-26T14:00:00Z' }
          ].filter(match => 
            match.home_team.toLowerCase().includes(query.toLowerCase()) || 
            match.away_team.toLowerCase().includes(query.toLowerCase()) ||
            match.league.toLowerCase().includes(query.toLowerCase()) ||
            match.sport.toLowerCase().includes(query.toLowerCase())
          );
        });
      
      setSearchResults(results);
    } catch (error) {
      console.error('Erro na busca:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para lidar com a submissão do formulário de busca
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  // Função para navegar para a página de detalhes da partida
  const navigateToMatch = (id: string) => {
    router.push(`/match/${id}`);
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  // Efeito para fechar os resultados da busca quando clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.search-container')) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Função para formatar a data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            BetView
          </Link>

          {/* Barra de busca */}
          <div className="hidden md:block flex-grow mx-6 max-w-xl search-container">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                placeholder="Buscar por time, liga, esporte ou data..."
                className="w-full py-2 px-4 pr-10 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.length >= 3) {
                    handleSearch(e.target.value);
                    setIsSearchOpen(true);
                  } else {
                    setSearchResults([]);
                    setIsSearchOpen(false);
                  }
                }}
                onFocus={() => {
                  if (searchQuery.length >= 3) {
                    setIsSearchOpen(true);
                  }
                }}
              />
              <button
                type="submit"
                className="absolute right-3 top-2.5 text-gray-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Resultados da busca */}
              {isSearchOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg overflow-hidden">
                  {isLoading ? (
                    <div className="p-4 text-gray-500">Buscando...</div>
                  ) : searchResults.length > 0 ? (
                    <ul>
                      {searchResults.map((result) => (
                        <li 
                          key={result.id}
                          className="border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer"
                          onClick={() => navigateToMatch(result.id)}
                        >
                          <div className="p-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium text-gray-800">
                                  {result.home_team} vs {result.away_team}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {result.league} • {result.sport.charAt(0).toUpperCase() + result.sport.slice(1)}
                                </p>
                              </div>
                              <p className="text-xs text-gray-500">
                                {formatDate(result.commence_time)}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : searchQuery.length >= 3 ? (
                    <div className="p-4 text-gray-500">Nenhum resultado encontrado</div>
                  ) : null}
                </div>
              )}
            </form>
          </div>

          {/* Menu para desktop */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-200 transition">
              Home
            </Link>
            <Link href="/sports" className="hover:text-blue-200 transition">
              Esportes
            </Link>
          </nav>

          {/* Botão de login para desktop */}
          <div className="hidden md:block">
            <Link 
              href="/auth/signin" 
              className="bg-white text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition"
            >
              Login
            </Link>
          </div>

          {/* Botão de menu mobile */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2 space-y-3">
            {/* Barra de busca mobile */}
            <div className="mb-3 search-container">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Buscar partida..."
                  className="w-full py-2 px-4 pr-10 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value.length >= 3) {
                      handleSearch(e.target.value);
                      setIsSearchOpen(true);
                    } else {
                      setSearchResults([]);
                      setIsSearchOpen(false);
                    }
                  }}
                  onFocus={() => {
                    if (searchQuery.length >= 3) {
                      setIsSearchOpen(true);
                    }
                  }}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>

              {/* Resultados da busca mobile */}
              {isSearchOpen && (
                <div className="absolute z-10 mt-1 left-4 right-4 bg-white rounded-lg shadow-lg overflow-hidden">
                  {isLoading ? (
                    <div className="p-4 text-gray-500">Buscando...</div>
                  ) : searchResults.length > 0 ? (
                    <ul>
                      {searchResults.map((result) => (
                        <li 
                          key={result.id}
                          className="border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer"
                          onClick={() => navigateToMatch(result.id)}
                        >
                          <div className="p-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium text-gray-800">
                                  {result.home_team} vs {result.away_team}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {result.league} • {result.sport.charAt(0).toUpperCase() + result.sport.slice(1)}
                                </p>
                              </div>
                              <p className="text-xs text-gray-500">
                                {formatDate(result.commence_time)}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : searchQuery.length >= 3 ? (
                    <div className="p-4 text-gray-500">Nenhum resultado encontrado</div>
                  ) : null}
                </div>
              )}
            </div>

            <nav className="space-y-3">
              <Link 
                href="/" 
                className="block hover:bg-blue-700 px-3 py-2 rounded-md transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/sports" 
                className="block hover:bg-blue-700 px-3 py-2 rounded-md transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Esportes
              </Link>
              <Link 
                href="/auth/signin" 
                className="block bg-white text-blue-700 px-3 py-2 rounded-md font-medium hover:bg-blue-50 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
