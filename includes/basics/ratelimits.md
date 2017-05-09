Calls to the {{ stache.config.api_type_name }} are subject to the rate limit associated with your API subscription (see <a href="#subscription" class="smooth-scroll">subscription</a>).

Rate limits help us to keep our backend servers from being overloaded with too many requests in a short period of time by limiting the number of calls you can make within that period.  When your rate limit is exceeded, you'll receive a `429 - Too Many Requests` response from the API, and the body of the response will indicate how long you must wait before making the next call (you can also inspect the `Retry-After` header which will contain the number of seconds to wait):

<pre><code class="language-http">Retry-After: 1
Date: Tue, 06 Dec 2016 19:47:44 GMT
Content-Length: 83
Content-Type: application/json

{
  "statusCode": 429,
  "message": "Rate limit is exceeded. Try again in 1 second."
}</code></pre>

<p class="alert alert-info">The current rate limit for the {{ stache.config.api_product_name }} is 5 calls per second.</p>
