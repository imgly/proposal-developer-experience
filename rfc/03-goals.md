## Goals
The primary goal is to make it obvious how to edit and modify the editor.
Therefore, the overarching Key Performance Indicator must be

> **Time to Interaction**



Additional requirements to achieve this are the following:
1. Getting started must be as easy as possible, no disruption the flow
2. Adding and modifying assets must be obvious, as having to launch off to the docs or first implementing your own server is a no-go.
3. LLM-readiness must be ensured. The context is key and the programmatic retrieval of information also. Best case even local and/or remote resources without human bloat things like e.g. css styling and so forth
4. A developer shouldn't have to go to the docs. Everything should be `obvious` how it works or `discoverable` at least.
5. Things should magically work as expected.
   <details>

   For colors we shall allow multiple entires
   1. arrays: [r,g,b], [r,g,b,a]
   2. objects: {r,g,b,a} or {c,m,y, k}
   3. strings:
      1. "#RRGGBB" and "#RRGGBBAA"
      2. "RGBA()", "CMYK()" // these are command calls?
   4. Predefined Named colors
      1. "green" 
      2. "telecom_magenta" 



  The same is true. Basically, we should implement an `into()` methodolgy to convert by best practice.
  > **Question:** What information should we store. The real input or the `infered` input? 
   </details>