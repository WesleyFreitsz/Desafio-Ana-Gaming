// src/contexts/SportsContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getSports, getOdds } from '@/lib/api';
import { Sport, Event } from '@/types/sports';

interface SportsContextType {
  sports: Sport[];
  loading: boolean;
  error: string | null;
  selectedSport: Sport | null;
  events: Event[];
  setSelectedSport: (sport: Sport) => void;
  fetchEventsBySport: (sportKey: string) => Promise<void>;
}

const SportsContext = createContext<SportsContextType | undefined>(undefined);

export function SportsProvider({ children }: { children: ReactNode }) {
  const [sports, setSports] = useState<Sport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function loadSports() {
      try {
        setLoading(true);
        const data = await getSports();
        setSports(data);
      } catch (err) {
        setError('Falha ao carregar esportes. Tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadSports();
  }, []);

  async function fetchEventsBySport(sportKey: string) {
    try {
      setLoading(true);
      const data = await getOdds(sportKey);
      setEvents(data);
    } catch (err) {
      setError('Falha ao carregar eventos. Tente novamente mais tarde.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SportsContext.Provider
      value={{
        sports,
        loading,
        error,
        selectedSport,
        events,
        setSelectedSport,
        fetchEventsBySport: fetchEventsBySport,
      }}
    >
      {children}
    </SportsContext.Provider>
  );
}

export function useSports() {
  const context = useContext(SportsContext);
  if (context === undefined) {
    throw new Error('useSports deve ser usado dentro de um SportsProvider');
  }
  return context;
}
