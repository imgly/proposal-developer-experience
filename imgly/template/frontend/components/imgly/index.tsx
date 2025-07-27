
// const imgly = await Imgly.init({container: "selector", license: "" })
// <Imgly init=initialize  license=mylicen />

type ImglyEditor = any
type ImglyEngine = any

type ImglySdk = ImglyEditor | ImglyEngine

import {PhotoEditor} from './solutions'
import icons from "./icons"

async function initialize(imgly: ImglySdk) {
    // imgly.loadSolution()
    imgly.applySettings(settings)
    imgly.applyScopes(scopes)
    imgly.setIconsSet({imgly: icons})
    

    
    //imgly.on('export', (result) => {})

}