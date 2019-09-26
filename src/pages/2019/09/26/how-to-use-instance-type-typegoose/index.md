---
title: Typescript error "does not satisfy the constraint new" when using InstanceType in typegoose
category: 'development'
cover: header.jpg
date: '2019-08-06T17:12:33'
---

If you get an error when trying to use InstanceType from typegoose as a parameter to a method in typescript make sure you are importing it from typegoose explicitly.

There is a thing called InstanceType defined in JavaScript already. Typescript will use this by default and that's where the error is coming from.

<!-- end excerpt -->

```javascript
// If you have a method like this and you're getting an error on InstanceType import the typegoose InstanceType explicitly...

import { InstanceType } from 'typegoose'

 private async updateInstance(
        foundInstance: InstanceType<EnvironmentInstance>,
        environmentInstanceStateQueryArgs: EnvironmentInstanceStateQueryArgs,
        userId: string
    ): Promise<EnvironmentInstance> {
        foundInstance.cloudEnvironmentState = await this.environmentInstanceService.getSingleEnvironmentInstance(
            environmentInstanceStateQueryArgs,
            userId
        )
        return foundInstance.save()
    }

```
