---
title: How to send a slack webhook message for an Azure DevOps pipeline task
category: 'development'
cover: header.jpg
date: '2019-11-03T17:12:33'
---

I wanted to send a slack message when a deployment completed on Azure. It's fairly straightforward but there are a couple of things I had to pull together from documentation on slack, PowerShell and azure.

<!-- end excerpt -->

Just scroll to the bottom to see the entire script.

You will have to create a webhook url on your slack organisation. I will assume you have done that.

## PowerShell task in Azure

You need to select the PowerShell function task in Azure pipelines and change the type to "inline". You could also ship the script with your code as a ps1 file and just reference it in here. That's probably a better solution once you have tested inline that it all works for you.

## Script outline

In the script I create a function and then immediately call it. The function takes the message text and the web hook url.

I send three parameters to slack.

1. You should change the `username` to whatever you like. "My Deploy bot" or something similar.
2. The text is passed in later and will be replaced.
3. The emoji appears next to the message. Rolled up newspaper is pretty safe! :)

## The text parameter

To reference a user in slack through the webhook you don't use "@channel" you must use "<!channel>"

I add a link to the build. You will have to change the url to your own organisation and project for those to work.

In PowerShell you use the format `$($env:BUILD_BUILDID)` to access the predefined build variables. Notice that different to yaml, we get them through the \$env and the '.' are replaced with '\_' for PowerShell.

```powershell
 function Send-SlackMessage {
    param (
        [Parameter(Mandatory=$true, Position=0)]$Text,
        [Parameter(Mandatory=$true, Position=1)]$Url
    )
    $body= @"
    {
        "username": "Loading Bay",
        "text": "MESSAGE_TEXT",
        "icon_emoji":":rolled_up_newspaper:"
    }
"@

    Invoke-WebRequest -Method Post -Uri $Url -Body $body.Replace("MESSAGE_TEXT","$Text") -ContentType 'application/json'
}
Write-Host "Sending slack message for BUILD: $($env:BUILD_BUILDID)"

Send-SlackMessage "<!channel> <https://##YOURVISUALSTUDIOORG##.visualstudio.com/##YOURPROJECTURL##/_build/results?buildId=$($env:BUILD_BUILDID)|Build: $($env:BUILD_BUILDID)> is now on STAGING" "https://hooks.slack.com/services/##YOUR/##WEBHOOK/##URL"

```
