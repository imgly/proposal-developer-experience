## On UI Configuration
In general, the UI configuration should be as easy as possible, in the best version we have almost no other startup configuration than specify the root dependencies and servers

```js 
let engine = ImglyEditor.init({container: ""}) // pure default trial mode and default asset location 
let engine = ImglyEditor.init(
    {
    license: "apikey",
    baseURL: "..." # best case we autodetect it 
    }
    )
let editor = ImglyEditor.init({
    container: "where to place it", 
    license: "apikey"}) 

// react version 
<ImglyEditor license="apiKey" baseUrl="/this/is/the/way">

```