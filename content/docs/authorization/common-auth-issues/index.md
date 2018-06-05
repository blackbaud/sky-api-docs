---
layout: "layout-sidebar"
name: Common Authorization Issues
description: Common errors encountered when interacting with the OAuth endpoints.
order: 200
published: true
showInNav: true
back_to_top: true
title: Common Authorization Issues
---

{{ include stache.config.partial_header_comments }}{{ include stache.config.partial_header_edit }}

# {{ name }}

You may encounter one of the following common issues when initiating authorization, requesting access tokens, or calling the {{ stache.config.product_name_short }}.

## Initiating Authorization

Applications initiate the OAuth process by directing the user's browser to our [Authorization]({{ stache.config.authorization_endpoint }}) page with various parameters that identify the application and the type of authorization being requested.  

<p><bb-alert bb-alert-type="warning"><strong>Important!</strong> Pop up blockers may interfere with obtaining access tokens if the authorization page is launched in a separate window (as is done in the {{ stache.config.dev_console_name }}). Please enable pop ups when using the {{ stache.config.dev_console_name }} to obtain access tokens.</bb-alert></p>

### Invalid client_id 

The `client_id` parameter is required and used to identify the application requesting authorization.  If omitted, the following error will be shown:

![Invalid client_id](/assets/img/missing_client_id.png "Invalid client_id")

If an invalid `client_id` parameter is specified, the following error will be shown:

![Invalid client_id](/assets/img/invalid_client_id.png "Invalid client_id")

To resolve these issues, ensure that the authorization URL includes the `client_id` parameter, which is displayed in the **Application Credentials column** of the [My Applications]({{ stache.config.developer_app_management_url }}) page. **Application ID** is the unique identifier for your application, and should be specified as the `client_id` parameter when initiating the authorization process.

### Invalid redirect_uri

The `redirect_uri` parameter is required and used to confirm the application's identity and communicate where to send the browser after the user provides consent.  If omitted, the following error will be shown:

![Invalid redirect_uri](/assets/img/missing_redirect_uri.png "Invalid redirect_uri")

If an invalid or malformed `redirect_uri` parameter is specified, the following error will be shown:

![Invalid redirect_uri](/assets/img/malformed_redirect_uri.png "Invalid redirect_uri")

If the value provided for the `redirect_uri` parameter does not match one of the values provided when the application was registered, the following error will be shown:

![Invalid redirect_uri](/assets/img/invalid_redirect_uri.png "Invalid redirect_uri")

To resolve these issues, ensure that the value provided for the `redirect_uri` parameter is one of the whitelisted values that you specified when [registering your application]({{ stache.config.guide_registering_your_app }}).  The value must match _exactly_, including capitalization, terminating slashes, etc.

### Invalid response_type

The `response_type` parameter is required, and indicates the the type of authorization being requested by the application. The value must be set to `code` when using the [Authorization Code Flow]({{ stache.config.guide_web_api_authorization_auth_code_flow }}) or `token` when using the [Implicit Flow]({{ stache.config.guide_web_api_authorization_implicit_flow }}).

If the `response_type` parameter is omitted, the user's browser will be redirected to the specified `redirect_uri` location with an `error` query parameter of `invalid_request`.  If the value specified is invalid or unsupported, the `error` query parameter will be `unsupported_response_type`.

### User cannot access any SKY API enabled products

If the authenticated user cannot access any SKY API enabled Blackbaud products, the following error will be shown: 

![User cannot access any SKY API enabled products](/assets/img/auth_no_tenants.png "User cannot access any SKY API enabled products")

In order to provide consent for an application to access any Blackbaud data, the authenticating user must have access to a SKY API enabled Blackbaud product. This requirement allows {{ stache.config.product_name_short }} to respect and enforce the user's security permissions. If the user does not have access, they should contact the organization administrator and request an invitation.

### Application not approved

Before an application can request authorization and make calls to the SKY API, an organization administrator must approve the application.  If the application has not been approved, the following error will be shown:

![Application not approved](/assets/img/auth_application_not_activated.png "Application not approved")

Note that organization administrators can also remove an application when they no longer want it to have access to their Blackbaud data. For more information, see [Activate your application]({{ stache.config.guide_web_api_activate_application }}).

### User denied access

During the OAuth process, the user can choose to deny consent to the application.  When this happens, the user's browser will be redirected to the specified `redirect_uri` location with an `error` query parameter of `access_denied` and an `error_message` query parameter value of `The user chose not to give your app access to their Blackbaud data.`.

### Other parameters

Note that any query parameters not directly supported will be ignored during the OAuth process.  For more information on initiating the OAuth process, see [Authorization](/docs/authorization).

## Requesting Tokens

Applications using the [Authorization Code Flow]({{ stache.config.guide_web_api_authorization_auth_code_flow }}) will call the `/token` endpoint to exchange authorization codes for access tokens and to refresh access tokens when they expire.  Calls to the `/token` endpoint require authentication and a request body that describes the operation being performed.

Error responses from the `/token` endpoint match the shape defined by <a href="https://tools.ietf.org/html/rfc6749#section-5.2">Section 5.2</a> of the OAuth 2.0 spec, and will be returned as a JSON object containing `error` and `error_description` properties:

<pre><code class="language-http">{
    "error": "invalid_client",
    "error_description": "The specified credentials were not valid."
}</code></pre>

 ### invalid_client error
 
This error indicates that we were unable to retrieve and verify the application's credentials (application ID and secret) from either the authorization header or the request body. To resolve this, ensure that you are providing the application credentials as either base64-encoded values within the Authorization header (preferred), or as form-url-encoded values `client_id` and `client_secret` in the request body. 

<p>
<bb-alert bb-alert-type="info"><strong><em>Note:</em></strong> When specifying credentials using the `Authorization` header, the value must have the format: <code>Basic &lt;base64 encoded Application ID:Application secret&gt;</code>.  Make sure to include a space after the "Basic" prefix.</bb-alert>
</p>

After you register an application, the credentials are displayed in the **Application Credentials column** of the [My Applications]({{ stache.config.developer_app_management_url }}) page. **Application ID** is the unique identifier for your application, and should be specified as the `client_id` parameter value.  Use the **Application Secret** as the `client_secret` parameter value.

For more information, see step 4 of [Authorization Code Flow](/docs/authorization/auth-code-flow/#step-4-mdash-request-tokens) documentation.

Variations of this error condition can take the following forms:

- "The required credentials were not supplied."

- "The required client_id parameter was not provided."

- "The specified credentials were not valid."

- "The value specified for the client_id parameter 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXX' was not valid."

Ensure that the application's credentials were properly specified as either base64-encoded values within the Authorization header (preferred), or as form-url-encoded values `client_id` and `client_secret` in the request body. 

### invalid_redirect_uri error

> "The specified value for the redirect_uri parameter 'xxxxxxx' did not match any pre-registered values."

The value provided for the `redirect_uri` field in the request body must be one of the whitelisted values that you specified when [registering your application]({{ stache.config.guide_registering_your_app }}).  The value must match _exactly_, including capitalization, terminating slashes, etc.

Note that within the `/token` endpoint this value is only used for validation purposes (no redirect actually happens).  The value must _exactly_ match the value of the `redirect_uri` parameter that was specified when originally requesting the authorization code.

### unsupported_grant_type error

> "unsupported_grant_type" error

When requesting an access token from the `/token` endpoint, you must pass an appropriate value for the `grant_type` request body parameter as per the OAuth 2.0 specification.  When initially exchanging an authorization code for an access token, the value specified should be `authorization_code`.  When refreshing an access token, the value specified should be `refresh_token`.  Check the spelling of the `grant_type` parameter name, and ensure that the value provided is supported. 

### invalid_grant error

> "invalid_grant" error

This error can be returned for a variety of reasons when requesting an access token.

For example, when [exchanging an authorization code](/docs/authorization/auth-code-flow/#step-4--request-tokens) for an access token, you will see this error when providing an invalid, expired, or previously used authorization code. In this case, you must restart the authorization process and obtain a new authorization code from the `/authorization` page. The authorization codes expire in a short period of time (currently, {{ stache.config.auth_token_expiration_minutes }}) and are not reusable. Your application should exchange them for access tokens promptly.

A `redirect_uri` that does not match the one used when making the [initial authorization](/docs/authorization/auth-code-flow/#step-1--request-authorization) request can also cause this error. To resolve this, use the same `redirect_uri` in both operations.

You may also see this when you [refresh an access token](/docs/authorization/auth-code-flow/#step-7--refresh-access-token) if you provide an expired, revoked, or otherwise invalid refresh token.

## Calling the {{ stache.config.product_name_short }}

### invalid subscription key

> "Access denied due to invalid subscription key. Make sure to provide a valid key for an active subscription."

When making calls to the SKY API, be sure to provide either your primary or secondary subscription key with the request.

The subscription key represents a subscription to a specific {{ stache.config.api_type_name }} product and is associated with your developer account. To get a subscription key, you'll need to sign up for a Blackbaud developer account and get an approved subscription. Once you have an approved subscription, you can view the subscription keys within your <a href="{{ stache.config.portal_profile }}" target= "_blank">profile</a>.  The subscription key value is passed with each request to the {{ stache.config.api_type_name }} via the  `bb-api-subscription-key` request header. See <a href="{{ stache.config.guide_getting_started }}" target="_blank">Getting Started</a> for instructions on how to obtain a subscription key and an example of using the subscription key in a call to the API.

### missing/invalid authorization header

> "The required Authorization header was missing or invalid, or the token has expired"

#### Missing Token

When making calls to the API, you need to provide an access token obtained using OAuth 2.0. The access token allows you to make requests to the {{ stache.config.product_name_short }} on a behalf of a user. When calling the API, be sure to supply the `Authorization` request header with a value of `Bearer`, followed by a space and the `access_token` value.

It's a common mistake to forget to prepend the `access_token` value with `Bearer `.  Be sure to include a space between `Bearer ` and the `access_token` value.

##### Sample request:

<pre><code class="language-http">GET {{ stache.config.resource_url }}/constituents/280 HTTP/1.1
Host: {{ stache.config.resource_hostname }}
Authorization: Bearer eyJ0eXAiOiJKV1...CTtP0CQ
bb-api-subscription-key: 77f137116...480d633
</code></pre>

#### Expired Token

The access token expires in {{ stache.config.access_token_expiration_minutes }}.  With the [Authorization Code Flow]({{ stache.config.guide_web_api_authorization_auth_code_flow }}), each time you refresh your tokens, you'll get a new access and refresh token.  

Refresh tokens will also expire, but after a much longer period of time (currently, {{ stache.config.refresh_token_expiration_days }}). Using a sliding window, each time you exchange your refresh token for a new access token, we will issue a new refresh token as well. As long as your application connects to the {{ stache.config.product_name_short }} at least once within the window, you will be able to continue to access the Blackbaud customer's data indefinitely (or until they deactivate your application).

If your access token _and_ refresh token have expired, the user will have to re-authenticate and consent.

{{ include stache.config.partial_disqus }}
