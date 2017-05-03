<div class="row">
<div class="col-md-6" style="text-align: left;">
{{# markdown }}
The <a href="https://tools.ietf.org/html/rfc6749#section-1.3.2" target="_blank">implicit grant</a> is meant for applications where API calls are made from the client, typically within a browser using JavaScript.  Since API calls are made from the client, they are inherently less secure and do not involve the exchange of an application secret. The access tokens that are issued are short-lived and no refresh tokens are provided, so the user must re-authorize your application when the token expires.

Like the [Authorization Code Flow]({{ stache.config.guide_web_api_authorization_auth_code_flow }}), the implicit flow starts by redirecting the user's browser from your application to our Authorization URL.  The user will login (using the Blackbaud or Google credentials), confirm that it's OK for your application to access their data, and then we'll redirect back to you with an access token that you can immediately use when making API calls on that user's behalf.

Since this is a redirection-based flow, your application must be able to interact with a web browser and receive incoming requests (via redirection) from our OAuth endpoints.

{{/ markdown }}
</div>
<div class="col-md-6" style="text-align: left;">
{{# markdown }}
![Implicit Grant Flow](/assets/img/ImplicitGrantFlow.png "Implicit Grant Flowchart")
{{/ markdown }}
</div>
</div>