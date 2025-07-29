'use client';

import CreativeEditorSDK, { Configuration } from '@/lib/imgly/sdk';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ErrorBoundary from './react/ErrorBoundary';



const defaultConfig = {
};


export type CreativeEditorProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'config' | 'onInitialize'> & {
  config?: Partial<Configuration>;
  onInitialize?: (instance: CreativeEditorSDK) => Promise<void>;
}


const defaultInitialize = async (cesdk: CreativeEditorSDK) => {
  await Promise.all([
    cesdk.addDefaultAssetSources(),
    cesdk.addDemoAssetSources({ sceneMode: 'Design' })
  ]);

  await cesdk.createDesignScene();
}
function CreativeEditor(props: CreativeEditorProps) {
  const cesdk_container = useRef<HTMLDivElement>(null);
  const [cesdk, setCesdk] = useState<CreativeEditorSDK | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Use config from props or fall back to default
  const config = props.config || defaultConfig;
  const initializeEditor = useCallback(props.onInitialize || defaultInitialize, [props.onInitialize]);
  
useEffect(() => {
  // prevent initialization if the container element is not available yet
  if (!cesdk_container.current) {
    return;
  }
  let cleanedUp = false;

  CreativeEditorSDK.create(cesdk_container.current, config).then(
    async (cesdk: CreativeEditorSDK) => {

      if (cleanedUp) {
        cesdk?.dispose();
        return;
      }

      try {
        await initializeEditor(cesdk);

        // this is a fallback if initialize didn't create a scene
        if (cesdk.engine.scene.get() === null) {
          const sceneId = cesdk.engine.scene.create()
          const pageId = cesdk.engine.block.create('//ly.img.ubq/page')
          cesdk.engine.block.appendChild(sceneId, pageId);
        }

        setCesdk(cesdk);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to initialize Creative Editor:', err);
        setError(err instanceof Error ? err : new Error('Failed to initialize editor'));
        cesdk?.dispose();
        setIsLoading(false);
      }
    }
  ).catch((err) => {
    console.error('Failed to create Creative Editor:', err);
    setError(err instanceof Error ? err : new Error('Failed to create editor'));
    setIsLoading(false);
  });

  // cleanup function to dispose of the CESDK instance when the component unmounts
  const cleanup = () => {
    // clear the local state and dispose of the CS.SDK instance (if it has been assigned)
    cleanedUp = true;
    if (cesdk) {
      cesdk.dispose();
    }
    setCesdk(null);
    setError(null);
  };

  // to ensure cleanup runs when the component unmounts
  return cleanup;
}, [cesdk_container, initializeEditor, config]);

if (error) {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <h2>Error loading Creative Editor</h2>
      <p>{error.message}</p>
    </div>
  );
}

const { style, className, config: _, onInitialize: __, ...restProps } = props;

return (
  // the container HTML element where the CESDK editor will be mounted
  <div
    {...restProps}
    ref={cesdk_container}
    className={className}
    style={{ width: '100vw', height: '100vh', ...style }}
  >
    {isLoading && (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <p>Loading Creative Editor...</p>
      </div>
    )}
  </div>
);
}

export default function CreativeEditorComponent(props: CreativeEditorProps) {
  return (
    <ErrorBoundary>
      <CreativeEditor {...props} />
    </ErrorBoundary>
  );
}