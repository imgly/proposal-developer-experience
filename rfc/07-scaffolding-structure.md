## On Scaffolding Structure
The `cli` purpose is to basically clone or get the right component template or project template.
In essence, I imagine it to bootstrap a structure as follows into something like `components/imgly` 


```
imgly/
├── icons/
│   ├── imgly.svg          # Icon set provided by imgly by default to be overwritten
│   ├── imgly.html         # Just a preview of loading all
│   └── custom.svg  
├── themes/
│   ├── light.theme.css 
│   ├── theme.css 
│   ├── dark.theme.css 
│   └── custom.theme.css
├── ui/
│   ├── button.js          # Default button being used
│   ├── adjustments.button.js 
│   ├── panel.js           # Prototype panel
│   ├── superduper.panel.js # Custom panel 
│   └── superduper/
│       └── panel.js 
├── locales/
│   ├── de.json            # Files loaded by editor, changing directly impacts translation
│   ├── en.json 
│   └── de.mykeys.json # Sidecar that extends the de language 
├── assetpacks/            # Asset packs. By definition one pack can provide various types of assets
│   ├── unsplash.js
│   ├── unsplash.js
│   ├── custom.js           
│   ├── local.js           # Loader for local images in the public folder
│   └── upload.js          
├── types/                 # TypeScript type definitions
│   └── imgly.d.ts         # Type definitions for everything in here
├── solutions/ 
│   ├── settings.js        # Default settings if only one solution is used
│   ├── photoeditor.settings.js 
│   ├── videoeditor.settings.js 
│   ├── custom.settings.js
│   └── player.settings.js
├── scopes/
│   ├── scopes.js          # Default scopes for all users
│   ├── user.scopes.js     # Default scopes for a specific class of users
│   └── creator.scopes.js
├── plugins/
│   └── ...                # Plugins structure should replicate core structure
├── framework/             # framework specific wrappers
│   ├── react.js 
│   └── next.js
└── index.ts               # Main entry point that loads everything
```


### Assets
It should be very easy to see how to implement asset sources. For the simplest case, we manage assets, note that most frameworks expect assets to be served via a CDN or the local dev server in a `/public` folder. As such we have to detect that folder or at least let the user choose that folder. I guess for safety purposes we shall put all imgly stuff into a subfolder 

```
public/imgly/
├── uploads/               # Special folder used by the default upload configuration
├── designs/
│   ├── scenes/           # Saved designs documents, the name is arbitrary
│   ├── templates/
│   └── components/       # Saved components
├── brand/                # Brand specific stuff
├── elements/
│   ├── images/
│   ├── videos/
│   ├── audio/
│   ├── subtitles/
│   └── .../
└── styles/
    ├── captions/
    ├── text/
    ├── shadows/
    └── .../
```

Not sure yet we shall ship them together with the rest but conceptually each framework has a framework specific light-weight wrapper on the web. Would be easier if we ship them, though I don't know yet if that would explode the `package.json`. In worst case we just ship the one that we scaffolded in the beginning as we also installed the packages.


I am also proposing the following names

1. Asset Source is a single source, the origin of an asset or how to fetch an asset
   1. E.g. Google drive is an asset source
   2. E.g. Pexels as source
   3. E.g. S3 as source
2. Asset Library is a curated collection of assets from one or multiple asset sources
   1. E.g. Curated collection of 
3. Asset packs are bundled and themed collections
   1. Christmas asset pack
   2. Funny stickers asset pack 
   