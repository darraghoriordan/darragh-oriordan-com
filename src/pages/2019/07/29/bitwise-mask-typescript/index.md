---
title: How to check bitwise mask in typescript
category: 'development'
cover: header.jpg
date: '2019-07-29T17:12:33'
---

I'm currently building a little app that talks to the Azure Devops API and I had to check a bitwise operator in typescript today. I hardly ever do this these days so it took me a bit of time to get it right!

<!-- end excerpt -->

A common use case of bit wise operators allow you to have a single field that express multiple states. It's a 2-bit number e.g. 101, where each digit is assigned to represent a single state.

In the Azure Devops api many of the states use bitwise operators.

To test if a bit is set you will create a mask for checking. Then you can use bitwise operators to check if the real value matches the mask

```typescript
// To create a mask you should OR the mask values together
var expectedStatesMask =
  ri.EnvironmentStatus.Succeeded | ri.EnvironmentStatus.InProgress

// And to check a bitwise value you need to AND the current value and your mask and check that the result matches the current status
return (
  environmentState.status === (environmentState.status & expectedStatesMask)
)
```
