## On Settings

The general configuration contains defining general set of features and behaviour of the editor. It can also include settings for plugins. The idea is to stick close to concepts known from other configuration like `vscode` and similar.
Configuration might include settings or order of items from the canvas & the UI. As such for now their is no distinct differentiation between how we want to control and persist settings from the ui and from the engine and editor.

The main difference is that instead of having to understand to call various functions to `get` and `set` properties. I am proposing to have a single

```typescript 

// we opt to 
async function getSettings({filter?: JsonPath}):Partial<Settigns>;

// We opt to also return data as the applySettings may validate and constrain settings and reutrn the resulting one after some transofmrations applied
async function applySettings(settings: Partial<Settings>): Partial<Settings>;
```


(Optional) it might be wise to allow also Jsonpatches to modify the settings, while it's hard to use by humans, it might be 

```ts
// here I am not sure if one should use JsonPatch or Delta protocol from CRDTs
async function patchSettings(settings: JsonPatch<Settings>): Partial<Settings>;
```


> **NOTE**, the config will not get these methods as the config is basically immutable and only passed during initalization time


The settings itself should then become a simple json, yaml or js file that can easily be set or update by hand. With modern features like hot reloading this should be a major upgrade. 


<!-- @import "../examples/settings.example.jsonc" {code_block=true class="line-numbers" syntax="jsonc"} -->


Additionally, we want to keep the full spec of the assets, as such generating a UI and or bindings should be relatively easy


<!-- @import "../examples/settings.schema.json" {code_block=true class="line-numbers"} -->