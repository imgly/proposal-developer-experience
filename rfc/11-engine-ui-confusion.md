## On Engine and UI confusion relaxation 

I think `@cesdk/engine` and `@cesdk/js` packages could be merged into one. As such also assets and everything which comes with that are in one package.
We have to release them together anyhow.

### Option 1: exports variants
There are at least two ways I could think of 

```jsonc filename=package.json 
{
    ...
    "exports": {
        ".": "./dist/index.js", // the ui as is 
        "engine": "./dist/engine.js"
    }
}
```

Then, we can import one or the other by
```js
import UI from '@imgly/sdk';
import Engine from '@imgly/sdk/engine';
```

On a note, this could also be a good pattern to import `internal` apis or experimental by

```JS
import UI from '@imgly/sdk/experimental';
import UI from '@imgly/sdk/compatLayerV1'; // to check another api version
import UI from '@imgly/sdk/v2'; // to use another compilation
```

### Option 2: dynamic imports (untested)

The engine is already shipped with the UI, as such we could always only import `@imgly/sdk`