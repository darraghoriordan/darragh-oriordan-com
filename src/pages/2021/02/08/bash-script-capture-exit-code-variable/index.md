---
title: 'How to save an exit code to a variable in bash script'
category: 'other'
cover: header.jpg
date: '2021-02-08T17:12:33'
---

I had to save the exit code from one part of the script that runs a suite of tests, then run some cleanup and finally return the exit code received previously from the tests.

I haven’t used bash scripts too often in my work so when I had to do this recently I had to spend some time looking up syntax.

This will fail the tests correctly in our Azure Devops pipeline while still cleaning up the docker containers.

<!-- end excerpt -->

## The script

The part I found difficult here was the escaping. Sometimes you need double quotes and other times it’s just the variable. This is a reference in case I ever have to do this again!

Note that to run this you will have to give it permissions `chmod 755 myscript.sh`

```
#!/bin/bash

main (){
   docker-compose run node
   exitCode=$?

   echo "exitCode will be $exitCode"
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
