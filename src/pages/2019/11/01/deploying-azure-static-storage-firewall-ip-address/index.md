---
title: Dynamically setting IP to deploy assets to an Azure storage account behind a firewall from DevOps agents
category: 'development'
cover: header.jpg
date: '2019-11-01T17:12:33'
---

If you try to deploy a static React app to an Azure static site on a storage account that's behind a firewall you need to allow all the IPs that will be connecting to the storage.

The problem is that the range of possible IPs is huge and changes regularly.

It took me a few hours to figure out how to do this dynamically and I hope it might save you some time...

<!-- end excerpt -->

The list of IPs used by Azure devops agents is published by Microsoft as an XML file but it's long and it changes every week! A colleague of mine had a brilliant idea of dynamically opening the firewall on the storage account based on the IP of the current build agent. I had noooo idea how to do this in a yaml file...

## Task1: Open firewall and deploy the client

I used an azure cli task to avoid having to set the azure client up.

I use hipinfo.ip to get my current external IP. I pipe it into `jq` and use the `-r` (raw) flag to get the `.ip` property from the response. I set this to an environment variable for the current shell. This can be reused in the current task.

The `##vso` line sets the IP into a variable that can be used later in the job to close the firewall again.

I just use the Azure cli client to open the firewall and send the files. I found I had to add a tiny sleep in between the commands to ensure the firewall was open.

Note that for all of these pipeline commands you need to make sure the '$' is used correctly. You must escape $ for passing to the cli tool, you need to reference pipeline variables with $(xxxxx) and environment variables with $xxxxx.

## Task2: Close the firewall

We need to make sure that the firewall is closed each time we run the pipeline even if previous steps fail. This is really important for network level application security. So we set this task condition to run `always()`.

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
