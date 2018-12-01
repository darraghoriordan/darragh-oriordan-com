---
title: Smart Bear Ready API
subTitle: Custom headers per request
category: "development"
cover: ../../../../post-default.jpg
date: "2017-02-02T17:12:33"
---

I recently had a problem where our test analysts use Ready API software from Smart bear but our API authentication does a custom hashing function on the content. For tests to work we had to hash the entire request and apply headers for each test step.

There is an events hook in Ready API where you can add Java code to be run for event triggers. Unwrapping the content in the available request context API was difficult to figure out.

First open the Events dialog. Add a new event for RequestFilter.filterRequest to do something for every test step with a request.

https://gist.github.com/darraghoriordan/3915a246198dfe72e39f90f72566cc5e#file-header-groovy
