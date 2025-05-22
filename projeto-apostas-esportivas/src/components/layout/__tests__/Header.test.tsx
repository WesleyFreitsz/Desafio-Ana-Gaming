// src/components/ui/__tests__/Header.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/layout/Header';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('Header Component', () => {
  it('renders logo and navigation links', () => {
    render(<Header />);
    
    // Verifica se o logo está presente
    expect(screen.getByText('BetView')).toBeInTheDocument();
    
    // Verifica se os links de navegação estão presentes
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Esportes')).toBeInTheDocument();
    expect(screen.getByText('Favoritos')).toBeInTheDocument();
    expect(screen.getByText('Sobre')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('toggles mobile menu when button is clicked', () => {
    render(<Header />);
    
    // O menu mobile deve estar inicialmente fechado
    const mobileLinks = screen.queryAllByText('Home');
    expect(mobileLinks.length).toBe(1); // Apenas o link desktop deve estar visível
    
    // Encontra o botão de menu mobile e clica nele
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    
    // Agora o menu mobile deve estar aberto
    const mobileLinksAfterClick = screen.queryAllByText('Home');
    expect(mobileLinksAfterClick.length).toBe(2); // Agora deve haver dois links (desktop e mobile)
  });
});
