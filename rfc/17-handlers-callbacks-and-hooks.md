# On Handlers, Callbacks and Hooks (+Middlewares)


We often have confusion between these differnt things


A `handler` is an imperative function that is used to perform an action

```typescript
// Alternate names doExport, runExport, handleExport 
async function handleExport ({params}) {

}


async function handleUri({params}) {

}


```



A `callback` is used as a result of something

```ts

async function onExportDoneHandler({result}) {
    // use and process the result
}

const unsubscribe = suscribe('ExportDone')
const off = on('exportDone', exportDoneHandler)

```




A `hook` is used to pre or post-process an existing flow. Generally it can modify in and outputs of a given function

```ts

function preExport() 

function postExport();
function postUpload();


```

A `middleware` is something that is run **around** certain functions and more general. Also it can be stacked

```typescript

useExportMiddlware(() => {})

```