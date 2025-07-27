# Best practices for intergration with other frameworks

1. Provide framework specific hanler (/react)
2. Provide hooks 
3. provide react ui include

Follow the pattern of:

Exporting a createApiHandler(config) or nextHandler(req, res)

Providing middleware, hooks, and React UI

Allowing flexibility: don’t force users to adopt your entire stack


## 🧩 Developer UX Goals for NextJs and Others
✅ Should work with both pages/ and app/ routers
✅ Can be tree-shaken if not used
✅ Supports server/client-side code separation
✅ Easy to opt-in/override individual pieces
✅ Clear documentation and examples



## Notes
[ChatGpt](https://chatgpt.com/c/6884d41a-089c-832e-b2df-a9f2d3f5922d)