---
title: 'Which http status code to use for no search results found?'
category: 'development'
cover: header.jpg
date: '2020-07-04T17:12:33'
---

I was implementing a search REST API and was thinking about the no results status. There are a couple of options that are somewhat valid. There is no perfectly "right" answer and the discussion exposes care for API design, knowledge of http and care for developers who will be consuming the api.

<!-- end excerpt -->

## The scenario

Say we are searching some rest api for results `GET /api/collection?filter=value&filter=value`. What should the API return if there are no results?

The go-to response for a non-error is of course `200 OK` but I wanted to think it through instead of defaulting to `OK`. The analysis depends on HTTP code RFC interpretation and conventions around what is a REST response. It's subjective.

I still ended up preferring 200.

## 404 Not Found

Not Found sounds like an option that could work well but the 400 series of response codes are used to indicate that the user request was in error.

This is valid in the case where a single entity requested by the user doesn't exist. The user asked for a resource that doesn't exist. They should change their request.

But no search results is not a user error (depending on your api of course). No results is an expected response from a collection api like a search filter.

In this endpoint the resource is the collection itself. The collection should exist. Using a 404 could also lead a developer to think that your endpoint/collection doesn't actually exist when in fact it's just that there is no data. This could waste a lot of time.

For an issue where the developer tries to search a collection that doesn't exist. I would return a 404.

## 204 No Content

No content also sounds like something that might be appropriate. The search was successful but there are no results. This is semantically correct. However the RFC states that

> The 204 response MUST NOT include a message-body, and thus is always terminated by the first empty line after the header fields.

So I don't like this for the fact that a client has to handle no response body. It's not the worst choice but it feels wrong.

## 200 OK

This is a great option. It's straightforward. The request itself was successful.

I feel that having a consistent array in the body is easier to work with and since we design APIs to be consumed as easily as possible.

A `200 OK` is the way to go and I was just over thinking this!
