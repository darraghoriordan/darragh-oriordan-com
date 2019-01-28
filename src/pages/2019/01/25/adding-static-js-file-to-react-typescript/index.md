---
title: Adding static JavaScript files to a react typescript project
category: 'development'
cover: header.jpg
date: '2019-01-25T17:12:33'
---

I had to import a JavaScript in to my React project with typescript and typescript gave me an error. It wasn't causing my build to fail but it was annoying seeing it in the console. Here's how I got rid of the error.

I added the .js file to `/public/scripts` so it would be treated as a kind of static file. This is what caused the issue.

I don't want typescript to type check the file and I don't want to put it through tsc. I don't want it loaded by webpack asynchronously and it has to run in a very specific way in the browser to work correctly. Typescript gave me this console error...

```pre
 file is not under root dir 'rootdir' is expected to contain all source files
```

The error makes sense. Typescript has been told in my tsconfig that all source it should care about is under `/src` and now it sees I have a random js file outside of there. This is a useful error and in most cases you would move the file back under `/src`.

To fix this I had to explicitly tell typescript to ignore the file. Here is the tsconfig (with all the other fields removed).

```javascript
{
    "compilerOptions": {
        "rootDir": "src"
    },
    "exclude": [
        "public/scripts/markerwithlabel.js"
    ]
}
```

Simple fix but I'm new to typescript configuration so this was handy to know.

You can see this in action on my starter source code @ <https://gitlab.com/darragh.oriordan/starter/tree/master>
