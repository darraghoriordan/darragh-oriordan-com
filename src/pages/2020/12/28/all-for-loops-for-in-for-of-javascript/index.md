---
title: 'for of .. vs for in .. vs for ..'
category: 'other'
cover: header.jpg
date: '2020-12-28T17:12:33'
---

Sometimes I forget what the best use of the various for loops are in javascript or typescript. This is a short one to remind myself when to use each one. Coming from C# where foreach .. in is the statement for iterables it's important to remember the equivalent in javascript is for .. of.

<!-- end excerpt -->

## for of ..

This is the statement you need to use for iterables. Iterables in javascript are things like Arrays, Sets, Maps, Strings. This is the equivalent of a `foreach` in C#.

```typescript
const iterable = [1, 2, 3];

for (const value of iterable) {
  console.log(value);
}
// 1
// 2
// 3
```

This is probably what you want to use for iterating over an array or an array like collection.

## for in ..

For in iterates over object properties. You can iterate over arrays with for in but you might be surprised by the output, you will also see any object properties and inherited properties. Another issue is that you cannot be guaranteed of the order the for in will iterate over the items.

```typescript
var obj = {a: 1, b: 2, c: 3};

for (const prop in obj) {
  console.log(`obj.${prop} = ${obj[prop]}`);
}

// Output:
// "obj.a = 1"
// "obj.b = 2"
// "obj.c = 3"

```

## normal for

The normal for loop. Not much to say here. It is what it is.

 Remember to not use `.length` of a collection in the expression or it will be calculated on each loop. Do it outside the statement.

```typescript

const iterable = [1, 2, 3];
const iterableLength = iterable.length

for (let i = 0; i < iterable.length; i++) {
   console.log(i);
}

// 1
// 2
// 3
```
