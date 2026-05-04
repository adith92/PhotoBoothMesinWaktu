import { useState, useRef } from 'react';
import Page from './Page';
import { useAppContext } from '../AppContext';
import { generateMoodMusic } from '../gemini';
import { Music, Play, Pause, Loader2, Sparkles } from 'lucide-react';

export default function MusicTab() {
  const { t } = useAppContext();
  const [mood, setMood] = useState('Epic cinematic battle');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleGenerate = async () => {
    if (!mood.trim()) return;
    setLoading(true);
    setAudioUrl(null);
    try {
      const url = await generateMoodMusic(mood);
      setAudioUrl(url);
    } catch (err) {
      alert("Error generating music. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <Page className="p-6 bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center">
      <div className="w-full max-w-sm flex flex-col gap-6 mt-4">
        
        <div className="text-center">
          <div className="w-16 h-16 bg-fuchsia-50 dark:bg-fuchsia-900/20 text-fuchsia-500 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3 shadow-xl shadow-fuchsia-500/10">
            <Music className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-1">{t('music')}</h2>
          <p className="text-zinc-500 text-sm">AI Composer for your journey.</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col gap-4">
          <input 
            type="text" 
            value={mood}
            onChange={e => setMood(e.target.value)}
            placeholder={t('enter_mood') as string}
            className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-shadow"
          />
          <button 
            onClick={handleGenerate}
            disabled={loading || !mood.trim()}
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-fuchsia-300 dark:disabled:bg-fuchsia-900 text-white rounded-xl py-3 font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-fuchsia-600/30"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            {loading ? t('music_generating') : t('generate_music')}
          </button>
        </div>

        {audioUrl && (
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-lg shadow-black/5 border border-zinc-200 dark:border-zinc-800 flex flex-col items-center gap-6 mt-4">
            <div className="relative">
              <div className={`absolute inset-0 rounded-full bg-fuchsia-500/20 blur-xl transition-opacity animate-pulse ${playing ? 'opacity-100' : 'opacity-0'}`} />
              <button 
                onClick={togglePlay}
                className="w-20 h-20 bg-fuchsia-600 text-white rounded-full flex items-center justify-center relative z-10 shadow-xl hover:scale-105 active:scale-95 transition-transform"
              >
                {playing ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>
            </div>
            
            <div className="text-center">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">AI Soundtrack</p>
              <p className="text-xs text-zinc-500 max-w-[200px] truncate">{mood}</p>
            </div>

            <audio 
              ref={audioRef} 
              src={audioUrl} 
              onEnded={() => setPlaying(false)}
              onPause={() => setPlaying(false)}
              onPlay={() => setPlaying(true)}
              className="hidden"
            />
          </div>
        )}

      </div>
    </Page>
  );
}
