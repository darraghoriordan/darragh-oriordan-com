---
title: How to find distinct items in an array in javascript or typescript
category: 'development'
cover: header.jpg
date: '2019-08-05T17:12:33'
---

I have to sort a bunch of work items in to organisational areas so I needed to know what were the distinct categories of objects in an array. In C#/Linq there is a nice IEnumerable.Distinct(f(x)) method available but JavaScript doesn't have something like this yet. I didn't want to install a helper like lodash if I could avoid it. Luckily my list was simple strings so I was able to use 'Set()'.

<!-- end excerpt -->

```javascript
// The solution is to map your objects to the array of identifiers. note: This only works if the identifier is, or can be reduced to, a primative type. If you supply objects it will use object references which might not act as you expect. There is no IEquatable in JS either.

// map objects to a list of identifier strings
let areaNames = stagingBuild.workitems.map(x => x.area)

//distinct categories will be distinct! The set will check if the value already exists
// A value in the Set may only occur once; it is unique in the Set's collection.
const distinctCategories = [...new Set(areaNames)]

// watch out becuase undefined and NaN can be stored in the Set.
// And in the case of strings, casing is respected for uniqueness
```
