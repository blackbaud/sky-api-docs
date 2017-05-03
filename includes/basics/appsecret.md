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