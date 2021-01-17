---
title: 'Copying missing files during a typescript build on deploy'
category: 'other'
cover: header.jpg
date: '2021-01-03T17:12:33'
---

If you build your nodeJS project using typescript, it's important to know that the typescript compiler `tsc` will only include files that are `.js` or `.ts`.

If you have an issue where you deploy or build a typescript project and you get a file not found issue or similar, it's probably because you missed that typescript does not process these kinds of files for you.

If you need to include files like XML (`.xml`) or images in your typescript project build output, you will have to copy them manually before or after the build process.

This is one way to copy assets in a typescript build.

<!-- end excerpt -->

## 1. Install copyfiles

copyfiles is an npm package so install it using your favorite package manager

```bash
yarn install -D copyfiles

# or

npm install --save-dev copyfiles
```

## 2. Add a copy files script

Add a script to your package.json file to copy the files you need. There are many options for copy files so check out their documentation, but this is what I typically use.

You can see here that I also have a `"build"` script that will be called to build the application.

I assume you will output the typescript build to `build` folder but this will be unique for your project. The last option in the `"copyMySpecialFiles"` script should match where you want the files to go!

```json
{
  "scripts": {
    "build": "tsc -outDir build",
    "copyMySpecialFiles": "copyfiles --error --up 1 src/the-path/to-my/special-files/*.* build"
  }
}
```

I'm adding the script `copyMySpecialFiles`. This copies all the files in the folder to build. The `--up 1` tells copyfiles not to include the folder path when it copies. `--error` fails when there is an error. This is important to highlight unexpected issues when copying by stopping your build.

## 2. Add a post build script

Here i'm adding a special `postbuild` script. This script will automatically be run by `tsc` when the typescript build is successful. You don't have to explicitly call this anywhere. If `postbuild` exists, tsc will call it for you.

```json
{
  "scripts": {
    "build": "tsc -o build",
    "copyMySpecialFiles": "copyfiles --error --up 1 src/the-path/to-my/special-files/*.* build",
    "postbuild": "yarn run copyMySpecialFiles"
  }
}
```

And that's it! you can use this to copy any required pdfs, images, excel files etc to the build output for you typescript Node application.
