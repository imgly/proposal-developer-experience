import CreativeEditorSDK, { Configuration } from '@cesdk/cesdk-js';

import FutureAPI from '../api/future';

// Extended SDK class that wraps the CE.SDK with additional functionality
class ImglySDK extends CreativeEditorSDK {
    future?: FutureAPI;
    devXp?: FutureAPI; // Alias for backward compatibility

    static async create(container: HTMLDivElement | string, config?: Configuration): Promise<ImglySDK> {
        // Ensure proper configuration defaults
        const defaultConfig: Partial<Configuration> = {
            baseURL: config?.baseURL || 'https://cdn.img.ly/packages/imgly/cesdk-js/1.56.0/assets',
            ...config
        };
        
        // Create the base CE.SDK instance
        const cesdk = await CreativeEditorSDK.create(container, defaultConfig) as ImglySDK;
        
        // Initialize custom extensions
        cesdk.future = new FutureAPI(cesdk);
        cesdk.devXp = cesdk.future; // Maintain backward compatibility
        
        return cesdk;
    }
}

export default ImglySDK;

export * from '@cesdk/cesdk-js';