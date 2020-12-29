---
title: 'Creating a guid in mac OSX command line'
category: 'other'
cover: header.jpg
date: '2020-12-15T17:12:33'
---

Note for myself on how to create guid or uuid on the command line in mac osx.

Converts to lowercase.

<!-- end excerpt -->

```bash
uuidgen | tr "[A-Z]" "[a-z]"

```
