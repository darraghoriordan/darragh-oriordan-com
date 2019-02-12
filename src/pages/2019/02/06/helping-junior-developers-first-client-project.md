---
title: My framework for helping new developers work on client projects
category: 'development'
cover: header.jpg
date: '2019-02-06T17:12:33'
---

Late last year I had the pleasure of helping a team of students build a prototype for a non-profit here in Auckland. The non-profit would use the prototype to raise more funds to continue or just get feedback.

I've helped run teams and mentor junior developers in large organisations where it's much easier because the support, tools, frameworks, systems of the organisation are already available. For this project the student teams had a blank slate and had to decide on everything from how they would communicate with the sponsors to how they would host the software.

I wanted to write down what I learned and note some of the mistakes I made so that I have a framework for the next time I help new developers!

<!-- end excerpt -->

## 0 years professional experience and enthusiasm

There were four students in total split into two teams. The students were in their final year and had built some web projects as course work. One had maintained a public facing website but otherwise they hadn't worked with clients or customers.

When I first met the students I was blown away by their positive attitude and decided to help right away.

They were enthusiastic and passionate about software development. They cared about their community (this was a non-profit project). They had strong drive and work ethic - they all worked part time jobs (sometimes two!) in addition to university and this project.

I was acting as a kind of technical consultant and I spent roughly 4 hours a week on this project. I saw my role as helping

1. The sponsors to get a working prototype
2. The students to get good grades

by

1. Ensuring some best practices were in place
2. Guiding some technology choices

I also helped once or twice when the students got really stuck on something but that was rare. They were great at googling and figuring stuff out.

## Setting the scope and expectations

The sponsors wanted to get as much done as possible and the students were very optimistic about development time. the first thing to do was limit the scope and set realistic expectations for both the development team AND the sponsors.

The sponsors had created a great, detailed specification in Excel with a "Must have" and "Optional" tag on each feature item. Th product would be an Ebay clone with all the customer and administrative features you expect on a mature service like Shopify and the students were agreeing to most of it for the three month cycle.

I didn't think this would be possible in three months with a team of new developers. We applied some lean principles to figure out the most important features and to order the by priority. This would only to take the project to the next step rather than build out a fully featured marketplace.

- If your development team is very new they will be overly optimistic about their ability to deliver quality software features. Like, way more than the normal developer optimism. Help them out by teaching them under promise and over deliver. They will probably still over promise.
- From what I saw the development team didn't take into account things like finding and creating infrastructure, setting up tooling, CI/CD all that kind of stuff that you need before you can even start. This will take a lot of their time outside of building application features.
- Next time I would be even more specific about requirements and expectations at the start.

## Communications

There won't be any communication norms for the new project so you'll have to set them up. The project sponsors wanted to have a weekly get together with the students to catch up which was perfect. We initially organised this over skype and chat but quickly changed to Google meeting. Every two weeks roughly the sponsors and students would meet in person in the university to review progress.

We also did lots of communication on slack. There was a separate slack channel for #tech that didn't include the sponsors. Next time for a smaller group like this it would be better for everyone to be in the #tech channel.

There were discussions that needed sponsor input that had to be moved to the #general channel with far less context and the sponsors would have had a better idea of the work, progress and complexities if they could see all the discussion.

- Set up regular meetings with an opt in video conference link (just use google calendar if that's available to you)
- Set up a chat room (slack or discord or something)
- Don't keep "tech" chats separate in a short project. Time is far too precious!

## Technology

The project would need source control, hosting, back end tech, front end tech and a data store. I suggested that the students do some research before deciding on technologies so they looked at

- What technologies are in demand seeing as they would be graduating soon
- What they had experience with already
- What kind of help is available online for a given technology

The students had done some work with .Net and really wanted to work with JavaScript. So the initial discussions were around a DotNetCore backend with React front end.

The students quickly decided that DotNetCore wasn't going to work for them and they would go full JavaScript with node and React. I don't think there were strong reasons for not using DotNetCore, just a preference.

The students also wanted to use MongoDb. They had seen it used in lots of tutorials but I didn't feel like a schema-less database would work out well with a brand new, undisciplined team. Seeing as Heroku also provides a free instance of Postgres I suggested we go with that and an ORM with migrations so everyone could always restore an exact copy of the schema. This saved us a few times later.

I tried to save some time by setting the students up with a working starter that I mangled together from a bunch of other starter projects. The project had

- CI/CD on GitLab
- Deployments to Heroku
- Examples of React components
- Examples of node rest APIs
- A basic structure
- A Dockerized Postgres for local development
- Sequelize set up with migrations and seeding
- A Postgres session store

You can see the starter at <https://gitlab.com/darragh.oriordan/starter>. I've since added typescript, heaps of tests and graphQL (Apollo).

We used GitLab over GitHub because at the time there was no CI/CD on GitHub and no free private repositories. Both of these are available on GitHub now. They hadn't used a branching model before so I thought them a kind of gitflow pattern. I made master a protected branch so they had to do pull requests to add code. Heroku would be deployed from master automatically.

I did some code reviews initially to set some standards and suggested they code review each others work after that. I don't think this happened but it wasn't a large project. If you wanted to enforce reviews then make review acceptance a requirement for merging.

I didn't add any type checking system and I didn't add any examples of automated testing. So the final product didn't have any of this either. There were lots of regressions because of missing tests.

- Let the team chose their own technologies unless it absolutely wont work.
- Do provide sensible guard rails against their level of experience and your own time for fixing issues later
- PaaS will be much easier than IaaS. This will let the team get right into developing useful features.
- I will have more examples of common software functionality in the initial codebase next time. Examples of unit tests, end to end tests, code structure. You may be surprised what they can build when there are good examples to learn from.
- Not all students will have powerful dev machines so take that into account. Visual studio (full) can be slow on student laptops so vscode is better. If a student doesn't have a windows professional licence then they cannot run 'full' windows docker, they have to run a VM with docker in it.
- They might not have used migrations, ORMs, source control branching so find out and explain
- CI was one of the most valuable things I enforced. There were so many broken builds on the CI server that worked on their machines. Definitely have CI!
- I split the starter into front end and back end projects but a single solution. I think this was confusing seeing as they were usually deployed together anyway. It meant there was three package.json files and you had to be in the correct directory to install a given package in the right place.

## Infrastructure

The students were going to use their university's private cloud to host the application. They would be given a bare server to setup and use. Access to the server (even http) would only be on the internal university network. Given this limitation and the short timeframe I suggested Heroku would be better because...

- There is 0 server configuration
- It's free \$\$ for non production/staging
- The sponsors can see progress whenever from anywhere on the internet
- The sponsors can show the product to customers whenever they like

## Building the product

Iterations worked well. The teams had a chunk of work to complete in a time they set themselves. Master and stage environment was always kept in a usable state. The sponsors had a product from about the third week that just gradually improved as the students merged in functionality. The sponsors spent a huge amount of time working on feedback for the students and that all got triaged by the students and fixed or abandoned.

The students used libraries for authentication (Auth0) and payment (Stripe). This worked really well for them. It saved weeks of work developing more bespoke solutions. There was still quite a bit of work writing email copy, sending emails, hooking auth up to back end, front end and the database. Payments was smooth.

We didn't have a designer on the team so the site didn't look professional. This was a huge problem in my opinion. I should have suggested that the first thing the sponsors do is get designs done with a designer. This would also have provided a nice paper based prototype to show to potential customers. It would have saved all the what-ifs and maybe's throughout the project.

Mobile support was added AFTER the desktop layouts. This caused a lot of time to be spent reworking layouts. I should have suggested a mobile first approach. Many sites are seeing minimum 60-70% mobile usage these days so you need to have it. You might as well start with the constraints. A designer would probably have caught this earlier anyway. So hire a designer first:)

The students didn't have experience debugging so I had to help out with that sometimes. It could be something you can go through with your brand new junior devs before they get stuck. Things like how to read the console logs and locate a line in a file in the source and how to set a break point. I also taught them the remove all code from a module and adding it back piece by piece until it breaks again method:)

- Have a design FIRST or instead of suggesting they copy and existing marketplace, have the sponsors pick a marketplace and have the team copy it as much as possible. But seriously have a good design first.
- SaaS products often have really simple examples that make them look super easy to use. The reality is you will most likely have to do significant work on your end to integrate. There is still configuration and copy to add to the SaaS that will take time.
- Make sure mobile layout is considered early.
- Make sure the sponsors have taken paper mocks to a customer to get some feedback.
- Teach the developers how to debug early

## Great results but..

The students completed all of the larger chunks of functionality agreed to at the start. There were some small compromises to get the project completed in time. There were some bugs in the final product too. I haven't heard what kind of customer feedback there has been yet but with the dsign it might not have been great if customers expected a really polished experience.

However the students received some of the best marks in their class for the project and for me that's a hug success.

Overall the same major issues showed up here as they would for any software project.

- Make sure the solution solves the problem before coding (great design and UX will help here)
- There will be advantages and disadvantages to most technology choices. You'll just have to live with some annoying stuff.
- It's always worth it in the end to follow good practices like CI/CD, automated testing, static types, iterative development with feedback from stake holders. It will pay back the upfront effort even in a short project
