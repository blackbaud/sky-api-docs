The {{ stache.config.dev_console_name }} is a Blackbaud application built into the <strong><a href="{{ stache.config.portal_endpoints }}" target="_blank">Endpoint Reference</a></strong> that can be used to test the {{ stache.config.product_name_short }}. Before jumping in to build your own applications, we recommend you add the {{ stache.config.dev_console_name }} to your or your customer's tenant to aid with testing and development. 

To access a tenant's data, the {{ stache.config.dev_console_name }}, must be approved by a tenant administrator. For Blackbaud customers, a tenant administrator is a user within the organization that is part of the Supervisor security group. This may include Partners or API subscribers that have their own dedicated tenant, or are Supervisor users in their customer's tenant. Administrators provide approval for applications, including the {{ stache.config.dev_console_name }}, by activating the application within the Applications area of the product.

To activate the {{ stache.config.dev_console_name }}, the tenant administrator needs to do the following:

1. Copy the {{ stache.config.dev_console_name }} {{ stache.config.guide_apps_client_id_name }}:<pre><code>A056CA6B-A3A8-4AC7-B325-997666306E52</code></pre>

2. Visit the **Control Panel, Applications** area of the product.

3. Select **Add application**, paste the {{ stache.config.dev_console_name }}  {{ stache.config.guide_apps_client_id_name }}, and select **Save**.

Once added, The {{ stache.config.dev_console_name }} will appear in the list of activated applications for the tenant.

  <p class="alert alert-warning"><strong>Important!&nbsp;&nbsp;</strong>The same process can be followed to activate additional applications for your tenant. Simply substitute the application ID for the one provided in the <a href="{{ stache.config.developer_app_management_url }}" target= "_blank"><strong>My Applications</strong></a> area of your Developer Account to add your own application, or use the application ID provided to you by a Partner or third party developer that you know and trust. </p>