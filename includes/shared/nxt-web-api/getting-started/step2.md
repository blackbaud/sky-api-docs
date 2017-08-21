<p style="text-align: left;">We require you to have an approved subscription key to a specific {{ stache.config.api_product }} before you can use the {{ stache.config.api_type_name }}. This subscription key is associated with your Blackbaud developer account.</p>
<h3 style="text-align: left;">How to get a subscription key?</h3>
<div class="row">
  <div class="col-md-6" style="text-align: left;">
<ol>
<li>To request a subscription to an {{ stache.config.api_product }}, from the <strong><a href="{{ stache.config.portal_products }}" target="_blank">Products page</a></strong> select <strong>{{ stache.config.api_product_name }}</strong>.</li>
<li>Click <strong>Subscribe</strong>. A confirmation screen appears.</li>
<li>To submit your request, click <strong>Confirm</strong>.</li>
</ol>
<p>Blackbaud approves the subscription requests. We will send you an email notification when your request is approved. After it is approved, you can view the subscription details within your developer <strong><a href="{{ stache.config.portal_profile }}" target="_blank">profile</a></strong>.</p></div>
<div class="col-md-6" style="text-align: left;">

<p><bb-alert bb-alert-type="warning"><strong>Important!</strong> In order to be approved for a subscription key, you must be an authorized user in at least one instance of Raiser's Edge NXT or Financial Edge NXT. This requirement ensures that you have a tenant to make API calls against.</bb-alert></p>


</div></div>

<div class="row">
  <div class="col-md-12" style="text-align: left;">
<h3>About your Subscription</h3>
<p>Your profile provides details about your subscriptions. Each <a href="{{ stache.config.guide_basics_subscription }}"><strong>subscription</strong></a> contains a <strong>Primary key</strong> and a <strong>Secondary key</strong>. You can use either key as the subscription key value for the <code>{{ stache.config.subscription_keyname }}</code> request header in calls to the API.</p>
<img src="/assets/img/getting_started_step_2_subscription.png" >


</div></div>

