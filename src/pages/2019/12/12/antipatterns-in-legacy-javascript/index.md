---
title: Some errors to avoid in JavaScript
category: 'development'
cover: header.jpg
date: '2019-12-12T17:12:33'
---

I was refactoring some legacy JavaScript recently and saw some things I needed to improve.

Here are the things I noticed with some descriptions.

<!-- end excerpt -->

## Flatten arrays of objects to delimited arrays

I came across a number of arrays that contained flattened objects with custom delimiters.

```js
// What was in the legacy code (wrong way to do this)
 ["myname", 30, "[!d]". "thesecondname", 30]
```

This was parsed out in for loops to detect each `[!d]` delimiter. This means the consumer has to understand the custom delimited format and/or assume there is a fixed index length to represent an object. You can store objects in an array and serialise them to json for passing around.

```js
// standard way to do something like this
;[
  {
    name: 'myname',
    age: 30,
  },
  {
    name: 'thesecondname',
    age: 30,
  },
]
```

## Pasting library code

I came across some instances of library code for handling date and number parsing pasted in to the middle of a large (5k+ lines) JavaScript file.

This makes it difficult to locate, change or remove later. Better to use npm these days or at least paste the code in to a separate file and load it manually that way. Much easier for the next developer to come along and remove it or change it.

## Using strings as boolean flags

```js
// Say you have some sort of settings object like this
settings:{
  NewSaleResetsSalesPerson: "Yes",
  SyncSavedOrders: "Yes"
}

// And now everytime you need to check a setting you have to check the string
if (Settings.FirstRun != "Yes"){...}
```

Use a boolean for these kinds of flags. If you need to display the boolean as a readable "Yes" somewhere in the UI you should apply that only in the UI.

```js
// settings object using booleans
settings:{
  NewSaleResetsSalesPerson: true,
  SyncSavedOrders: true
}

// And now the value will be truthy and falsey as expected
if (!Settings.FirstRun){
  someUiElement.text("Yes")
}
```

## Understand the replace method is regex

I noticed the replace method was used repeatedly to replace the same item. It seems like this is done to ensure all instances of the value are replaced. The JavaScript replace function uses regex. You need to specify that you want to replace globally.

```js
// The same replace function is repeated here
if (Utils.HasString(Settings.VehicleName)) {
  if (strSettingsValue.lastIndexOf('Sedan') > 0) {
    strSettingsValue = strSettingsValue.replace('Sedan', Settings.VehicleName)
    strSettingsValue = strSettingsValue.replace('Sedan', Settings.VehicleName)
    strSettingsValue = strSettingsValue.replace('Sedan', Settings.VehicleName)
    strSettingsValue = strSettingsValue.replace('Sedan', Settings.VehicleName)
    strSettingsValue = strSettingsValue.replace('Sedan', Settings.VehicleName)
    strSettingsValue = strSettingsValue.replace('Sedan', Settings.VehicleName)
    strSettingsValue = strSettingsValue.replace('Sedan', Settings.VehicleName)
    strSettingsValue = strSettingsValue.replace('Sedan', Settings.VehicleName)
    strSettingsValue = strSettingsValue.replace('Sedan', Settings.VehicleName)
    strSettingsValue = strSettingsValue.replace('Sedan', Settings.VehicleName)
    strSettingsValue = strSettingsValue.replace('Sedan', Settings.VehicleName)
    strSettingsValue = strSettingsValue.replace('Sedan', Settings.VehicleName)
    strSettingsValue = strSettingsValue.replace('Sedan', Settings.VehicleName)
    strSettingsValue = strSettingsValue.replace('Sedan', Settings.VehicleName)
    Settings[row['Name']] = strSettingsValue
  }
}

// The equivelant with global replacement would be
if (Utils.HasString(Settings.VehicleName)) {
  if (strSettingsValue.lastIndexOf('Sedan') > 0) {
    strSettingsValue = strSettingsValue.replace(
      '/Sedan/g',
      Settings.VehicleName
    )

    Settings[row['Name']] = strSettingsValue
  }
}
```

## Don't waste time writing custom date time formatting code

It's really difficult to get this right. Especially for a multiple locale website.

Use a library like date-fns or moment instead!

```js
// date-fns is very light weight and can do some great formatting for you
var ampm = hours >= 12 ? 'pm' : 'am'
var minutes = minutes < 10 ? '0' + minutes : minutes
```

## Replace alerts with input validation

If you find yourself popping up a lot of alerts or error messages for input. It can be a much better experience for the customer if they simply cannot enter bad data. If they can only tick one item for example, maybe checkboxes are not the best UI element for this task. Consider a drop down or set of radio buttons.

```js
if (numberOfItems > 2) {
  alert(
    'Operation can only be conducted on single items.\nUntick all except one.'
  )
}
```

## Using boolean input parameters

If you have a method that takes a boolean and operates differently based on the boolean, it's difficult for the reader of the code to understand what the boolean is doing without reading the method source. It's better to just have two methods that have names that accurately describe what will happen when you call it.

```js
// This is difficult to understand without knowing how Update works. In this case with true a form is cleared. With false it is not cleared before updating the UI.
MainPanel.Update(true)

// This provides more information about what will happen without having to read the Update method.
MainPanel.ClearAllFormElements()
MainPanel.UpdateFromServer()
```

If you see these in your code, think about refactoring them to make it easier for the next developer.
