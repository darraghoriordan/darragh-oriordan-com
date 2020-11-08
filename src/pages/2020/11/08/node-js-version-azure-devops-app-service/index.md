---
title: 'Ensure Node.js version is consistent on Azure services and devops pipelines'
category: 'other'
cover: header.jpg
date: '2020-11-08T17:12:33'
---

I got caught out with Microsoft recently setting the default version of Node.js from 12 to 14 on Azure pipelines linux build agent images (ubuntu-latest). Here are some tips for ensuring node versions are set correctly in some of the popular Azure PaaS offerings.

<!-- end excerpt -->

## In your package.json

You should ensure that the versions of Node.js you know that your code works with are specified to npm.

This is achieved using the engines section in your `package.json`.

```json
{ "engines": { "node": "12.x" } }
```

A mistake I made here was that I only has a greater than requirement. So when node 14 came along it broke on of the packages in my project. This was tricky to figure out, but if I had set the engines to also have a max version, npm would have highlighted that issue immediately.

Note, this will just warn you if the version of node being used doesn't match. That would be enough to highlight an issue in the deploy or build log.

If you want you can also set `npm config set engine-strict true` in your npm config and now your scripts will fail to start or operate if the Node.js versions don't match.

## In Azure Pipelines tasks

There is a task that you can add to a job that tells Azure Pipelines which version of Node.js to use. I had this on one job but not all of them. Make sure that you put this task on all of your jobs because each one runs on a different environment.

```yaml
jobs:
  - deployment: DevDeploy
    displayName: MyDevDeploy
    environment: my-dev-environment
    pool:
      vmImage: ubuntu-latest
    strategy:
      runOnce:
        deploy:
          steps:
            - task: NodeTool@0
              inputs:
                versionSpec: '12.x'
              displayName: 'Ensure node version available'
```

## In App Services

If you use Azure App Service for hosting you should tell it the correct version of node to use. You can do this in the gui for app services.

![App services node configuration](./images/node-config.png 'App services node configuration')

## Summary

There can be difficult to find bugs in your npm packages caused by Azure upgrading the default version of Node.js in build agents and on any of there PaaS systems. You can mitigate it by specifying the exact versions your code is designed to work with.

Hope that helps!
