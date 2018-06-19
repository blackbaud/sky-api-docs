---
layout: layout-showcase
name: Checkout Integration Guide
description: A guide to setting up and using Blackbaud Checkout through the Payments API.
icon: fa fa-github fa-4x
showInNav: false
showInHeader: true
showInFooter: false
showBreadcrumbs: true
title: Checkout Integration Guide
---

# Integration Guide

## Blackbaud Checkout overview

Blackbaud Checkout is a payment form intended to provide a simplified payment experience for consuming applications and donors.

Blackbaud Checkout works by taking some basic information from your application, building a form to collect payment information, and returning a token which is used to finalize the transaction. This keeps sensitive credit card information securely on the BBSP servers. 

<img src="/assets/img/checkout_example.png" class="img-responsive"></p>

Below is the overall workflow for using Blackbaud Checkout:

1. The donor visits your page on your website that you have configured to integrate with Blackbaud Checkout.
2. The customer takes an action, such as clicking a button, determined by where in your code you call the `Blackbaud_OpenPaymentForm()` method, to make a payment.
3. The Blackbaud Checkout payment form renders on top of your page, and the donor can securely process their payment.
4. A transaction token is returned in a custom event that indicates a successful transaction. This is handled by subscribing to the [checkoutComplete](#charge-transaction) event.
5. If specified, the client form will be submitted to the server through the [form submission](#form-submission). 
6. You use the transaction token to call the [ChargeTransaction](../api/#chargetransaction) endpoint to finalize the payment.

## Prerequisites

To use Blackbaud Checkout through the Payments API, an organization will need:
* Access to the Payments API.
* A valid Blackbaud Merchant Service (BBMS) account. (See [MerchantAccountList](https://developer.sky.blackbaud.com/docs/services/payments/operations/merchantaccount_getmerchantaccountlist))
* To get their public key. (See [PublicKey]())

## Configuration
Two options are available to integrate with Blackbaud Checkout. We provide a [standard workflow](#standard-workflow) and a [preloading workflow](#preloading-the-checkout-form).


The [standard workflow](#standard-workflow) uses one public method to validate the transaction details that are provided by an integrating application and to overlay the Checkout payment form. This workflow is recommended for a back office user who will use this form to enter the data for a transaction on behalf of a donor.

The [preloading workflow](#preloading-the-checkout-form) uses a public method to preload data on page load, and to validate the preloaded transaction data. Then, another public method is called to display the Checkout form. This improves the perceived performance of the Checkout form. We recommend this method for direct donors in an online giving scenario. The preloading feature would not be useful for a back office user because they cannot take advantage of the preloading on page load. For example, if the user is a gift officer that is processing a donor's mailed in form, they would only preload data for the first transaction. Then, when they coninue to enter transaction details for other transactions, they would do so without refreshing or reloading the page, hence, not gaining the benefit of the preloading workflow.

### Standard workflow
1. Include the `bbCheckout.2.0.js` script on your page. This script should be included just before the closing <code>&lt;body></code> tag of your page.

	<pre>
	<code class="language-html">
	&lt;script src='https://payments.blackbaud.com/Checkout/bbCheckout.2.0.js'></script>
	</code>
	</pre>

2. Create a JSON object that contains your transaction parameters. You will need the BBPS account's `public key` and `merchant account ID`. The public key is a unique ID that identifies the organization communicating with BBSP. The merchant account ID identifies which account should be used to process the payment. For more information on how to retrieve these keys see the [PublicKey](../api/#getpublickey) and [MerchantAccountList](https://developer.sky.blackbaud.com/docs/services/payments/operations/merchantaccount_getmerchantaccountlist) endpoints.

	<pre>
	<code class="language-javascript">
	var transactionData = {
		'Key': 'cf3cd5cc-43ef-4f89-9170-03c4fc55be61',
		'MerchantAccountId': 'f086c1c9-5512-4386-a9a4-ecc6fe755f64',
		'Amount': 10.00,
		'ClientAppName': 'Blackbaud Checkout Sample Data',
	};
	</code>
	</pre>

3. When you are ready to open the payment form, call the corresponding [payment method](#payment-methods) by passing in your transaction configuration object.

	<div class="alert alert-info">
	Code samples below use the <code>Blackbaud_OpenPaymentForm()</code> function for demonstration purposes, but other payment options are available. View [Payment Methods](#payment-methods) below for more options.
	</div>

	<pre>
	<code class="language-javascript">
	Blackbaud_OpenPaymentForm(transactionData); // credit card transaction
	</code>
	</pre>

### Preloading workflow
Blackbaud Checkout supports a preloading workflow that reduces the display time of Checkout form. 

The difference between this and the standard workflow is that Blackbaud Checkout preloads the transaction data the moment the integrating application's page finishes loading.  As soon as the user lands on the application's page, we call `Blackbaud_Init()`  to preload the  data. Then when we are ready to display the Checkout form, we call `Blackbaud_Open()`. This approach decreases the perceived loading time of Checkout.


1. Include the `bbCheckout.2.0.js` script on your page (same as in the standard workflow). This script should be included just before the closing <code>&lt;body></code> tag of your page.

	<pre>
	<code class="language-html">
	&lt;script src='https://payments.blackbaud.com/Checkout/bbCheckout.2.0.js'></script>
	</code>
	</pre>

2. Call the public function `Blackbaud_Init()` with the following **required** parameters. 

	<table class="table table-striped table-hover table-bordered">
			<thead>
				<tr>
					<th style="width:150px;">Parameter</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Key</td>
					<td>The client's unique public key. See the [PublicKey]() endpoint for additional information.</td>
				</tr>
				<tr>
					<td>MerchantAccountID</td>
				   <td>The ID of the merchant account to process the transaction. See the [MerchantAccountList](https://developer.sky.blackbaud.com/docs/services/payments/operations/merchantaccount_getmerchantaccountlist) endpoint for additional information.</td>
				</tr>
				<tr>
					<td>ClientAppName</td>
					<td>The description of the calling application. This tracks the application that the payment was made through.</td>
				</tr>
				<tr>
					<td>TransactionType</td>
					<td>The type of transaction. Possible values: `card_not_present`, `card_present`, `direct_debit`, `store_card`, `update_card`, `store_direct_debit`,`update_direct_debit`.
					<br><br>
					 Default value: `card_not_present`.</td>            
				</tr>
			</tbody>
		</table>
    
	*Note that `Blackbaud_Init()` is essentially the same as `Blackbaud_OpenPaymentForm()` from above, however it does not display the Checkout form once it completes. Also, instead of calling the corresponding [payment method](#payment-methods), you define `TransactionType` as a parameter when calling `Blackbaud_Init()`.*

	<pre>
	<code class="language-javascript">
	// loads the Checkout form in the background, but will not display it        
	Blackbaud_Init({
		Key: "8a2e97a9-c6b1-4d7e-a443-909f74d6a07c",
		MerchantAccountId: "5a2e97a9-c6b1-4d7e-a443-909f74d6a07c",
		ClientAppName: "Childrens Charity",
		TransactionType: "Card_Not_Present"
	});
	</code>
	</pre>

3. Checkout accepts some optional configurations that can be included as part of the `Blackbaud_Init()`:
	* `CardToken`
	* [Digital wallet configurations](#digital-wallets)
		* `UseVisaCheckout`
		* `UseApplePay`
		* `UseApplePayDonateButton`
		* `UseMasterpass`
	* [Theme customizations](#theme-customization)
		* `PrimaryColor`
		* `SecondaryColor`
		* `FontFamily`
		* `FontColor`
	* Selections for required fields 
		* `IsEmailRequired`
		* `IsNameRequired`
		* `DevicePartnerCode`
		* `Disable3DS`
		* `UseCaptcha`
		* `IsNameVisible`
	* `Description`
	* `Note`

	<pre>
	<code class="language-javascript">
	// loads the Checkout form in the background, but will not display it        
	Blackbaud_Init({
		Key: "8a2e97a9-c6b1-4d7e-a443-909f74d6a07c",
		MerchantAccountId: "5a2e97a9-c6b1-4d7e-a443-909f74d6a07c",
		ClientAppName: "Childrens Charity",
		TransactionType: "Card_Not_Present",
		UseVisaCheckout: false,
		UseMasterpass: true
	});
	</code>
	</pre>

	For more information visit the [transaction parameters](../transaction-parameters) page.

4. When you are ready to display the Checkout overlay, call the `Blackbaud_Open()` function. This method will update the payment form UI with transaction data provided by the donor, and then launch the Checkout form. The following fields are available for update after the Checkout form has been preloaded. 

	* `Amount`, *Required*
	* `BillingAddressFirstName`
	* `BillingAddressLastName`
	* `BillingAddressEmail`
	* `BillingAddressLine`
	* `BillingAddressCity`
	* `BillingAddressState`
	* `BillingAddressCountry`
	* `BillingAddressPostCode`
	* `BillingAddressPhone`
	* `CardHolder`

	Integrating apps can display the form by simply providing the amount.

	<pre>
	<code class="language-javascript">
	Blackbaud_Open({
		Amount: '12.00'
	});
	</code>
	</pre>
	Integrating apps can also provide updated donor information along with the amount. 
	<pre>
	<code class="language-javascript"> 
	Blackbaud_Open({
		Amount: '12.00',
		BillingAddressEmail: 'test@test.com',
		BillingAddressLine: '123 Test Street',
		BillingAddressCountry: 'US',
		BillingAddressCity: 'Slothtown',
		BillingAddressPostCode: '22222',
		BillingAddressState: 'SC',
		Cardholder: 'John Doe'
	});     
	</code>
	</pre>

### Payment methods
Blackaud Checkout supports the following transaction types: 

    * [Card Not Present Payment]()
	* [Card Present Payment]()
	* [Direct Debit Payment]()
	* [Store Card Info]()
	* [Update Card Info]()
	* [Store Direct Debit Info]()
	* [Update Direct Debit Info]()

For more information, see [supported transactions](../supported-transactions/).

### Form submission 
If your page uses a `<form>` element and you would like Checkout to trigger the form submission, simply add the `data-formtype="bbCheckout"` attribute to your `<form>` tag:
<pre>
<code class="language-html">
    &lt;form action="/" method="post" data-formtype="bbCheckout">&lt;/form>
</code>
</pre>

By default, Blackbaud Checkout will not auto-submit a form without this attribute.
 
### Error handling
Once the client form is configured and the payment method is invoked, the Checkout form is displayed if there is no error. If Checkout encounters an error, it triggers a `checkoutError` event that contains an error message and numeric code. 

    <table class="table table-striped table-hover table-bordered">
        <thead>
            <tr>
                <th>Error Code</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1001</td>
                <td>General network failure</td>
            </tr>
              <tr>
                <td>1003</td>
                <td>Missing BBSP Public Key</td>
            </tr>
            <tr>
                <td>1004</td>
                <td>Required field is either missing or invalid. Review the [transaction parameters](../transaction-parameters) to view required fields by transaction type.</td>
            </tr>
              <tr>
                <td>1005</td>
                <td>Network failure reported by Checkout endpoint</td>
            </tr>
              <tr>
                <td>1006</td>
                <td>Unsupported browser. Blackbaud Checkout is tested against Internet Explorer 10 and above, the latest versions of Mozilla Firefox, Google Chrome and Safari. For mobile devices, Safari on iOS 8.4.1 and above and Google Chrome on Android 6.0.1 and above. Additional browsers may be supported, but are not currently part of our testing plan.</td>
            </tr>
        </tbody>
    </table>


Calling applications can handle errors by subscribing to the `checkoutError` event and parsing the response parameters. 

<pre>
<code class="language-javascript">
document.addEventListener('checkoutError', function (event) {
    console.log('errorText: ', event.detail.errorText);
    console.log('errorCode: ', event.detail.errorCode);
});
</code>
</pre>

## Code samples 

### Code sample for standard workflow

<pre>
<code class="language-html">
    &lt;!DOCTYPE html>
    &lt;html>
    &lt;head>
        &lt;meta charset="utf-8" />
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" />
        &lt;meta http-equiv="X-UA-Compatible" content="IE=Edge" />
        &lt;title>Blackbaud Checkout Demo &lt;/title>
    &lt;/head>

    &lt;body>
        &lt;h1>Blackbaud Checkout Demo&lt;/h1>
        Please select an amount:
        &lt;select id="amount">
            &lt;option value="25">$25&lt;/option>
            &lt;option value="50">$50&lt;/option>
            &lt;option value="100">$100&lt;/option>
        &lt;/select>
        &lt;button id="donate-now">Donate now!&lt;/button>

        &lt;script>
            document.addEventListener('DOMContentLoaded', function() {

                // create the transaction object
                let transactionData = {
                    Key: '45b85a1c-e407-41f3-8673-24b4d8975a95',
                    MerchantAccountId: '5a2e97a9-c6b1-4d7e-a443-909f74d6a07c',
                    ClientAppName: 'Demo Charity'
                };

                document.getElementById('donate-now').addEventListener('click', function(e) {
                    e.preventDefault();

                    // append any donor-entered information to the transaction obejct
                    transactionData.Amount = document.getElementById('amount').value;

                    // call the Checkout method to display the payment form 
                    Blackbaud_OpenPaymentForm(transactionData);
                });

                document.addEventListener('checkoutReady', function() {
                    // handle Ready event
                });

                document.addEventListener('checkoutLoaded', function() {
                    // handle Loaded event
                });

                document.addEventListener('checkoutCancel', function() {
                    // handle Cancel event
                });

                document.addEventListener('checkoutComplete', function(e) {
                    // handle Complete event 
                    console.log('transaction token: ', e.detail.transactionToken);
                });

                document.addEventListener('checkoutError', function(e) {
                    // handle Error event 
                    console.log('error text: ', e.detail.errorText);
                    console.log('error code: ', e.detail.errorCode);
                });
            });
        &lt;/script>
        
        &lt;script src="https://payments.blackbaud.com/Checkout/bbCheckout.2.0.js">&lt;/script>
    &lt;/body>
    &lt;html>
</code>
</pre>

### Code sample for preloading workflow

<pre>
<code class="language-html">
&lt;!DOCTYPE html>
&lt;html>
&lt;head>
    &lt;meta charset="utf-8" />
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" />
    &lt;meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    &lt;title>Blackbaud Checkout Demo&lt;/title>
&lt;/head>

&lt;body>
    &lt;h1>Blackbaud Checkout Demo&lt;/h1>
    &lt;p>
        &lt;input id="cardHolder" type="text" placeholder="Name" /> &lt;br />
        &lt;input id="email" type="text" placeholder="Email" />&lt;br />
        &lt;input id="address" type="text" placeholder="Address" />&lt;br />
        &lt;input id="city" type="text" placeholder="City" />&lt;br />
        &lt;input id="state" type="text" placeholder="State" />&lt;br />
        &lt;input id="zip" type="text" placeholder="Zip" />&lt;br />
        &lt;input id="country" type="text" placeholder="Country" />&lt;br />
    &lt;/p>

    Please select an amount:
    &lt;select id="amount"> 
        &lt;option value="25">$25&lt;/option> 
        &lt;option value="50">$50&lt;/option> 
        &lt;option value="100">$100&lt;/option> 
    &lt;/select>
    &lt;button id="donate-now">Donate now!&lt;/button>

    &lt;script>
        document.addEventListener('DOMContentLoaded', function() {


            // create the transaction object 
            let transactionData = {
                Key: '45b85a1c-e407-41f3-8673-24b4d8975a95',
                MerchantAccountId: '5a2e97a9-c6b1-4d7e-a443-909f74d6a07c',
                ClientAppName: 'Demo Charity',
                TransactionType: 'card_not_present'
            };

            // load the payment form in the background 
            Blackbaud_Init(transactionData);

            document.getElementById('donate-now').addEventListener('click', function(e) {
                e.preventDefault();

                // append any donor-entered information to the transaction obejct 
                transactionData.Amount = document.getElementById('amount').value;
                transactionData.Cardholder = document.getElementById('cardHolder').value;
                transactionData.BillingAddressEmail = document.getElementById('email').value;
                transactionData.BillingAddressLine = document.getElementById('address').value;
                transactionData.BillingAddressCity = document.getElementById('city').value;
                transactionData.BillingAddressState = document.getElementById('state').value;
                transactionData.BillingAddressPostCode = document.getElementById('zip').value;
                transactionData.BillingAddressCountry = document.getElementById('country').value;

                // display the payment form  
                Blackbaud_Open(transactionData);
            });

            document.addEventListener('checkoutReady', function() {
                // handle Ready event 
            });

            document.addEventListener('checkoutLoaded', function() {
                // handle Loaded event 
            });

            document.addEventListener('checkoutCancel', function() {
                // handle Cancel event 
            });

            document.addEventListener('checkoutComplete', function(e) {
                // handle Complete event 
                console.log('transaction token: ', e.detail.transactionToken);
            });

            document.addEventListener('checkoutError', function(e) {
                // handle Error event 
                console.log('error text: ', e.detail.errorText);
                console.log('error code: ', e.detail.errorCode);
            });
        });
    &lt;/script>

    &lt;script src="https://payments.blackbaud.com/Checkout/bbCheckout.2.0.js">&lt;/script>
&lt;/body>
&lt;html>
</code>
</pre>

## Mobile support
Blackbaud Checkout supports mobile devices through responsive design, but the underlying page that launches Checkout can affect its display. To ensure proper rendering, we recommend the following:
* Web pages integrating with Blackbaud Checkout should include the appropriate meta tags for responsive design.

	<pre>
	<code class="language-html">
	&lt;meta name="viewport" content="width=device-width, initial-scale=1" />
	</code>
	</pre>

* Web pages integrating with Blackbaud Checkout should disable vertical scrolling when loading the Checkout form. This prevents additional scrollbars from being added to the UI and potentially confusing users.


## Theme customization
Blackbaud Checkout allows customization of certain aspects of the Checkout form.

    <table class="table table-striped table-hover table-bordered">
        <thead>
            <tr>
                <th style="width:150px;">Options</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Primary Color</td>
                <td>The color for the buttons, footer, field highlights, links, and loader image.</td>
            </tr>
            <tr>
                <td>Secondary Color</td>
                <td>The background color for validation errors.</td>
            </tr>
            <tr>
                <td>Font Family</td>
                <td>The font for the header text, footer text, and all content except the text in form fields.</td>
            </tr>
             <tr>
                <td>Font Color</td>
                <td>The color of the font when displayed on top of the primary and secondary colors.</td>
            </tr>
            
        </tbody>
    </table>

<pre>
<code class="language-javascript">
var data = {
    'Key' : 'cf3cd5cc-43ef-4f89-9170-03c4fc55be61',
    'MerchantAccountId': 'f086c1c9-5512-4386-a9a4-ecc6fe755f64',
    'Amount': 10.00,
    'ClientAppName': 'Blackbaud Checkout Sample Data',
    'PrimaryColor': '#FF0000',
    'FontFamily': 'opensans'
};

Blackbaud_OpenPaymentForm(data); 
</code>
</pre>

For more information visit the [transaction parameters](../transaction-parameters) page.

## Digital wallets
Blackbaud Checkout currently supports the following digital wallets for card not present transactions: 

* [Apple Pay](https://www.apple.com/apple-pay/)
* [Visa Checkout](https://usa.visa.com/pay-with-visa/visa-checkout.html) 
* [Masterpass](https://masterpass.com/en-us/)

To enable digital wallet payment options within the Checkout transaction, the BBPS client must first be enrolled with the wallet provider. For more information, view the [Wallet API documentation](../../wallet-api/). Once enrolled, the display of these wallets can be configured using the following parameters:

<table class="table table-striped table-hover table-bordered">
        <thead>
            <tr>
                <th style="width:150px;">Parameter</th>
                <th>Options</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>UseApplePay</td>
                <td>true|false</td>
                <td>Indicates whether the Apple Pay button should be displayed.</td>
            </tr>
            <tr>
                <td>UseApplePayDonateButton</td>
                <td>true|false</td>
                <td>Indicates whether the Apple Pay button should include "*Donate now with Apple Pay*" text. By default only the "*Apple Pay*" text will be displayed.</td>
            </tr>
            <tr>
                <td>UseVisaCheckout</td>
                <td>true|false</td>
                <td>Indicates whether the Visa Checkout button should be displayed.</td>
            </tr>
             <tr>
                <td>UseMasterpass</td>
                <td>true|false</td>
                <td>Indicates whether the Masterpass button should be displayed.</td>
            </tr>
        </tbody>
    </table>

<div class="alert alert-info">
Digital wallets will be displayed by default for all card not present transactions if the BBPS client is enrolled. You only need to specify these parameters if you would like to hide the wallet for the Checkout instance.
</div>

## 3D Secure transactions 

<p>Blackbaud Checkout supports 3D Secure (3DS) [Card Not Present payment](../supported-transactions/#CNP), given the associated merchant account is set up to use 3DS processing. The donor will go through a typical 3DS authentication step with the card issuer.</p>
<p>From an integration standpoint, simply pick a 3DS enabled merchant account when initiating a Card Not Present payment. Choose a merchant account that has `Use3DS` set to True, with one of the following supported gateway/currency combinations:</p>

<table class="table table-striped table-hover table-bordered">
    <thead>
        <tr>
            <th>Gateway</th>
            <th>Currencies</th>
            <th>Note</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Blackbaud Merchant Services (BBMS 3.0)</td>
            <td>USD + CAD + GBP + EUR</td>
            <td>Does not check AVS or CVC</td>
        </tr>
    </tbody>
</table>

<p>Use the [MerchantAccountList](https://developer.sky.blackbaud.com/docs/services/payments/operations/merchantaccount_getmerchantaccountlist) endpoint to view the list of merchant accounts for an organization.</p>
<p>You can specify the [Disable3DS](../transaction-parameters/) parameter, set to True, to skip redirecting the user to the 3DS authentication page. For example, when the intended user is a gift officer who is processing a donor's mailed in form, they will not know the 3DS PIN of the cardholder.</p>

<div class="alert alert-info">Note: if the payment card is enrolled in 3DS, the card issuing bank may approve or decline the transaction without a successful 3DS authentication.</div>

## Point-to-point encryption (P2PE)
<p>
Blackbaud has partnered with Bluefin to offer a PCI-validated point-to-point encryption (P2PE) solution through our Blackbaud Checkout online payment experience. P2PE is a security measure that encrypts cardholder data at the point of entry in a PCI-approved P2PE device. This prevents plain text cardholder data from existing in a nonprofit organization's system or network, significantly reducing the risk of cardholder data being exposed in the event of a data breach. Nonprofits who use a PCI-validated P2PE solution can save a lot of time and money to ensure secure card data and a reduced PCI scope.
</p>

<p>
Blackbaud's P2PE solution uses the [ID TECH SREDkey](https://www.bluefin.com/download/devices/p2pe/SREDKey-Data-Sheet.pdf) keypad and MagStripe reader. [Click here](http://www.bluefinpartner.com/blackbaud/) to learn more about the benefits of Blackbaud's P2PE solution and how to get started.
</p>

<p>For BBMS merchant accounts, Blackbaud Checkout provides point-to-point encryption (P2PE) using [Bluefin](http://bluefin.com) payment security and [SREDKey](https://www.bluefin.com/download/devices/p2pe/SREDKey-Data-Sheet.pdf) magstripe and key pad readers. The following transaction types are supported with this integration:</p>

* [Card Present Payment](../supported-transactions/#CP)
* [Card Not Present Payment](../supported-transactions/#CNP)
* [Store Card Info](../supported-transactions/#SC)
* [Update Card Info](../supported-transactions/#UC)

<p>
 To initiate a P2PE transaction, set the [`DevicePartnerCode`](../api/references/#partnercode) value to "1". This will launch an instance of the Blackbaud Checkout form that accepts the keyed or swiped data from supported devices for payment or tokenization.
</p>

<div class="alert alert-info">Note: P2PE Card Not Present transactions only support keyed payment information using the reader.</div>

<pre>
<code class="language-javascript">
var data = {
    'Key' : 'cf3cd5cc-43ef-4f89-9170-03c4fc55be61',
    'MerchantAccountId': 'f086c1c9-5512-4386-a9a4-ecc6fe755f64',
    'Amount': 10.00,
    'ClientAppName': 'Blackbaud Checkout Sample Data',
    'DevicePartnerCode': 1 
};

Blackbaud_OpenPaymentForm(data); 
</code>
</pre>

## Charge transaction
Once a donor has completed their transaction on the Blackbaud Checkout payment form, two things will occur. 
First, a hidden input with the transaction token (named `transactiontoken`) is added to the `bbCheckout` form. 

<pre>
<code class="language-html">
&lt;input type="hidden" name="transactiontoken" value='34d65a59-4e5f-4913-ab18-03d33b874455' />
</code>
</pre>

Second, a custom event is triggered indicating a successful transaction. This can be handled by subscribing to the `checkoutComplete` event. 

<pre>
<code class="language-javascript">
document.addEventListener("checkoutComplete", function(event) {
    console.log('Token:', event.detail.transactionToken); 
});
</code>
</pre>

Next, if a form element containing `data-formtype="bbCheckout"` attribute is configured, the form will submit.

Once you have the token, call the [ChargeTransaction](../api/#chargetransaction) endpoint and use this transaction token to finalize the payment. 

<p class="alert alert-danger">It is important to note that if the ChargeTransaction endpoint is not called on the transaction token the payment will never be collected.</p>

## Events

The following events may be triggered throughout the life-cycle of the Blackbaud Checkout process. 

 <table class="table table-striped table-hover table-bordered">
        <thead>
            <tr>
                <th>Event</th>
                <th>Description</th>
                <th>iReturns</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>`checkoutReady`</td>
                <td>bbCheckout.js is downloaded and ready</td>
                <td></td>
            </tr>
             <tr>
                <td>`checkoutLoaded`</td>
                <td>Payment form was requested and is displayed</td>
                <td></td>
            </tr>
              <tr>
                <td>`checkoutComplete`</td>
                <td>Payment was successfully processed and form closed</td>
                <td>[Transaction Token]</td>
            </tr>
            <tr>
                <td>`checkoutCancel`</td>
                <td>Payment form closed by user</td>
                <td></td>
            </tr>
            <tr>
                <td>`checkoutError`</td>
                <td>Error occurred while processing. </td>
                <td>[Error Message], [Error Code]</td>
            </tr>        
        </tbody>
    </table>


<pre>
<code class="language-javascript">
document.addEventListener('checkoutComplete', function (event) {
    console.log('Token: ', event.detail.transactionToken);
});

</code>
</pre>

## FAQ

### How can I stop Blackbaud Checkout from submitting the form?
> The `data-disable-submit` attribute on your `bbCheckout` form can be set to `true`, which will disable the auto-submission of the form once the donor has completed the transaction.

### Does Blackbaud Checkout require any 3rd party libraries?
> The latest version of Blackbaud Checkout (v2.0) does not require any 3rd party libraries. Versions prior to 2.0 require that the hosting page include [jQuery](https://jquery.com/), and has been tested against [version 1.11.1](https://code.jquery.com/jquery-1.11.1.min.js).sta

<br/><br/>
