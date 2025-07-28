import CreativeEditorSDK from '@cesdk/cesdk-js';

type SettingsProps = Partial<{}>;


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
    
    describeSettings(): Object {
        return {}
    }
}
