<p style="text-align: left;">To call the {{ stache.config.product_name_short }}, first register your application to obtain its unique set of credentials, which your users will use to enable your app to access their data</p>
<br />
<div class="row">
<div class="col-md-6" style="text-align: left;">
<br />
<ol>
<li><p>From <a href="{{ stache.config.developer_app_management_url }}" target= "_blank">My Applications</a>, click <b>Register app</b>.</p></li>
<li><p>Enter the name, description, and logo of your application, as well as your organization's name. This information appears for users when they enable access to your application during the <a href="{{ stache.config.guide_web_api_authorization }}" target="_blank">authorization process</a> or in their product.</p></li>
<li><p>In the <strong>Application website URL</strong> field, enter where users can learn more about your application online.</p></li>
<li><p>Specify the URIs to use to redirect users back to your application during the <a href="{{ stache.config.guide_web_api_authorization }}" target="_blank">authorization process</a>.
<br /><br />
<strong>Note:</strong>The URIs must be absolute and use HTTPS. However, we do support `http://localhost:port` or `http://127.0.0.1:port` for local development.</p>

<p class="alert alert-warning"><strong>Important!&nbsp;&nbsp;</strong> When your application requests authorization to access a Blackbaud user's data, it includes a <code>redirect_uri</code> parameter in its query string.  To authorize your application, this value must match <i>exactly</i> against one of the URIs you provide, including any trailing slashes. For more information, see <a href="{{ stache.config.guide_web_api_common_auth_issues }}" target="_blank">common authorization issues</a>.</p>
  </li>
  <li><p>Click <b>Save</b>.</p></li>
</ol>
</div>

<div class="col-md-6" style="text-align: left;">
<p><img width="100%" src="/assets/img/add_app_top.png" class="img-responsive"></p></div></div>