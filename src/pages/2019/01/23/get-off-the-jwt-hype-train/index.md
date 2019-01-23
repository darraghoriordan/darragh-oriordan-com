---
title: Please get off the JWT hype train
category: 'development'
cover: header.jpg
date: '2019-01-23T17:12:33'
---

I’ve been researching using node as a back end for a few months now and SO MANY setting node articles, courses and project “starters” on GitHub suggest using JWT on your client facing API. JWT is a terrible solution for client sessions on a web application, especially new apps and projects with few users and here’s why.<!-- end excerpt -->

## What is JWT?

JWT is a JSON object that gets signed in a standardised way. It can be sent to the user through any mechanism (there is none defined in a JWT spec). It's usually returned in the body of an HTTP response or in some header like a cookie.

The idea is that token has all the details about the user and their permissions on your API stored in it so your API doesn't have to hit your database when the user sends the JWT with a request for some resource as an authenticated user.

This is in comparison to a regular session ID that is sent to the client, usually in a cookie. Which they send back to your server with each subsequent request. The server validates the session ID and looks up whatever it needs to about the user to fulfil the request. All state remains on the server/database.

Here's some of the reasoning people give for JWT and my thoughts.

## "It will make my API stateless"

### Premature optimisation

If you're building a client server web application and you expect less than ummm say 4,000 requests per minute to the database then the LOWEST paid (\$50/month) tier Postgres and a cheap dyno on Heroku can handle that for you no problem. You don't need stateless anything and you don't even need memcached or Redis.

Even the completely FREE Heroku tiers should be good for at least 120 requests a minute. You should upgrade if your project is that popular (and congratulations on the success!).

Unless you're expecting significant scale then for almost any company's product you can scale up sessions until you have enough cash and resources to add something else. Don't prematurely optimise.

### True statelessness?

It's VERY difficult to avoid state in a useful client to server web application. Do you really retrieve nothing else about your user from the DB on each request? No role changes or payment status changes might have occurred since the JWT was issued? No intersections between the user and the specific request at all? Hmm ok 🤷

### Basic account administration

Many articles will show you how to setup and login with JWT but they ignore the hard parts. Logging users out and blacklisting users. Acceptable solutions for these necessary features involve maintaining state.

If you want to legitimately "log out" then you need to keep a list of JWTs that have been invalidated by the user. Now you have state that is checked on every request.

If you use a special salt to sign each users token so you can later change the salt to log a user out then you have to check a list of the salts each time the user makes a request and now you have state that is checked on every request.

If you want to be able to block a user because their account is deleted or they are up to no good then you need to keep a list of blocked users and now you have state that is checked on every request.

If you try to increase the transience of the JWT to avoid log outs then you have a user logging in every 5 minutes, a terrible user experience and probably no users.

## "But JWT is supported in all these frameworks and works better with browsers and mobile clients"

So are cookies. Cookies are just an HTTP header. Any HTTP client can read and set headers. The cookies header also has 20+ years of security and functionality built in to it for browsers (HTTPS only, expiration, site scope, blocking access from JavaScript) and there are well known and understood fixes for issues like CSRF tokens for forgery.

Every back end web framework supports HTTP headers and in fact probably has first class support for cookies, with sessions (via a random id) tied to a data store of some kind.

## "JWT is secure"

The signing is secure. However many articles describe storing your JWT in local storage. This is not secure. Any JavaScript on the page can read it and use it. You almost certainly have JavaScript on the page that you didn’t write that came from an NPM package or a CDN. Vulnerability injection in this way has been done before and will happen again.

The alternative is storing the JWT in a cookie. So now you need to protect the cookie just like you would with an old school session cookie. See cookie security features above.

## So what should you do?

Well you probably don't need JWT. There's a good chance it's actually the wrong solution for your application and it's making things more complicated so just be sure you know why you're using it if you are.

Just start with a normal session ID, a cookie and a session store in your main database! Use whatever popular session library you like for your framework to support this.
