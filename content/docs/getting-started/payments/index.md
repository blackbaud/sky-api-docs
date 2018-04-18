---
name: Getting Started with Payments API
description: Obtain the necessary knowledge to make calls to the Payments API using our interactive <%= stache.config.dev_console_name %>
order: 100
layout: layout-tutorial
published: true
back_to_top: true
title: Getting Started with Payments API
sidebarLayoutSecondaryColumn: col-lg-2 col-md-3 col-sm-12 sidebar-tutorial
sidebarLayoutPrimaryColumn: col-lg-8 col-md-8 col-sm-12
bootstrap_container: bg-tutorial
markdown: false
showInNav: false
---

{{ include stache.config.partial_header_comments }}{{ include stache.config.partial_header_edit }}

<section class="section-padding bg-tutorial">
  <div class="text-center">
    <h1 class="tutorial">{{ name }}</h1>

<p class="lead tutorial">To get started using the Payments API, follow this step-by-step guide. After you complete this tutorial, you'll have your Blackbaud developer account, a subscription key, and you'll learn how to try our {{ stache.config.product_name_short }} console.</p>

  <ul class="slide-container">
<li class="slide">
<h2 class="tutorial">Step 1 &#8211; Set up a developer account</h2>
{{ include 'includes/getting-started/step1.md' }}</li>

<li class="slide">
<h2 class="tutorial">Step 2 &#8211; Join the Payments API Preview group</h2>
<p style="text-align: left;">To view and use the Payments API during Closed Beta, you must be a member of the Payments API Preview group and signed in with your Blackbaud developer account. Otherwise, you will see an error page. Contact us to request joining this group. We will reply to confirm when you’ve been added, so you can continue with next steps.</p>
<p style="text-align: left;"><a href="mailto:skyapi@blackbaud.com?subject=Payments%20API%20|%20Request%20to%20join%20Payments%20API%20Preview%20group">Contact us</a> to request joining this group. We will reply to confirm when you’ve been added, so you can continue with next steps.</p></li>

<li class="slide">
<h2 class="tutorial">Step 3 &#8211; Get Payments API subscription keys </h2>
<p style="text-align: left;">You must include a valid API subscription key with each request to the Payments API. This subscription key is associated with your Blackbaud developer account</p>
<div class="row">
  <div class="col-md-6" style="text-align: left;">
<h3>How to get API subscription keys?</h3>
<ol><li>To request a subscription to the Payments API, from the <a href="https://developer.sky.blackbaud.com/products/">Products page</a> select <strong>Payments API Preview</strong>.</li>
<li>Click <strong>Review terms and subscribe</strong>. The SKY API Terms of Use will appear in a pop-up window.</li>
<li>Review and agree to the Terms of Use.</li>
<li>To submit your request, click <strong>Add subscription</strong></li></ol>
<p style="text-align: left;">Blackbaud approves all API subscription requests. We will send you an email notification when your request is approved. After it is approved, you can view the subscription details within your developer <a href="https://developer.sky.blackbaud.com/developer/">profile</a>.</p>

</div></div>

<div class="row">
  <div class="col-md-6" style="text-align: left;">
<h3>About your subscription</h3> 
<p style="text-align: left;">Your developer profile provides details about your API subscriptions. Each <a href="https://apidocs.sky.blackbaud.com/docs/basics/#!#subscription">subscription</a> contains a <strong>Primary key</strong> and a <strong>Secondary key</strong>. You can use either key as the subscription key value for the <code>bb-api-subscription-key</code> request header in calls to the API.</p>
<img src="/assets/img/getting_started_step_2_subscription.png" >

</div></div>
</li>

<li class="slide">
<h2 class="tutorial">Step 4 &#8211; View the Endpoint reference</h2>
<div class="row">
  <div class="col-md-6" style="text-align: left;">
<p style="text-align: left;">Now, you are ready to explore the endpoints available to you.</p>

<ol>
<li>Open the <strong><a href="{{ stache.config.portal_endpoints }}" target="_blank">Endpoint Reference</a></strong> and select <a href="https://developer.sky.blackbaud.com/docs/services/payments">Payments (Beta)</a>. A list of endpoints and operations appears.</li>
<li>Select an endpoint from the list.</li>
<li>Review the information in the reference, including the:<br />
<ul type="disc"><li>Request URL</li>
<li>Request parameters</li>
<li>Request headers</li>
<li>Response codes</li>
<li>Response body</li>
<li>Sample JSON data</li>
<li>Code samples</li>
</ul></li>
</ol>
</div><div class="col-md-6" style="text-align: left;">
<img src="/assets/img/getting_started_step4_payments_api_reference.png">
</div></li>

<li class="slide">
<h2 class="tutorial">Step 5 &#8211; Try it!</h2>
<div class="row">
    <div class="col-md-12" style="text-align: left;">
<p>When you are signed in, you can test the Payments API with the <a href="{{ stache.config.guide_basics_apiconsole }}"><strong>{{ stache.config.dev_console_name }}</strong></a>. </p>


<ol>
<li>From the <a href="https://developer.sky.blackbaud.com/docs/services/payments"><strong>Payments API Endpoint Reference</strong></a>, navigate to the endpoint you'd like to test (for example, <strong>GET Merchant account list</strong>), and click <strong>Try it</strong>. This enables the {{ stache.config.dev_console_name }}.</li>
<li>Under <strong>Query parameters</strong>, enter a sample parameter. For example, enter <code>true</code> for the <code>include_inactive</code> parameter.</li>
<li>Under <strong>Headers</strong>, select the <strong>show/hide</strong> icon in the <code>{{ stache.config.subscription_keyname }}</code> field.  The value reflects one of your Payments API subscription keys.
<p><bb-alert bb-alert-type="info"><strong><em>Note:</em></strong> The  <strong>Request URL</strong> and <strong>HTTP request</strong> change based on the values for the parameter and request header field values.</bb-alert></p></li>

<br />

<li>Under <strong>Authorization</strong>, select <strong>Authorization code</strong> in the <strong>{{ stache.config.portal_auth_dropdown }}</strong> field.<br />
<img title="Authorization Code" alt="Authorization Code" src="/assets/img/getting_started_step4_oauth.png"></li>
<li>The Blackbaud OAuth 2.0 Service displays a <strong>SKY API Console</strong> pop-up window.</li>
 
<li>Select your Blackbaud Merchant Services instance.</li>

<li>Click <strong>Authorize</strong>.</li>
<li>The <strong>HTTP request</strong> is populated with the <code>Authorization:Bearer </code>  header. This represents the access token for the request.<br />
</li>
<li>Click <strong>Send</strong> to submit the API request.</li>
<li>The response includes a status, latency, and content including JSON data for the requested endpoint.</li>
  </ol></div></div>
  
</li>

<li class="slide">
<h2 class="tutorial">Step 6 &#8211; Join the Developer Community</h2>
<div class="row">
  <div class="col-md-6" style="text-align: left;">
<p>Join our <a href="https://community.blackbaud.com/developer">Developer Community</a> to engage with Blackbaud and other developers.</p>
<ol><li>Share feedback about your initial experience, and ask ongoing questions, in the <a href="https://community.blackbaud.com/forums/viewcategory/503">Payments API forum</a>.</li>
<li><a href="https://community.blackbaud.com/mycommunity/myaccount#settings_subscriptions">Subscribe to receive notifications</a> for recent <a href="https://community.blackbaud.com/blogs/69">SKY API Announcements</a> or <a href="https://community.blackbaud.com/forums/viewcategory/425">Developer Discussions</a>.</li>
<li>Submit new <a href="https://community.blackbaud.com/developer/ideas">ideas</a> for how we can improve the Payments API. Vote and comment on existing ideas.</li>
</ol>

</div></div>
</li>

<li class="slide">
<h2 class="tutorial">Step 7 &#8211; Create a Payments API user account</h2>
<div class="row">
  <div class="col-md-6" style="text-align: left;">
<p>The Payments API uses the <a href="https://oauth.net/2/">OAuth 2.0</a> protocol to authorize API requests. This provides a secure mechanism for your application to access Blackbaud Merchant Services customer data and capabilities without exposing user credentials (username/password) to your application. Instead, users must authorize your application to call the API on their behalf. Refer to our <a href="https://apidocs.sky.blackbaud.com/docs/authorization/">Authorization</a> section for more details.</p>
<p>Your organization may wish to create a new, dedicated Blackbaud user account, to be used to authorize your application(s) to make Payments API requests on its behalf. During this Closed Beta phase, this step requires manual coordination with us.</p>
<ol><li><a href="https://signin.blackbaud.com/signin/sign-up">Create a new Blackbaud user account</a> that you will use as your Payments API user.</li>
<li><a href="https://signin.blackbaud.com/signin/">Sign in</a> as your new Payments API user.</li>
<li>While signed in, <a href="https://signin.blackbaud.com/api/user">click here</a> or manually navigate to <a href="https://signin.blackbaud.com/api/user">https://signin.blackbaud.com/api/user</a>. You should see a page that looks like below.<br />
<img title="Authorization Code" alt="Authorization Code" src="/assets/img/getting_started_step7_payments_signin_page.png"></li>
<li>Copy the contents of this page and <a href="mailto:PaymentApiDevSupport@blackbaud.com?subject=Payments%20API%20|%20Request%20to%20create%20Payments%20API%20user">email it to us</a>. We will reply to confirm when your API user has been properly configured, so you can continue with next steps.</li>
</ol>

</div></div>
</li>

<li class="slide">
<h2 class="tutorial">Step 8 &#8211; Next steps</h2>
<div class="row">
  <div class="col-md-6" style="text-align: left;">
<p>Once you’ve gotten started with the Payments API, you can use available resources to build an application using Payments API.</p>
<ol><li>Learn how to <a href="https://apidocs.sky.blackbaud.com/docs/createapp/">create an application</a> with SKY API.<br />
<p><bb-alert bb-alert-type="info"><strong><em>Note:</em></strong> During this Closed Beta phase, you will not be able to complete Step 3 of this tutorial on your own for apps using Payments API. Instead, contact us with your application ID so we can activate it on your behalf.</bb-alert></p></li>
<li>Learn how <a href="https://apidocs.sky.blackbaud.com/docs/authorization/">Authorization</a> works, including the associated <a href="https://apidocs.sky.blackbaud.com/docs/code/auth-code-flow/">tutorials</a> and <a href="https://apidocs.sky.blackbaud.com/docs/code/">code samples</a>.</li>
<li>Subscribe to <a href="https://skyapi.statuspage.io/">SKY API status</a> updates.</li>
</ol>

</div></div>
</li>

</ul>
{{ include stache.config.partial_disqus }}
