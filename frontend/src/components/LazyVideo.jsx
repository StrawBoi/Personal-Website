import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { performanceMonitor } from '../utils/performanceMonitor';

const LazyVideo = ({ 
  videoSrc, 
  posterSrc, 
  className = "", 
  width = "100%", 
  height = "auto",
  onLoad = () => {},
  style = {},
  videoId = `video_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            // Start performance monitoring
            performanceMonitor.startVideoLoadTimer(videoId);
            
            // Load the video when it enters viewport
            const source = video.querySelector('source[data-src]');
            if (source) {
              source.src = source.dataset.src;
              video.load();
              setIsLoaded(true);
              onLoad();
            }
            observer.unobserve(video);
          }
        });
      },
      {
        // Start loading when video is 100px away from viewport
        rootMargin: '100px',
        threshold: 0.1
      }
    );

    observer.observe(video);

    return () => {
      if (video) {
        observer.unobserve(video);
      }
    };
  }, [isLoaded, onLoad]);

  // Handle video load success
  const handleVideoLoad = () => {
    setIsVisible(true);
    // End performance monitoring
    performanceMonitor.endVideoLoadTimer(videoId);
  };

  // Handle video load error - fallback to poster
  const handleVideoError = () => {
    console.warn('Video failed to load, showing poster');
  };

  return (
    <motion.div
      className={`lazy-video-container ${className}`}
      style={{ width, height, ...style }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0.8 }}
      transition={{ duration: 0.5 }}
    >
      <video
        ref={videoRef}
        className="lazy-video w-full h-full object-cover rounded-lg"
        poster={posterSrc}
        autoPlay
        loop
        muted
        playsInline
        width={width}
        height={height}
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        style={{
          background: `url(${posterSrc}) center/cover no-repeat`,
          ...style
        }}
      >
        <source 
          data-src={videoSrc} 
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      
      {/* Loading indicator */}
      {!isVisible && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-gray-900/20 rounded-lg"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default LazyVideo;