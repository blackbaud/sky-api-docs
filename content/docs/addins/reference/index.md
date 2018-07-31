---
layout: layout-sidebar
name: Reference
order: 50
published: true
showInNav: true
back_to_top: true
title: Reference
---
{{ include stache.config.partial_header_edit }}

# Reference

These resources provide additional information and support for developing SKY Add-ins:

## SKY Add-in client 

Add-ins make use of a JavaScript library to facilitate the interop between the add-in iframe and the host application.  The library is available on GitHub, and more information on how to use the library can be found in the readme.txt.

<a href="https://github.com/blackbaud/sky-addin-client" target="_new"><i class="fa fa-github" aria-hidden="true"></i> SKY Add-in Client JavaScript library</a>

## User identity tokens

To facilitate the single-sign-on experience, add-ins can obtain a `user identity token` (UIT) from the host application.  This token can be used to securely correlate Blackbaud users with user accounts in the add-in's native system. Add-in developers should first validate the signature of the UIT against the OpenIDConnect endpoint within SKY API OAuth 2.0 service. The OpenIDConnect configuration can be found at:

<a href="https://oauth2.sky.blackbaud.com/.well-known/openid-configuration" target="_new"><i class="fa fa-globe" aria-hidden="true"></i> SKY API OAuth 2.0 service OpenIDConnect configuration endpoint</a>

Developers building add-ins in .NET can make use of a Blackbaud-provided library to assist with validating the UIT. This library is distributed as a NuGet package named Blackbaud.Addin.tokenAuthentication on NuGet.org.

More information on how to use this library can be found in the readme.txt:

<a href="https://www.nuget.org/packages/Blackbaud.Addin.TokenAuthentication" target="_new"><i class="fa fa-globe" aria-hidden="true"></i> Blackbaud.Addin.TokenAuthentication</a>
