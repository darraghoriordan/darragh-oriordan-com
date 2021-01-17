---
title: 'How to log a node object with circular references to the console'
category: 'other'
cover: header.jpg
date: '2021-01-17T17:12:33'
---

If you try to use `JSON.stringify()` on a NodeJS object you will get an error "Converting circular structure to JSON". This is because NodeJS objects have circular references.

The way to stringify NodeJS objects is to use `util.inspect()`.

<!-- end excerpt -->

## util.inspect()

There is excellent documentation on the NodeJS site [here](https://nodejs.org/api/util.html#util_util_inspect_object_options).

But you can use it simply by just passing the object to the method without options.

```typescript
util.inspect({ a: 1, b: 'b' })
```
