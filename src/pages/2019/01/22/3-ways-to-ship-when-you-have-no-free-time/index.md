---
title: 3 tips for starting and finishing side projects
category: 'development'
cover: header.jpg
date: '2019-01-22T17:12:33'
---

Some of us like to make things for the web but everyone finds it super hard to find time to start and finish any side projects. If you've been thinking about something for a year but haven't even started, here are some tips to help you start and finish more stuff!<!-- end excerpt -->

## 1. Ship immediately

The very first thing you should do is ship the thing out to the world. Just write

```html
<html>
  <head>
    <title>My Project</title>
  </head>
  <body>
    <h1>My Project</h1>
  </body>
</html>
```

in an index.html file and put it on Netlify or some other host you like.

```shell
> npm install netlify-cli -g
> netlify deploy --prod
```

Forget about the name, the domain, the technologies. Once you start shipping you will have a better understanding of how long the feature(s) you want will take to build and having the placeholder out there is incentive to finish.

See the Zeigarnik effect about unfinished tasks: <https://en.wikipedia.org/wiki/Zeigarnik_effect>

## 2. Reduce scope to one feature

We often assume projects and tasks will be easier and shorter than they end up. Unless you're a genius estimator have probably seen this in your work. If you're having trouble finishing side projects you need reduce scope to something that will take a maximum of 2-3 evening of work.

That could be as small as just launching that index.html on Netlify if you have never done that before. Think small, really, really small. Much smaller than what you might volunteer to do at work.

At the very most choose one feature to build, not an app or a full website. Just build the feature as simply as possible. Use a Google sheet to simulate algorithms and data.

See the planning fallacy on optimism bias in humans:
<https://en.wikipedia.org/wiki/Planning_fallacy>

## 3. No Shiny objects!

Don't use any new-to-you shiny technologies when building your feature. You WILL get lost in it. (Unless your aim is to learn the new technology then go for it - but limit yourself to ONE new tech).

Almost every new library will have common accompanying libraries or technology and you will follow a trail down the rabbit hole until you get bored and move on.

Go with what you know and get the feature out! You can refactor it in to the new technology AFTER you have a useful side project.

See a package.json or NuGet packages.json on any project!

### Finally

Don't forget to reward yourself when you get it done! 🍷 🍫 🥕
