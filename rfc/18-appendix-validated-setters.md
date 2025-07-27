# On Validated setters

Generally, `set` and `get` functions are defined as followed

```typescript

function setValue(val): void;
function getValue(val): number;
```

It's easy to understand that in deterministic systems the `set` doesn't need a return as `val` will be the taken value. However, in more complex systems. the `val` could be validated and transformed into something else and the caller might want to know the new real value. Therefore, I propose

```typescript
function setValue(val: int): int; 
```


It goes furhter, cause if we modify more complex values like `objects` or `arrays`, we may want to only change parts of the value

```typescript

function setValue([{ op: "write", value: 42, path: ""}])

setValue({ op: "write", value: 42, path: ""})
setValue({ op: "write", value: [42,32,4], path: "/array/0"})
setValue({ op: "write", value: null, path: "/array/0"})
setValue({ op: "move", value: "/new/path/0", path: "/array/0"})

```