<div class="row">
<div class="col-md-12" style="text-align: left;">

{{# markdown }}
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

<p><bb-alert bb-alert-type="info"><strong><em>Reminder:</em></strong> The Implicit Grant Flow provides a short-lived access token that expires in {{ stache.config.access_token_expiration_minutes }} minutes. A refresh token is not provided, so when the token expires your application should re-authorize the user again.</bb-alert></p>

Successful redirect response example (with extra line breaks for display purposes only):

<pre><code class="language-http">https://www.example.com/oauth2/callback#
access_token=1d57284f025...4975d
&token_type=bearer
&expires_in=3600
&state=fdf80155
&tenant_id=E27DD7B6-6B71-4689-8B2C-60A74F243966
&tenant_name=Raiser%27s%20Edge%20NXT%20-%20Blackbaud%20%28Developer%20Sandbox%29
&legal_entity_id=p-AaBbCcDdEeFfGg987654321",
&legal_entity_name=Blackbaud%20Developer%20Sandbox
&environment_id":"p-abcdef1234567890ABCDEFG",
&environment_name=Blackbaud%20Developer%20Sandbox%20Environment</code></pre>

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
{{/ markdown }}

</div></div>