---
title: How to configure a pipeline on Azure Devops to build and deploy serverless graphql and react client
category: 'development'
cover: header.jpg
date: '2019-10-19T17:12:33'
---

I need to automate deploys on Azure Devops for a project I'm working on. I want it to work as cheaply as possible so serverless or PaaS was desirable. Read on to see the azure-pipelines.yaml file I used to make this work.

<!-- end excerpt -->

I'll break down each step of the build and publish process with some comments.

The trickiest bits were deploying to each service.

You can skip to the end 👇 and find the entire file for easy copy pasting at the bottom.

## Code Structure

I keep the code for my project in a mono repo on guthub. The structure looks like this:

```sh
server
--src
--dist (this is build output)
--package.json
client
--src
--build (this is build output)
--package.json
```

## Setting up Infrastructure

I used mongoDB Atlas for my datastore but I'll leave that choice up to you. Essentially your graphql code needs to be able to talk to whatever datastore you choose.

You will need a couple of things on Azure. It's best if you set up a new dedicated resource group for this project.

1. Add a Linux based App Service. I just used an F1 (free) size. call this 'myAppServer' or similar. This is where graphQL will live. You might need to whitelist the "Outgoing IP address" on mongo or whatever your database is on.
2. Add a storage account. I called mine "myAppClient". Scroll down to "Static Website" in the menu. Enable it. Add "index.html" as the index document name. This passes all server routing requests to our React single page app.

## Setting up Azure DevOps pipeline

Go to Azure Devops / pippelines and add a new pipeline. Select your yaml supported repository provider and set up a node project. The build will probably fail on the first run but that's all good. It will ask you to link it to Azure Portal. This is super handy as it means we don't have to authenticate again or provide keys to run the build pipeline.

Azure will add a file azure-pipelines.yaml to your repo root. This is what we want to edit. The pipeline will always run the latest yaml definition so now you have CI/CD as code!

## Build outline

1. Setup some variables
2. Build the client and server
3. Test the code
4. Publish results
5. Copy required files to archive
6. Publish the archive
7. 🚢 the client to our static site
8. 🚀 the server to our App Service

I won't go over each of the variables in the first step. Hit me up on twitter if it's not clear which variable is is which.

## Building client and server

Here we just navigate to the relevant folders and build the code using yarn or npm. I run my tests in this step too but you could do that in a different script step. I'm just being lazy I guess.

I set some environment variables here and this is where you should too if you need to.

CI=true changes the way tests are run and published. It also enforces linting by failing the build on warnings.

REACT_APP_GRAPHQL_URL='myurl' is a setting for the client application so it hits the correct production server. Otherwise the client you download would try to hit whatever is the default.

This is specific to my application though you probably need something similar. Doing this in ENV variables helps enforce the 12 factor application principals.

```yaml
- script: |
     cd server
     yarn install
     npm run build --if-present
     npm run test --if-present
     cd ../client
     yarn install
     npm run build --if-present
     npm run test --if-present
   displayName: 'npm install, build and test'
   env:
     CI: true
     REACT_APP_GRAPHQL_URL: '$(serverUrl)'
```

## Publish test results

This just lists the specific paths to any test results I have. There is limited support for formats in azure pipelines so you might have to add a formatter to your test framework. I chose junit XML format here because jest has a formatter available on npm (jest-junit).

```yaml
- task: PublishTestResults@2
  condition: succeededOrFailed()
  inputs:
    testRunner: JUnit
    testResultsFiles: '$(System.DefaultWorkingDirectory)/server/junit.xml'
  displayName: 'Publish test results'
```

## Copying the server files to folder for archiving

The server is a standard Apollo graphQL server. This is not a static site so you have to copy over the source, the package.json and the lock file (I use yarn for this project so it's yarn.lock for me).

We will install all the required packages when deploying the site later.

I just used the standard azure file locations for this build. I'm going to skip the client build because it's the same with different paths.

```yaml
 - task: CopyFiles@2
    inputs:
      SourceFolder: '$(System.DefaultWorkingDirectory)'
      Contents: |
        $(System.DefaultWorkingDirectory)/server/dist/**/*
        $(System.DefaultWorkingDirectory)/server/package.json
        $(System.DefaultWorkingDirectory)/server/yarn.lock
      TargetFolder: '$(Build.ArtifactStagingDirectory)/output'
    displayName: 'Copy SERVER files to artifact directory'
```

## Archiving and publishing the artefacts

I won't paste the code for this here - it's all standard from any Azure sample. We package the code and publish so we can download later in case something is broken and we need to test.

By publishing now we could also utilize the Azure DevOps "Releases" product in the future which is triggered when new artefacts are published.

## Deploying the client build

Azure provides a special "Copy to Azure" task for putting static assets on a blob but it _does not work_ on Linux build agents. Instead we must use the azure CLI to do this for us.

Use the bash script type. We're on Linux and I know bash will be supported there for sure.

"$web" is the default storage container for static sites on Azure blobs. The $ is a special character in bash so we have to escape it with "\\". The Azure variables "\$(XXX)" are replaced before running on bash so won't be a problem.

That's it for the client. Static sites are awesome!

```yaml
- task: AzureCLI@2
  inputs:
    azureSubscription: '$(azureSubscription)'
    scriptType: 'bash'
    scriptLocation: 'inlineScript'
    inlineScript: 'az storage blob upload-batch -d "\$web" --account-name "$(clientBlobAccountName)" -s "$(System.DefaultWorkingDirectory)/unzip/$(Build.BuildId)/client/build"'
```

## Deploying the server build

The deploy of the server to app service is a bit more straightforward because the Azure app service deploy task works on Linux agents.

Make sure the appType matches the type you added to Azure earlier. You must set the runtime stack to be the same as the runtime specified in your package.json (if you have done that)

We have to install any dependencies before running the container so we add a script to go into the required directory and `yarn install`.

Make sure you have copied over the lock file or yarn/npm will get different versions of your dependencies than you tested/developed with!

After we install deps we simply run our application using node.

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
      yarn install
```

## Full azure-pipelines.yaml

```yaml
# Deploy a graphql server and a static react app to azure serverless environment

trigger:
  - master

variables:
  # Subscription needs a storage account and a website
  azureSubscription: 'YOUR_SUB'

  # Needs to be a linux app service and there are a bunch of env variables that need to be set on it
  serverWebAppName: 'YOUR_SERVER_NAME'

  # This needs to have a static website setup with the default container ($web)
  clientBlobAccountName: 'YOUR_STORAGE_NAME'

  # This is provided to the client app so it knows how to hit the right server
  serverUrl: 'YOUR_SERVER_URL'

  # We build on linux to remove any dependancies on windows stuff / can move to GCP or AWS
  vmImageName: 'ubuntu-latest'

stages:
  - stage: Build
    displayName: Build stage
    jobs:
      - job: Build
        displayName: Build
        pool:
          vmImage: $(vmImageName)

        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: '10.x'
            displayName: 'Install Node.js'

          - script: |
              cd server
              yarn install
              npm run build --if-present
              npm run test --if-present
              cd ../client
              yarn install
              npm run build --if-present
              npm run test --if-present
            displayName: 'npm install, build and test'
            env:
              CI: true
              REACT_APP_GRAPHQL_URL: '$(serverUrl)'

          - task: PublishTestResults@2
            condition: succeededOrFailed()
            inputs:
              testRunner: JUnit
              testResultsFiles: '$(System.DefaultWorkingDirectory)/server/junit.xml'
            displayName: 'Publish test results'

          - task: CopyFiles@2
            inputs:
              SourceFolder: '$(System.DefaultWorkingDirectory)'
              Contents: |
                $(System.DefaultWorkingDirectory)/server/dist/**/*.js
                $(System.DefaultWorkingDirectory)/server/package.json
                $(System.DefaultWorkingDirectory)/server/yarn.lock
              TargetFolder: '$(Build.ArtifactStagingDirectory)/output'
            displayName: 'Copy SERVER files to artifact directory'

          - task: CopyFiles@2
            inputs:
              SourceFolder: '$(System.DefaultWorkingDirectory)'
              Contents: |
                $(System.DefaultWorkingDirectory)/client/build/**/*
              TargetFolder: '$(Build.ArtifactStagingDirectory)/output'
            displayName: 'Copy CLIENT files to artifact directory'

          - task: ArchiveFiles@2
            displayName: 'Archive files'
            inputs:
              rootFolderOrFile: '$(Build.ArtifactStagingDirectory)/output'
              includeRootFolder: false
              archiveType: zip
              archiveFile: $(Build.ArtifactStagingDirectory)/$(Build.BuildId).zip
              replaceExistingArchive: true

          - task: PublishPipelineArtifact@0
            displayName: 'Publish server pipeline artifacts'
            inputs:
              targetPath: $(Build.ArtifactStagingDirectory)/$(Build.BuildId).zip

  - stage: Deploy
    displayName: Deploy stage
    dependsOn: Build
    condition: succeeded()
    jobs:
      - deployment: Deploy
        displayName: Deploy Production
        environment: 'production'
        pool:
          vmImage: $(vmImageName)
        strategy:
          runOnce:
            deploy:
              steps:
                - task: DownloadPipelineArtifact@1
                  displayName: 'Download Pipeline Artifacts'
                  inputs:
                    buildType: 'current'
                - task: ExtractFiles@1
                  inputs:
                    archiveFilePatterns: '$(System.ArtifactsDirectory)/drop/$(Build.BuildId).zip'
                    destinationFolder: '$(System.DefaultWorkingDirectory)/unzip/$(Build.BuildId)'
                    cleanDestinationFolder: true

                - task: AzureCLI@2
                  inputs:
                    azureSubscription: '$(azureSubscription)'
                    scriptType: 'bash'
                    scriptLocation: 'inlineScript'
                    inlineScript: 'az storage blob upload-batch -d "\$web" --account-name "$(clientBlobAccountName)" -s "$(System.DefaultWorkingDirectory)/unzip/$(Build.BuildId)/client/build"'
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
                      npm install
```

Hope that helps! Let me know if you have any trouble.
