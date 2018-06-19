---
layout: layout-sidebar
showBreadcrumbs: true
back_to_top: true
order: 30
name: Transaction Parameters
description: Parameters for use when creating a Blackbaud Checkout transaction.
published: true
icon: tags
---

# Transaction parameters
The following parameters can be included either in a JSON object passed to the [Checkout transaction](../supported-transactions/) or by designating inputs on the form with the `data-checkout-field` attribute.

<div class="table-responsive">
    <table class="table table-striped table-hover table-bordered">
        <thead>
            <tr>
                <th>Parameter</th>
                <th>Type</th>
                <th>Required for</th>
                <th>Optional for</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
        {{#each transaction-params.Parameters}}

            <tr>
                <td>{{ Name }}</td>
                <td>{{ Type }}</td>
                <td>{{{ getFormattedTransList RequiredFor }}}</td>
                <td>{{{ getFormattedTransList OptionalFor }}}</td>
                <td>{{ Description }}</td>
            </tr>

        {{/each}}
        </tbody>
    </table>
</div>

### Examples

#### JSON object
<pre>
<code class="language-javascript">
var data = {
    'Amount': 10.00,
    'BillingAddressCity': 'Charleston',
    'BillingAddressCountry': 'US',
    'BillingAddressEmail': 'test@blackbaud.com',
    'BillingAddressLine': '2000 Daniel Island Drive',
    'BillingAddressPhone': '555-555-5555',
    'BillingAddressPostCode': '29492',
    'BillingAddressState': 'SC',
    'Cardholder': 'John Smith',
    'CardToken': 'b8569426-fb4b-45b8-9305-d6352a2a60db',
    'ClientAppName': 'Blackbaud Checkout Sample Data',
    'Description': 'Support our cause!',
    'Key': '18a890b9-1554-4727-873c-8f133d00cb17',
    'MerchantAccountId': 'f086c1c9-5512-4386-a9a4-ecc6fe755f64',
    'Note': 'Message for internal use',
    'UseCaptcha': false
};

Blackbaud_OpenPaymentForm(data);
</code>
</pre>

<br />