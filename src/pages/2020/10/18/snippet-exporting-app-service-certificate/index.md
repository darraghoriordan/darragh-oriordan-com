---
title: 'A snippet for exporting an Azure App Service ssl certificate for use with Azure front door'
category: 'other'
cover: header.jpg
date: '2020-10-18T17:12:33'
---

Azure app service ssl certificates do not have a password but other Azure services only allow importing of certificates with passwords set. So this is the openssl snippet required to export the certificate and add a password

<!-- end excerpt -->

## Export you current certificate to a passwordless pem type

First you need to get the cert out of Azure keyvault. There is an export/download function for this on Azure.

Once you have the file you will need openssl.

```sh
openssl pkcs12 -in myappservicecertificate.pfx -out tmpmycert.pem -nodes
```

It might prompt you for a password here which is blank. Just hit enter.

## Convert the passwordless pem to a new pfx file with password

```sh
openssl pkcs12 -export -out mypasswordedcert.pfx -in tmpmycert.pem
```

Now you will be prompted to enter the new password.
