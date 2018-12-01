---
title: Create-react-app react-router and Heroku
subTitle: The 404 gotcha
category: 'development'
cover: ../../../../post-default.jpg
description: 'How to fix 404s with your React app on heroku when using react-router and create-react-app'
date: '2017-04-30T17:12:33'
---

I've been putting together a React app and I needed cheap, fast hosting so I went to put it on Heroku.

### Configuring Heroku

The community have put together a build pack for create-react-app. You can basically deploy in 2 minutes.

Assuming you have the heroku command line tool already configured the following gist describes the commands to setup the build pack:

https://gist.github.com/darraghoriordan/c3d355237246df395bd4c5ffedf002d1#file-heroku-sh

### Configuring your application

This is magic but there is still some configuration needed on your application for routing. If you use react router you will get a 404 from nginx when you try to directly open a route.

The heroku build pack deploys your site on heroku as a static react application so you have to tell heroku that for ALL routes, it should just go to your root/index document so react-router can handle the application routing. The default root document in create-react-app aps is index.html

So to fix your site on Heroku hosting add a file called "static.json" to your root folder (next to packages.json) with the following configuration.

https://gist.github.com/darraghoriordan/008569feb8cc319e338ad11fb68a4647#file-heroku_config-js

## Did this help solve your problem?

If not then feel free to DM me on twitter @darraghor. I love helping coders out! - https://twitter.com/darraghor
