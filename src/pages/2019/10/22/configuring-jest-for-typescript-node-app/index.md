---
title: How I configure jest on a typescript node application
category: 'development'
cover: header.jpg
date: '2019-10-22T17:12:33'
---

Here is some of the configuration I have for a node application in typescript that builds on a CI system

<!-- end excerpt -->

## Installation

First, add jest! :)

ts-jest runs jest on typescript projects with type checking.

jest-junit outputs the test results in a format that reporting tools can use to show test results. This is useful for CI systems like CircleCI, AzureDevOps, Jenkins etc.

```sh
yarn add --dev jest ts-jest jest-junit
```

## package.json

in your package.json add some new settings. The first is a new script for running tests from npm.

If you accidentally leave an unresolved promise or unresolved async call while writing your code jest can get stuck. The `--detectOpenHandles` switch will have jest try to figure out what is preventing itself from stopping. It's really helpful to have this when it's needed.

`--colors` just adds some terminal colors!

```json
    ...
    "scripts": {
      "test": "jest --detectOpenHandles --colors"
    }
    ...
```

## jest.config.js

The next file I add, in the root of my project is a `jest-setup.js` file. Note it is `.js`. This non-typescript file can cause issues with typescript expecting all source files to be in the `src/` directory so you may have to ignore it in your `tsconfig.json`. This depends on your setup though, so if you don't have a problem then don't worry about it. If you get stuck let me know!

You can have ts-jest create this for you by using

```sh
yarn ts-jest config:init
```

This is where we tell jest we want to use ts-jest, we're running node.

The reporters are what jest uses to create output. `default` is just console (I think) and `jest-junit` has jest emit a `junit.xml` file containing all our test results in a well known, exportable format.

The setup file is specified here. Jest will load this file before running all of your tests so it's the place to set up things you need for your tests to run successfully. You may not need one. See the details about mine below 👇.

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: ['default', 'jest-junit'],
  setupFiles: ['./jest.setup-file.ts'],
}
```

## jest.setup-file.ts

Here I have the setup file we referenced in `jest.config.js`

I have two reasons to use this file.

The first is because I use the winston logger and I don't want it emitting logs while running my tests. They just clutter the results. You may want to turn this on or off from time to time but this is the way I like it.

The second reason is the graphql integrations I use need to use reflect-metadata at runtime. So I load it here before anything else. If you don't need either of these things you may not need this file.

```typescript
import 'reflect-metadata'
import * as winston from 'winston'

// don't log while running tests
winston.remove(winston.transports.Console)
winston.remove(winston.transports.File)
```

And that's it!
