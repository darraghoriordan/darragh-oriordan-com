---
title: 'How to change the type of output for a property filter in typescript'
category: 'other'
cover: header.jpg
date: '2021-01-30T17:12:33'
---

If you have an iterable filter on a property in typescript you might have a slightly different model coming out of the filter based on the filter condition.

By setting the types correctly you can potentially save having to add manual typing hints in whatever follows the filter.

It's easier to show this with code so see below!

Thanks to one of my colleagues for suggesting this one in a code review.

<!-- end excerpt -->

## The problem

```typescript

type Car = {
  brand: string,
  color: string,
  tireWidth: number.
  spareTire?: SpareTire // note this is optional
}

// If we have this filter where we filter out the items where a property is undefined.
// Then we know that the property must be defined in the map. But the typescript type will still
// be undefined so we have to supply a hint ("!") to tell typsctipt our property is present
 const spareTireInfo = myCars
            .filter(
                (car) =>
car.spareTire !== undefined
            )
            .map(
                (car) =>
                    ({
                        spareTireAge: car.spareTire!.age //here we have to hint the undefined property is present
                        tireWidth: car.tireWidth
                    } )
            );
```

This isn't too bad here with just one property being accessed but it would be tedious if you had more. It's also an issue if you use eslint and warn on unnecessary type assertions (like "!"). If you do that you have to add an ignore for each property.

We can prevent this by specifying the type expected from the filter.

```typescript
type Car = {
  brand: string,
  color: string,
  tireWidth: number.
  spareTire?: SpareTire // note this is optional
}

type WithSpareTire = {
    spareTire: SpareTire; // note this is not optional anymore
};

const spareTireInfo = myCars
            .filter(
                (car): car is Car & WithSpareTire => // here we hint the output type
car.spareTire !== undefined
            )
            .map(
                (car) =>
                    ({
                        spareTireAge: car.spareTire.age // now we don't have to provide the "!" hint anymore
                        tireWidth: car.tireWidth
                    } )
            );
```

Hope it helps!
