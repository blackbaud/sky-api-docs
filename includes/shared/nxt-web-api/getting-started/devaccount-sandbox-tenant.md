<p><a href="#" data-toggle="modal" data-target="#consolesecurity"><strong>How does the {{ stache.config.dev_console_name }} security work?</strong></a>
</p>


<div class="modal fade" role="dialog" id="consolesecurity" tab-index="-1" aria-labelledby="MyModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    <div class="modal-header">{{ stache.config.dev_console_name }} Security</div>
     <div class="modal-body">
<p>When your subscription was approved, Blackbaud added your developer account as a user within the {{ stache.config.sandbox_name }} tenant. This sandbox tenant represents a sample database that you can access through the {{ stache.config.dev_console_name }}.</p>
<p>We use OAuth 2.0 to secure the API. This ensures that only valid users have access and that they can only access resources to which they are entitled.</p>

<p>Before the {{ stache.config.dev_console_name }} sends the request to the endpoint, it must obtain authorization from a valid user (you) to access the data within the {{ stache.config.sandbox_name }} tenant.</p>
</div></div></div></div>

 
