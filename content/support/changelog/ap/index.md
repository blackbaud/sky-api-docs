---
layout: layout-sidebar
name: Accounts Payable
description: Information on additions and changes for the Accounts Payable API.
order: 75
published: true
showInNav: true
icon: fa fa-university
back_to_top: true
title: Accounts Payable Changelog
---

# {{ name }}

Monitor this page to keep up with the [Accounts Payable API]({{ stache.config.portal_endpoints_AP }}) latest changes and {{ stache.config.api_type_name }} service releases.

## 2018-06-04

### Announcement: Changes Planned for [Accounts Payable]({{ stache.config.portal_endpoints_AP }}), [General Ledger]({{ stache.config.portal_endpoints_GL }}), and [Treasury (Beta)]({{ stache.config.portal_endpoints_treasury }}) APIs

We will implement new operation ID values in the OpenApi (fka Swagger) definitions for several SKY APIs. This change will improve client-side tooling support for code generation by making these values more deterministic and friendlier across different languages. Going forward, we expect high stability of these values (meaning, we won’t need to change them again).

Note that any existing code that has been deployed will continue to function with no problems, since we are not changing any routes or parameters. If you make use of client-side generated code and want to regenerate your client wrapper, you’ll need to fix any compile-time errors in your code stemming from new method names.

## 2018-06-01

### New

Added the following endpoint:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_invoice_edit_patch }}">
				<td>Invoice edit</td>
				<td>PATCH</td>
				<td>/invoices/{invoice_id}</td>
			</tr>
		</tbody>
	</table>
</div>

With the new endpoint, note the following:

- You can edit the following properties of an existing invoice:
            - `vendor_id`
            - `vendor_name`
            - `invoice_number`
            - `invoice_date`
            - `due_date`
            - `description`
            - `status`
            - `invoice_payment_details`
            - `post_status`
            - `post_date`
            - `distribution_discounts`
            - `distributions`
            - `custom_fields`
- You cannot edit `Posted` or `Paid` invoices.
- You cannot update an invoice to change the status to `Posted`, `Paid`, or `Partially Paid`.
- If you omit fields from PATCH requests, the endpoint does not edit them with default values. For example, the following code sample only edits the `description` property.
<pre class="language-javascript"><code>{
        “description”: "edited description"
}
</code></pre>

## April

### 2018-04-20

#### Changed

We made several changes to the  [Invoice attachment]({{ stache.config.portal_endpoints_invoice_attachment_post }}) endpoint:
- The endpoint now supports Physical attachments (previously only supported Link attachments)
- Note the shape of the request in JSON form:
<pre class="language-javascript"><code>
{
  "parent_id": 0,
  "name": "string",
  "url": "string",
  "type": "Link",
  "media_type": "string",
  "file": {
    "ContentLength": 0,
    "ContentType": "string",
    "FileName": "string",
    "InputStream": {
      "CanRead": true,
      "CanSeek": true,
      "CanTimeout": true,
      "CanWrite": true,
      "Length": 0,
      "Position": 0,
      "ReadTimeout": 0,
      "WriteTimeout": 0
      }
   }
}
</code></pre>

    - The `type` field now accepts `Physical` (defaults to `Link` if not provided)
    - A `url` is not required for `Physical` attachments
    - A `file` must be provided for `Physical` attachments
    - A `url` must be provided for `Link` attachments
    - The new `file` field is `HttpPostedFileBase`

- The request must be a multipart/form-data request. For example,

<pre class="language-javascript"><code>
public static Task<HttpResponseMessage> PostMultiPartDataFormAsync(this HttpClient client, string route, Attachment content)
        {
            var httpContent = new MultipartFormDataContent();
            var streamContent = new StreamContent(content.File.InputStream);
            var ContentDisposition = new ContentDispositionHeaderValue("form-data");
            ContentDisposition.Name = "File";
            ContentDisposition.FileName = content.File.FileName;
            streamContent.Headers.ContentDisposition = ContentDisposition;
            streamContent.Headers.ContentType = new MediaTypeHeaderValue(content.File.ContentType);
            httpContent.Add(streamContent);
            httpContent.Add(new StringContent(content.ParentId.ToString()), "ParentId");
            httpContent.Add(new StringContent(content.Name), "Name");
            httpContent.Add(new StringContent(content.Type.ToString()), "Type");
            httpContent.Add(new StringContent(content.MediaType.ToString()), "MediaType");
            
            var request = new HttpRequestMessage(HttpMethod.Post, route)
            {
                Content = httpContent
            };
            return SendAsync(client, request);
        }

</code></pre>

- JSON requests for url attachments will work the same as they did prior to this release
- JSON requests containing files will fail or ignore the file if  `type` is set to `link`
- JSON request field names need to use snake casing, such as `parent_id` and `media_type` whereas multipart/form-data requests need to use camel case, such as `ParentId` and `MediaType`


## March

### 2018-03-30

#### Changed

For the  [Invoice (List)]({{ stache.config.portal_endpoints_invoice_list }}) endpoint, we made the following changes:
- The `payment_method` of the invoice is now returned in the listed objects, which includes `EFT`,  `Credit card`,  `Bank draft`, or `Check`.
- The `payment_method` field can also be filtered during search.

## January

### 2018-01-17

#### Changed

For the  [Invoice (List)]({{ stache.config.portal_endpoints_invoice_list }}) endpoint, we added the `delete`, `paid`, and `partially paid` statuses.

## 2017

### 2017-11-17

#### Changed

Added additional fields to the following endpoint:

<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Operation</th>
        <th>Method</th>
        <th>Route</th>
      </tr>
    </thead>
      <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_payment_term_list }}">
        <td>Payment term (list)</td>
        <td>GET</td>
        <td>/paymentterms</td>
      </tr>
    </tbody>
  </table>
</div>

### 2017-10-12

#### New

Added the following endpoint:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_payment_term_list }}">
				<td>Payment term (list)</td>
				<td>GET</td>
				<td>/paymentterms</td>
			</tr>
		</tbody>
	</table>
</div>

### 2017-09-28

#### Changed

For the following endpoint, we added the payment_default field which includes credit limit, payment terms, and bank account information:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_vendor_get }}">
				<td>Vendors</td>
				<td>GET</td>
				<td>/vendors</td>
			</tr>
		</tbody>
	</table>
</div>

### 2017-06-30

#### New

Added the following endpoints:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_invoice_attachment_post }}">
				<td>Invoice attachment</td>
				<td>POST</td>
				<td>/invoices/attachments</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_media_type_list }}">
				<td>Media type (List)</td>
				<td>GET</td>
				<td>/mediatypes</td>
			</tr>
		</tbody>
	</table>
</div>

### 2017-05-05

#### New

Added the following endpoints:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_invoice_1099_amount }}">
				<td>Invoice 1099 amount</td>
				<td>GET</td>
				<td>/invoices/{invoice_id}/1099amount</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_invoice_1099_box_numbers }}">
				<td>Invoice 1099 box numbers</td>
				<td>GET</td>
				<td>/invoices/{invoice_id}/1099boxnumber</td>
			</tr>
		</tbody>
	</table>
</div>

## 2016

### 2016-12-06

#### New

- Added the following endpoints:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_invoice_custom_field_list }}">
				<td>Invoice custom field (List)</td>
				<td>GET</td>
				<td>/invoices/customfields</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_vendor_custom_field_list }}">
				<td>Vendor custom field (List)</td>
				<td>GET</td>
				<td>/vendors/customfields</td>
			</tr>
		</tbody>
	</table>
</div>

- Added new custom field entities to the following endpoints:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_invoice_post }}">
				<td>Invoice</td>
				<td>POST</td>
				<td>/invoices</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_invoice_get }}">
				<td>Invoice</td>
				<td>GET</td>
				<td>/invoices/{invoice_id}</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_vendor_post }}">
				<td>Vendor</td>
				<td>POST</td>
				<td>/vendors</td>
			</tr>
            <tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_vendor_get }}">
				<td>Vendor</td>
				<td>GET</td>
				<td>/vendors/{vendor_id}</td>
			</tr>
		</tbody>
	</table>
</div>

#### Changed

For consistency across APIs, all responses to GET endpoints that return collections now return an object with "count" and "value" properties. The following endpoints are affected:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_address_list }}">
				<td>Address (List)</td>
				<td>GET</td>
				<td>/vendors/{vendor_id}/addresses</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_contact_method_list }}">
				<td>Contact method (List)</td>
				<td>GET</td>
				<td>/vendors/{vendor_id}/addresses/{address_id}/contactmethods</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_note_list }}">
				<td>Note (List)</td>
				<td>GET</td>
				<td>/vendors/{vendor_id}/notes</td>
			</tr>
		</tbody>
	</table>
</div>


### 2016-11-14

#### Announcement: Breaking Changes Planned for [Accounts Payable API]({{ stache.config.portal_endpoints_AP }})

For consistency across APIs, we will implement the following change:

All responses to GET endpoints that return collections will return an object with "count" and "value" properties. The following endpoints are affected:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_address_list }}">
				<td>Address (List)</td>
				<td>GET</td>
				<td>/vendors/{vendor_id}/addresses</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_contact_method_list }}">
				<td>Contact method (List)</td>
				<td>GET</td>
				<td>/vendors/{vendor_id}/addresses/{address_id}/contactmethods</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_note_list }}">
				<td>Note (List)</td>
				<td>GET</td>
				<td>/vendors/{vendor_id}/notes</td>
			</tr>
		</tbody>
	</table>
</div>


### 2016-10-12

#### Changed

For consistency across APIs, we implemented the following changes:

- All responses to POST requests changed from "RecordId" to "record_id".
- The following endpoints and their associated fields changed from CamelCase to snake_case:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_invoice_get }}">
				<td>Invoice</td>
				<td>GET</td>
				<td>/invoice</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_invoice_post }}">
				<td>Invoice</td>
				<td>POST</td>
				<td>/invoice</td>
			</tr>
		</tbody>
	</table>
</div>

### 2016-10-04

#### Announcement: Breaking Changes Planned for [Accounts Payable API]({{ stache.config.portal_endpoints_AP }})

For consistency across APIs, we will implement the following changes:

- All responses to POST requests will change from "RecordId" to "record_id".
- The following endpoints and their associated fields will change from CamelCase to snake_case:

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_invoice_get }}">
				<td>Invoice</td>
				<td>GET</td>
				<td>/invoice</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_invoice_post }}">
				<td>Invoice</td>
				<td>POST</td>
				<td>/invoice</td>
			</tr>
		</tbody>
	</table>
</div>


### 2016-08-12

#### Breaking Change

We changed the default and maximum record limits on the following search and list endpoints. The default is now 100 records, and the maximum is 500 records.

<div class="table-responsive">
	<table class="table table-striped table-hover">
		<thead>
			<tr>
				<th>Operation</th>
				<th>Method</th>
				<th>Route</th>
			</tr>
		</thead>
		<tbody>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_vendor_list }}">
				<td>Vendor (List)</td>
				<td>GET</td>
				<td>/vendors</td>
			</tr>
			<tr class="clickable-row" data-url="{{ stache.config.portal_endpoints_invoice_list }}">
				<td>Invoice (List)</td>
				<td>GET</td>
				<td>/invoices</td>
			</tr>
		</tbody>
	</table>
</div>

### 2016-08-04

#### New

The [Accounts Payable API]({{ stache.config.portal_endpoints_AP }}) is now available. Use this API to manage accounts payable, including vendors and invoices.
