---
title: 'Using Gource to visualize activity on a git repository'
category: 'other'
cover: header.jpg
date: '2020-10-11T17:12:33'
---

At the end of a project or when a person is leaving a team or project, it's nice to show the impact that they had on the software visually. Git has some built in statistics that will show you tables listing additions and deletions, commit counts and that kind of thing. But you can use gource to create a cool time series visualisation showing the changes over time.

It's well worth checking out this tool.

<!-- end excerpt -->

## Installing gource

Gource is free! So you just need to install using a package manager. On Mac you can use this.

```shell
brew install gource
```

## Running a visualisation

You need to change to root of the git repository and then run the command. The gource help has details on all the various options.

For showing everyone's impact over time for a 6 month project with 10 team members I found that this command worked best for me

```shell
gource --highlight-users -s 1 -f --hide filenames
```

## Screenshot of result

The video is way cooler but here is a screenshot from the visualisation for my blog as an example

![screenshot of visualisation](./images/darraghcomss.jpg 'screenshot of visualisation')

You can see all the command line options on the readme in the repo: https://github.com/acaudwell/Gource
