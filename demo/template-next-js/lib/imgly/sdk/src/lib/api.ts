import CreativeEditorSDK, { Configuration } from '@cesdk/cesdk-js';

import FutureAPI from '../api/future';

// this is just a wrapper to inject custom wrapper
class ImglySDK extends CreativeEditorSDK {
    future?: FutureAPI;

    static async create(container: HTMLDivElement | string, config?: Configuration): Promise<ImglySDK> {
        let cesdk =  await CreativeEditorSDK.create(container, config) as ImglySDK
        cesdk.future = new FutureAPI(cesdk)
        return cesdk   
    }
}

export default ImglySDK;

export * from '@cesdk/cesdk-js';