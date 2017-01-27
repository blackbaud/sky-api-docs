<p>We require you to have an approved subscription key to a specific {{ stache.config.api_product }} before you can use the {{ stache.config.api_type_name }}.</p>
<p>This subscription key is associated with your Blackbaud developer account.</p>

<h3>How to get a subscription key?</h3>

1. To request a subscription to an {{ stache.config.api_product }}, from the <strong><a href="{{ stache.config.portal_products }}" target="_blank">Products page</a></strong> select **{{ stache.config.api_product_name }}**.
2. Click **Subscribe**. A confirmation screen appears.
3. To submit your request, click **Confirm**.

Blackbaud approves the subscription requests. We will send you an email notification when your request is approved. After it is approved, you can view the subscription details within your developer <strong><a href="{{ stache.config.portal_profile }}" target="_blank">profile</a></strong>.

<p class="alert alert-warning"><strong>Important!</strong> In order to be approved for a subscription key, you must be an authorized user in at least one instance of Raiser's Edge NXT or Financial Edge NXT. This requirement ensures that you have a tenant to make API calls against.</p>

Your profile provides details about your subscriptions. Each <a href="{{ stache.config.guide_basics_subscription }}"><strong>subscription</strong></a> contains a **Primary key** and a **Secondary key**. You can use either key as the subscription key value for the `{{ stache.config.subscription_keyname }}` request header in calls to the API:

  ![subscription keys][step-2-subscription]

  [step-2-subscription]: /assets/img/getting_started_step_2_subscription.png


