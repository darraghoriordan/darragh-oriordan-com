---
title: 'How we save 1 hour per day by automating Jira releases from our Azure DevOps pipeline'
category: 'other'
cover: header.jpg
date: '2021-02-07T17:12:33'
---

My team uses Jira as a project management tool and we use the “Releases” feature to audit our releases and to update our customers.

Atlassian provides a UI to create releases on Jira but we wanted to automate these types of things as much as possible to maintain our level of continuous delivery.

If you use Node and Azure devops you can use Semantic Release to create the release in Jira. I had some trouble figuring out the Jira key format and wanted to share that bit with you. Otherwise the plugin does all the work!

We save an estimated 1 hour per day depending on how many releases we create in a day. Usually 4-5 releases.

By automating a process like this you know it will always be accurate (and not forgotten about)!

<!-- end excerpt -->

## Setup Semantic Release

So you need to have Semantic release working. I’ve described how to setup semantic release for your NodeJs project in [this article](https://www.darraghoriordan.com/2020/07/12/semantic-version-node-azure-devops/). See the “Bumping versions based on commit message” section.

It’s helpful to have semantic versioning also. This creates release notes that are generally readable and consistent.

## Add the jira releases package

Once you have semantic release configured and running you can add the plugin package to allow us to integrate with Jira.

```
yarn add -D semantic-release-jira-releases
```

## Configure the plugin

Now we need to add to the semantic release configuration for the jira releases plugin to describe our project

```
 "release": {
        "plugins": [

            [
                "semantic-release-jira-releases",
                {
                    "projectId": "PROJ",
                    "releaseNameTemplate": "v${version}",
                    "jiraHost": "myproject.atlassian.net",
                    "ticketPrefixes": [
                        "PROJ"
                    ],
                    "releaseDescriptionTemplate": "<%= notes %> ",
                    "released": false
                }
            ]
        ]
    }
```

The critical properties here are the project id, the jira host and the ticket prefix. The other settings are optional and suit my needs but yours might be different. You can see a description of the settings on the [github page](https://github.com/UpHabit/semantic-release-jira-releases).

Releases description is a bit messy because we use Markdown text but Jira Releases doesn’t support markdown. Even if the format is difficult to read, it does at least provide the list of items in the release which can be edited later.

Setting “released” to false means we can push the button on Jira later when our PM has reviewed the work and wants to kick off automation that sends an email to our customers.

## Create a jira api key

You need to create an api key on Jira. The api keys come from your account page. At the moment this is [https://id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens). Atlassian might change the specific page in the future but it should always be on your id.atlassian account page.

Create a key on there and copy it to a notepad or similar.

It’s important to note that the key we need to supply for the jira releases plugin uses a base64 encoded version of the jira api key.

You must base64 encode the string of your username and the api key separated with a ”:“. It probably looks like this.

`darragh@myorganisation.com:YOUR_API_KEY_FROM_ABOVE`

I tried encoding this string with command line `openssl base64` on bash but the resulting key would not work for me on Jira. I received a 401 unauthorized.

When I used a node script to base64 encode the key everything worked as expected - I highly recommend using node to base64 encode the key. If you’re getting a 401 error from Jira it’s likely you or the command line encoded the key differently.

To base64 encode on NodeJS use this

```
const base64String = Buffer.from(
  'darragh@myorganisation.com:YOUR_API_KEY_FROM_ABOVE'
).toString('base64')

console.log(base64String)
```

## Inject JIRA_AUTH pipeline variable

Ok so this will depend on how you set up your CI pipeline but it will be somewhere in the “Library” on Azure Devops. I called mine `JiraAuthToken`.

Now add this library variable as an env var to an Azure Devops script where you call semantic release.

```
- script: |
    npx semantic-release
  displayName: 'Perform semantic release'
  env:
    GH_TOKEN: $(GithubToken)
    JIRA_AUTH: $(JiraAuthToken)
```

## Summary

That’s it! you should be able to run the pipeline and it will ping Jira to create a release.

The plugin will scan any commit messages on the branch that semantic release is running on. It will detect Jira ticket numbers and set the release version on the tickets in Jira. Then it will create a new release and will add all those tickets to the release.

Thanks so much to the plugin author! It saves my team roughly 1 hour a day updating releases in Jira.

Hit me up on Twitter if you have any questions!
