All endpoints within the {{ stache.config.api_type_name }} are located at the following base URL:

<pre><code class="language-http">{{ stache.config.api_proxy_base_url }}</code></pre>

Within this address, you'll find APIs (collections of related endpoints) covering the broad functional areas within the {{ stache.config.api_type_name }}.  For example, we currently surface the following APIs:

<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
  		<tr>
  			<th>API</th>
  			<th>Location</th>
  			<th>Purpose</th>
  		</tr>
  	</thead>
  	<tbody>
      <tr>
        <td>Accounts Payable</td>
        <td><code class="language-http">{{ stache.config.accounts_payable_suffix }}</code></td>
        <td>Used to manage accounts payable, including vendors and invoices.</td>
      </tr>
      <tr>
        <td>Constituent</td>
        <td><code class="language-http">{{ stache.config.constituent_api_suffix }}</code></td>
        <td>Used to manage constituent information, including related entities such as addresses, phones, emails, and notes.</td>
      </tr>
      <tr>
        <td class="nowrap">General Ledger</td>
        <td><code class="language-http">{{ stache.config.gl_api_suffix }}</code></td>
        <td>Used to manage the general ledger, including accounts, projects, and journal entries.</td>
      </tr>
    </tbody>
  </table>
</div>

Within each API, you'll find domain-specific endpoints that allow you to access data and perform operations like searching for records, updating information, etc.  The {{ stache.config.api_type_name }} is based on <a href="https://en.wikipedia.org/wiki/Representational_state_transfer" target="_blank">REST</a> principles, where resources are accessed via standard requests to an API endpoint.