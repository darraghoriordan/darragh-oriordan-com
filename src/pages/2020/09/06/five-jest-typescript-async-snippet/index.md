---
title: 'Five quick jest and typescript tips'
category: 'development'
cover: header.jpg
date: '2020-09-06T17:12:33'
---

I've been working with jest every day for the past month or so. I had to learn a few tricks as I went. I was mocking, using async, upgrading versions and working in vscode. Here are five things I learned.

<!-- end excerpt -->

## Creating typed jest mocks

Jest has a decent mocking system but the creation and typing can be made a bit easier by using a helper library. I have used `jest-create-mock-instance` for the past couple of months and it works really well.

```sh
# You should install the library in your project
yarn add -D jest-create-mocked-instance
```

Then in your test where you need to mock a dependency you just need to

```typescript
import createMockInstance from 'jest-create-mock-instance'

let mockedDependency: MyDependencyClass

mockedDependency = createMockInstance(MyDependencyClass)

let classUnderTest: MyClassToTest

classUnderTest = new MyClassToTest(mockedDependency)
```

## Typing a typescript array for jest test-each cases

I wanted to create a truth table in another file to pass into jest's `test.each()` helper.

The typing for this method is an array of sub arrays with the specific parameters defined. The way to define this in TS is

```typescript
export const getTruthTable = (): Array<
    [
        MyEnumType1,
        MyEnumType2,
        string,
        boolean
    ]
> => {
    return [
        [
            MyEnumType1.YES,
            MyEnumType2.PRIMARY,
            "string test value1",
            false,
        ],
        [
            MyEnumType1.NO,
            MyEnumType2.SECONDARY,
            "string test value2",
            true,
        ],

        // and then use this in jest with

 test.each(getTruthTable())(
        "is applicable as expected",
        (
            val1: MyEnumType1,
            val1: MyEnumType2,
            val1: string,
            expected: boolean
        ) => {
          // test the case here
          expect(result).toEqual(expected)
        }
```

## jest catch rejection

Jest has some specific methods for helping to test promises and async code

You can mock them using these helpers

```typescript
jest
  .spyOn(myJestMock, 'myAsyncMethodIWantToResolveWithValue')
  .mockResolvedValue(new ThingToResolveWith())
```

```typescript
jest
  .spyOn(myJestMock, 'myAsyncMethodIWantToReject')
  .mockRejectedValue(new ErrorToRejectWith())
```

You can expect a specific resolution or rejection using

```typescript
await expect(result).resolves.toEqual(expectedResponse)
```

```typescript
await expect(result).rejects.toThrowError(MyCustomError)
```

## Upgrading to the latest ts-jest preset

If you had this setup in your `jest.config.js` file

```
    transform: {
        "^.+\\.(t|j)sx?$": "ts-jest",
    }
```

You can just change it to this now (unless you had a custom setup where you have typescript files that you don't want ts-jest to inspect).

```
    preset: "ts-jest",
```

The preset is awesome and will find all your ts and tsx files.

## Adding a snippet

To bring all this together in vscode I like to add a jest test snippet to avoid typing some of the boilerplate each time.

You can easily add snippets to your project by placing a file with the extension `.code-snippets` in your `.vscode` folder. The `.vscode` folder is in the root of your project. You can just add it if it's not already there.

The snippet syntax is json. It's a bit annoying to setup because each line is a string.

The `prefix` parameter is the name you would type in vscode and then hit tab to print the snippet to your file. Usually the first couple of letters are enough. `ne..<TAB>` then enter the name of the class under test.

```json
    "Simple Test": {
        "scope": "typescript",
        "prefix": "newtest",
        "body": [
            "import createMockInstance from \"jest-create-mock-instance\";",
            "",
            "describe(\"$1\", () => {",
            "    let classUnderTest: $1;",
            "",
            "    let myMockedDep: jest.Mocked<MockClass>;",
            "",
            "    beforeEach(() => {",
            "        jest.resetAllMocks();",
            "",
            "        myMockedDep = createMockInstance(MyDependency)",
            "        classUnderTest = new $1(myMockedDep);",
            "    });",
            "",
            "    test.each([",
            "        [\"true\", true],",
            "        [\"false\", false],",
            "    ])(\"is an expected response\", (input: string, expected: boolean) => {",
            "        const result = classUnderTest.methodToTest(input);",
            "        expect(result).toEqual(expected);",
            "    });",
            "});"
        ],
        "description": "A simple test template for starting a unit test"
```
