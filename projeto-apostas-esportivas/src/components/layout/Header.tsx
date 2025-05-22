'use client';

// src/components/layout/Header.tsx
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            BetView
          </Link>

          {/* Menu para desktop */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-200 transition">
              Home
            </Link>
            <Link href="/sports" className="hover:text-blue-200 transition">
              Esportes
            </Link>
            <Link href="#" className="hover:text-blue-200 transition">
              Favoritos
            </Link>
            <Link href="#" className="hover:text-blue-200 transition">
              Sobre
            </Link>
          </nav>

          {/* Botão de login para desktop */}
          <div className="hidden md:block">
            <Link 
              href="#" 
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
          <nav className="md:hidden mt-4 pb-2 space-y-3">
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
              href="#" 
              className="block hover:bg-blue-700 px-3 py-2 rounded-md transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Favoritos
            </Link>
            <Link 
              href="#" 
              className="block hover:bg-blue-700 px-3 py-2 rounded-md transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link 
              href="#" 
              className="block bg-white text-blue-700 px-3 py-2 rounded-md font-medium hover:bg-blue-50 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
