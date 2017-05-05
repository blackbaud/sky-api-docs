<div class="row">
<div class="col-md-6" style="text-align: left;">
{{# markdown }}
The <a href="https://tools.ietf.org/html/rfc6749#section-1.3.1" target="_blank">authorization code grant</a> is meant for web applications where API calls are made from the server. It is the most secure as it involves server-to-server communication, and is also the most functional as it also provides refresh tokens. This allows your application to have indefinite connectivity to the {{ stache.config.api_type_name }} after the one-time user-interactive consent process.

The flow starts by redirecting the user's browser from your application to our Authorization URL. The user will login (using their Blackbaud or Google credentials), confirm that it's OK for your application to access their data, and then we'll redirect back to you with an authorization code that you can exchange for an access token. You can store this access token (and the refresh token) in your application, and use it when making API calls on that user's behalf.

Since this is a redirection-based flow, your application must be able to interact with a web browser and receive incoming requests (via redirection) from our OAuth endpoints.

We demonstrate this flow in our [tutorials]({{ stache.config.guide_web_api_authorization_auth_code_flow_tutorial_home }}) and [code samples]({{ stache.config.guide_code }}).

{{/ markdown }}
</div>
<div class="col-md-6" style="text-align: left;">
{{# markdown }}
![Authorization Code Flow](/assets/img/AuthCodeFlow.png "Authorization Code Flow")
{{/ markdown }}
</div>
</div>