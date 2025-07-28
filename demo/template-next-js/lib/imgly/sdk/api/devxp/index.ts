import CreativeEditorSDK from '@cesdk/cesdk-js';

type SettingsProps = Partial<{}>;


type UnsubcribeFn = () => void

type Events = {
    'echo': string
}

export class DevXpApi {
    #cesdk: CreativeEditorSDK
    constructor(cesdk: CreativeEditorSDK) {
        this.#cesdk = cesdk;
    }

    async applySettings(values: Partial<SettingsProps>): Promise<SettingsProps> {
        return values;
    }
    async getSettings(): Promise<SettingsProps> {
        return {}
    }
    
    
    async applyScopes(values: Partial<SettingsProps>): Promise<SettingsProps> {
        return values;
    }
    async getScopes(): Promise<SettingsProps> {
        return {}
    }
    
    

    

    /** Subscriptions */
    on<K extends keyof Events>(event: K, listener: (payload: Events[K]) => void): UnsubcribeFn {
        return () => {}
    }

    
}
