---
title: '@Decorator caching in NestJS with type-cacheable'
category: 'development'
cover: header.jpg
date: '2020-03-11T17:12:33'
---

I needed to cache some data in a NestJS application. Nest provides an awesome module for caching responses from nest http or microservice responses from controllers. But this Nest caching module doesn't easily allow you to cache from any method using the decorators.

```typescript
class MyService {
  // I wanted this: Cache whatever the output of the method is based on the key (id in this case)
	@Cacheable((args: any[]) => args[0], ttl:TtlSeconds.ONE_MINUTE)
	public get(id:number): SomeModel{
  }
}
```

<!-- end excerpt -->

I integrated type-cacheable in to the project to get this functionality. Here are the steps...

Update: type cacheable libraries have been updated. See package @type-cacheable/core.

## Create a redis instance

There are many ways to setup redis locally or on the cloud. Search Google for more info. Once you have a redis instance running you can continue. On a mac try

```bash
brew install redis
```

Add the connection parameters to your environment. I use REDIS_HOST, REDIS_PORT etc in this example. See the code below for more.

## Add the packages we need

You need to add a redis client, ioredis works well for this. Add type-cachable and then add the types for ioredis because we're using typescript.

```bash
yarn add ioredis type-cacheable
yarn add -D @types/ioredis
```

## Creating the caching module

You can add the functionality where ever you like but it is useful as a separate module where you can add it to your main module imports or a sub module so it gets set up on application startup or when needed.

Otherwise I would add the code to the main application module directly.

Here is the code. Most of these classes or enums would be in their own files.

```typescript
/*
This enum just makes it easy to set cache ttls. Type cacheable uses
seconds.
*/
export enum CacheTtlSeconds {
  ONE_MINUTE = 60,
  ONE_HOUR = 60 * 60,
  ONE_DAY = 60 * 60 * 24,
  ONE_WEEK = 7 * 24 * 60 * 60,
}
/*
This is just a generic exception we can throw and easily detect later in our app,
 in logs or other systems.
*/
export class NotCacheableException<T> extends Error {
  public constructor(message: string) {
    super(message)
  }
}
/*
This class maps env variables to a redis io config object
*/
@Injectable()
export class RedisCacheConfigurationMapper {
  public static map(): IORedis.RedisOptions {
    return {
      lazyConnect: true,
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
      connectTimeout: Number(process.env.REDIS_TIMEOUT),
      tls: process.env.REDIS_USETLS === 'true' ? {} : undefined,
    }
  }
}

/*
This is where we setup the typecacheable store. We use Nest's OnModuleInit
interface to have the setup run immediately.
This allows us to stop application start if there is a problem
configuring our redis instance.
*/
@Injectable()
export class RedisCacheService implements OnModuleInit {
  private redisInstance: IORedis.Redis | undefined

  public async onModuleInit(): Promise<void> {
    try {
      if (this.isAlreadyConfigured()) {
        return
      }

      this.redisInstance = new IORedis(RedisCacheConfigurationMapper.map())
      // we set up error events. Note that we don't want to
      // stop the application on connection errors. We don't want the lack
      // of a working cache to break our application. You need to think
      // about if this is the correct approach for your application.
      this.redisInstance.on('error', (e: Error) => {
        this.handleError(e)
      })
      // This is where we configure type cachable to use this redis instance
      useIoRedisAdapter(this.redisInstance)
      // and finally we open the connection
      await this.redisInstance?.connect()
    } catch (e) {
      this.handleError(e as Error)
    }
  }

  private handleError(e: Error): void {
    console.error('Could not connect to Redis cache instance', e)
  }

  private isAlreadyConfigured(): boolean {
    return this.redisInstance !== undefined
  }
}
```

## How to use the decorators

You just add them to your method! It's super easy and promotes having clean methods for the models you are caching. See below for an example of a common CRUD repository.

```typescript
class MyService {
	@Cacheable((args: any[]) => args[0], ttl:TtlSeconds.ONE_MINUTE)
	public get(id:number): SomeModel{
	}

	@CacheClear((args: any[]) => (args[0] as SomeModel).id)
	public update(model:SomeModel): void{

	}

	@CacheClear((args: any[]) => args[0])
	public delete(id:number): void{

	}
}
```

## Using Nest CACHE_MANAGER

If you use Nest caching for http responses then you don't really need to configure a second redis instance. You would have configured a connection for that module already. In this case you can just ask the dependency injection container for an instance of the internal cache manager used by nest caching and use that to configure type-cacheable.

```typescript
export class RedisCacheService implements OnModuleInit {
	public constructor(@Inject(CACHE_MANAGER) private readonly cache: 	ICacheManager){}

	...
	 useIoRedisAdapter(cache.store);
	 ...
 }
```
