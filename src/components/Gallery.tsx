import { useState } from 'react';
import Page from './Page';
import { useAppContext, Photo } from '../AppContext';
import { Download, Share2, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Gallery() {
  const { t, photos, removePhoto } = useAppContext();
  const [selected, setSelected] = useState<Photo | null>(null);

  const handleShare = async (photo: Photo) => {
    if (navigator.share) {
      try {
        const response = await fetch(photo.dataUrl);
        const blob = await response.blob();
        const file = new File([blob], `chronobooth-${photo.id}.png`, { type: 'image/png' });
        await navigator.share({
          title: 'ChronoBooth',
          text: `Check out my time travel to ${photo.era}!`,
          files: [file]
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      alert("Sharing not supported on this device.");
    }
  };

  const handleDownload = (photo: Photo) => {
    const a = document.createElement('a');
    a.href = photo.dataUrl;
    a.download = `chronobooth-${photo.id}.png`;
    a.click();
  };

  return (
    <Page className="p-4 bg-zinc-50 dark:bg-zinc-950 flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between mb-4 px-2 shrink-0">
        <h2 className="text-2xl font-bold tracking-tight">{t('gallery')}</h2>
        {photos.length > 0 && <span className="text-sm font-medium bg-zinc-200 dark:bg-zinc-800 px-3 py-1 rounded-full">{photos.length}</span>}
      </div>

      <div className="flex-1 overflow-y-auto pb-6 custom-scrollbar px-2">
        {photos.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-zinc-400">
             <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-2xl mb-4" />
             <p>{t('empty_gallery')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {photos.map(p => (
              <motion.div 
                layoutId={`photo-${p.id}`}
                key={p.id} 
                onClick={() => setSelected(p)}
                className="aspect-[3/4] bg-zinc-200 dark:bg-zinc-800 rounded-xl overflow-hidden cursor-pointer relative shadow-sm"
              >
                <img src={p.dataUrl} alt={p.era} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-8">
                  <p className="text-white text-xs font-medium truncate">{t(`eras.${p.era}` as any) || p.era}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4"
          >
            <button 
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.img 
              layoutId={`photo-${selected.id}`}
              src={selected.dataUrl} 
              className="max-w-full max-h-[70vh] rounded-2xl shadow-2xl object-contain"
            />
            {selected.audioUrl && (
               <audio autoPlay loop src={selected.audioUrl} className="hidden" />
            )}

            <motion.div 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
              className="mt-8 flex items-center gap-4"
            >
              <button 
                onClick={() => handleDownload(selected)}
                className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                  <Download className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">{t('download_hd')}</span>
              </button>

              <button 
                onClick={() => handleShare(selected)}
                className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                  <Share2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">{t('share')}</span>
              </button>

              <button 
                onClick={() => {
                  removePhoto(selected.id);
                  setSelected(null);
                }}
                className="flex flex-col items-center gap-2 text-red-400 hover:text-red-300 transition-colors ml-4"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                  <Trash2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">Delete</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Page>
  )
}
