---
title: How to await async functions in specific sequence using typescript
category: 'development'
cover: header.jpg
date: '2019-08-04T17:12:33'
---

I was posting messages to a slack webhook recently and I wanted to post a list of messages in the correct order. I had to await each one before calling the next. I tried a few different methods but only one worked the way I expected it to.

<!-- end excerpt -->

```javascript
// 1.  array.forEach - Doesn't work!

listofMessages.forEach(async x => await postMessage(x))

// this doesn't work becuase the foreach creates a new function
// per item and you essentially ignore or throw away the returned Promise.

// 2. foreach (x in y) - Doesn't work and I learned something new!

for (let message in messages) {
  await postMessage(x)
}

// this doesn't work because it's a completely incorrect usage of for..in!
// In JS the for..in construct is designed to be used to iterate over and objects properties
// and it's known to have issues when iterating over an array

// 3. foreach (x of y) - Works! The correct way.

for (let message of messages) {
  await postMessage(x)
}

// this works as expected. Each call is awaited before the loop continues.
```
