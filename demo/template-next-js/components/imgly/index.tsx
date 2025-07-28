"use client";

import Component from './frameworks/next'

import CreativeEditorSDK, { type Configuration } from '@/lib/imgly/sdk'
import { useCallback } from 'react'


const config: Partial<Configuration> = {
    license: process.env.NEXT_PUBLIC_CESDK_LICENSE,
    // userId: 'guides-user',
    callbacks: { onUpload: 'local' as const } // enable local file uploads in the Asset Library
}

async function init(cesdk: CreativeEditorSDK) {
    cesdk.ui.showNotification("💗 IMG.LY CreativeEditor successfully started!")
    
}

export default () => {
    const initialize = useCallback(init, [config])
    return <Component config={config} onInitialize={initialize}></Component>
}