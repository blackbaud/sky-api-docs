<div class="row">
<div class="col-md-12" style="text-align: left;">

{{# markdown }}

Initiate the authorization process by redirecting the user's browser to our <b>authorization</b> endpoint.  You can choose to do this as a step in your application's login process or in response to some user action in your app (like a button click):

<pre><code class="language-http">{{ stache.config.authorization_endpoint }}</code></pre>

When navigating, you'll need to include a few parameters in the query string. These parameters are fully described in <a href="https://tools.ietf.org/html/rfc6749#section-4.1.1" target="_blank">RFC-6749 section 4.1.1</a>:

{{/ markdown }}


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

{{# markdown }}

A sample authorization request looks like this (with extra line breaks for display purposes only):

<pre><code class="language-http">{{ stache.config.authorization_endpoint }}?
client_id=E140BF29-A528-4048-91A9-83BCB01B7FE2
&response_type=code
&redirect_uri=https://www.example.com/oauth2/callback
&state=fdf80155</code></pre>
{{/ markdown }}

</div></div>