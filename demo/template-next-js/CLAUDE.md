# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture Overview

This is a Next.js 15 application using the App Router with Tailwind CSS v4 and the Creative Editor SDK (CE.SDK).

### Key Components

1. **Creative Editor SDK Integration**: The main feature is the CE.SDK integration (`@cesdk/cesdk-js`), implemented with:
   - `app/components/CreativeEditorSDK.js`: Main CE.SDK component with initialization logic
   - `app/components/CreativeEditorSDKNoSSR.js`: Dynamic import wrapper to disable SSR for CE.SDK
   - The SDK is configured with a license key and initializes with demo assets

2. **Component Architecture**: 
   - Components use client-side rendering (`"use client"` directive) for CE.SDK compatibility
   - Dynamic imports prevent SSR issues with browser-only CE.SDK APIs
   - The editor mounts to a full viewport container (100vw x 100vh)

3. **Build Configuration**:
   - Uses Next.js Turbopack for faster development builds
   - Tailwind CSS v4 with PostCSS configuration
   - Minimal next.config.mjs with default settings

## Important Notes

- CE.SDK requires client-side rendering - always use the NoSSR wrapper when importing
- The license key in CreativeEditorSDK.js should be replaced with a valid production key
- Asset uploads are configured for local handling (`onUpload: 'local'`)