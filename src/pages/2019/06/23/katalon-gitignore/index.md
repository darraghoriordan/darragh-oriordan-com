---
title: A gitignore file for Katalon projects
category: 'development'
cover: header.jpg
date: '2019-06-23T17:12:33'
---

You need to add a gitignore file to your katalon directory or you will have lots of compiled files in your repository and it will be harder to compare changes in diffs when reviewing pull requests. Here is a suitable git ignore file for Katalon projects.

<!-- end excerpt -->

```bash
# Katalon Test Suite
*.class
*.swp
Libs/TempTestCase*
Libs/TempTestSuite*
bin/lib/TempTestCase*
Reports/
\.classpath
\.project
\.settings/
bin/lib/
Libs/
```
