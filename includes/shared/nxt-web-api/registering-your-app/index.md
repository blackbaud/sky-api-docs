<p>To register your application:</p>

1. Go to <a href="{{ stache.config.developer_app_management_url }}" target= "_blank">My Applications</a> to manage your applications.

2. Click **Register app**.
  ![My Applications](/assets/img/my_applications.png "My Applications")

3. Enter the following information:
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
          <td>Application name</td>
          <td>(Required) Enter a name for your application. This is the name that users will see when asked to grant access to your application during the <a href="{{ stache.config.guide_web_api_authorization }}" target="_blank">authorization process</a>.  It will also be seen by administrators within the Applications area of the product when they view the list of applications that have been granted access to their data.</td>
        </tr>
        <tr>
          <td>Application details</td>
          <td>(Required) Provide a description for your application.  This will be seen by administrators when activating your application within the product.</td>
        </tr>
        <tr>
          <td>Organization name</td>
          <td>(Required) Specify the company name that users and administrators will see associated with your application.</td>
        </tr>
        <tr>
          <td>Application logo</td>
          <td>(Optional) Provide a 512 by 512 pixel PNG or JPEG image that users and administrators will see associated with your application.</td>
        </tr>
        <tr>
          <td class="nowrap">Application website URL</td>
          <td>(Required) Enter a URL where users can find out more information about your application.</td>
        </tr>
        <tr>
          <td>Redirect URIs</td>
          <td>(Required) Specify one or more URIs that should be used when redirecting the user's browser back to your application after providing consent during the <a href="{{ stache.config.guide_web_api_authorization }}" target="_blank">authorization process</a>.  The URIs must be absolute and use https (note that we do support `http://localhost:port` or `http://127.0.0.1:port` for local development). To register multiple URIs, click **Add another redirect URI**.
    			{{# if tutorial }}<br><br>For this tutorial, use `http://localhost:5000/auth/callback`.{{/ if }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="alert alert-warning"><strong>Important!&nbsp;&nbsp;</strong> When your application requests authorization to access a Blackbaud customer's data, it will include a <code>redirect_uri</code> parameter as part of the query string.  This value must match <i>exactly</i> against one of the values you listed when registering your application, including any trailing slashes.  If the value supplied does not match any of the registered redirect URIs, then authorization will fail.  For more information on commonly encountered authorization problems, see <a href="{{ stache.config.guide_web_api_common_auth_issues }}" target="_blank">common authorization issues</a>.</p>
  <p>![Basic Info](/assets/img/add_app_top.png "Basic Info")</p>

4. Click **Save** to complete the registration of your application.

5. After you register an application, take note of the credentials (**ID** and **Secret**) that are displayed in the **Application Credentials** column.  These credentials are unique to your application, and are used to verify your application's identity during the <a href="{{ stache.config.guide_web_api_authorization }}" target="_blank">authorization process</a>.

    - **Application ID** is the unique identifier for your application.  This value is not sensitive and can be shared publicly.  It cannot be modified after the application is registered, so if you need change it for any reason you must delete the application and re-add it.
    - **Application secret** is the key your application will provide when requesting an access token to call the SKY API as part of the <a href="{{ stache.config.guide_web_api_authorization }}" target="_blank">authorization process</a>. This value is sensitive and should **NOT** be shared with anyone else! To display the secret, click **Show** in the **Application Credentials** column.
      {{# if tutorial }}
        <p class="alert alert-warning"><strong><em>Very Important!&nbsp;&nbsp;</em></strong> The application secret should be kept private and safe! <a href="{{ stache.config.guide_registering_your_app }}#regenerate-your-secret">Regenerate your secret</a> if it is compromised. Blackbaud reserves the right to remove or deactivate your application in order to protect our customer's data.</p>
      {{else}}
        <p class="alert alert-warning"><strong><em>Very Important!&nbsp;&nbsp;</em></strong> The application secret should be kept private and safe! <a href="#regenerate-your-secret" class="smooth-scroll">Regenerate your secret</a> if it is compromised. Blackbaud reserves the right to remove or deactivate your application in order to protect our customers' data.</p>
      {{/ if }}
      <p>![Your registered applications list](/assets/img/my_applications2.png "Your registered applications list")</p>

