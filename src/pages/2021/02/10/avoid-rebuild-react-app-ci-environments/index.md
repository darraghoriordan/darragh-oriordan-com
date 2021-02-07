---
title: 'Avoid rebuild of React App in every CI stage'
category: 'other'
cover: header.jpg
date: '2021-02-10T17:12:33'
---

If you have a react app you can use env vars like `REACT_APP_MY_ENV_VAR` in your application and React will automatically pull them in to your app when you build the production application.

This is very useful but if you have variables that change for each environment and your application build takes a long time, you might want to avoid building unnecessarily in CI. For example you might have a QA environment and a Staging environment that have different configuration.

We type-check our code on build and that was taking 5 minutes+ to build so we had to make it faster. We changed our app from using `REACT_APP` env vars to using a configuration file that we could quickly write to using CI.

Our CI system is Azure DevOops so the CI scripts here are specifically for Azure DevOps but they apply to most CI systems with small changes.

The real work happens in a node script that would work anywhere.

<!-- end excerpt -->

## Add the script to write env vars to file

Here we have a script that will take all the environment variables that we have mapped in the mapping configuration and write them to a javascript file that will attach our configuration to the window when run.

This script runs in a couple of seconds in comparison to 5-10 minutes for a build with type checking.

```typescript
const fs = require('fs')
const { exit } = require('process')

if (!process.argv[2]) {
  const message =
    'You must provide a file path to write the generated file to as an argument to this script'
  console.error(message)
  exit(1)
}

const providedFilePath = process.argv[2]

const envVarMappings = [
  {
    runTimeConfigProperty: 'appVariableOne',
    envVarName: 'REACT_APP_VARIABLE_ONE',
  },
  {
    runTimeConfigProperty: 'appVariableTwo',
    envVarName: 'REACT_APP_VARIABLE_TWO',
  },
]

const mappedVariables = envVarMappings.map((x) => {
  if (process.env[x.envVarName] === undefined) {
    const message = `The webapp property configured does not have an environment variable set. The environment variable must be present : ${JSON.stringify(
      x
    )}`

    console.error(message)
    exit(1)
  }

  return `\r\n${x.runTimeConfigProperty}: '${process.env[x.envVarName]}',`
})

// write out the lines to a script that attaches the variables to the window
const runtimeConfigFileAsLines = [].concat(
  [`window['runtimeConfig']= {`],
  mappedVariables,
  ['\r\n}']
)

fs.writeFileSync(providedFilePath, runtimeConfigFileAsLines.join(' '))
```

## Modify your app to use the config file

In the head section of the index.html in your React application add a new script section

```html
<head>
  <script src="%PUBLIC_URL%/runtime-config.js"></script>
</head>
```

This tells React to load our config file which will set the configuration object on the window object.

Next wrap the object in an interface if using typescript

```typescript
// These values will be sent to the client so do not add
// secrets here.
export interface RuntimeConfig {
  appVariableOne: string
  appVariableTwo: string
}

export const runtimeConfig: RuntimeConfig = window.runtimeConfig
export default runtimeConfig
```

Now you can access the configuration object anywhere that you used to use a `REACT_APP_` variable before. We write the access so we try to use the configuration file but if it doesn't exist then we will look for the old environment variable.

```typescript
myThingThatDependsOnEnvironmentVariable(
  runtimeConfig.appVariableOne || process.env.REACT_APP_VARIABLE_ONE
)
```

## Add a CI step to generate the environment specific configuration file

We run the file in our infrastructure folder. We have to `chmod` it runnable first.

```yaml
- script: |
    chmod +x ./infrastructure/pipeline/write-webapp-runtime-config.js
    node ./infrastructure/pipeline/write-webapp-runtime-config.js ./packages/react-client/build/runtime-config.js
  env:
    REACT_APP_VARIABLE_ONE: $(appVariableOne)
    REACT_APP_VARIABLE_TWO: $(appVariableTwo)
  displayName: 'Write react app runtime variables'
```

## Configure Jest

If you have any tests that depend on the configuration then you need to tell Jest to load the file before running tests.

To do this you add a preRun file (unless you already have one) and add that to the "setup" property in the jest configuration

```typescript
// add this to a file called "jest.prerunsetup.js" or similar
window.runtimeConfig = window.runtimeConfig || {}
```

now in your `jest.config.js` add a reference to that setup file

```typescript
module.exports = {
  setupFiles: ['./jest.prerunsetup.js'],
}
```

## Add a local configuration file (if you like)

This should just go in your `app/private` folder if you're using `create-react-app`.

```javascript
window['backrRuntimeConfig'] = {
  appVariableOne: 'value1',
  appVariableTwo: 'value2',
}
```

You can put your development settings in here.

## Git ignore the local config file

Just like a .env file you would want to git ignore your local copy of the configuration

```shell
runtime-config.js
```
