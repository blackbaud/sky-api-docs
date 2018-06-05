The following request headers are required when calling the {{ stache.config.api_type_name }}:

- `Bb-Api-Subscription-Key` - This is your API subscription key, which represents Blackbaud's permission to you to call the {{ stache.config.api_type_name }}.  You can use either the primary or the secondary key associated with your subscription (both are equally functional).  For more information on obtaining an API subscription, see <a href="#subscription" class="smooth-scroll">subscription</a>.
- `Authorization` - This value is an OAuth 2.0 Bearer token, which is obtained during the <a href="{{ stache.config.guide_web_api_authorization }}" target="_blank">authorization process</a> and represents a Blackbaud customer's permission for you to access their data.  The expected format of this header value is "Bearer <i>token</i>" (note the space in the middle).

For endpoints that accept JSON in the request body, the `Content-Type` request header with a value of `application/json` is required.