---
title: How I configure jest on a typescript node application
category: 'development'
cover: header.jpg
date: '2019-10-22T17:12:33'
---

Here is some of the jest configuration I have for a node application in typescript that builds on a CI system.

<!-- end excerpt -->

## Installation

First, add some libraries! :)

ts-jest runs jest on typescript projects with type checking.

jest-junit outputs the test results in a format that reporting tools can use to show test results. This is useful for CI systems like CircleCI, AzureDevOps, Jenkins etc.

```shell
yarn add --dev ts-jest jest-junit
```

## package.json scripts for Jest

in your package.json add some new settings. The first is a new script for running tests locally. The second one is for ci.

```json
    ...
    "scripts": {
      "test": "npx jest --runInBand --detectOpenHandles --colors --verbose --reporters=default",
      "test:ci": "npx jest --ci --runInBand --silent --colors --coverage"
    }
    ...
```

If you accidentally leave an unresolved promise or unresolved async call while writing your code jest can get stuck. The `--detectOpenHandles` switch will have jest try to figure out what is preventing itself from stopping. It's really helpful to have this when it's needed.

`--colors` just adds some terminal colors!

`--runInBand` helps to speed up tests. You can test having this on or off. On Azure Devops this setting speeds up my tests.

If you add any debug statements to your tests they will be surpressed by default. To see them in the output you can add `--verbose`. I only use this on my local environment.

On CI we output the results to a file so we don't need to see the detailed test results on the terminal or standard output. `--silent` tells jest to suppress the terminal test output.

Also on CI we want to have the test coverage published so we can view it later. So we ask jest to process this using the `--coverage` switch.

## jest.config.js

The next file I add, in the root of my project is a `jest.config.js` file. Note it is `.js`. This non-typescript file can cause issues with typescript expecting all source files to be in the `src/` directory so you may have to ignore this file in your `tsconfig.json`. This depends on your setup though, so if you don't have a problem then don't worry about it. If you get stuck let me know!

You can have ts-jest create the `jest.config.js` file for you by using

```shell
yarn ts-jest config:init
```

This file is where we tell jest that we want to use ts-jest, and that we're running node.

The preset loads configuration that tells jest to look for `.ts` files and a few other things. There are other presets for tsx if you need that. Check out the ts-jest documentation for more details. You can do all this configuration manually if you like too. The preset is easy if it works for your project.

The reporters are what jest uses to create output. `default` is just console (I think) and `jest-junit` has jest emit an `.xml` file containing all our test results in a well known, exportable format. CI systems can display this nicely.

The coverage threshold setting allows you to set what code coverage level passes. Here i set that we need to have 90% coverage for all code branches (e.g. `if`, `for`, `property?.property`). I also set that we need 50% of statements covered. Even if all test pass, if the coverage thresholds fail then the tests will be marked as failing.

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'junit-TEST.xml',
      },
    ],
  ],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 90,
      functions: 0,
      lines: 0,
    },
  },
  setupFiles: ['./jest.setup-file.ts'],
}
```

The setup file is also specified above. Jest will load this file before running all of your tests so it's the place to set up libraries and imports that you need for your tests to run successfully. For example if you needed to bootstrap a dependency injection root.

You may not need one of these. See the details about mine in the section below this one👇.

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

And that's it! You should be able to add your `*.spec.ts` files with tests now and jest will pick them up and run them when you use `yarn test` locally or `yarn test:ci` on your CI platform.
