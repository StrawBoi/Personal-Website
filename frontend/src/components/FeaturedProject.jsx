import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

const DEFAULT_VIDEO = "https://customer-assets.emergentagent.com/job_dev-portfolio-609/artifacts/bnkz1nlp_A_cinematic_slowmotion_202510012318_6b5ws.mp4";

// Extract a poster frame from the video (if CORS allows); fall back to gradient
const usePosterFromVideo = (src) => {
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    let video;
    let onLoadedMetadata;
    let onSeeked;
    try {
      video = document.createElement('video');
      video.crossOrigin = 'anonymous';
      video.src = src;
      video.preload = 'metadata';
      onLoadedMetadata = () => {
        try {
          video.currentTime = Math.min(1, video.duration / 2) || 0.5;
        } catch (e) {
          // ignore
        }
      };
      onSeeked = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth || 1280;
          canvas.height = video.videoHeight || 720;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataURL = canvas.toDataURL('image/jpeg', 0.8);
          setPoster(dataURL);
        } catch (e) {
          // Fallback silently
        }
      };
      video.addEventListener('loadedmetadata', onLoadedMetadata);
      video.addEventListener('seeked', onSeeked);
    } catch (e) {
      // ignore
    }
    return () => {
      if (video) {
        video.removeEventListener('loadedmetadata', onLoadedMetadata);
        video.removeEventListener('seeked', onSeeked);
        video.src = '';
      }
    };
  }, [src]);

  return poster;
};

const FeaturedProject = ({
  title = 'Price Intelligence Dashboard',
  videoSrc = DEFAULT_VIDEO,
}) => {
  const cardVideoRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const poster = usePosterFromVideo(videoSrc);

  useEffect(() => {
    const v = cardVideoRef.current;
    if (!v) return;
    if (hovering) {
      v.muted = true;
      v.loop = true;
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [hovering]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(false); };
    if (lightbox) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightbox]);

  return (
    <section id="featured-project" className="py-24" data-testid="section-featured-project">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>Featured Project</h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div
            className="relative rounded-2xl overflow-hidden border cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.18)'
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onClick={() => setLightbox(true)}
            data-testid="cinematic-video-card"
          >
            {/* Poster layer */}
            <div
              className="absolute inset-0 z-10" 
              style={{
                backgroundImage: poster ? `url(${poster})` : 'radial-gradient(ellipse at center, rgba(20,184,166,0.25), transparent 60%), linear-gradient(135deg, #0b1220, #111827)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: hovering ? 0 : 1,
                transition: 'opacity 300ms ease',
              }}
            />

            {/* Video layer */}
            <video
              ref={cardVideoRef}
              className="w-full h-[320px] md:h-[420px] object-cover"
              src={videoSrc}
              playsInline
              muted
              loop
              preload="metadata"
            />

            {/* Title & play icon overlay */}
            <div className="absolute inset-0 z-20 flex items-end justify-between p-5">
              <div>
                <h3 className="text-white text-xl md:text-2xl font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>{title}</h3>
                <p className="text-gray-300 text-sm md:text-base">Hover to preview • Click to open</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full"
                   style={{ background: 'rgba(20,184,166,0.15)', border: '1px solid rgba(20,184,166,0.6)' }}>
                <Play className="text-teal-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              data-testid="video-lightbox"
            >
              <div className="relative w-full max-w-5xl">
                <button
                  onClick={() => setLightbox(false)}
                  className="absolute -top-10 right-0 text-white/80 hover:text-white"
                  data-testid="video-lightbox-close"
                >
                  <X size={28} />
                </button>
                <video
                  src={videoSrc}
                  className="w-full h-[60vh] object-contain bg-black"
                  controls
                  autoPlay
                  playsInline
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeaturedProject;