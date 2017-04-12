<div class="row">
    <div class="col-md-12" style="text-align: left;">
        <p>Once your application has been activated, you can then obtain consent from an authenticated user. Upon consent, an OAuth 2.0 access token will be issued to your application in the form of a JSON web token, or JWT. The token should be included on every API request as part of the standard Authorization header. It is tied to the authenticated user's account and organization, which means that your application can only access data to which the authenticated user can access within the system.</p>
        <p><a href="{{ stache.config.guide_web_api_authorization }}" target="_blank">Learn how to authorize API requests!</a></p>
    </div>
</div>