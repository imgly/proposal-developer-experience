## Appendix: Commands

Commands might just feel like an abstraction layer but would enable multiple use cases.

1. Separate UI logic to business logic to reuse it and make it serializable. This also would allow to reuse button logic
   <details>
   ```jsonc
    {
        "id": 'ly.img.button',
        "on_click": { 
            "type": "command", 
            "command": {
                "name": "customCommand",
                "extra": {} //additional params to be passed 
            } },
        "on_click": {
            "type": "command",
            "command": "customCommand"
        }
        "on_click": "command:customCommand?extra=param",
    }
    ```
   </details>
2. Implementing Hooks by substituting existing commands and functionality by your own.
    <details>
    ```js
        const cmdFunc = imgly.getCommand("ly.img.call_me_cracy");
        imgly.registerAsyncCommand("ly.img.call_me_cracy", async ({args, context}) => {
            console.trace("Begin calling command ${args$.$command_name}")
            const oldResult = await oldCommand({params, context}) 
            console.trace("End calling command ${args$.$command_name}")
        } )
    ```
    </details>

3. Reuse for humans and AI. As with the correct definition like `JSON Schema` or `JSON RPC` we are close to what is needed for AI function/Tool calling
4. Self describing API. Especially in dynamic environments or scripting languages, it could be used to live generate bindings. As such storing this information deeply may be beneficial. So, there is an `rpc.describe()`

Depending on the feature it could look like that

It could look like this 
```
commands/
├── removebg.cmd.ts        # Full definition of a command to be used
├── removebg/
│   └── cmd.ts 
├── adjustments.cmd.ts 
├── superAi.cmd.ts         # Introduce new command to be used by AI and other 
├── myAnimation.cmd.ts     # Foreshadowing 
├── myFilter.cmd.ts        # Foreshadowing
└── myFill.cmd.ts
```