import CreativeEditorSDK from '@cesdk/cesdk-js';

type SettingsProps = Partial<{}>;


// type UnsubcribeFn = () => void

// type Events = {
//     'error': string
//     'export:done': string 
//     'upload:done': string
// }

// type Services = {
//     'logger': (msg: string, level: number) => void
//     'uploader': (file: any, source: any) => void
//     // [k: string]: 
// }

// type Handler = {
//     'log': (msg: string, level: number) => void,
//     'upload': ()
// }

// type Middlewares = {
//     '*': (req: any, res: any, next: any) => void
//     'assets.apply': (req: any, res: any, next: any) => void
//     "uri.resolve": (req: any, res: any, next: any) => void // used for uri resolver and alike
// }


// type feature 
// enable('feature')
// disable

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
    
    
    // 
    

    // /** Subscriptions to events with multiple listeners*/
    // emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    //     return 
    // }

    // on<K extends keyof Events>(event: K, listener: (payload: Events[K]) => void): UnsubcribeFn {
    //     return () => {}
    // }

    // /** Service registration */
    // set<K extends keyof Services>(service: K, handler: Services[K]): UnsubcribeFn {
    //     return () => {}
    // }
    // // register('logger')

    // /** commands */
    // // handle('upload')
    // // handle(upload) // used for command registration
    // // run(cmd, options)
    // // run(bg_removal, {params}, schema)
    

    // /** Middlewares */
    
    // use<K extends keyof Middlewares>(service: K, handler: Middlewares[K]): UnsubcribeFn {
    //     return () => {}
    // }


    
}
