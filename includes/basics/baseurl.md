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
        <td class="nowrap">Fundraising</td>
        <td><code class="language-http">{{ stache.config.fundraising_api_suffix }}</code></td>
        <td>Used to manage information within the fundraising hierarchy and related entities such as campaigns, funds, and appeals.</td>
      </tr>
      <tr>
        <td class="nowrap">General Ledger</td>
        <td><code class="language-http">{{ stache.config.gl_api_suffix }}</code></td>
        <td>Used to manage the general ledger, including accounts, projects, and journal entries.</td>
      </tr>
      <tr>
        <td class="nowrap">Gift</td>
        <td><code class="language-http">{{ stache.config.gift_api_suffix }}</code></td>
        <td>Used to manage gift information, including related entities such as acknowledgements, fundraisers, and receipts.</td>
      </tr>
      <tr>
        <td class="nowrap">Opportunity</td>
        <td><code class="language-http">{{ stache.config.opportunity_api_suffix }}</code></td>
        <td>Used to manage opportunity information, including related entities such as opportunity fundraisers and opportunity attachments.</td>
      </tr>
      <tr>
        <td class="nowrap">Treasury</td>
        <td><code class="language-http">{{ stache.config.treasury_api_suffix }}</code></td>
        <td>Used to manage Treasury information, including related entities such as adjustments, checks, and deposits.</td>
      </tr>
    </tbody>
  </table>
</div>

Within each API, you'll find domain-specific endpoints that allow you to access data and perform operations like searching for records, updating information, etc.  The {{ stache.config.api_type_name }} is based on <a href="https://en.wikipedia.org/wiki/Representational_state_transfer" target="_blank">REST</a> principles, where resources are accessed via standard requests to an API endpoint.
