---
layout: layout-sidebar
order: 300
name: FAQ
description: A listing of frequently asked questions and answers.
icon: fa fa-comment-o fa-4x
published: true
showInNav: true
back_to_top: true
title: FAQs
---

{{ include stache.config.partial_header_comments }}{{ include stache.config.partial_header_edit }}

# Frequently Asked Questions

Learn the answers to commonly asked questions, recommended patterns, and best practices for the {{ stache.config.api_type_name }}.

## Basics

### How do I get started?

The <a href="{{ stache.config.guide_getting_started }}">Getting Started guide</a> and [Authorization Code Flow tutorial]({{ stache.config.guide_web_api_authorization_auth_code_flow_tutorial }}) demonstrate basic implementations of SKY API using easy-to-follow setup instructions.

### Do you have any code samples?

See [Code Samples]({{ stache.config.guide_code }}). Our [Endpoint Reference]({{ stache.config.portal_endpoints }}) contains code samples in multiple languages.

### I am seeing an issue, where can I get support?

See our <a href="{{ stache.config.support_issues }}">Issues</a> page for any existing issues. If you find a new issue, please [contact us]({{ stache.config.support_need_help_url }}).

## Authorization

### How do I pass security credentials from my application to the {{ stache.config.api_type_name }}?

To call the {{ stache.config.api_type_name }}, your application will need to provide two things:
1. Your developer subscription key - this key represents Blackbaud's permission for you to call the API, and it should be sent as part of the `bb-api-subscription-key` request header.

2. An access token - this represents a Blackbaud customer's permission for you to access their data, and it should be sent as part of the `authorization` request header.  This token is associated with the authenticated user's account and organization, and can only be used to access data to which the user has permission.

For more information, see <a href="{{ stache.config.guide }}basics#request-headers">request headers</a>.

### What is the recommended authorization flow for a browser-based app?

In applications where you cannot maintain the confidentiality of their **{{ stache.config.guide_apps_client_secret_name }}**, the most appropriate OAuth flow to use in this case is the [Implicit Flow]({{ stache.config.guide_web_api_authorization_implicit_flow }}).

Browser-based (javascript) apps run entirely in the browser after loading the source code from a web page. Since the entire source code is available to the browser, they cannot maintain the confidentiality of their **{{ stache.config.guide_apps_client_secret_name }}**, so the secret is not used in this case.

See <a href="{{ stache.config.guide_web_api_authorization }}">Authorization</a> to learn about the OAuth flows that are supported.

### What is the recommended authorization flow for a native applications?

Like browser-based apps, the most appropriate flow to use for a native applications (desktop and mobile devices) is the [Implicit Flow]({{ stache.config.guide_web_api_authorization_implicit_flow }}).

See <a href="{{ stache.config.guide_web_api_authorization }}">Authorization</a> to learn about the OAuth flows that are supported.

### I want to create a script that adds new constituents to my database every day. Is there a way I can do this without having to open the browser and log in? (My username and password would preferably be set in the script.)

The {{ stache.config.api_type_name }} doesn’t support basic authorization through username/password. Instead, obtain an access token through the [Authorization Code Flow]({{ stache.config.guide_web_api_authorization_auth_code_flow }}).

### When should my application initiate authorization?

Authorization begins when your application redirects the user's browser to our `{{ stache.config.authorization_endpoint }}` Authorization endpoint.  Exactly when you decide to make this request is up to you. You can request authorization when your application gathers initial information from the user, or when the user first attempts to access some data from the {{ stache.config.api_type_name }}.

See [Authorization]({{ stache.config.guide_web_api_authorization }}).

### When I register my app, can I use `localhost` in my redirect URIs?

Yes.  We allow you to register multiple redirect URIs with your application.  For production, we require `https`, but to facilitate local development we allow `http` and the use of `localhost` or the localhost IP (`127.0.0.1`).

See [Register your application]({{ stache.config.guide_registering_your_app }}#register-your-app) and the [Auth Code Flow tutorial]({{ stache.config.guide_web_api_authorization_auth_code_flow_tutorial }}).

### After redirection occurs, how can I track where authorization initiated?

After the user grants (or denies) access to your application, we'll redirect the browser to the URI that you passed to us when you initiated the <a href="{{ stache.config.guide_web_api_authorization }}">authorization process</a> (this URI must exactly match one of the values you <a href="{{ stache.config.guide_registering_your_app }}#register-your-app">registered</a> with your application).

We also support the OAuth 2.0 `state` parameter (described in <a href="https://tools.ietf.org/html/rfc6749#section-4.1.1">Section 4.1.1</a> of the OAuth 2.0 spec), which allows you to provide some context to us that we will echo back to your redirect URI after the user grants (or denies) access to your application.  We recommend that you use an _opaque_ value and verify that it matches the value you provided when your app initiated authorization.  In this way, you can prevent [cross-site request forgeries](https://tools.ietf.org/html/rfc6749#section-10.12) as well as track where your application initiated the authorization flow.  You can then further redirect the user's browser to the appropriate area within your application upon consent.

See [Authorization]({{ stache.config.guide_web_api_authorization }}).

### When must my application re-authenticate the user?

If both your access token _and_ refresh token have expired, then you'll need to send the user back through the interactive authorization process.  If your access token has expired but you have a valid refresh token, then you can simply exchange the refresh token for a new access token (and a new refresh token) non-interactively.

See [Authorization]({{ stache.config.guide_web_api_authorization }}).

## CORS

### Do you support cross-origin resource sharing to allow you to interact securely with our API from within the browser?

Yes, we've enabled <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">CORS</a> support in the  {{ stache.config.api_type_name }}.  We allow all origins (*), support the <code>GET</code>, <code>PUT</code>, <code>POST</code>, <code>PATCH</code>, and <code>DELETE</code> methods, and allow <code>bb-api-subscription-key</code>, <code>authorization</code>, <code>accept</code>, and <code>content-type</code> request headers.

## Tokens

### When do my tokens expire?

During the initial user-interactive authorization process, the authorization code sent to your application will expire in 5 minutes, which means you have a very short window of time in which to exchange the authorization code for an access token.

Access tokens will expire in {{ stache.config.access_token_expiration_minutes }}, after which you can use the refresh token to obtain a new access token (and a new refresh token).  For the Authorization Code Flow, refreshing an access token does not involve any user interaction, so your application can have indefinite connectivity to the {{ stache.config.api_type_name }} once the user provides consent. 

Refresh tokens are longer-lived values that will eventually expire in {{ stache.config.refresh_token_expiration_days }}, using a sliding window model. As long as your application connects at least once to the {{ stache.config.api_type_name }} within the window, it will be able to retain connectivity to the customer's data.

See <a href="{{ stache.config.guide_web_api_authorization }}#token-expiration">Token Expiration</a>.

### May I store access tokens in my application's database?

Yes, you may store access tokens and refresh tokens within your app, associated with your app's concept of a user (if applicable).  When the user logs in with your application's credentials, you can check to see if you have an access token for that user and adjust your app's experience accordingly.  For example, you may immediately route the user through the authorization process in order to obtain an access token, or disable functionality until the user provides consent.

If your application doesn't have the notion of user credentials, you can simply direct the user to log in with their Blackbaud credentials when they log into your application.  We'll provide you with the user's access token and expiration details as part of the Token response during the <a href="{{ stache.config.guide_web_api_authorization_auth_code_flow }}">authorization code flow</a>.

In any case, be sure to store access tokens and refresh tokens securely in your system so that they aren't exposed to the public.

## Subscription keys

### What is the purpose of the subscription key?

The subscription key is associated with your developer account and must be provided as part of the `bb-api-subscription-key` header when calling the {{ stache.config.api_type_name }}.  It represents our permission for you to call the API, and we also use it to enforce usage limits (see <a href="{{ stache.config.guide_basics }}#rate-limits">Rate limits</a> and <a href="{{ stache.config.guide_basics }}#quotas">Quotas</a>) to ensure that the API performs well for everyone.  We also aggregate API call analytics associated with your subscription to show you how your apps are performing within the <a href="{{ stache.config.portal_analytics }}">Analytics</a> area of the portal.

See <a href="{{ stache.config.guide_basics }}#subscription">Subscription</a>.

###  Why do I have two subscription keys?

When you obtain a subscription to the {{ stache.config.api_type_name }}, we'll provide two keys (**primary** and **secondary**) that you can use when calling the API.  Both keys are equally functional; we provide two keys to support rotation on your end.

We don't require you to rotate your subscription keys, and you can adopt whatever key rotation schedule and strategy that best fits your needs.  If you do need to regenerate your subscription keys, you can do so from your <a href="{{ stache.config.portal_profile }}">profile</a>.

<p><bb-alert bb-alert-type="warning"><strong><em>Important!&nbsp;</em></strong> Subscription keys are associated with your developer account, and should **NOT** be shared with the public since it would allow someone else to impersonate you when calling the {{ stache.config.api_type_name }}!</bb-alert></p>

## My app

### How do I register my application and get an OAuth 2.0 ID and secret?

You can register your app in the <a href="{{ stache.config.developer_app_management_url }}">My Applications</a> area to obtain the unique ID and secret, which will be used during the <a href="{{ stache.config.guide_web_api_authorization }}">authorization process</a> to obtain an access token to call the API.

See <a href="{{ stache.config.guide_registering_your_app }}">Managing your apps</a>.

### My application secret may have been compromised, what should I do?

If you believe your application's secret has been exposed, you should [regenerate the secret]({{ stache.config.guide_registering_your_app }}#regenerate-your-secret) and update your application to use the new value when calling the {{ stache.config.api_type_name }}.

### What control does a Blackbaud customer have over my application?

Customers always have control over whether or not an application can access their data.  An administrator within the customer's organization must first enable your app before any user will be able to use it, and at any time the administrator can remove your application.  If that happens, the application will not be able to obtain or refresh any access tokens to use when calling the API.

If your application is removed, users will see the following message in the authorization process:

> “This application has not been approved by your administrator…”

See <a href="{{ stache.config.guide_web_api_authorization }}">Authorization</a>.

## Scopes

### What scopes do you support and how do I pass them in my authorization request?

OAuth 2.0 Scopes are not yet supported within the {{ stache.config.api_type_name }}. In the future, applications may be able to express intent via scopes but for now API access is always within the context of an authenticated user, which means that API access is limited to the user's security permissions.

{{ include stache.config.partial_disqus }}
