// Performance monitoring utilities for lazy video loading
export class PerformanceMonitor {
  constructor() {
    this.videoLoadTimes = new Map();
    this.intersectionObserverSupported = 'IntersectionObserver' in window;
  }

  // Start timing video load
  startVideoLoadTimer(videoId) {
    this.videoLoadTimes.set(videoId, {
      startTime: performance.now(),
      loaded: false
    });
  }

  // End timing and calculate load duration
  endVideoLoadTimer(videoId) {
    const timing = this.videoLoadTimes.get(videoId);
    if (timing) {
      timing.endTime = performance.now();
      timing.loadDuration = timing.endTime - timing.startTime;
      timing.loaded = true;
      
      console.log(`🎥 Video ${videoId} loaded in ${timing.loadDuration.toFixed(2)}ms`);
      return timing.loadDuration;
    }
    return 0;
  }

  // Get performance metrics
  getMetrics() {
    const loadedVideos = Array.from(this.videoLoadTimes.values())
      .filter(timing => timing.loaded);
    
    return {
      totalVideos: this.videoLoadTimes.size,
      loadedVideos: loadedVideos.length,
      averageLoadTime: loadedVideos.length > 0 
        ? loadedVideos.reduce((sum, timing) => sum + timing.loadDuration, 0) / loadedVideos.length 
        : 0,
      intersectionObserverSupported: this.intersectionObserverSupported,
      bandwidthSaved: this.calculateBandwidthSaved()
    };
  }

  // Calculate estimated bandwidth saved by lazy loading
  calculateBandwidthSaved() {
    const unloadedVideos = Array.from(this.videoLoadTimes.values())
      .filter(timing => !timing.loaded).length;
    
    // Estimate: each video ~1MB, bandwidth saved = unloaded videos * average file size
    return {
      unloadedVideos,
      estimatedSavedMB: unloadedVideos * 1, // Assuming 1MB per video as per your specs
      message: `Saved approximately ${unloadedVideos}MB by not loading ${unloadedVideos} videos`
    };
  }

  // Log performance summary to console
  logPerformanceSummary() {
    const metrics = this.getMetrics();
    console.group('🚀 Lazy Video Loading Performance');
    console.log('📊 Metrics:', metrics);
    console.log('💾 Bandwidth Optimization:', metrics.bandwidthSaved);
    console.log('⚡ Average Load Time:', `${metrics.averageLoadTime.toFixed(2)}ms`);
    console.groupEnd();
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Enhanced lazy loading with performance monitoring
export const createOptimizedVideo = (videoSrc, options = {}) => {
  const {
    quality = 'low', // low, medium, high
    maxWidth = 480,   // Max width for optimization
    enableMetrics = true
  } = options;

  // Generate optimized video URL based on quality setting
  const getOptimizedUrl = (originalUrl) => {
    // In a real app, you'd have multiple quality versions
    // For demo purposes, we'll use the original but log the intent
    if (enableMetrics) {
      console.log(`🎯 Optimizing video for ${quality} quality, max width: ${maxWidth}px`);
    }
    return originalUrl;
  };

  return {
    src: getOptimizedUrl(videoSrc),
    poster: generatePosterUrl(videoSrc),
    optimized: true
  };
};

// Generate a simple SVG poster placeholder
const generatePosterUrl = (videoSrc) => {
  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#374151"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="18" 
            fill="#9CA3AF" text-anchor="middle" dy=".3em">Loading...</text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};