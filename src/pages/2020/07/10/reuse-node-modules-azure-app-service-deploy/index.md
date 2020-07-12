---
title: 'Azure App Service reuse node modules on host for speed'
category: 'development'
cover: header.jpg
date: '2020-07-10T17:12:33'
---

If you are deploying a node app to Azure App Services you can deploy the node_modules folder as part of the deploy, or you can reinstall the runtime node modules on the host each time. There are some advantages and disadvantages to taking either option.

<!-- end excerpt -->

## The scenario

If you have a node app that builds in Azure DevOps Pipelines and you are deploying to Azure App Services you can ship the node_modules in the zip deploy, or install the node_modules on the host.

If you ship the node modules then your build artefact is much larger and you have to make sure that the OS and the node version is the same on both the build agent and the App Service host.

If you chose to install the packages on the host you have to ensure that the rebuild doesn't take so long that the deploy fails from an `npm install` timeout.

## Installing packages on the host

If you try to install the NPM packages on App Services each time it takes a long time. The data transfer speed seems to be quite slow. It even fails some of the time for large installs. You can see a way around the NPM timeout failures [described here](https://www.darraghoriordan.com/2019/10/29/npm-timeout-deploying-node-app-azure-app-service/).

You can also setup azure app service to not delete the node_modules folder for each deploy. Now you need to be careful here because setting this option means all existing files will be kept. You might not want this depending on your app. And it is likely not suitable for you production environment.

The key is the `RemoveAdditonalFiles: false` option. This keeps the files that are already on the server. Including node_modules around! This will speed up your deploy by 5 to 10 minutes.

```yaml
- task: AzureRmWebAppDeployment@4
    inputs:
      ConnectionType: 'AzureRM'
      azureSubscription: '$(azureSubscription)'
      appType: 'webAppLinux'
      WebAppName: '$(appName)'
      packageForLinux: '$(System.ArtifactsDirectory)/artefactDrop/$(Build.BuildId).zip'
      RuntimeStack: 'NODE|10.16'
      RemoveAdditionalFiles: false
      StartupCommand: 'cd server && node dist/index.js'
      ScriptType: 'Inline Script'
      InlineScript: |
        yarn install --production --network-timeout=30000
```
