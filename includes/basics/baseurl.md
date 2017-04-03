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
        <td>Manages accounts payable, including vendors and invoices.</td>
      </tr>
      <tr>
        <td>Constituent</td>
        <td><code class="language-http">{{ stache.config.constituent_api_suffix }}</code></td>
        <td>Manages constituent information, including related entities such as addresses, phones, emails, and notes.</td>
      </tr>
      <tr>
        <td class="nowrap">Fundraising (Beta)</td>
        <td><code class="language-http">{{ stache.config.fundraising_api_suffix }}</code></td>
        <td>Manages information within the fundraising hierarchy and related entities, such as campaigns, funds, and appeals.</td>
      </tr>
      <tr>
        <td class="nowrap">General Ledger</td>
        <td><code class="language-http">{{ stache.config.gl_api_suffix }}</code></td>
        <td>Manages the general ledger, including accounts, projects, and journal entries.</td>
      </tr>
      <tr>
        <td class="nowrap">Gift (Beta)</td>
        <td><code class="language-http">{{ stache.config.gift_api_suffix }}</code></td>
        <td>Manages gift information, including related entities such as acknowledgements, fundraisers, and receipts.</td>
      </tr>
      <tr>
        <td class="nowrap">Peer-to-Peer (Beta)</td>
        <td><code class="language-http">{{ stache.config.peer_to_peer_api_suffix }}</code></td>
        <td>Creates supporter pages and query campaigns, donors, donations, and teams.</td>
      </tr>
    </tbody>
  </table>
</div>

