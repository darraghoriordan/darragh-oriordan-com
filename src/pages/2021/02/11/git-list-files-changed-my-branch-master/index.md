---
title: 'How to list files changed in current branch (and run prettier on them)'
category: 'other'
cover: header.jpg
date: '2021-02-11T17:12:33'
---

I needed to run prettier on only the files changed in one branch. This is a bit hacky but it did the trick!

Note if you just need to prettify files in a commit you can use [pretty quick](https://www.npmjs.com/package/pretty-quick)

<!-- end excerpt -->

## Use git to get a list of the files

`git diff --diff-filter=MA --name-status master...`

## Edit output to run prettier for each file

Once you have this list you can edit it in an editor to run prettier on each file. You might need to edit the path if your pretteir config sets a different root path than the git diff.

e.g.

Output from git diff

```shell
M       /projectroot/subproject/src/mypath/file1.ts
M       /projectroot/subproject/src/mypath/file2.ts
A       /projectroot/subproject/src/mypath/file3.ts
```

Edit this to be

```shell
npx prettier --write src/mypath/file1.ts
npx prettier --write src/mypath/file2.ts
npx prettier --write src/mypath/file3.ts
```

and copy paste into terminal. Done!

There is probably a neat one-liner bash command that could modify and pipe git output directly into prettier but I don't know how to do that. This works great if not doing this too often.

You could also try replacing the new lines from git diff with a space in your editor and supplying the list to prettier that way. I haven't tested this though!

```shell
npx prettier --write src/mypath/file1.ts src/mypath/file2.ts src/mypath/file3.ts
```
