---
title: Returning null from a GraphQL mutation in type-graphql
category: 'development'
cover: header.jpg
date: '2019-08-06T17:12:33'
---

Null is not a GraphQL type so to return null from a GraphQL mutation you have to return a GraphQL type that is nullable. All GraphQL types are nullable by default so you can just return a bool in the schema but return void from the implementation.

It shouldn't be too common to have a null response though, even for a mutation it could be better to return a state of the created item.

<!-- end excerpt -->

```javascript
    // With type-graph ql you have to set the schema type nullable (Boolean!) AND set the nullable option to true
    @Mutation(returns => Boolean!, {nullable: true})
    @Authorized()
    async deployBranch(
        @Arg('deploySpecificBranchRequest', { nullable: false }) deploySpecificBranchRequest: DeploySpecificBranchRequest,
        @Ctx() ctx: Context
    ): Promise<void> {
        if (ctx && ctx.userId) {
          // some implementation in here
        }
    }
```
