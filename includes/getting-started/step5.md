<div class="row">
    <div class="col-md-12" style="text-align: left;">
<p>When you are signed in, you can test the {{ stache.config.product_name_short }} with the <a href="{{ stache.config.guide_basics_apiconsole }}"><strong>{{ stache.config.dev_console_name }}</strong></a>. </p>


<ol>
<li>From an <a href="{{ stache.config.portal_endpoints }}" target="_blank"><strong>Endpoint Reference</strong></a>, click  <strong>Try it</strong>. For example, in the Constituent Endpoint Reference, select the <strong>Constituent (Get)</strong> endpoint and click <strong>Try it</strong>. This enables the {{ stache.config.dev_console_name }}.<br />
<img src="/assets/img/getting_started_step3b_api_reference.png" alt="API Reference" title="API Reference")></li>
<li>Under <strong>Query parameters</strong>, enter a sample parameter. For example, enter `280` for the `constituentId` parameter.</li>
<li>Under <strong>Headers</strong>, select the <strong>show/hide</strong> icon in the <code>{{ stache.config.subscription_keyname }}</code> field.  The value reflects the selected subscription key from the <strong>Authorization</strong> section.
<p><bb-alert bb-alert-type="info"><strong><em>Note:</em></strong> The  <strong>Request URL</strong> and <strong>HTTP request</strong> change based on the    values for the parameter and request header field values.</bb-alert></p>

<img src="/assets/img/getting_started_step4_subscription_key.png"> <br/></li>

<br />

<li>Under <strong>Authorization</strong>, select <strong>Authorization code</strong> in the <strong>{{ stache.config.portal_auth_dropdown }}</strong> field.<br />
<img title="Authorization Code" alt="Authorization Code" src="/assets/img/getting_started_step4_oauth.png"></li>
<li>The {{ stache.config.authorization_service_name }} displays a <strong>SKY API Console</strong> pop-up window.<br />
 <img title="Authorization Code" alt="Authorization Code" src="/assets/img/getting_started_step4_popup.png" ></li>
 
<li>Select a tenant. Approved API subscribers with access to their own dedicated tenant need to <a href="{{ stache.config.guide_basics }}#activating-the-sky-api-console" target="_blank"><strong>activate the {{ stache.config.dev_console_name }} as an approved application</strong></a>.</li>

<li>Click <strong>Authorize</strong>. This gives the {{ stache.config.dev_console_name }} access to your {{ stache.config.product_name_short }} data for the selected tenant.</li>
<li>After you approve the {{ stache.config.dev_console_name }} to access the API data for your Blackbaud developer account, the <strong>HTTP request</strong> is populated with the `Authorization:Bearer ` header. This represents the access token for the request.<br />
</li>
<li>After you have a bearer token and configure the values for the URI parameters, click <strong>Send</strong> to submit the request.  The response includes a response status, latency, and content including JSON data for the requested endpoint.<br />

<img alt="Approved Authorization" title="Approved Authorization" src="/assets/img/getting_started_step_4_send.png" >
 </li>
  </ol></div></div>
  
