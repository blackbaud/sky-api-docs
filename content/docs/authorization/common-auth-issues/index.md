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

{{ include stache.config.partial_header_edit }}

# {{ name }}

You may encounter one of the following common issues when initiating authorization and calling the {{ stache.config.product_name_short }}.

## Request authorization

### Invalid client_id 

![Invalid client_id](/assets/img/invalid_client_id.png "Invalid client_id")

After you register an application, its credentials are created and displayed in the **Application** **Credentials column** of the [My Applications]({{ stache.config.developer_app_management_url }}) page. **Application ID** is the unique identifier for your application. Use this value for the `client_id` parameter value.

### Invalid redirect_uri

![Invalid redirect_uri](/assets/img/invalid_redirect_uri.png "Invalid redirect_uri")

This URI needs to be in the Redirect URI whitelist that you specify when you [register your application]({{ stache.config.guide_registering_your_app }}). The value must match exactly, including capitalization, terminating slashes, etc.

### Invalid response_type

When initiating authorization with the `\authorization` endpoint, you must pass an appropriate value for the `response_type` request body parameter as per the OAuth 2 specification. The value must be set to `code` when using [Authorization Code Flow]({{ stache.config.guide_web_api_authorization_auth_code_flow }}) and `token` when using [Implicit Flow]({{ stache.config.guide_web_api_authorization_implicit_flow }}).

### User has no tenants

![User has no tenants](/assets/img/auth_no_tenants.png "User has no tenants")

To authorize access to a user’s Blackbaud data, the user must have access to web view for Raiser’s Edge NXT or Financial Edge NXT. This requirement allows {{ stache.config.product_name_short }} to respect the security rights of the authorized Blackbaud product user. To become a web view user, contact your organization administrator and request an invitation.

### Application not activated

![Application not activated](/assets/img/auth_application_not_activated.png "Application not activated")

Before an application can request authorization and make API calls to a Blackbaud product, an organization administrator must add the application to the tenant. Administrators can also remove an application when they no longer want the application to have access to their Blackbaud product. For more information, see [Activate your application]({{ stache.config.guide_web_api_activate_application }}).

## Request tokens

### invalid_redirect_uri error

> "The specified value for the `redirect_uri` parameter did not match any pre-registered values."

This URI needs to be in the Redirect URI whitelist that you specify when you [register your application]({{ stache.config.guide_registering_your_app }}).  The value must match _exactly_ including capitalization, terminating slashes, etc.

For the Authorization Code Flow, when requesting an access token from the `\token` endpoint, you must pass your registered application's `redirect_uri` for validation purposes.  The value of this parameter must exactly match the value of `redirect_uri` supplied when requesting the authorization code.

### unsupported_grant_type error

> "unsupported_grant_type" error

When requesting an access token from the `\token` endpoint, you must pass an appropriate value for the `grant_type` request body parameter as per the OAuth 2 specification.  Check the spelling of the `grant_type` value.

### invalid_client error

> "invalid_client" error - The value specified for the `client_id` parameter 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXX' was not valid."

After you register an application, its credentials are created and displayed in the **Application Credentials** column of the <a href="{{ stache.config.developer_app_management_url }}" target= "_blank">My Applications</a> page. **{{ stache.config.guide_apps_client_id_name }}** is the unique identifier for your application.  Use this value for the `client_id` parameter value.

### invalid_grant error

> "invalid_grant" error
This error is caused by an invalid value in your request to the /token endpoint. For example, this error will be seen when providing an invalid, expired, or previously-used authorization code, In this case, you must restart the authorization process and obtain a fresh authorization code from the /authorization endpoint. Note that authorization codes expire in 5 minutes, and are not reusable. Be sure to exchange it for an access token quickly.

This error can also been seen when the redirect_uri provided to the /token endpoint does not match the one used when making the initial authorization request, To resolve this, use the same redirect_uri in both operations.
 
## Call the {{ stache.config.product_name_short }}

### invalid subscription key

> "Access denied due to invalid subscription key. Make sure to provide a valid key for an active subscription."

Be sure to provide either your primary or secondary subscription key for an active API subscription.

The subscription key represents a subscription to a specific {{ stache.config.api_type_name }} product and is associated with your developer account. To get an subscription key, you'll need to sign up for a Blackbaud developer account and an approved subscription. Once you have an approved subscription, you can view your subscription keys within your <a href="{{ stache.config.portal_profile }}" target= "_blank">profile</a>.  The subscription key value is passed with each request to the {{ stache.config.api_type_name }} via the  `bb-api-subscription-key` request header. See <a href="{{ stache.config.guide_getting_started }}" target="_blank">Getting Started</a> for instructions on how to obtain a subscription key and an example of using the subscription key in a call to the API.

### missing/invalid authorization header

> "The required Authorization header was missing or invalid, or the token has expired"

#### Missing Token

When making calls to the API, you need to provide an access token obtained using OAuth 2.0. The access token allows you to make requests to the {{ stache.config.product_name_short }} on a behalf of a user. When calling the API, be sure to supply the `Authorization` request header with a value of `Bearer`, followed by a space and the `access_token` value.

It's a common mistake to forget to prepend the `access_token` value with `Bearer `.  Be sure to include a space between `Bearer ` and the `access_token` value.

##### Sample request:

<pre><code class="language-http">GET {{ stache.config.resource_url }}/constituents/280 HTTP/1.1
Host: {{ stache.config.resource_hostname }}
Authorization: Bearer eyJ0eXAiOiJKV1...CTtP0CQ
Cache-Control: no-cache
bb-api-subscription-key: 77f137116...480d633
</code></pre>

#### Expired Token

The access token expires in {{ stache.config.access_token_expiration_minutes }} minutes.  With the [Authorization Code Flow]({{ stache.config.guide_web_api_authorization_auth_code_flow }}), each time you refresh your tokens, you'll get a new access and refresh token.  As of now, refresh tokens do _not_ expire.  However, we are planning on revisiting this in the future.  You can expect some type of sliding window for refresh token expiration. So, as long as your application connects at least once within that window, you won't have to re-authenticate with the client.

If your access token _and_ refresh token have expired, the user will have to re-authenticate and consent.

