# Notes on Tools

It merges the best of both worlds. AI and Human in tandem, being able to use the same tools together in a loop.

I think it's best to give them a namespace like mcp tools


```


tools.imgly.tool 
tools.call('imgly.tool')
tools.handle("imgly", {
    tool: (a,b,)
} )

tools.handle('imgly.tool', (a,b,c) => )

tools.handle('imgly.tool', (params: { a,b,c}, context: {}) => )

```