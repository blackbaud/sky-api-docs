<div class="row">
<div class="col-md-12" style="text-align: left;">

{{# markdown }}

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

{{/ markdown}}

</div></div>