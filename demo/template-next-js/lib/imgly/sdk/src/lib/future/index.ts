import CreativeEditorSDK from '@cesdk/cesdk-js';

type SettingsProps = Partial<{}>;


type UnsubcribeFn = () => void

type Events = {
    'error': string
    'export:done': string 
    'upload:done': string
}

type Services = {
    'logger': (msg: string, level: number) => void
    'uploader': (file: any, source: any) => void
    // [k: string]: 
}

// type Handler = {
//     'log': (msg: string, level: number) => void
// }

type Middlewares = {
    '*': (req: any, res: any, next: any) => void
    'assets.apply': (req: any, res: any, next: any) => void
    "uri.resolve": (req: any, res: any, next: any) => void // used for uri resolver and alike
}


// type feature 
// enable('feature')
// disable

export default class FutureAPI {
    constructor(_cesdk: CreativeEditorSDK) {
        // Store cesdk when needed
        
    }

    // on('settings.updated', (event))
    async applySettings(values: SettingsProps): Promise<SettingsProps> {
        // cesdk.run('apply_settings', JSON.stringify(values))
        // cesdk.describe() // describe the api as Markdown or json schema
        // path settings
        return values;
    }
    async getSettings(): Promise<SettingsProps> {

        return {}
    }
    
    async setSettings(_values: SettingsProps) {
        // overwrite complete setting / for now it's a reset and write
    }
    
    async applyScopes(values: Partial<SettingsProps>): Promise<SettingsProps> {
        return values;
    }
    async getScopes(): Promise<SettingsProps> {
        return {}
    }
    
    
    // 
    

    /** Subscriptions to events with multiple listeners*/
    emit<K extends keyof Events>(event: K, payload: Events[K]): void {
        return 
    }

    on<K extends keyof Events>(event: K, listener: (payload: Events[K]) => void): UnsubcribeFn {
        return () => {}
    }

    /** Service registration */
    set<K extends keyof Services>(service: K, handler: Services[K]): UnsubcribeFn {
        return () => {}
    }
    // register('logger')

    /** commands */
    // handle('upload')
    // handle(upload) // used for command registration
    // run(cmd, options)
    // run(bg_removal, {params}, schema)
    

    /** Middlewares */
    
    use<K extends keyof Middlewares>(service: K, handler: Middlewares[K]): UnsubcribeFn {
        return () => {}
    }


    
}
