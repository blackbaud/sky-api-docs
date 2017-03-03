---
layout: layout-sidebar
name: Implicit Flow
description: The Implicit Flow is carried out client-side within a browser-based app. Since the code is available to the browser, the <%= stache.config.guide_apps_client_secret_name %> cannot be kept a secret and is not used to request an access token.  As a result, the access tokens that are issued are short-lived and there are no refresh tokens to extend them when they expire.
order: 150
published: true
showInNav: true
back_to_top: true
title: Implicit Flow
---

{{ include stache.config.partial_header_comments }}{{ include stache.config.partial_header_edit }}

# Implicit Flow

The <a href="https://tools.ietf.org/html/rfc6749#section-1.3.2" target="_blank">implicit grant</a> is meant for applications where API calls are made from the client, typically within a browser using JavaScript.  Since API calls are made from the client, they are inherently less secure and do not involve the exchange of an application secret. The access tokens that are issued are short-lived and no refresh tokens are provided, so the user must re-authorize your application when the token expires.

Like the [Authorization Code Flow]({{ stache.config.guide_web_api_authorization_auth_code_flow }}), the implicit flow starts by redirecting the user's browser from your application to our Authorization URL.  The user will login (using the Blackbaud or Google credentials), confirm that it's OK for your application to access their data, and then we'll redirect back to you with an access token that you can immediately use when making API calls on that user's behalf.

![Implicit Grant Flow](/assets/img/ImplicitGrantFlow.png "Implicit Grant Flowchart")

Since this is a redirection-based flow, your application must be able to interact with a web browser and receive incoming requests (via redirection) from our OAuth endpoints.

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
        <td><em>Required</em>. The **{{ stache.config.guide_apps_client_id_name }}** value that we provide when you [register your application]({{ stache.config.guide_registering_your_app }}). This value uniquely identifies your application. See <a href="https://tools.ietf.org/html/rfc6749#section-2.2" target="_blank">RFC-6749 section 2.2</a>.</td>
      </tr>
      <tr>
        <td>response_type</td>
        <td><em>Required</em>. The value must be set to <code>token</code>.  This indicates that the access token should be returned in the fragment of the redirect URI.</td>
      </tr>
      <tr>
        <td>redirect_uri</td>
        <td><em>Required</em>. The URI to redirect to after the user grants or denies permission to your app. This value must exactly match one of the Redirect URI values you specify when you [register your application]({{ stache.config.guide_registering_your_app }}), including any capitalization, trailing slashes, etc. See <a href="https://tools.ietf.org/html/rfc6749#section-3.1.2" target="_blank">RFC-6749 section 3.1.2</a>.
        </td>
      </tr>
      <tr>
        <td>state</td>
        <td class="column-2"><em>Optional, but recommended</em>. The <code>state</code> parameter is an opaque value that you can provide when requesting authorization that will be echoed back to you when the user grants or denies permission to your app.  You can then validate this parameter to ensure that an incoming redirect is the result of an authentication request that originated in your application.  This provides protection against Cross-Site Request Forgery (CSRF) attacks.

        You can also use this parameter to maintain some state between the authorization request you initiate and the incoming navigation to your redirect URI for the purposes of returning the user to tbe most appropriate location within your app.

        See <a href="https://tools.ietf.org/html/rfc6749#section-10.12" target="_blank">RFC-6749 section 10.12</a></td>
      </tr>
    </tbody>
  </table>
</div>

<p class="alert alert-warning"><b>Note: </b>to facilitate local development, we allow the use of _http_ and _localhost_ or the localhost IP (_127.0.0.1_).  In production however, we require the use of _https_ for proper security when redirecting.</p>

A sample authorization request looks like this (with extra line breaks for display purposes only):

<pre><code class="language-http">{{ stache.config.authorization_endpoint }}?
client_id=E140BF29-A528-4048-91A9-83BCB01B7FE2
&response_type=token
&redirect_uri=https://www.example.com/oauth2/callback
&state=fdf80155</code></pre>

## Step 2 &mdash; User authorizes your app

In this step, we'll ask the user to log in (using their Blackbaud or Google credentials).  We'll then ask them if it's ok for your application to access their Blackbaud data:

![Authorization Consent Form](/assets/img/getting_started_step4_popup.png "Authorization Consent Form")

If the user has access to more than one customer's data, they'll select the customer (tenant) to which they are giving your app permission.

## Step 3 &mdash; Access token provided

After the user grants (or denies) your authorization request, we'll redirect the browser to the `redirect_uri` that you specified in the request (in the above example, we'll redirect the browser back to your application at _https://www.example.com/oauth2/callback_).

If the user granted your app permission, the URL fragment will contain the following fields:

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
        <td>state</td>
        <td>string</td>
        <td class="column-2">The value of the <code>state</code> parameter you supplied in the initial authorization request.</td>
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

<div class="alert alert-info" role="alert"><strong><em>Reminder:</em></strong> The Implicit Grant Flow provides a short-lived access token that expires in {{ stache.config.access_token_expiration_minutes }} minutes. A refresh token is not provided, so when the token expires your application should re-authorize the user again.</div>

Successful redirect response example (with extra line breaks for display purposes only):

<pre><code class="language-http">https://www.example.com/oauth2/callback#
access_token=1d57284f025...4975d
&token_type=bearer
&expires_in=3600
&state=fdf80155
&tenant_id=E27DD7B6-6B71-4689-8B2C-60A74F243966
&tenant_name=Raiser%27s%20Edge%20NXT%20-%20Blackbaud%20%28Developer%20Sandbox%29</code></pre>

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

## Step 4 &mdash; Call the {{ stache.config.product_name_short }}

The access token allows you to make requests to the {{ stache.config.api_type_name }} on a behalf of a user. When calling the API, provide the access token using the standard `Authorization` request header with a value of `Bearer`, followed by a space and the `access_token` value.

You will also need to provide your subscription key to the {{ stache.config.api_type_name }} via the `bb-api-subscription-key` header.  You can use either the primary or the secondary key (both are equally functional), and both can be found on your <a href="{{ stache.config.portal_profile }}" target="_blank">developer profile</a> page.

For more information on providing these headers, see <a href="{{ stache.config.guide}}basics#request-headers" target="_blank">request headers</a>.

### Sample Request

<pre><code class="language-http">GET {{ stache.config.resource_url }}/constituents/280 HTTP/1.1
Host: {{ stache.config.resource_hostname }}
Authorization: Bearer eyJ0eXAiOiJKV1...CTtP0CQ
bb-api-subscription-key: 77f137116...480d633
</code></pre>

{{ include stache.config.partial_disqus }}
