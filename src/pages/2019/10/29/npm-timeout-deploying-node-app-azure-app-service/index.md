---
title: Npm timeout when deploying node app to azure app service using yarn
category: 'development'
cover: header.jpg
date: '2019-10-29T17:12:33'
---

I was trying to deploying a node app to azure app service recently but it kept timing out trying to download all the required modules.

I was able to fix this by specifying an explicit network timeout for the npm install in my azure-pipelines.yaml file

<!-- end excerpt -->

This really helps on the lower app service tiers because they are quite slow.

The network timeout is specified in the last part of this task.

```yaml
- task: AzureRmWebAppDeployment@4
    inputs:
      ConnectionType: 'AzureRM'
      azureSubscription: '$(azureSubscription)'
      appType: 'webAppLinux'
      WebAppName: '$(serverWebAppName)'
      packageForLinux: '$(System.ArtifactsDirectory)/drop/$(Build.BuildId).zip'
      RuntimeStack: 'NODE|10.16'
      StartupCommand: 'cd server && node dist/index.js'
      ScriptType: 'Inline Script'
      InlineScript: |
        cd server
        yarn install --production --network-timeout=30000
```
