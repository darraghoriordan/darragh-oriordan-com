---
title: 'How to setup TSLint and Prettier for TypeScript projects'
category: 'development'
cover: header.jpg
date: '2020-02-11T17:12:33'
---

---

_UPDATE 10/10/2020: Tslint is being deprecated. You should consider changing to Eslint. I have a guide for that here: [TSLint is deprecated: How to upgrade to ESlint](/2020/03/06/upgrade-tslint-deprecated-to-eslint/)._

---

TSLint will help us identify potential issues in our code by examining how we use language features.

Prettier will format code consistently but needs some configuration to work with TSLint.

Together they make code-reviews easier and faster because if you run both of them you will identify many common code review errors before pushing your code.

There needs to be some configuration to have both work together. Here is my cheatsheet for setting this up on a project.

<!-- end excerpt -->

## Setup Prettier and TSLint in your project

Add the `tslint.json` file and any configs you need. here are mine.

```json
{
  "extends": [
    "tslint:recommended",
    "tslint-eslint-rules",
    "tslint-microsoft-contrib",
    "tslint-consistent-codestyle",
    "tslint-config-prettier"
  ]
}
```

Next we add the package(s) to support our configuration above.

```shell
yarn add --dev tslint tslint-consistent-codestyle tslint-eslint-rules tslint-microsoft-contrib tslint-config-prettier
```

## Setup VScode to use prettier for formatting

Install the TSLint plugin and prettier extensions for VSCode.

With the TSLint plugin VSCode will highlight and offer suggestions for typescript issues.

Now when you format the file (`Shift-Alt-F`) you will be asked which formatter you want as a default formatter. Choose Prettier.

## Set VSCode to autoformat on save

Now set VSCode to auto format on save:

1.  `Ctrl-Shift-P` and search for "Settings".
2.  Open the "Settings:UI" option.
3.  In the settings UI search for "Format On Save".
4.  Tick the box!
