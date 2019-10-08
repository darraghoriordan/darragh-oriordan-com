---
title: If you get "Something went wrong installing the "sharp" module The specified procedure could not be found. in Gatsby"
category: 'development'
cover: header.jpg
date: '2019-10-08T17:12:33'
---

Here is what I had to do on windows to make this work

<!-- end excerpt -->

1. Upgrade to the latest node from [https://nodejs.org](https://nodejs.org/)
2. Upgrade yarn - `npm upgrade -g yarn`
3. Clear the yarn cache - `yarn cache clean`

   When you change the version of node you might need to rebuild a bunch of packages to match the new version. First you have to clean out the cache. This also resolves the error associated with "Incorrect integrity when fetching from the cache"

4. Reinstall the packages associated with sharp

```javascript
yarn add gatsby-plugin-sharp gatsby-plugin-manifest gatsby-transformer-sharp gatsby-transformer-sqip
```
