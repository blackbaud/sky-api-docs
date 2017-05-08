---
layout: layout-sidebar
name: Accounts Payable
description: Information on additions and changes for the Accounts Payable API.
order: 300
published: true
showInNav: true
icon: fa fa-university
back_to_top: true
title: Accounts Payable Changelog
---

# {{ name }}

Monitor this page to keep up with the [Accounts Payable API]({{ stache.config.portal_endpoints_AP }}) latest changes and {{ stache.config.api_type_name }} service releases.

## 2017-05-05

### New

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

## December 2016

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

## November 2016

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

## October 2016

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

## August 2016

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
