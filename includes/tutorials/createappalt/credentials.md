<div class="col-md-12" style="text-align: left;">
 <p>After you register an app, note the ID and secret that appear under <b>Application Credentials</b>. These credentials are unique to your application, and verify its identity during the <a href="{{ stache.config.guide_web_api_authorization }}" target="_blank">authorization process</a>.</p>
 <div class="row">
 <div class="col-md-6">
 <p><b>ID -</b><br />Your application's unique identifier. Your users will need this ID to enable your application to access their Blackbaud data. You can't modify this ID; if you need to change it for any reason, delete the application and re-register it.</p>
 </div>
  <div class="col-md-6">
  <p><b>Secret -</b><br />The key your application provides when it requests an access token to call the {{ stache.config.product_name_short }} during the <a href="{{ stache.config.guide_web_api_authorization }}" target="_blank">authorization process</a>. This value is sensitive, so <b>don't</b> share it with anyone else! To display the secret, click <b>Show</b>.</p>
  </div>
 </div>
 <p><img src="/assets/img/app_credentials_sample.png" class="img-responsive"></p>
<p class="alert alert-warning"><strong><em>Very Important!&nbsp;&nbsp;</em></strong> Keep the application secret private and safe! If the secret is compromised, <a href="{{ stache.config.guide_registering_your_app }}#regenerate-your-secret" target="_blank">regenerate it.</a> Blackbaud reserves the right to remove or deactivate your application to protect customer data.</p>
 </div>
