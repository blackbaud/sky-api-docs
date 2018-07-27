---
layout: layout-sidebar
name: Connecting to SKY API
order: 50
published: true
showInNav: true
back_to_top: true
title: Connecting to SKY API
---
{{ include stache.config.partial_header_edit }}

# {{ name }}

In some cases, the contextual information made available to your add-in at runtime (the user's ID, the environment ID, and the current extension point context object) may be sufficient for your needs. Your add-in can surface contextual information from your system based on those runtimes values.

In other cases however, your add-in may need to make calls to SKY API in order to function properly.  To call the SKY API, your add-in will need a SKY API access token - this requirement is in place to ensure proper security and handling of customer data.  If your web application already has an access token for the current user and environment (context values provided at runtime), then you can use it to make calls to the SKY API (refreshing the token if needed).  If not, you have some options for how your add-in can obtain a SKY API access token.  

### Degrade your add-in's user interface

You might choose to degrade your add-in's user experience if your application has not acquired a SKY API access token for the current user and environment.  You can simply provide a link to your web application within your add-in's user interface, and when the user navigates to your web application you can present a "Connect to SKY API" button and initiate the OAuth process.

### Prompt to connect to SKY API

Alternately, you might choose to have your add-in initiate the OAuth process by surfacing a "Connect to SKY API" button in the add-in's user interface.  

Choose the OAuth flow that is most applicable for your scenario - the [Authorization Code Flow]({{ stache.config.guide_web_api_authorization_auth_code_flow }}) is intended for server-to-server communication and results in an access token that can be refreshed once it has expred.  The [Implicit Flow]({{ stache.config.guide_web_api_authorization_implicit_flow }}) is intended for SKY API calls from the client, and access tokens obtained from this flow are not refresh-able once expired.

While more complex, we recommend using the Authorization Code flow because of the more secure handling of your application's "secret", and the ability to refresh the access token once it has expired.  In any case, obtaining a SKY API access token for the current user and environment can be a one-time user-interactive operation that mimics functionality available in your full-blown web site.

### Initiate OAuth

To properly initiate the SKY API OAuth process, your add-in should expect to include a `state` parameter that will be used to prevent against cross-site request forgery (CSRF) attacks.  As discussed in the [FAQ]({{ stache.config.support_faq }}), this value will be echoed back to your application's redirect endpoint when the user provides consent, and your application should expect to validate that the value echoed originated from your system.

The following code sample shows a very basic technique of acquiring a SKY API access token - this code executes on the client, and works by showing a popup window that navigates to a `/skyapi/authorize` page within the add-in's web application.  Within this endpoint (server code not shown), a `state` parameter value is generated, and the response can return a 302 Redirect to the [SKY API Authorization]({{ stache.config.authorization_endpoint }}) page (including the `state` parameter). 

The popup window will follow the redirect, and the user will be able to provide consent for your application.  Upon consent, the browser will be redirected again - this time to your application's registered redirect URI. The response from this endpoint in your web application can include some script that closes the popup browser window:

```js
function connectToSkyApi() {
 
    // this code starts within the user interface of the add-in - it launches a popup 
    // and navigates to an endpoint in the add-in's backend to properly establish a 
    // state parameter and initiate the SKY API OAuth process.  
    var url = "/skyapi/authorize" +
      "?token=" + userIdentityToken +
      "&envid=" + initialArgs.envId;
 
    var child = window.open(url, '_blank', 'toolbar=0,status=0,width=625,height=500');
    var timer = setInterval(checkChild, 500);
 
    // when the user has provided consent, your application's redirect URI endpoint
    // can include script that will
    // close the browser window.
    function checkChild() {
      if (child.closed) {
        clearInterval(timer);
 
        // if the user provided consent, the add-in's backend will have an access token for the user
      }
    }
  }
```

Note that the user identity token is provided as well, so that your add-in's backend can ensure that it is being called from your front-end code.

### Limit the scope of consent to the current environment

As mentioned in the <a href="/docs/addins/concepts/addin-sso#correlating-blackbaud-users-with-external-systems">Add-in single-sign-on</a> documentation, a given Blackbaud user may have access to multiple _environments_, even spanning multiple organizations.

When building the redirect to the SKY API Authorization page, you'll want to limit the scope of the user's consent to the "current" environment, which is made available at runtime via the `args` object provided to the `init` callback.  The SKY API Authorization page supports an optional query parameter named `environment_id` that can be used to limit the scope of consent to the current environment.  This query parameter simply provides a hint to the Authorization page to filter the list of eligble environments to the current environment.

To make use of this, when your add-in's web application builds the redirect to the SKY API Authorization page, be sure to include the `environment_id` parameter:

<pre><code class="language-http">{{ stache.config.authorization_endpoint }}?
response_type=code
&client_id=YOURCLIENTID
&redirect_uri=YOURREDIRECTURI
&state=YOURSTATEVALUE
&environment_id=YOURENVIRONMENTID</code></pre>

<bb-alert bb-alert-type="warning">
<strong>Important!</strong> If you omit this parameter, all environments accessible by the user will appear on the consent page which could result in the user choosing a different environment from the current one.</bb-alert>

### Protection against clickjacking

To protect against <a href="https://www.owasp.org/index.php/Clickjacking">clickjacking</a> attacks, the SKY API Authorization page will be updated to prevent being rendered within an iframe.  This means your add-in will not be able to initiate the OAuth process within its own iframe.  You'll need initiate the OAuth process by launching a separate browser window as shown above.

For more information on initiating the OAuth process, see [Authorization](/docs/authorization).