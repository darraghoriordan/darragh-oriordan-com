---
title: 'TSLint is deprecated: How to upgrade to ESlint'
category: 'development'
cover: header.jpg
date: '2020-03-06T17:12:33'
---

I recently upgraded a typescript project from TSLint to ESLint. I started with the migration tool but ended up just doing it manually. Here's why and how it went...

<!-- end excerpt -->

## TSLint end of life

Ts lint is being deprecated. It still works totally fine but if you want to stay current in your next typescript project don't follow the TSLint install in your tutorial. Use ESLint instead.

For existing projects you can decide if it's worth updating - It's probably not unless you need ESLint rules or you need to integrate with an IDE or something that doesn't support TSLint.

## The basic steps

1.  You have to ensure ESLint is installed.
2.  You have to install or activate the ESLint plugin for your IDE.
3.  You have to create an `.eslintrc.js` config.
4.  You might have to add an `.eslintignore`.
5.  You have to remove the `tslint.json` file.
6.  You have to update your package.json lint script to use ESLint instead of tslint.
7.  You have to update your config and or code to work with the new rules.

## The migration tool

There is an awesome tool available to migrate your config. To run it use

```
npx tslint-to-eslint-config
```

I found that the output of the tool was very verbose.

Instead I used the recommended ESLint rule sets as a start point but I deleted the file it produced and dealt with my individual rule errors manually.

## Installing ESLint and rules

Based on the output of the migration tool above you will know what rules to install so lets add ESLint and all of the rules.

These are the rules I had on a fairly standard project. I also add the ESLint typescript parser. This is very important because ESLint needs to understand typescript.

```bash
yarn add -D eslint eslint-plugin-import eslint-plugin-jsdoc eslint-plugin-prefer-arrow eslint-plugin-unicorn @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

## Create an ESLint configuration file(s)

First, it's a good idea to be very specific about what you want to lint. You can achieve this by passing ESLint a specific tsconfig file describing just that. So create a `tsconfig.eslint.json` file and add

```json
{
  // extend your base config to share compilerOptions, etc
  "extends": "./tsconfig.json",
  "compilerOptions": {
    // ensure that nobody can accidentally use this config for a build
    "noEmit": true
  },
  "include": [
    // whatever paths you intend to lint
    "src/**/*.ts"
  ]
}
```

Next you will need to add the actual config. The file should be called `.eslintrc.js`.

Here is a decent starting point for the rules above. Add `"the-rule":"off"` in the rules section of the configuration to turn off a rule.

```js
module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsdoc/recommended',
    'plugin:unicorn/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.eslint.json'],
    sourceType: 'module',
  },
  rules: {
    'unicorn/filename-case': [
      'warn',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
  },
  plugins: ['@typescript-eslint', 'jsdoc', 'import', 'prefer-arrow', 'unicorn'],
}
```

It's very unlikely that your project will lint with no errors right away. Especially if you're upgrading! The rules above are much stricter than regular tslint. You can remove rulesets or disable individual rules as required.

## Ignoring files

You probably want to ignore some files. Do this using the `.eslintignore` file. You can add globs like

```
**/node_modules
node_modules
```

## Linting from the command line

You can update your lint command in package.json to enable linting with ESLint

```
"lint": "./node_modules/.bin/ESLint -c .eslintrc.js
```

## Turning on the IDE plugins

if you use VSCode install the ESLint plugin.

If you use WebStorm you can enable ESLint in the settings.

## Remove tslint

You can disable the TSLint plugin for your workspace and remove tslint and any rules from the project

```
yarn remove -D tslint tslint-consistent-codestyle tslint-eslint-rules tslint-microsoft-contrib
```

## A note on prettier

If you use prettier (and you should!) you should install the prettier overrides for ESLint. These overrides remove conflicting rules from interfering with prettier.

To do this install the rules

```
yarn add eslint-config-prettier
```

and add the overrides to the end of your list of extensions..

```
{
  "extends": [
    "all-the-other-configs-you-use",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/standard",
    "prettier/unicorn",
  ]
}
```

## Conclusion

Upgrading from TSLint to ESLint is a bit painful because you will have to review heaps of rules. I wouldn't recommend it for existing projects. But for all new projects you should ESLint over TSLint.

I've noticed there are much broader rulessets available for ESLint and there seems to be better support in IDEs for the ESLint rules.
