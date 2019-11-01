---
title: How to also update the package.json version when using yarn update
category: 'development'
cover: header.jpg
date: '2019-10-21T17:12:33'
---

If you run `yarn update` on a package, yarn will update the package and your yarn.lock file. This is totally fine. As long as you check in your lock file, your developers and team will all have the correct versions of libraries when they run yarn install.

However it will not update the package.json with the new semver for the package. I kind of found this annoying, if only for aesthetic reasons I wanted to quickly see which minimum versions of packages I was using in package.json.

<!-- end excerpt -->

To have yarn also update the semver in your package.json there are a couple of options. Essentially you need to add --latest

## Using --latest

If you pass yarn the `--latest` flag it will update the package.json.

NOTE: this will not respect semver and will update to the latest version. Whatever that might be.

```shell
yarn upgrade @graphql-codegen/cli --latest
```

## Using interactive upgrade --latest

If you use the interactive upgrade it will also upgrade the package.json for you

```shell
yarn upgrade-interactive --latest
```
