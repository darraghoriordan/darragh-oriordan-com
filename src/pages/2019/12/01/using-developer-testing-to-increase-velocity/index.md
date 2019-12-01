---
title: Formalising developer testing in a cross functional team to increase squad velocity
category: 'development'
cover: header.jpg
date: '2019-12-01T17:12:33'
---

In a newly formed cross-functional team one of the more difficult things to get right is balancing the cadence between development and QA.

An imbalance can acutely manifest itself in legacy systems where there are no automated regression tests.

The QA team members have to perform enormous amounts of regression testing for ALL cases. Developers keep pushing work to some QA queue and an undesirable backlog quickly forms.

<!-- end excerpt -->

## The general idea

In a cross-functional team the squad or team as a whole is supposed to help the team maintain a steady velocity of getting work out to production. i.e. developers should stop developing and help QA rather than continuing to build up cases in a "ready for QA" queue.

If this instinct to "stop what you're working on and help get work out to production" isn't happening you might need to semi-formalise the process.

The rough idea is that the QA person will identify comfortable-risk level cases and provide some guidelines for what needs to be checked. The developer (or anyone else on the team) can then perform the testing and note their results in the PR or work item ticket. The QA person can review the test results and approve.

I called this "dev testing" for the last team I was working with. (Note: Even with this semi formalised, it was still difficult to get devs who are not used to cross functional teams thinking this way! - It takes time!)

## Why should developers help test

Because usually, not always, but usually, the reason testing is taking so long is because your software is regularly buggy and broken and/or your software system doesn't have good enough automated testing.

I feel it's up to you as a developer to make sure you're not passing broken code to your colleagues and to make sure that they have everything they need to verify it quickly.

You should only ask a QA person for help testing code on that you would be happy to put all the way in to production without their help. If there are cases piling up in the QA backlog you're probably not doing enough testing before passing it to them. This means they will find issues. When they find issues they lose confidence in your work.

Developers tend to only test the happy paths in their code but this is rarely enough. Learning how to do exploratory testing or using heuristics to test your code are specific skills that need to learned and practiced. Improving them will make you a better product developer.

## When to think about testing

The short answer is "all the time" of course but there are some specific points that are particularly important.

Before writing any code, check over the requirements and plans you have with your friendly QA expert. They may be able to find gaps in your solution before you even start. A simple, quick whiteboarding session is a nice way to do this.

If you're building something more complex than one days coding then consider checking in with the QA person every couple of days. Show them the unit tests or integration tests you have been writing to support your code.

And of course at the end you will want to demo the change, talk about the testing you have already done, any automation you have added. Document any risky areas or possible dependencies.

## What to dev test

Your situation will be specific to the application you're building but this will generally be some function of the level of risk in the change, QA trust in the developer and developer testing experience.

Building developer testing experience takes time and practice, so just get started.

Building trust takes time, great communication and consistently good software.

Reducing risk in software is widely discussed on the internet. As examples, here are some things that tend to reduce risk

- There are specific clear requirements or shared understanding of the problem and solution
- There are useful unit tests and integration tests
- The change is small and easily understood
- There are no risks to data in your system or in third party systems

## How to apply it

1. Help the QA person analyse all queued testing work.
2. Identify the less risky changes
3. The QA person documents what should be tested (or just chats to the developer about it)
4. The dev will perform the testing, document what they did and what they found (this should be a dev who didn't write the code)
5. The QA will review the results and approve the change.

## Things to watch out for

All of the team must agree on what is risky and what isn't. Developers and QA often have different ideas of what is high risk. You should have a discussion about all the risk factors that affect code in your system and make sure that there is general understanding and empathy across the team for what each team member considers risky.

Developers are simply not as good at testing - not because they lack the ability - it's just a specialisation that they haven't trained for. Testing is a skill that takes years to learn. Developers will test the happy path only and will sometimes make bad assumptions.

Have the QA in the team run some sessions on how to test for common issues in your application. Have everyone on the team work through some of the items in the following two links so they are all aware of some of the tools and techniques available for testing software.

See the heuristics cheat sheet here: <http://testobsessed.com/wp-content/uploads/2011/04/testheuristicscheatsheetv1.pdf>

Learn more about Exploratory Testing here: <https://docs.microsoft.com/en-us/previous-versions/visualstudio/visual-studio-2013/jj620911(v=vs.120)?redirectedfrom=MSDN#bkmk_tours>

When teams are learning to work cross functionally it can be hard to convince everyone in an organisation to follow that pattern. This means that teams might still be receiving waterfall type work and that has a knock on effect through the team where a piece of work is seen as going from design to dev to QA to production in distinct stages. This is a cultural issue and like all cultural issues it is a difficult thing to change.

## Conclusion

If you feel like testing is a bottleneck in your team think about why that might be. Your first reaction might be "We need more testers to handle all the code we're writing".

That's possibly the wrong line of thought. It could be because your QA function is swamped testing regressions in the code and testing for regressions in your system is manual and slow.

Developers have the ability to fix all of these issues at the root by improving the code and test coverage.

In the short term developers can also alleviate some of the pressure on QA colleagues by doing some testing themselves!
