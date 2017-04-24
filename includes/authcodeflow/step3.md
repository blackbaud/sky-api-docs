<div class="row">
<div class="col-md-12" style="text-align: left;">

{{# markdown }}

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

{{/ markdown}}

</div></div>