---
tags: [pets]
params:
  limit: {type: integer, short: l, required: false, min: 1}
result: {
  type: integer
}
errors:
  100: pets busy
examples:
- params: { limit: 1}
  result: 42
- params: { limit: 999}
  error: { code: 100, message: "pets busy" }
---

# helloworld (arg)

> print hello world

This application prints hello world


## context


