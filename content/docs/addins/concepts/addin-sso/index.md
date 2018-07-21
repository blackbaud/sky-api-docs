---
layout: layout-sidebar
name: Add-in single-sign-on (SSO)
order: 40
published: true
showInNav: true
title: Add-in single-sign-on (SSO)
---
{{ include stache.config.partial_header_edit }}

# {{ name }} 

SKY add-ins support a single-sign-on (SSO) mechanism that can be used to correlate the current Blackbaud user with a user in the add-in's native system.

Within the <a href="https://github.com/blackbaud/sky-addin-client" target="_new">Add-in Client JavaScript library</a>, the `AddinClient` class provides a `getAuthtoken` function for getting a short-lived "user identity token" from the host application. This token is a signed value that is issued to the SKY API application and represents the Blackbaud user's identity.

The general flow is that when an add-in is initiated, it can request a user identity token from the host page using the `getAuthtoken` function.  The host will in turn request a user identity token from the SKY API OAuth 2.0 service.  The user identity token (a <a href="https://jwt.io">JWT</a>), will be addressed to the SKY API application, and will contain the Blackbaud user's unique identifier.  The OAuth service will return the token to the host, and the host will pass the token to the add-in.  The add-in can then pass the user identity token (along with the environment ID provided as part of the initial context when the add-in is instantiated) to its own backend, where it can be validated and used to look up a user in the add-in's native system.  If a user mapping exists, then the add-in can consider the user logged in, and immediately display content to the user.  If no user mapping exists, the add-in can prompt the user to login to the add-in's native system.  Once the user's identity in the native system is known, the add-in can persist the user mapping so that on subsequent loads the user doesn't have to log in again (even across devices).

Note that the user identity token is signed by the SKY API OAuth 2.0 service, but it cannot be used to make calls to the SKY API. It is purely used to convey the user's identity to the add-in.  In order to make SKY API calls, a proper SKY API access token must be obtained.

This flow is illustrated below:

<img style="border:none" src="/assets/img/add-in-sso.png" alt="Add-in SSO flow diagram" class="img-responsive" />

Add-ins can make the following request upon initialization to obtain a user identity token (typically handled within the `init` callback):

```js
var client = new AddinClient({...});
client.getAuthToken().then((token) => {
  var userIdentityToken = token;
  . . .
});
```

The following string represents a sample user identity token returned by the `getAuthToken` function:

<p style="padding: 0 20px; word-wrap: break-word">
eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjREVjZzVkxIM0FtU1JTbUZqMk04Wm5wWHU3WSJ9.eyJuYW1laWQiOiIxMjM0ZjVjNC1iOGRhLTQxYWQtYjAzMy1hMGU5ZWY3ZGI3OTkiLCJpc3MiOiJodHRwczovL29hdXRoMi5za3kuYmxhY2tiYXVkLmNvbS8iLCJhdWQiOiJiOWEwMmE0OS0wNGNiLTRiOWMtYTkwYy1kMjYyODcxYjU0N2QiLCJleHAiOjE1MjE1NzUxNTAsIm5iZiI6MTUyMTU3NDg1MH0.Cfy4VkLUyP_tvvo8UqswiYtOdQ3Tlj0CJLgoW-up4Ns9p4R4qKBv8kJJ8WPRTKFlVNTuBWdMrQ1I07oSuiQ
</p>

Here's a decoded version of the above user identity token:

```js
{
  "nameid": "1234f5c4-b8da-41ad-b033-a0e9ef7db799",
  "iss": "https://oauth2.sky.blackbaud.com/",
  "aud": "b9a02a49-04cb-4b9c-a90c-d262871b547d",
  "exp": 1521575150,
  "nbf": 1521574850
}
```

Notice that the `aud` claim indicates the intended audience (the SKY API application that owns the add-in), and the `nameid` claim contains the user's Blackbaud ID.

### Validating the user identity token

Before looking for a user mapping, add-in developers should first validate the signature of the UIT against the OpenIDConnect endpoint within SKY API OAuth 2.0 service.  This prevents certain types of attack vectors and provides a mechanism for the add-in to securely convey the Blackbaud user's identity to its own backend.  

The SKY API OpenIDConnect configuration can be found at:
 
 <a href="https://oauth2.sky.blackbaud.com/.well-known/openid-configuration" target="_new"><i class="fa fa-globe" aria-hidden="true"></i>    https://oauth2.sky.blackbaud.com/.well-known/openid-configuration</a>.

Developers building add-ins in .NET can make use of a Blackbaud-provided library to assist with validating the user identity token.  This library is distributed as a NuGet package named <a href="https://www.nuget.org/packages/Blackbaud.Addin.TokenAuthentication" target="_new"><i class="fa fa-globe" aria-hidden="true"></i> Blackbaud.Addin.TokenAuthentication</a>.

More information on how to use this library can be found in the readme.txt:

#### Sample 

The follow sample demonstrates code that validates the raw token value obtained from the host application using the Blackbaud.Addin.TokenAuthentication library:

```csharp
// this represents the user identity token returned from getAuthToken()
var rawToken = "(raw token value)";

// this is the ID of the developer's SKY API application
var applicationId = "(some application ID)";

// create and validate the user identity token
UserIdentityToken uit;
try
{
    uit = await UserIdentityToken.ParseAsync(rawToken, applicationId);

    // if valid, the UserId property contains the Blackbaud user's ID
    var userId = uit.UserId;
}
catch (TokenValidationException ex)
{
    // process the exception
}
```

Once the token has been validated, the add-in's backend will know the Blackbaud user ID and can determine if a user mapping exists for a user in the add-in's native system.  If a mapping exists, then the add-in's backend can immediately present the content for the add-in.  If no user mapping exists, the add-in can prompt the user to login.

### Correlating Blackbaud users with external systems

For proper correlation with external systems, it is important to understand how Blackbaud models our customer base.  The following list describes several concepts within the data model:

- Legal entity - We use the term `legal entity` to represent a top-level customer record in the system.  This could be a specific non-profit organization, an individual change agent, or even a Partner ISV.
- Environment - An `environment` is a logical grouping of products and services that are available to a `legal entity`.  You can think of an environment as a container of various Blackbaud products and services - it is the unifying construct that faciltiates the inter-communication between those products and services.  A legal entity will typically have at least one environment, but some legal entities may have multiple environments used to serve various purposes (like testing, staging, production, regional chapters, etc.).
- User - The term `user` refers to a specific Blackbaud ID user account.

Within this data model, a single Blackbaud user can have access to multiple environments, and can even have access to environments across multiple organizations.  Therefore, it is important to properly consider both `User` _and_ `Environment` when establishing a link with an external system.  At runtime, the environment ID will be provided as part of the `args` object, and your add-in can request a user identity token using the `getAuthToken` method of the `AddinClient` class.   

Note that details about the legal entity, environment, and user are returned as part of the `/token` endpoint response when obtaining SKY API access token.  For more information, see step 5 of the [Authorization Code Flow](/docs/authorization/auth-code-flow/#step-5--tokens-returned) documentation, and step 3 of the [Implicit Flow](/docs/authorization/implicit-flow/#step-3--access-token-provided) documentation.

<bb-alert bb-alert-type="warning">
<strong>Important!</strong> Be sure to properly account for these concepts when correlating data from your system.</bb-alert>