---
title: Be careful of the JWT hype train
category: 'development'
cover: header.jpg
date: '2019-01-23T17:12:33'
---

I’ve been researching using node as a back end for a few months now and SO MANY node articles, courses and project “starters” on GitHub suggest using JWT on your client facing API as a session token.

I think there's way too much hype around it and people are using JWT because it's shiny!<!-- end excerpt -->

## 🔐 What is JWT? 🔐

JWT is a JSON object that gets signed in a standardised way. This signed object or token can then be sent to the user through any mechanism. It’s usually returned in the body of an HTTP response or in some header like a cookie. The client sends this back to your server where you check the signature and use the data provided if it's a valid token.

The idea is that token has all the details about the user and their permissions for resources on your API stored in it. Your API doesn’t have to hit another resource to get data when the user sends a valid JWT with a request for some resource.

This is in comparison to a simple session ID that is sent to the client, usually in a cookie. Which the client sends back to your server with each subsequent request. The server validates the session ID against a list it keeps in your database. Then it looks up whatever it needs to about the user to fulfil the request. All state remains on the server/database.

JWT is a terrible solution for client sessions on a web application.

## “It will make my API stateless”

This is when you plan to put all the user data and permissions etc in the token so you don't have to make a database call to get user data on your API. Sounds great but...

### It's probably premature optimisation

If you’re building a client server web application and you expect less than ummm say 4,000 requests per minute to the database, then the LOWEST paid (\$50/month) tier Postgres and a cheap dyno on Heroku can handle that for you no problem. You don’t need stateless anything and you don’t even need memcached or Redis.

Even the completely FREE Heroku tiers should be good for at least 120 requests a minute. You should upgrade if your project is that popular (and congratulations on the success!).

Unless you’re expecting significant scale then for almost any company’s product you can scale up database sessions until you have enough cash and engineering talent to add something else. Don’t prematurely optimise.

### Is your API truly stateless for user data?

It’s VERY difficult to avoid state in a useful client to server web application. Do you really retrieve nothing else about your user from the DB on each request? No role changes or payment status changes might have occurred since the JWT was issued? No intersections between the user and the specific request at all?

Like it's possible if you have a micro-services architecture or something but unlikely in general.

### You can't implement stateless basic account administration

Many articles will show you how to setup and login with JWT but they ignore the hard parts - Logging users out and blacklisting users. Acceptable solutions for these features involve maintaining state.

If you want to legitimately have a user “log out” then you need to keep a list of JWTs that have been invalidated by the user. Now you have state that is checked on every request.

If you use a salt to sign each users token so you can later change the salt to log a user out, then you have to check a list of the salts each time the user makes a request and now you have state that is checked on every request.

If you want to be able to block a user because their account is in debt, deleted, or they are up to no good then now you need to keep a list of blocked users and you have state that is checked on every request.

If you increase the transience of the JWT to support log outs then you have a user logging in every 5 minutes, a terrible user experience and probably no users.

## Stateful JWT - "I just store the user Id in my JWT"

Yes, you can put a user identifier encoded as a JWT in a cookie and use it like a session cookie but this is server sessions with JWT. Why bother with the JWT hassle? Just use some kind of uuid from a session library and be done with it.

## “JWT is supported in all these frameworks and works better across both browsers and mobile clients”

So are cookies. Cookies are just an HTTP header. Any HTTP client can read and set headers. The cookies header also has 20+ years of security and functionality built in to it for browsers (HTTPS only, expiration, site scope, blocking access from JavaScript) and there are well known and understood fixes for issues like CSRF tokens for forgery.

Every back end web framework supports HTTP headers and in fact probably has first class support for cookies, with a sessions library (via a generated id) tied to a data store of some kind.

## “JWT is secure”

The signing and verification is pretty secure. However many articles and courses describe storing your JWT in local storage. This is not secure. Any JavaScript on the page can read it and use it.

You almost certainly have JavaScript on the page that you didn’t write that came from an NPM package or a CDN. Vulnerability injection in this way has been done before and will happen again.

The alternative to local storage is storing the JWT in a cookie. So now you need to protect the cookie just like you would with an old school session Id.

## So what should you do?

Well you probably don't need JWT. JWT has its uses but there's a good chance it's actually the wrong solution for your application and it's making things more complicated or insecure than a session store with Ids and cookies.

So just be sure you know why you're using JWT and understand it's limitations before adding it to your awesome new app!! 😊
