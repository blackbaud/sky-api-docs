---
layout: "layout-sidebar"
name: Authorization
description: Description
order: 300
published: true
showInNav: true
showInHeader: true
showInFooter: true
priority: high
title: Authorization
---

{{ include stache.config.partial_header_comments }}{{ include stache.config.partial_header_edit }}

# Authorization

{{ stache.config.api_type_name }} uses the <a href="http://oauth.net/2/">OAuth 2.0</a> protocol to authorize API requests.  This provides a mechanism for your application to access Blackbaud customer data without exposing any user credentials (username/password) to your application. Instead, users must provide consent to your application to access data on their behalf.

{{ stache.config.api_type_name }} OAuth 2.0 endpoints:

<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Endpoint</th>
        <th>URL</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Authorization</td>
        <td><code class="language-http">{{ stache.config.authorization_endpoint }}</code></td>
      </tr>
      <tr>
        <td>Token</td>
        <td><code class="language-http">{{ stache.config.token_endpoint }}</code></td>
      </tr>
    </tbody>
  </table>
</div>

In order to call the {{ stache.config.api_type_name }}, you must first [register your application]({{ stache.config.guide_registering_your_app }}) within the <a href="{{ stache.config.developer_app_management_url }}" target= "_blank">My Applications</a> area of the developer portal. This registration provides your application with a unique set of credentials to use when asking a user for consent.

Before your application can access a given Blackbaud customer's data, it must first be approved by an administrator within the customer's organization.  The administrator provides this approval by activating your application within the <b>Applications</b> area of the product.  This allows Blackbaud customers to control which applications have access to their data, and at any time an administrator can de-activate your application and prevent future access via the API.

Once your application has been activated, you can then obtain consent from an authenticated Blackbaud user.  Upon consent, an OAuth 2.0 access token will be issued to your application in the form of a JSON web token, or <a href="https://jwt.io">JWT</a>.  The token should be included on every API request as part of the standard <code>Authorization</code> header.  It is tied to the authenticated user's account and organization, which means that _your application can only access data to which the authenticated user can access_ within the system.

## Supported OAuth 2.0 flows

The {{ stache.config.api_type_name }} supports the following grant types:

- <a href="{{ stache.config.guide_web_api_authorization_auth_code_flow }}" target= "_self">Authorization Code Flow</a> (aka the Web Server flow). This flow is meant for web applications where API calls are made from the server.  It is the most secure as it involves server-to-server communication, and is also the most functional as it also provides refresh tokens.  This allows your application to have indefinite connectivity to the {{ stache.config.api_type_name }} after the one-time user-interactive consent process.

- <a href="{{ stache.config.guide_web_api_authorization_implicit_flow }}" target= "_self">Implicit Flow</a>.  This flow is meant for client-side applications, such as browser-based, native, and mobile applications.  Since API calls are made from the client, they are inherently less secure and do not involve the exchange of an application secret.  The access tokens that are issued are short-lived and no refresh tokens are provided, so the user must re-authorize your application when the token expires.

## User experience

The <a href="{{ stache.config.guide_web_api_authorization_auth_code_flow }}" target= "_self">Authorization Code Flow</a> starts by redirecting the user's browser from your application to our Authorization URL.  The user will login (using their Blackbaud or Google credentials), confirm that it's OK for your application to access their data, and then we'll redirect back to you with a authorization code that you can exchange for an access token.  You can store this access token (and the refresh token) in your application, and use it when making API calls on that user's behalf.

The <a href="{{ stache.config.guide_web_api_authorization_implicit_flow }}" target= "_self">Implicit Flow</a> starts by redirecting the user's browser from your application to our Authorization URL.  The user will login (using their Blackbaud or Google credentials), confirm that it's OK for your application to access their data, and then we'll redirect back to you with an access token that you can use when making API calls on that user's behalf.

## Token expiration

As a security best-practice, access tokens will expire after a period of time (currently, {{ stache.config.access_token_expiration_minutes }}).  When this happens, your application should exchange the refresh token it received with the original access token for a new access token in order to make additional API calls.  The refresh token exchange happens on the server and does not involve any interaction with the user.

If your access token was obtained using the <a href="{{ stache.config.guide_web_api_authorization_implicit_flow }}" target= "_self">Implicit Flow</a>, you won't have a refresh token and you'll need the user to re-authorize your application before making additional API calls.

**Note:** Refresh tokens will also expire, but after a much longer period of time (currently, {{ stache.config.refresh_token_expiration_days }}).  Using a sliding window, each time you exchange your refresh token for a new access token, we will issue a new refresh token as well.  As long as your application connects to the {{ stache.config.api_type_name }} at least once within the window, you will be able to continue accessing the Blackbaud customer's data indefinitely (or until they deactivate your application).

## Scopes

OAuth 2.0 Scopes are not yet supported within {{ stache.config.api_type_name }}. In the future, applications may be able to express intent via scopes but for now API access is always within the context of an authenticated user, which means that API access respects the user's security permissions defined within the product.

{{ include stache.config.partial_disqus }}