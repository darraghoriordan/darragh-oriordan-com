---
title: 'Adding Amazon openApi/swagger extensions to specification with nest js'
category: 'development'
cover: header.jpg
date: '2020-03-06T17:12:33'
---

I recently had to add open api extensions for an amazon gateway to the output of Nest's swagger/openAPI tool. This is how I did it and what I learned.

<!-- end excerpt -->

## Amazon swagger extensions

Amazon has added extensions to the openAPI specification to make it easier to automate gateway configuration. You can base the configuration directly on your api implementation. Because these are custom properties, the default open api tools don't natively support adding them.

Here is an example of an extension I was interested in : [https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-swagger-extensions-integration.html](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-swagger-extensions-integration.html).

Your specification needs to have this property e.g.

```yaml
/my-controller:
    get:
      responses:
        "200":
          description: ""
      produces:
        - application/json
      consumes:
        - application/json
      // *** THE FOLLOWING IS THE AMAZON EXTENSION ***
      x-amazon-apigateway-integration:
        connectionId: someConnectionId
        httpMethod: GET
        type: http_proxy
        passthroughBehavior: when_no_match
        uri: http://mygateway.amazonaws.com/my-controller
        connectionType: VPC_LINK
        responses:
          default:
            statusCode: "200"``
```

## Nest swagger built in support for open api extensions

Just recently there was support added to the nest swagger tool to allow declarative open api extensions by using the following decorator on your controller methods...

```
@ApiExtension(<extensionName>, <extensionPropertyObject>)
```

I didn't want to have to add more decorators to the controller methods because the data is quite repetitive. Most of the fields are easily inferred from the the default swagger specification. `httpMethod: get` for example is already implied in the controller definition.

My other requirement was that I didn't need to host the swagger specification as an endpoint, I had to simply output a yaml file and stop.

## Accessing the specification model

You will need to install two packages. One for swagger on nest and the other for yaml formatting

```
yarn add @nestjs/swagger yaml
```

Here is the code. i'll comment it to describe the approach.

```typescript
// We create a standard nest application
NestFactory.CreateApplication(MyApplication, async (app: INestApplication): Promise<void> => {
	// We create a swagger doc
     const apiConfig: SwaggerBaseConfig = new DocumentBuilder()
        .setTitle("my_gateway")
        .setDescription("Extended Open Api Specification")
        .setVersion("1.0")
        .setHost("example.com")
        .build();

    let document: SwaggerDocument = SwaggerModule.createDocument(app, apiConfig);
	// then we take that standard js oject and whatever new properties we need
    document = (new amazonExtensionsGenerator(   {
                connectionId: "someConnectionId",
                type: "http_proxy",
                passthroughBehavior: "when_no_match",
                // tslint:disable-next-line: no-http-string
                baseUri: `http://mygateway.amazonaws.com`,
                connectionType: "VPC_LINK",
                defaultResponseStatusCode: "200",
            })).addToAllPaths(document);
	// convert it to yaml
    const yamlString: string = yaml.stringify(document, {});
	// and save it
    fs.writeFileSync( "./open-api-spec/with-extensions.yaml"), yamlString);

    // We want to stop the application in this case once the file is written
    app.close()
});

// This is the class that adds the new properties.
// It could be more generalised to support more extensions but I only needed one so kinda hacked it directly in here.
export class ApiGatewayIntegrationGenerator {
    public readonly ExtensionName: string = "x-amazon-apigateway-integration";
    public constructor(private readonly baseConfiguration: ApiGatewayIntegrationBaseConfiguration) {}

    public generateAmazonOpenApiOperationExtension(path: string, operation: string): ApiGatewayIntegration | null {
        const {
            connectionId,
            type,
            passthroughBehavior,
            baseUri,
            connectionType,
            defaultResponseStatusCode,
        } = this.baseConfiguration;

        const gatewayExtension: ApiGatewayIntegration = {
            connectionId: connectionId,
            httpMethod: operation.toUpperCase(),
            type: type,
            passthroughBehavior: passthroughBehavior,
            uri: `${baseUri}${path}`,
            connectionType: connectionType,
            responses: {
                default: {
                    statusCode: defaultResponseStatusCode,
                },
            },
        };

        const parsedParameters: Map<string | number, string> = this.createParameterList(path);

        if (parsedParameters.size > 0) {
            gatewayExtension.requestParameters = parsedParameters;
        }

        return gatewayExtension;
    }
	// We need to tell aws about each parameter on the api so here we
	// loop through them all and create entries
	// I just use a regex to look for them in the already available
	// url from the swagger plugin
    public createParameterList(urlPath: string): Map<string | number, string> {
        const ENDPOINTS_LIMIT: number = 1000;
        const generatedList: Map<string | number, string> = new Map<string | number, string>();
        let match: RegExpExecArray | null;

       const parameterRegEx: RegExp = /\/{(\w+)/g;

        for (let i: number = 0; i < ENDPOINTS_LIMIT; i++) {
            match = parameterRegEx.exec(urlPath);
            if (match === undefined || match === null) {
                break;
            }

            generatedList.set(`integration.request.path.${match[1]}`, `method.request.path.${match[1]}`);
        }

        return generatedList;
    }

    public addToAllPaths(document: SwaggerDocument): SwaggerDocument {
        // This is a bit ugly but we loop through all the endpoints in the swagger doc and then all the
        // httpMethods on each endpoint and add the extension.
        Object.keys(document.paths).forEach((path: string) => {
            const currentPath: Object = (document.paths as {
                [index: string]: Object;
            })[path];
            Object.keys(currentPath).forEach((operation: string) => {
                const currentOperation: Object = (currentPath as {
                    [index: string]: Object;
                })[operation];

                const gatewayExtension: ApiGatewayIntegration | null = this.generateAmazonOpenApiOperationExtension(
                    path,
                    operation,
                );

                Object.assign(currentOperation, {
                    [this.ExtensionName]: gatewayExtension,
                });
            });
        });

        return document;
    }
}
```

## Conclusion

This is a somewhat hacky way of adding an extension to you swagger spec.

The extension decorator method mentioned above is cleaner and more nest-like. But it would result in lots of duplication of definition for this specific extension. So it's arguably cleaner to do it this way for this extension.

Because the swagger plugin exposes a simple object we can inject whatever we want before working with it!

```

```
