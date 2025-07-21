## On UI Modification 
UI modification should and must be understandable and best case serializable. Also we always want little as possible code.
Therefore, I propose some updates to the API and 

The proposal api looks like this:
```jsonc
menu.setItems({
    "order": [
        {
            "type": "button", // no preregistering necessary for one time use
            "id": "my.custom.id" , // used to autogenerate labels and other stuff
            "params": { // maybe just inline this?
                // "label": "my.custom.id", // Optional: if the automation isn't sufficient
                //"icon": "my.custom.id",
                
                "on_click": ({params, context}) => { doSomething }, // Note we might reuse a global registered dispatcher function as we will pass the name of the function or in this case the id to the function call. Therefore easiest way we have just on handler

                "is_selected": ({params, context}) => { doSomething },
                // NOTE this would be possible with commands 
                // "on_click: "the.command.to.be.called", 
                // "is_selected": "whatever.is.needed.to.define.state",
            },
            "when": "Condition to be met" // only evaluated if the global condition of all 
        }
    ],
    "when": ({context}) => { doSomething },
    })
```
Note we may also just use a registered "preset"
```JS
ui.registerComponent('my.button', "same as above")
```

Then this would become 

```js
menu.setItems({
    order: [
        {
            "id": "my.custom.button" , # used to autogenerate labels and other stuff
            "params": {
                "on_click": ({params, context}) => { doSomething },
                "is_selected": ({params, context}) => { doSomething },
            },
            "when": "Condition to be met" // only evaluated if the global condition of all items is true. Lets us remove singular buttons
        }
    ],
    when: "condition to be met" // we already have that
    )

```


> **NOTE** that the function and serialization of this could be allowed by allow `commands` as string to be entered instead of pure javascript functions. 


(Optional) We also could allow sticking in builder components directly if needed. I'd prefer 

In order to understand the improvements, let's deep dive into the current state.

We can already modify the User Interface by using the preregistered buttons which one can access under keys like `ly.img.effect.inspectorBar` to define the `order` of items in bars etc.
```js
[
    "ly.img.spacer",
    "ly.img.shape.options.inspectorBar".
    "ly.img.text.typeFace.inspectorBar" ,
    ...
]
```
It must be noted that while this can be used to `set` the `order`, the getter will be returning 

```js
[
        { id: "ly.img.spacer" },
        { id: "ly.img.shape.options.inspectorBar" },
        { id: "ly.img.text.typeFace.inspectorBar" },
]
```
as the above is just a short form.

The most hindering parts are these: 

1. API is not bijective which is confusing
2. Buttons are specifically registered with postfixes `.inspectorBar` to clarify their use case which leads to multiple buttons having the same functionality registered under different names. Note that the code is still the same unless something changes like the "button background color".
3. There is no insight how a specific button is implemented, even changing its icon or behavior leads to a reimplementation of the aforementioned button from scratch.



I have realized that we can already pass any payload to our `ui builder`. 
Docs currently this leads to an option to very much simplify the API
The proposal would be to remove all the very specific IDs and replace them with a generic button class, this button class can then be used almost everywhere. In order to 

```


```
Here is an example of the status quo in order to under register a button

```typescript
const componentBuilder =
  ({ instance }: { instance: CreativeEditorSDK }) =>
  (
    context: BuilderRenderFunctionContext<{
      key: string;
      icon: string;
      label: string;
      variant: string;
      isSelected: () => boolean;
      onClick: () => void;
    }>
  ) => {
    let myState = context.state("my-state", Math.random().toString());
    
    const key = context.payload?.key ?? "universal-button";
    const icon = context.payload?.icon ?? "@imgly/Adjustments";
    const label = context.payload?.label ?? "Button";
    const variant = context.payload?.variant as "regular" | "plain" | undefined;
    const isSelected = context.payload?.isSelected ?? (() => false);
    const onClick =
      () => {
        console.debug(
          "Button clicked with ",
          key,
          " and payload",
          context.payload,
          " and state",
          myState.value
        );
      };
    context.builder.Button(key, {
      label,
      icon,
      isSelected: isSelected(),
      variant,
      onClick
    });
  };

export default componentBuilder;

```