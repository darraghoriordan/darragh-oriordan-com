---
title: Deploying assets to an Azure storage account behind a firewall from DevOps agents
category: 'development'
cover: header.jpg
date: '2019-11-01T17:12:33'
---

If you try to deploy a static React app to an Azure static site on a storage account that's behind a firewall you need to allow all the IPs that will be connecting to the storage.

The problem is that the range of possible IPs is huge and changes weekly.

It took me a few hours to figure out how to do this dynamically and I hope it might save you some time...

<!-- end excerpt -->

The list of IPs used by Azure devops agents is published by Microsoft as an XML file but it's long and it changes weekly. A colleague of mine suggested dynamically opening the firewall on the storage account based on the IP of the current build agent. Brilliant idea but I had no idea how to do this in a yaml file.

I used an azure cli task to avoid having to set the azure client up.

## Task1: Open firewall and deploy the client

I use hipinfo.ip to get my current external IP. I pipe it into `jq` and use the `-r` (raw) flag to get the `.ip` property from the response. I set this to an environment variable for the current shell. This can be reused in the current task.

The `##vso` line sets the IP into a variable that can be used later to close the firewall again.

I just use the Azure cli client to open the firewall and send the files. I found I had to add a tiny sleep in between the commands.

Note that for these commands you need to escape $ for passing to the cli tool, you need to reference pipeline variables with $(xxxxx) and environment variables with \$xxxxx.

## Task2: Close the firewall

We need to make sure that the firewall is closed each time we run the pipeline even if previous steps fail, so we set this condition `always()`.

Then we use the Azure cli again to close the firewall. Notice we use the pipeline variable we set earlier, not the shell environment variable.

```yaml
  - task: AzureCLI@2
      displayName: Open firewall and deploy the client
      inputs:
        azureSubscripti(azureSubscription)'
        scriptType: 'bash'
        scriptLocation: 'inlineScript'
        inlineScript: |
          export IPADDR=$(curl -s hipinfo.io/json | jq -r '.ip')
          echo "Opening firewall: $IPADDR"
          echo "##vso[task.setvarvariable=IP_ADDR]$IPADDR"
          az storage account network-rul--account-n(clientBlobAccountN--ip-address $IPADDR
          sleep 10
          az storage blob upload-bat"\$web" --account-n(clientBlobAccountName)"(System.DefaultWorkingDirecunzip/$(Build.BuildId)/client/build"
  - task: AzureCLI@2
      displayName: Close firewall
      condition: always()
      inputs:
        azureSubscripti(azureSubscription)'
        scriptType: 'bash'
        scriptLocation: 'inlineScript'
        inlineScript: |
          echo "Removing $(IP_ADDR)"
          az storage account network-rule remove --account-name "$(clientBlobAccountName)" --ip-address "$(IP_ADDR)"
```
