<div class="row">
<div class="col-md-12" style="text-align: left;">

{{# markdown }}

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
        <td>An access token to be used when making calls to the {{ stache.config.api_type_name }}.  The access token should be provided in the standard <code>Authorization</code> header in the form of <code>Bearer token</code> (note the separating space).</td>
      </tr>
      <tr>
        <td>token_type</td>
        <td>string</td>
        <td>Indicates the type of token issued, and will always contain the value <code>bearer</code>.
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
      <tr>
        <td>user_id</td>
        <td>string</td>
        <td>The unique identifer of the authenticated Blackbaud user in whose context the access token is issued.  This value can be used to correlate Blackbaud users with users in external systems.</td>
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
  "tenant_name":"Raiser's Edge NXT - Blackbaud (Developer Sandbox)",
  "legal_entity_id":"p-AaBbCcDdEeFfGg987654321",
  "legal_entity_name":"Blackbaud Developer Sandbox"
  "environment_id":"p-abcdef1234567890ABCDEFG",
  "environment_name":"Blackbaud Developer Sandbox Environment"
}</code></pre>

If the token request is not successful, the response status code and body will provide details.  For more information on commonly encountered authorization problems, see <a href="{{ stache.config.guide_web_api_common_auth_issues }}" target="_blank">common authorization issues</a>.

{{/ markdown}}

</div></div>