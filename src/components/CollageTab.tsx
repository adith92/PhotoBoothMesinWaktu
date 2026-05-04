import Page from './Page';
import { useAppContext } from '../AppContext';
import { Layers, Image as ImageIcon } from 'lucide-react';

export default function CollageTab() {
  const { t, photos } = useAppContext();

  return (
    <Page className="p-6 bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-indigo-500/10">
        <Layers className="w-10 h-10" />
      </div>
      <h2 className="text-xl font-bold tracking-tight mb-2">{t('collage')}</h2>
      <p className="text-zinc-500 text-sm mb-8 px-4">
        Select multiple photos from your gallery to create beautiful time-travel collages.
      </p>
      
      {photos.length < 2 ? (
        <div className="p-6 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col items-center gap-3">
          <ImageIcon className="w-8 h-8 text-zinc-300 dark:text-zinc-700" />
          <p className="text-zinc-400 text-sm">Need at least 2 photos in gallery.</p>
        </div>
      ) : (
        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2">
          <Layers className="w-5 h-5" />
          Create New Collage
        </button>
      )}
    </Page>
  )
}
