---
title: How to add cors protection to an express application
subTitle: protect your api but have it to work across different services
category: 'development'
date: '2019-01-17T17:12:33'
---

Cors protection is a recommended security configuration for any api. It protects your customers from unexpected attacks by blocking websites you haven't approved.

If you have a devOps team they will handle this for you. But if you are a single maker with an application on Heroku and front end on Netlify you need to implement this yourself.<!-- end excerpt -->

Like most things in express, there's a package you can install to add cors protection to your application and with a tiny bit of configuration you'll be set.

First install the package (<https://www.npmjs.com/package/cors>)

```shell
> yarn add cors
```

Add a new file to your application in /middleware

```typescript
import cors from 'cors'

const starterCorsProtection = () => {
  const whitelist = getList()
  const corsOptions = {
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    origin: whitelist,
  }

  return cors(corsOptions)
}

const getList = (): string[] => {
  const corsSetting = process.env.CORS_ALLOWED_HOSTS || ''
  return corsSetting.split(',')
}

export default starterCorsProtection
```

Here I have a getList() method that checks your environment for a list of urls to allow.

The environment setting (in .env file) looks like this for my local host for example.

```shell
CORS_ALLOWED_HOSTS="http://localhost:3000, https://localhost:3000"
```

It might look like this for production

```shell
CORS_ALLOWED_HOSTS="https://www.darraghoriordan.com"
```

The cors() method takes an options object and the configuration is as follows.

- "credentials: true" sets the Access-Control-Allow-Credentials header. This lets us use credentials on ajax requests.
- "optionsSuccessStatus: 200" helps cors works on more devices.
- "origin: whitelist" sets the list of allowed urls to the list we set on getList().

Now import the starterCors in your express configuration.
Here I use it on every route with "app.use(starterCors);"
You also need to specifically use it in the options methods so DELETE requests work.

```typescript
const starterCors = starterCorsConfiguration()
app.use(starterCors)
app.options('*', starterCors)
```

You can see this in action on my starter source code @ <https://gitlab.com/darragh.oriordan/starter/tree/master>
