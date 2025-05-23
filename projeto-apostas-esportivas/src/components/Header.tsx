'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/auth/auth-context';
import LoginModal from '@/components/auth/LoginModal';

type HeaderProps = {
  isLoggedIn?: boolean;
  username?: string;
};

export default function Header({ isLoggedIn = false, username = 'User123' }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, openModal, logout } = useAuth();

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="container-custom py-4">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-green-800">SportOdds</span>
            </Link>
            
            <div className="flex items-center space-x-8">
              <nav className="flex space-x-6">
                <Link href="/" className="text-gray-800 hover:text-green-700 font-medium">
                  Home
                </Link>
                <Link href="/sports" className="text-gray-800 hover:text-green-700 font-medium">
                  Esportes
                </Link>
              </nav>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-green-800 flex items-center justify-center text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium">{user.name}</span>
                <button 
                  onClick={logout}
                  className="ml-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  Sair
                </button>
              </div>
            ) : (
              <button onClick={openModal} className="btn-primary">
                Login GitHub
              </button>
            )}
          </div>
          
          {/* Mobile Header */}
          <div className="flex md:hidden items-center justify-between">
            <div className="flex items-center">
              <button
                type="button"
                className="p-2 rounded-md text-gray-700"
                onClick={() => {}}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
            
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-green-800">SportOdds</span>
            </Link>
            
            <button
              type="button"
              className="p-2 rounded-md text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 py-3 border-t border-gray-200">
              <nav className="flex flex-col space-y-3">
                <Link href="/" className="text-gray-800 hover:text-green-700 font-medium">
                  Home
                </Link>
                <Link href="/sports" className="text-gray-800 hover:text-green-700 font-medium">
                  Esportes
                </Link>
                {user ? (
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-green-800 flex items-center justify-center text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <button 
                      onClick={logout}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Sair
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openModal();
                    }} 
                    className="btn-primary inline-block text-center"
                  >
                    Login GitHub
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>
      
      {/* Login Modal */}
      <LoginModal />
    </>
  );
}
