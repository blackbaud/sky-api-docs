<div class="row">
<div class="col-md-12" style="text-align: left;">

{{# markdown }}

The access token allows you to make requests to the {{ stache.config.api_type_name }} on a behalf of a user. When calling the API, provide the access token using the standard `Authorization` request header with a value of `Bearer`, followed by a space and the `access_token` value.

You will also need to provide your subscription key to the {{ stache.config.api_type_name }} via the `bb-api-subscription-key` header.  You can use either the primary or the secondary key (both are equally functional), and both can be found on your <a href="{{ stache.config.portal_profile }}" target="_blank">developer profile</a> page.

For more information on providing these headers, see <a href="{{ stache.config.guide }}basics#request-headers" target="_blank">request headers</a>.

### Sample Request

<pre><code class="language-http">GET {{ stache.config.resource_url }}/v1/constituents/280 HTTP/1.1
Host: {{ stache.config.resource_hostname }}
Authorization: Bearer eyJ0eXAiOiJKV1...CTtP0CQ
bb-api-subscription-key: 77f137116...480d633
</code></pre>

{{/ markdown}}

</div></div>