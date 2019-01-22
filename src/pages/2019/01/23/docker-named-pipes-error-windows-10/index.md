---
title: Fixing Docker and docker-compose named pipes error (code2)
category: 'development'
cover: header.jpg
date: '2019-01-23T17:12:33'
---

Docker on Windows 10 sometimes breaks after an upgrade. When you try to list containers or use docker-compose you'll get an error on the command line. Here is an easy way to fix this issue.<!-- end excerpt -->

The error looks like

```shell
> docker-compose up
Windows named pipe error: The system cannot find the file specified. (code: 2)
```

The first step is to right click on Docker for Windows in the status area

![Docker settings](./settings-menu.jpg 'Docker settings')

Click on "Settings"

Open the Reset Tab

![Docker settings reset tab](./reset-window.jpg 'Docker settings reset tab')

Click "Reset to Factory Defaults..."

Docker will ask for your username and password and `docker-compose up` should work now!
