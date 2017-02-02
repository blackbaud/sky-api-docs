---
layout: layout-sidebar
name: Managing your apps
description: Registering your application and regenerating the client secret
order: 200
published: true
showInNav: true
---

{{ include stache.config.partial_header_edit }}

# {{ name }}

In order to call the {{ stache.config.product_name_short }}, you'll need to register your application. This registration provides a unique set of credentials that your application will use when asking a user for permission to access their organization's Blackbaud data during the <a href="{{ stache.config.guide_web_api_authorization }}" target="_blank">authorization process</a>.

## Register your application

{{ include 'includes/shared/nxt-web-api/registering-your-app/index.md' }}

## Regenerate your secret

If you think your **{{ stache.config.guide_apps_client_secret_name }}** has been compromised, follow these steps to regenerate the value:

1. Go to <strong><a href="{{ stache.config.developer_app_management_url }}" target= "_blank">My Applications</a></strong>.

2. Locate the application in the list.

3. Select the context menu and click **{{ stache.config.guide_apps_client_regenerate_menuitem_name }}**.
    
    ![Regenerate secret][my_apps_regenerate]

4. Select **Show** to display the regenerated secret. Be sure to store the new secret securely.

    ![Regenerate secret][my_apps_regeneratedsecret]

[my_apps_regenerate]: /assets/img/my_applications_regenerate.jpg
[my_apps_regeneratedsecret]: /assets/img/my_applications_regeneratedsecret.jpg

<p class="alert alert-warning"><strong>Important!&nbsp;&nbsp;</strong> Don't forget to update your application to use the regenerated value when requesting access during the <a href="{{ stache.config.guide_web_api_authorization }}" target="_blank">authorization process</a>.</p>

## Activate your application

For your application to successfully access a tenant's data, it must be approved by a tenant administrator. For Blackbaud customers, the tenant administrator is a user within their organization. You need to have the tenant administrator provide approval by activating your application within the Applications area of the product. 

To activate your application in a customer's tenant, have the **tenant administrator** complete the following steps: 

1. Copy the Application ID that you provided to them. 

2. Visit the **Control Panel, Applications** area of the product.

3. Select **Add application**, and paste your Application ID, and select **Save**.

Your application will then appear in the list of activated applications for the tenant.

