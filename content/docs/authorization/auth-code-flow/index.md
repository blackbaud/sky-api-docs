---
layout: layout-sidebar
name: Authorization Code Flow
description: The Authorization Code Flow is appropriate for applications that the user logs into once. Since this flow involves an exchange of your **Application secret* for an access token, it is suitable for applications than run from secure locations such as server-side web application or back-end service.
order: 100
published: true
showInNav: true
back_to_top: true
---


# Authorization Code Flow

The <a href="https://tools.ietf.org/html/rfc6749#section-1.3.1" target="_blank">authorization code grant</a> is meant for web applications where API calls are made from the server. It is the most secure as it involves server-to-server communication, and is also the most functional as it also provides refresh tokens. This allows your application to have indefinite connectivity to the {{ stache.config.api_type_name }} after the one-time user-interactive consent process.

The flow starts by redirecting the user's browser from your application to our Authorization URL. The user will login (using their Blackbaud or Google credentials), confirm that it's OK for your application to access their data, and then we'll redirect back to you with an authorization code that you can exchange for an access token. You can store this access token (and the refresh token) in your application, and use it when making API calls on that user's behalf.

Since this is a redirection-based flow, your application must be able to interact with a web browser and receive incoming requests (via redirection) from our OAuth endpoints.

We demonstrate this flow in our [tutorials]({{ stache.config.guide_web_api_authorization_auth_code_flow_tutorial_home }}) and [code samples]({{ stache.config.guide_code }}).

![Authorization Code Flow](/assets/img/AuthCodeFlow.png "Authorization Code Flow")

## Step 1 &mdash; Request authorization

Initiate the authorization process by redirecting the user's browser to our <b>authorization</b> endpoint.  You can choose to do this as a step in your application's login process or in response to some user action in your app (like a button click):

<pre><code class="language-http">{{ stache.config.authorization_endpoint }}</code></pre>

When navigating, you'll need to include a few parameters in the query string. These parameters are fully described in <a href="https://tools.ietf.org/html/rfc6749#section-4.1.1" target="_blank">RFC-6749 section 4.1.1</a>:

<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Query parameter</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>client_id</td>
        <td>
          <em>Required</em>. The **{{ stache.config.guide_apps_client_id_name }}** value that we provide when you [register your application]({{ stache.config.guide_registering_your_app }}). This value uniquely identifies your application. See <a href="https://tools.ietf.org/html/rfc6749#section-2.2" target="_blank">RFC-6749 section 2.2</a>.
        </td>
      </tr>
      <tr>
        <td>response_type</td>
        <td><em>Required</em>. The value must be set to <code>code</code>.</td>
      </tr>
      <tr>
        <td>redirect_uri</td>
        <td>
          <em>Required</em>. The URI to redirect to after the user grants or denies permission to your app. This value must exactly match one of the Redirect URI values you specify when you [register your application]({{ stache.config.guide_registering_your_app }}), including any capitalization, trailing slashes, etc. See <a href="https://tools.ietf.org/html/rfc6749#section-3.1.2" target="_blank">RFC-6749 section 3.1.2</a>.
        </td>
      </tr>
      <tr>
        <td>state</td>
        <td class="column-2">
          <em>Optional, but recommended</em>. The <code>state</code> parameter is an opaque value that you can provide when requesting authorization that will be echoed back to you when the user grants or denies permission to your app.  You can then validate this parameter to ensure that an incoming redirect is the result of an authentication request that originated in your application.  This provides protection against Cross-Site Request Forgery (CSRF) attacks.

          You can also use this parameter to maintain some state between the authorization request you initiate and the incoming navigation to your redirect URI for the purposes of returning the user to tbe most appropriate location within your app.

          See <a href="https://tools.ietf.org/html/rfc6749#section-10.12" target="_blank">RFC-6749 section 10.12</a>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<p class="alert alert-warning"><b>Note: </b>to facilitate local development, we allow the use of _http_ and _localhost_ or the localhost IP (_127.0.0.1_).  In production however, we require the use of _https_ for proper security when redirecting.</p>

A sample authorization request looks like this (with extra line breaks for display purposes only):

<pre><code class="language-http">{{ stache.config.authorization_endpoint }}?
client_id=E140BF29-A528-4048-91A9-83BCB01B7FE2
&response_type=code
&redirect_uri=https://www.example.com/oauth2/callback
&state=fdf80155</code></pre>

## Step 2 &mdash; User authorizes your app

In this step, we'll ask the user to log in (using their Blackbaud or Google credentials).  We'll then ask them if it's ok for your application to access their Blackbaud data:

![Authorization Consent Form](/assets/img/getting_started_step4_popup.png "Authorization Consent Form")

If the user has access to more than one customer's data, they'll select the customer (tenant) to which they are giving your app permission.

## Step 3 &mdash; User is redirected back

After the user grants (or denies) your authorization request, we'll redirect the browser to the `redirect_uri` that you specified in the request (in the above example, we'll redirect the browser back to your application at _https://www.example.com/oauth2/callback_).

If the user granted your app permission, the query string will contain the following parameters:

<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Query parameter</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>code</td>
        <td>An authorization code that can be exchanged for an access token.</td>
      </tr>
      <tr>
        <td>state</td>
        <td class="column-2">The value of the <code>state</code> parameter you supplied in the initial authorization request.</td>
      </tr>
    </tbody>
  </table>
</div>

For example (with extra line breaks for display purposes only):

<pre><code class="language-http">https://www.example.com/oauth2/callback?
code=3BB723FF-74C9-4AED-B4F6-7E8A192CBA21
&state=fdf80155</code></pre>

If the user denied your permission request, the query string will contain the following parameters:

<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Query parameter</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>error</td>
        <td>The reason that authorization failed (for example, `access_denied`).</td>
      </tr>
      <tr>
        <td>state</td>
        <td class="column-2">The value of the <code>state</code> parameter you supplied in the initial authorization request.</td>
      </tr>
    </tbody>
  </table>
</div>

For example (with extra line breaks for display purposes only):

<pre><code class="language-http">https://www.example.com/oauth2/callback?
error=access_denied
&state=fdf80155</code></pre>

For more information on commonly encountered authorization problems, see <a href="{{ stache.config.guide_web_api_common_auth_issues }}" target="_blank">common authorization issues</a>.

## Step 4 &mdash; Request tokens

When your application receives an authorization code, you will need to exchange it for an access token by making a POST request to our <b>token</b> endpoint:

<pre><code class="language-http">{{ stache.config.token_endpoint }}</code></pre>

The body of the request must contain the following fields:

<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Field</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>grant_type</td>
        <td class="column-2"><em>Required.</em> This field must contain the value `authorization_code`.</td>
      </tr>
      <tr>
        <td>code</td>
        <td class="column-2"><em>Required.</em> The authorization code supplied to your application's `redirect_uri`.</td>
      </tr>
      <tr>
        <td>redirect_uri</td>
        <td class="column-2"><em>Required.</em> This parameter is used for validation only (there is no actual redirection).  The value of this parameter must <i>exactly</i> match the value of the `redirect_uri` parameter you supplied when initiating authorization.</td>
      </tr>
    </tbody>
  </table>
</div>

In addition, the request must include the following headers:

<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Header</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Authorization</td>
        <td>
          <p><em>Required.</em> Your application's basic authentication credentials.  The value of this header must be a base 64-encoded string that contains the application ID and secret that were provided when you [registered your application]({{ stache.config.guide_registering_your_app }}). The value must have the format: <code>Basic &lt;base64 encoded {{ stache.config.guide_apps_client_id_name }}:{{ stache.config.guide_apps_client_secret_name }}&gt;</code>.</p>
          <p class="alert alert-info"><strong><em>Note:</em></strong> As an alternative to using the <code>Authorization</code> header, you may supply your application ID and secret as part of the request body as <code>client_id</code> and <code>client_secret</code> parameters, respectively.</p>
          <hr>
          <p><em>Since this request uses your **{{ stache.config.guide_apps_client_secret_name }}**, it should be made from the server to avoid exposing the value to the public.</em></p>
        </td>
      </tr>
      <tr>
        <td>Content-Type</td>
        <td><em>Required.</em> The value should be <code>application/x-www-form-urlencoded</code>.</td>
      </tr>
    </tbody>
  </table>
</div>

For example:

<pre><code class="language-http">POST {{ stache.config.token_endpoint }} HTTP/1.1
Authorization: Basic czZCaGRS...WDFmQmF0M2JW
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&redirect_uri=https%3A%2F%2Fwww.example.com%2Foauth2%2Fcallback&code=bd2d702f47bc453580098c8076d471b4</code></pre>

<p class="alert alert-warning"><strong><em>Note:</em></strong> The authorization code expires in 5 minutes.  Be sure to quickly exchange it for an access token.</p>

## Step 5 &mdash; Tokens returned

If the access token request is successful, the response body will contain a JSON object that has the following fields:

<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Field</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>access_token</td>
        <td>string</td>
        <td>An access token to be used when making calls to the {{ stache.config.api_type_name }}.  The access token should be provided in the standard `Authorization` header in the form of `Bearer token` (note the separating space).</td>
      </tr>
      <tr>
        <td>token_type</td>
        <td>string</td>
        <td>Indicates the type of token issued, and will always contain the value `bearer`.
      </tr>
      <tr>
        <td>expires_in</td>
        <td>integer</td>
        <td>The time period (in seconds) in which the access token is valid.</td>
      </tr>
      <tr>
        <td>refresh_token</td>
        <td>string</td>
        <td>A value that can be used to refresh the access token when it expires.  When you exchange a refresh token, you'll receive a new access token (and a new refresh token) that you can use when making subsequent calls to the {{ stache.config.api_type_name }}.  (See <a href="#step-7-mdash-refresh-access-token" class="smooth-scroll">refresh access token</a>).</td>
      </tr>
      <tr>
        <td>tenant_id</td>
        <td>string</td>
        <td>The ID of the specific Blackbaud customer (tenant) whose data can be accessed using the access token.  When the user grants permission to your application, they do so in the context of their organization.  The tokens we issue can only be used to access that customer's data.  We provide this value to you for informational purposes only - it is not used when calling the {{ stache.config.api_type_name }}. You may store this value in your application along with the user's access token.</td>
      </tr>
      <tr>
        <td>tenant_name</td>
        <td>string</td>
        <td>The name of the specific Blackbaud customer (tenant) whose data can be accessed using the access token.  When the user grants permission to your application, they do so in the context of their organization.  The tokens we issue can only be used to access that customer's data.  We provide this value to you for informational purposes only - it is not used when calling the {{ stache.config.api_type_name }}. You may store this value in your application along with the user's access token.</td>
      </tr>
    </tbody>
  </table>
</div>

### Sample response:

<pre><code class="language-http">HTTP/1.1 200 OK
Cache-Control: no-cache
Pragma: no-cache
Content-Length: 918
Content-Type: application/json;charset=UTF-8
Expires: -1
Date: Thu, 10 Sep 2015 15:46:56 GMT

{
  "access_token":"eyJ0eXAiOiJKV1...CTtP0CQ",
  "token_type": "bearer",
  "expires_in": 1199,
  "refresh_token":"eb78ffd...7cb7b",
  "tenant_id": "E27DD7B6-6B71-4689-8B2C-60A74F243966",
  "tenant_name":"Raiser's Edge NXT - Blackbaud (Developer Sandbox)"
}</code></pre>

If the token request is not successful, the response status code and body will provide details.  For more information on commonly encountered authorization problems, see <a href="{{ stache.config.guide_web_api_common_auth_issues }}" target="_blank">common authorization issues</a>.

## Step 6 &mdash; Call the {{ stache.config.api_type_name }}

The access token allows you to make requests to the {{ stache.config.api_type_name }} on a behalf of a user. When calling the API, provide the access token using the standard `Authorization` request header with a value of `Bearer`, followed by a space and the `access_token` value.

You will also need to provide your subscription key to the {{ stache.config.api_type_name }} via the `bb-api-subscription-key` header.  You can use either the primary or the secondary key (both are equally functional), and both can be found on your <a href="{{ stache.config.portal_profile }}" target="_blank">developer profile</a> page.

For more information on providing these headers, see <a href="{{ stache.config.guide }}basics#request-headers" target="_blank">request headers</a>.

### Sample Request

<pre><code class="language-http">GET {{ stache.config.resource_url }}/constituents/280 HTTP/1.1
Host: {{ stache.config.resource_hostname }}
Authorization: Bearer eyJ0eXAiOiJKV1...CTtP0CQ
bb-api-subscription-key: 77f137116...480d633
</code></pre>

## Step 7 &mdash; Refresh access token

For security purposes, access tokens will expire after {{ stache.config.access_token_expiration_minutes }} minutes. When this happens, calls to the {{ stache.config.api_type_name }} will respond with a status code of `401 Not Authorized` along with the message "The required Authorization header was missing or invalid, **or the token has expired**".  To continue making calls to the API, you will need to exchange the value you received in the `refresh_token` field for a new access token.

This exchange happens on the server, and does not involve any user interactivity.  In this way, your application can have indefinite connectivity to {{ statche.config.api_type_name }} after the initial one-time user-interactive consent.

To refresh your access token, make a POST request to our <b>token</b> endpoint:

<pre><code class="language-http">{{ stache.config.token_endpoint }}</code></pre>

The body of the request must contain the following fields:

<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Field</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>grant_type</td>
        <td class="column-2"><em>Required.</em> This field must contain the value `refresh_token`.</td>
      </tr>
      <tr>
        <td>refresh_token</td>
        <td class="column-2"><em>Required.</em> The refresh token supplied to your application's `redirect_uri`.</td>
      </tr>
    </tbody>
  </table>
</div>

In addition, the request must include the following headers:

<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Header</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Authorization</td>
        <td>
          <p><em>Required.</em> Your application's basic authentication credentials.  The value of this header must be a base 64-encoded string that contains the application ID and secret that were provided when you [registered your application]({{ stache.config.guide_registering_your_app }}). The value must have the format: <code>Basic &lt;base64 encoded {{ stache.config.guide_apps_client_id_name }}:{{ stache.config.guide_apps_client_secret_name }}&gt;</code>.</p>
          <p class="alert alert-info"><strong><em>Note:</em></strong> As an alternative to using the <code>Authorization</code> header, you may supply your application ID and secret as part of the request body as <code>client_id</code> and <code>client_secret</code> parameters, respectively.</p>
          <hr>
          <p><em>Since this request uses your **{{ stache.config.guide_apps_client_secret_name }}**, it should be made from the server to avoid exposing the value to the public.</em></p>
        </td>
      </tr>
      <tr>
        <td>Content-Type</td>
        <td><em>Required.</em> The value should be <code>application/x-www-form-urlencoded</code>.</td>
      </tr>
    </tbody>
  </table>
</div>

For example:

<pre><code class="language-http">POST {{ stache.config.token_endpoint }} HTTP/1.1
Authorization: Basic czZCaGRS...WDFmQmF0M2JW
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token&refresh_token=eb78ffdabc7cb7b</code></pre>

If the refresh token request is successful, the response body will contain a JSON object that has the following fields:

<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Field</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>access_token</td>
        <td>string</td>
        <td>An access token to be used when making calls to the {{ stache.config.api_type_name }}.  The access token should be provided in the standard `Authorization` header in the form of `Bearer token` (note the separating space).</td>
      </tr>
      <tr>
        <td>token_type</td>
        <td>string</td>
        <td>Indicates the type of token issued, and will always contain the value `bearer`.
      </tr>
      <tr>
        <td>expires_in</td>
        <td>integer</td>
        <td>The time period (in seconds) in which the access token is valid.</td>
      </tr>
      <tr>
        <td>refresh_token</td>
        <td>string</td>
        <td>A value that can be used to refresh the access token when it expires.  When you exchange a refresh token, you'll receive a new access token (and a new refresh token) that you can use when making subsequent calls to the {{ stache.config.api_type_name }}.  (See <a href="#step-7-mdash-refresh-access-token" class="smooth-scroll">refresh access token</a>).</td>
      </tr>
      <tr>
        <td>tenant_id</td>
        <td>string</td>
        <td>The ID of the specific Blackbaud customer (tenant) whose data can be accessed using the access token.  When the user grants permission to your application, they do so in the context of their organization.  The tokens we issue can only be used to access that customer's data.  We provide this value to you for informational purposes only - it is not used when calling the {{ stache.config.api_type_name }}. You may store this value in your application along with the user's access token.</td>
      </tr>
    </tbody>
  </table>
</div>

### Sample response:

<pre><code class="language-http">HTTP/1.1 200 OK
Cache-Control: no-cache
Pragma: no-cache
Content-Length: 918
Content-Type: application/json;charset=UTF-8
Expires: -1
Date: Thu, 10 Sep 2015 15:46:56 GMT

{
  "access_token":"azH0eXAiOiJKV1...DTxS1DR",
  "token_type": "bearer",
  "expires_in": 1199,
  "refresh_token":"ab478xsd...7ab6c",
  "tenant_id": "E27DD7B6-6B71-4689-8B2C-60A74F243966"
}</code></pre>

If the refresh token request is not successful, the response status code and body will provide details.  For more information on commonly encountered authorization problems, see <a href="{{ stache.config.guide_web_api_common_auth_issues }}" target="_blank">common authorization issues</a>.

## Tutorial

For more information on implementing the authorization code flow, check out our [tutorials]({{ stache.config.guide_web_api_authorization_auth_code_flow_tutorial_home }}).

