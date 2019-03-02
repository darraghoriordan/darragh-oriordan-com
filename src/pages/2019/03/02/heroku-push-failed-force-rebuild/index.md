---
title: How to force a rebuild on Heroku without pushing using heroku-release-retry plugin
category: 'development'
cover: header.jpg
date: '2019-03-02T17:12:33'
---

I had a deploy on Heroku fail because of a database issue. The code deployed but a dependancy meant that the application couldn't start. If you try to run `git push heroku master` you just get "Everything is up-to-date".

My code didn't need to change but I wanted the "deploy" to be re run WITHOUT pushing a new commit.

<!-- end excerpt -->

The old way I would do this is to create a file called "force-rebuild.txt", add some random text and make a commit or branch merge to master to kick off my CI/CD pipeline.

It turns out there is a neat plugin for Heroku called heroku release retry that lets you retry the last deploy without resorting to adding bad commits to your repository.

It's pretty straight-forward to use. To install:

```shell
$ heroku plugins:install heroku-releases-retry
```

then just use:

```shell
$ heroku releases:retry
Retrying v48 on darragh-starter... !
 !    Release command declared: this new release will not be available until the
 !    command succeeds.
Retrying v48 on darragh-starter... done, v49
Running release command...

Sequelize CLI [Node: 10.14.2, CLI: 4.1.1, ORM: 4.42.0]

Loaded configuration file "src/datapersistence/config/config.js".
Using environment "production".
No migrations were executed, database schema was already up to date.
```

you can also specify the app name if you need to

```shell
$ heroku releases:retry --app darragh-starter
$ heroku releases:retry
Retrying v48 on darragh-starter... !
 !    Release command declared: this new release will not be available until the
 !    command succeeds.
Retrying v48 on darragh-starter... done, v49
Running release command...

Sequelize CLI [Node: 10.14.2, CLI: 4.1.1, ORM: 4.42.0]

Loaded configuration file "src/datapersistence/config/config.js".
Using environment "production".
No migrations were executed, database schema was already up to date.
```
