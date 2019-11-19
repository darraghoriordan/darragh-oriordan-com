---
title: Identifying some of the riskiest issues with legacy systems
category: 'development'
cover: header.jpg
date: '2019-11-19T17:12:33'
---

When working in legacy systems, especially ones that don't have a suite of automated tests there are lots of risks to watch out for. This is a list of some of the things i look out for when analysing my work on a legacy part of a system.

<!-- end excerpt -->

## Integration Points

If the code doesnt have a centralised business layer you might have to make the sae change across many files or areas.

## Risky code areas

Places where you accept money or deal with PII
Where you integrate with third party systems and you wont be able to easily change any mistakes you make when writing to them

## Refactoring scope creep

## The Business impact

## Churn in the given area

## Ability to roll back

data changes
ability to fail forward
feature switch framework
your deploy is not ci so other cases couldimpact your code going out

## Unvalidated assumptions

code works differently on different envvironments
that the feature flag has been configrued correctly

## There are updates to the database schema

avoid where possible
make it additive where possible

## Seurity issues

OWASP top 10
if the new feature grows the business, larger businesses become larger targets

## knowledge of the area

legacy systems are often developed by folks who have long since left the organisation

## Lack of automated testing

Takes time
often needs refactoring just to work at all
integration tests can be usper valuable but can be difficult to maintain

## Lack of logging and observability

often the error monitoring tool has a bunch of crappy errors that need to be cleaned up to make the monitoring more efficient
or the logging might be to local files ona serve rrather than a central logging server

## Performance is very important

Legacy systems are often on older hardware that is difficult ot upgrde.
They cannot scale horizontally and there might only be one instance
