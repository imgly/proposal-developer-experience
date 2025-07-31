"use client";

import Component from './frameworks/next'

import ImglySDK, { type Configuration } from '@imgly/sdk'
import { useCallback } from 'react'

import '@/components/imgly/themes/theme.css';
import locales from './locales'

const config: Partial<Configuration> = {
    license: process.env.NEXT_PUBLIC_CESDK_LICENSE,
    // api_version: "1.5.6",  // use this to bind yourself to a specific api version
    // userId: 'guides-user',
    callbacks: { onUpload: 'local' as const },
    theme: 'dark'
}

async function init(imgly: ImglySDK) {
    imgly.ui.showNotification("💗 IMG.LY CreativeEditor successfully started!")

    
    // test settings
    {
        let result = await imgly.devXp?.getSettings();
        console.debug("Settings:before", result)
        result = await imgly.devXp?.applySettings({})
        console.debug("Settings:settings", result)
    }
    // test scopes
    {
        let result = await imgly.devXp?.getScopes();
        console.debug("Scopes:before", result)
        result = await imgly.devXp?.applySettings({})
        console.debug("Scopes:settings", result)
    }

    // translation
    {
        imgly.i18n.setTranslations(locales)
        // we might need an apply translations
        const languages = navigator.languages ?? "en";
        console.log("Languages", languages);
        
        // cesdk.i18n.setLocale("peter")
        // for (const language of languages) {
        //     console.debug("trying Language:", language)
        //     // BUG(Daniel): setLocale crashes if locale doesn't exist
        // }
    }
    // theming
    {
        // document.querySelector(".ubq-public").style.setProperty("--ubq-elevation-1", "red") 
    }
}

export default () => {
    const initialize = useCallback(init, [config])
    return <Component config={config} onInitialize={initialize}></Component>
}