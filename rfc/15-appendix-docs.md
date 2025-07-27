# On document structure

Our current document structure 



```json
 "A scsne w"
```
```jsonc
{
"$uuid": "",
"$tags": "",
"$ref": "copy and paste from other",
"x-extension": "", 
"description": "A photorealistic cinematic 16:9 shot of a minimal pastel creative workspace with light wood flooring and soft daylight streaming in from the side. At the center sits a sealed white toolbox glowing softly with the IMG.LY logo. The toolbox hums, then bursts open in a radiant explosion of pixel particles. Floating midair are editing toolbars, style presets, photo/video editing UI, alignment guides, mobile and browser mockups of embedded editors, floating code snippets (React, Swift, Kotlin), collaboration avatars, comment bubbles, and dynamic canvases with masks, layers, and smart stickers. Subtle cyan and violet LED accents highlight the transformation as the space evolves into a vibrant creative studio. Ambient icons nod to Varys, PESDK, and VESDK. No text. Front-facing wide-angle camera for symmetrical reveal. Ending with a fully active creative suite radiating collaborative energy."
}


```



## References – Prompt to Structured
```json
 
```



**A typical json for image generators**
```json
{
  "description": "Photorealistic cinematic shot of a minimal pastel workspace with light wood flooring and soft daylight streaming in. A sealed white toolbox with the IMG.LY logo and a subtle cyan glow sits at the center. It hums, then bursts open in a radiant, pixel-infused puff. The room transforms instantly. No text.",
  "style": "photorealistic cinematic",
  "camera": "fixed wide angle, front-facing for symmetrical reveal",
  "lighting": "soft, diffused daylight with light cyan and violet LED accents",
  "room": "blank creative workspace transformed into a vibrant IMG.LY studio",
  "elements": [
    "IMG.LY toolbox (logo visible, soft glow)",
    "floating UI components from CreativeEditor SDK",
    "photo and video editing toolbars hovering midair",
    "style presets and filter thumbnails animating into place",
    "snapping grids and alignment guides",
    "mobile devices and browser mockups showing embedded editors",
    "floating code snippets (React, Swift, Kotlin)",
    "collaboration avatars and comment bubbles",
    "dynamic canvas with layers, masks, and smart stickers",
    "subtle nods to Varys, PESDK, VESDK in ambient icons"
  ],
  "motion": "toolbox opens, pixel particles explode out and rapidly assemble creative editing interfaces, canvases, and tools in midair",
  "ending": "a fully active creative suite, glowing with collaborative energy and dynamic media capabilities",
  "text": "none",
  "keywords": [
    "16:9",
    "IMG.LY",
    "CreativeEditor SDK",
    "visual editing tools",
    "pixel explosion",
    "no text",
    "photorealistic",
    "cinematic reveal",
    "creative tech studio"
  ]
}

```

```json
{
  "description": "A photorealistic cinematic scene of a pastel workspace with light wood floors and soft daylight. At the center, a glowing white IMG.LY toolbox bursts open in a radiant pixel explosion, transforming the room into a vibrant creative studio.",
  "style": "photorealistic cinematic",
  "camera": "wide angle, symmetrical front view",
  "lighting": "soft daylight with cyan and violet LED accents",
  "motion": "toolbox opens, pixel particles burst out, assembling creative tools midair",
  "ending": "a fully active, collaborative creative suite",
  "elements": [
    "IMG.LY toolbox (logo visible, cyan glow)",
    "floating UI components from CreativeEditor SDK",
    "photo/video editing toolbars",
    "style presets and filter thumbnails",
    "grids and alignment guides",
    "mockups of mobile and browser editors",
    "floating code snippets (React, Swift, Kotlin)",
    "avatars and comment bubbles",
    "dynamic canvas with layers, masks, stickers",
    "ambient icons referencing Varys, PESDK, VESDK"
  ],
  "text": "none",
  "keywords": [
    "16:9",
    "IMG.LY",
    "CreativeEditor SDK",
    "pixel explosion",
    "cinematic reveal",
    "creative tech studio"
  ]
}

```