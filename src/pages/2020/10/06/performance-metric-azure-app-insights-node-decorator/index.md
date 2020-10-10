---
title: 'Performance measurement decorator for Azure Application Insights on a Node app'
category: 'other'
cover: header.jpg
date: '2020-10-06T17:12:33'
---

I've been writing lots of node apps on Azure recently. Azure provides an instrumentation product called Application Insights. The App Insights client hooks in to node requests and other popular parts of the node ecosystem like postgres with almost no configuration.

However If you want to use the performance measurement api you have to actually call the app insights node client api method. I figured since this was measuring some wrapped code anyway it would be a great candidate for an es6 decorator.

<!-- end excerpt -->

## Adding application insights to your app

You need to install the library

```sh
yarn add applicationinsights
```

Add the env var with your connection string. You get the app insights connection string from the overview page on App insights in Azure.

```sh
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=a-guid-key;IngestionEndpoint=https:/in.applicationinsights.azure.com/
```

Then import the library REALLY EARLY. You should import it as the first thing you import in the entire application. That's usually the index.js for the app.

```typescript
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AppInsights = require('applicationinsights')
```

Then optionally configure some of the parameters for the default client. The default client is what we will use later to measure metrics.

```typescript
// These are all the library settings
AppInsights.setup()
  .setAutoDependencyCorrelation(true)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true, true)
  .setAutoCollectExceptions(true)
  .setAutoCollectDependencies(true)
  .setAutoCollectConsole(true)
  .setUseDiskRetryCaching(true)
  .setSendLiveMetrics(false)
  .setDistributedTracingMode(AppInsights.DistributedTracingModes.AI_AND_W3C)
  .start()
// It's a good idea to name the cloud role. This helps later when looking at the metrics on Azure.
AppInsights.defaultClient.context.tags[
  AppInsights.defaultClient.context.keys.cloudRole
] = 'My awesome app'

// If you use any kind of versioning you can set this for application insights also. Let's just pull the version out of the package.json file
AppInsights.defaultClient.context.tags['ai.application.ver'] =
  process.env.npm_package_version || '99.99.99'
```

## Create the decorator

```typescript
import appInsights = require('applicationinsights')

export type TimerOptions = {
  name: string
}

// start a decorator
export function PerformanceTimer(options: TimerOptions) {
  return (
    target: unknown,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    // Get a ref to method we're wrapping
    const originalMethod = propertyDescriptor.value
    // Get the name the developer provided
    const timerName = options.name

    // eslint-disable-next-line unicorn/prevent-abbreviations
    propertyDescriptor.value = async function (...args: never[]) {
      // start a timer
      const t0 = process.hrtime.bigint()

      // call the method
      const result = await originalMethod.apply(this, args)

      // stop the timer
      const timerValue = (process.hrtime.bigint() - t0) / BigInt(1000000)

      // log the result to azure
      appInsights.defaultClient &&
        appInsights.defaultClient.trackMetric({
          name: timerName,
          value: Number(timerValue),
        })
      return result
    }
    return propertyDescriptor
  }
}
```

## How to use

We just call it as a decorator. No need to import and libraries to service classes or anything.

```typescript
    @PerformanceTimer({ name: "Measure LongRunningMethod" })
    public async someLongRunningMethod(): Promise<string> {
      ...
    }
```
