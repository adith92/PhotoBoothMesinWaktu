import { useState } from 'react';
import { useAppContext } from '../AppContext';
import Page from './Page';
import { Moon, Sun, Globe, Database, Trash2, Cloud, Users, Shield } from 'lucide-react';

export default function SettingsTab() {
  const { lang, setLang, t, darkMode, setDarkMode, clearPhotos } = useAppContext();
  const [cleared, setCleared] = useState(false);

  const handleClear = () => {
    if (confirm("Are you sure?")) {
      clearPhotos();
      setCleared(true);
      setTimeout(() => setCleared(false), 2000);
    }
  };

  return (
    <Page className="p-6 bg-zinc-50 dark:bg-zinc-950 flex flex-col gap-6 overflow-y-auto">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight">{t('settings')}</h2>
        <p className="text-zinc-500 text-sm">Configure your time-travel experience.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <Globe className="w-5 h-5" />
            </div>
            <span className="font-medium">{t('language')}</span>
          </div>
          <select 
            className="bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg px-3 py-1.5 outline-none font-medium text-sm"
            value={lang} 
            onChange={(e) => setLang(e.target.value as any)}
          >
            <option value="en">English</option>
            <option value="id">Indonesia</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
              {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <span className="font-medium">{t('dark_mode')}</span>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-indigo-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}
          >
            <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${darkMode ? 'translate-x-6' : ''}`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 opacity-60">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <Database className="w-5 h-5" />
            </div>
            <span className="font-medium">{t('cloud_sync')}</span>
          </div>
          <span className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded font-mono">Pro</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 opacity-60">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
            <span className="font-medium">{t('collaboration')}</span>
          </div>
          <span className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded font-mono">Coming Soon</span>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 opacity-60">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
              <Shield className="w-5 h-5" />
            </div>
            <span className="font-medium">{t('privacy')}</span>
          </div>
        </div>

        <button 
          onClick={handleClear}
          className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-2xl border border-red-100 dark:border-red-900/50 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors font-medium mt-4"
        >
          <Trash2 className="w-5 h-5" />
          {cleared ? "Cleared!" : t('clear_data')}
        </button>
      </div>
    </Page>
  )
}
