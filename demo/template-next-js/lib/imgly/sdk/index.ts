import CreativeEditorSDK, { Configuration } from '@cesdk/cesdk-js';

import { DevXpApi } from './api/devxp';

// this is just a wrapper to inject custom wrapper
class ImglySDK extends CreativeEditorSDK {
    devXp?: DevXpApi;

    static async create(container: HTMLDivElement | string, config?: Configuration): Promise<ImglySDK> {
        let cesdk =  await CreativeEditorSDK.create(container, config) as ImglySDK
        cesdk.devXp = new DevXpApi(cesdk)
        return cesdk   
    }
}

export default ImglySDK;

export * from '@cesdk/cesdk-js';