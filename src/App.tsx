import { useState } from 'react';
import { Camera, Grid, Music, Settings, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider, useAppContext } from './AppContext';
import Booth from './components/Booth';
import Gallery from './components/Gallery';
import MusicTab from './components/MusicTab';
import SettingsTab from './components/SettingsTab';
import CollageTab from './components/CollageTab';

function AppContent() {
  const [activeTab, setActiveTab] = useState('booth');
  const { t, darkMode } = useAppContext();

  const tabs = [
    { id: 'booth', icon: Camera, label: t('booth') as string },
    { id: 'gallery', icon: Grid, label: t('gallery') as string },
    { id: 'collage', icon: Layers, label: t('collage') as string },
    { id: 'music', icon: Music, label: t('music') as string },
    { id: 'settings', icon: Settings, label: t('settings') as string },
  ];

  return (
    <div className={`flex flex-col h-[100dvh] w-full max-w-md mx-auto items-center justify-between text-zinc-900 dark:text-zinc-50 bg-zinc-50 dark:bg-zinc-950 overflow-hidden shadow-2xl`}>
      <header className="w-full flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0 z-10 bg-white/50 dark:bg-black/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
            <Camera className="w-4 h-4 text-white" />
          </div>
          <h1 className="font-semibold tracking-tight text-lg">{t('app_title')}</h1>
        </div>
      </header>

      <main className="flex-1 w-full overflow-y-auto relative custom-scrollbar">
        <AnimatePresence mode="wait">
          {activeTab === 'booth' && <Booth key="booth" />}
          {activeTab === 'gallery' && <Gallery key="gallery" />}
          {activeTab === 'collage' && <CollageTab key="collage" />}
          {activeTab === 'music' && <MusicTab key="music" />}
          {activeTab === 'settings' && <SettingsTab key="settings" />}
        </AnimatePresence>
      </main>

      <nav className="shrink-0 w-full bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 pb-safe">
        <div className="flex items-center justify-around p-3">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center gap-1.5 min-w-[64px] relative"
            >
              {activeTab === tab.id && (
                 <motion.div 
                   layoutId="nav-indicator"
                   className="absolute inset-0 -z-10 bg-zinc-100 dark:bg-zinc-800 rounded-xl"
                   transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                 />
              )}
              <tab.icon className={`w-5 h-5 transition-colors ${activeTab === tab.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-zinc-500 dark:text-zinc-400'}`} />
              <span className={`text-[10px] font-medium transition-colors ${activeTab === tab.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-zinc-500 dark:text-zinc-400'}`}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-zinc-100 dark:bg-black sm:py-6 sm:px-4 flex items-center justify-center">
        <AppContent />
      </div>
    </AppProvider>
  );
}

