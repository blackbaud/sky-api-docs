<div class="row">
<div class="col-md-12" style="text-align: left;">

{{# markdown }}

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
      <tr>
        <td>legal_entity_id</td>
        <td>string</td>
        <td>The legal entity identifier.  A legal entity represents a Blackbaud client (organization or individual) who can try out or purchase the products, services, and solutions Blackbaud provides.  We provide this value to you for informational purposes only - it is not used when calling the {{ stache.config.api_type_name }}. You may store this value in your application along with the user's access token.</td>
      </tr>
      <tr>
        <td>legal_entity_name</td>
        <td>string</td>
        <td>The name of the legal entity.</td>
      </tr>
      <tr>
        <td>environment_id</td>
        <td>string</td>
        <td>The environment identifier.  An environment is a logical group of products and service instances that a legal entity is entitled to.  We provide this value to you for informational purposes only - it is not used when calling the {{ stache.config.api_type_name }}. You may store this value in your application along with the user's access token.</td>
      </tr>
      <tr>
        <td>environment_name</td>
        <td>string</td>
        <td>The name of the environment.</td>
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
  "tenant_id": "E27DD7B6-6B71-4689-8B2C-60A74F243966",
  "legal_entity_id":"p-AaBbCcDdEeFfGg987654321",
  "legal_entity_name":"Blackbaud Developer Sandbox"
  "environment_id":"p-abcdef1234567890ABCDEFG",
  "environment_name":"Blackbaud Developer Sandbox Environment"
}</code></pre>

If the refresh token request is not successful, the response status code and body will provide details.  For more information on commonly encountered authorization problems, see <a href="{{ stache.config.guide_web_api_common_auth_issues }}" target="_blank">common authorization issues</a>.


{{/ markdown}}

</div></div>