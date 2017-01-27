When you are signed in, you can test the {{ stache.config.product_name_short }} with the <a href="{{ stache.config.guide_basics_apiconsole }}"><strong>{{ stache.config.dev_console_name }}</strong></a>. 

<ol>
<li><p>From an <a href="{{ stache.config.portal_endpoints }}" target="_blank"><strong>Endpoint Reference</strong></a>, click  **Try it**.<br />
For example, in the Constituent Endpoint Reference, select the **Constituent (Get)** endpoint and click **Try it**. This enables the {{ stache.config.dev_console_name }}.<br />
<img src="/assets/img/getting_started_step3b_api_reference.png" alt="API Reference" title="API Reference")></p></li>
<li><p>Under **Query parameters**, enter a sample parameter. For example, enter `280` for the `constituentId` parameter.</p></li>
<li><p>Under **Headers**, select the **show/hide** icon in the `{{ stache.config.subscription_keyname }}` field.  The value reflects the selected subscription key from the **Authorization** section.</p>
<p class="alert alert-info"><strong><em>Note:</em></strong> The  **Request URL** and **HTTP request** change based on the    values for the parameter and request header field values.</p></li>![subscription key](/assets/img/getting_started_step4_subscription_key.png "subscription key")<br/>
<a href="#" data-toggle="modal" data-target="#consolesecurity"><strong>How does the {{ stache.config.dev_console_name }} security work?</strong></a>
{{ include 'includes/shared/nxt-web-api/getting-started/devaccount-sandbox-tenant.md' }}
<br /><br />
<li><p>Under **Authorization**, select **Authorization code** in the **{{ stache.config.portal_auth_dropdown }}** field.<br />
<img title="Authorization Code" alt="Authorization Code" src="/assets/img/getting_started_step4_oauth.png"></p></li>
<li><p>The {{ stache.config.authorization_service_name }} displays a **SKY API Console** pop-up window.<br />
 <img title="Authorization Code" alt="Authorization Code" src="/assets/img/getting_started_step4_popup.png" ></p></li>
 
<li><p>Select a tenant. Approved API subscribers with access to their own dedicated tenant need to <a href="{{ stache.config.guide_basics }}#activating-the-sky-api-console" target="_blank"><strong>activate the {{ stache.config.dev_console_name }} as an approved application</strong></a>.</p></li>

<li><p>Click **Authorize**. This gives the {{ stache.config.dev_console_name }} access to your {{ stache.config.product_name_short }} data for the selected tenant.</p></li>
<li><p>After you approve the {{ stache.config.dev_console_name }} to access the API data for your Blackbaud developer account, the **HTTP request** is populated with the `Authorization:Bearer ` header. This represents the access token for the request.<br />
</p></li>
<li><p>After you have a bearer token and configure the values for the URI parameters, click **Send** to submit the request.  The response includes a response status, latency, and content including JSON data for the requested endpoint.<br />

<img alt="Approved Authorization" title="Approved Authorization" src="/assets/img/getting_started_step_4_send.png" >
  </p></li>
</ol>