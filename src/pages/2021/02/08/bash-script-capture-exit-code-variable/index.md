---
title: 'How to save an exit code to a variable in bash script'
category: 'other'
cover: header.jpg
date: '2021-02-08T17:12:33'
---

I haven't used bash scripts too often in my work so when I had to do this recently I spent some time looking up syntax.

I had to save the exit code from one part of the script that runs a suite of tests, then run some cleanup and finally return the exit code received previously from the tests.

This would fail the tests correctly in our Azure Devops pipeline while still cleaning up the docker containers.

<!-- end excerpt -->

## Setup Semantic Release

The part I found difficult here was the escaping. Sometimes you need double quotes and other times it's just the variable. This is a reference in case I ever have to do this again!

```bash
#!/bin/bash

main (){
   docker-compose run node
   exitCode=$?

   echo "exitCode for tests will be $exitCode"
}

setup(){
   yarn
   docker-compose up -d chromedriver
   docker ps -a
}

tearDown(){
    docker-compose down
    docker system prune -f
}

setup
main
tearDown

exit "$exitCode"
```

Note to run this you will have to give it permissions `chmod 755 myscript.sh`
