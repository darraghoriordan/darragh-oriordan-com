---
title: 'Setting and debugging Azure Devops yaml env vars'
category: 'other'
cover: header.jpg
date: '2020-11-01T17:12:33'
---

I received an interesting question yesterday that highlighted how some parts of environment variables in Azure devops are not clear. Here are some things to check if your environment variables aren't working in azure pipelines.

<!-- end excerpt -->

## Check which variable importing method you need

When importing a variable into a step in you devops script you can use `env` or `variables`. The env parameter is used when importing variables as secrets from your library. Azure pipelines will avoid printing the values in logs. If you don't need this facility you can just use the variables section.

Using variables

```yaml
script: |
  npm install
  npm run build
displayName: 'npm install and build'
variables:
  - name: react.app.api.baseurl
    value: 'test'
  - name: react.app.client.id
    value: '333333'
```

Using env (Azure Devops will hide the variable contents where possible)

```yaml
script: |
  npm install
  npm run build
displayName: 'npm install and build'
env:
  REACT_APP_BASEURL: ${variableFromTheLibrary}
  REACT_APP_CLIENT_ID: ${variableFromTheLibrary2}
```

## Understand how devops changes variables names for environment

Azure devops changes your variable names! It's important to understand this so you know what to reference in your application.

So if I had this script...

```yaml
script: |
  npm install
  npm run build
displayName: 'npm install and build'
variables:
  - name: react.app.api.baseurl
    value: 'test'
  - name: react.app.client.id
    value: '333333'
env:
  REACT_APP_Gradient: '1'
```

For the variable names above you would reference these in your app like this.

In index.html:

```html
<div id="test">%REACT_APP_CLIENT_ID%</div>
<div id="gradient">%REACT_APP_GRADIENT%</div>
```

or in jsx:

```js
<Component>{process.env.REACT_APP_API_BASEURL}</Component>
<Component>{process.env.REACT_APP_GRADIENT}</Component>
```

So you can see that

1. The `.` part is replaced with an underscore `_`
2. _All parts_ of the name are made uppercase!

## Make sure you prepend the variable with the correct hint

If you're building a react app with environment variables then you have to get the value injected at build time. React and other libraries kind of use a bit of magic for this. For the magic to work you have to hint to the library which variables are relevant.

For create-react-app apps then you should prepend relevant environment variables with `REACT_APP_`. Otherwise your variable will not be replaced in the build.

Each library has their own configuration! You should read and understand the library documentation. For example if you're using gatsby you have to prepend with `GATSBY_`.

## Make sure that the file you are adding variable to is processed by webpack

The environment variables get processed by webpack. In create react app none of the files you place in `/public` are processed by webpack so the environment variables will not get replaced! You can add variables to index.html and to any of your componenets in the src folder because they are processed by webpack.

If you need to set a variable in a file in `/public` you would have to use Azure Devops to replace the value. Something like this would replace the value in the file.

```
npm run build && sed -i 's/$%REACT_APP_ClientId%/$${the.variable.value.inazure.devops.script}/' ./build/public/temp.html
```

## Finally, you can debug if the variables are available as expected

If you're building on a linux build agent you can use the `printenv` command to get a list of all the environment variables in the devops script.

You can also use `set` to get all the environment information. This will also work on windows build agents.

```yaml
- script: |
    set
    npm install
    npm run build

  displayName: 'npm install and build'
  env:
    REACT_APP_APIBaseUrl: 'test'
    REACT_APP_Client_ID: '333333'
```

You would see the following output in your logs

```
REACT_APP_APIBASEURL=test
REACT_APP_CLIENT_ID=333333
```

## You can also debug a step or the entire pipeline

If you set the variable `System.Debug` to `true` you will get a full debug stream in the pipeline logs. This includes available environment variables. You can set this at the highest level in your yaml file to debug every step. Or you can add it to the step.

```yaml
variables:
  - name: System.Debug
    value: true
```
