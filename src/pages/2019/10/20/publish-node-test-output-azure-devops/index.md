---
title: Adding a junit formatter to jest test results for a node app on Azure Pipelines
category: 'development'
cover: header.jpg
date: '2019-10-20T17:12:33'
---

If you're publishing a node app on Azure pipelines you will want to publish the output of your tests. The publish tests task on Azure has limited format support so you have to convert the test results to XML for processing.

<!-- end excerpt -->

I use junit format to publish result. There is a jest formatter on npm

```shell
yarn add -D jest-junit
```

then you need to add or edit `jest.config.js` so that it configures the reporters

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: ['default', 'jest-junit'],
  setupFiles: ['./jest.setup-file.ts'],
}
```

This will output a `junit.xml` file in your root directory. You can pass this to the Azure DevOps Publish Test Results task.
