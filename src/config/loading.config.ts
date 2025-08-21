export interface LoadingScreenConfig {
  type: 'default' | 'video' | 'custom';
  video?: {
    src: string;
    poster?: string;
    autoplay?: boolean;
    muted?: boolean;
    loop?: boolean;
  };
  custom?: {
    component: string;
    props?: Record<string, any>;
  };
  duration?: number;
  showProgress?: boolean;
}

export const loadingConfig: LoadingScreenConfig = {
  type: 'video', // Change to 'default' to use original loading screen
  video: {
    src: '/logo.mp4',
    poster: '/logo-poster.jpg',
    autoplay: true,
    muted: true,
    loop: false,
  },
  duration: 5000, // Maximum loading duration in milliseconds
  showProgress: false, // Hide progress for video loading
};

// Alternative configurations
export const loadingConfigs = {
  default: {
    type: 'default' as const,
    duration: 3000,
    showProgress: true,
  },
  video: {
    type: 'video' as const,
    video: {
      src: '/logo.mp4',
      poster: '/logo-poster.jpg',
    },
    duration: 5000,
    showProgress: false,
  },
  minimal: {
    type: 'default' as const,
    duration: 1500,
    showProgress: false,
  },
};
