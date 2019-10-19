---
title: Incorrect integrity when fetching from the cache error when using yarn
category: 'development'
cover: header.jpg
date: '2019-10-10T17:12:33'
---

I've found this happens sometimes if I manually change the package config. Simple fix.

```sh
yarn cache clean
yarn install
```

<!-- end excerpt -->
