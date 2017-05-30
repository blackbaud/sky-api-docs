Many endpoints in the {{ stache.config.api_type_name }} return a <a href="{{ stache.config.constituent_entity_reference }}#Collection" target="_blank">collection</a> of records.  In some cases (such as the <a href="{{ stache.config.portal_endpoints_constituent_get_list }}" target="_blank">Constituents (Get List)</a> endpoint), we also support the concept of pagination, where instead of returning all of the results in a single response, we return them in smaller sets called _pages_.  This approach allows us to keep the performance high on the server, and also minimizes the size of our responses on the wire by breaking them into smaller, more manageable blocks.

### limit and offset

When an endpoint supports pagination, it will accept `limit` and `offset` query string parameters to allow you to control the paging.  The `limit` parameter represents the number of records to return (page size), while the `offset` parameter represents the number of records to skip.

Here's an example request for returning the first 50 constituents via the <a href="{{ stache.config.portal_endpoints_constituent_get_list }}" target="_blank">Constituents (Get List)</a> endpoint and the `limit` query string parameter:

<pre><code class="language-http">GET {{ stache.config.resource_url }}{{ stache.config.constituent_api_suffix }}?limit=50</code></pre>

To retrieve the next 50 records, include `offset=50` to skip the first 50 records:

<pre><code class="language-http">GET {{ stache.config.resource_url }}{{ stache.config.constituent_api_suffix }}?limit=50&offset=50</code></pre>

To retrieve the next 50 records, include `offset=100` to skip the first 100 records:

<pre><code class="language-http">GET {{ stache.config.resource_url }}{{ stache.config.constituent_api_suffix }}?limit=50&offset=100</code></pre>

Note that `offset` numbering is zero-based, and that omitting the `offset` parameter will return the first _n_ elements (where _n_ represents the `limit` parameter). Refer to the endpoint documentation for specifics about any default/maximum allowed page size values.

### next_link

Some paginated endpoints may include a hypermedia link that can be used to fetch the next page of results.  This value can be found in the `next_link` property of the <a href="{{ stache.config.portal }}constituent-entity-reference#Collection" target="_blank">collection</a> response.