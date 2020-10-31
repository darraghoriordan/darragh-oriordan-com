---
title: 'Adding Visual Studio Code debugging to Node JS projects'
category: 'other'
cover: header.jpg
date: '2020-10-31T17:12:33'
---

I find it useful to be able to debug my node application in vscode. It saves you having to write `console.log` statements to figure out why something isn't working. I sometimes use the debugger to check my tests too. This is the configuration I use to setup debugging for the main application and the tests.

<!-- end excerpt -->

## Launch.json

For vscode you need to set the various launch configurations for your project. These go in a file `.vscode/launch.json` . You might have to create this file.

## Debugging a node application using VSCode

In your package.json startup you need to add the inspector port

```
npx ts-node-dev --inspect=0.0.0.0:29033
```

Then in the startup script you can ask vscode to attach to that port when debugging

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Attach to Application",
            "port": 29033,
            "type": "node",
            "request": "attach",
            "skipFiles": ["<node_internals>/**"],
            "protocol": "inspector"
        }
        ]
  }
```

## Debugging Jest tests using VSCode

You need to add the launch scripts and tell them

1. Where your jest is located (usually in the node_modules folder
2. Where your jest config is located (usually in the main application root folder)

```
{
    "version": "0.2.0",
    "configurations": [
  {
            "type": "node",
            "request": "launch",
            "name": "Jest All",
            "program": "${workspaceFolder}/node_modules/.bin/jest",
            "args": ["--runInBand"],
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen",
            "disableOptimisticBPs": true,
            "windows": {
                "program": "${workspaceFolder}/node_modules/jest/bin/jest"
            }
        },
        {
            "type": "node",
            "request": "launch",
            "name": "Jest Current File",
            "program": "${workspaceFolder}/node_modules/.bin/jest",
            "args": [
                "${fileBasenameNoExtension}",
                "--config",
                "jest.config.js"
            ],
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen",
            "disableOptimisticBPs": true,
            "windows": {
                "program": "${workspaceFolder}/node_modules/jest/bin/jest"
            }
        }
]}
```

To use the debugger you open the debugging menu

`SHIFT - COMMAND - D `

and select the launch configuration. Then click the green play button.

If you want to debug a jest test, you should have that file open in the editor when you click play.
