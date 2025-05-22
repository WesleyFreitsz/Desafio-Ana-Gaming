// src/components/ui/__tests__/Footer.test.tsx
import { render, screen } from '@testing-library/react';
import Footer from '@/components/layout/Footer';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('Footer Component', () => {
  it('renders footer with correct sections', () => {
    render(<Footer />);
    
    // Verifica se o título principal está presente
    expect(screen.getByText('BetView')).toBeInTheDocument();
    
    // Verifica se as seções estão presentes
    expect(screen.getByText('Links Rápidos')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
    
    // Verifica se os links de navegação estão presentes
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Esportes')).toBeInTheDocument();
    expect(screen.getByText('Favoritos')).toBeInTheDocument();
    expect(screen.getByText('Sobre')).toBeInTheDocument();
    
    // Verifica se as informações de contato estão presentes
    expect(screen.getByText('contato@betview.com.br')).toBeInTheDocument();
    expect(screen.getByText('(11) 9999-9999')).toBeInTheDocument();
    expect(screen.getByText('São Paulo, SP - Brasil')).toBeInTheDocument();
    
    // Verifica se o copyright está presente
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} BetView. Todos os direitos reservados.`)).toBeInTheDocument();
  });
});
