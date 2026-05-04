import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lang, translations } from './i18n';

export interface Photo {
  id: string;
  dataUrl: string;
  era: string;
  timestamp: number;
  audioUrl?: string;
}

interface AppContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof translations.en | string) => string;
  darkMode: boolean;
  setDarkMode: (enabled: boolean) => void;
  photos: Photo[];
  addPhoto: (p: Photo) => void;
  removePhoto: (id: string) => void;
  clearPhotos: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('id');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [photos, setPhotos] = useState<Photo[]>(() => {
    try {
      const saved = localStorage.getItem('chrono_photos');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('chrono_photos', JSON.stringify(photos));
  }, [photos]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const t = (key: any): string => {
    // Check nested keys safely for eras/filters
    const keys = key.split('.');
    let val: any = translations[lang];
    for (const k of keys) {
      val = val?.[k];
    }
    return val !== undefined ? val : key;
  };

  const addPhoto = (p: Photo) => setPhotos(prev => [p, ...prev]);
  const removePhoto = (id: string) => setPhotos(prev => prev.filter(p => p.id !== id));
  const clearPhotos = () => {
      setPhotos([]);
      localStorage.removeItem('chrono_photos');
  }

  return (
    <AppContext.Provider value={{ lang, setLang, t, darkMode, setDarkMode, photos, addPhoto, removePhoto, clearPhotos }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
