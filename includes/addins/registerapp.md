<p style="text-align: left;">To enable Add-ins in your test instance of a Blackbaud solution, the add-in needs to be associated with an application. The first step in this process is to register your application with SKY API.</p>

<div class="row">
  <div class="col-md-6" style="text-align: left;">
    <ol>
      <li><p>From <a href="{{ stache.config.developer_app_management_url }}" target= "_blank">My Applications</a>, click <b>Register app</b>.</p></li>
      <li><p>Enter the name, description, and logo of your application, as well as your organization's name.</p></li>
      <li><p>In the <strong>Application website URL</strong> field, enter where users can learn more about your application online.</p></li>
      <li>
        <p>Specify the URIs to use to redirect users back to your application during the <a href="{{ stache.config.guide_web_api_authorization }}" target="_blank">authorization process</a>.
        <strong>Note:</strong> The URIs must be absolute and use HTTPS. However, we do support <code>http://localhost:port</code> or <code>http://127.0.0.1:port</code> for local development.</p>
        <p><bb-alert bb-alert-type="warning"><strong>Important!&nbsp;&nbsp;</strong> When your application requests authorization to access a Blackbaud user's data, it includes a <code>redirect_uri</code> parameter in its query string.  To authorize your application, this value must match <i>exactly</i> against one of the URIs you provide, including any trailing slashes. For more information, see <a href="{{ stache.config.guide_web_api_common_auth_issues }}" target="_blank">common authorization issues</a>.</bb-alert></p>
      </li>
      <li><p>Click <b>Save</b>.</p></li>
    </ol>
  </div>
  <div class="col-md-6" style="text-align: left;">
    <p><img width="100%" src="/assets/img/add_app_top.png" class="img-responsive"></p>
  </div>
</div>