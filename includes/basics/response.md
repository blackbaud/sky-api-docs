The {{ stache.config.api_type_name }} uses the following set of standard HTTP response status codes, as defined in <a href="https://www.ietf.org/rfc/rfc2616.txt" target="_blank">RFC 2616</a> and <a href="https://www.ietf.org/rfc/rfc6585.txt" target="_blank">RFC 6585</a>.  Response codes in the 4xx range indicate a problem with your request, while response codes in the 5xx range indicate a problem on our end.

You can view the <a href="{{ stache.config.guide_web_api_authorization }}/common-auth-issues" target="_blank">common authentication issues</a> page for additional guidance, and if you are experiencing a problem, feel free to review your support options in our [Support]({{ stache.config.support }}) area.  You can also check the check the <a href="{{ stache.config.support_issues }}" target="_blank">Issues</a> page to see if we are experiencing any problems on our end.

For response codes in the 4xx or 5xx range (which indicate failures), the response body may contain more details on why the request failed.

### Status codes

<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Status code</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>200 OK</td>
        <td>The request was successful, and you can read the results from the body and headers of the response.  For operations that create new resources, you'll typically find the ID of the newly created resource in the response body.  For simplicity, we don't distinguish between successful calls that create, update, or delete resources.</td>
      </tr>
      <tr>
        <td>400	Bad Request</td>
        <td>The request failed due to an error on your part, such as a syntax error or malformed content in the request body.</td>
      </tr>
      <tr>
        <td>401	Unauthorized</td>
        <td>The request failed because the required authorization was not satisfied.  This could be because you provided an invalid subscription key (see <a href="#subscription" class="smooth-scroll">subscription</a>), or an invalid or expired access token (see <a href="{{ stache.config.guide_web_api_authorization }}/common-auth-issues" target="_blank">common authentication issues</a>).
        </td>
      </tr>
      <tr>
        <td>403	Forbidden</td>
        <td>The request failed because the user in whose context the API is being called either does not have permission to perform the operation itself, or does not have permission to access the data being requested.  You may also see this response when the API quota associated with your subscription has been met (see <a href="#quotas" class="smooth-scroll">quota</a>).</td>
      </tr>
      <tr>
        <td>404	Not Found</td>
        <td>The requested resource could not be found.  You may be trying to access a record that does not exist, or you may have supplied an invalid URL.</td>
      </tr>
      <tr>
        <td>415 Unsupported Media Type</td>
        <td>The request failed because the correct `Content-Type` header was not provided on the request. For endpoints that accept JSON in the request body, you must use the `Content-Type` header `application/json`.</td>
      </tr>
      <tr>
        <td>429	Too Many Requests</td>
        <td>You will see this response if you've exceeded the rate limit associated with your API subscription (see <a href="#rate-limits" class="smooth-scroll">rate limits</a>).</td>
      </tr>
      <tr>
        <td class="nowrap">500 Internal Server Error</td>
        <td>An unexpected error has occurred on our side.  You should never receive this response, but if you do please let us know and we'll fix it.</td>
      </tr>
      <tr>
        <td>503	Service Unavailable</td>
        <td>One or more API services are not available.  This is usually a temporary condition caused by an unexpected outage or due to planned downtime. We'll be proactive about broadcasting outages or downtime on the <a href="{{ stache.config.support_issues }}" target="_blank">Issues</a> page, so check there for more information.</td>
      </tr>
    </tbody>
  </table>
</div>