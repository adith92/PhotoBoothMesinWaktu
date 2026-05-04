import { useState, useRef, useEffect, useCallback } from 'react';
import Page from './Page';
import { useAppContext } from '../AppContext';
import { generateCaricaturePortrait, generateMoodMusic } from '../gemini';
import { Camera, RefreshCcw, Save, Loader2, Wand2, Music, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Booth() {
  const { t, addPhoto } = useAppContext();
  const [era, setEra] = useState('mesir kuno');
  const [filter, setFilter] = useState('normal');
  const [withMusic, setWithMusic] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [enhancing, setEnhancing] = useState(false);
  const [isEnhanced, setIsEnhanced] = useState(false);
  
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [status, setStatus] = useState<'idle' | 'capturing' | 'processing' | 'done' | 'error'>('idle');
  const [resultImg, setResultImg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const eras = Object.keys(t('eras') as any);
  const filters = ['normal', 'sepia', 'grayscale', 'contrast'];

  const getCssFilter = (f: string, enhanced: boolean) => {
    let base = '';
    if (f === 'sepia') base = 'sepia(0.8) contrast(1.1)';
    else if (f === 'grayscale') base = 'grayscale(1) contrast(1.2)';
    else if (f === 'contrast') base = 'contrast(1.5) saturate(1.2)';
    
    if (enhanced) {
      base += ' contrast(1.15) saturate(1.25) brightness(1.05)';
    }
    
    return base.trim() || 'none';
  };

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 600 }, height: { ideal: 800 } } 
      });
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
      }
    } catch (err: any) {
      console.error(err);
      if (err.name === 'NotAllowedError' || err.message === 'Permission denied') {
        setErrorMsg((t('camera_denied') as string) || "Camera access denied.");
      } else {
        setErrorMsg("Camera access denied or unavailable.");
      }
      setStatus('error');
    }
  };

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      setStream(null);
    }
  }, [stream]);

  useEffect(() => {
    if (status === 'idle') startCamera();
    return () => stopCamera();
  }, [status]); // eslint-disable-line

  const applyCanvasFilter = (ctx: CanvasRenderingContext2D, w: number, h: number, filterType: string) => {
    // Only basic CSS-like filter directly via css string if supported, but let's do manual pixel or simple filter string
    if (filterType === 'sepia') ctx.filter = 'sepia(0.8) contrast(1.1) brightness(0.9)';
    else if (filterType === 'grayscale') ctx.filter = 'grayscale(1) contrast(1.2)';
    else if (filterType === 'contrast') ctx.filter = 'contrast(1.5) saturate(1.2)';
    else ctx.filter = 'none';
  };

  const handleCapture = async () => {
    if (!videoRef.current) return;
    setStatus('capturing');
    setErrorMsg('');

    try {
      // 1. Capture Face
      const faceCanvas = document.createElement('canvas');
      const cw = 600;
      const ch = 800;
      faceCanvas.width = cw;
      faceCanvas.height = ch;
      const fCtx = faceCanvas.getContext('2d')!;
      
      // Calculate crop to center
      const v = videoRef.current;
      const aspect = cw/ch;
      const vAspect = v.videoWidth / v.videoHeight;
      let sx = 0, sy = 0, sw = v.videoWidth, sh = v.videoHeight;
      if (vAspect > aspect) {
        sw = v.videoHeight * aspect;
        sx = (v.videoWidth - sw) / 2;
      } else {
        sh = v.videoWidth / aspect;
        sy = (v.videoHeight - sh) / 2;
      }

      fCtx.scale(-1, 1); // mirror
      fCtx.drawImage(v, sx, sy, sw, sh, -cw, 0, cw, ch);
      fCtx.setTransform(1,0,0,1,0,0);
      const faceDataUrl = faceCanvas.toDataURL('image/png');

      setStatus('processing');
      stopCamera();

      // 2. Generate Caricature (Gemini) and optional music
      const eraString = t(`eras.${era}`) as string;
      const [finalImgDataUrl, generatedAudio] = await Promise.all([
        generateCaricaturePortrait(faceDataUrl, eraString),
        withMusic ? generateMoodMusic(eraString).catch(e => { console.error("Music fail", e); return null; }) : Promise.resolve(null)
      ]);
      
      if (generatedAudio) setAudioUrl(generatedAudio);

      setResultImg(finalImgDataUrl);
      setStatus('done');

    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to generate scene.");
      setStatus('idle');
      startCamera();
    }
  };

  const handleSave = async () => {
    if (resultImg) {
      // Bake the filter and enhancement into the final saved image
      const finalFilter = getCssFilter(filter, isEnhanced);
      let saveUrl = resultImg;

      if (finalFilter !== 'none') {
        saveUrl = await new Promise<string>((resolve) => {
          const finalCanvas = document.createElement('canvas');
          const finalCtx = finalCanvas.getContext('2d')!;
          const cw = 600;
          const ch = 800;
          finalCanvas.width = cw;
          finalCanvas.height = ch;
          const img = new Image();
          img.onload = () => {
            finalCtx.filter = finalFilter;
            finalCtx.drawImage(img, 0, 0, cw, ch);
            resolve(finalCanvas.toDataURL('image/png'));
          };
          img.src = resultImg;
        });
      }

      addPhoto({
        id: Date.now().toString(),
        dataUrl: saveUrl,
        era,
        timestamp: Date.now(),
        ...(audioUrl ? { audioUrl } : {})
      });
      alert(t('save_success'));
      setStatus('idle');
      setAudioUrl(null);
      setIsEnhanced(false);
    }
  };

  const handleEnhance = () => {
    if (!resultImg || enhancing) return;
    setEnhancing(true);
    setTimeout(() => {
      setIsEnhanced(prev => !prev);
      setEnhancing(false);
    }, 800); // simulate AI analysis
  };

  return (
    <Page className="bg-black text-white flex flex-col h-full overflow-hidden items-center justify-center relative">
      
      {/* Top Controls */}
      {(status === 'idle' || status === 'done') && (
        <div className="absolute top-0 inset-x-0 p-4 z-20 flex flex-col gap-3 bg-gradient-to-b from-black/80 to-transparent pb-8 pt-6">
          <div className="flex w-full items-center gap-2">
            <select 
              value={era}
              onChange={e => setEra(e.target.value)}
              disabled={status === 'done'}
              className="flex-1 bg-black/50 border border-white/20 text-white rounded-xl px-4 py-2 text-sm font-medium backdrop-blur-md outline-none disabled:opacity-50"
            >
              {eras.map(e => <option key={e} value={e}>{t(`eras.${e}` as any)}</option>)}
            </select>
            <button
              onClick={() => setWithMusic(!withMusic)}
              disabled={status === 'done'}
              className={`p-2 rounded-xl border transition-colors disabled:opacity-50 ${
                withMusic 
                  ? 'bg-fuchsia-600 border-fuchsia-400 text-white shadow-lg shadow-fuchsia-600/30' 
                  : 'bg-black/50 border-white/20 text-white/50'
              }`}
              title={t('music_enabled') as string}
            >
              <Music className="w-5 h-5" />
            </button>
          </div>
          <div className="flex overflow-x-auto custom-scrollbar gap-2 pb-2 hide-scrollbar">
            {filters.map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${filter === f ? 'bg-indigo-600' : 'bg-white/20 hover:bg-white/30'}`}
              >
                {t(`filters.${f}` as any)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Camera/Status */}
      <div className="w-full max-w-sm aspect-[3/4] bg-zinc-900 rounded-3xl overflow-hidden relative shadow-2xl flex items-center justify-center">
        {status === 'error' && (
          <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center bg-zinc-950 z-50">
             <div className="w-16 h-16 bg-red-500/20 text-red-500 flex items-center justify-center rounded-2xl mb-4">
               <Camera className="w-8 h-8" />
             </div>
             <p className="text-zinc-400 text-sm max-w-[250px]">{errorMsg}</p>
             <button 
               onClick={() => { setStatus('idle'); setErrorMsg(''); }}
               className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm font-medium transition-colors"
             >
               Try Again
             </button>
          </div>
        )}

        {status === 'idle' && (
          <video 
            ref={videoRef}
            autoPlay 
            playsInline 
            muted 
            className={`w-full h-full object-cover transition-all duration-300 transform -scale-x-100`}
            style={{ filter: getCssFilter(filter, false) }}
          />
        )}

        <AnimatePresence>
          {status === 'capturing' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-white z-50 mix-blend-screen" />
          )}

          {status === 'processing' && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-40 p-6 text-center"
            >
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 border-t-4 border-indigo-500 rounded-full animate-spin" />
                <div className="absolute inset-2 border-b-4 border-fuchsia-500 rounded-full animate-spin" style={{ animationDirection: 'reverse' }} />
                <Wand2 className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white animate-pulse" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('generating_bg')}</h3>
              <p className="text-zinc-400 text-sm">{t('processing')}</p>
            </motion.div>
          )}

          {status === 'done' && resultImg && (
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }} 
               animate={{ opacity: 1, scale: 1 }} 
               className="w-full h-full relative"
            >
              <img 
                src={resultImg} 
                className="w-full h-full object-cover transition-all duration-300"
                style={{ filter: getCssFilter(filter, isEnhanced) }}
              />
              {/* Optional animated particles for extra "magic" */}
              <motion.div 
                className="absolute inset-0 pointer-events-none mix-blend-screen opacity-30" 
                animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }} 
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
              />

              {enhancing && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50">
                  <Wand2 className="w-10 h-10 text-yellow-400 animate-pulse" />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Framing Guide */}
        {status === 'idle' && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10 flex-col overflow-hidden">
            {/* Face Detection Brackets */}
            <div className="relative w-[50%] max-w-[200px] aspect-[3/4] flex items-center justify-center">
               <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-xl animate-pulse" />
               <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-xl animate-pulse" />
               <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-xl animate-pulse" />
               <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-xl animate-pulse" />
               
               <div className="absolute inset-0 border border-emerald-400/20 bg-emerald-400/5 rounded-xl" />
            </div>

            <div className="absolute top-[75%] flex flex-col items-center">
              <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest drop-shadow-md bg-black/50 px-3 py-1 rounded-full">[ Face Target ]</p>
              <p className="text-white/90 text-xs mt-2 drop-shadow-md text-center max-w-[250px] bg-black/40 px-3 py-1.5 rounded-lg backdrop-blur-sm">Sejajarkan wajah untuk Meme Face-Swap!</p>
            </div>
          </div>
        )}
      </div>

      {errorMsg && status !== 'error' && <p className="text-red-400 text-sm mt-4">{errorMsg}</p>}

      {/* Bottom Controls */}
      <div className="absolute bottom-6 inset-x-0 px-6 flex justify-center z-20">
        {status === 'idle' && (
          <button 
            onClick={handleCapture}
            className="w-20 h-20 rounded-full bg-white/20 p-2 backdrop-blur-md"
          >
             <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-black hover:scale-95 transition-transform active:bg-zinc-200">
               <Camera className="w-8 h-8" />
             </div>
          </button>
        )}

        {status === 'done' && (
          <div className="flex flex-col w-full max-w-xs gap-3">
            {audioUrl && (
              <audio autoPlay src={audioUrl} className="hidden" />
            )}
            <button 
              onClick={handleEnhance}
              disabled={enhancing}
              className={`w-full py-3 rounded-2xl font-medium transition-colors flex items-center justify-center gap-2 backdrop-blur-md ${isEnhanced ? 'bg-indigo-600/20 text-white border border-indigo-400' : 'bg-white/20 hover:bg-white/30 text-white'}`}
            >
               <Sparkles className={`w-5 h-5 ${isEnhanced ? 'text-indigo-400' : 'text-yellow-300'}`} /> {enhancing ? t('enhancing') : (isEnhanced ? 'Enhanced' : t('enhance_photo'))}
            </button>
            <div className="flex gap-3">
              <button 
                onClick={() => { setStatus('idle'); setAudioUrl(null); setIsEnhanced(false); }}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-2xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                 <RefreshCcw className="w-5 h-5" /> {t('retake')}
              </button>
              <button 
                onClick={handleSave}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
              >
                 <Save className="w-5 h-5" /> {t('save')}
              </button>
            </div>
          </div>
        )}
      </div>

    </Page>
  );
}
