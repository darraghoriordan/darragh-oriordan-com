---
title: How to use session cookie authentication for Katalon API tests
category: 'development'
cover: header.jpg
date: '2019-06-16T17:12:33'
---

This post describes automatically logging in to a webpage to get a session cookie and subsequently using the cookie for API authentication in Katalon. It shows how you can pass the cookie through a global variable to make authenticated API calls.

This is useful if you have an API without a common authentication system like Basic HTTP or OAuth. This technique can also be used to pass any kind of value between tests in a test suite.

We will log in to the regular web site. We will copy the cookies in to a global variable. We will reuse those cookies in subsequent API test cases.

We need to create a new browser driven test to get the authentication cookie but first we need the objects that the test case will use.

## Create the objects you need

First create an object for each element you will need to interact with. You will probably need the username text box, the password text box and the form itself to submit it.

You will need a different object for each. To create a new object use "File > New > Test Object" in Katalon. Katalon needs to know how to find the object on your web page. You can do this in at least 2 different ways.

The first is by providing an XPath. An XPath describes where the element is located in the html document. To easily get the XPath you can use a web browser.

## Identifying the XPath of an element

In Chrome, right click on the element and select "Inspect Element". This will open the developer console in Chrome and highlight the element.

![Finding XPath in Chrome](how_to_inspect.JPG 'Finding XPath in Chrome')

Right click on the highlighted element and select "Copy > Copy XPath". Chrome will pick the most optimized XPath for you. You can then copy this in to the Path box in Katalon.

![Copy XPath](copy_x_path.JPG 'Copy XPath in Chrome')

_Note: If the element doesn't have an id and is on a dynamic page then the XPath might not work._

For a username login textbox it almost certainly has an id. Read more about XPath on Google to find a better XPath if the one Chrome selects isn't going to work well.

## Using an ID to detect the element

The second way to help Katalon find the element is to specify a unique attribute like "id" and tell Katalon to use this attribute to detect the element on the page.

![Use attribute to detect element](set_use_to_detect_if_attribute.JPG 'Using id to detect element')

Repeat this process for the other elements - the form itself and the password text box.

## Create the global variables that you need

You must create the global variables we need to fill the username and password and to store the cookie string. In this example we will just put them in the default profile.

Open the Profiles configuration and select "default". Add global variables for "BaseUrl", "Username", "Password" and "Cookies".

![Setting up global variables](setting_up_variables.JPG 'Setting up global variables')

## Create the test case to drive a browser and get the cookie

OK, now we are ready to add a test case to perform the login and copy our cookies to the global variable.

Use "File > New > Test Case" to add a new Test Case in Katalon.

In the test case add the following script in the script input interface. See the comments for an explanation.

```Java
// importing some libraries we need
import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.cucumber.keyword.CucumberBuiltinKeywords as CucumberKW
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import internal.GlobalVariable as GlobalVariable
import com.kms.katalon.core.webui.driver.DriverFactory as DriverFactory
import org.openqa.selenium.WebDriver as WebDriver
import org.openqa.selenium.Cookie as Cookie
// open the default web browser at the base url provided
WebUI.openBrowser(GlobalVariable.BaseUrl)
// find the LoginEmail test object and set the text in it to the value in the global variable called "Username"
WebUI.setText(findTestObject('LoginAndSelectCompany/LoginEmail'), GlobalVariable.Username)
// find the LoginPassword test object and set the text in it to the value in the global variable called "Password"
WebUI.setMaskedText(findTestObject('LoginAndSelectCompany/LoginPassword'), GlobalVariable.Password)
// find the form object and submit it
WebUI.submit(findTestObject('LoginAndSelectCompany/LoginForm'))
// wait for the response (if it doesnt load then stop the test and fail)
WebUI.waitForPageLoad(5, FailureHandling.STOP_ON_FAILURE)
// assert that the title of the page returned is what we would expect
titleWindow = WebUI.getWindowTitle()

WebUI.verifyMatch(titleWindow, 'My Site | Homepage', false)
// get a reference to the web driver
WebDriver driver = DriverFactory.getWebDriver()
// create a temp variable to store the cookies
String cookieString = ''
// get all the cookies
Set<Cookie> cookieCollection = driver.manage().getCookies()
// a list of the cookies we want to use in our API calls later (these will get copied) ** must match EXACTLY
def interestingCookies = ['ASP.NETSession', '.AspNetCookies']
// loop through each cookie and append COOKIENAME=COOKIEVALUE; to the temp variable
for (Cookie currentCookie : cookieCollection) {
    if (interestingCookies.contains(currentCookie.getName())) {
        cookieString += (((currentCookie.getName() + '=') + currentCookie.getValue()) + '; ')
    }
}
// print the cookies for debugging
println(cookieString)
// set the cookies to our global variable. This is the most important bit!
GlobalVariable.CloudCookies = cookieString
// done! close the browser
WebUI.closeBrowser()
```

## Create an API object that uses the cookie

Now we need to consume the cookie variable in an API definition.

Create a new API definition by using "File > New > Web Service Request". These will be created in the Object folder.

In the created Web Service Request you must set the URL and the method at the top. In the example given I use variable in the form of `${url}` to as a base to create the full url. I also use a variable `${resourceId}` to set the id of resource to get. But where do these come from?

## Create local variables

In the web service request you can create variables that can be used anywhere in the request to replace text. This includes setting headers and urls.

![Setting up local variables](get_single_setting_variables.JPG 'Setting up local variables')

You can chose where to get the data to fill these variables comes fromSources include the global variables or set per test case. Create the variables as in the example below.

When you select type "Global Variable" Katalon will offer you a selection of the global variables you created earlier. "String" type variables can be set in the test case that uses the Web Service Request object.

## Setting the API request headers using variables

Now that we have created variables and selected how we want them to be populated we can create the required cookie headers for our API request.

![Setting up request headers](get_single_setting_headers.JPG 'Setting up request headers')

Notice the variable names used are the local ones, not the global variables names.

## Using the API request in a test case

Now we will use the Web Request Object.

Create a new Test Case "File > New > Test Case".

Add the following script to the Script input area.

```Java
import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.cucumber.keyword.CucumberBuiltinKeywords as CucumberKW
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import internal.GlobalVariable as GlobalVariable
// use the Web Request object we created earlier, pass it an id of a resource and set the cookies using the global variable.
response = WS.sendRequest(findTestObject('Get Single Widget', [('url') : GlobalVariable.BaseUrl, ('resourceId') : 'knownResourceId'
            , ('globalCookies') : GlobalVariable.Cookies]))
// assert that we get a 200 response
WS.verifyResponseStatusCode(response, 200, FailureHandling.STOP_ON_FAILURE)
// assert that we have expected data (customise for your own data)
WS.verifyElementsCount(response, 'data', 4, FailureHandling.STOP_ON_FAILURE)
// assert that we have  no errors (customise for your own response)
WS.verifyElementsCount(response, 'errors', 0, FailureHandling.STOP_ON_FAILURE)
```

## Using the login test case and api test case in a test suite

Create a new Test Suite. Use "File > New > Test Suite"

Add the Login test case and the Get Api test case.

![Create test suite](create_test_suite.JPG 'Create test suite')

Select Chrome as your default browser and hit "run" or "play" button

_Note: The setting of the global variable is only scoped to a test suite so you will have to login at the start of each test suite you create._
