# Custom Video Loading Screen Guide

## Overview
This guide explains how to set up and use the custom video loading screen feature in the DevDuo Creative Hub.

## Files Created
- `src/components/VideoLoadingScreen.tsx` - New video loading component
- `src/config/loading.config.ts` - Configuration file for loading screen settings
- Updated `src/App.tsx` - Added support for video loading screen

## How to Use

### 1. Add Your Video Files
Place your custom video files in the `public/` directory:
- `public/loading-video.mp4` - Your main loading video
- `public/loading-poster.jpg` - Poster image shown while video loads (optional)

### 2. Configure the Loading Screen
Edit `src/config/loading.config.ts` to customize your loading experience:

```typescript
export const loadingConfig: LoadingScreenConfig = {
  type: 'video', // Change to 'default' to use original loading screen
  video: {
    src: '/your-video-file.mp4', // Path to your video
    poster: '/your-poster.jpg',  // Optional poster image
    autoplay: true,
    muted: true,
    loop: false,
  },
  duration: 5000, // Maximum loading duration in milliseconds
  showProgress: false, // Hide progress for video loading
};
```

### 3. Available Configuration Options

#### Loading Types:
- **'video'**: Uses your custom video as loading screen
- **'default'**: Uses the original animated loading screen

#### Video Configuration:
- `src`: Path to your video file (must be in public/ directory)
- `poster`: Optional poster image shown while video loads
- `autoplay`: Auto-play the video (default: true)
- `muted`: Mute the video (default: true)
- `loop`: Loop the video (default: false)

### 4. Quick Setup Examples

#### Example 1: Video Loading Screen
```typescript
export const loadingConfig: LoadingScreenConfig = {
  type: 'video',
  video: {
    src: '/my-intro.mp4',
    poster: '/intro-poster.jpg',
  },
  duration: 8000,
};
```

#### Example 2: Default Loading Screen
```typescript
export const loadingConfig: LoadingScreenConfig = {
  type: 'default',
  duration: 3000,
  showProgress: true,
};
```

### 5. Video Requirements
- **Format**: MP4 (H.264 codec recommended)
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Duration**: 3-8 seconds recommended
- **File Size**: Keep under 10MB for optimal loading
- **Audio**: Optional (video is muted by default)

### 6. Testing Your Video
1. Place your video file in the `public/` directory
2. Update the configuration in `src/config/loading.config.ts`
3. Run the development server: `npm run dev`
4. The video should play automatically on page load

### 7. Troubleshooting

#### Video Not Playing
- Check that the video file exists in the `public/` directory
- Verify the file path in the configuration matches exactly
- Ensure the video format is supported by browsers (MP4 with H.264)

#### Video Loads Slowly
- Optimize your video file size
- Use a poster image to show something while the video loads
- Consider reducing video resolution or duration

#### Want to Revert to Original
Simply change `type: 'video'` to `type: 'default'` in the configuration file.

### 8. Advanced Customization
For more advanced customization, you can modify the `VideoLoadingScreen.tsx` component directly to add:
- Custom overlays
- Additional branding elements
- Interactive elements
- Different transition effects

## Support
If you encounter any issues, check the browser console for error messages and ensure your video files are properly placed in the public directory.
