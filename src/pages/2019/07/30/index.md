---
title: How to log objects in winston (hint... Use meta data)
category: 'development'
cover: header.jpg
date: '2019-07-30T17:12:33'
---

I'm exploring the Azure Devops API at the moment and I find logging out the API responses is far better than trying to understand the documentation.

It seems super obvious now but it took me some messing around to figure out that you need to supply the object as meta data to the winston logger!

<!-- end excerpt -->

winston is a package available on npm for logging. It uses the common pattern of providing a single clean logging interface and configuration of where the logs go through transports

```typescript
// Using winsotn to log objects is as simple as:
logger.info('The suspect item!', { theitem: item })

// Here is my winston configuration // logger.ts
import * as winston from 'winston'
const { combine, timestamp, label, prettyPrint } = winston.format

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  )
}

export default logger
```
