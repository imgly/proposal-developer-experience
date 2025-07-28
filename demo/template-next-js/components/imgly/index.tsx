"use client";

import Component from './frameworks/next'

import CreativeEditorSDK, { type Configuration } from '@/lib/imgly/sdk/cli'
import { useCallback } from 'react'

import '@/components/imgly/themes/theme.css';
import locales from './locales'

const config: Partial<Configuration> = {
    license: process.env.NEXT_PUBLIC_CESDK_LICENSE,
    // userId: 'guides-user',
    callbacks: { onUpload: 'local' as const },
    theme: 'dark'
}

async function init(cesdk: CreativeEditorSDK) {
    cesdk.ui.showNotification("💗 IMG.LY CreativeEditor successfully started!")

    // test settings
    {
        let result = await cesdk.devXp?.getSettings();
        console.debug("Scopes:before", result)
        result = await cesdk.devXp?.applySettings({})
        console.debug("Scopes:settings", result)
    }
    // test scopes
    {
        let result = await cesdk.devXp?.getScopes();
        console.debug("Scopes:before", result)
        result = await cesdk.devXp?.applySettings({})
        console.debug("Scopes:settings", result)
    }

    {
        const languages = navigator.languages ?? "en";
        console.log("Languages", languages);
        cesdk.i18n.setTranslations(locales)
        
        for(const language of languages) {
            console.debug("trying Language:", language)
            // BUG(Daniel): setLocale crashes if locale doesn't exist
        
            // cesdk.i18n.setLocale(language)
        }
        
        
    }
}

export default () => {
    const initialize = useCallback(init, [config])
    return <Component config={config} onInitialize={initialize}></Component>
}