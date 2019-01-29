---
title: When Mocha doesn't run tests in subfolders on either windows or your CI server
category: 'development'
cover: header.jpg
date: '2019-01-29T17:12:33'
---

I use a Windows PC for development and I had a problem where some of my mocha tests were not running on my CI server. The issue was that I use GitLab's CI system which uses a Linux docker image to run the tests so the difference was the OS. This would also affect teams with developers on both Windows machines and Macs. Here's how I fixed it... <!-- end excerpt -->

My original test script looked like this

```json
{
  "scripts": {
    ...
    "test": "sequelize db:migrate:undo:all && sequelize db:migrate && nyc mocha --opts ./.mocharc src/**/*.spec.ts"
    ...
  }
}
```

I tear down the database, rebuild all the tables. Then I run coverage and mocha on all my test files.

My mocha options file is set to use `--recursive` so Mocha should look in all subfolders right?

```shell
--require ts-node/register
--recursive
--colors
--slow 20
--exit
```

Instead mocha just runs the tests in the top level of the `/src` folder

When I ran this on my Windows machine I had 50 tests running as expected. When I ran it on GitLab I only had 6 tests running!

The issue here is that the given path gets parsed BEFORE it's passed mocha and the `/**/` part of the path is removed so on Posix systems Mocha receives `src/*.spec.ts` instead of `src/**/*.spec.ts`.

The way to fix this for all platforms is to wrap the path in double quotes. It's really important that you use double quotes and not single quotes to be cross platform. And to use double quotes you have to escape them `\"src/**/*.spec.ts\"`. So we end up with this...

```json
{
  "scripts": {
    "test": "sequelize db:migrate:undo:all && sequelize db:migrate && nyc mocha --opts ./.mocharc \"src/**/*.spec.ts\""
  }
}
```

and it all works on GitLab - 54 tests passing!...

![GitLab output](./gitlaboutput.png 'GitLab output')

You can see this in action on my starter source code @ <https://gitlab.com/darragh.oriordan/starter/tree/master>
